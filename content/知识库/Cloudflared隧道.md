     1|---
     2|title: Cloudflared隧道
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, networking, ssh, security]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# cloudflared
    12|
    13|Cloudflare Zero Trust 隧道客户端，用于安全远程访问。
    14|
    15|## 安装信息
    16|- **路径**: ~/AppData/Local/hermes/bin/cloudflared.exe
    17|- **版本**: 2026.5.0
    18|- **已加入**: Windows 用户 PATH
    19|
    20|## SSH 配置
    21|```ssh-config
    22|Host cva
    23|  HostName ssh.cvalab.top
    24|  ProxyCommand C:/Users/TerryHank/AppData/Local/hermes/bin/cloudflared.exe access ssh --hostname %h
    25|```
    26|
    27|## 踩坑记录
    28|- **Windows SSH 路径**: 必须用 `C:/` 而不是 `/c/`（MSYS 路径不兼容 Windows SSH）
    29|- **PowerShell PATH**: `setx` 只影响新终端窗口，当前窗口需 `$env:Path += ";..."` 
    30|- **首次认证**: 需要浏览器 Cloudflare Access 登录
    31|- **Git-Bash vs PowerShell**: ProxyCommand 路径格式不同
    32|
    33|## 相关
    34|- [[SSH隧道]] — SSH 隧道技术
    35|- [[cm.inspiro.top域名]] — Cloudflare 保护的域名
    36|