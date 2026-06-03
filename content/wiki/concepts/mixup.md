---
type: concept
title: MixUp
created: 2026-05-30
updated: 2026-05-30
tags: [regularization, data-augmentation, deep-learning, classification]
related: [image-augmentation-strategies, cutmix, ultralytics-yolo]
sources: ["增强.md"]
---
# MixUp

MixUp is a data augmentation and regularization technique that generates virtual training examples by taking the linear combination of pairs of images and their associated labels.

## Mechanism

Given two random training samples $(x_i, y_i)$ and $(x_j, y_j)$, MixUp creates a new sample $(\hat{x}, \hat{y})$ using a mixing coefficient $\lambda \in [0, 1]$:

$$ \hat{x} = \lambda x_i + (1 - \lambda) x_j $$
$$ \hat{y} = \lambda y_i + (1 - \lambda) y_j $$

Where:
-   $x$ represents the input image pixels.
-   $y$ represents the target labels (often one-hot encoded vectors).
-   $\lambda$ is typically sampled from a Beta distribution, e.g., $Beta(\alpha, \alpha)$.

## Purpose

-   **Decision Boundary Smoothing**: By training on interpolated samples, the model is discouraged from being overly confident in its predictions for any single class. This leads to smoother decision boundaries and better generalization to unseen data.
-   **Noise Reduction**: It reduces the influence of noisy or mislabeled examples in the dataset by diluting them with clean examples.

## Comparison with CutMix

While both are mixing strategies:
-   **MixUp** blends the entire image globally, resulting in "ghostly" overlays that do not resemble natural images.
-   **[[cutmix]]** replaces a specific region of one image with a patch from another, preserving local object integrity and providing stronger localization cues.

In the `ultralytics` framework, `MixUp` is available as a transform option, often used in conjunction with or as an alternative to `Mosaic` for classification and detection tasks where global context regularization is desired.