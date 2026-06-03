---
type: concept
title: "Pose Estimation"
created: 2026-04-29
updated: 2026-04-29
tags: [computer-vision, ai-technique, human-tracking]
related: [real-time-pose-estimation, ultralytics-yolo, ai-gym-module]
sources: ["AI 健身房.md"]
---
# Pose Estimation

**Pose Estimation** (or Pose Detection) is a computer vision technique used to identify and track key points on the human body, such as joints (shoulders, elbows, knees) and limbs. By mapping these points, algorithms can reconstruct the skeletal structure of a person in an image or video stream.

## Applications

-   **Fitness Analytics**: As seen in the [[ai-gym-module]], pose estimation is used to analyze exercise form and count repetitions.
-   **Human-Computer Interaction**: Enabling gesture-based controls.
-   **Surveillance & Safety**: Detecting falls or unsafe ergonomic postures in industrial settings.
-   **Animation**: Driving 3D character rigs from video footage.

## Real-time vs. Offline

-   **Real-time Pose Estimation**: Processes video frames with low latency, enabling immediate feedback loops (e.g., counting reps as they happen). This is the mode used by Ultralytics YOLO.
-   **Offline Estimation**: Processes pre-recorded video with higher accuracy but slower speed, often used for detailed biomechanical analysis.

## Relation to Current Projects

While the current wiki focuses on data entry systems like the [[acceptance-form-system]], pose estimation offers a pathway to automate the *collection* of physical data. For instance, similar logic could theoretically be adapted to verify worker presence or posture in construction验收 scenarios, though this would require significant adaptation from the fitness-focused [[ai-gym-module]].
