---
type: article
created_by: hermes-agent
date: 2026-06-01
tags: [LabPC, ROS2, 机器人, Gazebo, Foxglove]
---

# LabPC ROS2 机器人项目

## 项目概述

**项目名称**: service_robot_cart_description

**目标**: 差分驱动机器人底盘 + SLAM + 语义分割 + 自主导航

## 硬件规格

### 机器人底盘

- 类型: 差分驱动
- 车轮数量: 4 个
- 轮距 (track): 0.82m
- 车轮半径 (radius): 0.16m

### 传感器

- 相机: Azure Kinect DK
- **仿真**: 使用 Gazebo 插件（无需真实 SDK）
- **真实**: 需要 Azure Kinect SDK

## 软件栈

### 系统

- 操作系统: Ubuntu 24.04 (WSL2)
- 用户: lab@wsl-ubuntu2404
- ROS 版本: ROS2 Jazzy
- ROS 域 ID: ROS_DOMAIN_ID=42

### WSL 配置

- WSL IP: 172.25.191.70
- GUI: WSLg (有问题，见调试经验)

### 控制

- 控制器: diff_drive_controller
- 话题: cmd_vel

## 可视化方案

### RViz (传统)

**状态**: WSLg 渲染问题，不推荐

### Foxglove (推荐)

**WebSocket**: ws://172.25.191.70:8765

**优势**:
- 网页端可视化
- 更好的 WSL 兼容性
- 用户偏好选择

**要求**:
- 安装 foxglove_bridge ROS2 包

## 仿真环境

### Gazebo 世界

- 来源: AWS Robomaker small house world
- 集成: 已集成到项目中

### WSLg 限制

**问题**: WSLg pkill 可能意外杀死 GUI 进程

**相机限制**: 仅支持 1 个相机传感器（多线程会 segfault）

### Gazebo 调试经验

**编译问题**:
- vcpkg 编译成功
- GUI 启动失败
- 原因: protobuf 冲突

**资源路径**: Gazebo 资源路径配置需要注意

## SLAM 方案

### 待测试方案

1. **slam_toolbox**
   - 2D 激光 SLAM
   - ROS2 原生支持

2. **ORB-SLAM3**
   - 视觉 SLAM
   - 相机传感器

3. **RTAB-Map**
   - RGB-D SLAM
   - 3D 地图构建

4. **3D Gaussian Splatting**
   - 实时 3D 渲染
   - 新兴技术

## 开发环境

### Git 配置

**关键设置**:
```bash
git config core.autocrlf false
```

**原因**: ROS 包需要保留 Unix 行结束符

### WSL 路径问题

**EXDEV 错误**:
- 问题: NTFS/WSL 挂载点间符号链接失败
- 解决: 使用本地 WSL 路径

## 网络配置

### VPN 网状网络

- 协议: EasyTier
- 服务器: tcp://134.175.238.239:11010
- 网络名: "Robot"

### 服务器资源

| 服务器 | IP | GPU | RAM | 用途 |
|--------|-------|------|------|------|
| zhangwang | 10.0.0.102 | RTX 4090 24GB | 62GB | 训练/推理 |
| P1000_Lab | 192.168.31.206 | RTX 2080 | - | 备用 |

### 代理配置

- 端口: 7897
- TUN 模式: 已启用

## 项目目录结构

**预期结构**:
```
service_robot_cart_description/
├── launch/          # 启动文件
├── config/          # 配置文件
├── urdf/            # 机器人描述
├── worlds/          # Gazebo 世界
└── scripts/         # 节点脚本
```

## 调试经验汇总

### 1. Foxglove 设置

**要求**: foxglove_bridge ROS2 包

**用户偏好**: Foxglove > RViz

### 2. Git 配置

**必须**: core.autocrlf=false

**原因**: ROS 包兼容性

### 3. WSLg 限制

- 相机: 最多 1 个传感器
- 进程管理: pkill 危险

### 4. Gazebo

- 编译成功 != GUI 成功
- protobuf 冲突常见

### 5. 路径问题

- NTFS/WSL 符号链接失败
- 使用本地 WSL 路径

## 相关链接

- [[实体/LabPC/Virtual用户]]
- [[概念/LabPC/ROS2Jazzy]]
- [[概念/LabPC/SLAM方案]]
- [[原始资料/LabPC/LabPC-Hermes配置与会话概览]]