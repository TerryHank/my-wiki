---
type: overview
title: Knowledge Base Index
created: 2026-04-03
updated: 2026-04-29
tags: [index]
related: []
sources: ["2026-04-03 验收表单实现.md", "2026-04-04 矩阵工作台实现.md", "AI 健身房.md", "AI 陪伴型机器人.md", "AI 陪伴机器人需求文档_1.md", "API 密钥.md"]
---
# Knowledge Base Index

## Entities

- [[vitepress]] — Static site generator based on Vite and Vue 3, used as the application shell.
- [[sqlite]] — Lightweight embedded database for local data persistence.
- [[acceptance-form-system]] — Single-player acceptance recording system built with VitePress + Node + SQLite (refactored into Matrix Workbench).
- [[acceptance-workbench-ui]] — Next-gen dual-pane interface for the acceptance system, featuring a 4-grid inspector and dense matrix overview.
- [[ultralytics-yolo]] — Family of real-time object detection and image segmentation models powering computer vision tasks.
- [[ai-gym-module]] — Specific software class within Ultralytics for fitness analytics and rep counting.
- [[ai-companion-robot-mvp]] — A static plush AI doll project focusing on touch feedback, voice dialogue, and LCD expressions without cameras or apps.
- [[ultralytics-api-keys]] — Security credentials for authenticating programmatic access to the Ultralytics Platform with scoped permissions.

## Concepts

- [[test-driven-development]] — Test-Driven Development methodology, the core execution strategy of this project.
- [[grid-mapping]] — Algorithm for converting 1D point IDs to 2D coordinates.
- [[optimistic-update]] — Interaction pattern where the UI updates before the async request completes.
- [[snake-mapping-algorithm]] — Specific snake-path grid mapping algorithm for dynamic acceptance matrix layouts.
- [[sparse-record-pattern]] — "Default success" data storage strategy, recording only exceptions to optimize performance.
- [[pose-estimation]] — Computer vision technique for identifying and tracking human body keypoints.
- [[real-time-pose-estimation]] — Process of identifying skeletal structures in video streams with low latency.
- [[gym-step-counting]] — Algorithm translating pose data into exercise repetition metrics.
- [[embedded-device-workflow]] — Workflow for full-stack device engineers covering hardware selection, driver development, and sensor integration.
- [[cloud-voice-architecture]] — Architecture pattern offloading ASR, LLM, and TTS to the cloud while keeping devices as thin clients.
- [[expression-state-machine]] — Logic controlling LCD eye expressions based on touch events and cloud commands.
- [[weak-memory-strategy]] — Data strategy limiting user memory to basic info (like nicknames) to reduce complexity in MVP.
- [[minimum-demo-loop]] — The shortest end-to-end user interaction path defined to validate core feasibility in hardware/AI projects.
- [[remote-training]] — Workflow pattern offloading model training to cloud infrastructure using local scripts authenticated via API keys.
- [[least-privilege-principle]] — Security strategy of granting only the minimum necessary permissions to enforce safety.
- [[key-rotation]] — Security practice of periodically replacing API keys to mitigate compromise risks.
- [[one-time-secret-display]] — Security pattern where secrets are shown only once at creation to prevent retrieval.

## Sources

- [[2026-04-03-验收表单实现]] — Detailed plan for the acceptance form interaction system.
- [[2026-04-04-矩阵工作台实现]] — Refactoring plan for the Matrix Workbench, including TDD flow and new architecture details.
- [[ai-gym-reference]] — API reference for the Ultralytics AI Gym class for real-time pose detection.
- [[AI 陪伴型机器人]] — MVP planning document for a static plush AI doll with touch and voice interaction.
- [[AI 陪伴机器人需求文档_1]] — Detailed requirements specification for the two-person MVP team, defining hardware limits and core loops.
- [[api-keys]] — Documentation on creating and managing Ultralytics Platform API keys for secure automation.

## Queries

## Comparisons

## Synthesis