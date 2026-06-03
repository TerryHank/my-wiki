---
type: source
title: CPU-GPU-NPU 性能对比
created: 2026-05-30
updated: 2026-05-30
tags: [硬件，基准测试，AI, 推理]
related: [intel-npu, yolo12, inference-benchmarks, edge-ai-inference]
sources: ["CPU-GPU-NPU 性能对比.md", "CPU-GPU-NPU性能对比.md"]
---
# CPU-GPU-NPU 性能对比

本文档记录了在运行 **[[yolo12]]** (具体为 YOLO12n 变体) 模型时，不同计算硬件单元的推理性能基准测试数据。测试重点对比了通用中央处理器 (CPU)、图形处理器 (GPU) 与神经网络处理器 ([[intel-npu]]) 在边缘计算场景下的表现。

## 核心发现

测试结果表明，针对轻量级目标检测模型，专用 NPU 在延迟和吞吐量上均显著优于同环境下的 CPU 和 GPU。

### 性能数据表

| 维度 | CPU | GPU | NPU (Intel) |
| :--- | :--- | :--- | :--- |
| **推理延迟** | 61.91 ms | 43.19 ms | **31.06 ms** |
| **帧率 (FPS)** | 16.15 | 23.16 | **32.20** |

## 详细分析

- **延迟优势**：[[intel-npu]] 的推理延迟比 GPU 快约 **28%**，比 CPU 快约 **50%**。这意味着在实时视频流处理中，NPU 能提供更低的端到端延迟。
- **吞吐量优势**：NPU 达到了 **32.20 FPS**，超过了流畅视频处理的标准阈值（通常为 30 FPS），而 GPU 仅为 23.16 FPS，CPU 仅为 16.15 FPS。
- **边缘计算意义**：此数据有力支撑了 [[edge-ai-inference]] 的可行性，表明在现代轻薄本或边缘设备上，利用集成 NPU 运行轻量级 AI 任务可能比调动独立 GPU 更高效且节能。

## 局限性与待确认项

- **硬件型号未知**：源文档未明确说明测试所用的 CPU 和 GPU 具体型号（如 Intel Core Ultra, NVIDIA RTX 系列等），这影响了结果的可复现性和通用性。
- **量化细节缺失**：未说明 YOLO12n 是否经过了针对 NPU 的特定量化（如 INT8），量化通常会显著提升 NPU 性能但可能轻微影响精度。
- **批处理大小**：测试未注明 Batch Size，不同硬件对批处理的敏感度不同。

## 关联资源

- 参见 [[inference-benchmarks]] 以获取更多硬件对比数据。
- 参考 [[yolo12]] 了解模型架构特性。
- 对比 [[axelera-platform]] 了解其他 NPU 厂商的表现。