---
type: source
title: "ClearML Platform: Training YOLO26 with MLOps"
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, clearml, yolo26, experiment-tracking]
related: [ultralytics-yolo, yolo12, coco8-dataset, remote-training, distributed-training-load-balancing, aws-ec2, azure-ml]
sources: ["ClearML 平台.md"]
authors: ["Ultralytics", "ClearML"]
year: 2026
url: "https://docs.ultralytics.com/integrations/clearml/"
venue: "Ultralytics Documentation"
---
# ClearML Platform: Training YOLO26 with MLOps

This source details the integration of **Ultralytics YOLO26** with the **ClearML** open-source MLOps platform. It demonstrates how to automate experiment tracking, manage datasets, and orchestrate remote execution for object detection workflows.

## Core Integration Workflow

The guide outlines a streamlined 5-step process to wrap standard YOLO training scripts with ClearML:
1.  **Task Initialization**: Creating a ClearML task to track the experiment (`Task.init`).
2.  **Model Selection**: Defining the model variant (e.g., `yolo26n`) as a tracked parameter.
3.  **Model Loading**: Instantiating the YOLO model using the Ultralytics SDK.
4.  **Argument Connection**: Connecting training arguments (data, epochs) to the ClearML task for UI-based hyperparameter tuning.
5.  **Training Execution**: Starting the training loop, which automatically logs metrics, artifacts, and console outputs.

## Key Features Highlighted

*   **Experiment Tracking**: Automatic logging of scalars (loss, accuracy), hyperparameters, and code versioning for full reproducibility.
*   **Remote Execution**: The **ClearML Agent** daemon can be deployed on any machine (local or cloud) to execute enqueued tasks, recreating the exact environment (packages, uncommitted changes) of the original experiment.
*   **Dataset Versioning**: Using `clearml-data` to version datasets separately from code, ensuring specific data snapshots are linked to training runs.
*   **Resource Monitoring**: Real-time visualization of CPU, GPU, and memory utilization to optimize costs and efficiency.
*   **Autoscaling**: Support for cloud autoscalers on AWS, GCP, and Azure to dynamically manage agent resources based on queue depth.

## Code Example

The source provides a concise Python snippet demonstrating the integration:

```python
from clearml import Task
from ultralytics import YOLO

# Initialize Task
task = Task.init(project_name="my_project", task_name="my_yolo26_task")

# Set Model Variant
model_variant = "yolo26n"
task.set_parameter("model_variant", model_variant)

# Load Model
model = YOLO(f"{model_variant}.pt")

# Connect Args
args = dict(data="coco8.yaml", epochs=16)
task.connect(args)

# Train
results = model.train(**args)
```

## Relevance to Wiki

This source significantly expands the wiki's coverage of **[[remote-training]]** by introducing an agent-based abstraction layer, contrasting with manual SSH/EC2 setups. It also provides a concrete implementation for **[[distributed-training-load-balancing]]** via ClearML's queue system. The use of **[[coco8-dataset]]** in the example reinforces its role as a standard sanity-check tool, now extended to include version control workflows.
