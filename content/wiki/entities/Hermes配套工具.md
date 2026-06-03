     1|---
     2|title: Hermes Companion Tools
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, ui, hermes]
     7|sources: [Hermes session history]
     8|confidence: high
     9|---
    10|
    11|# Hermes 配套工具
    12|
    13|## hermes-webui
    14|- **路径**: ~/hermes-tools/hermes-webui/
    15|- **端口**: 8787
    16|- **启动**: `cd ~/hermes-tools/hermes-webui && python server.py`
    17|- **配置**: settings.json → language=zh, show_cli_sessions=true
    18|
    19|## herm (TUI 终端)
    20|- **路径**: ~/hermes-tools/herm/
    21|- **启动**: `cd ~/hermes-tools/herm && bun.cmd run src/index.tsx`
    22|- **Web 模式**: 通过 ttyd 在端口 8686 暴露
    23|
    24|## ttyd 注意事项
    25|- **ttyd 必须用完整路径**: `ttyd.exe -p 8686 C:/Users/TerryHank/AppData/Roaming/npm/bun.cmd run src/index.tsx`
    26|- **Windows PATH**: ttyd 使用 CreateProcess，不识别 bash 的 export PATH
    27|- **bun 路径**: ~/AppData/Roaming/npm/bun.cmd (v1.3.14)
    28|
    29|## auto-start 踩坑
    30|- **Tauri/Electron 应用**: 注册表 Run 键在 DWM 初始化前执行 → "no window found" 崩溃
    31|- **通用修复**: 创建 .bat 包装脚本 + timeout 延迟 + start 命令
    32|- **示例**: `start-easytier.bat` 加 15 秒延迟
    33|
    34|## 相关
    35|- [[Hermes智能体]] — 核心 Agent
    36|