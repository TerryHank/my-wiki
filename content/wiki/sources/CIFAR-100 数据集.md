---
type: source
title: "Source: CIFAR-100 数据集.md"
created: 2026-06-03
updated: 2026-06-03
sources: ["CIFAR-100 数据集.md"]
tags: []
related: []
---

# Source: CIFAR-100 数据集.md

## Key Entities

| Name | Type | Role in Source | Exists in Wiki? |
| :--- | :--- | :--- | :--- |
| **CIFAR-100 Dataset** | Dataset | Central subject; a 100-class extension of CIFAR-10 for complex classification tasks. | **No** (Only `[[cifar-10-dataset]]` exists) |
| **Alex Krizhevsky** | Person | Creator of the dataset; cited as the primary author of the technical report. | **Yes** (`[[alex-krizhevsky]]`) |
| **Ultralytics YOLO** | Tool/Framework | The primary software library demonstrated for training models on this dataset (specifically `yolo26n-cls.pt`). | **Yes** (`[[ultralytics-yolo]]`) |
| **Canadian Institute For Advanced Research (CIFAR)** | Organization | The institute behind the dataset's development. | **No** |
| **Convolutional Neural Networks (CNNs)** | Model Architecture | Cited as a primary algorithm used with this dataset. | **Yes** (`[[convolutional-neural-networks]]`) |
| **Support Vector Machines (SVMs)** | Algorithm | Cited as a traditional baseline algorithm used with this dataset. | **Yes** (`[[support-vector-machines]]`) |

## Key Concepts

| Name | Definition | Why It Matters | Exists in Wiki? |
| :--- | :--- | :--- | :--- |
| **Fine-grained Image Classification** | The task of distinguishing between 100 specific object classes (vs. 10 in CIFAR-10). | Represents the core challenge of this dataset; tests model capacity for detailed feature extraction. | **No** (Only general `[[image-classification]]` exists) |
| **Coarse vs. Fine Labels** | A hierarchical labeling system where 100 fine classes are grouped into 20 coarse categories. | Allows for multi-level evaluation of model performance (broad category vs. specific object). | **No** |
| **Small-Image Benchmarking** | Using low-resolution (32x32) images to test model efficiency and robustness to limited pixel data. | Critical for evaluating models intended for edge devices or low-bandwidth scenarios. | **No** |
| **Pretrained Model Fine-tuning** | Starting training from weights initialized on a larger dataset (e.g., ImageNet) rather than random initialization. | The source explicitly recommends loading `yolo26n-cls.pt` for effective training on this small dataset. | **No** (Concept exists implicitly in `[[remote-training]]`) |

## Main Arguments & Findings

*   **Increased Complexity:** The core argument is that CIFAR-100 provides a significantly more challenging benchmark than CIFAR-10 due to the 10x increase in classes (100 vs. 10) while maintaining the same low resolution (32x32), forcing models to learn more discriminative features.
*   **Hierarchical Structure:** The dataset is uniquely structured with both "fine" (100 classes) and "coarse" (20 super-classes) labels, enabling research into hierarchical classification strategies.
*   **Standardized Split:** The data is rigidly split into 50,000 training images (500 per class) and 10,000 test images (100 per class), ensuring consistent benchmarking across studies.
*   **YOLO Compatibility:** The source demonstrates tha
