---
type: entity
title: DeepSeek API
created: 2026-05-30
updated: 2026-05-30
tags: [api, llm, provider]
related: [codex-compatibility-layer, model-mapping]
sources: ["Codex 兼容层.md", "Codex兼容层.md"]
---
# DeepSeek API

**DeepSeek API** 是由深度求索（DeepSeek）提供的大语言模型推理服务接口。

## 在兼容层中的角色
在 [[codex-compatibility-layer]] 架构中，DeepSeek API 是 `codex-deepseek` 组件的上游服务。
- **接入方式**: 通过 HTTPS 直接调用 `api.deepseek.com`。
- **模型映射**:
    - `deepseek-v4-pro` 映射为逻辑模型 `gpt-5.5`。
    - `deepseek-v4-flash` 映射为逻辑模型 `gpt-5.4`。

## 性能特征
通过兼容层的连接池优化，可以有效降低调用 DeepSeek API 的延迟。

## 相关实体
- [[codex-compatibility-layer]]
- [[aws-bedrock]]