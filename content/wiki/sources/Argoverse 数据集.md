---
type: source
title: "Argoverse Dataset: 3D Tracking, Motion Forecasting, and Stereo Depth Estimation"
created: 2026-05-30
updated: 2026-05-30
tags: [autonomous-driving, dataset, lidar, 3d-tracking]
related: [ultralytics-yolo, argo-ai, autonomous-driving-tasks, lidar-data-processing]
authors: ["Ming-Fang Chang", "John Lambert", "Patsorn Sangkloy", "Jagjeet Singh", "Slawomir Bak", "Andrew Hartnett", "Dequan Wang", "Peter Carr", "Simon Lucey", "Deva Ramanan"]
year: 2019
url: https://www.argoverse.org/
venue: IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)
sources: ["Argoverse 数据集.md"]
---
# Argoverse Dataset: 3D Tracking, Motion Forecasting, and Stereo Depth Estimation

This source documents the **Argoverse dataset**, a comprehensive collection of sensor data developed by [[argo-ai]] for autonomous driving research. It provides high-resolution images, [[lidar-data-processing|LiDAR point clouds]], and richly annotated HD maps to support tasks such as [[autonomous-driving-tasks|3D tracking]], motion forecasting, and stereo depth estimation.

## Key Characteristics

- **Scale**: Contains over 290,000 labeled 3D object tracks and 5 million object instances across 1,263 distinct scenes.
- **Modalities**: Includes high-resolution camera images, LiDAR point clouds, and HD map data.
- **Annotations**: Features 3D bounding boxes, object tracks, and trajectory information.
- **Subsets**: Divided into three main categories:
    1.  **3D Tracking**: 113 scenes focusing on object tracking with LiDAR and camera data.
    2.  **Motion Forecasting**: 324,000 vehicle trajectories from 60 hours of driving.
    3.  **Stereo Depth Estimation**: Over 10,000 stereo image pairs with LiDAR ground truth.

## Availability and Access

A critical finding in this source is the change in data availability. Following the shutdown of Argo AI by Ford, the original dataset hosting on **Amazon S3** was discontinued. The dataset is now only available via a **manual download link on Google Drive**. This creates a significant friction point for automated training pipelines and reproducible research compared to the previous S3 bucket access.

## Integration with Ultralytics YOLO

The dataset is fully integrated into the [[ultralytics-yolo]] ecosystem via a specific YAML configuration file (`Argoverse.yaml`). This allows researchers to immediately train models (e.g., `yolo26n`) on autonomous driving tasks.

### Training Example

The source provides a standard workflow for training a YOLO model on Argoverse:

```python
from ultralytics import YOLO

# Load a pretrained model
model = YOLO("yolo26n.pt")

# Train the model
results = model.train(data="Argoverse.yaml", epochs=100, imgsz=640)
```

This integration demonstrates the flexibility of the Ultralytics framework in handling specialized domains beyond standard 2D object detection, extending into complex 3D sensor fusion tasks.

## Citations

If using this dataset, the following paper should be cited:

> Chang, M.-F., et al. (2019). "Argoverse: 3D Tracking and Forecasting with Rich Maps." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, pp. 8748–8757.