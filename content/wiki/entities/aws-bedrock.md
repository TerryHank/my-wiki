---
type: entity
title: AWS Bedrock
created: 2026-05-30
updated: 2026-05-30
tags: [cloud, aws, llm, provider]
related: [kiro-gateway, codex-compatibility-layer]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# AWS Bedrock

**AWS Bedrock** 是亚马逊云科技（AWS）提供的完全托管服务，用于访问高性能基础模型。

## 在兼容层中的角色
在 [[codex-compatibility-layer]] 架构中，AWS Bedrock 是 Claude 系列模型的最终算力来源。
- **访问路径**: `codex-claude` → [[kiro-gateway]] → AWS Bedrock。
- **模型映射**:
    - `claude-opus-4.7` 映射为逻辑模型 `gpt-5.5`。
    - `claude-sonnet-4.6` 映射为逻辑模型 `gpt-5.4`。

## 相关实体
- [[kiro-gateway]]
- [[deepseek-api]]