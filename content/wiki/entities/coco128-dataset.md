---
type: entity
title: COCO128 Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, object-detection, benchmark, ultralytics]
related: [coco-dataset, coco8-dataset, coco128-seg-dataset, pipeline-sanity-check]
sources: ["COCO128 数据集.md"]
---
# COCO128 Dataset

The **COCO128 Dataset** is a curated subset of the **[[coco-dataset]]** (specifically the first 128 images of the COCO train2017 split). It serves as a critical intermediate benchmark in the **[[ultralytics-yolo]]** ecosystem.

## Purpose
Its primary role is to facilitate **[[pipeline-sanity-check]]** workflows. It is large enough to provide diverse object scales and contexts for meaningful logic validation, yet small enough to allow for rapid training iterations (e.g., 100 epochs in minutes) without the resource overhead of the full COCO dataset.

## Comparison with Variants
| Dataset | Image Count | Primary Use Case |
| :--- | :--- | :--- |
| **[[coco8-dataset]]** | 8 | Syntax validation, immediate smoke tests. |
| **COCO128** | 128 | **Logic validation**, debugging training loops, testing augmentation pipelines. |
| **[[coco-dataset]]** | 118k+ | Final model training and benchmarking. |
| **[[coco128-seg-dataset]]** | 128 | Specialized variant for **[[instance-segmentation]]** tasks. |

## Configuration
The dataset is loaded via the `coco128.yaml` configuration file, which defines paths, class names, and download URLs. It is primarily designed for **object detection** (bounding boxes), though annotations can theoretically be adapted for other tasks if masks or keypoints are present in the source JSON.

## Training Workflow
Standard usage involves loading a pretrained model (often referenced as `yolo26n.pt` in project documentation) and fine-tuning it:
- **Epochs**: Typically 100 for sanity checks.
- **Image Size**: 640x640.
- **Augmentation**: Relies heavily on **[[mosaic-augmentation]]** to synthesize diverse training batches from the limited image pool.