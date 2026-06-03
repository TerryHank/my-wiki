---
type: source
title: ClearML Log Integration
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, clearml, yolo, integration]
related: [clearml-platform, clearml-agent, ultralytics-yolo, coco128-dataset, remote-execution, dataset-versioning, hyperparameter-optimization]
authors: [Ultralytics]
year: 2026
url: https://docs.ultralytics.com/integrations/clearml/
venue: Ultralytics Documentation
sources: ["ClearML 日志集成.md"]
---
# ClearML Log Integration

This source details the practical integration of the [[clearml-platform]] with [[ultralytics-yolo]] (specifically YOLOv5 in the examples) to automate experiment tracking, data versioning, and remote execution. It serves as a implementation guide for transforming local training scripts into reproducible, distributed MLOps workflows.

## Key Workflows

### Experiment Tracking
The integration automatically captures code, parameters, logs, and artifacts (plots, models) for every training run. By simply installing the `clearml` package, the YOLOv5 training script hooks into the ClearML Experiment Manager without requiring significant code rewrites. This captures:
- Source code and uncommitted changes
- Installed packages and environment details
- Hyperparameters and model checkpoints
- Scalars (mAP, precision, recall, losses)
- Visualizations (confusion matrices, label correlograms, mosaic images)

### Data Versioning
The source emphasizes decoupling data from code. It outlines a workflow using `clearml-data sync` to upload datasets (like [[coco128-dataset]]) to the ClearML server as versioned entities.
- **Preparation**: Copy the dataset YAML configuration to the dataset root folder.
- **Upload**: Run `clearml-data sync --project <name> --name <dataset> --folder .`
- **Usage**: Reference the dataset in training scripts using its ClearML ID (`clearml://YOUR_DATASET_ID`), ensuring the exact data version is tied to the experiment.

### Remote Execution
The document describes the [[clearml-agent]] architecture, where a daemon listens to queues, recreates the experiment environment on a remote machine, and executes the task.
- **Queue Mechanism**: Tasks are enqueued via the UI or programmatically using `task.execute_remotely(queue="my_queue")`.
- **Reproducibility**: The agent uses the captured environment metadata to ensure the remote run matches the local setup.

### Hyperparameter Optimization (HPO)
The source introduces a workflow for automated HPO using Optuna integrated with ClearML.
- **Template Task**: An existing experiment is cloned as a template.
- **Automation**: A script (`hpo.py`) clones the template, varies parameters, and re-runs the training either locally or on a remote queue.
- **Visualization**: Results are aggregated in a dedicated HPO dashboard for comparing parameter sets against metrics.

### Autoscaling
For cloud deployments (AWS, GCP, Azure), ClearML provides autoscalers that dynamically provision remote agents based on queue depth, shutting them down when idle to optimize costs.

## Implementation Notes
- **YOLO Version Specificity**: Examples focus on YOLOv5 file structures (e.g., `utils/loggers/clearml/`). Users adapting this for newer versions like [[yolo12]] should verify path consistency.
- **Non-Intrusive**: The core value is the minimal code change required to enable enterprise-grade MLOps features.