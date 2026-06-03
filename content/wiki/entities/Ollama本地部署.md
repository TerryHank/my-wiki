---
title: Ollama本地部署
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [AI, LLM, Ollama]
confidence: high
---

# Ollama本地LLM部署

## 量化经验
IQ2_M ❌ → Q3_K_M ⚠️ → Q4_K_M ✅ → Q5_K_M ✅

## 优化
`--parallel 1` 省 ~1.5GB VRAM

## 踩坑
- Ollama CLI 正常 ≠ Hermes 调用正常
- 不要自动配 Ollama 为回退

## 相关
- [[LabPC工作站]] — 部署机器
- [[本地LLM部署经验]] — 部署经验
