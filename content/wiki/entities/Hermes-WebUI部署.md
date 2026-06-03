---
title: Hermes-WebUI部署
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [工具, UI, Hermes]
confidence: high
---

# Hermes WebUI 部署

## 端口
- TerryLaptop: 8787 (Python)
- LabPC: 8648 (npm hermes-web-ui)

## 踩坑
- 历史会话不显示 → show_cli_sessions: true
- 白屏 → Node.js v23+
- 需要 stop+start（不是 restart）

## 相关
- [[Hermes智能体]] — 核心 Agent
- [[Hermes配置详解]] — 配置
