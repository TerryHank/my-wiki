---
type: overview
title: Knowledge Base Index
created: 2026-04-03
updated: 2026-05-30
tags: [index]
related: []
sources: ["2026-04-03 验收表单实现.md", "2026-04-04 矩阵工作台实现.md", "AI 健身房.md", "AI 陪伴型机器人.md", "AI 陪伴机器人需求文档_1.md", "API 密钥.md", "AWS 快速入门教程.md", "Alienware 子服务器.md", "Argoverse 数据集.md", "Axelera 平台.md", "Azure ML 快速入门教程.md", "BIM 算量系统.md", "BOT 排序跟踪.md", "CIFAR-10 数据集.md", "基础跟踪.md", "增强.md", "COCO 数据集.md", "COCO12 格式.md", "COCO128 分割.md", "COCO128 数据集.md", "COCO8 多光谱.md", "COCO8 姿态.md", "COCO8 灰度.md", "CPU-GPU-NPU 性能对比.md", "Caltech256 数据集.md", "ClearML 平台.md", "Cloudflared 隧道.md", "Codex-MCP 工具.md", "Codex 杂项任务.md", "Comet ML 平台.md", "Comet 日志集成.md"]
---
# Knowledge Base Index

## Entities

- [[vitepress]] — 基于 Vite 和 Vue 3 的静态站点生成器，用作应用外壳。
- [[sqlite]] — 用于本地数据持久化的轻量级嵌入式数据库。
- [[acceptance-form-system]] — 使用 VitePress + Node + SQLite 构建的单玩家验收记录系统（已重构为矩阵工作台）。
- [[acceptance-workbench-ui]] — 验收系统的下一代双窗格界面，具有 4 网格检查器和密集矩阵概览。
- [[ultralytics-yolo]] — 实时目标检测和图像分割模型家族，现通过 Bot SORT 包含原生多目标跟踪 (MOT)。
- [[ai-gym-module]] — Ultralytics 内用于健身分析的特定软件类，增强了持久用户跟踪功能。
- [[ai-companion-robot-mvp]] — 专注于触摸反馈、语音对话和 LCD 表情的静态毛绒 AI 玩偶项目，无摄像头或 App。
- [[ultralytics-api-keys]] — 用于以 scoped 权限认证程序化访问 Ultralytics 平台的安全凭证。
- [[aws-ec2]] — 用于深度学习模型 GPU 加速远程训练的可扩展云计算服务。
- [[aws-deep-learning-ami]] — 预配置的 Amazon 机器镜像，包含 Ubuntu、PyTorch 和 GPU 驱动程序，用于快速设置。
- [[alienware-sub-server]] — LabPC 生态系统中的辅助计算节点， dedicated 于小规模视觉任务和负载均衡。
- [[labpc-workstation]] — 作为主节点管理本地子服务器和 GPU 资源的主要工作站，现也用于 CAD 解析和工程量计算。
- [[zhangwang-gpu-server]] — 与子服务器协作进行分布式模型训练的主要 GPU 训练服务器。
- [[argo-ai]] — 已解散的自动驾驶汽车公司，创建了 Argoverse 数据集。
- [[axelera-ai]] — 专注于高性能边缘 AI 硬件和软件解决方案的组织。
- [[metis-aipu]] — 用于推理的特定 AI 处理单元（加速器），有 PCIe 和 M.2 形式。
- [[voyager-sdk]] — 在 Metis 硬件上编译、量化和运行模型所需的软件开发工具包。
- [[azure-ml]] — 微软的机器学习云平台，提供管理的计算实例和集成笔记本。
- [[bim-quantity-takeoff-system]] — 旨在通过拓扑重建从 2D CAD 图纸自动提取材料数量的软件项目。
- [[cifar-10-dataset]] — 图像分类的基础基准数据集，包含 10 个类别的 6 万张 32x32 图像。
- [[alex-krizhevsky]] — 研究人员和 CIFAR-10 数据集的创建者。
- [[base-track-class]] — Ultralytics 中的抽象基类，定义所有跟踪对象的标准接口和数据模式。
- [[coco-dataset]] — 用于目标检测、分割和姿态估计的大规模基准数据集，包含 80 个类别。
- [[microsoft]] — 技术组织和 COCO 数据集的创建者。
- [[coco-pose-dataset]] — COCO 的专门子集，用于具有 17 个关键点和 OKS 指标的人体姿态估计。
- [[coco-seg-dataset]] — COCO 的扩展，具有用于实例分割任务的像素级掩码注释。
- [[coco8-seg-dataset]] — 包含 8 张图像的 COCO-Seg 微型子集，用于快速原型设计。
- [[coco128-seg-dataset]] — COCO 的紧凑实例分割子集（128 张图像），用于管道健全性检查和调试。
- [[coco128-dataset]] — COCO 的紧凑目标检测子集（128 张图像），用于逻辑验证和管道健全性检查。
- [[coco-evaluation-server]] — 在隐藏 Test2017 拆分上基准测试模型所需的外部平台。
- [[coco12-formats-dataset]] — 包含 12 种不同格式图像的专门测试数据集，用于验证图像加载管道。
- [[coco8-dataset]] — COCO 的最小子集（8 张图像），用于语法验证和即时冒烟测试。
- [[coco8-multispectral-dataset]] — COCO8 的合成 10 通道变体，用于验证多光谱训练管道和数据加载器。
- [[coco8-pose-dataset]] — COCO 的最小子集（8 张图像），注释有 17 个关键点，用于姿态估计管道调试。
- [[coco8-grayscale-dataset]] — COCO 的最小子集（8 张图像），转换为单通道灰度，用于验证灰度检测管道。
- [[intel-npu]] — 英特尔的集成神经处理单元，用于在边缘设备上高效进行 AI 推理。
- [[yolo12]] — Ultralytics 推出的最新一代 YOLO 实时目标检测系列。
- [[caltech-256-dataset]] — 大型图像分类数据集，包含约 3 万张图像，跨越 257 个类别，缺乏预定义拆分。
- [[caltech-101-dataset]] — Caltech-256 的前身，包含 101 个对象类别，也缺乏预定义拆分。
- [[clearml-platform]] — 开源 MLOps 平台，用于自动化、监控和编排 ML 工作流，具有远程执行能力。
- [[clearml-agent]] — 在远程机器上执行入队 ClearML 任务的守护服务，自动重建环境。
- [[cloudflared]] — Cloudflare Zero Trust 命令行客户端，用于建立安全隧道和代理 SSH 连接。
- [[codex-cli]] — 命令行 AI 代理接口，作为 LabPC 上 MCP 工具的宿主。
- [[hermes-agent]] — 与 Codex CLI 共存的相关 AI 代理系统或配置模式。
- [[openmythos]] — 待部署的软件工程项目，具体用途待确认。
- [[linorobot2]] — 部署在特定 IP (172.20.47.98) 上的开源机器人软件栈。
- [[aiclient2api]] — 通过 Docker 容器部署的后端 API 服务项目。
- [[new-api]] — 另一个通过 Docker 部署的后端 API 服务项目。
- [[esp32-firmware]] — 针对 ESP32 微控制器的定制固件，支持 UUID 二维码等功能。
- [[playwright-mcp]] — 基于 MCP 协议集成的 Playwright 浏览器自动化工具。
- [[easytier]] — 用于构建虚拟局域网或内网穿透的网络组网工具。
- [[comet-ml-platform]] — MLOps platform for experiment tracking, model management, and production monitoring, featuring native YOLO integration.

