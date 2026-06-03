---
type: entity
title: Amazon Web Services EC2
created: 2026-04-29
updated: 2026-04-29
tags: [cloud, infrastructure, aws, gpu]
related: [remote-training, aws-deep-learning-ami, ultralytics-yolo]
sources: ["AWS 快速入门教程.md"]
---
# Amazon Web Services EC2

**Amazon Elastic Compute Cloud (EC2)** is a web service that provides secure, resizable compute capacity in the cloud. In the context of this knowledge base, it serves as the primary infrastructure for [[remote-training]] of deep learning models, specifically [[ultralytics-yolo]].

## Role in AI Workflows

EC2 allows developers to bypass local hardware limitations (such as lack of GPU VRAM) by provisioning virtual servers with high-performance GPUs. This is critical for:
-   **Model Training**: Accelerating the training loop for computer vision models.
-   **Large-Scale Inference**: Running batch processing on massive datasets.
-   **Environment Isolation**: Creating reproducible environments using custom AMIs.

## Key Features for Deep Learning

-   **Deep Learning AMIs**: Pre-configured images containing frameworks like PyTorch and TensorFlow, along with NVIDIA drivers.
-   **Instance Types**: Specific families (e.g., `g4dn`, `p3`) optimized for GPU workloads.
-   **Spot Instances**: A pricing model allowing users to bid on unused capacity for significant cost reductions, ideal for fault-tolerant training jobs.
-   **Elastic Storage**: Integration with EBS (Elastic Block Store) for persistent data volumes, essential when using ephemeral Spot Instances.

## Security Considerations

Access is typically managed via **SSH Key Pairs**. Security Groups act as virtual firewalls; best practices dictate restricting SSH access (port 22) to specific IP addresses to maintain the [[least-privilege-principle]].