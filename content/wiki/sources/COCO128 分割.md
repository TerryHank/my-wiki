---
type: source
title: "COCO128-Seg Dataset: Ultralytics Documentation"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, segmentation, ultralytics, documentation]
related: [coco128-seg-dataset, instance-segmentation, ultralytics-yolo, mosaic-augmentation]
authors: ["Ultralytics Team"]
year: 2026
url: "https://docs.ultralytics.com/datasets/segment/coco128-seg/"
venue: "Ultralytics Documentation"
sources: ["COCO128 分割.md"]
---
# COCO128-Seg Dataset: Ultralytics Documentation

This source document provides the official technical specification and usage guide for the **COCO128-Seg** dataset within the Ultralytics ecosystem. It defines the dataset as a compact subset of the COCO train 2017 set, specifically curated for rapid prototyping, debugging, and pipeline validation of instance segmentation models.

## Key Specifications
- **Composition**: Contains the first 128 images from the COCO train 2017 set.
- **Classes**: Covers all 80 standard COCO object categories.
- **Format**: Uses YOLO-format polygon annotations stored in `labels/{train,val}` directories alongside images.
- **Configuration**: Managed via the `coco128-seg.yaml` file, which by default points the training and validation splits to the same directory to maximize data usage during debugging phases.

## Usage Patterns
The document emphasizes the dataset's role as a "sanity check" before committing resources to full-scale training. It provides concrete examples for training a `YOLO26n-seg` model (noted in the text as the current framework version) for 100 epochs with an image size of 640.

### Training Example
The source provides both Python and CLI snippets for immediate execution:
- **Python**: `model.train(data="coco128-seg.yaml", epochs=100, imgsz=640)`
- **CLI**: `yolo segment train data=coco128-seg.yaml model=yolo26n-seg.pt epochs=100 imgsz=640`

## Augmentation Insights
A significant portion of the documentation highlights the use of **[[mosaic-augmentation]]**. It illustrates how mosaicing combines four images into a single training batch, enhancing the model's ability to generalize across different object scales and contexts. This technique is presented as critical for maximizing the utility of smaller datasets like COCO128-Seg.

## Versioning Note
The source repeatedly references **YOLO26** as the target framework. This terminology differs from the publicly common v8/v9/v10/v11 naming conventions, suggesting either an internal versioning scheme, a specific future release, or a documentation artifact that requires verification against the actual software release cycle.

## Citations
The document reiterates the requirement to cite the original Microsoft COCO paper (Lin et al., 2015) when using this dataset or its derivatives.