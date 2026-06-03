---
type: concept
title: SSH ProxyCommand
created: 2026-05-30
updated: 2026-05-30
tags: [ssh, networking, configuration, security]
related: [cloudflared, ssh-tunneling, bastion-host]
sources: ["Cloudflared 隧道.md", "Cloudflared隧道.md"]
---
# SSH ProxyCommand

`ProxyCommand` 是 SSH 配置文件中的一个指令，用于指定一个外部命令来建立与目标主机的网络连接。它允许 SSH 流量通过任意中间层（如代理服务器、隧道工具或跳板机）进行传输，而不是直接建立 TCP 连接。

## 工作原理

当 SSH 客户端发起连接时，它会执行 `ProxyCommand` 指定的命令，并将该命令的标准输入/输出（stdin/stdout）作为与目标服务器通信的通道。

## 典型应用场景

1.  **零信任网络访问**: 结合 [[cloudflared]] 使用，通过应用层隧道访问受保护的内网资源，无需暴露 SSH 端口。
    ```ssh-config
    ProxyCommand cloudflared.exe access ssh --hostname %h
    ```
2.  **跳板机 (Bastion Host)**: 通过一个中间服务器转发连接，用于隔离核心内网。
    ```ssh-config
    ProxyCommand ssh -W %h:%p user@bastion-host
    ```
3.  **SOCKS 代理**: 通过 SOCKS 代理服务器转发 SSH 流量。

## Windows 环境下的注意事项

在 Windows 系统中配置 `ProxyCommand` 时，路径格式是一个常见的陷阱：

*   **原生 SSH 客户端**: 必须使用 Windows 原生路径格式（如 `C:/Program Files/...` 或 `C:\Program Files\...`）。
*   **MSYS/Git-Bash 环境**: 虽然 Git-Bash 内部使用 `/c/Program Files/...` 格式，但原生的 Windows `ssh.exe` **不识别**这种 MSYS 路径转换。如果在 `~/.ssh/config` 中为原生 SSH 配置了 Git-Bash 风格的路径，会导致 "No such file or directory" 错误。

## 相关

*   [[cloudflared]] — 常用的 ProxyCommand 实现工具
*   [[ssh-tunneling]] — 隧道技术概念
*   [[windows-path-management]] — Windows 路径与环境变量管理