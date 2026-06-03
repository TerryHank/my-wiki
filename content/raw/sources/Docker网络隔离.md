---
title: Docker网络隔离
created: 2026-05-30
updated: 2026-05-30
type: concept
tags: [Docker, 网络, 部署]
confidence: high
---

# Docker网络隔离与踩坑

## 典型场景
重建容器后加入默认网络 → DNS 解析失败

## 修复
`docker network connect <network> <container>`

## 相关
- [[Kiro网关]] — 受影响服务
- [[Docker健康检查踩坑]] — 相关踩坑
