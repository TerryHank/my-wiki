---
type: entity
title: AIClient2API
created: 2026-05-30
updated: 2026-05-30
tags: [后端服务，API, Docker]
related: [docker-deployment, codex-cli]
sources: ["Codex 杂项任务.md", "Codex杂项任务.md"]
---
# AIClient2API

**AIClient2API** 是一个后端 API 服务项目，旨在为 AI 客户端提供数据接口支持。

## 部署方式
- **容器化**：采用 Docker 进行标准化部署，确保环境一致性。
- **运维工具**：通过 [[codex-cli]] 执行构建和启动流程。

## 关联服务
- 与 **New-API** 项目并列，共同构成后端服务层。
- 依赖于 [[docker-deployment]] 流程进行生命周期管理。