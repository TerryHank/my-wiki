---
title: LLM-Wiki模式
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [方法论, 笔记, AI, 生产力]
confidence: high
---

# LLM-Wiki模式

Andrej Karpathy 提出的知识库构建模式——用 LLM 将散乱信息编译为相互链接的 Markdown Wiki。

## 核心思想
不同于传统 RAG（每次查询重新发现知识），Wiki 一次性编译知识并保持更新。

## 三层架构
1. **原始资料层 (raw/)**: 不可修改的源材料
2. **Wiki 层**: Agent 拥有的 Markdown 页面
3. **Schema 层**: 定义结构、约定、标签体系

## 相关
- [[Obsidian知识管理]] — 本地优先笔记
- [[Hermes智能体]] — 执行引擎