## Concepts

- [[test-driven-development]] — 测试驱动开发方法论，本项目的核心执行策略。
- [[grid-mapping]] — 将 1D 点 ID 转换为 2D 坐标的算法。
- [[optimistic-update]] — UI 在异步请求完成前更新的交互模式。
- [[snake-mapping-algorithm]] — 用于动态验收矩阵布局的特定蛇形路径网格映射算法。
- [[sparse-record-pattern]] — “默认成功”的数据存储策略，仅记录异常以优化性能。
- [[pose-estimation]] — 识别和跟踪人体关键点的计算机视觉技术。
- [[real-time-pose-estimation]] — 在视频流中以低延迟识别骨骼结构的过程。
- [[gym-step-counting]] — 将姿态数据转化为运动重复次数指标的算法。
- [[embedded-device-workflow]] — 涵盖硬件选择、驱动开发和传感器集成的全栈设备工程师工作流。
- [[cloud-voice-architecture]] — 将 ASR、LLM 和 TTS 卸载到云端，而设备作为瘦客户端的架构模式。
- [[expression-state-machine]] — 基于触摸事件和云端命令控制 LCD 眼睛表情的逻辑。
- [[weak-memory-strategy]] — 限制用户记忆为基本信息（如昵称）以降低 MVP 复杂度的数据策略。
- [[minimum-demo-loop]] — 定义为验证硬件/AI 项目核心可行性的最短端到端用户交互路径。
- [[remote-training]] — 将模型训练卸载到云基础设施（AWS EC2 或 Ultralytics Cloud）的工作流模式。
- [[least-privilege-principle]] — 仅授予最小必要权限以强制安全的安全策略。
- [[key-rotation]] — 定期更换 API 密钥以减轻泄露风险的安全实践。
- [[one-time-secret-display]] — 秘密仅在创建时显示一次以防止检索的安全模式。
- [[swap-memory-management]] — 使用磁盘空间作为虚拟 RAM 以防止重计算期间 OOM 错误的 Linux 技术。
- [[distributed-training-load-balancing]] — 在主服务器和辅助本地服务器之间分配模型训练任务以优化资源使用的策略。
- [[small-scale-vision-tasks]] — 适合资源有限的辅助节点的计算机视觉工作负载分类。
- [[skill-file-architecture]] — 使用独立文件定义服务器行为和自动化逻辑的配置驱动模式。
- [[autonomous-driving-tasks]] — 自动驾驶中的核心感知和预测挑战，包括 3D 跟踪和运动预测。
- [[lidar-data-processing]] — 解释来自激光扫描仪的 3D 点云数据的技术。
- [[model-quantization]] — 降低模型精度（如 INT8）以提高边缘硬件速度和效率的优化技术。
- [[edge-ai-inference]] — 在本地设备上运行 AI 模型以最小化延迟和最大化隐私的范式。
- [[compute-instance]] — 用于数据科学的管理云工作站，提供可扩展的 CPU/GPU 资源。
- [[ipython-kernel]] — 将笔记本界面链接到特定 Python 环境的计算引擎。
- [[automated-quantity-takeoff]] — 使用软件自动从图纸中提取工程量以进行采购列表的过程。
- [[2d-topology-reconstruction]] — 从离散 2D 几何线条重建逻辑连接的算法技术。
- [[dxf-parsing]] — 读取和解释 DXF 文件格式的技术过程，处理编码和实体提取。
- [[bot-sort-tracker]] — 结合卡尔曼滤波、ReID 和全局运动补偿的高级多目标跟踪算法。
- [[reid-re-identification]] — 提取外观嵌入以在遮挡期间维持对象身份的技术。
- [[global-motion-compensation]] — 估计相机运动以在非静态场景中稳定跟踪的算法。
- [[kalman-filter]] — 从噪声测量中估计对象状态（位置/速度）的数学算法。
- [[image-classification]] — 为整个图像分配单个标签的任务，区别于检测或分割。
- [[convolutional-neural-networks]] — 使用卷积层学习特征空间层次结构的深度学习架构。
- [[support-vector-machines]] — 用作分类基线的传统监督学习算法。
- [[track-state-enum]] — 定义 Ultralytics 中跟踪对象生命周期状态（新建、跟踪、丢失、移除）的枚举。
- [[object-tracking-lifecycle]] — 实体在 MOT 系统中经过的状态序列，由状态机管理。
- [[image-augmentation-strategies]] — 通过几何和光度修改扩展训练数据集的技术综述。
- [[mosaic-augmentation]] — YOLO 特定技术，拼接四张图像以改善小物体检测和上下文学习。
- [[mixup]] — 线性混合两张图像和标签以平滑决策边界的正则化方法。
- [[cutmix]] — 切割和粘贴补丁的增强技术，在正则化的同时保留局部特征。
- [[geometric-transformation]] — 空间变换（翻转、旋转、透视）以模拟相机变化。
- [[photometric-transformation]] — 像素级调整（颜色、亮度）以模拟照明和传感器变化。
- [[ultralytics-transform-pipeline]] — 定义数据预处理工作流的增强步骤的顺序组合。
- [[albumentations-integration]] — 在 Ultralytics 中使用外部 Albumentations 库进行高级增强。
- [[mean-average-precision-map]] — 评估目标检测准确性的标准指标，主要用于 COCO 基准测试。
- [[instance-segmentation]] — 检测和描绘具有像素完美掩码的单个对象实例的计算机视觉任务。
- [[object-keypoint-similarity]] — 姿态估计的评估指标，类似于 IoU，用于计算 COCO-Pose 上的 mAP。
- [[mean-average-recall-mar]] — 专门用于评估实例分割掩码质量（掩码召回率）的指标。
- [[image-format-compatibility-testing]] — 验证计算机视觉管道可以摄入不同文件编码而不会失败的方法论。
- [[format-specific-dependencies]] — 需要特定库（如 pillow-heif）来解码现代图像格式的技术约束。
- [[pipeline-sanity-check]] — 使用小型多样化数据集在全面执行之前验证 ML 训练管道的方法论。
- [[dataset-yaml-config]] — 使用 YAML 文件定义数据集路径、类和元数据以用于 Ultralytics 加载器的抽象模式。
- [[spectral-interpolation]] — 使用线性插值从 RGB 数据生成合成多光谱通道的方法。
- [[multi-channel-tiff-format]] — 存储超过 3 个通道图像的文件格式标准，需要特定的 CHW/HWC 处理。
- [[multispectral-object-detection]] — 利用多个光谱波段进行改进对象区分的计算机视觉任务。
- [[pose-detection-sanity-check]] — 使用像 COCO8-Pose 这样的微型数据集验证关键点逻辑的专门调试方法论。
- [[grayscale-object-detection]] — 在单通道强度图像上训练目标检测模型，以减少计算负载并测试颜色无关的鲁棒性。
- [[dynamic-channel-conversion]] — 在数据加载期间通过配置动态转换图像通道（如 RGB 到灰度）的技术。
- [[inference-benchmarks]] — 评估不同硬件平台上 AI 模型效率的标准化测试程序。
- [[inference-latency]] — 模型处理单个输入所需的时间，对实时应用至关重要。
- [[fps]] — 每秒帧数，衡量视频处理系统的吞吐量。
- [[npu-inference-acceleration]] — 利用神经处理单元提高 AI 任务效率的技术。
- [[automatic-data-splitting]] — 动态划分数据集而无需预定义拆分的框架机制（如 Caltech-256）。
- [[mlops-workflow]] — 连接 ML 模型创建和部署的实践，专注于可扩展性、管理和可重复性。
- [[remote-execution]] — 通过代理在不同机器上运行实验，重建环境，抽象 SSH 管理。
- [[dataset-versioning]] — 将数据集管理为独立于代码的版本化实体以确保可重复性。
- [[hyperparameter-optimization]] — 寻找最佳模型配置的算法和过程，通常由 MLOps 平台促进。
- [[resource-utilization-monitoring]] — 跟踪训练期间的 CPU、GPU 和内存使用情况，以进行成本优化和效率提升。
- [[template-task]] — 用作克隆和修改参数以进行 HPO 或远程排队的蓝图的记录实验。
- [[autoscaling-workers]] — 根据队列深度自动配置和取消配置云实例的机制。
- [[cloudflare-zero-trust]] — 验证每个请求的零信任网络架构，取代传统 VPN。
- [[ssh-proxy-command]] — 通过外部命令或隧道路由连接的 SSH 配置指令。
- [[windows-path-management]] — Windows 开发环境中处理文件路径和环境变量的最佳实践。
- [[mcp-protocol]] — 连接 AI 模型到外部数据源和工具的开放标准协议。
- [[mcp-first-principle]] — 在 AI 辅助开发中优先考虑 MCP 工具调用而非直接 Shell 脚本的架构决策。
- [[systematic-debugging]] — 形式化为 Codex 插件技能的结构化调试方法论。
- [[docker-deployment]] — 使用 Docker 容器标准化交付后端服务（如 AIClient2API）的部署方式。
- [[mcp-tool-ecosystem]] — 通过安装特定工具或转换协议增强 Codex 执行复杂任务能力的过程。
- [[hybrid-network-architecture]] — 采用多种网络技术（Cloudflared, EasyTier, 静态 IP）并存的混合网络架构。
- [[comet-yolo-integration]] — Native mechanism for automatic logging of YOLO training metrics and artifacts to Comet ML.
- [[offline-logging]] — MLOps pattern for persisting experiment data locally when network connectivity is unavailable.
- [[comet-artifacts]] — Data management feature for versioning datasets and models within Comet ML to ensure reproducibility.
- [[comet-optimizer]] — Specialized tool within Comet ML for automating hyperparameter sweeps and optimization.

