     1|---
     2|title: EasyTier VPN
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, networking, vpn]
     7|sources: [LabPC Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# EasyTier VPN
    12|
    13|P2P VPN 组网工具，用于连接实验室机器。
    14|
    15|## 网络拓扑
    16|- LabPC (10.0.0.2) — Windows, Wintun 驱动
    17|- zhangwang 服务器 (10.0.0.102) — Linux
    18|- Robot RPi (10.0.0.66) — Raspberry Pi
    19|
    20|## 命令
    21|```bash
    22|# Linux 端
    23|sudo ./easytier-core --network-name Robot -p tcp://134.175.238.239:11010 -i 10.0.0.x --hostname xxx
    24|```
    25|
    26|## 开机自启（Windows）
    27|- EasyTier GUI (Tauri) 自启需要延迟 → [[Windows自启动调试]]
    28|- `start-easytier.bat` + 15 秒延迟
    29|
    30|## 踩坑
    31|- Tauri 应用在 DWM 初始化前启动会崩溃
    32|- 代理: 端口 7897，但开了 TUN 转发后可直连
    33|
    34|## 相关
    35|- [[LabPC工作站]] — VPN 节点
    36|- [[Windows自启动调试]] — 自启问题
    37|