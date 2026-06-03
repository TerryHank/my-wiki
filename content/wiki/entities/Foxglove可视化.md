     1|---
     2|title: Foxglove
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, visualization, ros2]
     7|sources: [LabPC Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# Foxglove 可视化
    12|
    13|替代 rviz 的 ROS2 可视化工具，支持 WebSocket 远程连接。
    14|
    15|## 用途
    16|- WSL2 Gazebo 无头运行时，Windows 端 Foxglove 做 3D 可视化
    17|- 支持 TF、URDF、话题可视化
    18|- 通过 foxglove_bridge 连接
    19|
    20|## 配置
    21|```bash
    22|# WSL2 端启动 bridge
    23|ros2 run foxglove_bridge foxglove_bridge_node --ros-args -p port:=8765
    24|
    25|# Windows 端连接 ws://localhost:8765
    26|```
    27|
    28|## 注意事项
    29|- 需要 source ROS2 环境（写入 ~/.bashrc）
    30|- 与 rviz 功能类似但支持远程
    31|
    32|## 相关
    33|- [[Gazebo仿真环境]] — 仿真环境
    34|- [[ROS2机器人控制]] — ROS2 框架
    35|