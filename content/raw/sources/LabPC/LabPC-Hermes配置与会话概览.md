---
type: article
created_by: hermes-agent
date: 2026-06-01
tags: [LabPC, hermes, 会话, 配置]
---

# LabPC Hermes 配置与会话概览

## 机器信息

- IP: 10.0.0.2
- 用户: Virtual
- 系统: Windows
- SSH 密钥: ed25519

## Hermes 配置

### 核心设置

- **默认模型**: mimo-v2.5-pro (xiaomi provider: token-plan-cn.xiaomimimo.com)
- **备用模型**: Ollama (qwen36-35b 本地)
- **性格配置**: kawaii
- **语言**: zh (中文)
- **批准模式**: off (无权限提示)
- **压缩**: enabled, threshold 0.5, target 0.2
- **最大轮次**: 90
- **推理强度**: medium
- **最大输出 tokens**: 65536
- **工具集**: hermes-cli, web
- **记忆**: enabled, 2200 字符限制
- **委托**: orchestrator enabled, max 3 concurrent children

### 文件路径

- Hermes 数据目录: C:\Users\Virtual\AppData\Local\hermes\
- 会话目录: sessions/
- 记忆目录: memories/
- 技能目录: skills/
- 配置文件: config.yaml
- 历史文件: .hermes_history

## 会话统计

### 历史时间跨度

- 起始: 2026-05-28 05:48
- 结束: 2026-05-30 06:58
- 时长: 约 2 天

### 会话主题分类

#### A. 模型部署（主要线程）

- 用户想本地运行 Qwen3.6-35B uncensored 模型
- 尝试序列: Ollama -> vLLM -> llama.cpp -> Unsloth Studio -> 回到 Ollama（优化版）
- 测试模型: IQ2_M (量化过于激进), Q3_K_M, Q4_K_M, Q5_K_M, 12B 变体
- 最终配置:
  - 本地 RTX 4070 上运行 Ollama
  - 远程 10.0.0.102 (RTX 4090) 上运行 Unsloth Studio
- 关键经验:
  - IQ2_M 量化 Qwen3.6-35B 会产生空响应
  - Q4_K_M 工作正常
  - `--parallel 1` 单用户模式节省 ~1.5GB VRAM

#### B. BIM/CAD 算量

- 需求: 从 2D CAD/DWG 图纸自动提取材料数量
- 目标: 从工程图纸提取管道长度、线路等，用于采购
- 创建技能: bim-quantity-takeoff
- 流程: DWG->DXF->解析->拓扑->采购

#### C. 量体研究

- 数据集: Korean AIHUB (1337 个样本，包含手机照片 + 测量值)
- 模型: SMPL 身体模型, HMR2 形状估计
- 补充数据集: CAESAR, ANSUR II, MPII Human Shape
- 硬约束: 最大误差 < 2cm（当前最坏情况胸部 ~8.2cm）
- 探索方法: 校准因子方案
- 验证集: "本地量体" 数据集（最低优先级）

#### D. ROS2 机器人项目 (service_robot_cart_description)

- 硬件: 差分驱动机器人底盘，4 轮（track=0.82m, radius=0.16m）
- 系统: ROS2 Jazzy on WSL Ubuntu 24.04 (lab@wsl-ubuntu2404)
- 控制: cmd_vel 通过 diff_drive_controller 工作
- 传感器: Azure Kinect DK（仿真使用 Gazebo 插件，无需真实 SDK）
- 可视化:
  - WSLg 渲染问题
  - Foxglove (ws://172.25.191.70:8765) 替代 RViz
- 仿真环境: AWS Robomaker small house world
- 目标:
  - SLAM (slam_toolbox, ORB-SLAM3, RTAB-Map, 3D Gaussian Splatting)
  - 语义分割
  - 自主导航

#### E. Hermes Web UI

- 前端: hermes-web-ui npm package (端口 8648)
- 技术栈: Vue 3 + Socket.IO
- 源码: EKKOLearnAI/hermes-web-ui.git
- 部署路径: C:\Users\Virtual\AppData\Roaming\npm\node_modules\hermes-web-ui\
- 注意: 非内置 dashboard (端口 9119)

#### F. 网络基础设施

- EasyTier VPN 网状网络: tcp://134.175.238.239:11010, 网络名 "Robot"
- 主服务器: zhangwang@10.0.0.102 (Ubuntu 20.04, RTX 4090 24GB, 62GB RAM)
- 代理: 端口 7897, TUN 模式启用
- WSL IP: 172.25.191.70
- ROS_DOMAIN_ID: 42

## 技能列表

### 核心/定制技能

- **bim-quantity-takeoff**: DWG->DXF->拓扑->采购流水线（MEP/电气）
- **ros2-diff-drive-control**: ROS2 diff_drive_controller 设置模板
- **superpowers-zh**: 中文开发工作流（头脑风暴、调试、TDD、代码审查）
- **yuanbao**: 腾讯元宝集成定制技能

### 技能统计

- 总数: 36+ 自定义技能目录
- 主要领域: 机器人、BIM、中文开发

## 记忆内容

### MEMORY.md（基础设施/系统知识）

- C 盘已满，构建在 D/E 盘
- WinOpenSSH admin 密钥文件问题
- 服务器清单:
  - zhangwang@10.0.0.102 (RTX 4090)
  - P1000_Lab@192.168.31.206 (RTX 2080)
- hermes-web-ui 部署路径和缓存行为
- Kali WSL2 本地发行版 (user: terry), EXDEV 修复历史
- 代理/TUN/Foxglove WSL 连接详情
- Gazebo 资源路径, WSLg 相机限制

### USER.md（用户偏好）

- 未询问前不要自动配置 Ollama 为备用
- 偏好 mamba 而非 conda
- Agent 应该自行运行诊断，不要问用户
- 中文交流，直接行动风格
- 量体最大误差 < 2cm（硬约束）
- 偏好研究优先方式；不喜欢复杂性
- 偏好 Foxglove 而非 RViz
- 期望 Agent 在交付前测试命令

## 调试经验

### 关键经验

1. **量化问题**: Qwen3.6-35B 上 IQ2_M 量化 = 空响应（过于激进）
2. **SSH 密钥**: WinOpenSSH admin 组使用 ProgramData 密钥，非用户 .ssh
3. **WSLg**: pkill 可能意外杀死 GUI 进程
4. **VRAM 优化**: Ollama 中 `--parallel 1` 单用户模式节省 ~1.5GB VRAM
5. **Web UI 缓存**: hermes-web-ui 需要停止+启动（非重启）由于内存缓存
6. **EXDEV 错误**: NTFS/WSL 挂载点间符号链接失败；使用本地 WSL 路径
7. **Gazebo**: vcpkg 编译成功但 GUI 失败（protobuf 冲突）
8. **Foxglove**: foxglove_bridge 需要 ROS2 包安装
9. **WSLg 相机**: 限制为 1 个相机传感器（多线程 segfault）
10. **Git**: ROS 包需要 git core.autocrlf=false

### Kanban 数据库

- 状态: 存在 (106KB)
- 任务数: 0（任务可能已清空）

### Cron 任务

- 状态: 空（无计划任务）

## 会话转储

- 文件数: 17 个 JSON 文件
- 内容: API 请求/响应日志
- 主要会话: ROS2 机器人控制、Codex 线程延续、模型部署调试、量体校准

## 相关链接

- [[实体/LabPC/Virtual用户]]
- [[概念/LabPC/ROS2Jazzy]]
- [[概念/LabPC/Hermes配置]]
- [[原始资料/LabPC/Codex会话分析]]