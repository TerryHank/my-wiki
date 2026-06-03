---
type: entity
title: COCO8-Pose Dataset
created: 2026-05-30
updated: 2026-05-30
tags: [dataset, pose-estimation, benchmark, ultralytics]
related: [coco8-dataset, coco-pose-dataset, coco8-multispectral-dataset, pipeline-sanity-check]
sources: ["COCO8 姿态.md"]
---
# COCO8-Pose Dataset

The **COCO8-Pose Dataset** is a minimal subset of the COCO dataset, containing exactly 8 images (4 training, 4 validation) annotated with human pose keypoints. It serves as the pose-estimation counterpart to the standard [[coco8-dataset]] (object detection) and [[coco8-multispectral-dataset]] (multispectral imaging).

## Structure
- **Images**: First 8 images from COCO train 2017.
- **Annotations**: 17 keypoints per person (standard COCO pose format).
- **Format**: YOLO-style text files (`.txt`) containing normalized keypoint coordinates and visibility flags.
- **Config**: `coco8-pose.yaml`.

## Primary Use Cases
1. **Pipeline Sanity Checks**: Verifying that the pose training loop, loss functions, and keypoint visualization tools work correctly before committing to long training runs on full datasets.
2. **Debugging**: Isolating errors in data loading, augmentation (specifically keypoint transformation), and model output projection.
3. **Rapid Prototyping**: Testing new pose estimation architectures or hyperparameters with minute-long training cycles.

## Relationship to Other Subsets
- Unlike [[coco8-dataset]], which only has bounding boxes, this dataset includes skeletal structures.
- It is the "mini" version of the full [[coco-pose-dataset]].
- It complements [[coco128-dataset]] and [[coco128-seg-dataset]] in the hierarchy of testing datasets maintained by Ultralytics.

## Integration
Commonly used with [[ultralytics-yolo]] models (e.g., `yolo26n-pose.pt`) for immediate feedback on code changes.