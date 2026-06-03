---
type: concept
title: 二维点阵映射 (Grid Mapping)
created: 2026-04-03
updated: 2026-04-03
tags: [algorithm, data-visualization, geometry]
related: [acceptance-form-system]
sources: ["2026-04-03 验收表单实现.md"]
---

# 二维点阵映射 (Grid Mapping)

二维点阵映射是一种将一维线性索引（如点位 ID）与二维坐标（行、列）相互转换的算法技术。在数据可视化和网格化界面设计中至关重要。

## 算法原理

假设网格总列数为 $C$，行数为 $R$，点位 ID 为 $P$（从 1 开始）：

### 1. ID 转坐标 (ID to Position)
$$
\text{zeroBased} = P - 1 \\
\text{row} = \lfloor \frac{\text{zeroBased}}{C} \rfloor + 1 \\
\text{col} = (\text{zeroBased} \pmod C) + 1
$$

### 2. 坐标转 ID (Position to ID)
$$
P = (\text{row} - 1) \times C + \text{col}
$$

## 本项目应用

在 [[acceptance-form-system]] 中，系统管理 **1200** 个验收点位，映射规则如下：
- **网格尺寸**: 30 行 × 40 列。
- **边界条件**:
  - 点位 1 映射为 (行 1, 列 1)。
  - 点位 1200 映射为 (行 30, 列 40)。
  - 行 2 列 1 映射为点位 41。

## 实现代码示例 (TypeScript)

```typescript
const GRID_COLUMNS = 40;

export function getPointPosition(pointId: number) {
  const zeroBased = pointId - 1;
  return {
    row: Math.floor(zeroBased / GRID_COLUMNS) + 1,
    col: (zeroBased % GRID_COLUMNS) + 1
  };
}

export function getPointIdFromPosition(row: number, col: number) {
  return (row - 1) * GRID_COLUMNS + col;
}
```

## 应用场景

- **可视化总览**: 在 [[PointGrid]] 组件中渲染二维点阵。
- **数据查询**: 将用户点击的坐标快速转换为数据库主键。
- **状态着色**: 根据计算出的状态动态渲染网格颜色。
