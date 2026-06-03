---
type: overview
title: My Knowledge Base
created: 2026-04-03
updated: 2026-05-30
tags: [overview]
related: []
sources: ["2026-04-03 验收表单实现.md", "2026-04-04 矩阵工作台实现.md", "AI 健身房.md", "AI 陪伴型机器人.md", "AI 陪伴机器人需求文档_1.md", "API 密钥.md", "AWS 快速入门教程.md", "Alienware 子服务器.md", "Argoverse 数据集.md", "Axelera 平台.md", "Azure ML 快速入门教程.md", "BIM 算量系统.md", "BOT 排序跟踪.md", "CIFAR-10 数据集.md", "基础跟踪.md", "增强.md", "COCO 数据集.md", "COCO12 格式.md", "COCO128 分割.md", "COCO128 数据集.md", "COCO8 多光谱.md", "COCO8 姿态.md", "COCO8 灰度.md", "CPU-GPU-NPU 性能对比.md", "Caltech256 数据集.md", "ClearML 平台.md", "Cloudflared 隧道.md", "Codex-MCP 工具.md", "Codex 杂项任务.md", "Comet ML 平台.md", "Comet 日志集成.md"]
---
# Welcome to My Knowledge Base

This is my personal knowledge base, focusing on **AI-assisted development**, **full-stack system architecture**, **robotics**, **engineering acceptance automation**, and **CAD-based engineering data processing**. This repository documents technical decisions, implementation details, and best practices. The scope now comprehensively covers **computer vision** applications (including advanced multi-object tracking, image classification, instance segmentation, pose estimation, data augmentation, **multispectral imaging**, and **grayscale detection**), **voice/tactile IoT** devices, **cloud security** practices, **cloud infrastructure** (AWS, Azure, **Cloudflare**), **local distributed computing**, **edge AI deployment**, **hardware benchmarking**, **automated quantity takeoff**, **MLOps automation**, and **AI agent operations**.

## 📁 Core Domains

- **🤖 AI & Automation**: Exploring the application of AI agents in software development and physical products. This includes the full spectrum of **computer vision**:
    - **Image Classification**: A robust area supported by multiple benchmarks. **[[cifar-10-dataset]]** serves as the foundational low-resolution testbed, while **[[caltech-256-dataset]]** offers a large-scale challenge with ~30k images across 257 classes. This expansion highlights the use of **[[convolutional-neural-networks]]** and **[[support-vector-machines]]** across different data scales.
    - **Object Detection & Segmentation**: This domain has expanded significantly with the ingestion of **[[coco-dataset]]** and its extension **[[coco-seg-dataset]]**. It now covers **[[instance-segmentation]]** (pixel-perfect masks) evaluated via **[[mean-average-precision-map]]** and **[[mean-average-recall-mar]]**.
    - **Pose Estimation**: A key pillar supported by **[[coco-pose-dataset]]** and its mini-variant **[[coco8-pose-dataset]]**. This specialized dataset enables **[[real-time-pose-estimation]]** using 17 human keypoints, evaluated via **[[object-keypoint-similarity]]** (OKS). It directly supports motion analysis in [[ai-gym-module]].
    - **Grayscale Detection**: A new modality focusing on **[[grayscale-object-detection]]** to reduce computational load and test color-agnostic robustness. This is validated using **[[coco8-grayscale-dataset]]** and leverages **[[dynamic-channel-conversion]]**.
    - **Multispectral Vision**: Exploring the new frontier of **[[multispectral-object-detection]]**. This involves processing non-RGB data via **[[spectral-interpolation]]** and **[[multi-channel-tiff-format]]**, validated using the synthetic **[[coco8-multispectral-dataset]]**.
    - **Multi-Object Tracking**: Enhanced with [[bot-sort-tracker]] capabilities to maintain identity during occlusion and camera motion.
    - **Data Augmentation**: A critical layer detailing how to train robust models, including [[mosaic-augmentation]], [[mixup]], and [[cutmix]].
    - **Pipeline Robustness & Testing**: Explicit **testing tiers** are enforced through COCO8 variants for syntax, pose, grayscale, and multispectral validation, strengthening the focus on infrastructure reliability.
    - **Model Evolution**: Tracking the latest advancements in **[[yolo12]]** and future versions like **YOLO26**.
