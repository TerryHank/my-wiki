---
type: entity
title: COCO-Pose Dataset
tags: [dataset, pose-estimation, benchmark, computer-vision]
related: [coco-dataset, object-keypoint-similarity, ai-gym-module, ultralytics-yolo]
created: 2026-05-30
updated: 2026-05-30
sources: ["COCO 数据集_1.md"]
---
# COCO-Pose Dataset

The **COCO-Pose Dataset** is a specialized subset of the [[coco-dataset]] focused exclusively on human pose estimation. It extends the standard object detection annotations with 17 precise keypoints per person, making it the industry standard for training and evaluating skeletal tracking models.

## Structure and Schema
- **Keypoint Schema**: Defines 17 anatomical landmarks including the nose, eyes, ears, shoulders, elbows, wrists, hips, knees, and ankles.
- **Image Count**: Contains over 200,000 images labeled with keypoints.
- **Splits**:
    - **Train2017**: ~56.6k images.
    - **Val2017**: ~2.3k images.
    - **Test2017**: Blind test set evaluated via the Codalab server.

## Evaluation Metrics
Unlike standard object detection which uses Intersection over Union (IoU), COCO-Pose relies on **[[object-keypoint-similarity]]** (OKS). OKS measures the overlap between predicted and ground-truth keypoints, normalized by object scale, to calculate **mAP<sup>pose</sup>**.

## Usage in This Project
This dataset is the primary training source for the [[ai-gym-module]], enabling the system to perform [[real-time-pose-estimation]] for exercise repetition counting. It is typically loaded in [[ultralytics-yolo]] using the `coco-pose.yaml` configuration file.

## Related Resources
- **Official Site**: [cocodataset.org](https://cocodataset.org/#keypoints-2017)
- **Evaluation Server**: [Codalab Competition](https://codalab.lisn.upsaclay.fr/competitions/7384)
