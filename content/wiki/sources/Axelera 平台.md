---
type: source
title: "Axelera AI Platform: Export and Deployment Guide"
created: 2026-05-30
updated: 2026-05-30
tags: [edge-ai, hardware, ultralytics, deployment]
related: [ultralytics-yolo, metis-aipu, voyager-sdk, model-quantization]
authors: ["Ultralytics", "Axelera AI"]
year: 2026
url: "https://docs.ultralytics.com/integrations/axelera/"
venue: "Ultralytics Documentation"
sources: ["Axelera 平台.md"]
---
# Axelera AI Platform: Export and Deployment Guide

This source documents the experimental integration between **Ultralytics YOLO** models and **Axelera AI** hardware. It details the workflow for exporting trained models to the **Metis AIPU** format, enabling high-performance, low-power edge inference.

## Key Findings

- **Hardware Acceleration**: The Metis AIPU utilizes a proprietary **dataflow architecture** and **in-memory computing** to achieve up to **856 TOPS** (INT8) on PCIe x4 cards, significantly outperforming standard GPUs in FPS-per-watt efficiency.
- **Export Workflow**: Models are exported using `model.export(format="axelera")`. This process requires **Linux** (Ubuntu 22.04/24.04) and the physical presence of Axelera hardware (or specific drivers) to perform **INT8 quantization**.
- **Calibration Requirement**: The export process mandates a **calibration dataset** (recommended 100-400 images) to tune quantization parameters and minimize accuracy loss.
- **Task Limitations**: As of this documentation, only **Object Detection** is supported. **Pose Estimation**, **Segmentation**, and **OBB** are listed as "Coming soon," creating a temporary gap for projects like the [[ai-gym-module]].
- **Known Issues**:
    - **PyTorch Version Conflict**: Exporting may require downgrading PyTorch from 2.9 to 2.8.
    - **Transient Errors**: The first inference run often throws an `ImportError`, which resolves on subsequent runs.
    - **Power Constraints**: Large models may fail on M.2 form factors due to power limits.

## Hardware Portfolio

The source outlines a scalable hardware lineup:
- **Metis PCIe x4**: High-density server card (856 TOPS).
- **Metis PCIe x1**: Standard low-profile card (214 TOPS).
- **Metis M.2 / M.2 MAX**: Compact modules for robotics and drones (214 TOPS).
- **Metis Compute Board**: Standalone ARM-based system (RK3588 + AIPU).

## Relevance to Wiki

This source bridges the gap between cloud training ([[aws-ec2]], [[remote-training]]) and edge deployment. It suggests a workflow where models are trained centrally and exported to specialized edge nodes, potentially upgrading existing infrastructure like the [[alienware-sub-server]] or [[labpc-workstation]] with PCIe accelerators.
