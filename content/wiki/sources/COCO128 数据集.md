---
type: source
title: "COCO128 Dataset: Ultralytics Documentation"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, object-detection, ultralytics, documentation]
related: [coco128-dataset, ultralytics-yolo, mosaic-augmentation, pipeline-sanity-check]
authors: ["Ultralytics Team"]
year: 2026
url: "https://docs.ultralytics.com/datasets/detect/coco128/"
venue: "Ultralytics Documentation"
sources: ["COCO128 数据集.md"]
---
# COCO128 Dataset: Ultralytics Documentation

This source document details the **COCO128** dataset, a compact subset of the COCO train2017 set containing the first 128 images. It is explicitly positioned as a tool for **[[pipeline-sanity-check]]**, debugging, and rapid experimentation before scaling to the full **[[coco-dataset]]**.

## Key Features
- **Size**: 128 images (balanced between the trivial **[[coco8-dataset]]** and the massive full COCO).
- **Primary Use**: Testing object detection pipelines, validating YAML configurations, and debugging training loops.
- **Augmentation**: Heavily emphasizes **[[mosaic-augmentation]]** to maximize diversity from the limited sample size.
- **Configuration**: Defines the standard `coco128.yaml` structure used by **[[ultralytics-yolo]]**.

## Usage Examples
The source provides concrete Python and CLI examples for training a model (referenced as "YOLO26" in the text) on this dataset:
```python
from ultralytics import YOLO
model = YOLO("yolo26n.pt")
results = model.train(data="coco128.yaml", epochs=100, imgsz=640)
```

## Hierarchy of Testing
The document establishes a clear hierarchy for dataset usage in development:
1.  **[[coco8-dataset]]**: Syntax checks and immediate feedback.
2.  **[[coco128-dataset]]**: Logic validation and pipeline sanity checks.
3.  **[[coco-dataset]]**: Full-scale performance training.

## Notes on Terminology
The source repeatedly references **"YOLO26"** (e.g., `yolo26n.pt`). This may indicate a future-dated documentation version (consistent with the project's 2026 timeline) or an internal versioning scheme distinct from the public YOLOv8/v9/v10 naming conventions.