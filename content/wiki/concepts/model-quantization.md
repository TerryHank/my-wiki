---
type: concept
title: Model Quantization
created: 2026-05-30
updated: 2026-05-30
tags: [optimization, edge-ai, int8, performance]
related: [voyager-sdk, metis-aipu, ultralytics-yolo]
sources: ["Axelera 平台.md"]
---
# Model Quantization

**Model Quantization** is an optimization technique that reduces the precision of the numbers used to represent a neural network's weights and activations. In the context of **Edge AI** and the **Axelera AI** platform, this typically involves converting models from 32-bit floating-point (FP32) to **8-bit integers (INT8)**.

## Why It Matters

- **Performance**: INT8 operations are significantly faster on specialized hardware like the **Metis AIPU**.
- **Efficiency**: Reduces memory bandwidth usage and power consumption, critical for battery-powered devices.
- **Deployment**: Enables running large models on resource-constrained edge devices.

## The Calibration Process

Quantization is not lossless; it approximates values. To maintain accuracy, a **calibration dataset** is required:
1.  **Selection**: A representative subset of data (e.g., 100-400 images from the training domain).
2.  **Tuning**: The **Voyager SDK** analyzes the distribution of activations on this data to determine optimal scaling factors for converting floats to integers.
3.  **Validation**: Post-quantization, the model should be validated (e.g., using `yolo val`) to ensure the drop in **mAP** is acceptable.

## Trade-offs

- **Accuracy**: There is usually a minimal loss in accuracy, which is often negligible for object detection tasks.
- **Complexity**: Requires access to representative data and specific tooling (like the Voyager SDK) during the export phase.
- **Hardware Specificity**: Quantized models are often compiled specifically for the target hardware architecture (e.g., Metis AIPU) and cannot be easily transferred to other devices without re-exporting.

## Application in Wiki Projects

For projects like the [[ai-gym-module]] or [[ai-companion-robot-mvp]], quantization offers a path to real-time performance on low-power hardware. However, current support limitations (e.g., lack of Pose Estimation support on Axelera) must be considered when selecting deployment targets.
