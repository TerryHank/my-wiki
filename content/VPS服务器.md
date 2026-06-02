     1|---
     2|title: VPS 192.238.232.34
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [server, vps, deployment]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# VPS 192.238.232.34
    12|
    13|主要的云端服务器，运行 API 代理服务。
    14|
    15|## 连接信息
    16|- **IP**: 192.238.232.34
    17|- **SSH**: root@192.238.232.34
    18|- **域名**: [[cm.inspiro.top域名]]
    19|
    20|## 运行服务
    21|- [[超梦API代理平台]] v0.1.130 (Docker)
    22|- PostgreSQL 18-alpine
    23|- Redis 8-alpine
    24|- [[Kiro网关]] (Docker)
    25|
    26|## 注意事项
    27|- 内存约 900MB — Go 编译可能 OOM
    28|- DeepSeek API 延迟问题: VPS 在美国，DeepSeek 在中国 → 150-200ms+
    29|
    30|## 相关
    31|- [[超梦API代理平台]] — 主要服务
    32|- [[Kiro网关]] — Claude 代理
    33|- [[Docker网络隔离]] — 网络配置
    34|