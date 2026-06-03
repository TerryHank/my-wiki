---
type: entity
title: 验收表单系统 (Acceptance Form System)
created: 2026-04-03
updated: 2026-04-03
tags: [project, internal-tool, fullstack, vue3, nodejs]
related: [vitepress, sqlite, test-driven-development, grid-mapping, optimistic-update]
sources: ["2026-04-03 验收表单实现.md"]
---

# 验收表单系统 (Acceptance Form System)

验收表单系统是一个基于 **VitePress + Node.js + SQLite** 技术栈构建的单机内网验收录入工具。该系统旨在替代传统的纸质或重型 ERP 流程，提供轻量、高效、可视化的点位验收解决方案。

## 核心功能

- **点位管理**: 支持 **1200** 个点位的精细化管理。
- **多场景录入**: 每个点位支持 **3** 个场景（铝模自然阴天、强光、阴雨天弱光），每场景 **5** 次尝试。
- **二维点阵总览**: 右侧提供 30x40 网格可视化，实时显示各点位验收状态（未开始、进行中、已完成）。
- **自动保存**: 采用 [[Optimistic Update]] 策略，用户操作即时响应并异步持久化。
- **进度统计**: 实时计算并展示整体验收进度。

## 技术架构

- **前端**: [[Vue 3]] 组件化开发，托管于 [[VitePress]] 站点中。
- **后端**: [[Node.js]] 原生 HTTP 服务，提供 RESTful API。
- **数据库**: [[SQLite]] 本地文件存储，预种子化 18,000 条记录。
- **开发模式**: 严格遵循 [[Test-Driven-Development]] (TDD) 流程。

## 业务规则

1. **网格映射**: 点位 ID (1-1200) 与 30 行 40 列坐标双向转换。
2. **状态逻辑**:
   - **未开始**: 0 次选中。
   - **进行中**: 部分选中。
   - **高级进行中**: 3 个场景均有选中记录。
   - **已完成**: 15 次尝试全部选中。
3. **数据一致性**: 前后端共享 `src/shared` 常量，确保映射逻辑统一。

## 项目状态

- **阶段**: 实施计划已制定，包含详细的 7 大任务模块。
- **待解决**: 数据自动备份机制、高并发写入锁处理、万级点位扩展性验证。

## 文件结构概览

- `docs/`: VitePress 站点及 Vue 组件。
- `src/shared/`: 共享常量、类型、工具函数。
- `src/server/`: 数据库连接、仓储层、HTTP 服务。
- `src/client/`: API 封装、状态管理。
- `tests/`: 全栈测试用例。
