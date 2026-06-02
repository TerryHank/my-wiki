---
title: ROS2绑扎机器人
created: 2026-05-30
updated: 2026-05-30
type: entity
tags: [机器人, ROS2, SLAM, 视觉]
sources: [本地 Codex 会话]
confidence: high
---

# ROS2 绑扎机器人

自动化绑扎点检测与机器人控制。

## 远程服务器
- hyq-@192.168.6.99 (ROS Noetic)
- 工作目录: /home/hyq-/botvision_ws

## Codex 工作
- 工程模块化重构
- SLAM V30 交接包下载
- 绑扎点遍历方法打包
- Leo Rover 部署
- 无人车多机协同方案（PPT）
- Unitree 电机 SDK 部署（192.168.10.116）
- 关节 Homing 零点校准调试

## 关节 Homing 问题
```
error: Limit not found for stage1_crank_joint side=+1 within 12.0 output rad
```
→ 需要增加 --max-output-rad 参数

## 相关
- [[ROS2机器人控制]] — ROS2 基础
- [[SLAM自主导航]] — SLAM 技术
- [[Gazebo仿真环境]] — 仿真
