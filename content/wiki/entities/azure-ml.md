---
type: entity
title: Azure Machine Learning (AzureML)
created: 2026-05-30
updated: 2026-05-30
tags: [cloud-platform, microsoft, machine-learning]
related: [azure, remote-training, compute-instance, aws-ec2]
sources: ["Azure ML 快速入门教程.md"]
---
# Azure Machine Learning (AzureML)

[[Azure Machine Learning]] (AzureML) is Microsoft's specialized cloud service designed for developing, training, and deploying machine learning models. It serves as a collaborative environment for data scientists and developers, providing tools that range from drag-and-drop interfaces for [[automated-machine-learning]] to granular control via a Python SDK.

## Core Features

-   **Compute Instances**: Managed cloud-based workstations that allow users to spin up CPU or GPU resources on demand for development and training tasks.
-   **Integrated Notebooks**: A Jupyter-compatible interface within the Azure portal that supports custom kernels, enabling interactive experimentation.
-   **MLOps Capabilities**: Tools for model registration, versioning, and deployment as scalable endpoints.
-   **Automated ML**: Features for automatically selecting algorithms and hyperparameters to optimize model performance.

## Comparison with AWS

While [[aws-ec2]] offers raw infrastructure flexibility requiring manual setup of drivers and environments (often via [[aws-deep-learning-ami]]), AzureML abstracts much of the infrastructure management. It provides a more integrated "platform-as-a-service" experience where compute, storage, and experimentation tools are natively linked. Both platforms support [[remote-training]] workflows for heavy deep learning tasks like those involving [[ultralytics-yolo]].

## Usage in Projects

AzureML is utilized for offloading computationally intensive training jobs that exceed local hardware capabilities, similar to the role of AWS in the current project architecture. It supports the [[remote-training]] concept by providing scalable GPU resources accessible via terminal or notebook interfaces.