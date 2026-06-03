---
type: concept
title: Autoscaling Workers
created: 2026-05-30
updated: 2026-05-30
tags: [cloud, mlops, infrastructure]
related: [clearml-platform, aws-ec2, azure-ml, remote-execution]
sources: ["ClearML 日志集成.md"]
---
# Autoscaling Workers

**Autoscaling Workers** are a mechanism in [[clearml-platform]] that automatically provisions and de-provisions cloud compute instances based on the depth of the task queue.

## Mechanism
- **Trigger**: When experiments are detected in a specific queue, the autoscaler spins up new virtual machines (VMs) in the configured cloud provider (AWS, GCP, Azure).
- **Agent Initialization**: The new VMs automatically install and run the [[clearml-agent]] daemon, listening to the target queue.
- **Execution**: Agents pick up pending tasks, execute them, and report results.
- **Termination**: Once the queue is empty and tasks are completed, the autoscaler shuts down the VMs to stop billing.

## Benefits
- **Cost Efficiency**: Resources are only paid for when tasks are pending, avoiding idle instance costs.
- **Scalability**: Handles burst workloads without manual intervention or pre-provisioning of large clusters.
- **Abstraction**: Provides a higher-level management layer over raw cloud APIs like [[aws-ec2]] or [[azure-ml]], reducing the need for custom orchestration scripts.

This concept complements static local sub-server architectures by providing elastic capacity for heavy training loads.