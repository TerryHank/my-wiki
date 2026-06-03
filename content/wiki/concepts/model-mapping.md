---
type: concept
title: 模型映射
created: 2026-05-30
updated: 2026-05-30
tags: [abstraction, api, routing]
related: [api-compatibility-layer, codex-compatibility-layer]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# 模型映射

**模型映射 (Model Mapping)** 是一种抽象技术，用于将不同服务提供商的具体模型版本标识符，映射为统一的逻辑模型名称。

## 目的
- **屏蔽差异**: 使客户端代码无需硬编码特定的模型 ID（如 `claude-3-5-sonnet-20241022` 或 `deepseek-chat`）。
- **灵活切换**: 允许运维人员在后端动态调整映射关系，例如将逻辑上的 `gpt-5.5` 从指向 DeepSeek 模型切换为指向 Claude 模型，而无需重启或修改客户端配置。
- **版本管理**: 可以在逻辑名称中隐藏具体的版本号，便于后端进行灰度发布或模型迭代。

## 实现示例
在 [[codex-compatibility-layer]] 中，映射关系如下：
| 逻辑模型名称 | 实际后端模型 A | 实际后端模型 B |
| :--- | :--- | :--- |
| `gpt-5.5` | `deepseek-v4-pro` | `claude-opus-4.7` |
| `gpt-5.4` | `deepseek-v4-flash` | `claude-sonnet-4.6` |

## 相关概念
- [[api-compatibility-layer]]
- [[codex-compatibility-layer]]