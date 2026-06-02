---
name: gazebo-harmonic-windows
description: Windows 上安装运行 Gazebo Harmonic 的完整指南。覆盖三种方案（conda/vcpkg/源码）全部失败的原因、WSLg 替代方案、Foxglove Web 可视化、GPU 加速配置。
trigger:
  - 需要在 Windows 上运行 Gazebo
  - gz sim 版本问题
  - WSLg Gazebo GUI 配置
  - Foxglove bridge 配置
---

# Gazebo Harmonic on Windows

## 结论：三种方案全失败，用 WSLg

| 方案 | 状态 | 问题 |
|------|------|------|
| conda-forge 预编译包 | ❌ | CRLF 损坏 gz_desc + MSVCP140 版本不匹配 + cmdgui8.rb 缺失 |
| vcpkg 源码编译 | ❌ | DLL 可加载(v9.5.0)，Qt5 QML 模块路径不兼容，GUI 无法初始化 |
| 源码编译(colcon) | ❌ | protobuf 描述文件格式不兼容 |

## WSLg 方案（推荐）

### 启动命令
```bash
# 终端1: Gazebo GUI + ROS2 控制器
ros2 launch service_robot_cart_description gz_foxglove.launch.py

# 终端2: 控制小车
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -r /cmd_vel:=/cmd_vel
```

**WSLg GPU 加速**：默认用 llvmpipe（CPU 软渲染）。D3D12 翻译层（OpenGL→D3D12→Windows驱动）在简单场景下**反而更慢**（翻译开销 > GPU 加速收益）。大场景可尝试 `MESA_D3D12_DEFAULT_ADAPTER_NAME="NVIDIA"` + `GALLIUM_DRIVER=d3d12`，但实测 68 模型小屋场景仍比 CPU 软渲染慢。推荐默认 llvmpipe + `--headless-rendering`。

```bash
# 强制 GPU（大场景可能更快，简单场景更慢）
export MESA_D3D12_DEFAULT_ADAPTER_NAME="NVIDIA"
export GALLIUM_DRIVER=d3d12

# CPU 软渲染（简单场景更快，推荐默认）
gz sim -r empty.sdf --headless-rendering
```

### ⚠️ pkill 会误杀 WSLg
```bash
# ✗ 危险：会杀掉 weston/Xwayland/pulseaudio
pkill -9 -f ros2
pkill -9 -f "gz sim"

# ✓ 安全：精确匹配
pkill -9 -f "gz sim -r"
pkill -9 -f "ros2 launch"
pkill -9 -f robot_state_publisher
pkill -9 -f twist_bridge
```

WSLg 被杀后需要 `wsl --shutdown` 重启。

## Foxglove Web 可视化

Foxglove bridge 在 WSL 里运行，Windows 浏览器通过 WSL IP 连接：
- 连接地址：`ws://172.25.191.70:8765`（不是 localhost！端口转发不稳定）
- exe 名：`foxglove_bridge`（不是 foxglove_bridge_node）
- systemd 自启：`~/.config/systemd/user/foxglove-bridge.service`
- 必须设置 `Environment=ROS_DOMAIN_ID=42`
- launch 文件用 `additional_env={"ROS_DOMAIN_ID": domain}` 传递 domain
- Foxglove 只能看 ROS 话题数据，**看不到 Gazebo 渲染的 3D 场景**

### 排查 Foxglove 连不上
1. 检查端口：`ss -tlnp | grep 8765`
2. 检查进程环境：`cat /proc/PID/environ | tr '\0' '\n' | grep ROS_DOMAIN`
3. Windows 测试：`powershell -Command "Test-NetConnection -ComputerName 172.25.191.70 -Port 8765"`
4. 如果 domain 不对：`systemctl --user restart foxglove-bridge.service`

## Jazzy diff_drive 关键变化

ROS2 Jazzy 的 diff_drive_controller **默认期望 TwistStamped**，`use_stamped_vel: false` 已废弃。

需要 twist_bridge.py 将 Twist 转为 TwistStamped。见 `templates/twist_bridge.py`。

### 排查速度命令不执行
1. 检查 twist_bridge 是否在运行：`ros2 node list | grep twist`
2. 检查话题类型：`ros2 topic info /diff_drive_controller/cmd_vel` → 应为 TwistStamped
3. 直接测试：`ros2 topic pub --once /diff_drive_controller/cmd_vel geometry_msgs/msg/TwistStamped "{twist: {linear: {x: 1.0}}}"`
4. 检查 odom：`ros2 topic echo /diff_drive_controller/odom --once`

