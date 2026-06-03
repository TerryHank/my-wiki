---
type: concept
title: 连接池复用
created: 2026-05-30
updated: 2026-05-30
tags: [performance, networking, optimization]
related: [api-compatibility-layer, codex-compatibility-layer]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# 连接池复用

**连接池复用 (Connection Pooling)** 是一种网络性能优化技术，通过维护一组已建立的数据库或网络连接，避免在每次请求时都重新执行昂贵的连接建立过程（如 TCP 三次握手和 TLS 握手）。

## 背景与问题
在 API 代理或网关服务（如 [[codex-compatibility-layer]]）中，如果采用默认的 HTTP 客户端配置，每次转发请求到上游 API 时都会新建一个 TLS 连接。
- **开销**: TLS 握手涉及多次往返通信和复杂的加密计算，显著增加请求延迟（Latency）。
- **资源**: 频繁创建和销毁连接会消耗更多的 CPU 和内存资源。

## 解决方案
实施连接池复用机制：
1.  **Keep-Alive**: 启用 HTTP 持久连接，允许在单个 TCP 连接上发送多个请求。
2.  **池化管理**: 维护一个固定大小或动态增长的连接池。当新请求到来时，从池中获取空闲连接；请求结束后，将连接归还池中而非关闭。

## 实证效果
在 [[codex-compatibility-layer]] 的部署中，从“每次请求新建 TLS 连接”模式切换到“连接池复用”模式后，显著降低了 API 调用的端到端延迟，提升了 Codex CLI 的响应速度。

## 相关技术
- **HTTP/2**: 原生支持多路复用，进一步优化连接效率。
- **上游限流**: 连接池大小需根据上游 API 的速率限制（Rate Limit）进行合理配置，避免触发封禁。

## 参见
- [[api-compatibility-layer]]
- [[codex-compatibility-layer]]