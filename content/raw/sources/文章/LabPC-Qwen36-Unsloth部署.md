# Qwen3.6-35B-A3B �����沿��ָ��
## Unsloth Studio + Hermes Agent ���� (Ubuntu 20.04 + RTX 4090)

> ��������: 2026-05-29
> ������: zhangwang@10.0.0.102 (Ubuntu 20.04, RTX 4090 24GB, 62GB RAM)
> ģ��: HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive Q4_K_M (20GB)

---

## �ܹ�����

```
[Kali Linux] --VPN/tun0--> [10.0.0.102 Unsloth Studio :8888]
                                |
                                +--> llama-server (CUDA, RTX 4090)
                                +--> Qwen3.6-35B-A3B Q4_K_M GGUF
```

- **Unsloth Studio**: Web UI + OpenAI ���� API + ģ�͹���
- **llama-server**: �ײ��������� (��Դ�����)
- **Hermes Agent**: AI Agent ��ܣ�ͨ�� `provider: custom` ���� Unsloth Studio

---

## �ȿӼ�¼ (�����س̶�����)

### ?? �� 1: Ubuntu 20.04 glibc ̫��

**����**: Ԥ����� llama-server �������ļ�ȫ������:
```
libcrypto.so.3: cannot open shared object file
GLIBC_2.34 not found
GLIBCXX_3.4.30 not found
```

**ԭ��**: Unsloth �ٷ�Ԥ�������� Ubuntu 22.04+ (glibc 2.35)��Ubuntu 20.04 ֻ�� glibc 2.31��

**���**: ��Դ����� llama-server:
```bash
# ��װ CUDA ���빤��
sudo apt-get install -y cuda-nvcc-12-2 libcublas-dev-12-2

# ���� llama-server
cd llama.cpp
mkdir build && cd build
cmake .. -DGGML_CUDA=ON -DCMAKE_CUDA_ARCHITECTURES=89 -DLLAMA_CURL=OFF
cmake --build . --config Release -j$(nproc) --target llama-server
```

### ?? �� 2: Unsloth �þɵ� .so �ļ�

**����**: ����� llama-server ���滻�������ļ�����Ȼ�� `libcrypto.so.3` ����

**ԭ��**: Unsloth �� `~/.unsloth/llama.cpp/` Ŀ¼�²�����Ԥ������� `.so` �������ļ���llama-server ����ʱ���ص�����Щ�ɵ� .so�����������Ǳ���ġ�

**���**: �滻 **ȫ��** `.so` �ļ�:
```bash
cp -P build/bin/lib*.so* ~/.unsloth/llama.cpp/
```

### ?? �� 3: VPN MTU ̫�͵��´�����ʧ��

**����**: 
- �� API ���� (300 �ַ�) �� �ɹ� (0.3 ��)
- �� system prompt �ĵ��� (3000+ �ַ�) �� ��ʱ��������ղ�������
- ����˱��ص����κδ�С���ɹ�

**ԭ��**: Kali ͨ�� EasyTier VPN (tun0) ���ӷ�������ʵ��·�� MTU ֻ�� 1028 �ֽڡ����� ~1175 �ֽڵ� TCP �α���Ƭ��ʧ��

**���**:
```bash
ping -c 2 -s 1000 -M do 10.0.0.102  # �ɹ�
ping -c 2 -s 1400 -M do 10.0.0.102  # ʧ�� (Message too long)
```

**���**: TCP MSS clamping:
```bash
sudo iptables -t mangle -A OUTPUT -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 960
# �־û�
echo '#!/bin/bash
iptables -t mangle -A OUTPUT -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 960
exit 0' | sudo tee /etc/rc.local && sudo chmod +x /etc/rc.local
```

### ?? �� 4: Context Ĭ�� 16384��Hermes ������

**����**: Hermes �� `Context length exceeded: max compression attempts (3) reached`���������־��ʾ `request (17181 tokens) exceeds the available context size (16384 tokens)`��

**ԭ��**: ��Ȼ������������ `--max-seq-length 65536`���� `/v1/models` �˵㱨�� `n_ctx: 16384`��ʵ�������õ�ȷʵ������������ֵ���� Unsloth �ڲ��������� 16384��

**���**: ���� 131072:
```bash
--max-seq-length 131072
```
128K context �� 24GB GPU ��ռ��Լ 2.5GB KV cache (ģ�� 19.7GB + KV 2.5GB = 22.2GB���ɽ���)��

### ?? �� 5: Hermes `provider: openai` ������

**����**: `Unknown provider 'openai'`��

**ԭ��**: `openai` provider �Ǹ� OpenAI �ٷ� API �õġ��Զ��� OpenAI ���ݶ˵���Ҫ�� `provider: custom`��

**���**:
```yaml
model:
  provider: custom  # ���� openai
```

### ?? �� 6: ģ�����Ʊ���ƥ��

