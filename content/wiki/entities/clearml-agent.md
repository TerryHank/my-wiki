---
type: entity
title: ClearML Agent
created: 2026-05-30
updated: 2026-05-30
tags: [daemon, remote-execution, agent, mlops]
related: [clearml-platform, alienware-sub-server, labpc-workstation, remote-training]
sources: ["ClearML 平台.md"]
---
# ClearML Agent

The **ClearML Agent** is a daemon service that executes enqueued tasks on remote machines. It is the core component enabling **[[remote-execution]]** within the **[[clearml-platform]]** ecosystem.

## Functionality

When a task is enqueued in ClearML:
1.  The Agent pulls the task from the queue.
2.  It clones the source code (including uncommitted changes if configured).
3.  It recreates the exact environment (installing specific package versions defined in the task).
4.  It executes the script and streams logs, metrics, and artifacts back to the ClearML Server in real-time.

## Deployment

The agent can be deployed on any machine with network access to the ClearML server, including:
*   Local development laptops.
*   On-premise GPU servers (e.g., **[[labpc-workstation]]**, **[[alienware-sub-server]]**).
*   Cloud VMs (AWS EC2, Azure ML, GCP).

### Installation Command

```bash
clearml-agent daemon --queue <queue_name> [--docker]
```

## Role in Distributed Training

The Agent facilitates **[[distributed-training-load-balancing]]** by allowing multiple machines to listen to the same queue. Tasks are distributed to the first available agent, optimizing resource utilization without manual job scheduling or SSH scripting. This contrasts with manual **[[remote-training]]** setups where each connection must be managed individually.

## Hardware Support

While primarily optimized for CPU and GPU workloads, the agent runs as a standard Python process, meaning it can theoretically execute tasks on specialized hardware like **[[intel-npu]]** or **[[metis-aipu]]** provided the underlying drivers and SDKs are installed in the agent's environment.
