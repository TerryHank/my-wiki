     1|---
     2|title: 超梦API代理平台
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, api, docker, deployment]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# sub2api
    12|
    13|超梦 API 代理平台（sub2api），将各种 AI API 聚合为统一的 OpenAI 兼容接口。
    14|
    15|## 关键信息
    16|- **版本**: v0.1.130
    17|- **部署**: Docker (chaomeng-sub2api:0.1.130 + PostgreSQL 18 + Redis 8)
    18|- **域名**: [[cm.inspiro.top域名]] (Cloudflare WAF 保护)
    19|- **VPS**: [[VPS服务器]]
    20|- **Docker 网络**: sub2api-deploy_sub2api-network
    21|- **Admin**: root@inspiro.top (id=7, role=admin)
    22|
    23|## 架构
    24|```
    25|Client -> cm.inspiro.top/v1 -> sub2api:8080 -> channels -> upstream APIs
    26|```
    27|
    28|## 频道配置
    29|| 频道 | ID | 上游 | 组 |
    30||------|-----|------|-----|
    31|| DeepSeek | 1 | api.deepseek.com | 1, 6 |
    32|| Claude-Kiro | 2 | kiro-gateway:8000/v1 | 5, 6 |
    33|
    34|## API Keys
    35|- My_Codex (id=10) → group 6
    36|
    37|## 常用操作
    38|- 批量导入账号: `POST /api/v1/admin/accounts/batch`
    39|- 导入/导出 UI: 账号管理 → 更多操作 → 数据操作
    40|- model_mapping: 频道和账号的映射必须一致，删除冲突映射
    41|
    42|## 踩坑记录
    43|- CRS = ChatGPT Reverse-engineered Service（共享 OAuth 账号池）
    44|- 103 个 OpenAI OAuth 账号在 2026-05-24 被批量封禁
    45|- Built-in Responses → Chat fallback 机制
    46|
    47|## 相关
    48|- [[Kiro网关]] — Claude API 代理
    49|- [[Docker网络隔离]] — Docker 网络隔离问题
    50|- [[VPS服务器]] — 部署服务器
    51|