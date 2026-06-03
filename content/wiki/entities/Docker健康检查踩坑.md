---
title: Docker健康检查踩坑
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [Docker, 调试, 部署]
confidence: high
---

# Docker Health Check 踩坑

## 经验
1. 不要假设容器有 wget/curl → 用 python3 urllib
2. Health check 连续失败 → 自动排除账号
3. Volume `:ro` → 无法刷新 token

## 相关
- [[Kiro网关]] — 受影响案例
- [[Docker网络隔离]] — 网络问题
