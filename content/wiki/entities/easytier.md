---
type: entity
title: EasyTier
created: 2026-05-30
updated: 2026-05-30
tags: [网络，组网，运维]
related: [cloudflared, codex-cli]
sources: ["Codex 杂项任务.md", "Codex杂项任务.md"]
---
# EasyTier

**EasyTier** 是一款网络组网工具，用于构建虚拟局域网或实现内网穿透。

## 运维记录
- **开机启动问题**：曾出现开机启动项被禁用的情况，需通过 [[codex-cli]] 进行修复和配置。
- **网络拓扑**：与 [[cloudflared]] (Zero Trust 隧道) 共存于当前基础设施中。

## 使用场景推测
- 可能用于连接分散的实验节点（如特定 IP 的机器人或相机）。
- 与 Cloudflared 形成互补或冗余，需明确两者的路由优先级和使用边界（如：局域网组网 vs. 广域网穿透）。