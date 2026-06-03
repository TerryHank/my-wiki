# Research Log

## 2026-06-04

- Project structure aligned with reference template

## 2026-05-30 ingest | Codex 杂项任务汇总

-  ingest **Codex 杂项任务.md**，识别出 Codex CLI 作为全能运维中心的新角色。
-  新建实体页面：[[openmythos]], [[linorobot2]], [[aiclient2api]], [[new-api]], [[esp32-firmware]], [[playwright-mcp]], [[easytier]]。
-  新建概念页面：[[docker-deployment]], [[mcp-tool-ecosystem]], [[hybrid-network-architecture]]。
-  更新 [[codex-cli]] 和 [[mcp-protocol]] 相关描述，强调其在部署、硬件交互和浏览器自动化中的实际应用。
-  更新索引和概述，反映混合网络架构（Cloudflared + EasyTier）和容器化部署流程的引入。

---
type: overview
title: Project Log
created: 2026-04-03
updated: 2026-05-30
tags: [log]
related: []
sources: ["Comet ML 平台.md"]
---
# Project Log

## 2026-05-30 ingest | Comet ML Platform Integration

- Ingested source **Comet ML 平台.md** detailing the native integration between Ultralytics YOLO and Comet ML.
- Created entity page **[[comet-ml-platform]]** to document the MLOps tool's features and comparison with ClearML/Azure ML.
- Created concept page **[[comet-yolo-integration]]** to capture configuration patterns, environment variables, and visual diagnostics.
- Created concept page **[[offline-logging]]** to address the requirement for training in isolated environments (e.g., Alienware sub-server).
- Updated **[[wiki/index]]** and **[[wiki/overview]]** to reflect the expansion of the MLOps ecosystem.
- Noted a potential versioning discrepancy: Source references "YOLO26" while the wiki currently lists "YOLO12".

---
type: overview
title: Project Log
created: 2026-04-03
updated: 2026-05-30
tags: [log]
related: []
sources: ["2026-04-03 验收表单实现.md", "2026-04-04 矩阵工作台实现.md", "AI 健身房.md", "AI 陪伴型机器人.md", "AI 陪伴机器人需求文档_1.md", "API 密钥.md", "AWS 快速入门教程.md", "Alienware 子服务器.md", "Argoverse 数据集.md", "Axelera 平台.md", "Azure ML 快速入门教程.md", "BIM 算量系统.md", "BOT 排序跟踪.md", "CIFAR-10 数据集.md", "基础跟踪.md", "增强.md", "COCO 数据集.md", "COCO12 格式.md", "COCO128 分割.md", "COCO128 数据集.md", "COCO8 多光谱.md", "COCO8 姿态.md", "COCO8 灰度.md", "CPU-GPU-NPU 性能对比.md", "Caltech256 数据集.md", "ClearML 平台.md", "Cloudflared 隧道.md", "Codex-MCP 工具.md", "Codex 杂项任务.md", "Comet ML 平台.md", "Comet 日志集成.md"]
---
# Project Log

## 2026-05-30 ingest | Comet Log Integration

- Ingested **Comet 日志集成.md** detailing native YOLOv5 integration with Comet ML.
- Created **[[comet-yolo-integration]]** concept page documenting zero-code logging, granular env var configuration, and lifecycle management features.
- Added **[[comet-artifacts]]** concept to cover dataset versioning and lineage tracking within Comet.
- Added **[[comet-optimizer]]** concept for hyperparameter sweeping capabilities.
- Updated **[[comet-ml-platform]]** entity context with specific implementation details (CLI flags, offline mode).
- Emphasized **[[offline-logging]]** as a critical pattern for the [[alienware-sub-server]] workflow.
- Updated index and overview to reflect the expanded MLOps toolkit (ClearML + Comet).