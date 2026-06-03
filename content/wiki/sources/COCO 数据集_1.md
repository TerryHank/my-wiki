---
type: source
title: "COCO-Pose Dataset: Structure, Metrics, and YOLO Usage"
authors: ["Tsung-Yi Lin", "Michael Maire", "Serge Belongie", "Lubomir Bourdev", "Ross Girshick", "James Hays", "Pietro Perona", "Deva Ramanan", "C. Lawrence Zitnick", "Piotr Dollár"]
year: 2015
url: "https://cocodataset.org/#keypoints-2017"
venue: "COCO Consortium / Ultralytics Documentation"
tags: [dataset, pose-estimation, computer-vision, benchmark]
related: [coco-dataset, coco-pose-dataset, object-keypoint-similarity, ultralytics-yolo, mosaic-augmentation]
created: 2026-05-30
updated: 2026-05-30
sources: ["COCO 数据集_1.md"]
---
# COCO-Pose Dataset: Structure, Metrics, and YOLO Usage

This source details the **COCO-Pose** dataset, a specialized subset of the [[coco-dataset]] designed specifically for human pose estimation. It serves as the primary benchmark for training and evaluating models like [[ultralytics-yolo]] in keypoint detection tasks.

## Key Characteristics
- **Scale**: Built on the COCO Keypoints 2017 collection, comprising approximately 200,000 images.
- **Annotation Schema**: Defines **17 specific keypoints** for human figures (e.g., nose, eyes, shoulders, elbows, knees, ankles), enabling detailed skeletal reconstruction.
- **Evaluation Metric**: Introduces **[[object-keypoint-similarity]]** (OKS) as the core metric for calculating mean Average Precision (mAP) in pose tasks, analogous to IoU in object detection.

## Dataset Splits
The source explicitly defines the standard data splits used for rigorous benchmarking:
1.  **Train2017**: 56,599 images used for model training.
2.  **Val2017**: 2,346 images used for validation during training.
3.  **Test2017**: A blind test set where ground truth annotations are hidden. Evaluation requires submitting predictions to the **Codalab** evaluation server to prevent overfitting and ensure fair comparison.

## Implementation with Ultralytics
The document highlights the simplicity of integrating this dataset via a YAML configuration file (`coco-pose.yaml`). It provides specific usage examples for training **YOLO26** pose models (e.g., `yolo26n-pose.pt`):
- **Mosaicing**: Emphasizes the use of [[mosaic-augmentation]] during training to handle scale variance and improve context learning for small keypoints.
- **Workflow**: Demonstrates a 3-line Python workflow or CLI command to initiate training for 100 epochs at 640x640 resolution.

## Applications
Beyond general computer vision research, this dataset is foundational for applications in sports analytics, healthcare monitoring, and human-computer interaction, directly supporting modules like the [[ai-gym-module]].
