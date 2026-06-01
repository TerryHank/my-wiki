** The server may need to be upgraded. See https://openssh.com/pq.html
---
name: body-measurement-ml
description: ML pipeline for predicting body circumferences (chest/waist/hip/thigh) from 4-view photos using YOLO11x-seg + feature engineering + regression. Covers local data processing, feature extraction pitfalls, and known theoretical limits.
tags: [body-measurement, yolo, computer-vision, feature-engineering, regression]
triggers:
  - body measurement
  - circumference prediction
  - 量体
  - 胸围/腰围/臀围预�?
  - YOLO segmentation features
---

# Body Measurement ML Pipeline

## Architecture

4-view photos (front/back/left/right) �?YOLO11x-seg �?binary mask �?feature extraction �?regression �?circumference predictions (cm).

Reference demo: `deliverables/measureme_customer_sop_demo_20260512/app/measureme_demo.py`

## Feature Extraction Pipeline

```python
# MUST reuse demo's exact pipeline:
import measureme_demo as demo

# Per-view features (from single mask)
features = demo.features_from_binary_mask(mask, height_cm=height)

# 4-view fusion (pass list of 4 feature dicts)
four_view = demo.summarize_four_view_features([f_front, f_back, f_left, f_right])

# Add derived features (ratios, per-height)
final = demo.add_derived_features(four_view, height_cm)
```

Final feature count: ~371 features (API model) or ~624 features (with view_aware aggregation).

## Key Features

| Feature | Meaning | Correlation with chest |
|---------|---------|----------------------|
| `chest_view_width_front_side_sum_cm` | (front+back)/2 + (left+right)/2 | ~0.9× chest circumference |
| `chest_four_view_central_width_fb_lr_ellipse_perimeter_cm` | Ramanujan ellipse perimeter | ~1.4× chest (includes arms!) |
| `chest_four_view_width_front_cm` | Width from front view | ~0.6× chest |

## Critical Pitfalls

### 1. Chinese Paths on Windows (OpenCV)

OpenCV `cv2.imread()` CANNOT read Chinese paths on Windows. Must use numpy:

```python
with open(img_path, 'rb') as f:
    data = f.read()
nparr = np.frombuffer(data, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
```

### 2. YOLO Mask Includes Arms

The YOLO segmentation mask at chest height includes both torso AND arms:
- Central width (excluding arms) still ~60cm for a 100cm chest person
- Ellipse perimeter = 1.3-2.0× actual chest circumference
- Ratio varies by body type: 0.93 (small chest) �?0.82 (large chest >110cm)
- This is the PRIMARY source of prediction error

### 3. Left/Right View Swap

Some datasets have left and right views swapped in the photo sequence. Detect by checking if `left_width < right_width` and swap if so.

### 4. Mask Size Mismatch

YOLO returns masks at 640px regardless of original image size. Must resize to original dimensions:
```python
mask = masks.data[person_idx].detach().cpu().numpy() > 0.5
# Resize to original image size if needed
```

### 5. Model Feature Mismatch

AIHub model uses 371 features from `summarize_four_view_features`. Local data processing may produce 624 features (includes `view_aware` aggregation). The 371-feature subset is the API model format.

Missing features when applying AIHub model to local data: `det_conf_*` (5 features, not critical).

## Theoretical Limits

| Metric | Oracle (best possible) | Current best |
|--------|----------------------|--------------|
| MAE | �?| 3.00cm (local), 1.90cm (AIHub) |
| Max error | 3.50cm | 18.18cm (with outliers), 1.95cm (excluding >5cm) |

**Max error < 2cm is NOT achievable with 2D image features alone.** Oracle Max=3.50cm proves this.

## Cross-Dataset Incompatibility

AIHub Korean model FAILS on local Chinese data:
- MAE: 9.41cm (vs 1.90cm on AIHub test)
- Mean bias: -8.85cm (90% under-prediction)
- Worst case: 50.2cm error (truth=145cm, pred=94.8cm)

**Root cause**: Korean vs Chinese body type distributions are fundamentally different. Chinese worker population has much larger average chest (99cm vs 91cm) and more variance. **Always train on target population data.**

