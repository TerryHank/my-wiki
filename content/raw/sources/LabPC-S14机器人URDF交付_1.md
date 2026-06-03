# S14 STEP 50701 URDF / Gazebo / Web Control Delivery

## ��е�ṹ����

��ģ�Ͱ� STEP 50701 װ���� 6 ���������ɶȺͶ�Ӧ�Ӷ�������

1. `head_yaw_motor_joint`�����ǽװ GO-M8010���������򡢵��Ȧ����������Ƭ�͵���֣�ͨ�����۸����� `head_yaw_plate_joint`��
2. `head_pitch_motor_joint`���Ҳ�ǽװ GO-M8010���������򡢵��Ȧ����������Ƭ�͵���֣�ͨ�����۸����� `head_pitch_block_joint`��
3. `stage1_crank_joint`��1 �ű����������� `stage1_pushplate_joint`���ٴ����� `stage1_rocker_*`��
4. `stage2_crank_joint`��2 �ű����������� `stage2_pushplate_joint`���ٴ����� `stage2_rocker_*`��
5. `stage3_crank_joint`��3 �ű����������� `stage3_pushplate_joint`���ٴ����� `stage3_rocker_*`��
6. `mouth_open_joint`����ҳ������첿�������ɶȣ�ӳ�䵽 `mouth_left_servo_joint`��`mouth_right_servo_joint` ���첿���ˡ�

�̶������װ塢������塢���졢������Ͱ�װ��˿������ `base_link` ���Ӧ��װ link�������̡����֡������򡢵�Ƭ���Ӷ�����������˶� link �󶨣����������Ư������

## ��������

- ���� `s14_step_50701_linkage_model.json` �в����� `stage3_crank_joint` �� `mouth_left_servo_joint` solver ��ƫ����ǰ q=0 ��� 3 ���ư��Ƶ���λ�⣬��������������Լ���в����
- �� 1/3 ��������ҳ�Ϳ��� URDF �ķ�Χ�������ư���λ�ɴ����䣺
  - `stage1_crank_joint`: `[-0.784, 1.62]` rad
  - `stage2_crank_joint`: `[-0.785398163397, 0.785398163397]` rad
  - `stage3_crank_joint`: `[-1.898, 0.624]` rad
- �޸�ͷ�����۸�Ƕ�׹ؽڵ� mapper ������ƣ��������۸��ڷ��� yaw / pitch ʱ���ظ���ת��
- ��ҳ����ͷ�� `Yaw` / `Pitch` ���� Unitree ������飺
  - ��� 4 -> `head_yaw_motor_joint`
  - ��� 5 -> `head_pitch_motor_joint`
  - ��� 1/2/3 -> �����������
- ǰ��֧�� Unitree ���� TX/RX �� UDP/IP��PWM Ҳ֧�ִ��ڰ�� UDP/IP�����ںš������ʡ�IP���˿ڡ�PWM ͨ��������ǰ���޸ġ�
- `hardware_enabled` �ɴ���ҳ����ʱ�л��������ڵ��յ� `s14/driver_config` ���ͬ����ͣ��ʵӲ�������
- ���� `lib/s13_description/*.py` ����Ϊ��ִ�У��� `ros2 launch` / `ros2 run` ʹ�á�

## ��֤���

������λԼ����֤��

```bash
python3 lib/s13_description/s14_linkage_mapper.py \
  --config share/s13_description/config/s14_step_50701_linkage_model.json \
  --constraints share/s13_description/config/s14_linkage_constraints.json \
  --pretty
```

�ؼ������

- `stage1:Slot12/3/2` �в0
- `stage2:Slot5/7/8` �в0
- `stage3:Slot15/10/11` �в0
- `mouth Slot14/13` �вԼ `1e-12 m`

˵������ѻص� CAD װ��λ��3 ���ư���첿�����˲�������λǿ�ƴ���λ��

## ������ʽ

��ѹ�����⵽ ROS 2 Jazzy �����İ�װ�ռ�� overlay �У�Ȼ��

```bash
source /opt/ros/jazzy/setup.bash
source install/setup.bash
ros2 launch s13_description s14_step_50701_signal_gazebo_web.launch.py gazebo:=true web:=true joint_gui:=true hardware:=false
```

��ҳĬ�ϣ�

```text
http://<����IP>:8088/s14_control.html
WebSocket: ws://<����IP>:8766
```

Զ�̲���ʱȷ����������ǽ���� `8088/tcp` �� `8766/tcp`��

## ���� / ��������·��

```text
Web slider
  -> WebSocket
  -> s14_web_signal_server.py
  -> s14_signal_gazebo_bridge.py
  -> joint_states + Gazebo joint trajectory
  -> robot_state_publisher / Gazebo

joint_states
  -> s14_unitree_actuator_driver.py / s14_pwm_servo_driver.py
  -> �������� topic ����ʵ����/IP Ӳ�����
```

Ĭ�� `hardware:=false` ����ҳ����ѡ�����ñ���Ӳ�������ʱ��ֻ�� Gazebo / ROS ���棬�������ʵ�����

## ����ʵ��ȷ�ϵĵ�

- URDF �Ѱ� STEP װ������鲢�� mate-aware �˶�ӳ�䣬�� URDF �������������ջ�����ѧ������������� mapper �����Ӷ� joint state ��ʽʵ�֡�
- ͷ�� yaw/pitch �����������������������ƣ��ӽ���������ʱ����Ҫ��ʵ��� CAD mate ��һ��ȷ�Ͽɴ��ԡ�
- ������ Gazebo URDF Ϊ����������ģ�ͣ���ײ����û��ǿ�Ƽ��븴�� STL�������ɱ��� Gazebo ���������ײ�ͱ������Ʋ�����������ʽӲ��ײ���潨��ʹ�ü� box/capsule collision�������� allowlist ��ɨ�衣