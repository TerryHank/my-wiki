---
type: concept
title: "Gym Step Counting"
created: 2026-04-29
updated: 2026-04-29
tags: [algorithm, fitness-tech, logic-layer]
related: [ai-gym-module, pose-estimation]
sources: ["AI 健身房.md"]
---
# Gym Step Counting

**Gym Step Counting** (or Rep Counting) is an application-level algorithm that translates raw [[pose-estimation]] data into meaningful exercise metrics. It involves defining geometric rules or state machines to detect when a specific movement pattern (a "rep") is completed.

## Mechanism

The process typically involves:
1.  **Keypoint Tracking**: Monitoring the coordinates of specific joints (e.g., hip, knee, ankle for squats).
2.  **Angle Calculation**: Computing angles between limbs to determine posture (e.g., thigh parallel to ground).
3.  **State Transition**: Detecting the transition from an "up" state to a "down" state and back to "up" to increment a counter.

## Role in AI Gym

In the [[ai-gym-module]], this logic is pre-packaged to support common exercises. The system abstracts the complex mathematical calculations of vector angles and temporal smoothing, providing a simple API for developers to retrieve rep counts.

## Generalization Potential

While currently targeted at fitness, the underlying concept of "event counting via pose logic" could be adapted for other domains present in this wiki, such as:
-   Counting assembly line actions.
-   Verifying safety protocol adherence (e.g., "did the worker lift with their knees?").
-   Automating attendance or activity verification in the [[acceptance-form-system]].
