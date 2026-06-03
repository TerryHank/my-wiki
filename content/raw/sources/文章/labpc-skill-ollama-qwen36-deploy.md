** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: ollama-qwen36-deploy
description: Deploy Qwen3.6 GGUF models on Ollama with proper thinking support and OpenAI-compatible API.
version: 1.1.0
tags: [ollama, qwen3.6, gguf, thinking, deployment]
---

# Ollama Qwen3.6 Deployment

## References

- `references/remote-install.md` �?Install Ollama on remote servers via SCP (when direct download fails)
- `references/rtx4090-35b-moe-optimization.md` �?Verified VRAM breakdown, layer offload diagnosis, context vs quant tradeoffs

## Ollama Version Requirement

Qwen3.6 models use the `qwen35moe` architecture. Older Ollama versions do NOT support it:

```
error loading model architecture: unknown model architecture: 'qwen35moe'
```

- **v0.9.6**: Does NOT support `qwen35moe`
- **v0.24.0**: Supports it �?

Always verify after install: `ollama --version` and test a quick inference. If the model fails to load, check `journalctl -u ollama -n 30` for the architecture error and upgrade.

For remote servers where `curl -fsSL https://ollama.com/install.sh | sh` installs an old version, download the latest tarball locally and SCP it (see `ollama-deployment` skill for the full remote install workflow).

## Key Finding

Qwen3.6 models on Ollama must use the built-in `RENDERER qwen3.5` and `PARSER qwen3.5` �?do NOT write custom TEMPLATE or stop sequences.

## Modelfile Template

```
FROM /path/to/model.gguf
TEMPLATE {{ .Prompt }}
RENDERER qwen3.5
PARSER qwen3.5
PARAMETER num_ctx 32768
PARAMETER num_predict 16384
PARAMETER temperature 1
PARAMETER top_p 0.95
PARAMETER top_k 20
PARAMETER min_p 0
PARAMETER presence_penalty 1.5
PARAMETER repeat_penalty 1
```

## Critical Pitfalls

1. **NEVER add `</think>` as a stop sequence** �?this kills generation immediately after thinking starts, producing empty responses via the OpenAI API.
2. **NEVER use custom chatml TEMPLATE** �?ollama's built-in renderer/parser handles thinking tag separation automatically.
3. **OpenAI API `/v1/chat/completions`** returns thinking in `reasoning` field and response in `content` field �?only works when `RENDERER qwen3.5` + `PARSER qwen3.5` are set.
4. **Ollama 0.24.0** doesn't support `PARAMETER think false` in Modelfile �?not a valid parameter.
5. **`/no_think` in SYSTEM prompt** doesn't reliably disable thinking via the OpenAI API.
6. **Hermes requires `ollama_num_ctx: 65536`** in config when connecting to ollama �?otherwise "needs at least 64,000 tokens" error.

## Deployment Steps

```bash
# Create model from GGUF
ollama create mymodel -f Modelfile

# Test via OpenAI API
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "mymodel",
  "messages": [{"role": "user", "content": "hello"}],
  "max_tokens": 1000
}'
# Response: content="Hello!" + reasoning="thinking process..."
```

## Network Access (for remote Hermes)

Start ollama on all interfaces:
```bash
OLLAMA_HOST=0.0.0.0 ollama serve
```

## VRAM Budgeting (12GB)

| Model | Quant | Size | Quality | Notes |
|-------|-------|------|---------|-------|
| 35B-A3B MoE | IQ2_M | 11GB | ★★�?| Max for 12GB, low quality |
| 27B Dense | IQ2_M | 10GB | ★★�?| Better than 35B-A3B IQ2_M |
| 12B Dense | Q5_K_M | 7.8GB | ★★★★ | **Best for 12GB** |
| 12B Dense | Q4_K_M | 6.8GB | ★★★★ | Good balance |

## VRAM Budgeting (24GB �?RTX 4090)

