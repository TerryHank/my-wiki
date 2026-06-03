---
title: LabPC-Codex配置
created: 2026-05-30
updated: 2026-05-30
type: entity
tags: [工具, codex, ai, agent]
sources: [LabPC .codex/session_index.jsonl, logs_2.sqlite]
confidence: high
---

# LabPC Codex 配置 (完整版)

[[LabPC工作站]] 上的 OpenAI Codex CLI 完整使用记录。

## 数据源
- session_index.jsonl: **181 个会话**
- archived_sessions/: **171 个归档会话**
- logs_2.sqlite: **347MB** 日志数据库（50+ 线程）
- state_5.sqlite: 1.4MB 状态数据库
- goals_1.sqlite: 目标数据库

## 完整会话列表 (181 个)

### 自动化监控 (156 会话)
| 线程名 | 数量 | 时间 | 说明 |
|--------|------|------|------|
| Qmini 训练监视 | 102 | 04-09 ~ 04-17 | 每小时自动检查训练状态 |
| QminiFinal 自动监视 | 54 | 04-19 ~ 04-22 | 训练最终阶段监控 |

### 量体/CV 实验 (10 会话)
| 线程名 | 日期 | 说明 |
|--------|------|------|
| 强制删除韩国人测量数据 | 04-26 | 数据清理 |
| 开独立工作目录继续实验 | 04-27 | 实验隔离 |
| 对比 CNN 参数改动 | 05-05 | CNN vs MLP 对比 |
| CNN_Vs_MLP参数改进 | 05-05 | 模型改进 |
| 查看韩国数据集样本结构 | 05-11 | 数据集分析 |
| 替换韩国数据集人体标签 | 05-11 | 数据预处理 |
| 查找人体到服装标签字典 | 05-11 | 标签映射 |
| 完成training_0517需求 | 05-21 | 训练任务 |
| 查找原论文和字段定义 | 05-22 | 文献调研 |
| 浏览工程生成URDF | 05-01 | URDF 生成 |

### Gazebo/仿真 (4 会话)
| 线程名 | 日期 | 说明 |
|--------|------|------|
| 加入电机和舵机仿真 | 05-11 | Gazebo 仿真扩展 |
| Fix Gazebo launch issue | 05-13 | 启动问题修复 |
| 排查URDF差异并反推版本 | 05-04 | URDF 版本对比 |
| Fix isaaclab import error | 05-23 | Isaac Lab 调试 |

### MCP/工具 (3 会话)
| 线程名 | 日期 | 说明 |
|--------|------|------|
| 封装MinerU全局MCP转换PDF | 04-01 | PDF 转 Markdown |
| 接入 gdu MCP 工具 | 04-26 | 磁盘分析 MCP |
| 将结果写入ipynb | 05-02 | Jupyter 输出 |

### 系统调试 (5 会话)
| 线程名 | 日期 | 说明 |
|--------|------|------|
| 排查 SSH 连接超时 | 04-27 | 网络问题 |
| 排查电脑病毒 | 04-27 | 安全排查 |
| 排查火绒拦截原因 | 04-30 | 安全软件冲突 |
| 打开网页 | 05-13 | 浏览器操作 |
| 为D:\06 智能化做三维建模 | 05-24 | 3D 建模 |

### 其他 (3 会话)
| 线程名 | 日期 | 说明 |
|--------|------|------|
| 回应问候 | 05-01, 05-03 | 测试会话 |
| 继续工作 | 05-24 | 续接任务 |

## Codex 插件/技能 (20+)
- codex-primary-runtime, brainstorming, systematic-debugging
- test-driven-development, writing-plans, mcp-builder
- dispatching-parallel-agents, subagent-driven-development
- frontend-master, cv-paper-to-code, cv-pipeline-debugger
- context7, mineru_pdf_kb, skill-discovery

## AGENTS.md 配置要点
- 视 Codex 为"全能型工程师"
- MCP 优先于 CLI
- CV/ML 任务: 先理解论文 → context7 → cv-paper-to-code → cv-pipeline-debugger
- 前端任务: frontend-master + superpowers 流程
- MIMO 模型增强: 低随机性、任务表维护、真实 tool call

## SQLite 数据库
- logs_2.sqlite (347MB): 完整对话日志，50+ 线程
- state_5.sqlite (1.4MB): 会话状态
- goals_1.sqlite: 目标追踪
- sqlite/codex-dev.db: 开发数据库

## 相关
- [[LabPC工作站]] — 运行机器
- [[Qmini训练监视]] — 自动化监控详情
- [[人体量体模型]] — 训练任务
- [[Gazebo仿真环境]] — 仿真调试
- [[Codex-MCP工具]] — MCP 工具配置
