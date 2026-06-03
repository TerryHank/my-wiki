     1|---
     2|title: Intel NPU (Core Ultra 7 155H)
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [hardware, npu, ai, intel]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# Intel NPU (Core Ultra 7 155H)
    12|
    13|TerryLaptop 上的 NPU 硬件，用于本地 AI 推理加速。
    14|
    15|## 硬件规格
    16|- **CPU**: Intel Core Ultra 7 155H
    17|- **GPU**: Intel Arc Graphics (iGPU)
    18|- **NPU**: Intel AI Boost (驱动 v2540)
    19|- **框架**: [[openvino]] 2026.0.0
    20|
    21|## YOLO12n 性能对比
    22|| 设备 | 编译 | 推理 | FPS |
    23||------|------|------|-----|
    24|| CPU | 0.937s | 61.91ms | 16.15 |
    25|| GPU | 1.844s | 43.19ms | 23.16 |
    26|| **NPU** | **0.781s** | **31.06ms** | **32.20** |
    27|
    28|## 注意事项
    29|- 不是所有模型都能纯 NPU 运行（YOLO12n 可以，YOLOv8n/v11n 在 MaxPool 失败）
    30|- 回退方案: `core.compile_model(model, "HETERO:NPU,CPU")`
    31|- NPU 上静态形状更稳定
    32|- 项目路径: D:\Workspace\openvino_notebooks\
    33|
    34|## 相关
    35|- [[openvino]] — 推理框架
    36|- [[NPU推理加速]] — NPU 推理技术
    37|- [[YOLO车牌检测]] — 应用场景
    38|