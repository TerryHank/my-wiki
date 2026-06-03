---
type: entity
title: Voyager SDK
created: 2026-05-30
updated: 2026-05-30
tags: [software, sdk, compiler, quantization]
related: [metis-aipu, axelera-ai, model-quantization]
sources: ["Axelera 平台.md"]
---
# Voyager SDK

The **Voyager SDK** is the software development kit provided by **Axelera AI** to compile, quantize, and run neural network models on **Metis AIPU** hardware. It acts as the bridge between standard frameworks (like PyTorch/Ultralytics) and the proprietary Metis architecture.

## Key Features

- **Model Export**: Integrates with Ultralytics via `model.export(format="axelera")`.
- **INT8 Quantization**: Automatically converts floating-point models to 8-bit integers using a **calibration dataset**.
- **Runtime**: Provides the drivers and libraries (`axdevice`) necessary to execute compiled models (`.axm` files) on the hardware.
- **Optimization**: Supports multi-core utilization and streaming pipelines for maximum throughput in production environments.

## Workflow

1.  **Installation**: Requires adding the Axelera repository and installing `axelera-voyager-sdk-base` on Ubuntu.
2.  **Calibration**: Users must provide a small dataset (100-400 images) to tune quantization parameters.
3.  **Compilation**: The SDK compiles the model into an optimized binary for the specific Metis card installed.
4.  **Inference**: The compiled model is loaded via the Ultralytics API or native SDK calls.

## Known Limitations

- **Hardware Dependency**: Currently, the export/compilation step often requires the physical hardware to be present.
- **PyTorch Compatibility**: May conflict with PyTorch 2.9, requiring a temporary downgrade to 2.8.
- **Experimental Status**: Some features, like seamless pip installation without hardware, are slated for future releases (Feb 2026).
