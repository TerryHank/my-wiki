---
type: concept
title: Dataset YAML Configuration
created: 2026-05-30
updated: 2026-05-30
tags: [configuration, ultralytics, yaml, data-loading]
related: [coco128-dataset, ultralytics-yolo, pipeline-sanity-check]
sources: ["COCO128 数据集.md"]
---
# Dataset YAML Configuration

In the **[[ultralytics-yolo]]** framework, **Dataset YAML Configuration** is the standard mechanism for defining dataset properties without hardcoding paths in Python scripts. This abstraction allows models to be trained on different datasets simply by swapping a configuration string.

## Structure
A typical dataset YAML file (e.g., `coco128.yaml`) includes:
- **Path**: Root directory for the dataset.
- **Train/Val/Test**: Relative paths to image subsets.
- **Names**: A list of class names (e.g., `['person', 'bicycle', ...]`).
- **Download**: Optional script or URL to automatically fetch the data if missing.

## Role in Sanity Checks
This configuration pattern is central to the **[[pipeline-sanity-check]]** workflow. By using a standardized YAML file for **[[coco128-dataset]]**, developers can verify that:
1.  The data loader correctly parses the YAML structure.
2.  Image paths are resolved correctly.
3.  Class indices map correctly to model outputs.
4.  Augmentation pipelines (like **[[mosaic-augmentation]]**) receive valid tensor inputs.

## Example
```yaml
path: datasets/coco128
train: images/train2017
val: images/train2017 # COCO128 often uses train set for both due to small size
nc: 80
names: [...]
```
This decoupling of data definition from model logic enables rapid switching between **[[cifar-10-dataset]]**, **[[coco8-dataset]]**, and **[[coco-dataset]]** during development.