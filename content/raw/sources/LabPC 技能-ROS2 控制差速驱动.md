---
name: ros2-control-diff-drive
description: "ROS2 Jazzy + ros2_control + diff_drive_controller: URDF setup, mock hardware, Gazebo Harmonic simulation, cmd_vel teleop."
trigger:
  - Setting up ros2_control with diff_drive_controller for a mobile robot
  - Adding Gazebo Harmonic simulation to an existing URDF package
  - ROS2 robot_description parameter errors in Jazzy
  - No transform or waiting for controller_manager service errors
---

# ROS2 Control — Differential Drive

## Prerequisites (Jazzy)

```
ros-jazzy-ros2-control  ros-jazzy-ros2-controllers  ros-jazzy-diff-drive-controller
ros-jazzy-joint-state-broadcaster  ros-jazzy-robot-state-publisher  ros-jazzy-xacro
ros-jazzy-teleop-twist-keyboard
ros-jazzy-gz-ros2-control  ros-jazzy-ros-gz-sim  ros-jazzy-ros-gz-bridge   # Gazebo
```

## Step 1: Extract parameters from URDF

Read the xacro/urdf and identify:
- Wheel joint names (continuous type, axis Y for cylinder wheels)
- Wheel radius (cylinder radius)
- Wheel separation (distance between left/right wheel center Y coordinates × 2)
- Which wheels are left vs right

## Step 2: Create ros2_control hardware interface

**CRITICAL**: Inline the `<ros2_control>` block directly in the wrapper xacro.
Do NOT put it in a separate file included via `<xacro:include>` — if the geometric
xacro ends with `</robot>`, the include silently drops everything after it.

### Mock hardware (RViz-only)

```xml
<ros2_control name="mock_components" type="system">
  <hardware><plugin>mock_components/System</plugin></hardware>
  <joint name="LEFT_WHEEL_JOINT">
    <command_interface name="velocity"/>
    <state_interface name="position"/>
    <state_interface name="velocity"/>
  </joint>
</ros2_control>
```

### Gazebo Harmonic

```xml
<ros2_control name="gz_ros2_control" type="system">
  <hardware><plugin>gz_ros2_control/GazeboSimSystem</plugin></hardware>
  <joint name="LEFT_WHEEL_JOINT">
    <command_interface name="velocity"><param name="min">-10</param><param name="max">10</param></command_interface>
    <state_interface name="position"/>
    <state_interface name="velocity"/>
  </joint>
</ros2_control>
<gazebo>
  <plugin filename="gz_ros2_control-system" name="gz_ros2_control::GazeboSimROS2ControlPlugin">
    <robot_param>robot_description</robot_param>
    <robot_param_node>robot_state_publisher</robot_param_node>
    <parameters>$(find PKG)/config/controllers.yaml</parameters>
  </plugin>
</gazebo>
```

## Step 3: Controller config YAML

```yaml
controller_manager:
  ros__parameters: { update_rate: 100 }
  joint_state_broadcaster: { type: joint_state_broadcaster/JointStateBroadcaster }
  diff_drive_controller: { type: diff_drive_controller/DiffDriveController }
diff_drive_controller:
  ros__parameters:
    left_wheel_names: ["left_joint"]
    right_wheel_names: ["right_joint"]
    wheel_separation: 0.82
    wheel_radius: 0.16
    use_stamped_vel: false
    odom_frame_id: odom
    base_frame_id: base_link
```

## Step 4: Launch file — robot_description

```python
from launch_ros.parameter_descriptions import ParameterValue
robot_description = {"robot_description": ParameterValue(Command(["xacro ", xacro_file]), value_type=str)}
```

## Step 5: Launch file — RViz mode

robot_state_publisher + ros2_control_node + joint_state_broadcaster spawner + diff_drive spawner + rviz + teleop.

## Step 6: Launch file — Gazebo mode

Do NOT launch `ros2_control_node` — gz_ros2_control plugin starts its own controller_manager.

1. `gz sim -r empty.sdf`
2. robot_state_publisher
3. `ros_gz_sim create -param robot_description`  (use `-param`, not `-topic`)
4. ros_gz_bridge
5. TimerAction(8s): spawn joint_state_broadcaster `-c /controller_manager`
6. TimerAction(10s): spawn diff_drive_controller `-c /controller_manager`
7. rviz2 + teleop

## Pitfalls

| # | Problem | Fix |
|---|---------|-----|
| 1 | Jazzy: "Unable to parse robot_description as yaml" | Wrap in `ParameterValue(Command(...), value_type=str)` |
| 2 | Included xacro with `</robot>` drops content | Inline ros2_control block in wrapper xacro |
| 3 | Gazebo: spawners hang on "waiting for service" | Remove standalone `ros2_control_node` from launch |
| 4 | teleop_twist_keyboard does nothing | **Jazzy**: `use_stamped_vel: false` 已废弃，diff_drive 默认期望 TwistStamped。需要 `twist_bridge.py` 转换节点，把 teleop 的 Twist 发布到 `/cmd_vel`，bridge 转发到 `/diff_drive_controller/cmd_vel`。 |
| 5 | `ros_gz_sim create` fails silently | Use `-param` not `-topic` for robot_description |
| 6 | Controllers not ready at spawn time | TimerAction delays 8s/10s for gz_ros2_control init |
| 7 | Package not found after colcon build | Source workspace in NEW terminal: `source ~/ws/install/setup.bash` |

## Reference Files

- `templates/launch_rviz_mock.py` — working RViz-only launch (mock hardware)
- `templates/launch_gazebo.py` — working Gazebo Harmonic launch (gz_ros2_control)