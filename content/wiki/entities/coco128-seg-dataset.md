---
type: entity
title: COCO128-Seg Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, segmentation, computer-vision, benchmark]
related: [coco-seg-dataset, coco8-seg-dataset, instance-segmentation, pipeline-sanity-check]
sources: ["COCO128 分割.md"]
---
# COCO128-Seg Dataset

The **COCO128-Seg Dataset** is a compact instance segmentation dataset created by Ultralytics, consisting of the first 128 images from the COCO train 2017 set. It serves as a mid-tier benchmark between the tiny [[coco8-seg-dataset]] (8 images) and the full-scale [[coco-seg-dataset]] (over 100k images).

## Purpose and Role
The primary function of COCO128-Seg is to act as a **[[pipeline-sanity-check]]**. It is designed for:
- **Rapid Prototyping**: Testing new segmentation architectures or hyperparameters without the long wait times associated with full datasets.
- **Debugging**: Verifying that data loading pipelines, augmentation transforms, and loss calculations function correctly before scaling up.
- **Education**: Providing a manageable dataset for learning instance segmentation concepts.

## Technical Details
- **Image Count**: 128 images.
- **Categories**: 80 object classes (identical to the full COCO taxonomy).
- **Annotation Format**: YOLO-format polygons (normalized coordinates) stored in text files.
- **Split Strategy**: The default configuration (`coco128-seg.yaml`) often uses the same directory for both training and validation to maximize data density during debugging, though this should be changed for rigorous evaluation.

## Relationship to Other Datasets
- **vs. [[coco8-seg-dataset]]**: COCO128-Seg offers significantly more diversity (128 vs. 8 images), making it better suited for catching edge cases in data loading and augmentation logic.
- **vs. [[coco-seg-dataset]]**: It is a strict subset. While the full dataset is required for final benchmarking and SOTA claims, COCO128-Seg is preferred for the initial "smoke test" phase of development.

## Usage in Ultralytics Ecosystem
The dataset is tightly integrated with the [[ultralytics-yolo]] framework. It is commonly used to validate **[[instance-segmentation]]** workflows, particularly when testing the effects of **[[mosaic-augmentation]]** on model convergence.

> **Note on Versioning**: Documentation for this dataset sometimes references "YOLO26" models. Users should verify if this corresponds to the latest public release (e.g., YOLOv8/v9/v10/v11) or a specific internal build.