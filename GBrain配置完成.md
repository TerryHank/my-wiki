# GBrain + Obsidian + LLM Wiki 配置完成

## ✅ 已完成

1. **GBrain 安装** - v0.42.10.0，编译到 `~/AppData/Local/hermes/bin/gbrain.exe`
2. **数据库初始化** - PGLite 本地模式，无需 Docker/服务器
3. **内容导入** - 410 页 Obsidian 笔记已导入
4. **关键字搜索** - 已可用（无需 API 密钥）

## 📍 当前状态

```
Pages:     410
Chunks:    1823
Links:     0 ( wikilink 解析需要特定格式)
Tags:      64
Embedded:  0 (待配置 API 密钥后构建向量索引)
```

## 🔑 后续配置（可选但推荐）

### 1. 配置嵌入模型 API 密钥

GBrain 支持多种嵌入模型。选择其中一个：

```bash
# 方案 A: OpenAI（推荐，如果你有 key）
export OPENAI_API_KEY="sk-..."
gbrain config set embedding_model openai:text-embedding-3-large

# 方案 B: ZeroEntropy（默认推荐，便宜）
export ZEROENTROPY_API_KEY="..."
gbrain config set embedding_model zeroentropyai:zembed-1

# 方案 C: Voyage
export VOYAGE_API_KEY="..."
gbrain config set embedding_model voyage:voyage-3-large
```

配置后运行：
```bash
gbrain embed --stale   # 为所有页面生成向量嵌入
```

### 2. 启动 MCP 服务器

**本地 stdio 模式**（Claude Code / Codex 直接使用）：

```bash
# 在你的 AI 智能体配置中添加 MCP
claude mcp add gbrain -- gbrain serve
# 或
codex mcp add gbrain -- gbrain serve
```

**远程 HTTP 模式**（多台机器共享一个大脑）：

```bash
# 启动 HTTP MCP 服务器
gbrain serve --http --port 8765

# 在其他机器上连接
gbrain connect http://192.168.10.118:8765 --token YOUR_TOKEN
```

### 3. 搜索模式配置

当前默认模式：`conservative`（成本最低）

```bash
# 查看当前配置
gbrain search modes

# 切换模式（根据预算和模型选择）
gbrain config set search.mode balanced    # Sonnet 级
gbrain config set search.mode tokenmax    # Opus/前沿模型
```

## 📊 成本参考

| 模式 | Haiku 4.5 | Sonnet 4.6 | Opus 4.7 |
|------|-----------|------------|----------|
| conservative | $40/mo | $120/mo | $200/mo |
| balanced | $100/mo | $300/mo | $500/mo |
| tokenmax | $200/mo | $600/mo | $1,000/mo |

（基于 10K 查询/月，可按比例缩放）

## 🔍 使用示例

```bash
# 关键字搜索（无需嵌入）
gbrain search "ROS2 控制"

# 语义查询（需要嵌入）
gbrain query "ROS2 如何控制差分驱动机器人？"

# 获取特定页面
gbrain get "raw/ros2 机器人控制"

# 列出所有页面
gbrain list -n 20

# 查看统计
gbrain stats
```

## 🔄 实时同步

让 GBrain 持续监听 Obsidian 变更：

```bash
# 前台轮询模式（每 60 秒）
gbrain sync --watch --repo D:\MyWiki\content

# 安装为守护进程（推荐）
gbrain sync --install-cron
```

## 🛠️ 故障排查

```bash
# 健康检查
gbrain doctor --json

# 应用迁移（如果 schema 版本不匹配）
gbrain apply-migrations --yes

# 重置数据库（谨慎！）
rm -rf ~/.gbrain/
gbrain init --pglite
```

## 📚 与 LLM Wiki 的关系

- **LLM Wiki** = 上游「内容生产者」：从论文/PDF/网页提取知识，写入 Obsidian
- **GBrain** = 下游「检索引擎」：读取 Obsidian，建立索引，通过 MCP 服务 AI 智能体

两者完全解耦，不会冲突。LLM Wiki 写文件，GBrain 只读不写。

## 🎯 下一步建议

1. 配置嵌入 API 密钥（推荐 ZeroEntropy 或 OpenAI）
2. 运行 `gbrain embed --stale` 构建向量索引
3. 在 Claude Code/Codex 中添加 MCP：`claude mcp add gbrain -- gbrain serve`
4. 测试查询：问你的 AI 智能体关于知识库的问题

---

配置时间：2026-06-03
GBrain 版本：0.42.10.0
Obsidian 路径：D:\MyWiki\content
数据库位置：C:\Users\TerryHank\.gbrain\brain.pglite