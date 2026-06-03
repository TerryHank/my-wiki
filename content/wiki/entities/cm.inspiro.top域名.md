     1|---
     2|title: cm.inspiro.top
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [domain, api, networking]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# cm.inspiro.top
    12|
    13|[[超梦API代理平台]] 的 API 网关域名。
    14|
    15|- **指向**: 192.238.232.34（[[VPS服务器]]）
    16|- **保护**: Cloudflare WAF
    17|- **用途**: 统一 AI API 入口
    18|
    19|> 注意: Cloudflare WAF 会拦截非浏览器 HTTP 客户端（如 httpx），返回 403。
    20|> Hermes 配置时应使用直连 IP 或 SSH 隧道，不要走 Cloudflare。
    21|
    22|## 相关
    23|- [[超梦API代理平台]] — 后端服务
    24|- [[Cloudflared隧道]] — Cloudflare 隧道工具
    25|