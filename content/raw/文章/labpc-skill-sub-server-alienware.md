** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: sub-server-alienware
description: 子服务器 Alienware Aurora R8 连接和管�?�?SSH/SCP 操作、远程诊断、任务调�?
---

# 子服务器：Alienware Aurora R8 (DESKTOP-ANAI92U)

## 基本信息
- IP: `192.168.31.206`
- SSH 用户: `P1000_Lab`
- SSH 认证: 公钥 `~/.ssh/id_ed25519` (对应公钥 ssh-ed25519 ...virtual@LabPC)
- 系统: Windows 11 专业�?Build 26200
- 机器: Alienware Aurora R8
- 用�? **小型视觉/模型训练子服务器**

## 硬件配置
| 组件 | 规格 |
|------|------|
| CPU | Intel Core i7-9700K @ 3.60GHz, 8�?线程 |
| 内存 | 16GB DDR4-2933 |
| GPU | NVIDIA GeForce RTX 2080 (4GB显存) |
| 系统�?| SK hynix 256GB NVMe (C: ~89GB剩余) |
| 数据�?| ST2000DM 2TB HDD (D: 572GB, E: 915GB, F: 227GB) |
| 网卡 | Killer Wireless-n/a/ac 1535 (Wi-Fi) |

## SSH 连接命令

```bash
# 基本连接
ssh -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206

# 执行远程命令
ssh -o ConnectTimeout=5 -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206 "命令"

# SCP 传输文件
scp -i ~/.ssh/id_ed25519 本地文件 P1000_Lab@192.168.31.206:/远程路径/
```

## 注意事项
- **ICMP ping 被防火墙拦截**，ping 不通不代表机器离线，直�?SSH 即可
- **wmic 已移�?*（Win11 26200），�?PowerShell `Get-CimInstance` 替代
- SSH 远程执行 PowerShell 时，`$_` 变量会被 SSH 吞掉，用单引号包裹外层或简化命�?
- **C 盘仅 89GB 剩余**，软件和数据�?D/E �?
- 大模型训练会吃紧�?6GB RAM + 4GB VRAM），适合小型视觉模型和推理任�?

## 常用远程诊断命令

```bash
# 系统概览
ssh -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206 "systeminfo | findstr /C:System /C:Total /C:Available"

# GPU 状态（需 nvidia-smi�?
ssh -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206 "nvidia-smi"

# 磁盘空间
ssh -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206 'powershell -Command "Get-CimInstance Win32_LogicalDisk | Select DeviceID,Size,FreeSpace | Format-Table -AutoSize"'

# 进程/负载
ssh -i ~/.ssh/id_ed25519 P1000_Lab@192.168.31.206 'powershell -Command "Get-Process | Sort CPU -Desc | Select -First 10 Name,CPU,WS | Format-Table"'
```

## 适用场景
- 小型视觉模型训练（YOLO, ResNet 等）
- 模型推理服务
- 数据预处理和标注辅助
- 不适合：大模型微调（VRAM/RAM 不足）、长时间重训练（WiFi 不稳定）