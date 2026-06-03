---
type: entity
title: COCO8-Multispectral Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, multispectral, testing, ultralytics]
related: [coco8-dataset, spectral-interpolation, multi-channel-tiff-format, pipeline-sanity-check, yolo26]
sources: ["COCO8 多光谱.md"]
---
# COCO8-Multispectral Dataset

The **COCO8-Multispectral Dataset** is a derivative of the [[coco8-dataset]] created by [[ultralytics-yolo]]. It consists of the same 8 images from the COCO train 2017 set but transformed into a **10-channel multispectral format**.

## Purpose

It is designed exclusively as a **[[pipeline-sanity-check]]** tool. Its primary function is to validate that a computer vision training pipeline can correctly ingest, process, and augment multi-channel image data (specifically 10 channels) without requiring the computational cost or data acquisition effort of a full-scale multispectral dataset.

## Generation Method

Unlike standard datasets captured by cameras, this dataset is **synthetic**:
1.  **Wavelength Assignment**: Nominal wavelengths are assigned to RGB channels (Red: 650nm, Green: 510nm, Blue: 475nm).
2.  **Spectral Interpolation**: Linear interpolation (using SciPy's `interp1d`) estimates pixel values at intermediate wavelengths between 450nm and 700nm.
3.  **Extrapolation**: Values beyond the original RGB range are extrapolated to complete the 10-channel spectrum.

## Technical Specifications

- **Image Count**: 8 total (4 train, 4 val).
- **Channels**: 10 spectral channels.
- **Format**: Multi-channel **[[multi-channel-tiff-format]]** (`.tiff`).
- **Data Type**: `uint8`.
- **Channel Order**:
    - Storage: CHW `(channel, height, width)`.
    - Inference: HWC `(height, width, channel)`.

## Usage in Workflow

It is typically the first step in a **[[hierarchy-of-testing]]** for advanced modalities:
1.  **Syntax Check**: Verify TIFF loading and channel stacking.
2.  **Logic Check**: Ensure **[[mosaic-augmentation]]** works correctly with 10-channel inputs.
3.  **Performance Check**: Move to larger, real-world multispectral datasets only after passing COCO8-Multispectral.

## Limitations

Because the spectral data is interpolated from RGB, it **does not** contain genuine physical spectral reflectance properties. It is unsuitable for benchmarking model accuracy on real-world spectral tasks (e.g., vegetation health analysis, material classification) but is ideal for engineering validation.