---
type: concept
title: MCP 协议
created: 2026-05-30
updated: 2026-05-30
tags: [协议，ai, 工具链，集成]
related: [codex-cli, mcp-first-principle]
sources: ["Codex-MCP 工具.md", "Codex-MCP工具.md"]
---
# MCP 协议 (Model Context Protocol)

**MCP (Model Context Protocol)** 是一种用于连接 AI 模型与外部数据源及工具的开放协议标准。它定义了 AI 代理如何发现、调用和管理外部工具（MCP 服务器），从而安全地扩展其能力边界。

## 核心价值

MCP 协议的核心在于**解耦**与**标准化**：
- **解耦**：AI 模型无需硬编码特定工具的逻辑，只需遵循统一协议即可调用任意兼容的服务。
- **标准化**：提供了统一的输入输出格式，使得工具调用过程可审计、可追踪。

## 在本项目中的应用

在 [[codex-cli]] 环境中，MCP 协议是实现“自动化全栈能力”的基石。通过该协议，Codex 能够加载如下工具：
- **通用工具**：如 `codex-everything-mcp`（文件系统）、`gdu MCP`（磁盘分析）。
- **自动化工具**：如 `Playwright MCP`（浏览器控制）。
- **专业领域工具**：如 `cv-paper-to-code`（论文转代码）、`cv-pipeline-debugger`（CV 管线调试）、`MinerU MCP`（文档解析）。

## 相关原则

- [[mcp-first-principle]]：基于 MCP 协议的能力，确立了在 AI 辅助开发中优先使用标准化工具而非临时脚本的操作准则。