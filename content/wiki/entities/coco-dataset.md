---
type: entity
title: COCO Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, benchmark]
related: [microsoft, ultralytics-yolo, argoverse-dataset, cifar-10-dataset]
sources: ["COCO 数据集.md"]
---
# COCO Dataset

The **COCO Dataset** (Common Objects in Context) is a large-scale entity serving as the de facto standard benchmark for object detection, segmentation, and captioning tasks in computer vision.

## Overview

Created and maintained by the **[[microsoft]]**-led COCO Consortium, this dataset provides a massive collection of images annotated with bounding boxes, segmentation masks, captions, and human keypoints. Its primary purpose is to drive research in recognizing objects within their natural context, rather than in isolation.

## Statistics

- **Total Images**: 330,000+
- **Annotated Images**: 200,000+
- **Categories**: 80 common object classes (e.g., person, bicycle, car, dog).
- **Splits**:
    - **Train2017**: 118k images.
    - **Val2017**: 5k images.
    - **Test2017**: 20k images (blind test set requiring server submission).

## Significance

COCO is distinct from simpler benchmarks like the [[cifar-10-dataset]] due to its complexity and "in-the-wild" nature. While CIFAR-10 offers low-resolution, centered images for basic classification, COCO presents complex scenes with multiple overlapping objects, varying scales, and occlusions. This makes it a more rigorous test for modern architectures like [[ultralytics-yolo]], Faster R-CNN, and Mask R-CNN.

It also serves as the foundational training data for human pose estimation models, which are subsequently fine-tuned for specific applications like the [[ai-gym-module]].

## Access

The dataset is publicly available, but the ground truth for the **Test2017** split is hidden to ensure fair benchmarking. Researchers must upload their model predictions to the official evaluation server (Codalab) to receive mAP scores.