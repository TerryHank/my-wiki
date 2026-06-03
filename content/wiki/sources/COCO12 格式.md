---
type: source
title: "COCO12-Formats Dataset: Image Format Compatibility Testing"
authors: ["Ultralytics"]
year: 2026
url: "https://docs.ultralytics.com/datasets/detect/coco12-formats/"
venue: "Ultralytics Documentation"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, testing, image-formats, ultralytics]
related: [coco-dataset, ultralytics-yolo, test-driven-development, ultralytics-transform-pipeline]
sources: ["COCO12 格式.md"]
---
# COCO12-Formats Dataset: Image Format Compatibility Testing

The **COCO12-Formats Dataset** is a specialized test dataset created by [[ultralytics-yolo]] designed to validate image loading pipelines across all 12 supported image format extensions. Unlike standard benchmark datasets used for model accuracy evaluation, this dataset serves a functional engineering purpose: ensuring robustness in data ingestion modules during development and CI/CD processes.

## Purpose and Scope

The primary goal of this dataset is **Image Format Compatibility Testing**. It contains exactly 12 images (6 for training, 6 for validation), where each image is saved in a different file format. This allows developers to verify that the [[ultralytics-transform-pipeline]] can correctly decode and process diverse encodings without runtime errors.

It is distinct from the [[coco8-seg-dataset]] or [[cifar-10-dataset]] in that it is not intended for statistical performance benchmarking (mAP) due to its tiny sample size. Instead, it acts as a "minimum demo loop" asset for validating infrastructure changes.

## Supported Formats

The dataset covers the exact list of formats defined in `ultralytics/data/utils.py` (`IMG_FORMATS`):

| Format | Extension | Description | Split |
| :--- | :--- | :--- | :--- |
| **AVIF** | `.avif` | AV1 Image File Format (modern, high compression) | Train |
| **BMP** | `.bmp` | Bitmap (uncompressed raster) | Train |
| **DNG** | `.dng` | Digital Negative (Adobe RAW simulation) | Train |
| **HEIC** | `.heic` | High Efficiency Image Coding (Apple/modern mobile) | Train |
| **JPEG** | `.jpeg` | JPEG (full extension) | Train |
| **JPG** | `.jpg` | JPEG (short extension) | Train |
| **JP2** | `.jp2` | JPEG 2000 (wavelet-based, medical/geospatial) | Val |
| **MPO** | `.mpo` | Multi-Picture Object (stereo images) | Val |
| **PNG** | `.png` | Portable Network Graphics | Val |
| **TIF** | `.tif` | TIFF (short extension) | Val |
| **TIFF** | `.tiff` | Tagged Image File Format | Val |
| **WebP** | `.webp` | Modern web image format | Val |

## Technical Dependencies

A key finding from this source is the requirement for **Format-Specific Dependencies**. While standard formats like JPEG and PNG are natively supported by OpenCV, modern formats often require additional Python plugins or system libraries:

*   **AVIF**: Requires `pillow-avif-plugin`. For native OpenCV support, the system library `libavif` must be installed *before* building OpenCV.
*   **HEIC**: Requires `pillow-heif`.
*   **DNG**: The dataset simulates this format using TIFF-based files with a renamed `.dng` extension, as true RAW processing is complex and often unnecessary for pipeline validation.

If these dependencies are missing, the Ultralytics pipeline attempts to fall back to Pillow, which may introduce performance variables or failures in strict environments.

## Usage in CI/CD

The dataset is explicitly positioned for **CI/CD Pipeline Validation**. Developers can use it to automate regression testing for data loading modules.

```python
from ultralytics import YOLO

def test_all_image_formats():
    """Test that all image formats load correctly in the pipeline."""
    model = YOLO("yolo26n.pt")
    # Train for 1 epoch to force loading of all 12 images
    results = model.train(data="coco12-formats.yaml", epochs=1, imgsz=64)
    assert results is not None, "Pipeline failed to process all formats"
```

## Relation to Existing Work

This source complements the [[coco-dataset]] family. While [[coco-dataset]] and [[coco-seg-dataset]] provide the ground truth for object detection and segmentation metrics, **COCO12-Formats** ensures the underlying engine can read the data regardless of encoding. It extends the principles of [[test-driven-development]] into the realm of computer vision infrastructure.
