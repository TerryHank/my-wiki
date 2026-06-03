---
type: concept
title: ReID (Re-Identification)
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, deep-learning, feature-extraction, object-tracking]
related: [bot-sort-tracker, ultralytics-yolo, ai-gym-module]
sources: ["BOT 排序跟踪.md"]
---
# ReID (Re-Identification)

**Re-Identification (ReID)** is a computer vision technique used to identify whether an object (typically a person or vehicle) seen in one camera view or time frame is the same as an object seen in another. In the context of multi-object tracking, ReID extracts a unique feature vector (embedding) from the appearance of a detected object.

## Role in Tracking

In algorithms like [[bot-sort-tracker]], ReID serves as a critical fallback when motion cues are insufficient.
*   **Occlusion Handling**: When an object is temporarily blocked, motion prediction may fail or become ambiguous. ReID allows the tracker to match the object upon reappearance based on visual similarity (e.g., clothing color, texture) rather than just position.
*   **ID Consistency**: It prevents "ID switches," where two similar objects crossing paths are mistakenly swapped by the tracker.

## Implementation in Ultralytics

The Ultralytics Bot SORT implementation includes a dedicated `ReID` module. This module typically runs a lightweight convolutional neural network (CNN) on cropped detection images to generate embeddings. These embeddings are then compared using distance metrics (e.g., cosine similarity) to associate detections with existing tracks.

## Trade-offs

*   **Accuracy**: Significantly improves tracking stability in crowded scenes.
*   **Compute Cost**: Extracting embeddings for every detection adds latency. For edge devices like the [[metis-aipu]], the choice of ReID model architecture (e.g., OSNet vs. ResNet) and its quantization status is vital to maintaining real-time frame rates.
