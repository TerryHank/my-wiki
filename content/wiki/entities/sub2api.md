---
type: entity
title: sub2api
created: 2026-05-30
updated: 2026-05-30
tags: [network, infrastructure, project]
related: [codex-compatibility-layer, docker-network-isolation]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# sub2api

**sub2api** 是托管 [[codex-compatibility-layer]] 的底层网络架构项目或部署环境名称。

## 角色
- **网络容器**: 它定义了 Docker 网络 `sub2api-deploy_sub2api-network`，用于隔离和连接 Codex 代理服务（`codex-deepseek`, `codex-claude`）与上游网关（如 [[kiro-gateway]]）。
- **部署上下文**: Codex CLI 通过 `sub2api` 配置连接到 VPS 上的兼容层服务。

## 已知问题
在依赖服务重建后，`sub2api` 网络有时无法自动恢复与容器的连接，需要人工干预执行 `docker network connect` 命令。

## 相关实体
- [[codex-compatibility-layer]]
- [[docker-network-isolation]]