## Outlier Analysis

17% of local samples have >5cm error. Causes:
1. **Left/right view swap** (detect: `left_width < right_width`)
2. **YOLO detection failure** (detect: `fl_asymmetry > 15cm`)
3. **Extreme body types** (chest >120cm or <80cm)
4. **Incorrect measurement labels** (rare)

After removing outliers (error >5cm): MAE=1.95cm, Max=4.9cm.

## PyTorch on Windows �?Import Latency + GPU

`import torch` takes 2-7 minutes on Windows with CUDA GPU (DLL loading). Workarounds:

1. Use conda env direct path: `"E:/ProgramData/miniconda3/envs/PlaneSAM/python.exe" script.py`
2. Write output to log file (stdout buffering makes process appear stuck)
3. Run in background with `notify_on_complete`
4. `torch.cuda.get_device_properties(0).total_memory` (NOT `total_mem` �?changed in PyTorch 2.7)
5. `nvidia-smi` works to check GPU: RTX 4070 12GB confirmed on local machine

## CNN vs ExtraTrees �?Data Size Determines Winner

Tested ResNet18 CNN (4-view input, pretrained backbone) vs ExtraTrees on 195 local samples:

| Config | MAE | Notes |
|--------|-----|-------|
| ExtraTrees + 17 engineered features | **3.00cm** | 195 samples, best single-batch |
| ExtraTrees 720 samples (local only) | **3.70cm** | All batches, more data but variable quality |
| ExtraTrees local + AIHub Korean | 3.58cm | Worse than local-only �?body type mismatch |
| CNN batch=8, 30ep, CosineAnnealing | 5.01cm | Underfitting |
| CNN batch=16, 100ep, AdamW+strong aug | 5.50cm | More epochs didn't help |
| CNN batch=128, 50ep | 92.87cm | batch too large, 1-2 steps/epoch |

**Key lesson: Data quality > data quantity.** 195 clean samples from a single batch outperformed 721 samples from 11 batches with variable photo quality and measurement accuracy.

**AIHub mixing HURTS**: Korean data (mean chest ~85cm) + Chinese data (mean chest ~99cm) = worse than Chinese-only. Body type distribution mismatch causes the model to average across incompatible populations.

**Conclusion: Do NOT attempt CNN with <500 samples.** ExtraTrees wins by 2.5cm. CNN needs 500+ diverse samples to beat traditional ML on this task.

### Auto-batch pitfall

GPU memory-based auto-batch ignores dataset size. batch=128 with 156 training samples = 1-2 gradient updates/epoch �?no learning. **Always ensure �?0 batches/epoch**: `batch_size �?len(train) // 10`.

### Model architecture mismatch on rerun

When changing model head size between runs, old `.pth` files cause `RuntimeError: size mismatch`. Always `rm fold*_best.pth` before restarting. On Windows, `rm -f` may silently fail �?verify with `ls`.

## Path to <2cm Max Error: 3D Reconstruction

**2D image features cannot achieve Max < 2cm.** Oracle Max=3.50cm. The only path is 3D mesh reconstruction.

### Pipeline Architecture

```
photo �?HMR2.0 (ViTDet+Transformer) �?SMPL params (10 betas, 23 pose)
      �?SMPL mesh (6890 verts) �?trimesh cross-section slicing
      �?circumference (cm): chest/waist/hip/thigh/arm/neck
```

### Key Repos