## Sources

- [[2026-04-03-验收表单实现]] — 验收表单交互系统的详细计划。
- [[2026-04-04-矩阵工作台实现]] — 矩阵工作台的重构计划，包括 TDD 流程和新架构细节。
- [[ai-gym-reference]] — Ultralytics AI Gym 类的 API 参考，用于实时姿态检测。
- [[AI 陪伴型机器人]] — 具有触摸和语音交互的静态毛绒 AI 玩偶的 MVP 规划文档。
- [[AI 陪伴机器人需求文档_1]] — 两人 MVP 团队的详细需求规范，定义硬件限制和核心循环。
- [[api-keys]] — 关于创建和管理 Ultralytics 平台 API 密钥以实现安全自动化的文档。
- [[AWS 快速入门教程]] — 在 AWS 深度学习实例上设置 YOLOv5 的官方指南，涵盖 AMI 选择、Spot 实例和 SSH 工作流。
- [[Alienware 子服务器]] — 定义 Alienware 机器作为负载均衡和小规模视觉任务子服务器角色的文档。
- [[argoverse-dataset]] — 关于用于 3D 跟踪、运动预测和立体深度估计的 Argoverse 数据集的文档。
- [[axelera-platform]] — 关于将 Ultralytics YOLO 模型导出和部署到 Axelera AI Metis 硬件的指南。
- [[Azure ML 快速入门教程]] — 在 AzureML 上设置 YOLOv5 的指南，涵盖计算实例、Conda 环境和笔记本集成。
- [[BIM 算量系统]] — 关于将 2D CAD 图纸转换为材料列表的自动工程量计算系统的文档。
- [[BOT 排序跟踪]] — Ultralytics Bot SORT 跟踪器（BOTrack, BOTSORT, ReID, GMC）的 API 参考。
- [[cifar-10-dataset]] — CIFAR-10 基准数据集及其与 Ultralytics YOLO 一起使用的源摘要。
- [[基础跟踪]] — `ultralytics.trackers.basetrack` 模块的 API 参考，定义 `BaseTrack` 和 `TrackState`。
- [[增强]] — `ultralytics.data.augment` 的参考，详细介绍 Mosaic, MixUp 和其他增强类。
- [[coco-dataset]] — COCO 数据集的源摘要，涵盖其结构、与 YOLO 的使用以及评估指标。
- [[coco-dataset-1]] — COCO-Pose 子集的详细分解，包括 OKS 指标、数据集拆分和 YOLO26 训练示例。
- [[coco-dataset-2]] — COCO-Seg 扩展的源摘要，涵盖掩码注释、mAR 指标和 YOLO26-seg 训练。
- [[coco12-formats-dataset]] — COCO12-Formats 数据集的源摘要，涵盖其在 CI/CD 中的作用和特定格式的依赖项。
- [[coco128-seg-dataset-source]] — COCO128-Seg 数据集的官方 Ultralytics 文档，详细介绍其在管道健全性检查和马赛克增强中的使用。
- [[COCO128 数据集]] — COCO128 目标检测数据集的官方 Ultralytics 文档，详细介绍 YAML 配置和马赛克优势。
- [[COCO8 多光谱]] — 关于 COCO8-Multispectral 数据集的文档，涵盖合成光谱生成和多通道 TIFF 处理。
- [[coco8-pose-dataset-source]] — COCO8-Pose 数据集的官方 Ultralytics 文档，详细介绍其在姿态管道调试和马赛克中的使用。
- [[coco8-grayscale]] — 关于 COCO8-Grayscale 数据集的文档，涵盖动态通道转换和灰度管道验证。
- [[CPU-GPU-NPU 性能对比]] — 比较 YOLO12n 在 CPU、GPU 和 Intel NPU 上推理性能的基准数据。
- [[caltech256-dataset]] — Caltech-256 数据集的源摘要，涵盖其结构、缺乏预定义拆分以及与 YOLO 的使用。
- [[clearml-platform]] — 详细介绍 YOLO26 与 ClearML 集成的源，用于 MLOps、实验跟踪和远程执行。
- [[clearml-log-integration]] — 将 ClearML 与 YOLOv5 集成以进行实验跟踪、数据版本控制和远程执行的实用指南。
- [[Cloudflared 隧道]] — 在 Windows 上通过 Cloudflare Zero Trust 配置 cloudflared 以进行 SSH 访问的指南，包括路径故障排除。
- [[Codex-MCP 工具]] — LabPC 上 Codex CLI 的 MCP 工具和插件技能的配置记录。
- [[Codex 杂项任务]] — 从 106 个 Codex 会话中提取的杂项任务分类汇总，揭示 Codex 作为全能运维中心的应用场景。
- [[comet-ml-platform]] — Source detailing the native integration between Ultralytics YOLO models and the Comet ML experiment tracking platform.
- [[comet-log-integration]] — Comprehensive guide on integrating Comet ML with YOLOv5 for automated tracking, HPO, and dataset management.

## Queries

## Comparisons

## Synthesis

## Recent Overview Update
The wiki has been updated to include **Comet ML** as a primary MLOps tool. New entity **[[comet-ml-platform]]** documents the platform's capabilities, while **[[comet-yolo-integration]]** details the specific configuration for YOLO models. The concept of **[[offline-logging]]** has been added to address training in isolated environments. This expands the MLOps ecosystem alongside ClearML and Azure ML.