| Model | Quant | Size | Fit (32K ctx) | GPU Layers | Speed | Notes |
|-------|-------|------|---------------|------------|-------|-------|
| 35B-A3B MoE | Q4_K_M | 22GB | �?OOM | 40/41 CPU offload | ~17 tok/s | Output layer on CPU, slow |
| 35B-A3B MoE | **IQ4_XS** | **19GB** | **�?perfect** | **41/41 GPU** | **~120 tok/s** | **Best for 24GB + 32K** |
| 35B-A3B MoE | Q2_K_P | 16GB | �?| 41/41 GPU | ~120 tok/s | Lower quality |
| 35B-A3B MoE | IQ2_M | 13GB | �?| 41/41 GPU | ~120 tok/s | Poor quality |

**Verified on RTX 4090 24GB (ToDesk using ~463MB):**
- **IQ4_XS (19GB) + num_ctx=32768 = 21.2GB total VRAM, 41/41 layers on GPU, ~120 tok/s** �?sweet spot
- Q4_K_M (22GB) + num_ctx=2048 = 22.7GB total, 41/41 on GPU, ~100-117 tok/s (context too small for Hermes)
- Q4_K_M (22GB) + num_ctx=8192+ = output layer offloaded to CPU, inference crashes or ~17 tok/s

**Critical**: If `journalctl -u ollama` shows `offloading output layer to CPU`, the model + context doesn't fit in VRAM. Two fixes:
1. Switch to smaller quant (IQ4_XS) �?preferred, keeps full context
2. Reduce num_ctx in Modelfile �?last resort, limits context window

### Modelfile Wrapper for Pre-Configured Context

Create a named model with baked-in context size to avoid CPU offload:

```
FROM fredrezones55/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive:IQ4_XS
PARAMETER num_ctx 32768
PARAMETER num_batch 512
```

```bash
ollama create qwen36-35b-uncensored -f Modelfile
```

This creates a local model name `qwen36-35b-uncensored` that always uses 32K context. The base model is referenced by blob hash �?no duplication.

### Passing Hermes 64K Context Check

Hermes Agent requires `context_length >= 64000`. But 64K context won't fit on 24GB with 35B MoE models. **Workaround**:

```yaml
# config.yaml
model:
  default: qwen36-35b-uncensored
  base_url: http://<server>:11434/v1
  context_length: 65536      # Passes Hermes 64K check
  ollama_num_ctx: 32768      # Actual context sent to Ollama
```

Hermes reads `context_length` for the minimum check but sends `ollama_num_ctx` in API requests. Set `context_length` to satisfy the check, `ollama_num_ctx` to what the GPU can actually handle.

**Pitfall**: `OLLAMA_NUM_CTX` environment variable does NOT override Ollama v0.24.0's VRAM-based auto-calculation (`default_num_ctx=32768` for 24GB). Use Modelfile `PARAMETER num_ctx` instead.

**Pitfall**: Do NOT use `keep_alive:0` on `/api/generate` to unload models �?observed to delete model files in some cases. Use `curl -s http://localhost:11434/api/generate -d '{"model":"name","keep_alive":0}'` only if you understand the risk.

Dense models outperform MoE at same quantization because all params are active. For Hermes, the 64K context requirement means MoE models with large total params (35B+) can't fit on 12GB VRAM �?use 12B dense instead.

## GPU Utilization Optimization

`num_ctx` controls KV cache size and directly impacts GPU utilization:

| Model | num_ctx | GPU Util | Notes |
|-------|---------|----------|-------|
| 35B-A3B IQ2_M | 4096 | 98% | Best speed, model fully in GPU |
| 35B-A3B IQ2_M | 65536 | N/A | Can't fit �?too much KV cache |
| 12B Q5_K_M | 32768 | ~57% | Good balance |
| 12B Q5_K_M | 65536 | Lower | KV cache eats VRAM |

Monitor with `nvidia-smi` and `curl localhost:11434/api/ps` (check `size_vram` and `context_length`).

For maximum speed: use smallest `num_ctx` that meets your needs. For Hermes: must be �?5536.

## Copy GGUF to D: drive for faster ollama create

ollama copies the GGUF to its blob store on `ollama create`. If source is on a slow drive, copy to D: first, then point Modelfile FROM to D: copy.