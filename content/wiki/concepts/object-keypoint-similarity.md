---
type: concept
title: Object Keypoint Similarity (OKS)
tags: [metric, evaluation, pose-estimation, computer-vision]
related: [mean-average-precision-map, coco-pose-dataset, instance-segmentation]
created: 2026-05-30
updated: 2026-05-30
sources: ["COCO 数据集_1.md"]
---
# Object Keypoint Similarity (OKS)

**Object Keypoint Similarity (OKS)** is the primary evaluation metric used for human pose estimation tasks, particularly within the [[coco-pose-dataset]] benchmark. It serves the same functional role as Intersection over Union (IoU) in object detection but is adapted for sparse keypoints rather than dense bounding boxes or masks.

## Definition
OKS measures the similarity between predicted keypoints and ground-truth annotations. It is calculated based on the Euclidean distance between predicted and actual keypoints, normalized by the object's scale (typically derived from the bounding box area) and a per-keypoint constant that reflects the localization uncertainty of specific body parts.

$$ \text{OKS} = \frac{\sum_i \exp(-d_i^2 / 2s^2\sigma_i^2)}{\sum_i \delta_i} $$

Where:
- $d_i$ is the Euclidean distance between predicted and ground truth keypoint $i$.
- $s$ is the object scale.
- $\sigma_i$ is the normalization constant for keypoint $i$.
- $\delta_i$ is an indicator for visible keypoints.

## Role in Benchmarking
OKS is used to compute **mAP<sup>pose</sup>** (mean Average Precision for pose). A prediction is considered a "true positive" only if its OKS score exceeds a certain threshold (e.g., 0.50 to 0.95). This metric is critical for evaluating models like [[ultralytics-yolo]] in pose mode, as it penalizes both missed keypoints and inaccurate localization.

## Comparison to Other Metrics
- **vs. IoU**: IoU measures area overlap for boxes/masks; OKS measures point proximity for skeletons.
- **vs. PCK**: Percentage of Correct Keypoints (PCK) is a simpler binary metric, whereas OKS provides a continuous similarity score that is more robust for ranking high-performance models.
