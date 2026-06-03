---
type: concept
title: Global Motion Compensation
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, camera-motion, algorithm, stabilization]
related: [bot-sort-tracker, ultralytics-yolo, ai-gym-module]
sources: ["BOT 排序跟踪.md"]
---
# Global Motion Compensation (GMC)

**Global Motion Compensation (GMC)** is an algorithmic technique used in video analysis to estimate and compensate for camera movement. It distinguishes between the motion of the camera itself and the motion of objects within the scene.

## Mechanism

GMC typically works by calculating a homography matrix or affine transform between consecutive frames based on static background features or optical flow.
1.  **Estimation**: The algorithm estimates how the entire image has shifted, rotated, or scaled due to camera pan, tilt, or zoom.
2.  **Compensation**: This transformation is applied to the predicted positions of tracked objects. Instead of assuming the camera is static, the tracker adjusts its search window to match the camera's new viewpoint.

## Relevance to Bot SORT

In the [[bot-sort-tracker]], GMC is essential for maintaining track continuity when the camera is not fixed. Without GMC, a panning camera would cause all stationary objects to appear as if they are moving rapidly, leading to track loss or false ID switches.

## Use Cases

*   **Handheld/PTZ Cameras**: Critical for scenarios where the camera operator moves or the camera is on a Pan-Tilt-Zunit.
*   **Drone Footage**: Essential for aerial tracking where the background is constantly shifting.
*   **Static Cameras**: Can be disabled for fixed installations (like a potential static mount for the [[ai-companion-robot-mvp]]) to save computational resources, as the background remains constant.
