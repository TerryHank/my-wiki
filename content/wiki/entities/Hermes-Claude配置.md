---
title: Hermes-Claude配置
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [Hermes, 配置, API]
confidence: high
---

# Hermes通过Kiro使用Claude

## 关键: 必须用 custom provider
```bash
hermes config set model.provider custom
hermes config set model.default claude-sonnet-4.6
```

## 注意
- 不要用 anthropic provider
- 不要走 Cloudflare WAF

## 相关
- [[Hermes智能体]] — Agent 配置
- [[Kiro网关]] — 代理网关
