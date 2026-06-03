---
type: source
title: "COCO8-Multispectral Dataset"
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, multispectral, computer-vision, ultralytics]
related: [coco8-dataset, coco8-multispectral-dataset, yolo26, mosaic-augmentation, spectral-interpolation, multi-channel-tiff-format]
sources: ["COCO8 多光谱.md"]
authors: ["Ultralytics"]
year: 2026
url: "https://docs.ultralytics.com/datasets/coco8-multispectral/"
venue: "Ultralytics Documentation"
---
# COCO8-Multispectral Dataset

This source documents the **COCO8-Multispectral Dataset**, a specialized variant of the standard [[coco8-dataset]] designed for rapid prototyping and pipeline validation of multispectral object detection models. It retains the original 8 images (4 training, 4 validation) but expands them from 3 RGB channels to **10 synthetic spectral channels**.

## Key Characteristics

- **Synthetic Generation**: The multispectral data is not captured from physical sensors but generated via **[[spectral-interpolation]]**. Original RGB values (assigned nominal wavelengths of 475nm, 510nm, and 650nm) are interpolated using `scipy.interpolate.interp1d` to create 10 evenly spaced channels between 450nm and 700nm.
- **Purpose**: Serves as a "sanity check" for **[[pipeline-sanity-check]]** workflows, specifically testing a model's ability to handle non-standard input shapes (10 channels) and multi-channel file formats before scaling to larger datasets.
- **Model Compatibility**: Explicitly targeted at **[[yolo26]]** models, though compatible with the broader Ultralytics platform.
- **Augmentation**: Heavily relies on **[[mosaic-augmentation]]** to maximize scene diversity given the tiny dataset size.

## Technical Constraints

- **File Format**: Requires **[[multi-channel-tiff-format]]** (`.tiff` or `.tif`).
- **Channel Ordering**:
    - **Writing**: Must be `(channel, height, width)` (CHW).
    - **Reading/Training**: OpenCV `imreadmulti` returns a list of frames which must be stacked to `(height, width, channel)` (HWC) for inference.
- **Data Type**: Strictly `uint8`.

## Usage Example

The source provides Python and CLI examples for training a `yolo26n.pt` model:

```python
from ultralytics import YOLO
model = YOLO("yolo26n.pt")
results = model.train(data="coco8-multispectral.yaml", epochs=100, imgsz=640)
```

## Contradictions & Notes

- **Synthetic vs. Real**: The source clarifies that this dataset tests *pipeline compatibility* rather than *physical spectral accuracy*. It should not be used to benchmark performance on real-world multispectral sensors (e.g., thermal, NIR) without caveats.
- **YOLO26**: The documentation heavily references "YOLO26," which may be a beta or internal version name requiring verification against official release notes.