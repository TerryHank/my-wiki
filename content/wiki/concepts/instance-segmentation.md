---
type: concept
title: Instance Segmentation
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, technique, deep-learning]
related: [coco-dataset, object-detection, semantic-segmentation]
sources: ["COCO 数据集.md"]
---
# Instance Segmentation

**Instance Segmentation** is a computer vision technique that combines object detection and semantic segmentation. Unlike semantic segmentation, which assigns a class label to every pixel (e.g., "all pixels that are a person"), instance segmentation identifies *individual* instances of objects and delineates their exact boundaries with masks.

## Distinction from Related Tasks

- **vs. Object Detection**: Detection draws bounding boxes around objects. Instance segmentation goes further by providing a pixel-perfect mask for each object within the box.
- **vs. Semantic Segmentation**: Semantic segmentation groups pixels by class but does not distinguish between two different objects of the same class (e.g., two separate cars would be merged into one "car" region). Instance segmentation labels them as "Car 1" and "Car 2".

## Benchmarking

The **[[coco-dataset]]** is the primary benchmark for this task. It provides dense segmentation masks for every object instance in its 80 categories. Models like **Mask R-CNN** and modern **[[ultralytics-yolo]]** variants (e.g., YOLO26-seg) are evaluated on COCO using metrics like mask mAP.

## Application

This technique is critical for applications requiring precise shape understanding, such as robotic grasping, medical imaging analysis, and advanced augmented reality, where knowing the exact contour of an object is more important than just its location.