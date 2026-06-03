# S13 ��ʨ�沿��Ƶ������������

## Ŀ��

��ǰ��Ƶ����ֻ������ʨ�沿/ͷ������������������������λ�ơ���Ծ����������·�ߡ���·���÷ֲ�ṹ��

```text
WAV ��Ƶ
  -> onset / tempo / energy / density
  -> face_state
  -> face motion primitives
  -> face targets
  -> face_ik_solver
  -> 5 �������ؽ�
  -> linkage_state_mapper
  -> 17 ������ joint_states
```

��Ҫ����Ƶֱ��ӳ�䵽ÿ����е�������Ƶֻ������ࡢǿ�����沿״̬�ͱ��鴥��������ؽڹ켣���沿����ԭ���������������� mapper ���ɡ�

��ǰ�˶�ѧ�ֳ����㣺

```text
����� IK:
  mouth_open / brow_raise / ear_lift / lower_face
    -> 5 �������ؽ�

���������� FK:
  5 �������ؽ�
    -> 17 ������ joint_states
```

IK ��ڣ�

```text
s13_description/config/face_ik_mapping.json
tools/face_ik_solver.py
```

��ǰ IK �ǻ��� `joint_state_mapping.json` ����ֵ���󣬻����������ؽڣ�ʹָ������ؽھ����ӽ�Ŀ���沿���������ǵ�һ�湤�̱궨������ SolidWorks ��ȷ����ʽ��

## ׼����ʵ��Ƶ

�Ƽ�����ʵ�زķ��ڹ��������ƵĿ¼������ڵ�ǰ��ѹĿ¼�µ� `audio/`��

```bash
mkdir -p audio
```

����زĲ��� WAV����ת����

```bash
ffmpeg -i input.mp3 -ac 1 -ar 48000 audio/lion_dance.wav
```

��ǰ Python ������ֱ��֧�� PCM WAV��������زĲ�Ҫ�Ž� `s13_description/config`��ͨ�� launch �������뼴�ɡ�

## ���߷�����Ƶ

���ڲ����� RViz ������µ���״̬ʱ���᣺

```bash
ros2 run s13_description s13_audio_motion.py \
  audio/lion_dance.wav \
  --profile s13_description/config/audio_motion_profile.json \
  --annotations audio/face_labels.json \
  --dt 0.05 \
  --timeline-csv audio/lion_dance_timeline.csv \
  --timeline-json audio/lion_dance_timeline.json \
  --pretty
```

�ص㿴 JSON ��ģ�

```text
tempo_bpm
onsets
state.name
timeline_summary.state_counts
timeline_summary.max_abs_joint
```

��� `face_accent` ̫�٣����� `accent_threshold` �� `onset_sensitivity`����� `face_excited` ̫�࣬��� `excited_density_threshold`�������͹��ͣ����� `face_accent` ԭ����� `mouth`��

## �ֹ��沿��ע

�Զ�ʶ���ʺ�����ͨЧ��������ʵ��ʨ�沿����������ֹ���ע��У׼��ģ���ļ���

```text
s13_description/config/face_annotations_template.json
```

��ע��ʽ��

```json
{
  "annotations": [
    {
      "start": 2.00,
      "end": 2.45,
      "face_state": "face_accent",
      "intensity": 0.90,
      "label": "strong mouth accent"
    }
  ]
}
```

`face_state` ����д����״̬����Ҳ����д���ı�����`��`��`�ɶ�`��`��`��`̽`��`����`��`�˷�`��

## ���� ROS2/RViz

```bash
ros2 launch s13_description audio_linkage_display.launch.py \
  audio_path:=audio/lion_dance.wav \
  annotation_path:=audio/face_labels.json \
  rviz:=true
```

û�д� `audio_path` ʱ��launch ��ʹ�ð��ڵ� `audio_demo_drums.wav` ��Ϊ 120 BPM ʾ���ĵ㡣
û�д� `annotation_path` ʱ��ϵͳ��ȫʹ���Զ��沿״̬ʶ��

## �ֶ�������������ؽ�

���ֻ��У׼ 5 �������ؽڷ����������ϵ���ùٷ��ؽڻ��� GUI��

```bash
ros2 launch s13_description active_joint_gui.launch.py rviz:=true
```

���� launch ��������

```text
joint_state_publisher_gui      ���� 5 �������ؽڵ� /s13_active_joint_states
s13_active_joint_state_mapper  �� 5 �������ؽ�չ���� 17 ������ joint_states
robot_state_publisher          �������� TF
rviz2                          ��ʾ��ʨͷ������
```

ע�ⲻҪͬʱ������Ƶ���� launch �������ؽ� GUI launch����Ϊ���Ƕ����� `/joint_states` ���������ؽ�״̬��

## �������

�����ļ���

```text
s13_description/config/audio_motion_profile.json
```

��Ҫ�ֶΣ�

```text
analysis.onset_sensitivity          �������������
analysis.min_onset_interval         �����ĵ�֮�����С���
motion.interpreter.*                �沿״̬�ж���ֵ
motion.primitives.*                 ���沿ԭ��ķ��ȡ���λ���첿��Ӧ
face_ik_mapping.json                �沿Ŀ�굽�����ؽڵ��������궨
```

״̬���壺

```text
face_neutral   ��ֹ�������µ���΢�沿����
face_rhythm    ��ͨ�ĵ��µ����ͷ / �����ɶ�
face_scan      �����ϸ�ʱ������ɨ�� / ��
face_probe     ���ٹĵ��µĵ�ͷ��̽ / ����
face_accent    ǿ�ĵ��µ��ſڡ���ͷ����������
face_excited   �ܼ��ĵ��µĶ�ͷ��ǿ���顢��������
```

�����������ʵ��Ƶ��ע�����԰���Щ�����滻�ɷ��������������Ӧ���� `face_state + intensity`����Ҫ�˻ص���Ƶֱ�ӿ������йؽڡ�

## �������� IK

```bash
python3 tools/face_ik_solver.py \
  --config s13_description/config/linkage_model.json \
  --mapping s13_description/config/joint_state_mapping.json \
  --ik s13_description/config/face_ik_mapping.json \
  --target mouth_open=0.7 \
  --target brow_raise=0.5 \
  --pretty
```