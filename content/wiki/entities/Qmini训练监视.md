---
title: Qmini训练监视
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [AI, 训练, 自动化, codex]
sources: [LabPC .codex/session_index.jsonl]
confidence: high
---

# Qmini 训练监视

使用 Codex CLI 自动化监控模型训练过程。

## 概况
- **总会话数**: 156 (102 + 54)
- **时间跨度**: 2026-04-09 ~ 2026-04-22 (约 2 周)
- **运行方式**: Codex 定时任务，每小时自动检查

## 两个阶段
1. **Qmini 训练监视** (102 会话, 04-09 ~ 04-17)
   - 基础训练监控
   - Loss 变化、GPU 显存、Checkpoint 保存
2. **QminiFinal 自动监视** (54 会话, 04-19 ~ 04-22)
   - 训练最终阶段
   - 更频繁监控、自动保存最佳模型

## 自动化模式
- 每小时创建新 Codex 会话
- 检查训练日志、GPU 状态
- 异常检测（NaN、梯度爆炸）
- 这是 Codex 作为"常驻监控 Agent"的典型用法

## 经验
- Codex 适合作为自动化监控 Agent
- 每小时检查一次是合理频率
- 156 个会话 = 约 2 周不间断监控

## 相关
- [[LabPC-Codex配置]] — Codex 完整配置
- [[人体量体模型]] — 训练任务来源
