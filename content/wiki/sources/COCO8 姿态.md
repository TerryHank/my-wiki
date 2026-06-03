---
type: source
title: "COCO8-Pose Dataset: Introduction and Usage"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, pose-estimation, ultralytics, documentation]
related: [coco8-pose-dataset, coco-pose-dataset, ultralytics-yolo, mosaic-augmentation, pipeline-sanity-check]
sources: ["COCO8 姿态.md"]
authors: ["Ultralytics"]
year: 2026
url: "https://docs.ultralytics.com/datasets/pose/coco8-pose/"
venue: "Ultralytics Documentation"
---
# COCO8-Pose Dataset: Introduction and Usage

This source documents the **COCO8-Pose** dataset, a miniature subset of the COCO train 2017 set specifically annotated for human pose estimation. It consists of the first 8 images (4 for training, 4 for validation) and is designed as a "smoke test" for pose detection pipelines.

## Key Characteristics
- **Size**: 8 images total, allowing for rapid iteration and debugging.
- **Annotation**: Contains 17 keypoints per person annotation, stored in YOLO format (`.txt` files).
- **Purpose**: Primarily used for verifying training logic, loss calculation, and keypoint projection before scaling to larger datasets like [[coco-pose-dataset]].
- **Configuration**: Defined by the `coco8-pose.yaml` file, which specifies paths and class metadata.

## Usage with YOLO26
The documentation provides explicit examples for training the `yolo26n-pose` model:
- **Python API**: Uses `model.train(data="coco8-pose.yaml", epochs=100, imgsz=640)`.
- **CLI**: Uses `yolo pose train data=coco8-pose.yaml model=yolo26n-pose.pt ...`.

## Augmentation Insights
The source highlights the use of **[[mosaic-augmentation]]** during training. It demonstrates how mosaicing combines four images into a single batch entry, requiring specific coordinate transformations for the 17 keypoints. This technique is noted to improve generalization even in small datasets by increasing scene variety.

## Citations
Users are required to cite the original Microsoft COCO paper (Lin et al., 2015) when using this dataset or its derivatives.