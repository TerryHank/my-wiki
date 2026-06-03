---
type: concept
title: Remote Training
created: 2026-04-29
updated: 2026-04-29
tags: ["cloud-computing", "machine-learning", "ultralytics", "workflow", "cloud", "gpu", "strategy"]
related: ["ultralytics-api-keys", "ultralytics-yolo", "ai-gym-module", "aws-ec2", "embedded-device-workflow", "cloud-voice-architecture"]
sources: ["API 密钥.md", "AWS 快速入门教程.md"]
---
# Remote Training

**Remote Training** is a workflow pattern where computationally intensive model training tasks are offloaded to remote cloud infrastructure, while development, data preparation, and inference may occur locally or on edge devices.

## Architectural Context

This concept bridges the gap between resource-constrained local environments (like laptops or the [[embedded-device-workflow]] for robots) and the high-demand requirements of modern deep learning (e.g., [[ultralytics-yolo]] training).

### Implementation Strategies

1.  **Managed Cloud APIs**: Using platforms like the Ultralytics Cloud for simplified, API-driven training (often abstracting the infrastructure).
2.  **Manual VM Provisioning**: Manually setting up virtual machines (e.g., [[aws-ec2]] with [[aws-deep-learning-ami]]) to gain full control over the environment, software versions, and cost management (via Spot Instances).

## Workflow Phases

1.  **Provisioning**: Launching a GPU-accelerated instance with pre-installed drivers.
2.  **Data Sync**: Uploading datasets to the remote instance (e.g., via `scp` or S3).
3.  **Execution**: Running training scripts over an SSH session or terminal multiplexer (tmux/screen).
4.  **Artifact Retrieval**: Downloading the trained model weights (`.pt` files) for deployment to edge devices or integration into local applications like the [[acceptance-workbench-ui]].

## Trade-offs

-   **Pros**: Access to high-end GPUs, scalability, no local hardware wear-and-tear.
-   **Cons**: Data transfer latency, ongoing cloud costs, complexity of managing remote state (handled partially by concepts like **Swap Memory Management** and **Spot Instance persistence**).

## Relation to Edge Deployment

Remote training is the precursor to edge deployment. Once a model is trained remotely, it is exported (e.g., to ONNX or TFLite) and transferred to the target device (e.g., the [[ai-companion-robot-mvp]]), completing the **Cloud Training -> Edge Inference** loop.