** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: local-llm-deployment
description: Deploy quantized GGUF models locally with Ollama or llama.cpp �?VRAM budgeting, quant selection, GPU offload, API serving.
tags: [llm, gguf, ollama, llama-cpp, quantization, local-inference, gpu]
---

# Local LLM Deployment (Ollama / llama.cpp)

Deploy quantized LLMs on consumer GPUs with VRAM constraints.

## VRAM Budgeting

Before choosing a quant, calculate available VRAM:

```
Available = Total VRAM - OS/DWM overhead (~2-3GB on Windows, ~0.5GB on Linux)
```

MoE models (e.g. Qwen3.6-35B-A3B): ALL parameters must be loaded into memory, even though only a fraction are active per token. Dense models (e.g. Llama-3-8B): same �?full weights must fit.

Rule of thumb for model size in memory:
```
Size �?Parameters × BPW / 8    (BPW = bits per weight)
```

For GGUF files: the file size IS the memory footprint (plus KV cache overhead).

## Quantization Selection Guide

| Quant   | BPW   | Quality         | Use case              |
|---------|-------|-----------------|-----------------------|
| Q8_K    | ~8.5  | Near-lossless   | 24GB+ VRAM            |
| Q6_K    | ~6.6  | Excellent       | 16GB+ VRAM            |
| Q5_K_M  | ~5.7  | Very good       | 12-16GB VRAM          |
| Q4_K_M  | ~4.9  | Good            | 8-12GB VRAM           |
| Q3_K_M  | ~3.9  | Acceptable      | Tight fit scenarios   |
| IQ3_M   | ~3.6  | OK              | Very tight            |
| Q2_K    | ~3.5  | Degraded        | Last resort           |
| IQ2_M   | ~2.7  | Significant loss| Extreme squeeze       |

Special quants: K_P (custom per-model optimized), IQ4_NL, IQ4_XS, IQ3_M (importance-matrix based).


## GPU Offload (Partial)

When model > available VRAM, offload some layers to CPU:

```bash
# llama.cpp: -ngl controls layers on GPU
llama-server -m model.gguf -ngl <layers_on_gpu> -c <context_length>

# Rule: each layer �?model_size / total_layers
# e.g. 40-layer model, 11GB file �?~275MB per layer
# 9GB VRAM �?~33 layers on GPU, rest on CPU (-ngl 33)
```

Ollama handles offload automatically �?no manual tuning needed.

## Ollama Deployment

### Install
```bash
# Windows: download from https://ollama.com/download
# Linux:
curl -fsSL https://ollama.com/install.sh | sh
```

### Move to Different Drive (Windows)
```bash
# 1. Copy program files
mkdir -p /d/Ollama
cp -r "C:\Users\<user>\AppData\Local\Programs\Ollama\*" /d/Ollama/
mkdir -p /d/Ollama/models

# 2. Set env vars via PowerShell (permanent user-level)
powershell -Command "
[Environment]::SetEnvironmentVariable('OLLAMA_MODELS', 'D:\Ollama\models', 'User')
# Update PATH to replace old Ollama path
"
```

### Serve API
```bash
ollama serve                              # Start server (localhost:11434)
ollama pull <model>                       # Download model
ollama run <model>                        # Interactive chat
```

Ollama exposes OpenAI-compatible API at `http://localhost:11434/v1`.

### HuggingFace GGUF Models
```bash
ollama pull hf.co/<user>/<repo>           # Pull GGUF from HF
# e.g. ollama pull hf.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-IQ2_M
```

### Network Access (for remote machines)

By default Ollama listens on localhost only. To allow other machines on the LAN to connect:

```bash
export OLLAMA_HOST="0.0.0.0"   # Before starting ollama serve
ollama serve
```

Verify from remote: `curl http://<ollama_host>:11434/v1/models`

### Hermes Config for Ollama Models

Hermes requires at least 64K context for reliable tool use. If the Ollama model's `num_ctx` is smaller, Hermes refuses to connect:

```
Ollama loaded `model` with only 32,768 tokens of runtime context, but Hermes needs at least 64,000 tokens.
```

