     1|---
     2|title: Kiro网关
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, api, docker, proxy]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# kiro-gateway
    12|
    13|AWS Bedrock Claude 代理网关，通过 Kiro 账号获取 Claude API 访问。
    14|
    15|## 关键信息
    16|- **镜像**: ghcr.io/jwadow/kiro-gateway:latest
    17|- **端口**: 8000
    18|- **部署**: [[VPS服务器]] Docker 容器
    19|- **格式**: 仅支持 OpenAI 兼容格式
    20|
    21|## 踩坑记录（3 个关键 Bug）
    22|
    23|### Bug 1: Health check 工具缺失
    24|- **问题**: Health check 用 `wget`，但容器只有 python3
    25|- **后果**: 4001 次连续失败 → sub2api 排除了 Claude-Kiro 账号
    26|- **修复**: 改用 `python3 -c 'import urllib.request; urlopen("http://localhost:8000/health")'`
    27|
    28|### Bug 2: Token 文件只读挂载
    29|- **问题**: Volume mount 加了 `:ro` → 无法刷新 token
    30|- **修复**: 移除 `:ro`
    31|
    32|### Bug 3: Docker 网络隔离
    33|- **问题**: 重建容器后 kiro-gateway 加入了不同网络 → sub2api DNS 解析失败
    34|- **修复**: `docker network connect sub2api-deploy_sub2api-network kiro-gateway`
    35|
    36|## API 架构
    37|```
    38|[[超梦API代理平台]] -> kiro-gateway:8000 -> AWS Bedrock Claude
    39|```
    40|
    41|## 模型映射
    42|- gpt-5.5 → claude-opus-4.7
    43|- gpt-5.4 → claude-sonnet-4.6
    44|- deepseek-chat → claude-sonnet-4.6（Hermes 兼容）
    45|
    46|## 相关
    47|- [[超梦API代理平台]] — 上游 API 聚合平台
    48|- [[Docker网络隔离]] — 网络问题详解
    49|- [[Hermes-Claude配置]] — Hermes 配置方法
    50|