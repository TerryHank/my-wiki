---
type: source
title: Caltech-256 Dataset
authors: [Gregory Griffin, Alex Holub, Pietro Perona]
year: 2007
url: https://data.caltech.edu/records/nyy15-4j048
venue: Caltech
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, image-classification, computer-vision]
related: [caltech-101-dataset, cifar-10-dataset, coco-dataset, ultralytics-yolo, convolutional-neural-networks, support-vector-machines]
sources: ["Caltech256 数据集.md"]
---
# Caltech-256 Dataset

The **Caltech-256 Dataset** is a large-scale collection of images designed for object classification tasks. Created in 2007 by Gregory Griffin, Alex Holub, and Pietro Perona, it serves as a successor to the [[caltech-101-dataset]], offering greater diversity and scale.

## Key Characteristics

- **Scale**: Contains approximately 30,000 color images.
- **Categories**: Divided into 257 categories (256 object categories + 1 background category).
- **Density**: Each category contains a minimum of 80 images.
- **Diversity**: Encompasses a wide variety of real-world objects, including animals, vehicles, household items, and people.
- **Variability**: Images feature variable sizes and resolutions, presenting a challenging benchmark for recognition algorithms.

## Structural Limitations: Automatic Splitting

Unlike modern benchmarks such as [[cifar-10-dataset]] or the [[coco-dataset]] family, Caltech-256 **does not provide predefined training or testing splits**.

- **Manual Splitting**: Historically, users were required to generate their own random splits.
- **Framework Handling**: When used with [[ultralytics-yolo]], the framework automatically handles data partitioning if no splits are found.
    - **Default Behavior**: The system randomly assigns 80% of images to the training set and 20% to the validation set.
    - **Implication**: This contrasts with fixed-split datasets where benchmark reproducibility relies on identical train/test boundaries.

## Usage with Ultralytics YOLO

The dataset is natively supported in Ultralytics YOLO via the string identifier `data="caltech256"`, eliminating the need for manual YAML configuration or directory restructuring for standard use cases.

### Training Example

To train a classification model (e.g., `yolo26n-cls.pt`) on Caltech-256:

```python
from ultralytics import YOLO

# Load a pretrained model
model = YOLO("yolo26n-cls.pt")

# Train the model
# The framework automatically splits the data 80/20
results = model.train(data="caltech256", epochs=100, imgsz=416)
```

## Applications

The dataset is extensively used for benchmarking and training various machine learning algorithms:
- **Convolutional Neural Networks (CNNs)**: Validating deep learning architectures for feature extraction.
- **Support Vector Machines (SVMs)**: Serving as a standard testbed for traditional kernel-based classifiers.
- **Object Recognition**: Evaluating the robustness of models against diverse real-world object variations.

## Citations

If you use the Caltech-256 dataset in your research, please cite:

```bibtex
@article{griffin2007caltech,
         title={Caltech-256 object category dataset},
         author={Griffin, Gregory and Holub, Alex and Perona, Pietro},
         year={2007}
}
```