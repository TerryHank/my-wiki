** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: 3d-body-measurement-smpl
description: 3D人体围度预测 �?HMR2.0 + SMPL + SMPL-Anthropometry pipeline。从照片估计SMPL body model参数，提取胸�?腰围/臀围等围度。包含shape优化（用已知围度反推最优betas）�?
trigger:
  - 需要从照片预测人体围度/体围
  - 使用 HMR2 / SMPL / SMPL-X 进行人体重建
  - SMPL-Anthropometry 围度提取
  - 3D body shape estimation
tags: [smpl, hmr, body-measurement, 3d-reconstruction, anthropometry]
---

# 3D Body Measurement with HMR2 + SMPL

## Architecture

```
照片 �?YOLO(检�?裁剪) �?HMR2.0(SMPL参数) �?SMPL mesh(6890 verts)
     �?SMPL-Anthropometry(body part分割+围度提取) �?围度(cm)
```

## Prerequisites

### SMPL Model Files
- �?https://smplify.is.tue.mpg.de/ 注册下载，或从已有项目复�?
- 需�? `SMPL_NEUTRAL.pkl`, `basicModel_neutral_lbs_10_207_0_v1.0.0.pkl`
- 放到 `4D-Humans/data/smpl/` �?`SMPL-Anthropometry/data/smpl/`

### HMR2 Checkpoint
- 4D-Humans repo: `git clone https://github.com/shubham-goel/4D-Humans.git`
- Checkpoint auto-downloads (~2.5GB tar, not gzip!)
- 路径: `~/.cache/4DHumans/logs/train/multiruns/hmr2/0/checkpoints/epoch=35-step=1000000.ckpt`

### Environment
- Python 3.9+ (PlaneSAM conda env has torch 2.7+cu128)
- Packages: `torch, torchvision, smplx, trimesh, scipy, ultralytics`
- SMPL-Anthropometry: `git clone https://github.com/DavidBoja/SMPL-Anthropometry.git`

## Pitfalls (CRITICAL)

### 1. pyrender 不支�?Windows
HMR2 初始化时创建 `pyrender.OffscreenRenderer` 会报 `Unsupported PyOpenGL platform: win32`�?
**Fix**: Patch `hmr2/utils/mesh_renderer.py` line 49:
```python
self.renderer = None  # Patched: skip OpenGL renderer on Windows
```

### 2. Python 3.10+ 类型注解
4D-Humans �?`str | np.ndarray` 语法（Python 3.10+），�?3.9 环境�?TypeError�?
**Fix**: `hmr2/datasets/utils.py` line 527 �?`image_dataset.py` line 16, 210:
```python
# �?str|np.ndarray 为无类型注解
def get_example(img_path, ...):
def expand_urls(urls):
```

### 3. torch.load weights_only
PyTorch 2.6+ 默认 `weights_only=True`，HMR2 checkpoint 需�?`False`�?
**Fix**: 在加载前 monkey-patch:
```python
import torch
_orig = torch.load
def _patched(*a, **kw):
    kw.setdefault('weights_only', False)
    return _orig(*a, **kw)
torch.load = _patched
```

### 4. SMPL 坐标�? Y轴垂直（非Z�?
SMPL �?Y 轴是头顶方向，Z 是前后，X 是左右�?
围度截面必须�?`plane_normal=[0,1,0]`（Y轴），不�?`[0,0,1]`�?
身高缩放: `scale = (height_cm / 100) / (y_max - y_min)`

### 5. Rotation Matrix �?Axis-Angle
HMR2 输出 body_pose �?`(1, 23, 3, 3)` rotation matrices，SMPL 需�?`(1, 69)` axis-angle�?
```python
from scipy.spatial.transform import Rotation as R
r = R.from_matrix(rotmat[0])
aa = torch.tensor([r.as_rotvec().flatten()], dtype=torch.float32)
```

### 6. SMPL-Anthropometry 路径
必须�?SMPL-Anthropometry 目录运行（`cd SMPL-Anthropometry`），因为它用相对路径 `data/smpl/`�?
需要在该目录下也放 SMPL 模型文件�?`smpl_body_parts_2_faces.json`�?

### 7. HMR2 checkpoint 解压
下载�?`hmr2_data.tar.gz` 实际�?**�?tar**（不�?gzip），�?`tar -xf` 而非 `tar -xzf`�?
Windows �?`os.system("tar -xvf ...")` 路径有冒号问题，需手动解压�?
```bash
tar -xf ~/.cache/4DHumans/hmr2_data.tar.gz -C ~/.cache/4DHumans/
```

### 8. SMPL-Anthropometry 输出格式
- `measurer.measurements` 用字母代�? D=chest, E=waist, F=hip, L=thigh, B=neck
- `measurer.labeled_measurements` 用完整名: "chest circumference", "waist circumference"
- `from_verts()` 只接�?`verts` 参数（faces �?__init__ 中已加载�?

