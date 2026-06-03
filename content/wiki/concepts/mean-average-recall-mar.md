---
type: concept
title: Mean Average Recall (mAR)
created: 2026-05-30
updated: 2026-05-30
tags: [metric, computer-vision, instance-segmentation]
related: [mean-average-precision-map, instance-segmentation, coco-seg-dataset]
sources: ["COCO 数据集_2.md"]
---
# Mean Average Recall (mAR)

**Mean Average Recall (mAR)** is an evaluation metric primarily used in [[instance-segmentation]] tasks to measure the quality of predicted masks in terms of recall. While [[mean-average-precision-map]] (mAP) focuses on the precision of detections across different confidence thresholds, mAR evaluates the ability of a model to find all relevant object instances and cover them accurately with masks.

## Role in Segmentation

In the context of the [[coco-seg-dataset]], mAR is critical because:
- **Mask Quality**: It assesses how well the predicted polygon masks overlap with the ground truth masks (often using Intersection over Union, IoU).
- **Completeness**: It penalizes models that miss objects entirely or produce fragmented masks that fail to cover the whole object.

## Calculation

mAR is typically calculated by averaging the maximum recall values across different IoU thresholds (e.g., from 0.5 to 0.95). A high mAR indicates that the model is robust in detecting objects and generating comprehensive masks, even if the precise boundary localization varies slightly.

## Comparison with mAP

- **mAP**: Balances precision and recall; sensitive to false positives.
- **mAR**: Focuses strictly on recall; sensitive to false negatives and incomplete masks.

Both metrics are reported together in benchmark results for comprehensive performance analysis.