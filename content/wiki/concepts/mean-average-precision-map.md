---
type: concept
title: Mean Average Precision (mAP)
created: 2026-05-30
updated: 2026-05-30
tags: [metric, evaluation, computer-vision]
related: [coco-dataset, ultralytics-yolo, object-tracking-lifecycle]
sources: ["COCO 数据集.md"]
---
# Mean Average Precision (mAP)

**Mean Average Precision (mAP)** is the standard evaluation metric used in object detection and information retrieval to measure the accuracy of a model. It is the primary metric for benchmarking performance on the **[[coco-dataset]]**.

## Definition

mAP calculates the mean of the Average Precision (AP) scores across all object categories.
- **Precision**: The ratio of correctly predicted positive observations to the total predicted positives.
- **Recall**: The ratio of correctly predicted positive observations to all actual positives.
- **Average Precision (AP)**: The area under the Precision-Recall curve for a specific class.

## COCO Evaluation Protocol

In the COCO benchmark, mAP is computed over multiple Intersection over Union (IoU) thresholds:
- **mAP@[.5:.95]**: The primary metric, averaged across IoU thresholds from 0.50 to 0.95 in steps of 0.05. This rewards models that produce highly accurate bounding boxes, not just loose overlaps.
- **mAP@.50**: Precision at an IoU threshold of 0.50 (looser requirement).
- **mAP@.75**: Precision at an IoU threshold of 0.75 (stricter requirement).

This rigorous evaluation distinguishes COCO from simpler metrics used in basic classification tasks (like accuracy on [[cifar-10-dataset]]). It is also relevant to tracking systems like [[bot-sort-tracker]], where detection precision directly impacts tracking stability.