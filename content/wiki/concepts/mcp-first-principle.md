---
type: concept
title: MCP 优先原则
created: 2026-05-30
updated: 2026-05-30
tags: [原则，工程实践，自动化，安全]
related: [mcp-protocol, codex-cli, skill-file-architecture]
sources: ["Codex-MCP 工具.md", "Codex-MCP工具.md"]
---
# MCP 优先原则

**MCP 优先原则 (MCP-First Principle)** 是在使用 AI 代理（如 [[codex-cli]]）进行开发和运维时的一项核心架构决策。该原则规定：**在解决任务时，应优先调用通过 MCP (Model Context Protocol) 注册的标准化工具，而非直接生成或执行 Shell 脚本。**

## 背景与动机

传统的 AI 辅助编程往往依赖模型生成 Shell 命令或脚本来执行操作。这种方式存在以下隐患：
- **安全性低**：直接执行生成的脚本可能导致不可逆的系统破坏。
- **可维护性差**：临时生成的脚本缺乏版本控制和结构化测试。
- **上下文缺失**：Shell 命令往往是孤立的，难以利用 AI 的长期记忆或复杂推理能力。

## 原则内容

1.  **工具优先**：当需要执行文件操作、网络请求、数据处理或专业任务时，首先检查是否有对应的 MCP 工具可用。
2.  **避免 Shell 入口**：不将 Shell 脚本作为复杂任务的默认入口点。复杂的流程应通过组合多个 MCP 工具调用来实现。
3.  **结构化审计**：利用 MCP 协议的标准化特性，确保所有工具调用都有清晰的日志和参数记录。

## 与现有架构的张力

该原则可能与现有的 [[skill-file-architecture]] 或传统 DevOps 习惯产生张力。如果现有的自动化流程严重依赖 Shell 脚本，可能需要逐步重构为 MCP 工具调用链，以符合新的安全与效率标准。

## 受益领域

- **计算机视觉**：使用 `cv-pipeline-debugger` 代替手动编写调试脚本。
- **文档处理**：使用 `MinerU MCP` 代替调用 `pdftotext` 等命令行工具。
- **前端测试**：使用 `Playwright MCP` 代替编写临时的 Selenium 脚本。