---
type: concept
title: Docker 化部署流程
created: 2026-05-30
updated: 2026-05-30
tags: [DevOps, 容器化，部署]
related: [aiclient2api, new-api, codex-cli]
sources: ["Codex 杂项任务.md", "Codex杂项任务.md"]
---
# Docker 化部署流程

**Docker 化部署** 是当前项目中后端服务（如 [[aiclient2api]] 和 [[new-api]]）的标准交付方式。

## 核心实践
- **容器封装**：将应用及其依赖打包为 Docker 镜像，消除环境差异。
- **自动化运维**：利用 [[codex-cli]] 执行 `docker build`, `docker run`, `docker compose` 等命令，实现一键部署和重启。
- **资源隔离**：确保多个 API 服务在同一主机上运行时互不干扰。

## 优势
- 提高了部署的可重复性和稳定性。
- 简化了从开发环境到生产环境（或实验服务器）的迁移过程。