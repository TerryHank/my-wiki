---
type: entity
title: 验收工作台 UI (Acceptance Workbench UI)
created: 2026-04-04
updated: 2026-04-04
tags: [ui-design, vue, component]
related: [acceptance-form-system, pointinspector, pointgrid]
sources: ["2026-04-04 矩阵工作台实现.md"]
---

# 验收工作台 UI

验收工作台 UI 是 [[acceptance-form-system]] 在 2026-04-04 重构计划中提出的新一代用户界面架构，代号为"A 方案”。它旨在解决旧版系统无法兼顾局部细节操作与全局概览的问题。

## 布局架构

界面采用双栏布局（Dual-Pane Layout）：

### 1. 左侧：四宫格检查器 (PointInspector)
- **结构**: 固定显示 `2x2` 的四个点位卡片。
- **内容**: 展示当前选中点及其在蛇形序列中的前后相邻点。
- **功能**: 提供详细的操作入口，包括状态切换（成功/失败）、备注编辑、坐标显示。
- **目的**: 提供局部上下文，方便操作员快速对比和连续处理相邻点位，减少视线跳跃。

### 2. 右侧：密集矩阵总览 (PointGrid)
- **结构**: 根据总点数动态生成的网格视图。
- **布局**: 采用 [[snake-mapping-algorithm]] 进行点位排列。
- **视觉**:
  - **正常点**: 默认样式（如绿色或灰色）。
  - **失败点**: 红色高亮。
  - **悬停**: 显示点号、坐标及当前场景备注。
  - **坐标轴**: 外围显示 X/Y 坐标轴，辅助定位。
- **目的**: 提供全局视角，让操作员一目了然地掌握整体验收进度和异常分布。

## 交互逻辑

- **联动**: 点击右侧矩阵中的点位，左侧四宫格自动切换至该点所在的组。
- **状态反馈**: 任何状态变更（如标记失败）立即通过 [[optimistic-update]] 反映在 UI 上。
- **响应式**: 矩阵列数根据总点数动态计算，保持接近正方形的视觉效果。

## 技术实现

- **框架**: Vue 3 + TypeScript
- **组件**:
  - `PointInspector.vue`: 实现四宫格逻辑。
  - `PointGrid.vue`: 实现矩阵渲染与悬停提示。
  - `AcceptanceApp.vue`: 主容器，协调双栏布局。
- **样式**: 使用 CSS Grid 进行精确布局，强调秩序感。

## 相关实体

- [[acceptance-form-system]]: 所属系统。
- [[vitepress]]: 承载该 UI 的静态站点生成器。