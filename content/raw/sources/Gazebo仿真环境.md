---
title: Gazebo仿真环境
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [仿真, ROS2, 机器人]
confidence: high
---

# Gazebo仿真环境

## 最终方案
WSL2 Gazebo + Foxglove 可视化

## 踩坑
- Windows 源码编译失败 (protobuf 冲突)
- WSLg 摄像头限制 (多线程 segfault)
- cmd_vel 不动 (话题名称不匹配)
- 方向反转 (URDF 关节方向)

## 相关
- [[ROS2机器人控制]] — ROS2 框架
- [[Foxglove可视化]] — 可视化工具
- [[服务机器人小车]] — 小车项目
