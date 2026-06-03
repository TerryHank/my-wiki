---
title: Codex网络调试经验
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [网络, 调试, SSH, 代理]
sources: [本地 Codex 会话]
confidence: high
---

# Codex 网络调试经验

从 Codex 会话中提取的网络问题与解决方案。

## SSH 连接问题
- ping 通但 SSH 超时 → 重连 WiFi 后恢复（路由表问题）
- SSH cva 失败 → 排查本地主机 192.168.10.118

## 代理配置
- v2rayN SOCKS 代理: 8.210.245.66:36060
- OpenVPN 私有局域网搭建（103.79.187.250）

## Docker 问题
- docker-compose up 失败 → Docker Desktop 未启动（npipe 连接失败）

## 路由器
- iStoreOS (192.168.100.1) — 5G 和 2.4G 热点不能同时开

## 相关
- [[SSH隧道]] — SSH 技术
- [[EasyTier组网]] — VPN 组网
