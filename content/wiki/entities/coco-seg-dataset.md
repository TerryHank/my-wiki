---
type: entity
title: COCO-Seg Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, instance-segmentation, benchmark]
related: [coco-dataset, coco-pose-dataset, instance-segmentation, coco-evaluation-server]
sources: ["COCO 数据集_2.md"]
---
# COCO-Seg Dataset

The **COCO-Seg Dataset** is a specialized extension of the [[coco-dataset]] designed explicitly for [[instance-segmentation]] tasks. It does not introduce new images but rather augments the existing 330,000 images with high-fidelity pixel-level mask annotations for all 80 object categories.

## Relationship to COCO Ecosystem

COCO-Seg is part of a modular family of datasets sharing the same image base:
- **[[coco-dataset]]**: Original bounding box annotations for object detection.
- **[[coco-pose-dataset]]**: Keypoint annotations for human pose estimation.
- **COCO-Seg**: Polygon mask annotations for instance segmentation.

## Structure and Splits

The dataset maintains the standard COCO partitioning:
- **Train2017**: 118k images.
- **Val2017**: 5k images.
- **Test2017**: 20k images (annotations hidden, requires submission to [[coco-evaluation-server]]).

For development and testing pipelines, a miniature variant known as [[coco8-seg-dataset]] is often used, containing only 8 images from the training set.

## Evaluation Metrics

Performance on COCO-Seg is measured using:
- **[[mean-average-precision-map]] (mAP)**: Standard detection metric.
- **[[mean-average-recall-mar]] (mAR)**: Specific metric for evaluating the recall quality of segmentation masks.

## Usage in Training

The dataset is tightly integrated with the [[ultralytics-yolo]] framework. Training typically involves loading a pretrained `-seg.pt` model (e.g., `yolo26n-seg.pt`) and utilizing data augmentation techniques like [[mosaic-augmentation]] to handle scale variance and improve generalization.