---
type: article
created_by: hermes-agent
date: 2026-06-01
tags: [LabPC, 模型部署, Ollama, Unsloth, 调试经验]
---

# LabPC 模型部署调试经验

## 问题背景

用户希望在本地运行 Qwen3.6-35B uncensored 模型，探索了多个部署方案。

## 尝试序列

1. **Ollama** (本地 RTX 4070)
2. **vLLM** (服务器)
3. **llama.cpp** (本地)
4. **Unsloth Studio** (远程 10.0.0.102 RTX 4090)
5. **回到 Ollama** (优化配置)

## 测试的量化方案

| 量化方案 | 结果 | 原因 |
|---------|------|------|
| IQ2_M | ❌ 空响应 | 量化过于激进 |
| Q3_K_M | ⚠️ 可能有质量问题 | - |
| Q4_K_M | ✅ 工作正常 | 推荐配置 |
| Q5_K_M | ✅ 工作正常 | 更高质量，更多 VRAM |
| 12B 变体 | ✅ 可用 | 较小模型 |

## 最终配置

### 本地机器 (RTX 4070)

- 方案: Ollama
- 模型: qwen36-35b (Q4_K_M 量化)
- 优化: `--parallel 1` 节省 ~1.5GB VRAM（单用户模式）

### 远程服务器 (10.0.0.102 RTX 4090)

- 用户: zhangwang@10.0.0.102
- 系统: Ubuntu 20.04
- 硬件: RTX 4090 24GB, 62GB RAM
- 方案: Unsloth Studio

## 关键调试经验

### 1. 量化级别选择

**问题**: IQ2_M 量化导致 Qwen3.6-35B 产生空响应

**原因**: 量化过于激进，破坏了模型的关键参数

**解决方案**:
- 使用 Q4_K_M 作为起点（质量与速度平衡）
- 如需更高精度，可尝试 Q5_K_M

### 2. Ollama VRAM 优化

**问题**: 单用户场景下 VRAM 占用过高

**解决方案**:
```bash
ollama run qwen36-35b --parallel 1
```

**效果**: 节省约 1.5GB VRAM

**适用场景**: 单用户访问

### 3. 跨机器部署策略

**本地 + 远程混合**:
- 日常查询: 本地 Ollama (RTX 4070)
- 训练/推理任务: 远程 Unsloth Studio (RTX 4090)

**网络**:
- EasyTier VPN 网状网络: tcp://134.175.238.239:11010
- 网络名: "Robot"

### 4. 模型测试流程

```
选择量化方案 → 小规模测试 → 检查输出质量
    ↓ 如空响应
提高量化精度 → 重新测试 → 验证功能
```

## 技术栈对比

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| Ollama | 简单部署，本地优先 | 单机性能限制 | 日常查询、快速验证 |
| vLLM | 高吞吐，服务化部署 | 配置复杂 | 多用户、生产环境 |
| llama.cpp | 跨平台，灵活 | 手动优化多 | 实验性项目 |
| Unsloth Studio | 训练+推理一体化 | 需要强 GPU | 模型训练、精调 |

## 相关文件和路径

- Hermes 配置: `C:\Users\Virtual\AppData\Local\hermes\config.yaml`
- 历史命令: `C:\Users\Virtual\.hermes_history`
- 远程服务器: zhangwang@10.0.0.102

## 相关链接

- [[实体/LabPC/服务器资源]]
- [[概念/LabPC/模型量化]]
- [[原始资料/LabPC/LabPC-Hermes配置与会话概览]]