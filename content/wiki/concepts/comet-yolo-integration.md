---
type: concept
title: Comet YOLO Integration
created: 2026-05-30
updated: 2026-05-30
tags: ["integration", "configuration", "mlops", "yolo", "automation"]
related: ["comet-ml-platform", "ultralytics-yolo", "mlops-workflow", "offline-logging", "comet-artifacts"]
sources: ["Comet ML 平台.md", "Comet 日志集成.md"]
---
# Comet YOLO Integration

**Comet YOLO Integration** refers to the native mechanism within Ultralytics YOLO models (specifically documented for YOLOv5, applicable to newer versions) that automatically logs experiment data to the **Comet ML** platform. This integration eliminates the need for manual logging code, capturing metrics, hyperparameters, and visualizations by default.

## Core Capabilities

### Zero-Code Tracking
By simply installing `comet_ml` and setting the `COMET_API_KEY`, the training script automatically intercepts and logs:
- Training and validation losses (Box, Object, Class).
- Evaluation metrics (mAP, Precision, Recall).
- System metadata and hyperparameters.

### Granular Configuration
Users can tune the integration's behavior via environment variables to balance detail with performance:
- **Mode Control**: `COMET_MODE=offline` allows training on air-gapped machines (e.g., [[alienware-sub-server]]) by saving logs locally for later sync.
- **Visual Data**: `COMET_MAX_IMAGE_UPLOADS` limits the number of prediction images sent to the cloud, preventing storage bloat.
- **Metric Depth**: `COMET_LOG_PER_CLASS_METRICS` enables detailed per-class analysis, while `COMET_LOG_BATCH_LEVEL_METRICS` provides fine-grained training dynamics.

### Lifecycle Management
The integration extends beyond simple logging to manage the training lifecycle:
- **Checkpointing**: Models can be automatically uploaded to Comet at specific epochs using `--save-period`.
- **Resumption**: Training can be resumed from a specific Comet Run ID (`--resume "comet://..."`), restoring the exact state including hyperparameters and optimizer state.
- **Dataset Versioning**: Using the `--upload_dataset` flag, datasets are stored as **Comet Artifacts**, creating a versioned lineage graph that links data to specific experiments.

## Comparison with ClearML
While both **Comet** and **ClearML** offer native YOLO integration, Comet is often highlighted for its specialized visualization panels (e.g., Object Detection panel) and the **Comet Optimizer** for hyperparameter sweeps. ClearML, conversely, emphasizes agent-based remote execution and pipeline orchestration. The choice between them often depends on whether the priority is deep visualization/optimization (Comet) or distributed orchestration (ClearML).

## Implementation Example
```bash
# Train with offline logging and dataset versioning
export COMET_MODE=offline
python train.py --data coco128.yaml --weights yolov5s.pt --upload_dataset --save-period 1
```