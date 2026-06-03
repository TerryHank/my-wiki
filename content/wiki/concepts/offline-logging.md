---
type: concept
title: Offline Logging
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, reliability, infrastructure]
related: [comet-ml-platform, clearml-agent, alienware-sub-server, mlops-workflow]
sources: ["Comet ML 平台.md"]
---
# Offline Logging

**Offline Logging** is an MLOps pattern where experiment data (metrics, artifacts, logs) is persisted to local storage when network connectivity to the central tracking server is unavailable or undesirable. The data is queued locally and synchronized to the cloud platform once connectivity is restored.

## Use Cases

*   **Isolated Environments**: Training on secure servers or air-gapped networks (e.g., specific configurations of [[alienware-sub-server]]) where outbound internet access is blocked.
*   **Intermittent Connectivity**: Edge devices or remote workstations with unstable network connections.
*   **Performance Optimization**: Reducing training overhead by eliminating real-time network I/O latency, writing logs asynchronously instead.

## Implementation in Comet

In the **Comet ML** ecosystem, offline mode is enabled by setting the environment variable `COMET_MODE` to `"offline"`.
*   **Local Storage**: Experiment data is saved to a designated local directory.
*   **Sync Process**: A separate command or script is used to upload the local logs to the Comet workspace when internet access is available.

## Comparison with Remote Execution

Unlike [[remote-execution]] where the agent actively pushes data to a central server in real-time, offline logging prioritizes **training stability** and **security** over immediate visibility. It ensures that a network outage does not crash the training job or result in lost metrics.

This concept is essential for robust [[distributed-training-load-balancing]] strategies where worker nodes may have varying network capabilities.
