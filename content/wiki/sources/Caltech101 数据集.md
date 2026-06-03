---
type: source
title: "Source: Caltech101 数据集.md"
created: 2026-06-03
updated: 2026-06-03
sources: ["Caltech101 数据集.md"]
tags: []
related: []
---

# Source: Caltech101 数据集.md

## Key Entities

*   **Caltech-101 Dataset** (Dataset): A foundational benchmark containing ~9,000 images across 101 object categories.
    *   *Role:* Central subject of the source document.
    *   *Wiki Status:* **Missing**. Needs creation. It is a distinct entity from CIFAR-10 and COCO currently in the index.
*   **Li Fei-Fei, Rob Fergus, Pietro Perona** (People): Researchers and creators of the dataset.
    *   *Role:* Authors of the seminal paper and maintainers of the dataset.
    *   *Wiki Status:* **Missing**. Li Fei-Fei is a significant figure in CV; worth adding if the wiki tracks key researchers.
*   **Ultralytics YOLO / YOLO26** (Tool/Model): The specific framework and model version (`yolo26n-cls.pt`) recommended for training on this dataset.
    *   *Role:* The primary tool for utilizing the dataset in the context of this document.
    *   *Wiki Status:* **Existing** (`[[ultralytics-yolo]]`, `[[yolo12]]`). Note: The source mentions "YOLO26," which may be a future version or a typo in the source relative to the current wiki state (`yolo12`).
*   **Convolutional Neural Networks (CNNs) & Support Vector Machines (SVMs)** (Methods/Algorithms): Traditional and deep learning algorithms used with this dataset.
    *   *Role:* Historical and current methods for evaluation on Caltech-101.
    *   *Wiki Status:* **Existing** (`[[convolutional-neural-networks]]`, `[[support-vector-machines]]`).
*   **Computer Vision and Image Understanding** (Journal): The publication venue for the original dataset paper.
    *   *Role:* Citation source.
    *   *Wiki Status:* **Missing** (likely out of scope unless tracking publication venues).

## Key Concepts

*   **Object Recognition / Image Classification** (Task): The primary application of Caltech-101, distinguishing it from detection (COCO) or tracking (Argoverse).
    *   *Why it matters:* Defines the specific utility of this dataset compared to others in the wiki.
    *   *Wiki Status:* **Existing** (`[[image-classification]]`).
*   **Automatic Data Splitting** (Technique): The process where the Ultralytics framework automatically divides the dataset (default 80/20) since no official train/test split exists.
    *   *Why it matters:* Critical implementation detail for users, as Caltech-101 lacks the formal splits found in COCO or CIFAR.
    *   *Wiki Status:* **Missing**. This is a specific handling pattern for "unsplit" datasets.
*   **Few-Shot Learning / Incremental Bayesian Approach** (Theory): The original theoretical context for the dataset's creation (learning from few examples).
    *   *Why it matters:* Explains the historical significance and the variable number of images per class (40–800).
    *   *Wiki Status:* **Missing**.
*   **Variable Resolution & Class Imbalance** (Data Characteristic): Features of the dataset where image sizes and counts per class vary significantly.
    *   *Why it matters:* Presents specific challenges for training pipelines compared to fixed-size datasets like CIF
