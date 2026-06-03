---
title: 本地LLM部署经验
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [AI, LLM, 部署, 经验]
confidence: high
---

# 本地LLM部署经验总结

## 方案对比
Ollama(最终) vs vLLM(未成功) vs llama.cpp(放弃) vs Unsloth(远程)

## 量化经验
IQ2_M 空响应, Q4_K_M 推荐, Q5_K_M 最佳

## 关键教训
- Ollama CLI 正常 ≠ Hermes 正常
- --parallel 1 省显存
- 训练进程抢显存

## 相关
- [[Ollama本地部署]] — Ollama 详情
- [[张望GPU服务器]] — 远程 GPU