Fix in `~/.hermes/config.yaml` under `model:`:
```yaml
model:
  default: my-model
  provider: ollama
  base_url: http://localhost:11434/v1
  api_key: ollama
  ollama_num_ctx: 65536       # Override Ollama's context at request time
  context_length: 65536       # Tell Hermes the model supports this
```

Note: Ollama will allocate this context in GPU memory. On tight VRAM (12GB), 65536 context + IQ2_M model may cause OOM. Start with 32768 and test.

**Hermes 64K is a hard floor** �?Hermes checks ollama's ACTUAL loaded context at runtime, not just the config. If ollama reports `context_length` < 64000, Hermes refuses to connect regardless of config overrides. This means models that can't fit 64K context + weights in VRAM cannot be used with Hermes. On 12GB VRAM:
- 12B Q5_K_M (7.8GB) + 64K context �?fits �?
- 27B IQ2_M (10GB) + 64K context �?does NOT fit �?
- 35B-A3B IQ2_M (11GB) + 64K context �?does NOT fit �?

**GPU utilization vs context trade-off**: `num_ctx` directly controls KV cache size and thus GPU utilization. Smaller context �?more room for model layers �?higher GPU% �?faster inference. Larger context �?more KV cache �?some layers offload to CPU �?slower. Monitor with `nvidia-smi` and `curl localhost:11434/api/ps`. On 12GB:
- 35B-A3B IQ2_M + num_ctx 4096 �?98% GPU util, model fully in GPU
- 12B Q5_K_M + num_ctx 32768 �?~57% GPU util, model fully in GPU
- 12B Q5_K_M + num_ctx 65536 �?lower GPU util, KV cache eats VRAM

## Unsloth Studio Deployment

Unsloth Studio is a full inference platform with Web UI, OpenAI-compatible API, and llama.cpp backend. Good alternative to Ollama when you want a chat UI + API in one package. See `unsloth-studio-deployment` skill for full setup.

```bash
# Quick start
curl -fsSL https://unsloth.ai/install.sh | sh
unsloth run --model model.gguf --host 0.0.0.0 --port 8888 --yes
```

Key differences from Ollama:
- Uses llama.cpp backend (same GGUF format)
- Built-in Web UI at `http://host:8888/`
- OpenAI-compatible API at `http://host:8888/v1/`
- Requires `unsloth studio update` after first install for all deps
- For Chinese servers: needs `gh-proxy.com` + `hf-mirror.com` + PyPI mirror

## llama.cpp Deployment

```bash
# Install: brew install llama.cpp, or winget, or build from source
# Run server (OpenAI-compatible):
llama-server -m model.gguf \
  --jinja \                  # Required for proper chat templates
  -c 131072 \                # Context length (keep �?28K for thinking models)
  -ngl 99 \                  # Offload all layers to GPU (auto-fits)
  --host 0.0.0.0 --port 8080

# With vision (mmproj):
llama-server -m model.gguf \
  --mmproj mmproj-f16.gguf \
  --jinja -c 131072 -ngl 99
```

### llama-cpp-python (Python API)
```bash
# Install with CUDA
CMAKE_ARGS="-DGGML_CUDA=ON" pip install llama-cpp-python --upgrade --force-reinstall --no-cache-dir
```

## Recommended Settings (Qwen3.6)

Thinking mode (default):
- General: temperature=1.0, top_p=0.95, top_k=20, min_p=0, presence_penalty=1.5
- Coding: temperature=0.6, top_p=0.95, top_k=20

Non-thinking mode:
- General: temperature=0.7, top_p=0.8, top_k=20

## Reasoning Model Output Truncation

Models with built-in reasoning (mimo-v2.5-pro, DeepSeek-R1, Qwen thinking mode) consume output tokens for BOTH reasoning (thinking) and the visible response. If the output token budget is too small, the reasoning eats the budget and the visible response gets truncated with `finish_reason: "length"` �?Hermes error: "Response truncated due to output length limit".

### Fix (Hermes config)

```bash
# Increase output budget to API maximum
hermes config set model.max_output_tokens 65536

# Reduce reasoning token consumption
hermes config set agent.reasoning_effort low
```

For the xiaomi/mimo API specifically:
- Max supported `max_tokens`: 65536
- `reasoning_tokens` count against `completion_tokens`
- A "say one word" test used 97 reasoning + 41 visible = 138 total completion tokens

