---
type: entity
title: cloudflared
created: 2026-05-30
updated: 2026-05-30
tags: [tool, networking, cloudflare, security]
related: [cloudflare-zero-trust, ssh-proxy-command, ssh-tunneling]
sources: ["Cloudflared 隧道.md", "Cloudflared隧道.md"]
---
# cloudflared

`cloudflared` 是 Cloudflare Zero Trust 平台的命令行客户端工具。它主要用于在本地环境与 Cloudflare 网络之间建立安全隧道，支持 TCP 应用代理、SSH 访问以及内网穿透服务。

## 主要功能

*   **安全 SSH 访问**: 通过 `access ssh` 命令，允许用户在不暴露 SSH 端口（22）到公网的情况下，安全地连接到受 Cloudflare Zero Trust 保护的内部服务器。
*   **隧道代理**: 将本地服务通过 Cloudflare 全球网络暴露，或访问私有网络资源。
*   **身份验证代理**: 处理基于浏览器的 SSO 登录流程，验证用户身份后建立连接。

## Windows 环境配置要点

在 Windows 上使用 `cloudflared` 时需注意以下技术细节：

1.  **路径格式**: 在 SSH 配置文件 (`config`) 中引用 `cloudflared.exe` 时，必须使用 Windows 原生路径格式（例如 `C:/Users/Name/bin/cloudflared.exe`），**不可**使用 Git-Bash 的 MSYS 路径格式（例如 `/c/Users/Name/...`），否则 SSH 客户端无法找到可执行文件。
2.  **环境变量**: 若将 `cloudflared` 加入系统 PATH，使用 `setx` 命令后需重启终端才能生效。若需立即在当前 PowerShell 会话中使用，应执行 `$env:Path += ";<安装路径>"`。

## 典型用法

作为 SSH 的 `ProxyCommand` 使用：

```ssh-config
Host my-server
  HostName server.example.com
  ProxyCommand cloudflared.exe access ssh --hostname %h
```

首次连接时，工具会自动调用默认浏览器完成 Cloudflare Access 的身份验证。

## 相关

*   [[cloudflare-zero-trust]] — 后端零信任安全平台
*   [[ssh-proxy-command]] — SSH 代理命令机制
*   [[ssh-tunneling]] — SSH 隧道技术