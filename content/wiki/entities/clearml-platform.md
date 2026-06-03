---
type: entity
title: ClearML Platform
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, platform, open-source, automation]
related: [clearml-agent, mlops-workflow, ultralytics-yolo, aws-ec2, azure-ml]
sources: ["ClearML 平台.md"]
---
# ClearML Platform

**ClearML** is an open-source **MLOps** platform designed to automate, monitor, and orchestrate machine learning workflows. It bridges the gap between model creation and deployment, focusing on scalability, reproducibility, and efficient resource management.

## Core Capabilities

*   **Experiment Management**: Automatically tracks code, hyperparameters, metrics, and output artifacts (models, plots) for every run.
*   **Remote Execution**: Enables running experiments on remote machines via the **[[clearml-agent]]**, which recreates the development environment automatically.
*   **Data Versioning**: Manages datasets as versioned entities, decoupling data snapshots from code versions to ensure reproducibility.
*   **Pipeline Orchestration**: Supports complex multi-step pipelines with dependency management and conditional logic.
*   **Resource Optimization**: Provides real-time monitoring of CPU/GPU/Memory usage and supports autoscaling on cloud providers like **[[aws-ec2]]** and **[[azure-ml]]**.

## Integration with Ultralytics YOLO

ClearML offers native integration with **[[ultralytics-yolo]]** (including **[[yolo12]]** and the future-looking **YOLO26** referenced in sources). This integration allows users to:
*   Launch training jobs with minimal code changes.
*   Compare different model variants and hyperparameters side-by-side in the UI.
*   Enqueue training tasks to a distributed fleet of agents without manual SSH management.

## Architecture

The platform operates on a Server-Agent model:
1.  **Server**: Hosts the web UI, API, and database. Can be self-hosted or used as a SaaS.
2.  **Agent**: A daemon service (`clearml-agent`) installed on worker nodes (local workstations, cloud VMs). It listens to queues, pulls tasks, sets up the environment (Docker or virtualenv), executes the code, and reports back logs and metrics.

## Related Concepts

*   **[[mlops-workflow]]**: ClearML is a primary tool for implementing MLOps practices in this project.
*   **[[remote-training]]**: ClearML provides a higher-level abstraction for remote training compared to manual scripts.
*   **[[distributed-training-load-balancing]]**: The platform's queue system inherently handles load balancing across available agents.
