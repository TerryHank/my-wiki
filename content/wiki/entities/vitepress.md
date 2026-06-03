---
type: entity
title: VitePress
created: 2026-04-03
updated: 2026-04-03
tags: [tool, static-site-generator, vue, documentation]
related: [vue-3, vite, acceptance-form-system]
sources: ["2026-04-03 验收表单实现.md"]
---

# VitePress

VitePress 是一个基于 Vite 和 Vue 3 的静态站点生成器（SSG），专为技术文档设计。它以极速的热更新和构建速度著称。

## 非常规用法：作为应用壳子 (App Shell)

在 [[2026-04-03-验收表单实现]] 项目中，VitePress 被用于非典型场景：
- **传统用途**: 生成静态 Markdown 文档站点。
- **本项目用途**: 作为单页应用（SPA）的容器。
  - 利用 `docs/index.md` 挂载自定义 Vue 组件 (`AcceptanceApp.vue`)。
  - 通过自定义主题 (`theme/index.ts`) 注入全局样式和逻辑。
  - 结合 Node.js 后端，实现动态数据交互，而非纯静态内容。

## 架构优势

- **开发体验**: 享受 Vite 的秒级启动和热更新。
- **生态整合**: 天然支持 Vue 3 组件系统，无需额外配置 Webpack 或 Vite 项目结构。
- **部署简便**: 构建产物为静态文件，易于托管，配合 Node 服务即可运行完整应用。

## 局限性

- **SEO**: 由于主要作为内网工具使用，SEO 并非关注点，但这种用法不适合需要搜索引擎优化的场景。
- **路由**: 需处理 VitePress 默认路由与自定义应用路由的潜在冲突。

## 相关资源

- [[Vue 3]]: 核心 UI 库。
- [[AcceptanceFormSystem]]: 基于 VitePress 构建的具体应用案例。
