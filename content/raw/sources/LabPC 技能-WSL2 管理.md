---
name: wsl2-management
description: WSL2 诊断、维护和发行版迁移。覆盖：I/O 错误排查、磁盘健康检查、发行版在盘间迁移、默认用户恢复、WSL 网络问题。
trigger:
  - WSL2 出现 Input/output error 或文件系统异常
  - 需要将 WSL 发行版从一个盘迁移到另一个盘
  - WSL2 发行版管理（列表、注销、导入、导出）
  - WSL2 默认用户丢失或变成 root
  - WSL 中长时间运行的 apt 安装需要监控
  - WSL 内程序报 `Invalid cross-device link` (EXDEV) 或 symlink 到 /mnt/c/ 的文件写入失败
---

# WSL2 管理

## Reference Files

- `references/wsl-output-encoding.md` — UTF-16LE 输出编码问题的完整解决方案
- `references/wsl-long-operations.md` — nohup 后台安装 + 文件监控模式
- `references/kali-full-install.md` — kali-linux-everything 全量安装经验（阶段、大包卡顿点、工具清单）
- `references/hermes-config-editing.md` — hermes config.yaml 结构（三处 context_length）、安全编辑方法、yaml.dump 限制

## 诊断：I/O 错误排查

当 WSL2 内部出现 `Input/output error`（如 `/usr/bin/sed`、`/etc/machine-id` 不可读），按以下顺序排查：

```bash
# 1. 检查根分区是否变成只读
mount | grep '/ '

# 2. 磁盘空间
df -h

# 3. 内核磁盘错误（最关键）
dmesg | tail -80

# 4. 文件系统状态
sudo tune2fs -l /dev/sdX | grep -i "error\|state\|check"

# 5. lsblk 查看所有块设备
lsblk -f
```

**常见结论：** WSL2 的 I/O 错误大多是**暂时性**的，原因包括：
- Windows 内存压力导致 WSL2 虚拟磁盘访问超时
- WSL2 休眠/恢复后 virtio 传输层断连
- Windows 休眠后唤醒

**验证方法：** 如果 `mount` 显示根分区为 `rw`、`tune2fs` 显示 `Filesystem state: clean`、`dmesg` 无磁盘 I/O 错误，则问题已自愈，`wsl --shutdown` 后重启即可。

## 迁移发行版到另一个盘

标准流程（以从 C 盘迁移到 E 盘为例）：

```powershell
# 1. 关闭所有 WSL 实例
wsl --shutdown

# 2. 导出发行版到临时 tar（放在目标盘上避免跨盘拷贝）
wsl --export <发行版名> E:\wsl-migrate\backup.tar

# 3. 注销旧发行版（会删除 C 盘的 vhdx）
wsl --unregister <发行版名>

# 4. 导入到新位置（--version 2 确保 WSL2）
wsl --import <发行版名> E:\WSL\<发行版名> E:\wsl-migrate\backup.tar --version 2

# 5. 清理临时文件
del E:\wsl-migrate\backup.tar
```

### 查看所有发行版

```powershell
wsl -l -v
```

> ⚠️ git-bash 中 `wsl -l` 输出是 UTF-16LE 编码，显示为乱码。用 `cmd.exe /c "wsl -l -v"` 或 PowerShell 获取正常输出。

### 查找发行版 vhdx 的 Windows 路径

```bash
find /c/Users/<用户名>/AppData/Local/Packages -name "ext4.vhdx" 2>/dev/null
```

## 迁移后必须修复：默认用户

`wsl --import` 导入的发行版**默认用户会变成 root**。修复方法：

```bash
# 在 WSL 内部以 root 身份写入 wsl.conf
wsl -d <发行版名> -u root -- bash -c 'printf "[user]\ndefault=<用户名>\n" >> /etc/wsl.conf'
```

然后 `wsl --shutdown` 重启生效。

## 验证迁移成功

```bash
# 启动并验证
wsl -d <发行版名> -- whoami
wsl -d <发行版名> -- df -h /

# 确认旧位置已删除
ls /c/Users/<用户名>/AppData/Local/Packages/<旧包名>/LocalState/
```

## Pitfalls

