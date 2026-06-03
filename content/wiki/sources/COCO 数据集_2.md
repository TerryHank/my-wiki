---
type: source
title: "COCO-Seg Dataset: Extension for Instance Segmentation"
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, instance-segmentation, dataset, ultralytics]
related: [coco-dataset, instance-segmentation, ultralytics-yolo, coco-seg-dataset, mean-average-recall-mar]
sources: ["COCO 数据集_2.md"]
authors: ["COCO Consortium", "Ultralytics"]
year: 2026
url: "https://cocodataset.org/#home"
venue: "Ultralytics Documentation"
---
# COCO-Seg Dataset: Extension for Instance Segmentation

This source details the **COCO-Seg** dataset, an annotation extension of the original [[coco-dataset]]. While reusing the same 330,000 images and 80 object categories, COCO-Seg adds detailed pixel-level instance segmentation masks. It serves as the primary benchmark for training and evaluating [[instance-segmentation]] models, particularly within the [[ultralytics-yolo]] ecosystem (specifically YOLO26-seg variants).

## Key Characteristics

- **Image Base**: Identical to the original COCO dataset (330K images).
- **Annotations**: Enhanced with precise segmentation masks for every object instance.
- **Categories**: Retains the standard 80 classes.
- **Metrics**: Evaluates performance using [[mean-average-precision-map]] (mAP) for detection and introduces [[mean-average-recall-mar]] (mAR) specifically for segmentation quality.

## Dataset Structure

The dataset is partitioned into three strict subsets to ensure rigorous benchmarking:

1.  **Train2017**: 118,000 images for model training.
2.  **Val2017**: 5,000 images for validation and hyperparameter tuning.
3.  **Test2017**: 20,000 images for final benchmarking. Ground truth annotations are hidden; predictions must be submitted to the [COCO Evaluation Server](https://codalab.lisn.upsaclay.fr/competitions/7383) to prevent overfitting.

A miniature version, [[coco8-seg-dataset]], is also available for rapid prototyping and CI/CD testing, containing only 8 images.

## Usage with Ultralytics YOLO

The source provides specific workflows for training YOLO26 segmentation models. It emphasizes the use of **Mosaicing** during training to improve small object detection and context learning.

### Training Configuration

Training is configured via a YAML file (e.g., `coco.yaml`) which defines paths and class mappings.

**Python Example:**
```python
from ultralytics import YOLO

# Load a pretrained segmentation model
model = YOLO("yolo26n-seg.pt")

# Train on COCO-Seg
results = model.train(data="coco.yaml", epochs=100, imgsz=640)
```

**CLI Example:**
```bash
yolo segment train data=coco.yaml model=yolo26n-seg.pt epochs=100 imgsz=640
```

## Relevance to Wiki

This source clarifies the modular nature of the COCO ecosystem, distinguishing between the base detection dataset, the [[coco-pose-dataset]] (keypoints), and this segmentation extension. It establishes [[coco-seg-dataset]] as the industry standard for instance segmentation benchmarks and highlights the importance of server-side evaluation for the Test2017 split.