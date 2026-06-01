---
type: entity
created_by: hermes-agent
date: 2026-06-01
tags: [LabPC, 用户, Hermes]
---

# Virtual 用户 (LabPC)

## 基本信息

- **用户名**: Virtual
- **机器**: LabPC (10.0.0.2)
- **系统**: Windows
- **SSH 认证**: ed25519 密钥

## Hermes 配置

### 模型配置

- **主模型**: mimo-v2.5-pro (xiaomi provider)
- **备用模型**: Ollama (qwen36-35b 本地)
- **语言**: zh (中文)

### 行为配置

- **性格**: kawaii
- **批准模式**: off（无需确认）
- **压缩**: enabled (threshold 0.5, target 0.2)
- **最大轮次**: 90
- **推理强度**: medium

## 用户偏好

### 工作风格

- **语言**: 中文交流
- **行动方式**: 直接行动，不问问题
- **诊断**: Agent 自行诊断，不问用户
- **研究**: 偏好研究优先方式
- **复杂性**: 不喜欢复杂性

### 开发偏好

- **包管理**: 偏好 mamba 而非 conda
- **测试**: 交付前必须测试命令
- **确认**: 不自动配置 Ollama 为备用（需询问）

### 项目特定

- **ROS2 可视化**: 偏好 Foxglove 而非 RViz
- **量体精度**: 最大误差 < 2cm（硬约束）

## 项目参与

### 1. 模型部署

- 探索多种方案（Ollama、vLLM、llama.cpp、Unsloth）
- 测试量化方案（IQ2_M、Q3_K_M、Q4_K_M、Q5_K_M）
- 最终配置: Ollama (本地) + Unsloth Studio (远程)

### 2. ROS2 机器人

- 差分驱动机器人底盘项目
- SLAM 方案探索
- Gazebo 仿真

### 3. 量体研究

- Korean AIHUB 数据集处理
- SMPL/HMR2 模型使用
- 精度优化（目标 < 2cm）

### 4. BIM 算量

- DWG/DXF 解析
- 材料数量提取

## 调试经验积累

### 系统配置

- WinOpenSSH admin 密钥文件路径问题
- C 盘空间管理（构建在 D/E 盘）
- Git core.autocrlf=false 配置

### 开发环境

- WSLg 相机限制（1 个传感器）
- EXDEV 错误（NTFS/WSL 符号链接）
- Gazebo protobuf 冲突

### 模型部署

- IQ2_M 量化过于激进（空响应）
- Ollama --parallel 1 节省 VRAM

### Hermes 使用

- hermes-web-ui 缓存行为
- Gateway 必须运行

## 技能创建

### 自定义技能

1. **bim-quantity-takeoff**: DWG→DXF→拓扑→采购
2. **ros2-diff-drive-control**: ROS2 控制器模板
3. **superpowers-zh**: 中文开发工作流

## 网络资源

### VPN

- EasyTier 网状网络
- 服务器: tcp://134.175.238.239:11010
- 网络名: "Robot"

### 服务器

| 服务器 | IP | GPU | RAM | 用户 |
|--------|-------|------|------|------|
| 主服务器 | 10.0.0.102 | RTX 4090 24GB | 62GB | zhangwang |
| 备用 | 192.168.31.206 | RTX 2080 | - | P1000_Lab |

### 代理

- 端口: 7897
- TUN 模式: 已启用

## 会话统计

### 时间跨度

- 起始: 2026-05-28 05:48
- 结束: 2026-05-30 06:58
- 时长: 约 2 天

### 主题分布

- 模型部署: ~50%
- 量体研究: ~20%
- ROS2 机器人: ~15%
- BIM 算量: ~10%
- 其他: ~5%

## 相关链接

- [[实体/LabPC/服务器资源]]
- [[概念/LabPC/Hermes配置]]
- [[原始资料/LabPC/LabPC-Hermes配置与会话概览]]