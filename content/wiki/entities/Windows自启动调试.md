---
title: Windows自启动调试
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [Windows, 调试, 部署]
confidence: high
---

# Windows开机自启动调试

## 问题
Tauri/Electron 应用在 DWM 初始化前启动 → 崩溃

## 通用修复
.bat 包装脚本 + timeout 延迟 + start 命令

## 相关
- [[Hermes配套工具]] — 配套工具
- [[EasyTier组网]] — Tauri 应用案例
