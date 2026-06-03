** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: ubuntu-2004-ml-deploy
description: Deploy ML inference on Ubuntu 20.04 (glibc 2.31) with modern GPU. Covers Unsloth Studio, llama.cpp, llama-cpp-python with CUDA. Pitfalls for old distro + new tooling.
triggers:
  - deploying models on Ubuntu 20.04
  - Unsloth Studio setup
  - llama.cpp build from source
  - glibc compatibility issues
---

# Deploying ML Models on Ubuntu 20.04

## Core Problem
Ubuntu 20.04 has glibc 2.31 and OpenSSL 1.1.1f. Most modern prebuilt binaries (llama.cpp, Unsloth) require glibc 2.34+ and OpenSSL 3.0. **Prebuilt binaries will NOT work �?must build from source.**

## Unsloth Studio Install

### Step 1: Install with gh-proxy.com for GitHub
The install script downloads from GitHub. For servers in China:
```bash
# Download script via proxy
curl -fsSL 'https://gh-proxy.com/https://raw.githubusercontent.com/unslothai/unsloth/main/install.sh' -o /tmp/unsloth-install.sh

# Patch all GitHub URLs
sed -i 's|https://github.com/|https://gh-proxy.com/https://github.com/|g' /tmp/unsloth-install.sh
sed -i 's|https://raw.githubusercontent.com/|https://gh-proxy.com/https://raw.githubusercontent.com/|g' /tmp/unsloth-install.sh
sed -i 's|https://astral.sh/uv/install.sh|https://gh-proxy.com/https://github.com/astral-sh/uv/releases/latest/download/uv-installer.sh|g' /tmp/unsloth-install.sh

# Set mirrors
export PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
export UV_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
export HF_ENDPOINT="https://hf-mirror.com"
export UNSLOTH_PYTORCH_MIRROR="https://download.pytorch.org/whl"

# Run
bash /tmp/unsloth-install.sh
```

### Step 2: Run `unsloth studio update`
After initial install, run `unsloth studio update` to install all backend dependencies (structlog, fastapi, diceware, etc.). This takes several minutes.

### Step 3: Install CUDA toolkit for compilation
```bash
# Add NVIDIA repo with GPG key
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/3bf863cc.pub
echo "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64 /" | sudo tee /etc/apt/sources.list.d/cuda.list
sudo apt-get update

# Install minimal: nvcc + cublas-dev
sudo apt-get install -y cuda-nvcc-12-2 libcublas-dev-12-2

# Create symlinks Unsloth expects
sudo ln -sf /usr/local/cuda-12.2 /usr/local/cuda-12  # if alternatives don't exist
```

### Step 4: Build llama-server from source
Unsloth Studio needs a standalone `llama-server` binary. Prebuilt ones won't work on glibc 2.31.

```bash
# Source is bundled with llama-cpp-python
SRC=$(find ~/.cache/uv/sdists-v9/ -path "*/llama-cpp-python/*/vendor/llama.cpp" -name "CMakeLists.txt" -exec dirname {} \; | head -1)

# Use cmake from the venv (system cmake 3.16 is too old, need 3.18+)
export PATH="$HOME/.unsloth/studio/unsloth_studio/lib/python3.13/site-packages/cmake/data/bin:/usr/local/cuda-12.2/bin:$PATH"

cd "$SRC" && mkdir build && cd build
cmake .. -DGGML_CUDA=ON -DCMAKE_CUDA_ARCHITECTURES=89 -DLLAMA_CURL=OFF -DLLAMA_BUILD_SERVER=ON
cmake --build . --config Release -j$(nproc) --target llama-server

cp bin/llama-server ~/.unsloth/llama.cpp/llama-server
```

### Step 5: Replace ALL shared libraries
**CRITICAL PITFALL**: Unsloth's `~/.unsloth/llama.cpp/` contains OLD prebuilt `.so` files from tar.gz that require glibc 2.34+. Replace ALL of them with locally compiled ones:

```bash
BUILD_DIR="$SRC/build/bin"
TARGET="$HOME/.unsloth/llama.cpp"
for lib in libggml-base libggml libggml-cuda libggml-cpu libllama-common libllama libmtmd; do
    rm -f $TARGET/${lib}.so*
    cp -P $BUILD_DIR/${lib}.so* $TARGET/
done
```

### Step 6: Fix libcrypto symlink
```bash
sudo ln -sf /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1 /usr/lib/x86_64-linux-gnu/libcrypto.so.3
sudo ln -sf /usr/lib/x86_64-linux-gnu/libssl.so.1.1 /usr/lib/x86_64-linux-gnu/libssl.so.3
```

## Pitfalls

1. **glibc 2.31**: ALL prebuilt binaries from unslothai/llama.cpp releases (newer/older/portable) require glibc 2.34+. Only source builds work.

