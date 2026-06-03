---
type: entity
title: COCO12-Formats Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, testing, ultralytics, ci-cd]
related: [coco-dataset, coco8-seg-dataset, ultralytics-yolo]
sources: ["COCO12 格式.md"]
---
# COCO12-Formats Dataset

The **COCO12-Formats Dataset** is a minimal test dataset maintained by [[ultralytics-yolo]] containing 12 images, each saved in one of the 12 supported image formats. It is used exclusively for validating image loading pipelines and ensuring format compatibility in computer vision applications.

## Structure

The dataset is split into training and validation sets, with 6 images each:
*   **Train**: AVIF, BMP, DNG, HEIC, JPEG, JPG
*   **Val**: JP2, MPO, PNG, TIF, TIFF, WebP

It includes corresponding YOLO-format label files, though the labels are secondary to the primary goal of testing file decoding.

## Key Characteristics

*   **Purpose**: Functional validation of data loaders, not model performance benchmarking.
*   **Coverage**: Exhaustive coverage of `IMG_FORMATS` defined in the Ultralytics codebase.
*   **Dependencies**: Highlights the need for external libraries like `pillow-heif` and `pillow-avif-plugin` for non-standard formats.

## Comparison with Other Datasets

*   vs [[coco8-seg-dataset]]: COCO8 is for rapid *model* prototyping (checking if the model learns); COCO12-Formats is for rapid *infrastructure* prototyping (checking if the data loads).
*   vs [[cifar-10-dataset]]: CIFAR-10 is a fixed benchmark for classification accuracy; COCO12-Formats is a utility for engineering robustness.
