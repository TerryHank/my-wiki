---
type: concept
title: API 兼容层模式
created: 2026-05-30
updated: 2026-05-30
tags: [architecture, api, design-pattern]
related: [codex-compatibility-layer, model-mapping, connection-pooling]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# API 兼容层模式

**API 兼容层 (API Compatibility Layer)** 是一种中间件设计模式，旨在解决客户端协议与多种后端服务协议不匹配的问题。在 AI 开发场景中，它常用于将特定的客户端协议（如 Codex Responses API）转换为通用的标准协议（如 OpenAI Chat Completions API）。

## 核心价值

1.  **后端透明化**: 客户端无需关心实际调用的模型提供商（如 DeepSeek, AWS Bedrock, Azure OpenAI），只需通过统一的接口和模型名称进行调用。
2.  **热插拔能力**: 支持在不修改客户端代码的情况下，动态切换底层模型提供商。
3.  **集中优化**: 将连接管理、缓存、限流等横切关注点集中在代理层处理，例如实施**连接池复用**以降低 TLS 握手延迟。

## 关键技术要素

### 协议转换
核心功能是请求/响应格式的重写。例如，将 Codex 特有的 `responses` 对象映射为标准的 `messages` 数组和 `choices` 结构。

### 模型映射 (Model Mapping)
建立逻辑模型名称与物理模型 ID 的映射表。
- **逻辑名**: `gpt-5.5`
- **物理名**: `deepseek-v4-pro` 或 `claude-opus-4.7`
这种映射允许上层应用使用统一的标识符，而底层路由根据配置指向不同的 API。

### 连接管理
对于高并发或低延迟场景，兼容层必须管理上游连接。
- **问题**: 默认 HTTP 客户端可能为每个请求建立新的 TLS 连接，导致显著延迟。
- **方案**: 启用 **Keep-Alive** 和 **连接池复用**，维持长连接以复用 TCP/TLS 会话。

## 应用场景
- **多模型路由**: 在 [[codex-compatibility-layer]] 中，同时支持 DeepSeek 和 Claude 模型。
- **本地代理**: 在受限网络环境中，通过本地代理访问外部 API，统一鉴权和审计。

## 相关概念
- [[model-mapping]]
- [[connection-pooling]]
- [[codex-compatibility-layer]]