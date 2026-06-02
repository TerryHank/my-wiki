     1|---
     2|title: LabPC (10.0.0.2)
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [server, windows, workstation]
     7|sources: [LabPC Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# LabPC (10.0.0.2)
    12|
    13|实验室 Windows 11 工作站，运行 ROS2/Gazebo 仿真和本地 LLM 推理。
    14|
    15|## 基本信息
    16|- **主机名**: LabPC
    17|- **用户**: labpc\virtual (SSH 用户名: Virtual)
    18|- **OS**: Windows 11 企业版 (Build 26200)
    19|- **CPU**: Intel i5/i7 13代 ~3.4GHz
    20|- **内存**: 32 GB
    21|- **Node.js**: v23.11.1
    22|- **本地 IP**: 192.168.31.10 (以太网)
    23|- **VPN IP**: 10.0.0.2 (EasyTier Wintun)
    24|
    25|## SSH 连接
    26|```bash
    27|ssh -i ~/.ssh/id_ed25519 Virtual@10.0.0.2
    28|```
    29|- 公钥认证（ed25519）
    30|- 通过 EasyTier VPN 隧道
    31|
    32|## 运行的服务
    33|- [[Hermes智能体]] (Windows)
    34|- Ollama / 本地 LLM（已迁移到 D:\Ollama）
    35|- [[ROS2机器人控制]] + [[Gazebo仿真环境]]
    36|- [[EasyTier组网]]
    37|- Hermes WebUI (localhost:8648)
    38|
    39|## 相关
    40|- [[ROS2机器人控制]] — ROS2 机器人开发
    41|- [[Gazebo仿真环境]] — Gazebo 仿真环境
    42|- [[人体量体模型]] — 量体模型训练
    43|- [[EasyTier组网]] — VPN 组网
    44|