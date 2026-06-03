---
type: concept
title: Format-Specific Dependencies
created: 2026-05-30
updated: 2026-05-30
tags: [dependencies, image-processing, system-admin]
related: [image-format-compatibility-testing, ultralytics-yolo]
sources: ["COCO12 格式.md"]
---
# Format-Specific Dependencies

**Format-Specific Dependencies** refer to the external software libraries required to decode modern or proprietary image formats that are not included in standard OpenCV or Pillow installations by default.

## Critical Dependencies

As highlighted by the [[coco12-formats-dataset]] documentation, certain formats require explicit installation steps:

| Format | Required Python Package | System Library (Optional but Recommended) |
| :--- | :--- | :--- |
| **AVIF** | `pillow-avif-plugin` | `libavif` (must be installed before building OpenCV) |
| **HEIC** | `pillow-heif` | None (handled by plugin) |
| **JP2** | None (Native) | None (Native in most builds) |

## The OpenCV vs. Pillow Fallback

A common tension in vision pipelines is the performance difference between C++-backed OpenCV and Python-backed Pillow.
*   **OpenCV**: Fast, but often lacks support for newer formats unless compiled with specific flags (e.g., linking against `libavif`).
*   **Pillow**: Slower, but extensible via plugins. Ultralytics automatically falls back to Pillow with the appropriate plugin if OpenCV fails to decode a format.

Developers must be aware that relying on the fallback may introduce latency in data loading stages, which can become a bottleneck during high-throughput training on GPUs.
