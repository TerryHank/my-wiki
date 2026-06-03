---
type: concept
title: Compute Instance
created: 2026-05-30
updated: 2026-05-30
tags: [cloud-infrastructure, development-environment]
related: [azure-ml, aws-ec2, remote-training]
sources: ["Azure ML 快速入门教程.md"]
---
# Compute Instance

A **Compute Instance** is a managed cloud-based workstation provided by platforms like [[azure-ml]]. It offers pre-configured development environments with selectable CPU and GPU resources, designed specifically for data science and machine learning workflows.

## Characteristics

-   **Managed Service**: The cloud provider handles OS updates, security patching, and underlying infrastructure maintenance.
-   **Integrated Access**: Direct access via terminal, Jupyter notebooks, and VS Code within the cloud portal.
-   **Elastic Resources**: Users can scale up (GPU for training) or down (CPU for inference) based on immediate task requirements.
-   **Environment Isolation**: Supports the creation of isolated [[conda]] environments to manage project-specific dependencies without affecting the system base.

## Workflow

In the context of [[remote-training]], a compute instance acts as the remote execution node. The typical workflow involves:
1.  Provisioning the instance with necessary GPU specs.
2.  Cloning the project repository (e.g., [[ultralytics-yolo]]).
3.  Setting up a virtual environment.
4.  Executing training or inference scripts.
5.  Shutting down the instance to save costs when not in use.

This concept contrasts with raw virtual machines (like standard [[aws-ec2]] instances) which require more manual configuration of drivers and development tools, although Deep Learning AMIs bridge this gap.