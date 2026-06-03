---
type: entity
title: AWS Deep Learning AMI
created: 2026-04-29
updated: 2026-04-29
tags: [aws, ami, pytorch, gpu, infrastructure]
related: [aws-ec2, remote-training, ultralytics-yolo]
sources: ["AWS 快速入门教程.md"]
---
# AWS Deep Learning AMI

The **AWS Deep Learning AMI (Amazon Machine Image)** is a pre-configured environment for deep learning practitioners on [[aws-ec2]]. It significantly reduces setup time by bundling the operating system (typically Ubuntu), deep learning frameworks (PyTorch, TensorFlow, MXNet), and necessary hardware drivers (CUDA, cuDNN) into a single bootable image.

## Value Proposition

-   **Zero-Config Setup**: Eliminates the complex and error-prone process of manually installing NVIDIA drivers and matching CUDA versions.
-   **Framework Support**: Comes with multiple framework versions managed via Conda environments, allowing easy switching between project requirements.
-   **Optimized Performance**: Drivers and libraries are pre-optimized for the underlying EC2 GPU hardware.

## Usage in YOLOv5 Workflows

When launching an instance for [[ultralytics-yolo]] training, selecting the latest Ubuntu-based Deep Learning AMI is the recommended first step. This ensures that the `pip install` process for YOLOv5 dependencies encounters no system-level compilation errors, allowing the user to proceed immediately to cloning the repository and starting training.