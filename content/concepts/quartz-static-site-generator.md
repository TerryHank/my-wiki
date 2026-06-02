---
title: Quartz 静态网站生成器
created: 2025-06-18
updated: 2025-06-18
type: concept
tags: [static-site-generator, markdown, github-pages, deployment]
sources: [quartz.jzhao.xyz, GitHub]
confidence: high
---

# Quartz 静态网站生成器

Quartz 是一个快速、功能齐全的静态网站生成器，可以将 Markdown 内容转换为功能完整的网站。

## 核心特性

- **Obsidian 兼容性**：支持 Obsidian 笔记格式
- **全文搜索**：内置搜索功能
- **图视图**：知识图谱可视化
- **维基链接**：支持双链笔记
- **反向链接**：自动生成反向链接
- **LaTeX 支持**：数学公式渲染
- **语法高亮**：代码块语法高亮
- **弹出预览**：链接内容预览
- **Docker 支持**：容器化部署
- **国际化**：多语言支持
- **评论系统**：集成评论功能

## 系统要求

- Node.js v22+
- npm v10.9.2+

## 部署方式

### GitHub Pages 部署

1. **创建 GitHub Actions workflow**
   ```yaml
   # quartz/.github/workflows/deploy.yml
   name: Deploy Quartz site to GitHub Pages
   on:
     push:
       branches:
         - main
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v3
         - name: Install dependencies
           run: npm install
         - name: Build Quartz site
           run: npx quartz build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./public
   ```

2. **配置 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 "main" 分支
   - 设置自定义域名（可选）

### Cloudflare Pages 部署

1. **配置 Cloudflare Pages**
   - 生产分支：v5
   - 框架预设：None
   - 构建命令：`npx quartz plugin install && npx quartz build`
   - 构建输出目录：`public`

2. **添加自定义域名**
   - 在 Cloudflare 仪表板中配置自定义域名

## 部署流程

1. **本地开发**
   ```bash
   npx quartz dev
   ```
   网站运行在 http://localhost:8080

2. **构建网站**
   ```bash
   npx quartz build
   ```

3. **插件管理**
   ```bash
   npx quartz plugin install  # 安装插件
   npx quartz plugin install --from-config  # 从配置安装
   ```

## 注意事项

- **baseUrl 配置**：确保在 `quartz.config.yaml` 中正确配置 `baseUrl`
- **插件同步**：保持插件版本同步，使用 lockfile
- **构建命令**：Cloudflare Pages 需要添加 `git fetch --unshallow` 以获取完整历史
- **自定义域名**：需要正确配置 DNS

## 相关资源

- [Quartz 官方文档](https://quartz.jzhao.xyz/)
- [GitHub 仓库](https://github.com/jackyzha0/quartz)
- [部署指南](https://quartz.jzhao.xyz/hosting)
- [插件系统](https://quartz.jzhao.xyz/plugins)