---
type: source
title: "CIFAR-10 Dataset: Learning Multiple Layers of Features from Tiny Images"
authors: [Alex Krizhevsky]
year: 2009
url: https://www.cs.toronto.edu/~kriz/cifar.html
venue: Technical Report
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, image-classification, benchmark]
related: [cifar-10-dataset-entity, image-classification, ultralytics-yolo]
sources: ["CIFAR-10 数据集.md"]
---
# CIFAR-10 Dataset Source Summary

This source documents the **CIFAR-10** dataset, a foundational benchmark for image classification tasks in computer vision. Developed by Alex Krizhevsky at the Canadian Institute For Advanced Research (CIFAR), it consists of 60,000 low-resolution (32x32) color images distributed equally across 10 classes.

## Key Characteristics
- **Volume**: 60,000 total images.
- **Split**: 50,000 training images and 10,000 testing images.
- **Resolution**: 32x32 pixels (color).
- **Classes**: 10 distinct categories (airplanes, cars, birds, cats, deer, dogs, frogs, horses, ships, trucks), with 6,000 images per class.

## Usage with Ultralytics YOLO
The source highlights that the [[ultralytics-yolo]] framework supports CIFAR-10 natively. Users can initiate training without manual data preparation by passing `data="cifar10"`. The recommended workflow involves loading a pretrained classification model (e.g., `yolo26n-cls.pt`) and fine-tuning it on the dataset.

```python
from ultralytics import YOLO
model = YOLO("yolo26n-cls.pt")
results = model.train(data="cifar10", epochs=100, imgsz=32)
```

## Significance
CIFAR-10 serves as a standard "hello world" dataset for validating new architectures like [[convolutional-neural-networks]] (CNNs) and traditional algorithms like [[support-vector-machines]] (SVMs). Its small size allows for rapid experimentation and iteration, contrasting with larger, more complex datasets like [[argoverse-dataset]].

## Citation
```bibtex
@TECHREPORT{Krizhevsky09learningmultiple,
            author={Alex Krizhevsky},
            title={Learning multiple layers of features from tiny images},
            institution={},
            year={2009}
}
```