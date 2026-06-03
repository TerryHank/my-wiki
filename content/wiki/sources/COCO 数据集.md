---
type: source
title: "COCO Dataset: Common Objects in Context"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, object-detection, segmentation]
related: [ultralytics-yolo, mean-average-precision-map, instance-segmentation, mosaic-augmentation, ai-gym-module]
authors: ["Tsung-Yi Lin", "Michael Maire", "Serge Belongie", "Lubomir Bourdev", "Ross Girshick", "James Hays", "Pietro Perona", "Deva Ramanan", "C. Lawrence Zitnick", "Piotr Dollár"]
year: 2015
url: "https://cocodataset.org/#home"
venue: "arXiv:1405.0312"
sources: ["COCO 数据集.md"]
---
# COCO Dataset: Common Objects in Context

The **COCO** (Common Objects in Context) dataset is a large-scale benchmark for object detection, segmentation, captioning, and pose estimation. Created by the COCO Consortium (led by Microsoft), it has become the industry standard for evaluating computer vision models due to its scale, diversity, and rigorous annotation protocols.

## Key Characteristics

- **Scale**: Contains 330,000 images, with over 200,000 annotated for detection, segmentation, and captioning.
- **Categories**: Comprises 80 common object categories (e.g., persons, cars, animals, handbags).
- **Annotations**: Provides bounding boxes, segmentation masks, captions, and keypoints (for human pose).
- **Metrics**: Uses **[[mean-average-precision-map]]** (mAP) as the primary metric for detection and mean Average Recall (mAR) for segmentation.

## Dataset Structure

The dataset is partitioned into three specific subsets to ensure rigorous benchmarking:

1.  **Train2017**: 118,000 images used for training models.
2.  **Val2017**: 5,000 images used for validation and hyperparameter tuning during training.
3.  **Test2017**: 20,000 images used for final benchmarking. Ground truth annotations for this set are hidden; researchers must submit predictions to the [COCO Evaluation Server](https://codalab.lisn.upsaclay.fr/competitions/7384) (hosted on Codalab) to receive performance metrics. This prevents overfitting to the test set.

## Usage with Ultralytics YOLO

The dataset is natively supported in the [[ultralytics-yolo]] framework via the `coco.yaml` configuration file. This file defines the dataset paths, class names, and download URLs.

### Training Example

To train a YOLO26n model (a specific variant referenced in the source documentation) on COCO for 100 epochs:

```python
from ultralytics import YOLO

# Load a pretrained model
model = YOLO("yolo26n.pt")

# Train on COCO
results = model.train(data="coco.yaml", epochs=100, imgsz=640)
```

Or via CLI:
```bash
yolo detect train data=coco.yaml model=yolo26n.pt epochs=100 imgsz=640
```

## Role in Augmentation

The source highlights the use of **[[mosaic-augmentation]]** during COCO training. Mosaicing combines four images into a single batch sample, which is critical for handling the extreme scale variance found in COCO images (from small distant objects to large foreground subjects). This technique improves the model's ability to generalize across different contexts and aspect ratios.

## Connection to Other Tasks

- **Instance Segmentation**: COCO is the primary benchmark for [[instance-segmentation]], distinguishing it from semantic segmentation by requiring masks for individual object instances.
- **Pose Estimation**: The dataset includes human keypoints, serving as the foundation for models used in the [[ai-gym-module]] for exercise tracking.
- **Comparison**: Unlike the [[argoverse-dataset]] which focuses on 3D autonomous driving scenarios, COCO focuses on general-purpose 2D recognition in diverse "in-the-wild" contexts.

## Citation

```bibtex
@misc{lin2015microsoft,
      title={Microsoft COCO: Common Objects in Context},
      author={Tsung-Yi Lin and Michael Maire and Serge Belongie and Lubomir Bourdev and Ross Girshick and James Hays and Pietro Perona and Deva Ramanan and C. Lawrence Zitnick and Piotr Dollár},
      year={2015},
      eprint={1405.0312},
      archivePrefix={arXiv},
      primaryClass={cs.CV}
}
```