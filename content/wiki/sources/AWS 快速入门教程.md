---
type: source
title: "AWS Quick Start Guide: Ultralytics YOLOv5 on Deep Learning Instances"
created: 2026-04-29
updated: 2026-04-29
tags: [aws, cloud-computing, yolo, tutorial, gpu]
related: [ultralytics-yolo, remote-training, aws-ec2]
authors: ["Ultralytics"]
year: 2024
url: "https://docs.ultralytics.com/yolov5/tutorials/aws_quickstart_tutorial/"
venue: "Ultralytics Documentation"
sources: ["AWS 快速入门教程.md"]
---
# AWS Quick Start Guide: Ultralytics YOLOv5 on Deep Learning Instances

This source provides a comprehensive walkthrough for deploying [[ultralytics-yolo]] (specifically YOLOv5) on [[aws-ec2]] infrastructure. It targets users seeking to overcome local hardware limitations by leveraging cloud-based GPU acceleration.

## Key Workflow Steps

1.  **Environment Selection**: Emphasizes the use of **AWS Deep Learning AMIs** (Amazon Machine Images). These images come pre-configured with Ubuntu, PyTorch, CUDA drivers, and other dependencies, eliminating manual driver installation.
2.  **Instance Configuration**: Recommends selecting **GPU-accelerated instances** (Accelerated Computing family) for training. It introduces **Spot Instances** as a cost-saving mechanism, advising the use of "persistent requests" to maintain storage volumes despite potential interruptions.
3.  **Access & Setup**: Details the process of connecting via **SSH** using key pairs. Once connected, the workflow involves cloning the `ultralytics/yolov5` repository and installing Python dependencies.
4.  **Execution**: Provides standard commands for training (`train.py`), validation (`val.py`), inference (`detect.py`), and model export (`export.py`).
5.  **Optimization**: Includes a specific tip for managing memory constraints by manually increasing **Swap Memory** on the Linux instance to prevent Out-Of-Memory (OOM) errors during large dataset processing.

## Relevance to Project

This guide operationalizes the concept of [[remote-training]] within the context of the Ultralytics ecosystem. Unlike the [[embedded-device-workflow]] which focuses on edge deployment, this source addresses the "heavy lifting" phase of model development. It contrasts with local development strategies (like the [[acceptance-workbench-ui]] or local SQLite setups) by offering a scalable, high-performance alternative for the computationally intensive training phase of computer vision projects.

## Notable Constraints

-   **Security**: The guide suggests opening SSH port 22, which requires careful security group configuration to adhere to the [[least-privilege-principle]].
-   **Cost vs. Stability**: While Spot Instances reduce costs, they introduce the risk of interruption, necessitating robust checkpointing strategies not fully detailed in this quick start.