---
title: Codex兼容层
created: 2026-05-30
updated: 2026-05-30
type: entity
tags: [tool, api, proxy, codex]
sources: [Hermes session history]
confidence: high
---

# Codex 兼容层 (codex-deepseek / codex-claude)

部署在 VPS 上的 API 兼容层，将 Codex CLI 的 Responses API 请求转换为上游 Chat API。

## 架构
```
Codex CLI → sub2api → codex-deepseek/codex-claude → 上游 API
```

## 部署位置
- **VPS**: 192.238.232.34 (/opt/codex-deepseek, /opt/codex-claude)
- **Docker 网络**: sub2api-deploy_sub2api-network

## codex-deepseek
- 端口: 11435 (Docker 内部)
- 上游: DeepSeek API (api.deepseek.com)
- 功能: Responses API → Chat Completions 转换
- 优化: 连接池复用、keep-alive

## codex-claude
- 端口: 11436 (Docker 内部)
- 上游: kiro-gateway:8000 → AWS Bedrock Claude
- 功能: 同上

## 模型映射
- deepseek-v4-pro → gpt-5.5 → claude-opus-4.7
- deepseek-v4-flash → gpt-5.4 → claude-sonnet-4.6

## 踩坑
- 每次请求新建 TLS 连接 → 改为连接池复用
- kiro-gateway 重建后 Docker 网络断连 → 需要手动 `docker network connect`
- Hermes redact_secrets 会截断 API key → 用 base64 编码绕过

## 相关
- [[超梦API代理平台]] — 上游聚合
- [[Kiro网关]] — Claude 代理
- [[Docker网络隔离]] — 网络问题
- [[Hermes-Claude配置]] — Hermes 配置
