---
type: entity
title: CIFAR-10 Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, benchmark, image-classification]
related: [image-classification, ultralytics-yolo, argoverse-dataset, alex-krizhevsky]
sources: ["CIFAR-10 数据集.md"]
---
# CIFAR-10 Dataset

The **CIFAR-10** (Canadian Institute For Advanced Research) dataset is a widely used benchmark collection of images for machine learning and computer vision algorithms, specifically designed for **image classification** tasks.

## Structure
The dataset comprises 60,000 color images, each with a resolution of **32x32 pixels**. It is strictly divided into:
- **Training Set**: 50,000 images.
- **Testing Set**: 10,000 images.

The data is balanced across **10 classes**, with 6,000 images per class (5,000 for training, 1,000 for testing). The classes represent common objects:
1. Airplanes
2. Cars
3. Birds
4. Cats
5. Deer
6. Dogs
7. Frogs
8. Horses
9. Ships
10. Trucks

## Applications
CIFAR-10 is primarily used to evaluate the performance of:
- [[convolutional-neural-networks]] (CNNs)
- [[support-vector-machines]] (SVMs)
- Other deep learning and machine learning classifiers.

Due to its low resolution and manageable size, it is ideal for testing model efficiency, overfitting behaviors, and rapid prototyping of new architectures.

## Integration with Ultralytics YOLO
In the [[ultralytics-yolo]] ecosystem, CIFAR-10 is accessible via a simple string argument (`data="cifar10"`), eliminating the need for manual data loading scripts. It is used specifically in **classification mode** (`yolo classify`), distinct from the object detection or pose estimation modes used for other datasets.

## Comparison
Unlike the [[argoverse-dataset]], which focuses on complex 3D autonomous driving scenarios with LiDAR and high-dimensional data, CIFAR-10 represents a simplified, static 2D image classification problem. This makes it a crucial counterpoint in the wiki's coverage of computer vision tasks, spanning from simple benchmarks to complex real-world sensor fusion.

## References
- **Creator**: [[alex-krizhevsky]]
- **Original Paper**: *Learning multiple layers of features from tiny images* (2009)