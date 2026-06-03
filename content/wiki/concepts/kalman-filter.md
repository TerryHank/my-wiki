---
type: concept
title: Kalman Filter
created: 2026-05-30
updated: 2026-05-30
tags: [algorithm, control-theory, object-tracking, state-estimation]
related: [bot-sort-tracker, reid-re-identification, global-motion-compensation]
sources: ["BOT 排序跟踪.md"]
---
# Kalman Filter

The **Kalman Filter** is a mathematical algorithm that uses a series of measurements observed over time, containing statistical noise and other inaccuracies, and produces estimates of unknown variables that tend to be more accurate than those based on a single measurement alone.

## Application in Object Tracking

In the context of [[bot-sort-tracker]] and the `BOTrack` class, the Kalman Filter is used for **state prediction**:
*   **Prediction Step**: Based on the object's previous position and velocity, the filter predicts where the object *should* be in the next frame.
*   **Update Step**: When a new detection arrives, the filter updates its state estimate, weighting the prediction against the new measurement based on their respective uncertainties.

This allows the tracker to maintain a smooth trajectory and continue tracking an object briefly even if a detection is missed in a single frame (e.g., due to blur or occlusion).
