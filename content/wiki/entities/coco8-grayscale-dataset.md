---
type: entity
title: COCO8-Grayscale Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, object-detection, grayscale, sanity-check]
related: [coco8-dataset, coco8-pose-dataset, coco8-multispectral-dataset, pipeline-sanity-check]
sources: ["COCO8 灰度.md"]
---
# COCO8-Grayscale Dataset

The **COCO8-Grayscale Dataset** is a specialized, miniature computer vision dataset consisting of 8 grayscale images derived from the COCO train 2017 set. It serves as a standard benchmark for validating object detection pipelines that operate on single-channel (intensity-only) inputs.

## Structure

- **Total Images**: 8
- **Split**: 4 training images, 4 validation images.
- **Channels**: 1 (Grayscale).
- **Annotations**: Standard COCO bounding box annotations for 80 object categories.

## Purpose

This dataset is part of the broader "COCO8" family of sanity check datasets, which includes:
- [[coco8-dataset]] (Standard RGB)
- [[coco8-pose-dataset]] (Pose estimation)
- [[coco8-multispectral-dataset]] (Synthetic multispectral)
- **COCO8-Grayscale** (Single-channel intensity)

Its primary function is to act as a [[pipeline-sanity-check]]. Developers use it to verify that their data loaders correctly handle grayscale conversion, that model input layers accept single-channel tensors, and that the training loop executes without errors before committing resources to larger datasets.

## Dynamic Conversion

A unique feature of this entity in the Ultralytics ecosystem is the concept of **dynamic channel conversion**. Instead of requiring users to store separate grayscale image files, the [[dataset-yaml-config]] can specify `channels: 1`. The data loader then converts RGB images to grayscale in real-time during the training process. This allows for rapid experimentation with grayscale models using existing RGB data sources.

## Related Concepts

- [[grayscale-object-detection]]
- [[mosaic-augmentation]] (Critical for maximizing diversity in this small dataset)
- [[yolo26]]
