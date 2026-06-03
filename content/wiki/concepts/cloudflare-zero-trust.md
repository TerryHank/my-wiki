---
type: concept
title: Cloudflare Zero Trust
created: 2026-05-30
updated: 2026-05-30
tags: [security, networking, zero-trust, cloud-service]
related: [cloudflared, ssh-proxy-command, least-privilege-principle]
sources: ["Cloudflared 隧道.md", "Cloudflared隧道.md"]
---
# Cloudflare Zero Trust

Cloudflare Zero Trust 是一种现代网络安全架构，旨在取代传统的基于边界（如防火墙和 VPN）的安全模型。其核心理念是“永不信任，始终验证”，即不默认信任网络内部或外部的任何流量，所有访问请求都必须经过严格的身份验证和授权。

## 核心机制

*   **身份为中心**: 访问控制基于用户身份和设备状态，而非 IP 地址。
*   **应用层隔离**: 通过 [[cloudflared]] 等组件，将应用（如 SSH、Web 服务）隐藏在 Cloudflare 网络之后，无需向公网开放端口。
*   **浏览器身份验证**: 对于交互式会话，支持通过浏览器重定向进行 SSO（单点登录）或多因素认证（MFA），验证通过后建立加密隧道。

## 与传统 VPN 的区别

| 特性 | 传统 VPN | Cloudflare Zero Trust |
| :--- | :--- | :--- |
| **信任模型** | 连接即信任（一旦连入内网，可访问所有资源） | 零信任（每次访问特定应用都需验证） |
| **网络暴露** | 需开放 VPN 端口，存在被扫描风险 | 无需开放入站端口，应用完全隐藏 |
| **访问粒度** | 粗粒度（通常按网段控制） | 细粒度（按具体应用、URL 或主机控制） |
| **客户端** | 专用 VPN 客户端，接管路由 | 轻量级代理 (如 cloudflared)，仅代理特定流量 |

## 在 SSH 场景中的应用

通过配置 SSH 的 [[ssh-proxy-command]]，利用 `cloudflared` 作为跳板，用户可以在本地直接输入 `ssh user@host`，底层流量会自动经过 Cloudflare 的身份验证网关。这种方式既保留了 SSH 的原生体验，又获得了零信任架构的安全性。

## 相关

*   [[cloudflared]] — 实现该架构的客户端工具
*   [[least-privilege-principle]] — 最小权限原则，零信任的基础
*   [[ssh-proxy-command]] — 技术实现手段