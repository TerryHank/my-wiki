---
type: concept
title: 乐观更新 (Optimistic Update)
created: 2026-04-03
updated: 2026-04-03
tags: [ux-pattern, frontend, asynchronous]
related: [acceptance-form-system, vue-3]
sources: ["2026-04-03 验收表单实现.md"]
---

# 乐观更新 (Optimistic Update)

乐观更新是一种前端交互模式，指在发送异步请求（如 API 调用）之前，先立即更新用户界面（UI）状态，假设请求会成功。如果请求最终失败，则回滚 UI 状态并提示错误。

## 核心流程

1. **用户操作**: 用户触发动作（如点击复选框）。
2. **立即响应**: 前端直接修改本地状态，UI 即时反馈变化（无 loading 延迟）。
3. **异步请求**: 后台发送请求到服务器。
4. **成功处理**: 服务器返回成功，保持当前 UI 状态，标记为“已保存”。
5. **失败回滚**: 服务器返回错误，前端将状态还原至操作前，并显示错误提示。

## 本项目实现

在 [[acceptance-form-system]] 中，为了提升 1200 点位大量操作下的用户体验，采用了乐观更新策略：

```typescript
async function toggleResult(scene: SceneName, attemptIndex: number) {
  // 1. 乐观更新：先修改本地 store 状态
  optimisticUpdate(); 
  
  try {
    // 2. 异步发送请求
    await api.updateResult({ pointId, scene, attemptIndex, checked: true });
    // 3. 成功标记
    setSaveState('saved');
  } catch (error) {
    // 4. 失败回滚
    rollback();
    setSaveState('error');
  }
}
```

## 优势

- **零延迟感知**: 用户感觉不到网络延迟，界面响应极快。
- **流畅体验**: 避免频繁的 Loading 状态闪烁，特别适合高频操作场景。

## 风险与应对

- **数据不一致**: 若请求失败，用户可能误以为操作成功。
  - *应对*: 明确的错误提示和自动回滚机制。
- **并发冲突**: 多端操作可能导致状态覆盖。
  - *应对*: 在单机内网场景下风险较低，若需扩展需引入版本号或时间戳校验。
