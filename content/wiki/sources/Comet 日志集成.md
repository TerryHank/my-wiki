---
type: source
title: "Comet Log Integration: YOLOv5 Guide"
authors: ["Comet ML", "Ultralytics"]
year: 2022
url: "https://github.com/ultralytics/yolov5/wiki/Comet"
venue: "Ultralytics YOLOv5 Wiki"
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, yolo, comet, experiment-tracking]
related: [comet-ml-platform, comet-yolo-integration, comet-artifacts, comet-optimizer, offline-logging, coco128-dataset]
sources: ["Comet 日志集成.md"]
---
# Comet Log Integration: YOLOv5 Guide

This source provides a comprehensive guide on integrating **Comet ML** with **Ultralytics YOLOv5** for automated experiment tracking, hyperparameter optimization, and dataset management. It details the "zero-code" logging capabilities enabled by the native integration, allowing users to track metrics, visualize predictions, and manage model lifecycles with minimal configuration.

## Key Features Documented

### Automatic Logging
Upon installation of `comet_ml` and configuration of API keys, the integration automatically logs:
- **Metrics**: Box, Object, and Classification losses; mAP (0.5 and 0.5:0.95); Precision and Recall.
- **Parameters**: Model hyperparameters and all command-line arguments.
- **Visualizations**: Confusion matrices, PR curves, F1 curves, and label correlograms.

### Configuration & Control
The guide emphasizes granular control over logging via environment variables to manage performance and storage:
- `COMET_MODE`: Switch between `online` and `offline` modes (critical for isolated nodes).
- `COMET_LOG_CONFUSION_MATRIX`: Toggle confusion matrix logging.
- `COMET_MAX_IMAGE_UPLOADS`: Limit the number of prediction images logged (default 100).
- `COMET_LOG_PER_CLASS_METRICS`: Enable per-class metric reporting.
- `COMET_LOG_BATCH_LEVEL_METRICS`: Enable batch-level metric logging.

### Advanced Workflows
- **Checkpoint Logging**: Enabled via the `--save-period` flag, allowing models to be saved to Comet at specific intervals.
- **Prediction Visualization**: Controlled via `--bbox_interval`, allowing users to visualize bounding boxes and ground truths in the Comet UI Object Detection panel.
- **Dataset Artifacts**: The `--upload_dataset` flag allows datasets to be versioned as Comet Artifacts, tracking lineage and metadata automatically. Conversely, datasets can be loaded directly from Artifacts using a specific YAML path format (`comet://WORKSPACE/ARTIFACT:VERSION`).
- **Run Resumption**: Interrupted training runs can be resumed exactly where they left off using the `--resume` flag with the Comet Run Path, restoring hyperparameters and checkpoints.
- **Hyperparameter Optimization (HPO)**: Integration with the **Comet Optimizer** allows for automated sweeps configured via JSON, with results visualized in the Comet UI.

## Relevance to Wiki
This source solidifies **Comet ML** as a primary MLOps tool alongside **ClearML**. It introduces specific patterns for **offline-logging** (vital for the [[alienware-sub-server]]), **dataset-versioning** via Artifacts, and fault-tolerant training via **Run Resumption**. It provides the implementation details for the [[comet-yolo-integration]] concept.