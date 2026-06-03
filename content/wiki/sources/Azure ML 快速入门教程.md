---
type: source
title: "Ultralytics YOLOv5 on AzureML Quickstart"
created: 2026-05-30
updated: 2026-05-30
tags: [azure, cloud-computing, yolo, tutorial]
related: [azure-ml, ultralytics-yolo, remote-training, conda]
authors: ["Ultralytics"]
year: 2024
url: "https://docs.ultralytics.com/integrations/azureml-quickstart/"
venue: "Ultralytics Documentation"
sources: ["Azure ML 快速入门教程.md"]
---
# Ultralytics YOLOv5 on AzureML Quickstart

This source provides a step-by-step guide for setting up and running [[ultralytics-yolo]] models on [[azure-ml]]. It covers the entire workflow from provisioning cloud infrastructure to executing training and inference tasks.

## Key Steps

1.  **Infrastructure Setup**: Instructions on creating a [[compute-instance]] within an AzureML workspace, selecting appropriate CPU or GPU resources.
2.  **Environment Management**: Detailed steps for using [[conda]] to create isolated virtual environments (e.g., `yolov5env`) with specific Python versions, ensuring dependency consistency.
3.  **Repository Cloning**: Guidelines for cloning the official YOLOv5 repository via Git directly onto the compute instance.
4.  **Dependency Installation**: Procedures for installing core requirements and additional tools like [[onnx]] for model export capabilities.
5.  **Execution Modes**:
    *   **Training**: Running `train.py` with datasets like [[coco128]].
    *   **Validation**: Using `val.py` to assess model performance (Precision, Recall, mAP).
    *   **Inference**: Executing `detect.py` on images or videos.
    *   **Export**: Converting models to formats like ONNX, [[tensorrt]], or CoreML.
6.  **Interactive Development**: How to configure a custom [[ipython-kernel]] within AzureML Notebooks to leverage the Conda environment for interactive coding and bash execution.

## Relevance

This guide complements the existing [[AWS 快速入门教程]] by offering an alternative cloud provider strategy for [[remote-training]]. It emphasizes the use of managed compute instances and integrated notebook environments, contrasting with the raw EC2 instance approach often used with AWS. It is critical for establishing reproducible training pipelines in the Microsoft Azure ecosystem.