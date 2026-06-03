---
type: concept
title: CutMix
created: 2026-05-30
updated: 2026-05-30
tags: [regularization, data-augmentation, object-detection, deep-learning]
related: [image-augmentation-strategies, mixup, mosaic-augmentation]
sources: ["增强.md"]
---
# CutMix

CutMix is a data augmentation technique that improves model generalization by cutting and pasting image patches. It addresses some limitations of [[mixup]] by preserving local object features while still providing strong regularization.

## Mechanism

1.  **Patch Selection**: A rectangular patch is cropped from a donor image ($x_j$).
2.  **Pasting**: This patch is pasted onto a recipient image ($x_i$), covering a portion of the original content.
3.  **Label Adjustment**: The target label is adjusted proportionally to the area of the pasted patch. If the task is object detection, bounding boxes from both images are retained, clipped to their visible regions.

## Advantages over MixUp

-   **Local Integrity**: Unlike MixUp, which blends pixels globally creating unnatural artifacts, CutMix maintains sharp, recognizable object parts. This is particularly beneficial for tasks requiring precise localization, such as object detection and segmentation.
-   **Occlusion Simulation**: The pasted patch acts as a form of structured occlusion, forcing the model to identify objects even when partially hidden, a critical capability for the [[bot-sort-tracker]] and real-world deployment scenarios.

## Implementation in Ultralytics

The `CutMix` class in `ultralytics.data.augment` implements this logic, ensuring that annotations (boxes, masks) are correctly clipped and updated. It is often used as part of a broader augmentation pipeline, sometimes alternating with `Mosaic` to provide diverse regularization signals throughout the training process.