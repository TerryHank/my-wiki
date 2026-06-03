---
type: concept
title: 蛇形映射算法 (Snake Mapping Algorithm)
created: 2026-04-04
updated: 2026-04-04
tags: [algorithm, ui-layout, geometry]
related: [grid-mapping, acceptance-form-system]
sources: ["2026-04-04 矩阵工作台实现.md"]
---

# 蛇形映射算法

蛇形映射算法（Snake Mapping Algorithm）是一种将一维点位 ID 序列映射到二维网格坐标的特定策略。在 [[acceptance-form-system]] 的重构中，该算法被用作核心视觉和逻辑布局的基础，以确保点位在物理空间上的连续性与操作便利性。

## 算法原理

与传统的从左到右、从上到下的 raster 扫描不同，蛇形映射在每一行改变方向：
- **偶数行**（或奇数行，视定义而定）：从左向右编号。
- **奇数行**（或偶数行）：从右向左编号。

这种布局形成了一条连续的“蛇形”路径，使得相邻的 ID 在二维空间上也是相邻的（除了行尾换行处），符合人类在物理空间巡检时的自然路径。

## 数学实现

在项目中，该算法通过以下核心函数实现（基于 TypeScript）：

### 1. 坐标获取 (`getPointCoordinate`)
根据点位 ID 和列数计算二维坐标 `(x, y)`：
$$
\begin{aligned}
\text{zeroBased} &= \text{pointId} - 1 \\
y &= \lfloor \text{zeroBased} / \text{columnCount} \rfloor \\
\text{offset} &= \text{zeroBased} \pmod{\text{columnCount}} \\
x &= \begin{cases} \text{offset} & \text{if } y \text{ is even} \\ \text{columnCount} - 1 - \text{offset} & \text{if } y \text{ is odd} \end{cases}
\end{aligned}
$$

### 2. ID 反查 (`getPointIdAtCoordinate`)
根据坐标 `(x, y)` 反查点位 ID，需处理超出总点数范围的空单元格：
$$
\begin{aligned}
\text{base} &= y \times \text{columnCount} \\
\text{offset} &= \begin{cases} x & \text{if } y \text{ is even} \\ \text{columnCount} - 1 - x & \text{if } y \text{ is odd} \end{cases} \\
\text{pointId} &= \text{base} + \text{offset} + 1
\end{aligned}
$$
若计算出的 `pointId` 大于总点数，则返回 `null`。

## 应用场景

- **验收表单系统**: 用于生成右侧密集矩阵视图（[[acceptance-workbench-ui]]），确保操作员在屏幕上看到的点位分布与实际物理巡检路径一致。
- **动态网格**: 配合 `getMatrixDimensions` 函数，根据总点数动态计算最优的行列数（接近正方形），适应不同规模的验收任务。

## 相关概念

- [[grid-mapping]]: 更通用的网格映射概念。
- [[acceptance-form-system]]: 应用该算法的具体系统。