### 9. 截面周长提取
不能直接�?`mesh.section()` �?total length（会包含手臂/腿的周长）�?
SMPL-Anthropometry �?body part face segmentation + convex hull 正确过滤�?

### 10. HMR2 低估大体�?
HMR2 �?shape space 受训练数据限制，�?BMI>30 的人严重低估（胸围可能差 15-20cm）�?
Shape optimization (Nelder-Mead) 可以部分修正，但需要已知围度作为约束�?

## Key Files

```
research/4D-Humans/              # HMR2 repo
research/SMPL-Anthropometry/     # 围度提取�?
scripts/hmr_pipeline_lite.py     # 轻量pipeline (YOLO检�? 不需detectron2)
scripts/smpl_shape_optimizer.py  # Shape优化 (betas反推)
scripts/eval_3d_full.py          # 综合评估脚本
scripts/test_shape_opt.py        # Shape优化单样本测�?
```

## Quick Start

```python
# 从SMPL-Anthropometry目录运行
cd F:/Workspace/MeasureMe_ws/research/SMPL-Anthropometry

# 加载模型
import torch; torch.load = lambda *a,**kw: __import__('torch').load(*a, **{**kw, 'weights_only': False})
from hmr_pipeline_lite import load_hmr2, predict_from_photo

result = predict_from_photo('photo.jpg', height_cm=172)
print(result['measurements'])  # {'chest': 95.2, 'waist': 82.1, ...}
```

### 11. SMPL 警告淹没输出
**Fix**: 在脚本开头：
```python
import warnings
warnings.filterwarnings('ignore', message='.*SMPL model.*')
```

### 12. float32 JSON 序列�?
numpy float32 不能直接 `json.dump`，报 `Object of type float32 is not JSON serializable`�?
**Fix**: 保存前转换：
```python
def to_py(obj):
    if isinstance(obj, (np.floating, np.float32, np.float64)): return float(obj)
    if isinstance(obj, (np.integer,)): return int(obj)
    if isinstance(obj, np.ndarray): return obj.tolist()
    if isinstance(obj, dict): return {k: to_py(v) for k, v in obj.items()}
    if isinstance(obj, list): return [to_py(v) for v in obj]
    return obj
json.dump(to_py(results), f)
```

### 13. detectron2 Windows 编译失败
detectron2 �?Windows + VS2022 上编译报 C++ 错误。HMR2 demo �?detectron2 做人体检测�?
**Fix**: �?YOLO 替代 detectron2 做人体检测（`hmr_pipeline_lite.py` 就是这个方案）�?

### 14. 多视�?betas 平均
对同一人的 4 张照片（front/back/left/right）分别跑 HMR2，平�?betas，再跑一�?SMPL�?
比单视图稳定，尤其对 AIHub 合成图改善明显�?

### 15. Shape 优化迭代次数
Nelder-Mead 200 次迭�?�?3 分钟/人，300 �?�?5 分钟/人�?
200 次通常足够收敛（损失改�?< 0.1cm），建议�?200 节省时间�?

## Accuracy Benchmarks

### HMR2 直出 (单视�?

| 字段 | 本地真实照片 MAE | AIHub合成�?MAE |
|------|-----------------|-----------------|
| 胸围 | ~6cm | ~11cm |
| 腰围 | ~7cm | ~16cm |
| 臀�?| ~5cm | ~12cm |
| 大腿�?| ~6cm | ~11cm |
| 颈围 | ~4cm | ~4cm |

### Shape 优化�?(7约束, 200次迭�? 多视�?

| 字段 | MAE | Max | <=2cm达标�?|
|------|-----|-----|------------|
| 胸围 | 2.2cm | 8.2cm | 57% |
| 腰围 | 1.0cm | 12.5cm | 91% |
| 臀�?| 0.7cm | 5.8cm | 87% |
| 大腿�?| 4.6cm | 12.8cm | 26% |
| 颈围 | 2.3cm | 7.4cm | 48% |

**关键发现**: 腰围和臀围已达标（MAE < 2cm），胸围�?6.1�?.2cm�?4% 改善）�?
Max 误差仍然较大�?-13cm），主要来自极端体型样本�?
Shape 优化对正常体型效果好，对 BMI>30 的大体型改善有限�?

### AIHub 合成�?vs 真实照片
HMR2 �?AIHub 合成图（�?3D mesh 渲染）上表现明显差于真实手机照片�?
原因：合成图的光�?纹理/背景�?HMR2 训练分布不同�?
评估时应以真实照片为准�?

## Recommended Workflow

1. **优先�?AIHub/ANSUR/CAESAR 数据�?*（不要把本地量体作为优先数据集）
2. 多视�?betas 平均�? 张照�?�?4 �?HMR2 �?平均 betas�?
3. Shape 优化（Nelder-Mead 200 次迭�? 7 约束�?
4. 评估时区分正常体型和极端体型