### CMakeLists.txt 安装路径
```cmake
# ✗ 错误：launch 文件会装到 share/launch/ 而非 share/${PROJECT_NAME}/launch/
install(DIRECTORY launch DESTINATION share/)
install(PROGRAMS scripts/twist_bridge.py DESTINATION lib/)

# ✓ 正确
install(DIRECTORY launch DESTINATION share/${PROJECT_NAME})
install(PROGRAMS scripts/twist_bridge.py DESTINATION lib/${PROJECT_NAME})
```

**改源码后必须清理重编**（否则安装目录保留旧文件）：
```bash
rm -rf build/pkg install/pkg && colcon build --packages-select pkg
```

## Azure Kinect DK 仿真（不需要实体机/SDK）

在 URDF 里直接加 Gazebo 相机传感器插件即可。见 `templates/azure_kinect_sim.xacro`。

添加步骤（模板见 `templates/azure_kinect_sim.xacro`）：
1. 复制模板到 `urdf/azure_kinect_sim.xacro`
2. 在主 gazebo xacro 的 `</robot>` 前添加 include：`<xacro:include filename="$(find pkg)/urdf/azure_kinect_sim.xacro"/>`
3. 编译后启动，传感器话题自动发布

**Gazebo Fuel 家居场景**：见 `references/fuel-home-scenes.md`。推荐 `OpenRobotics/Apartment` 或 `OpenRobotics/House 1`。在 SDF 中用 `<include><uri>https://fuel.gazebosim.org/1.0/OpenRobotics/models/Apartment</uri></include>` 引用。

**AWS Robomaker 小屋场景**：本机 WSL 有 `~/simulation_worlds/aws-robomaker-small-house-world-gz-sim/`，包含 68 个家居模型（沙发、床、冰箱、电视、厨房柜等）和 `small_house.world`。集成步骤见 `references/aws-small-house-world.md`。关键：必须设置 `GZ_SIM_RESOURCE_PATH` 指向 models 目录，否则 `model://xxx` URI 找不到。

**⚠️ WSLg 多相机传感器会 segfault** — 多个 `gz-sim-sensors-system` 插件同时创建渲染线程会导致 `SensorsPrivate::RenderThread` segfault。WSLg 下最多 1 个相机传感器。解决方案：`azure_kinect_sim.xacro` 只保留 1 个前置相机 + IMU。

**Gazebo 材质同步**：Gazebo 忽略 URDF `<material>` 标签，需在 gazebo xacro 中为每个 link 添加 `<gazebo reference="link_name"><material>Gazebo/Color</material></gazebo>`。不能用 xacro include 方式（会被丢弃），必须内联。

## conda-forge 方案详细踩坑

### 问题1: CRLF 损坏 .gz_desc
`git config --global core.autocrlf true` 导致二进制文件被 CRLF 损坏。
修复：`git config --global core.autocrlf false`（必须在克隆前设置）。
注意：手动删除 CRLF 会改变文件大小，破坏 protobuf 内部长度字段，**不能用 sed 修复**。

### 问题2: MSVCP140.dll 版本不匹配
系统版本 14.0.24215.1（2015），conda 需要 14.51.36231.0。
修复：`winget install Microsoft.VCRedist.2015+.x64`

### 问题3: cmdgui8.rb 缺失
conda 包漏掉了这个 Ruby wrapper 脚本。需要从 GitHub 源码获取模板并手动创建。

### 问题4: protobuf 版本
conda-forge gz-msgs10 用 libprotobuf 5.29.3 编译，不能用其他版本。

## CMakeLists.txt 常见错误

```cmake
# ✗ 错误：缺 ${PROJECT_NAME}
install(DIRECTORY launch DESTINATION share/)
install(PROGRAMS scripts/twist_bridge.py DESTINATION lib/)

# ✓ 正确
install(DIRECTORY launch DESTINATION share/${PROJECT_NAME})
install(PROGRAMS scripts/twist_bridge.py DESTINATION lib/${PROJECT_NAME})
```

改源码后必须清理重编：`rm -rf build/pkg install/pkg && colcon build --packages-select pkg`

## vcpkg 方案细节

vcpkg 安装路径: D:\vcpkg
- DLL: `D:\vcpkg\installed\x64-windows\bin\gz-sim9-gz.dll`
- Python ctypes 可加载成功，`gzSimVersion()` 返回 `9.5.0`
- `runGui()` 可调用但崩溃：Qt5 QML 模块（QtQuick.Controls 等）找不到
- 根本原因：gz-gui9 的 QML 资源和 vcpkg Qt5 路径不兼容