---
type: entity
title: Caltech-101 Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, image-classification, computer-vision]
related: [caltech-256-dataset, cifar-10-dataset, image-classification]
sources: ["Caltech256 数据集.md"]
---
# Caltech-101 Dataset

The **Caltech-101 Dataset** is a foundational image dataset used for object classification, serving as the predecessor to the [[caltech-256-dataset]].

## Overview

- **Categories**: Contains 101 object categories plus one background category.
- **Structure**: Similar to Caltech-256, it **lacks predefined training/testing splits**.
- **Usage**: Historically significant for establishing benchmarks in early computer vision research, particularly for evaluating feature extraction methods and classifiers like SVMs before the deep learning era.

## Relationship to Caltech-256

Caltech-256 was created to address the limitations of Caltech-101 by increasing the number of categories and images per category, thereby providing a more challenging and diverse benchmark. Both datasets share the characteristic of requiring users or frameworks to define their own data splits for evaluation.