- **☁️ Cloud Integration & MLOps**: A dual-focus domain expanding to include AWS/Azure ecosystems, Cloudflare Zero Trust, and automated MLOps workflows.
    - **MLOps Platforms**: The introduction of **[[clearml-platform]]** and **[[comet-ml-platform]]** marks a shift towards automated **[[mlops-workflow]]**. ClearML provides **[[experiment-tracking]]**, **[[dataset-versioning]]**, and **[[remote-execution]]** via **[[clearml-agent]]**, while Comet excels in native **[[comet-yolo-integration]]**, visual diagnostics, and the **[[comet-optimizer]]** for HPO.
    - **Data Management**: The concept of **[[comet-artifacts]]** adds a robust layer for dataset versioning and lineage tracking, complementing local YAML configurations.
    - **Zero Trust Networking**: Integration of **[[cloudflare-zero-trust]]** architecture using **[[cloudflared]]** for secure, port-less remote access. This complements traditional cloud setups by hiding services behind access-controlled identities.
    - **Security**: Managing [[ultralytics-api-keys]] with **Scoped Permissions**, adhering to [[least-privilege-principle]].
    - **Compute**: Leveraging [[aws-ec2]] and [[azure-ml]] for [[remote-training]], now often orchestrated by ClearML autoscalers or monitored via Comet for dynamic resource management.
    - **Offline Capabilities**: The concept of **[[offline-logging]]** is now critical for training on isolated nodes like the [[alienware-sub-server]], ensuring data persistence without constant connectivity.
- **🤖 AI Agent Operations**: A new domain focused on the configuration and methodology of AI agents themselves.
    - **Codex CLI & MCP**: The **[[codex-cli]]** environment is extended via **[[mcp-protocol]]** tools (e.g., Playwright, MinerU, CV debuggers).
    - **MCP First Principle**: **[[mcp-first-principle]]** dictates prioritizing standardized tool calls over raw shell scripts for security and maintainability.
    - **Systematic Debugging**: Formalizing **[[systematic-debugging]]** as a core agent skill to improve problem-solving efficiency.
    - **Agent Ecosystem**: Exploring the relationship between **[[codex-cli]]** and **[[hermes-agent]]**.
    - **Omni-Ops Center**: Codex has assumed the role of a **DevOps Center**, executing full-stack tasks from low-level firmware modification ([[esp32-firmware]]) to cloud service deployment ([[docker-deployment]]) and network configuration ([[easytier]]).
    - **Tool Ecosystem Expansion**: Extending Codex's capabilities by installing [[playwright-mcp]] or using conversion tools (mcporter) for browser automation and external protocol integration.
- **💻 Full-Stack Development**: Documenting lightweight full-stack architecture practices using **Node.js**, **Vue 3**, and **SQLite**.
- **🏗️ Engineering Acceptance & CAD**: Implementing digital tools for construction acceptance scenarios and automating material estimation via [[bim-quantity-takeoff-system]].
- **🎙️ Voice/Tactile Interaction**: Focusing on camera-less, privacy-friendly devices like the AI Companion Robot.
- **🖥️ Local Distributed Computing**: Maximizing local hardware utility through a **Master-Slave architecture**, where [[labpc-workstation]] coordinates tasks on nodes like [[alienware-sub-server]], potentially managed via ClearML queues or AI agents.
- **🛠️ Tools & Frameworks**: Deep dives into modern tools, including **Skill File Architecture**, MLOps platforms, and **Windows Development Environment Configuration** (**[[windows-path-management]]**).
- **📊 Hardware Benchmarking**: Quantifying performance across different compute units (**[[intel-npu]]**, GPU, CPU) to guide deployment strategies.
- **🌐 Hybrid Network Architecture**: Adopting an architecture where multiple networking technologies coexist, including [[cloudflared]] (Zero Trust tunnel), [[easytier]] (virtual networking), and direct connections to specific IP devices (e.g., Linorobot2, cameras) to handle complex device access and remote access requirements.