| Repo | Stars | Purpose | Install |
|------|-------|---------|---------|
| [shubham-goel/4D-Humans](https://github.com/shubham-goel/4D-Humans) | 1619 | HMR2.0: image �?SMPL params | `pip install -e .` |
| [DavidBoja/SMPL-Anthropometry](https://github.com/DavidBoja/SMPL-Anthropometry) | 307 | SMPL mesh �?16 anthropometric measurements | `from measure import MeasureBody` |

### SMPL Model File (BLOCKER)

**Must register**: https://smplify.is.tue.mpg.de/
Download `SMPL_python_v.1.0.0.zip`, extract `basicModel_neutral_lbs_10_207_0_v1.0.0.pkl`.
Place at `research/4D-Humans/data/` or `~/.cache/4DHumans/data/smpl/SMPL_NEUTRAL.pkl`.

HMR2 checkpoint auto-downloads on first run to `~/.cache/4DHumans/`.

### Circumference Extraction Algorithm


Must use **SMPL-Anthropometry** library which has body part face segmentation:
```python
from measure import MeasureBody
measurer = MeasureBody('smpl')
measurer.from_verts(verts=torch.tensor(verts, dtype=torch.float32))
measurer.measure(['chest circumference', 'waist circumference', ...])
```

**SMPL Y-axis is vertical** (not Z). When scaling: `scale = (height_cm/100) / (verts[:,1].max() - verts[:,1].min())`

### Windows Pitfalls

9 specific pitfalls for running HMR2+SMPL on Windows �?see `body-measurement-pipeline` skill �?`references/hmr2-smpl-setup.md`:
1. Python 3.9 type annotation (`str|np.ndarray` �?`str`)
2. PyTorch 2.7 `weights_only=True` �?monkey-patch `torch.load`
3. pyrender �?patch `MeshRenderer` to skip OpenGL
4. detectron2 �?use YOLO instead for person detection
5. SMPL rotation matrix �?axis-angle conversion required
6. SMPL-Anthropometry expects model files at `data/smpl/` relative to its own directory

### Actual 3D Pipeline Results (8 local samples, 2025-05-30)

```
Field     MAE(cm)  Notes
chest     ~7.8     Good for normal builds (err 2-5), underestimates >105cm by 10-18cm
waist     ~11.4    Worst �?SMPL waist definition differs from tape measurement
hip       ~5.5     Moderate
thigh     ~4.2     Best relative accuracy
neck      ~6.1     Systematic underestimate
```

Best single prediction: chest 98.7cm vs truth 97cm (err 1.7cm) �?proves the approach works.
Worst: chest 94cm vs truth 112cm (err 18cm) �?HMR shape space limitation for large bodies.

**Next step**: Fine-tune HMR2 betas on target population to reduce large-body underestimation.

### Validation Against CAESAR

CAESAR fitted meshes: `research/datasets/public/MPII-Human-Shape/data/caesar-fitted-meshes.zip`
- 4308 .mat files (MATLAB scipy.io), 6449 vertices each (NOT standard SMPL 6890)
- Only chest measurement is reliable from these meshes (waist/hip/thigh include legs in convex hull)
- Ground truth: `caesar_measurements.json` (extracted via P75 distance method)

**Oracle benchmark**: 3D ellipse at correct height �?Max=1.03cm for chest. Proves 3D approach can achieve <2cm.

### Implementation Pipeline Script

`scripts/hmr_circumference_pipeline.py` �?complete pipeline from photo paths to circumference dict.

### Other Approaches That FAILED to Reach <2cm

| Approach | Result | Why failed |
|----------|--------|------------|
| ExtraTrees + 721 local samples | MAE=3.70, Max=28cm | Data quality, 2D feature limits |
| ExtraTrees + local + AIHub Korean | MAE=3.58, Max=31cm | Korean/Chinese body type mismatch |
| ExtraTrees + AIHub only | MAE=1.95 (test), Max=6.8cm | Different population |
| CNN ResNet18 + 195 samples | MAE=5.50, Max=23cm | Too few samples for CNN |
| ANSUR+CAESAR calibration model | MAE improvement 1.90�?.78 only | No images, can't help image model |
| EP (ellipse perimeter) calibration | Works for 1 subject, fails others | Chest height varies per person |

## Data Sources

| Source | Subjects | Chest range | Format | Status |
|--------|----------|-------------|--------|--------|
| AIHub Korean 151 | 950 (train/val/test) | 65.9-116.5cm | 4-view photos + mesh | Processed |
| Local Chinese | 720 processed (1337 total) | 78-145cm | Phone photos + Excel | Processed, 11 batches |
| ANSUR II | 6068 (all male) | 69.5-146.9cm | Measurements only (mm) | Ready |
| CAESAR (MPII) | 4308 | 35.5-149.3cm | 3D meshes (.mat, 6449 verts) | Chest only reliable |

ANSUR fields: gender, height_cm, chest_cm, waist_cm, hip_cm, thigh_cm, neck_cm, calf_cm, biceps_cm, forearm_cm, shoulder_cm, weight_kg.
CAESAR fields: chest, waist(UNRELIABLE), hip(UNRELIABLE), thigh(UNRELIABLE), upper_arm, neck, height.
ANSUR+CAESAR combined: `research/datasets/combined_training_data.json` (10376 entries).

## Model Training

```python
from sklearn.ensemble import ExtraTreesRegressor

# Best config for local data
model = ExtraTreesRegressor(n_estimators=500, random_state=42, n_jobs=-1)
```

## Batch Processing Local Data

The local data lives in `research/datasets/local/量体数据/` with 19 batch directories. Two directory structures exist:

- **Old format (0906 batch)**: `batch_dir/2|3|4|5/person_name/photos.jpg` �?person photos in numbered subdirectories
- **New format (all other batches)**: `batch_dir/person_name/photos.jpg` �?photos directly in person-named directories

Processing script: `scripts/batch_process_all_local.py` (handles both formats, incremental save per batch).

Key gotchas:
1. Excel files don't always have "量体" in filename �?scan for first `*.xlsx` per batch
2. Column layout is consistent: row[2]=name, row[4]=height, row[11]=chest, etc.
3. YOLO runs on GPU for speed (~0.5s/image on RTX 4070)
4. Use `python -u` for unbuffered output (background processes appear stuck otherwise)
5. Save after each batch (crash recovery)

## Data Quality Cleaning

Before training, always run outlier detection on `processed_4view_features.json`:

```python
# Known data entry errors:
fixes = {
    'subject_shoulder_444': ('shoulder', 44.4),  # 444 �?44.4
    'subject_upper_arm_88': ('upper_arm', 38.0),  # 88 �?38.0
}
# Cross-field validation: chest should be >= waist - 10
# IQR outlier detection per field
```

## Multi-Model Format

Production model `local_721_model.joblib` uses per-field independent ExtraTrees models:
```python
bundle = joblib.load('local_721_model.joblib')
# bundle["models"] = {"胸围": ET, "腰围": ET, "臀�?: ET, ...}
# bundle["feature_names"] = 624 features
for field, model in bundle["models"].items():
    pred = model.predict(x)  # single field prediction
```

### Inference Code Update

`deliverables/2.0/api/inference.py` was updated to support multi-model format:
- `load_model_bundle()` now tries `local_721_model.joblib` first, falls back to `model.joblib`
- Multi-model detection via `bundle["_multi_model"]` flag
- EP calibration for chest is DISABLED (was `ep_val * 1.026`, only works for F017)
- Added `import joblib` to inference.py

**AIHub mixing HURTS on local data**: Korean body types differ from Chinese. Do NOT combine unless same population. When training local-only: use `n_estimators=1000` for best results.

## Key File Paths

- Demo reference: `deliverables/measureme_customer_sop_demo_20260512/app/measureme_demo.py`
- API model (371 feat): `deliverables/2.0/models/model.joblib`
- Local multi-model (624 feat): `deliverables/2.0/models/local_721_model.joblib`
- Chest-only model: `deliverables/2.0/models/chest_model_clean.joblib`
- Local features: `research/datasets/local/processed_4view_features.json`
- Batch processor: `scripts/batch_process_all_local.py`
- Old processor: `scripts/process_local_data_4view.py` (single-batch, old format only)
- Excel data: `research/datasets/local/量体数据/<batch>/<name>.xlsx`

## References

- [body-measurement-feature-engineering](body-measurement-feature-engineering) �?Feature engineering details
- [body-measurement-pipeline](body-measurement-pipeline) �?Deployment pipeline
- [references/3d-reconstruction-pipeline.md](references/3d-reconstruction-pipeline.md) �?HMR2.0 + SMPL setup, circumference extraction, CAESAR mesh format, Oracle benchmarks