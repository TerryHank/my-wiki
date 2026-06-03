---
type: source
title: "Codex 杂项任务汇总"
created: 2026-05-30
updated: 2026-05-30
tags: [codex, 运维, 部署, 硬件]
related: [codex-cli, hermes-agent, docker-deployment, esp32-firmware, playwright-mcp, easytier, linorobot2]
sources: ["Codex 杂项任务.md", "Codex杂项任务.md"]
---
# Codex 杂项任务汇总

本文档是对 106 个 [[codex-cli]] 会话中提取的杂项任务的分类汇总。它揭示了 Codex 作为全能运维中心的实际应用场景，涵盖了从服务部署、硬件交互到网络配置和系统调试的广泛领域。

## 部署类任务
涉及多个工程项目的落地与容器化部署：
- **Hermes 工程**：部署 [[hermes-agent]] 相关服务。
- **OpenMythos**：部署名为 OpenMythos 的软件项目。
- **Linorobot2**：在特定 IP (`172.20.47.98`) 上部署机器人软件栈 [[linorobot2]]。
- **AIClient2API**：通过 Docker 容器部署后端 API 服务。
- **New-API**：另一个通过 Docker 部署的 API 服务项目。

## 硬件交互类任务
涉及底层硬件控制与传感器接入：
- **ESP32 固件**：修改固件以支持 UUID 二维码生成等特定功能，详见 [[esp32-firmware]]。
- **相机接入**：将 IP 为 `169.254.173.129` 的相机接入 OpenCV 进行视觉处理。
- **移动设备**：查询小米 8 手机版本号。
- **传感器融合**：结合单轮编码器与霍尔传感器进行 TCS（牵引力控制系统）相关开发。

## 工具链扩展类任务
旨在增强 Codex 及开发环境的能力：
- **Playwright MCP**：安装并配置 Playwright MCP 工具，赋予 Codex 浏览器自动化能力，详见 [[playwright-mcp]]。
- **MCP 转 CLI**：使用 `mcporter` 和 `mcp2cli` 工具将 MCP 协议转换为命令行接口。
- **文档工具**：安装 Pandoc 用于文档格式转换。
- **数据提取**：从特定环境中提取 `refresh_token`。
- **仿真数据**：解压 BikeSim  CAB 分卷压缩文件。

## 系统调试与维护类任务
反映开发环境的日常维护需求：
- **网络配置**：修复 [[easytier]] 开机启动被禁用的问题。
- **环境修复**：解决本地 Python 路径问题、微信无法打开等异常。
- **资源管理**：执行主机内存清理和磁盘空间排布优化。
- **会话管理**：处理 Codex 会话恢复失败的问题。

## 学习与探索类任务
- **TouchDesigner**：探索可视化编程工作流。
- **Cherry Studio**：评估本地版 AI 客户端。
- **效率工具**：对 "Happy" 效率软件进行改造研究。

## 关键发现
1. **Codex 的 DevOps 角色**：Codex 已超越代码辅助，成为执行全栈运维任务的核心接口。
2. **MCP 生态落地**：通过引入 Playwright 和协议转换工具，MCP 协议正从理论走向具体的工具链集成。
3. **网络拓扑复杂性**：存在多种网络方案（Cloudflared, EasyTier, 静态 IP 直连），暗示了复杂的混合网络架构。