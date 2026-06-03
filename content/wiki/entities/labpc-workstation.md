---
type: entity
title: LabPC 工作站
created: 2026-05-30
updated: 2026-05-30
tags: [hardware, workstation, infrastructure]
related: [alienware-sub-server, zhangwang-gpu-server]
sources: ["Alienware 子服务器.md", "Alienware子服务器.md"]
---
# LabPC 工作站

**LabPC 工作站** 是本地计算生态中的核心主节点（Master Node），负责统筹管理下属的计算资源，包括 [[alienware-sub-server]] 等子服务器。

## 核心职责
- **资源调度**：作为主控中心，负责将视觉任务和模型训练负载分配给子服务器或主 GPU 服务器。
- **生态中枢**：连接本地高性能硬件（如 Alienware）与核心 GPU 集群（[[zhangwang-gpu-server]]），构建本地分布式训练环境。

## 关联实体
- **子节点**：[[alienware-sub-server]]
- **协作节点**：[[zhangwang-gpu-server]]

## 备注
目前关于 LabPC 的具体硬件配置、操作系统环境及调度软件栈的详细文档尚在完善中。