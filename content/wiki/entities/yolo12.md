---
type: entity
title: YOLO12
created: 2026-05-30
updated: 2026-05-30
tags: [AI 模型，目标检测，Ultralytics, 计算机视觉]
related: [ultralytics-yolo, inference-benchmarks, intel-npu]
sources: ["CPU-GPU-NPU 性能对比.md", "CPU-GPU-NPU性能对比.md"]
---
# YOLO12

**YOLO12** 是 Ultralytics 公司推出的 YOLO (You Only Look Once) 实时目标检测系列的最新主要版本之一。作为 [[ultralytics-yolo]] 家族的最新迭代，YOLO12 在架构效率、推理速度和精度之间取得了新的平衡。

## 主要特性

- **架构优化**：引入了更高效的骨干网络和颈部结构，旨在减少参数量和计算量（FLOPs），同时保持或提升检测精度。
- **多尺寸变体**：提供从 nano (n) 到 extra large (x) 等多种尺寸变体，以适应从边缘设备到云端服务器的不同算力需求。
- **硬件友好性**：针对现代硬件加速器（如 [[intel-npu]]、GPU）进行了算子优化，支持高效的量化推理（INT8/FP16）。

## 性能基准

根据 [[CPU-GPU-NPU 性能对比]] 中的测试数据，轻量级变体 **YOLO12n** 在不同硬件上的表现如下：

| 硬件平台 | 推理延迟 | 帧率 (FPS) | 评价 |
| :--- | :--- | :--- | :--- |
| **Intel NPU** | **31.06 ms** | **32.20** | **最优**，满足实时性要求 |
| GPU | 43.19 ms | 23.16 | 中等，受限于功耗或调度 |
| CPU | 61.91 ms | 16.15 | 较慢，不适合高帧率视频流 |

该数据显示 YOLO12n 在专用 NPU 上能实现超过 30 FPS 的流畅推理，非常适合部署在笔记本电脑或边缘网关上。

## 与旧版本对比

- 相比 YOLOv8/v9/v10，YOLO12 进一步降低了推理延迟，特别是在低算力设备上的表现更为突出。
- 继续保持了 Ultralytics 系列易于使用和部署的特点，支持通过 Python API 快速加载和推理。

## 应用建议

- **边缘部署**：推荐使用 YOLO12n 或 YOLO12s 变体配合 NPU 进行部署，以获得最佳能效比。
- **高精度需求**：在算力充足的服务器端，可使用 YOLO12m/l/x 变体配合 GPU 集群。

## 相关资源

- [[ultralytics-yolo]] — YOLO 系列总览。
- [[inference-benchmarks]] — 推理性能测试汇总。
- [[CPU-GPU-NPU 性能对比]] — 具体测试数据。