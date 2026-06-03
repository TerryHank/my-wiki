---
type: entity
title: Codex CLI
created: 2026-05-30
updated: 2026-05-30
tags: [ai, 命令行，工具，代理]
related: [mcp-protocol, labpc-workstation, hermes-agent]
sources: ["Codex-MCP 工具.md", "Codex-MCP工具.md"]
---
# Codex CLI

**Codex CLI** 是一个基于命令行的 AI 代理接口，允许用户通过自然语言与大型语言模型进行交互，并执行复杂的开发任务。在本项目的知识库体系中，它被定义为 **MCP (Model Context Protocol)** 的主要宿主环境。

## 角色与定位

Codex CLI 不仅仅是一个聊天机器人，它是一个**执行引擎**。通过加载各种 MCP 服务器，它能够突破纯文本生成的限制，直接操作文件系统、控制浏览器、分析磁盘空间以及执行特定领域的专业任务（如计算机视觉管线调试）。

## 核心特性

- **MCP 宿主**：支持动态加载外部工具服务器，实现能力的模块化扩展。
- **技能系统**：内置多种行为模式（如 [[test-driven-development]]、[[systematic-debugging]]），可指导代理采用特定的工程方法论。
- **本地集成**：在 [[labpc-workstation]] 上深度集成，作为日常开发和自动化运维的主要入口。

## 与 Hermes 智能体的关系

Codex CLI 与 [[hermes-agent]] 均为 AI 代理系统。Codex 更侧重于命令行交互和通过 MCP 协议进行的工具调用，而 Hermes 可能侧重于其他交互模式或特定场景。两者在生态中可能形成互补或竞争关系，具体取决于任务类型。

## 使用原则

- **工具优先**：优先使用 MCP 工具链解决问题，而非生成通用的 Shell 脚本。
- **结构化交互**：利用内置技能（如计划编写、系统化调试）来规范输出质量。