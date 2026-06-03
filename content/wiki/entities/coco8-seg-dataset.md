---
type: entity
title: COCO8-Seg Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, instance-segmentation, benchmark]
related: [coco-seg-dataset, ultralytics-yolo]
sources: ["COCO 数据集_2.md"]
---
# COCO8-Seg Dataset

The **COCO8-Seg Dataset** is a miniature subset of the [[coco-seg-dataset]], designed for rapid prototyping, continuous integration (CI) testing, and "hello world" tutorials in instance segmentation.

## Composition

- **Size**: Contains exactly 8 images.
- **Source**: Derived from the Train2017 split of the full COCO-Seg dataset.
- **Annotations**: Includes full instance segmentation masks for the images included.

## Purpose

Due to its small size, COCO8-Seg allows developers to:
1.  Verify data loading pipelines and YAML configurations without waiting for large dataset downloads.
2.  Test model architecture changes quickly (training completes in minutes).
3.  Validate that the [[ultralytics-yolo]] `segment` mode is functioning correctly before committing to long training runs on the full dataset.

It is not suitable for evaluating final model performance or generalization capabilities.