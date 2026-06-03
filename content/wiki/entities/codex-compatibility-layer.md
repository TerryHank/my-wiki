---
type: entity
title: Codex 兼容层
created: 2026-05-30
updated: 2026-05-30
tags: [tool, proxy, codex, infrastructure]
related: [codex-cli, deepseek-api, kiro-gateway, hermes-agent, sub2api]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# Codex 兼容层

**Codex 兼容层** 是部署在 VPS (192.238.232.34) 上的一组 API 代理服务，包含 `codex-deepseek` 和 `codex-claude` 两个核心组件。它作为 [[codex-cli]] 的后端扩展，将 Codex 专有的 Responses API 协议转换为标准的 Chat Completions API，从而实现了对多种大模型后端的支持。

## 架构组成

该兼容层运行在 Docker 环境中，网络名为 `sub2api-deploy_sub2api-network`。

### 1. codex-deepseek
- **功能**: 代理 DeepSeek API 请求。
- **端口**: 11435
- **上游**: `api.deepseek.com`
- **特性**: 实施了连接池复用优化。

### 2. codex-claude
- **功能**: 代理 AWS Bedrock Claude 模型请求。
- **端口**: 11436
- **上游**: 通过 [[kiro-gateway]] (端口 8000) 转发。

## 关键特性

- **统一接口**: 允许 [[codex-cli]] 使用统一的模型名称（如 `gpt-5.5`）调用不同后端的模型。
- **性能优化**: 解决了默认模式下频繁 TLS 握手的性能瓶颈。
- **安全适配**: 针对 [[hermes-agent]] 的密钥脱敏机制，采用了 Base64 编码绕过方案。

## 运维记录

- **网络故障**: 当上游服务（如 Kiro Gateway）重建容器时，Docker 网络不会自动重连，需手动执行 `docker network connect` 修复。
- **部署位置**: `/opt/codex-deepseek`, `/opt/codex-claude`。

## 相关实体
- [[sub2api]] — 底层网络架构项目
- [[deepseek-api]] — 上游模型服务
- [[kiro-gateway]] — Claude 路由网关