### Diagnosis

```bash
# Test API output limit
curl -s -X POST "<base_url>/chat/completions" \
  -H "Authorization: Bearer *** \
  -d '{"model":"<model>","messages":[{"role":"user","content":"test"}],"max_tokens":65536}' \
  | jq '.usage'
# Check reasoning_tokens vs completion_tokens ratio
```

### Ollama Local GGUF Import

When you already have a `.gguf` file (e.g. downloaded from HuggingFace), create a Modelfile and import it:

```bash
# Create Modelfile
cat > /tmp/Modelfile << 'EOF'
FROM /path/to/model.gguf
TEMPLATE """{{- if .System }}<|im_start|>system
{{ .System }}</think>
{{ end }}{{- range .Messages }}<|im_start|>{{ .Role }}
{{ .Content }}</think>
{{ end }}<|im_start|>assistant
"""
PARAMETER temperature 1.0
PARAMETER top_p 0.95
PARAMETER top_k 20
PARAMETER num_ctx 8192
PARAMETER num_predict 8192
PARAMETER stop <|im_start|>
PARAMETER stop </think>
EOF

# Import into Ollama
ollama create my-model -f /tmp/Modelfile

# Verify
ollama list
ollama run my-model "test"
```

Key parameters for tight VRAM:
- `num_ctx`: context window (start with 8192 on 12GB, increase if fits)
- `num_predict`: max output tokens (default -1 = unlimited, but bounded by num_ctx)
- `num_gpu`: number of layers to offload to GPU (Ollama auto-detects if omitted)

### Qwen3.6 / Thinking Model Modelfile (CRITICAL)

**Do NOT hand-write chatml templates for Qwen3.6 models.** Ollama has built-in `RENDERER` and `PARSER` for qwen3.5/3.6 that handle thinking, chatml formatting, and stop sequences automatically. Use this instead:

```
FROM /path/to/Qwen3.6-*.gguf
TEMPLATE {{ .Prompt }}
RENDERER qwen3.5
PARSER qwen3.5
PARAMETER presence_penalty 1.5
PARAMETER repeat_penalty 1
PARAMETER temperature 1
PARAMETER top_k 20
PARAMETER top_p 0.95
PARAMETER min_p 0
PARAMETER num_ctx 65536
PARAMETER num_predict 16384
```

**Why this matters**: Hand-written chatml templates with `</think>` as a stop token kill thinking models �?the model generates `` and immediately hits the stop sequence, producing no visible response. The `RENDERER qwen3.5` handles all of this correctly.

**Verify thinking works** via OpenAI API:
```bash
curl -s http://localhost:11434/v1/chat/completions -d '{
  "model": "your-model",
  "messages": [{"role": "user", "content": "say hello"}],
  "max_tokens": 1000, "stream": false
}' | jq '{content: .choices[0].message.content, reasoning: .choices[0].message.reasoning}'
```

You should see `content` with the actual response AND `reasoning` with the thinking process. If `content` is empty, the template is wrong.

**Model name restriction**: `ollama create` rejects names with dots. Use `qwen36-35b` not `qwen3.6-35b`.

### Disabling Thinking for Reasoning Models

Qwen3.6 and similar reasoning models default to "thinking mode" which generates hidden reasoning tokens before the visible response. On tight VRAM with small `num_ctx`, thinking tokens consume the entire output budget, causing truncation. Disable thinking in the Modelfile:

```
SYSTEM """You are a helpful assistant. /no_think"""
```

This eliminates thinking token overhead, giving the full context window to input + visible output.

**Note**: `/no_think` in the SYSTEM prompt does NOT always suppress thinking �?at extreme quantizations (IQ2_M), the model may ignore it and still generate thinking tags. The more reliable approach is to increase `num_predict` (e.g. 16384+) so thinking + response both have room. With `RENDERER qwen3.5`, thinking is properly separated into the `reasoning` field and doesn't consume the visible output budget.

### Pitfalls �?Ollama Modelfile

