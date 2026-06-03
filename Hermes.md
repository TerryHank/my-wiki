# Knowledge Base — Vault Conventions

## Vault Structure
- `/raw` — source material, clipped articles, research (the input zone)
- `/wiki` — LLM-compiled knowledge base (see Wiki System below)
- `/output` — query results and generated reports
- `/entities` — 实体 (entities, objects, components)
- `/concepts` — 概念 (concepts, theories, principles)
- `/comparisons` — 对比 (comparisons, decision matrices)
- `/queries` — 查询 (saved queries, search patterns)

## Wiki System
You are the librarian of the `wiki/` folder. You write and maintain everything in it.

### Structure
- `wiki/_master-index.md` is the entry point — lists every topic with a one-line description.
- Each topic gets its own subfolder with its own `_index.md` listing all articles.

### Compiling
When I say "compile" or dump new material in `raw/`:
1. Read each raw file
2. Decide which topic it belongs to (or create a new topic folder)
3. Write a wiki article with key takeaways and `[[wiki links]]` to related concepts
4. Update that topic's `_index.md`
5. Update `wiki/_master-index.md`
6. If a raw file spans multiple topics, create articles in both and cross-link

### Querying
When answering questions against the knowledge base:
1. Read `wiki/_master-index.md` first to find the right topic
2. Read that topic's `_index.md` to find relevant articles
3. Read the specific articles
4. Synthesize the answer

### Auditing
When I say "audit" or "lint", review the wiki for:
- Inconsistent or contradictory information
- Missing cross-links between related concepts
- Gaps in coverage
- Suggest improvements, but don't make changes without confirmation

## Quartz Deployment
This vault (`D:\MyWiki`) IS the Quartz project.

### Directory Mapping
- Obsidian vault root = Quartz project root
- All `.md` files are in `content/` equivalent (Quartz reads from root)
- Quartz build output → `public/` (auto-generated, gitignored)
- Quartz config → `quartz.config.yaml` (root level)
- Quartz styles → `custom.scss` (root level)

### Deployment
- Local dev: `npx quartz build --serve --port 8080`
- GitHub Pages: Push to `main` branch → auto-deploy to https://terryhank.github.io/my-wiki/
- Always run from `D:\MyWiki` directory

## Conventions
- Always use `[[wiki links]]` when referencing other notes
- File names: lowercase with hyphens (e.g., `ai-agent-overview.md`)
- Keep articles concise — bullet points over paragraphs
- Always include a `## Key Takeaways` section in wiki articles
- Chinese directory names are OK (实体，概念，对比，查询，原始资料，知识库)
- English file names preferred for compatibility (e.g., `ai-agent.md` not `AI 代理.md`)

## Current Structure
```
D:\MyWiki/
├── .obsidian/          # Obsidian config
├── .git/               # Git version control
├── raw/                # Source material (to be created/migrated)
├── wiki/               # LLM-compiled KB (to be created/migrated)
├── output/             # Query results (already exists as 输出/)
├── entities/           # 实体 (already exists)
├── concepts/           # 概念 (already exists)
├── comparisons/        # 对比 (already exists)
├── queries/            # 查询 (already exists)
├── raw/                # 原始资料 (already exists)
├── knowledge-base/     # 知识库 (already exists)
├── public/             # Quartz build output (gitignored)
├── quartz.config.yaml  # Quartz configuration
├── custom.scss         # Custom styles
└── HERMES.md           # This file - vault conventions
```

## Git Workflow
- Commit frequency: Every meaningful change
- Sync: Obsidian Git plugin auto-syncs every 10 minutes
- Deploy: Push to `main` → GitHub Actions → GitHub Pages
- Branch: Always work on `main` (single-branch workflow)

## RAG Index
- TF-IDF index stored in `.rag_index/`
- Built from all `.md` files in the vault
- Used for semantic search queries

---
**Last updated**: 2026-06-03
**Vault location**: `D:\MyWiki`
**Quartz site**: https://terryhank.github.io/my-wiki/
**Local dev**: http://localhost:8080