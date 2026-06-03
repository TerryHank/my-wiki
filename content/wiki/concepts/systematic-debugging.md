---
type: concept
title: 系统化调试
created: 2026-05-30
updated: 2026-05-30
tags: [调试，方法论，ai 技能]
related: [test-driven-development, codex-cli, cv-pipeline-debugger]
sources: ["Codex-MCP 工具.md", "Codex-MCP工具.md"]
---
# 系统化调试

**系统化调试 (Systematic Debugging)** 是一种结构化的问题诊断方法论，在本项目中被具体化为 [[codex-cli]] 的一项核心**插件技能**。它旨在将调试过程从随机的“试错法”提升为可重复、逻辑严密的科学过程。

## 核心特征

- **假设驱动**：在修改代码前，先基于现象提出明确的故障假设。
- **增量验证**：通过最小化的变更来验证假设，避免大规模重构带来的不确定性。
- **工具辅助**：优先利用专用工具（如 `cv-pipeline-debugger`）获取深层上下文，而非仅依赖打印日志。

## 与 TDD 的关系

系统化调试与 [[test-driven-development]] (TDD) 相辅相成。TDD 通过预先编写的测试用例防止回归错误，而系统化调试则是在错误发生时，利用测试用例作为定位问题的锚点，快速缩小故障范围。

## 在 CV 领域的应用

在计算机视觉项目中，系统化调试尤为重要。面对复杂的训练管线，该技能指导代理：
1.  检查数据加载与增强环节（使用 COCO8 等小数据集验证）。
2.  隔离模型架构组件。
3.  分析损失曲线与梯度流动。
4.  利用 `cv-pipeline-debugger` 等工具进行自动化诊断。