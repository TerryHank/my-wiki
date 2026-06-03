---
type: concept
title: Mosaic Augmentation
created: 2026-05-30
updated: 2026-05-30
tags: [yolo, data-augmentation, object-detection, regularization]
related: [image-augmentation-strategies, ultralytics-yolo, ai-gym-module]
sources: ["增强.md"]
---
# Mosaic Augmentation

Mosaic Augmentation is a specialized data augmentation technique prominently used in the YOLO (You Only Look Once) family of object detectors. Unlike standard transformations that modify a single image, Mosaic stitches together **four distinct images** into a single composite training sample.

## Mechanism

The process involves:
1.  Selecting four random images from the dataset.
2.  Scaling and cropping each image.
3.  Arranging them in a 2x2 grid to form a new, larger image.
4.  Adjusting all corresponding annotations (bounding boxes, segmentation masks, or keypoints) to match the new coordinate space.

## Benefits

-   **Context Enrichment**: Objects that usually appear in isolation are now seen in the context of other objects from different scenes, helping the model learn richer feature representations.
-   **Small Object Detection**: By scaling down the original images to fit the grid, small objects become even smaller relative to the input size. This forces the detector to learn features for tiny objects more effectively, a common failure mode in standard training.
-   **Batch Size Simulation**: Since one mosaic image contains data from four original images, it effectively allows the model to "see" more diverse data per batch iteration, simulating a larger batch size without increasing memory consumption proportionally.

## Usage in Ultralytics

In the `ultralytics` library, the `Mosaic` class is a core component of the default training pipeline for detection and segmentation tasks. It is typically enabled during the initial phases of training and may be disabled in the final epochs (a technique known as "Mosaic shutdown") to allow the model to fine-tune on natural image distributions.

## Considerations for Pose Estimation

When applying Mosaic to pose estimation tasks (e.g., [[ai-gym-module]]), care must be taken to ensure that skeletal keypoints remain valid after the geometric stitching. Extreme warping or cutting of bodies at the grid boundaries can introduce noise if not handled correctly by the transformation logic.