---
type: concept
title: Image Classification
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, deep-learning, task-definition]
related: [cifar-10-dataset, ultralytics-yolo, pose-estimation, object-detection]
sources: ["CIFAR-10 数据集.md"]
---
# Image Classification

**Image Classification** is a fundamental computer vision task that involves assigning a single label to an entire input image. Unlike [[object-detection]] (which locates multiple objects with bounding boxes) or [[pose-estimation]] (which identifies skeletal keypoints), image classification outputs a probability distribution over a fixed set of categories for the whole image.

## Key Characteristics
- **Input**: A single image (e.g., 32x32 pixels in [[cifar-10-dataset]]).
- **Output**: A class label (e.g., "cat", "airplane").
- **Constraint**: Assumes the image contains a primary subject belonging to one of the predefined classes.

## Role in Deep Learning
This task serves as the primary benchmark for evaluating new neural network architectures. Datasets like CIFAR-10 are specifically structured for this purpose, allowing researchers to measure accuracy and convergence speed without the complexity of localization or segmentation.

## Implementation in Ultralytics YOLO
While [[ultralytics-yolo]] is famous for detection and tracking, it includes a dedicated classification mode. When training on CIFAR-10, the framework uses the `classify train` command, leveraging pretrained weights (e.g., `yolo26n-cls.pt`) to perform transfer learning on the low-resolution dataset.

## Distinction from Other Tasks
- **vs. Object Detection**: Classification ignores object location; detection requires bounding box coordinates.
- **vs. Pose Estimation**: Classification ignores internal structure; pose estimation maps keypoints.