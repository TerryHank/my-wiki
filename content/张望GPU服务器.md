     1|---
     2|title: zhangwang 服务器 (10.0.0.102)
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [server, gpu, ai, deployment]
     7|sources: [LabPC Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# zhangwang 服务器 (10.0.0.102)
    12|
    13|远程 GPU 服务器，用于本地 LLM 推理和模型训练。
    14|
    15|## 基本信息
    16|- **地址**: zhangwang@10.0.0.102 (EasyTier VPN)
    17|- **OS**: Ubuntu 20.04
    18|- **GPU**: RTX 4090 24GB
    19|- **内存**: 62 GB RAM
    20|
    21|## 用途
    22|- Unsloth Studio 部署 Qwen3.6-35B
    23|- 模型训练（量体 HMR 模型）
    24|- 本地 LLM API 服务
    25|
    26|## EasyTier 配置
    27|```bash
    28|sudo ./easytier-core --network-name Robot -p tcp://134.175.238.239:11010 -i 10.0.0.102 --hostname zhangwang
    29|```
    30|
    31|## 相关
    32|- [[Ollama本地部署]] — 模型部署
    33|- [[EasyTier组网]] — VPN 组网
    34|- [[人体量体模型]] — 训练任务
    35|