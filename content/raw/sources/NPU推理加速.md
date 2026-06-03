---
title: NPU推理加速
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [AI, 推理, 硬件, 优化]
confidence: high
---

# NPU推理加速

利用 Intel NPU 加速 AI 模型推理。

## 性能对比 (YOLO12n)
CPU 16 FPS → GPU 23 FPS → **NPU 32 FPS**

## 关键经验
- 不是所有算子都支持 NPU
- 回退: `HETERO:NPU,CPU`
- 静态形状更稳定

## 相关
- [[Intel-NPU]] — 硬件详情
- [[CPU-GPU-NPU性能对比]] — 性能对比
