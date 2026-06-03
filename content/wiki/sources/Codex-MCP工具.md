---
type: source
title: Codex-MCP 工具配置
authors: ["本地 Codex 会话"]
year: 2026
url: ""
venue: "LabPC .codex"
created: 2026-05-30
updated: 2026-05-30
tags: [codex, mcp, 工具链，自动化，配置]
related: [codex-cli, mcp-protocol, labpc-workstation]
sources: ["Codex-MCP 工具.md", "Codex-MCP工具.md"]
---
# Codex-MCP 工具配置

本文档记录了在 **LabPC** 工作站上配置的 **Codex CLI** 环境中的 Model Context Protocol (MCP) 工具集及插件技能。该配置确立了“工具优先”（Tools-First）的自动化范式，旨在通过结构化、可审计的工具调用扩展 AI 代理的能力边界，减少对直接 Shell 命令的依赖。

## 已安装的 MCP 服务器

以下工具集构成了 Codex 的核心执行能力，覆盖从文件系统操作到垂直领域专业任务的完整谱系：

- **codex-everything-mcp**：全能型工具，提供广泛的文件系统访问能力和通用上下文检索，作为基础操作层。
- **Playwright MCP**：浏览器自动化工具，支持端到端测试、网页交互及动态内容抓取，增强了前端验证能力。
- **MinerU MCP**：文档处理专用工具，专注于将 PDF 文献高效转换为 Markdown 格式，直接服务于知识库构建和论文研读。
- **context7**：实时文档查询工具，用于检索最新的技术框架和库文档，确保代码生成的时效性。
- **cv-paper-to-code**：计算机视觉垂直领域工具，专注于将学术论文中的算法描述映射为可执行代码。
- **cv-pipeline-debugger**：计算机视觉垂直领域工具，专门用于诊断和调试 CV 训练及推理管线中的问题。
- **gdu MCP**：系统资源分析工具，用于快速识别磁盘空间占用，优化本地存储管理。

## Codex 插件技能

除了外部工具，Codex 还内置了特定的行为模式（技能），用于指导代理的思维过程：

- **systematic-debugging**：系统化调试模式，将调试过程标准化，避免随机试错。
- **test-driven-development**：测试驱动开发模式，强制要求在编写功能代码前先生成测试用例。
- **writing-plans**：计划编写模式，用于在复杂任务执行前生成详细的步骤规划。
- **mcp-builder**：元编程技能，用于辅助构建和配置新的 MCP 工具。
- **frontend-master**：前端开发专家模式，专注于现代前端架构和最佳实践。
- **brainstorming**：头脑风暴模式，用于创意发散和方案探索。

## 核心原则与经验法则

基于实际会话经验，确立了以下操作准则：

1.  **MCP 优先原则**：在 Codex 操作中，优先调用 MCP 工具而非直接使用 Shell 命令或 CLI 原生功能。这提高了操作的结构化程度和安全性。
2.  **无 Shell 脚本入口**：避免将 Shell 脚本作为默认的任务入口点。复杂流程应通过组合 MCP 工具链来实现，以降低维护成本和安全风险。

## 相关资源

- 部署环境：[[labpc-workstation]]
- 宿主工具：[[codex-cli]]
- 协议标准：[[mcp-protocol]]
- 相关代理：[[hermes-agent]]