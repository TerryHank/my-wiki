---
type: source
title: Cloudflared 隧道配置与排错指南
created: 2026-05-30
updated: 2026-05-30
tags: [cloudflare, ssh, zero-trust, windows, networking]
related: [cloudflared, cloudflare-zero-trust, ssh-proxy-command, windows-path-management]
sources: ["Cloudflared 隧道.md", "Cloudflared隧道.md"]
authors: ["TerryHank"]
year: 2026
url: ""
venue: "Hermes session history"
---
# Cloudflared 隧道配置与排错指南

本文档记录了在 Windows 环境下使用 `cloudflared` 客户端配合 SSH `ProxyCommand` 访问受 Cloudflare Zero Trust 保护的内网服务器的完整流程与关键排错经验。

## 核心配置

通过 SSH 配置文件集成 `cloudflared`，实现无需开放公网端口的安全访问：

```ssh-config
Host cva
  HostName ssh.cvalab.top
  ProxyCommand C:/Users/TerryHank/AppData/Local/hermes/bin/cloudflared.exe access ssh --hostname %h
```

## 关键排错点 (Windows 环境)

1.  **路径格式兼容性**
    *   **问题**: Windows 原生 SSH 客户端不识别 Git-Bash/MSYS 风格的路径（如 `/c/Users/...`）。
    *   **解决**: `ProxyCommand` 中必须使用 Windows 原生路径格式（如 `C:/Users/...` 或 `C:\Users\...`）。

2.  **环境变量生效范围**
    *   **问题**: 使用 `setx` 命令添加 PATH 后，当前终端窗口无法立即识别新命令。
    *   **解决**: 当前窗口需使用 PowerShell 命令 `$env:Path += ";<新路径>"` 临时生效，或重启终端以应用 `setx` 的永久更改。

3.  **首次认证流程**
    *   **现象**: 首次连接时 SSH 会话会暂停并提示浏览器操作。
    *   **机制**: 系统自动打开浏览器进行 Cloudflare Access SSO 登录，验证通过后 SSH 隧道才会建立。

4.  **Shell 环境差异**
    *   Git-Bash 与 PowerShell 在处理路径变量和命令执行上下文时存在差异，配置时需明确当前使用的 Shell 环境。

## 相关资产

*   **目标主机**: `ssh.cvalab.top` (别名 `cva`)
*   **客户端路径**: `~/AppData/Local/hermes/bin/cloudflared.exe`