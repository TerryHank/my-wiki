---
title: VESC电机驱动
created: 2026-05-30
updated: 2026-05-30
type: entity
tags: [硬件, 电机, 嵌入式, STM32]
sources: [本地 Codex 会话]
confidence: medium
---

# VESC/MKS 电机驱动

BLDC 电机控制器固件编译与配置。

## 平台
- STM32F4 + ChibiOS 3.0.5
- arm-none-eabi-gcc 交叉编译

## Codex 工作
- 固件编译（解决 Makefile 依赖问题）
- TCS 牵引力控制（单轮 + 霍尔传感器）
- 引脚定义查找
- Flash 大小修改（8MB → 16MB）

## 踩坑
- Windows CreateProcess 找不到 arm-none-eabi-gcc → 需要安装 GNU ARM 工具链并加入 PATH

## 相关
- [[电动车零部件]] — 电动车项目
