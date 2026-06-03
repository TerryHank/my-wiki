---
type: concept
title: 分布式训练负载分担
created: 2026-05-30
updated: 2026-05-30
tags: [distributed-systems, machine-learning, optimization]
related: [alienware-sub-server, zhangwang-gpu-server, remote-training]
sources: ["Alienware 子服务器.md", "Alienware子服务器.md"]
---
# 分布式训练负载分担

**分布式训练负载分担** 是一种优化策略，旨在将深度学习模型训练任务在多个计算节点（如主服务器和子服务器）之间进行动态分配，以最大化资源利用率并缩短训练时间。

## 核心机制
在本项目的上下文中，该概念特指在本地基础设施内，将任务在 [[zhangwang-gpu-server]]（主 GPU 节点）和 [[alienware-sub-server]]（辅助节点）之间进行分配。
- **动机**：解决单一服务器面临的计算瓶颈，或利用闲置的高性能硬件（如 Alienware 游戏 PC）作为补充算力。
- **适用场景**：
    - **小型视觉任务**：完全卸载至子服务器。
    - **大型模型训练**：拆分批次或层级，由多机协同完成。

## 与云端训练的对比
此模式是对 [[remote-training]]（通常指利用 AWS EC2 等云端资源）的本地化补充。
- **优势**：无需额外的云成本，数据本地化安全性高，网络延迟低。
- **挑战**：受限于本地网络带宽和硬件异构性（不同 GPU 型号的性能差异）。

## 相关技术
- **技能文件架构**：用于定义各节点的行为和任务接收逻辑。