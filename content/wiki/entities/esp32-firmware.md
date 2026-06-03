---
type: entity
title: ESP32 固件定制
created: 2026-05-30
updated: 2026-05-30
tags: [嵌入式，固件，硬件]
related: [codex-cli, ai-companion-robot-mvp]
sources: ["Codex 杂项任务.md", "Codex杂项任务.md"]
---
# ESP32 固件定制

针对 **ESP32** 微控制器的固件修改工作，旨在支持特定的硬件功能需求。

## 主要修改内容
- **UUID 二维码生成**：修改固件逻辑，使设备能够生成或展示包含唯一标识符（UUID）的二维码，用于设备配对或身份识别。
- **传感器集成**：涉及单轮编码器与霍尔传感器的数据融合（TCS 相关），用于运动控制。

## 工作流
- 通过 [[codex-cli]] 调用编译工具链和烧录工具完成固件更新。
- 此工作流直接支持 [[ai-companion-robot-mvp]] 等硬件项目的底层开发。