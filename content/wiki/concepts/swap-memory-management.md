---
type: concept
title: Swap Memory Management
created: 2026-04-29
updated: 2026-04-29
tags: [linux, optimization, memory, sysadmin]
related: [aws-ec2, remote-training]
sources: ["AWS 快速入门教程.md"]
---
# Swap Memory Management

**Swap Memory Management** refers to the technique of configuring a portion of the hard disk drive (HDD) or solid-state drive (SSD) to act as virtual RAM. This is a critical stability tactic in cloud computing environments, particularly when running memory-intensive deep learning training jobs on [[aws-ec2]] instances with limited physical RAM.

## Problem Context

Deep learning frameworks like PyTorch load datasets and model parameters into RAM. If the physical memory is exhausted during training, the Linux OOM (Out-Of-Memory) killer will terminate the process, causing loss of progress.

## Implementation Strategy

On Linux systems (standard in [[aws-deep-learning-ami]]), swap can be manually allocated:
1.  **Allocation**: Creating a large file (e.g., 64GB) using `fallocate`.
2.  **Permissions**: Restricting access (`chmod 600`) for security.
3.  **Activation**: Formatting the file as swap space (`mkswap`) and enabling it (`swapon`).

## Trade-offs

-   **Benefit**: Prevents immediate crash due to OOM errors, allowing training to continue (albeit slowly) or providing time to checkpoint.
-   **Cost**: Disk I/O is significantly slower than physical RAM. Excessive swapping leads to severe performance degradation ("thrashing"). It is a safety net, not a performance enhancement.

## Relevance to YOLOv5

When training [[ultralytics-yolo]] on large datasets or with large batch sizes on spot instances, enabling swap is a recommended precautionary measure to ensure job completion despite memory spikes.