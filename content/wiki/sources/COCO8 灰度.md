---
type: source
title: "COCO8-Grayscale Dataset"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, computer-vision, object-detection, grayscale]
related: [coco8-dataset, pipeline-sanity-check, mosaic-augmentation, dataset-yaml-config, ultralytics-yolo]
authors: ["Ultralytics", "Tsung-Yi Lin", "Michael Maire", "Serge Belongie"]
year: 2015
url: "https://docs.ultralytics.com/datasets/detect/coco8-grayscale/"
venue: "Ultralytics Documentation"
sources: ["COCO8 灰度.md"]
---
# COCO8-Grayscale Dataset

The **COCO8-Grayscale** dataset is a miniature subset of the COCO train 2017 set, consisting of the first 8 images converted to single-channel grayscale format (4 for training, 4 for validation). It is designed specifically for rapid testing, debugging, and experimentation with grayscale object detection pipelines using [[ultralytics-yolo]] models (specifically [[yolo26]]).

## Key Characteristics

- **Size**: 8 images total, ensuring near-instant feedback loops for pipeline validation.
- **Modality**: Single-channel intensity images (grayscale), reducing computational load compared to RGB.
- **Compatibility**: Fully integrated with the [[ultralytics-platform]] and YOLO26 architecture.
- **Use Case**: Primarily used as a [[pipeline-sanity-check]] to verify that data loaders, model inputs, and training loops function correctly before scaling to full datasets.

## Configuration and Usage

The dataset is configured via a YAML file (`coco8-grayscale.yaml`) which defines paths, class names, and metadata. A key feature highlighted in this source is the ability to perform **dynamic channel conversion**. Users do not strictly need a pre-converted grayscale dataset; they can use standard RGB images and set `channels: 1` in their dataset YAML configuration. This forces the data loader to convert images to grayscale on-the-fly during training.

### Training Example

Training a YOLO26n model on this dataset typically involves:
- **Model**: `yolo26n.pt`
- **Epochs**: 100 (sufficient for sanity checks on small data)
- **Image Size**: 640
- **Augmentation**: Heavy reliance on [[mosaic-augmentation]] to maximize sample diversity within the tiny dataset.

## Augmentation Strategy

The source emphasizes the critical role of [[mosaic-augmentation]] for small datasets like COCO8-Grayscale. By stitching four images into one during each batch, the technique increases object density and context variance, helping the model generalize better despite the limited number of source images.

## Citations

The dataset derives from the original Microsoft COCO dataset. Users are advised to cite:
> Lin, T.-Y., et al. (2015). *Microsoft COCO: Common Objects in Context*.