- **Auto-generated TEMPLATE `{{ .Prompt }}` is correct ONLY with RENDERER/PARSER**: `ollama show --modelfile` on an auto-created model shows `TEMPLATE {{ .Prompt }}`. For non-thinking models, this breaks tool calling �?use full chatml template. For Qwen3.6 thinking models, this IS correct when paired with `RENDERER qwen3.5` + `PARSER qwen3.5` (ollama's built-in handles all formatting). See `ollama-qwen36-deploy` skill.
- **Model names cannot contain dots**: `ollama create qwen3.6-35b` returns `400 Bad Request: invalid model name`. Use hyphens: `qwen36-35b`.
- **Large GGUF import is slow**: Copying an 11GB file takes several minutes. Run `ollama create` in background: `ollama create model -f Modelfile &` or use terminal background mode.
- **Re-creating a model re-copies the GGUF**: `ollama rm` then `ollama create` copies the file again. To just change parameters without re-copying, the blob is reused if the FROM path matches �?but the build still takes time for large files.

## Hermes Stream Timeout for Reasoning Models

Reasoning models (mimo-v2.5-pro, DeepSeek-R1, Qwen thinking mode) can spend minutes generating thinking tokens before producing visible output. This triggers Hermes stream timeouts:

```
⚠️ No response from provider for 180s �?reconnecting...
⚠️ xiaomi stream drop (RemoteProtocolError) after 180.2s
```

### Fix

Add to `~/.hermes/.env`:
```bash
HERMES_STREAM_STALE_TIMEOUT=600   # No-data timeout (default 180s)
HERMES_STREAM_READ_TIMEOUT=300    # Read timeout (default 120s)
```

### Auxiliary Service Provider Override

Hermes auxiliary services (title generation, vision, compression, etc.) default to `provider: auto`, which tries openrouter �?nous �?local/custom. If only one provider is configured, set all auxiliary services explicitly to avoid timeout cascades:

```bash
for svc in title_generation vision web_extract compression skills_hub approval mcp triage_specifier; do
  hermes config set "auxiliary.${svc}.provider" <your_provider>
  hermes config set "auxiliary.${svc}.model" <your_model>
done
hermes config set auxiliary.title_generation.timeout 60
```

Without this, auxiliary calls fall through empty providers and hang for 30-60s each.

## References

- `references/ollama-windows-migration.md` �?Move Ollama to a different drive on Windows
- `references/hermes-config-for-local-llms.md` �?Hermes config adjustments for local model quirks

## Pitfalls �?General: ~2-3GB VRAM consumed by desktop compositor. `nvidia-smi` shows it as "Used" but won't list per-process breakdown (WDDM limitation).
- **KV cache**: context length × layer count × 2 (K+V) × hidden_dim × precision. For long contexts this adds 1-4GB. Start with `-c 8192` on tight VRAM.
- **`python3` on Windows git-bash**: maps to Windows Store stub (exit code 49). Use `python` or full path.
- **Ollama auto-offload**: handles GPU/CPU split automatically. llama.cpp requires manual `-ngl` tuning.
- **Vision models**: require additional mmproj file (~900MB for f16), counts against VRAM budget.
- **Reasoning token budget**: reasoning tokens count against `completion_tokens` (the output budget). A "say one word" test on mimo used 97 reasoning + 41 visible = 138 total. Set `max_output_tokens` to the API maximum to give reasoning enough room.
- **Shared GPU memory (Windows)**: Task Manager shows "Shared GPU memory" but CUDA/ollama CANNOT use it. Shared GPU memory is a WDDM feature for DirectX graphics only. CUDA uses dedicated VRAM only. When VRAM is full, ollama offloads layers to CPU (system RAM), not shared GPU memory.
- **Ollama thinking model API behavior**: `ollama run` shows full thinking+response, but `/v1/chat/completions` may return empty content if the model isn't recognized as thinking-capable. **Root cause**: hand-written chatml templates with `</think>` as a stop token kill generation immediately. **Fix**: use `RENDERER qwen3.5` + `PARSER qwen3.5` in the Modelfile instead of hand-written templates. This is the official pattern ollama uses for qwen3.6 models. See `references/ollama-thinking-api-behavior.md`.
- **HuggingFace model card filenames**: the HF "Use this model" widget shows a default filename (usually IQ2_M). Don't assume that's the best quant �?check the Downloads table in the model card for all options and their sizes.