---
type: concept
title: MLOps Workflow
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, methodology, automation, reproducibility]
related: [clearml-platform, remote-training, dataset-versioning, ultralytics-yolo]
sources: ["ClearML 平台.md"]
---
# MLOps Workflow

**MLOps** (Machine Learning Operations) refers to the set of practices that bridge the gap between ML model development and production deployment. In the context of this project, it focuses on scalability, management, and reproducibility of **[[ultralytics-yolo]]** training and inference pipelines.

## Core Principles

1.  **Reproducibility**: Ensuring that any experiment can be exactly recreated. This involves versioning code, data (**[[dataset-versioning]]**), and the execution environment (packages, OS).
2.  **Automation**: Reducing manual intervention in training, evaluation, and deployment. Tools like **[[clearml-platform]]** automate logging and resource provisioning.
3.  **Monitoring**: Continuously tracking model performance and resource utilization (CPU/GPU/Memory) during training and inference.
4.  **Collaboration**: Centralizing experiment data so team members can compare runs, share models, and iterate on hyperparameters.

## Implementation in This Project

The project implements MLOps through a hybrid approach:
*   **Platform-Based**: Using **[[clearml-platform]]** for experiment tracking, queue management, and remote execution via **[[clearml-agent]]**.
*   **Cloud-Integrated**: Leveraging **[[aws-ec2]]** and **[[azure-ml]]** for scalable compute, often orchestrated by ClearML autoscalers.
*   **Local-Distributed**: Utilizing local sub-servers (**[[alienware-sub-server]]**) as part of the distributed training fleet, managed via the same queues as cloud resources.

## Contrast with Manual Workflows

Traditional manual workflows (e.g., SSH-ing into a server, running a script, manually copying weights) lack the audit trail and automation of MLOps. ClearML abstracts the infrastructure layer, allowing engineers to focus on model architecture and data rather than server management (e.g., **[[swap-memory-management]]** or AMI selection), although low-level control remains available when needed.