2. **libcrypto.so.3**: llama.cpp's cmake auto-detects OpenSSL but OPENSSL_VERSION_SUPPORTED test fails, yet it still links. The resulting `libllama-common.so.0` ends up needing libcrypto.so.3 via version symbol. Fix: symlink or rebuild ensuring cmake doesn't find OpenSSL at all.

3. **Unsloth's own .so files**: Even after compiling llama-server locally, Unsloth loads shared libraries from `~/.unsloth/llama.cpp/` which are the OLD prebuilt ones. Must replace ALL `.so` files, not just the binary.

4. **Missing Python deps**: `unsloth-studio` PyPI package has incomplete dependencies. After install, manually add: `structlog`, `fastapi`, `uvicorn`, `diceware`, `python-jose`, `passlib`, `python-multipart`.

5. **Memory**: A 20GB Q4_K_M model + Unsloth Studio + llama-server can OOM on 62GB RAM. Reduce context length and parallel slots if OOM occurs.

6. **SJTU PyTorch mirror**: `https://mirror.sjtu.edu.cn/pytorch-wheels/whl/cu124` returns 403. Use official `https://download.pytorch.org/whl` instead.

7. **VPN MTU breaks large HTTP requests**: When client connects through VPN (EasyTier, OpenVPN), effective MTU drops to ~1028. HTTP requests >1000 bytes silently fail �?client times out, server never receives. This breaks Hermes Agent (tool definitions push system prompt over 1KB). Fix: `sudo iptables -t mangle -A OUTPUT -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 960` on the client. Make persistent in `/etc/rc.local`. See `references/vpn-network-troubleshooting.md` in `unsloth-studio-deployment` skill for diagnosis steps.

## Performance Tuning

### `--parallel N` for single user
Unsloth defaults to `--parallel 4`. For single-user deployments, pass `-- --parallel 1` to save ~1GB VRAM (fewer KV cache slots). The `--` separator passes extra args directly to llama-server.

```ini
ExecStart=...unsloth run --model ... --max-seq-length 65536 --yes -- --parallel 1
```

Context sizing for 24GB GPU with Q4_K_M (~20GB model):
- `--parallel 1 --max-seq-length 65536`: ~21.2GB total (safe)
- `--parallel 1 --max-seq-length 131072`: ~22.5GB total (works but tight)
- `--parallel 4 --max-seq-length 65536`: ~23.3GB total (minimal headroom)

## Hermes Agent Integration

See `references/hermes-custom-provider-config.md` for full config template and pitfalls.

### Critical: `provider: custom`, not `openai`
For custom OpenAI-compatible endpoints (Unsloth Studio, vLLM, etc.), use `provider: custom`. The `openai` provider is only for OpenAI's own API.

### Critical: `custom_providers` config format
Hermes's `get_custom_provider_context_length()` expects `models` as a **dict**, not a list. If `models` is a list, context detection fails silently and defaults to 256K tokens, breaking compression.

```yaml
# WRONG �?models as list (context_length ignored)
custom_providers:
  - name: my-server
    base_url: http://server:8888/v1
    models:
      - name: model.gguf          # �?list format, won't work
        context_length: 65536

# RIGHT �?models as dict with context_length at provider level
custom_providers:
  - name: my-server
    base_url: http://server:8888/v1
    context_length: 65536          # �?provider-level (required)
    models:
      model.gguf:                  # �?dict format (required)
        context_length: 65536
        timeout_seconds: 300
```

### Critical: model name must match API
The model ID from `/v1/models` is the full file path (e.g. `/home/user/models/model.gguf`), not the short name. Use the full path in `model.default` and `custom_providers.models`.

### Context compression threshold
Hermes compression triggers at `context_length × threshold` tokens. If context_length is wrong (256K default), compression never triggers proactively �?only after server returns 400 errors.

### Yolo mode (no command approval)
```yaml
approvals:
  mode: 'off'
```
Also add to `~/.bashrc`: `export HERMES_YOLO_MODE=1`

## systemd Service Template
```ini
[Unit]
Description=Unsloth Studio
After=network.target

[Service]
Type=simple
User=<user>
Environment=HF_ENDPOINT=https://hf-mirror.com
Environment=CUDA_VISIBLE_DEVICES=0
Environment=LLAMA_SERVER_PATH=/home/<user>/.unsloth/llama.cpp/llama-server
Environment=LD_LIBRARY_PATH=/usr/local/cuda-12.2/targets/x86_64-linux/lib:/usr/local/cuda-12.2/lib64:/home/<user>/.unsloth/studio/unsloth_studio/lib/python3.13/site-packages/nvidia/cublas/lib
Environment=PATH=/home/<user>/.local/bin:/usr/local/cuda-12.2/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/home/<user>/.unsloth/studio/unsloth_studio/bin/unsloth run --model <model-path> --host 0.0.0.0 --port 8888 --max-seq-length 65536 --yes -- --parallel 1
Restart=on-failure
RestartSec=10
TimeoutStartSec=600

[Install]
WantedBy=multi-user.target
```