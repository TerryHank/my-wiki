---
type: source
title: "AI Gym: Real-time Pose Detection Reference"
authors: ["Ultralytics"]
year: 2024
url: "https://github.com/ultralytics/ultralytics/blob/main/ultralytics/solutions/ai_gym.py"
venue: "Ultralytics Documentation"
created: 2026-04-29
updated: 2026-04-29
tags: [computer-vision, fitness-tech, documentation, ultralytics]
related: [ultralytics-yolo, ai-gym-module, pose-estimation]
sources: ["AI 健身房.md"]
---
# AI Gym: Real-time Pose Detection Reference

This source document serves as the official API reference for the `ultralytics.solutions.ai_gym.AIGym` class. It outlines the capabilities of the Ultralytics YOLO ecosystem in the domain of fitness analytics, specifically focusing on real-time pose estimation and exercise repetition counting.

## Key Capabilities

The documentation highlights two primary functions of the `AIGym` module:
1.  **Real-time Pose Estimation**: Identifying human skeletal structures within video streams with low latency.
2.  **Gym Step Counting**: Translating raw pose data into specific exercise metrics, such as counting repetitions for squats or bicep curls.

## Integration Context

While the current project ecosystem relies on **Node.js** and **Vue 3** for the [[acceptance-form-system]], this source introduces a **Python**-based solution. This creates a potential architectural tension regarding how to integrate computer vision capabilities into the existing web-based workflow. Potential strategies include running a separate Python microservice or utilizing ONNX runtime for JavaScript, though neither is detailed in this specific reference document.

## Source Limitations

The provided text is a metadata header and a link to the source code rather than a comprehensive tutorial. It confirms the existence and purpose of the module but lacks specific method signatures, parameter definitions, or usage examples. Further investigation of the linked GitHub repository is required to extract implementation details.