1. **导出的 tar 放在哪里** — 放在目标盘（如 E:\）而非源盘（C:\），避免跨盘大文件拷贝
2. **C 盘空间不足** — 如果 C 盘剩余空间小于发行版大小，导出前先清理或直接用 `wsl --export ... | wsl --import ...` 管道（但不推荐，中间失败会丢数据）
3. **SSH 服务需要重启** — 迁移后 `wsl --shutdown` 会导致 SSH 服务停止，需要重新启动 WSL 实例并等待 sshd 恢复
4. **网络配置可能变化** — WSL2 的 IP 每次启动都会变，如果有依赖固定 IP 的配置需要更新
5. **UTF-16LE 输出** — git-bash 中所有 `wsl` 命令输出都是 UTF-16LE，需要特殊处理（详见 `references/wsl-output-encoding.md`）
6. **长时间操作用 `wsl -d` 而非 SSH** — SSH 连接会超时断开，用 `wsl -d <发行版> -u root -- bash -c '...'` 更稳定
7. **大型安装监控模式** — 后台 nohup 运行 + 写文件到 `/mnt/c/Users/...` + 从 Windows 侧读取进度（详见 `references/wsl-long-operations.md`）
8. **Kali 元包中断后状态** — `apt install kali-linux-everything` 被中断后重跑，依赖包可能已装好但元包本身未标记为 `ii`。`apt-get check` 无 broken packages 即可，不影响工具使用（详见 `references/kali-full-install.md`）
9. **`source setup.bash` 通过 `wsl -d ... -- bash -c` 静默失败** — `BASH_SOURCE` 在非交互式 shell 上下文中无法正确解析，导致 ROS2/catkin 的 `setup.bash`（内部依赖 `$(dirname "${BASH_SOURCE[0]}")`）找不到自身路径，环境变量（`ROS_DISTRO`、`AMENT_PREFIX_PATH`、`PATH`）全部为空。`source` 命令不报错但什么都不做。**修复**：写脚本到磁盘再执行，不要用 `bash -c 'source ... && ...'` 一行式：
   ```bash
   # 正确做法
   write_file(path='C:/Users/Virtual/tmp_script.sh', content='#!/bin/bash\nsource /opt/ros/jazzy/setup.bash\n...')
   wsl -d Ubuntu-24.04 -- bash -c 'cp /mnt/c/Users/Virtual/tmp_script.sh /tmp/s.sh && chmod +x /tmp/s.sh && /tmp/s.sh'
   ```
10. **Symlink 跨文件系统 → `os.replace()` 报 `EXDEV` (Invalid cross-device link)** — 当 WSL 内的 `~/.hermes/` 文件（如 `auth.json`、`.env`）是指向 `/mnt/c/Users/...` 的 symlink 时，Hermes 的 `atomic_json_write()` 用 `tempfile.mkstemp()` 在 symlink 所在目录（Linux 文件系统）创建临时文件，然后 `os.replace()` 到 symlink 解析后的真实路径（Windows 文件系统 /mnt/c/），跨文件系统失败报 `Invalid cross-device link`。**修复**：去掉 symlink，改为本地普通文件：`cp` 内容 → `rm` symlink → `cp` 回去。**检查命令**：`find ~/.hermes/ -maxdepth 1 -type l -ls`。
12. **`sed` 替换 hermes config.yaml 的字段会命中多处** — `context_length` 等字段在配置中出现多次（`model.context_length`、`custom_providers[].context_length`、`custom_providers[].models.*.context_length`），每个应独立设置。`sed -i "s/context_length: 131072/context_length: 262144/g"` 会把 custom_providers（如 unsloth-studio 的 qwen3.6）也改掉。**修复**：用 Python `yaml` 模块精确修改目标字段：
   ```python
   import yaml
   c = yaml.safe_load(open("~/.hermes/config.yaml"))
   c["model"]["context_length"] = 262144  # 只改主模型
   for cp in c.get("custom_providers", []):
       cp["context_length"] = 131072  # 保持 custom provider 不变
       for m in cp.get("models", {}).values():
           if isinstance(m, dict): m["context_length"] = 131072
   yaml.dump(c, open("~/.hermes/config.yaml","w"), default_flow_style=False, allow_unicode=True, sort_keys=False)
   ```
   **关键**：`yaml.dump` 会丢失 YAML 注释（`#` 开头的行）。如果配置文件有重要注释，需要手动恢复或改用 `ruamel.yaml`（round-trip 保留注释）。参考 `references/hermes-config-editing.md`。
