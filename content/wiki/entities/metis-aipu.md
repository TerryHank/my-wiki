---
type: entity
title: Metis AIPU
created: 2026-05-30
updated: 2026-05-30
tags: [hardware, accelerator, edge-ai]
related: [axelera-ai, voyager-sdk, model-quantization]
sources: ["Axelera 平台.md"]
---
# Metis AIPU

The **Metis AIPU** (AI Processing Unit) is the core accelerator chip developed by **Axelera AI**. It is designed specifically for running deep learning inference tasks, particularly **Computer Vision**, with extreme efficiency.

## Architecture

Unlike traditional GPUs, the Metis AIPU uses a **dataflow architecture** and **in-memory computing**. This design minimizes data movement between memory and processing units, drastically reducing power consumption and latency while maximizing throughput.

## Product Lineup

The Metis AIPU is available in several form factors to suit different deployment needs:

| Product | Form Factor | Compute Units | Peak Performance (INT8) | Target Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Metis PCIe x4** | PCIe Gen3 x16 | 4x AIPUs | **856 TOPS** | Smart cities, high-density video analytics |
| **Metis PCIe x1** | PCIe Gen3 x1 | 1x AIPU | 214 TOPS | Industrial PCs, retail analytics |
| **Metis M.2** | M.2 2280 M-Key | 1x AIPU | 214 TOPS | Drones, robotics, handheld devices |
| **Metis M.2 MAX** | M.2 2280 | 1x AIPU | 214 TOPS | High-performance embedded with thermal management |
| **Metis Compute Board** | Standalone Board | 1x AIPU + RK3588 | 214 TOPS | All-in-one edge devices, R&D |

## Performance

Benchmarks indicate significant speed advantages over general-purpose hardware:
- **YOLOv5m**: ~1539 FPS on PCIe x4 (640x640 input).
- **YOLOv5s**: ~827 FPS on M.2 (640x640 input).

## Constraints

- **Power**: M.2 variants may struggle with very large models due to power delivery limits.
- **OS Support**: Currently restricted to **Linux** (Ubuntu 22.04/24.04).
- **Task Support**: Primarily optimized for **Object Detection**; other tasks like Pose Estimation are pending support.
