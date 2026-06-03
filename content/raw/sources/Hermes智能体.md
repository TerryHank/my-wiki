     1|---
     2|title: Hermes Agent
     3|created: 2026-05-30
     4|updated: 2026-05-30
     5|type: entity
     6|tags: [tool, agent, ai, open-source]
     7|sources: [Hermes session history, llm-wiki skill]
     8|confidence: high
     9|---
    10|
    11|# Hermes Agent
    12|
    13|Nous Research 推出的开源自主 AI 智能体，具备"自进化记忆循环"。
    14|
    15|## 关键信息
    16|- **版本**: v0.15.2
    17|- **安装**: `npm install -g @nousresearch/hermes-agent`
    18|- **配置**: ~/.hermes/config.yaml + ~/.hermes/.env
    19|- **技能目录**: ~/AppData/Local/hermes/skills/
    20|- **插件目录**: ~/AppData/Local/hermes/plugins/
    21|
    22|## 核心特性
    23|- **自进化**: 能自己写脚本、执行任务，将新知识固化为 SKILL.md
    24|- **常驻后台**: Gateway 模式 24 小时运行
    25|- **多平台**: CLI / Telegram / Discord / Obsidian
    26|- **工具调用**: terminal, file, browser, web 等内置工具
    27|
    28|## 常用命令
    29|```bash
    30|hermes setup                # 初始设置
    31|hermes config set <key> <value>  # 修改配置
    32|hermes gateway run          # 前台运行 gateway
    33|hermes gateway install      # 安装为系统服务
    34|hermes plugins list         # 查看插件状态
    35|hermes plugins install <repo> --enable  # 安装插件
    36|hermes --yolo               # 一次性跳过审批
    37|```
    38|
    39|## 审批模式
    40|```bash
    41|hermes config set approvals.mode off  # 自动执行，无需审核
    42|```
    43|
    44|## Provider 配置要点
    45|- **必须用 `custom` provider** — 其他 provider 会标准化模型名
    46|- **不要用 `anthropic` provider** — kiro-gateway 仅支持 OpenAI 格式
    47|- **不要走 Cloudflare** — httpx 客户端会被 CF WAF 拦截返回 403
    48|
    49|## 相关
    50|- [[obsidian-hermes-console]] — Obsidian 插件
    51|- [[LLM-Wiki模式]] — 知识库构建模式
    52|- [[Hermes配套工具]] — WebUI / herm TUI
    53|