13. **Hermes terminal 自动脱敏 API key** — 在终端输出中，hermes 会自动将 API key 脱敏为 `sk-xxx...xxx` 形式。不能通过 `grep api_key config.yaml` 提取真实 key 再用 curl 调用外部 API。**替代方案**：在 WSL 内用 Python 读取 config 并直接发请求（但要注意 WSL 编码问题），或从 hermes 内部调用工具而非外部 curl。

14. **WSLg 默认用 CPU 软渲染（llvmpipe），不用 GPU** — `glxinfo | grep "OpenGL renderer"` 显示 `llvmpipe (LLVM ...)` 而非 `D3D12 (NVIDIA ...)`。Mesa d3d12 驱动已安装（`/usr/lib/x86_64-linux-gnu/dri/d3d12_dri.so` 存在）但未被自动选中。**修复**：在 `~/.bashrc` 添加：
    ```bash
    export MESA_D3D12_DEFAULT_ADAPTER_NAME="NVIDIA"
    export GALLIUM_DRIVER=d3d12
    ```
    验证：`glxinfo | grep "OpenGL renderer"` 应显示 `D3D12 (NVIDIA GeForce RTX 4070)`。**注意**：系统有多个虚拟显示器适配器（GameViewer、Parsec、OrayIddDriver、Honor）时，`MESA_D3D12_DEFAULT_ADAPTER_NAME` 必须精确匹配 NVIDIA 适配器名称。

    **⚠️ 重要：D3D12 GPU 渲染可能比 CPU 软渲染更慢！** WSLg 的 GPU 路径有翻译层开销：`OpenGL → Mesa d3d12 → D3D12 API → Windows 驱动 → 显卡`。对于简单 3D 场景（如 Gazebo 机器人仿真），翻译层开销 > GPU 加速收益，llvmpipe CPU 渲染反而更快。实测 RTX 4070 上 Gazebo 用 D3D12 比 llvmpipe 卡得多。**建议**：先用默认 llvmpipe，如果太卡再试 `--headless-rendering`（也是 CPU 渲染但跳过部分初始化），最后才试 d3d12 GPU。

15. **Heredoc 中 `${VAR}` 即使使用引号定界符也会被展开** — `wsl -d ... -- bash -c 'cat > f << "EOF" ${VAR} EOF'` 会将 `${VAR}` 展开为空字符串。原因是 `wsl --` 的命令传递层在 `bash -c` 之前就处理了变量。**修复**：用 `write_file()` 写到 `C:/Users/Virtual/...`，再 `cp /mnt/c/...` 到 WSL 内部。

16. **`pkill -f` 会误杀 WSLg compositor** — `pkill -9 -f "ros2"` 会匹配到 WSLg 的 weston、Xwayland、pulseaudio 等进程（进程命令行可能包含 ros 相关路径），导致所有 GUI 窗口消失、X11 连接断开。**修复**：`wsl --shutdown` 重启 WSL。**预防**：用精确匹配杀进程——`pkill -9 -f "ros2 launch"`, `pkill -9 -f "gz sim -r"`, `pkill -9 -f robot_state_publisher`，不要用宽泛的 `pkill -f ros2` 或 `pkill -f gz`。

17. **WSL2 端口转发不稳定** — WSL 内监听 `0.0.0.0:port` 的服务，从 Windows 用 `localhost:port` 访问可能不通。用 WSL IP 代替：`ws://172.25.191.70:8765`。验证：`powershell -Command "Test-NetConnection -ComputerName 172.25.191.70 -Port 8765"`。

## 长时间运行操作

SSH 对长时间命令（如 `apt install kali-linux-everything`）会超时。正确做法：

```bash
# 1. 后台启动安装
wsl -d kali-linux -u root -- bash -c 'nohup bash -c "DEBIAN_FRONTEND=noninteractive apt install -y kali-linux-everything >>/var/log/install.log 2>&1" &>/dev/null &'

# 2. 通过写文件到 Windows 侧来监控进度（避免 UTF-16LE 解析问题）
wsl -d kali-linux -u root -- bash -c 'dpkg -l | grep "^ii" | wc -l > /mnt/c/Users/Virtual/stats.txt; df -h / | tail -1 >> /mnt/c/Users/Virtual/stats.txt; ps aux | grep -cE "[d]pkg|[a]pt" >> /mnt/c/Users/Virtual/stats.txt'

# 3. 从 Windows 侧读取（干净的 UTF-8）
cat /c/Users/Virtual/stats.txt
```