## 📂 Directory Structure

- **📥 raw/** — Raw input area
- **📚 wiki/** — Compiled knowledge base
  - `entities/` — Entities (tools, organizations, systems, hardware, datasets)
  - `concepts/` — Concepts, algorithms, frameworks
  - `sources/` — Source indices
  - `queries/` — Open questions
  - `comparisons/` — Technology comparisons
  - `synthesis/` — Synthesis summaries
  - [[wiki/index|Knowledge Base Index]]

## Recent Focus

The current primary focus remains the architectural refactoring of the **Acceptance Form System**, expanding into **AI-driven physical interaction**, **engineering data automation**, **edge AI hardware optimization**, **MLOps automation**, and **AI agent operations**:
1.  **Vision Path**: Investigating **Ultralytics YOLO** across multiple modalities (classification, detection, segmentation, pose, grayscale, multispectral). Pipelines are validated by dataset tiers (COCO8 variants, COCO128, Caltech-256). Dedicated tools like `cv-pipeline-debugger` are now available via MCP.
2.  **Infrastructure & MLOps Path**: A strategic shift towards **[[clearml-platform]]** and **[[comet-ml-platform]]** to manage **[[remote-training]]** and **[[distributed-training-load-balancing]]**. This complements existing manual AWS/Azure setups with agent-based execution, automatic environment reconstruction, and comprehensive **[[resource-utilization-monitoring]]**. The **testing tier** is formalized and supported by **[[dataset-versioning]]** for reproducibility. **[[offline-logging]]** is now a key requirement for isolated nodes. **[[comet-artifacts]]** provides a solution for data lineage, while **[[comet-optimizer]]** automates hyperparameter tuning.
3.  **Cybersecurity Path**: Adopting **[[cloudflare-zero-trust]]** for secure remote access. Using **[[cloudflared]]** and **[[ssh-proxy-command]]** allows access to internal servers without exposing ports, with special attention to **[[windows-path-management]]** quirks during configuration. Tools like [[easytier]] are maintained for complex local topologies.
4.  **AI Agent Path**: Establishing **[[codex-cli]]** as the primary development interface on **[[labpc-workstation]]**. Enforcing **[[mcp-first-principle]]** to replace ad-hoc scripts with robust toolchains (e.g., `MinerU MCP` for documents, `Playwright MCP` for testing). Codex is now the core for executing full-stack ops tasks (deployment, hardware interaction, network configuration).
5.  **Edge Deployment & Hardware Path**: Evaluating **[[intel-npu]]** vs. GPU for lightweight models based on latency and FPS benchmarks. ClearML agents can be deployed on NPU-equipped machines to leverage this efficiency. Low-level hardware customization like [[esp32-firmware]] is also involved.
6.  **Voice/Tactile Path**: Launching the **AI Companion Robot MVP**.
7.  **CAD & Engineering Automation**: Developing [[bim-quantity-takeoff-system]] for 2D topology reconstruction.
8.  **Security & Ops**: Ensuring least privilege and key rotation, now extended to MLOps credentials, zero-trust policies, and AI agent tool permissions. Standardizing backend service delivery via [[docker-deployment]].

Future work will investigate the cost-benefit analysis of ClearML hosted services vs. spot instance self-hosting, ClearML agent support for NPU hardware, integrating automatic hyperparameter optimization into YOLO training pipelines, and a detailed comparison between Codex and Hermes agents.