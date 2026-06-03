---
type: concept
title: "TrackState Enumeration"
created: 2026-05-30
updated: 2026-05-30
tags: [object-tracking, state-machine, ultralytics, computer-vision]
related: [base-track-class, bot-sort-tracker, object-tracking-lifecycle]
sources: ["基础跟踪.md"]
---
# TrackState Enumeration

`TrackState` is a critical enumeration in the Ultralytics tracking framework that models the lifecycle of a tracked object. It functions as a finite state machine, dictating how the tracker responds to the presence or absence of detections in consecutive video frames.

## Lifecycle States
The enumeration typically defines four distinct states:

1.  **New**: The initial state when an object is first detected and assigned a unique ID. The tracker verifies its stability before promoting it to `Tracked`.
2.  **Tracked**: The stable state where the object is successfully matched with detections in every frame. Data is actively updated.
3.  **Lost**: A transitional state entered when a previously `Tracked` object is not detected in the current frame. The tracker retains the object's memory (position, appearance features) for a specific duration to handle **occlusions** or temporary detection failures.
4.  **Removed**: The terminal state. If an object remains in the `Lost` state beyond a predefined threshold (frames or time), it is marked as `Removed` and purged from the active track list.

## Importance in Tracking Logic
The distinction between `Lost` and `Removed` is fundamental to robust Multi-Object Tracking (MOT).
- **Occlusion Handling**: The `Lost` state allows algorithms like [[bot-sort-tracker]] to re-identify objects after they emerge from behind obstacles, preventing ID switches.
- **Memory Management**: The transition to `Removed` ensures that the tracker does not accumulate infinite stale data, maintaining computational efficiency.

In applications like the [[ai-gym-module]], correctly tuning the timeout for the `Lost` state is vital. If the timeout is too short, brief occlusions (e.g., a dumbbell blocking the view of an arm) will cause the tracker to drop the user, resetting the repetition count. If too long, "ghost" tracks may persist, causing false positives.
