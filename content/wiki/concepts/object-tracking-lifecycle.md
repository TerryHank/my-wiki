---
type: concept
title: "Object Tracking Lifecycle"
created: 2026-05-30
updated: 2026-05-30
tags: [computer-vision, algorithm-design, state-machine, mot]
related: [track-state-enum, base-track-class, bot-sort-tracker, reid-re-identification]
sources: ["基础跟踪.md"]
---
# Object Tracking Lifecycle

The Object Tracking Lifecycle describes the sequence of states an entity passes through within a Multi-Object Tracking (MOT) system, from initial detection to final removal. This concept is central to understanding how modern trackers like [[bot-sort-tracker]] maintain identity consistency in dynamic environments.

## The State Sequence
The lifecycle is managed by a state machine, typically implemented via the [[track-state-enum]] and enforced by the [[base-track-class]].

1.  **Initialization (New)**:
    - Triggered by a detection that does not match any existing active tracks.
    - A new ID is assigned, and a track object is instantiated.
    - The system may require the object to be detected for $N$ consecutive frames to confirm it is not noise before promoting it.

2.  **Active Tracking (Tracked)**:
    - The object is successfully associated with detections in subsequent frames.
    - Attributes such as position (via [[kalman-filter]]), velocity, and appearance embeddings (for [[reid-re-identification]]) are updated.
    - This is the primary state for downstream tasks like counting or behavior analysis.

3.  **Occlusion/Gap Handling (Lost)**:
    - Occurs when a `Tracked` object fails to match with any detection in the current frame.
    - Instead of immediate deletion, the track enters the `Lost` state.
    - The tracker continues to predict the object's location and searches for matches in a wider search area or relies purely on appearance features (ReID) to recover the track.

4.  **Termination (Removed)**:
    - If the object is not recovered within a specific time window (e.g., 30 frames) while in the `Lost` state, it is transitioned to `Removed`.
    - The track is finalized and removed from active memory to free resources.

## Strategic Implications
Understanding this lifecycle is crucial for debugging computer vision applications. For instance, in the [[ai-gym-module]], a "missed rep" often correlates with the tracker prematurely transitioning from `Lost` to `Removed` during rapid movement or occlusion. Tuning the parameters governing these transitions (e.g., `track_buffer` size) is a key optimization step in deploying robust vision systems.
