---
type: source
title: "BOT SORT Tracker: BOTrack and BOTSORT API Reference"
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, object-tracking, ultralytics, api-reference]
related: [ultralytics-yolo, bot-sort-tracker, reid-re-identification, global-motion-compensation]
sources: ["BOT 排序跟踪.md"]
authors: ["Ultralytics"]
year: 2026
url: "https://github.com/ultralytics/ultralytics/blob/main/ultralytics/trackers/bot_sort.py"
venue: "GitHub / Ultralytics Documentation"
---
# BOT SORT Tracker: BOTrack and BOTSORT API Reference

This source document serves as an API reference for the **Bot SORT** tracker implementation within the Ultralytics ecosystem. It details the `BOTrack` and `BOTSORT` classes found in `ultralytics/trackers/bot_sort.py`, confirming the integration of advanced multi-object tracking capabilities directly into the YOLOv8 framework.

## Core Components

The documentation highlights three primary classes that form the backbone of the tracking logic:

1.  **`BOTrack`**: The core tracking object responsible for managing the state of a single tracked entity. It utilizes a **Kalman Filter** for predicting object position and velocity, maintaining the temporal continuity of tracks.
2.  **`BOTSORT`**: The main manager class that implements the full Bot SORT logic. It handles data association, matching new detections to existing tracks using a combination of motion cues and appearance embeddings. It orchestrates the **ReID** and **GMC** modules.
3.  **`ReID`**: A dedicated module for extracting appearance embeddings. This allows the tracker to distinguish between objects with similar motion patterns but different visual features, crucial for handling occlusions and ID switches.

## Technical Capabilities

The source emphasizes that Bot SORT is a hybrid system superior to simple IoU-based trackers (like ByteTrack) in complex scenarios. Its robustness stems from three pillars:

*   **Motion Modeling**: Uses Kalman filtering for state prediction.
*   **Appearance Matching**: Integrates Re-Identification (ReID) to maintain ID consistency across occlusions.
*   **Camera Stabilization**: Implements the **Global Motion Compensation (GMC)** algorithm to estimate camera homography, preventing track drift during camera movement (pan, tilt, or zoom).

## Integration Context

This reference confirms that Bot SORT is designed as a "plug-and-play" upgrade for YOLOv8 projects. It suggests that existing computer vision pipelines, such as the [[ai-gym-module]], can be enhanced to track specific individuals over time rather than performing frame-by-frame detection. However, the inclusion of ReID and GMC introduces computational overhead, raising considerations for deployment on edge hardware like the [[metis-aipu]] or [[alienware-sub-server]].