**����**: Hermes ���������ģ�ͷ��� 400 �����ʱ��

**ԭ��**: `/v1/models` ���ص�ģ�� ID �������ļ�·�� `/home/zhangwang/models/...gguf`�����Ƕ����ơ�

**���**: Hermes config �� `default` �ֶ�������·��:
```yaml
model:
  default: /home/zhangwang/models/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf
```

### ?? �� 7: xformers ����ʧ��

**����**: `ModuleNotFoundError: No module named 'torch'`

**���**: `uv pip install xformers --no-build-isolation`

### ?? �� 8: LD_LIBRARY_PATH ȱʧ CUDA ·��

**����**: `libcublas.so.12: cannot open shared object file`

**���**: �������������� Unsloth �Զ����:
```bash
sudo ln -sf /usr/local/cuda-12.2 /usr/local/cuda
sudo ln -sf /usr/local/cuda-12.2 /usr/local/cuda-12
```

---

## �����汾ѡ�� (RTX 4090 24GB)

| ���� | ��С | �Ƽ� |
|------|------|------|
| Q2_K_P | 14 GB | ��������Ƽ� |
| Q3_K_P | 17.7 GB | ���� |
| IQ4_XS | 18.7 GB | ���� |
| **Q4_K_M** | **19.7 GB** | **? ���ƽ��** |
| Q4_K_P | 21.8 GB | ƫ�� (KV cache �ռ���) |
| Q5_K_P | 26.1 GB | �Ų��� |

Q4_K_M �� ~4GB �� KV cache������/���ܱ����š�

---

## ���������ļ�

### Unsloth Studio systemd ����

�ļ�: `/etc/systemd/system/unsloth-studio.service`

```ini
[Unit]
Description=Unsloth Studio - Qwen3.6-35B-A3B HauhauCS
After=network.target

[Service]
Type=simple
User=zhangwang
Environment=HF_ENDPOINT=https://hf-mirror.com
Environment=CUDA_VISIBLE_DEVICES=0
Environment=LLAMA_SERVER_PATH=/home/zhangwang/.unsloth/llama.cpp/llama-server
Environment=LD_LIBRARY_PATH=/usr/local/cuda-12.2/targets/x86_64-linux/lib:/usr/local/cuda-12.2/lib64
Environment=PATH=/home/zhangwang/.local/bin:/usr/local/cuda-12.2/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/home/zhangwang/.unsloth/studio/unsloth_studio/bin/unsloth run \
    --model /home/zhangwang/models/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf \
    --host 0.0.0.0 --port 8888 --max-seq-length 131072 --yes
Restart=on-failure
RestartSec=10
TimeoutStartSec=600

[Install]
WantedBy=multi-user.target
```

### Hermes config.yaml (Kali)

�ļ�: `~/.hermes/config.yaml`

```yaml
custom_providers:
- api: http://10.0.0.102:8888/v1
  base_url: http://10.0.0.102:8888/v1
  default_model: /home/zhangwang/models/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf
  models:
  - name: /home/zhangwang/models/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf
    timeout_seconds: 300
  name: unsloth-studio
  request_timeout_seconds: 300
model:
  api_key: <�� Unsloth Studio ��ȡ>
  base_url: http://10.0.0.102:8888/v1
  context_length: 131072
  default: /home/zhangwang/models/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf
  max_output_tokens: 4096
  provider: custom
toolsets:
- file
- terminal
```

---

## �������� (RTX 4090, Q4_K_M, 128K context)

| ���� | ��ʱ |
|------|------|
| ���ʴ� | ~3-4 �� |
| �������� | ~25 �� |
| ���ߵ��� (д�ļ�) | ~22 �� |
| ���ߵ��� (�ն�) | ~70 �� |
| GPU �Դ�ռ�� | 23 GB / 24 GB |

---

## ���� Ollama

```bash
sudo systemctl stop ollama
sudo systemctl disable ollama
sudo rm -rf /usr/share/ollama/.ollama/models
rm -rf ~/.ollama
```

---

## ��ȡ API Key

```bash
# ���� 1: ����־��ȡ
journalctl -u unsloth-studio | grep "API Key"

# ���� 2: Python ������ key
~/.unsloth/studio/unsloth_studio/bin/python -c "
import sys, os
sys.path.insert(0, os.path.expanduser('~/.unsloth/studio/unsloth_studio/lib/python3.13/site-packages/studio/backend'))
os.chdir(os.path.expanduser('~/.unsloth/studio'))
from auth.storage import create_api_key
raw_key, row = create_api_key('admin', 'hermes')
print(raw_key)
"
```

---

## ���ʷ�ʽ

- **Web UI**: http://10.0.0.102:8888 (������򿪣��� bootstrap �����¼)
- **API**: http://10.0.0.102:8888/v1/chat/completions (OpenAI ����)
- **Bootstrap ����**: `~/.unsloth/studio/auth/.bootstrap_password`