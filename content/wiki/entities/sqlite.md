---
type: entity
title: SQLite
created: 2026-04-03
updated: 2026-04-03
tags: [database, embedded, serverless, tool]
related: [nodejs, acceptance-form-system, better-sqlite3]
sources: ["2026-04-03 验收表单实现.md"]
---

# SQLite

SQLite 是一个轻量级、自包含、零配置的嵌入式关系型数据库引擎。它以单个文件形式存储数据，无需独立的服务器进程。

## 在本项目中的应用

在 [[acceptance-form-system]] 中，SQLite 被选为单机内网架构的核心数据存储方案：

- **技术选型**: 使用 `better-sqlite3` Node.js 绑定，提供同步 API，简化代码逻辑。
- **数据规模**: 处理中等规模数据（约 1.8 万条记录），性能表现优异。
- **预种子策略**: 系统初始化时一次性生成所有点位和结果记录，利用 SQLite 的事务性能快速完成。

## 数据模型

```sql
-- 点位表
create table if not exists points (
  id integer primary key,
  note text not null default '',
  updated_at text not null
);

-- 结果表 (复合主键)
create table if not exists results (
  point_id integer not null,
  scene text not null,
  attempt_index integer not null,
  checked integer not null default 0,
  updated_at text not null,
  primary key (point_id, scene, attempt_index)
);
```

## 优势与挑战

- **优势**:
  - **零运维**: 无需安装数据库服务器，文件即数据库。
  - **便携性**: 整个应用（代码 + 数据）可轻松迁移。
  - **性能**: 在单机读写场景下，速度极快。
- **挑战**:
  - **并发写入**: 多进程/多线程同时写入时存在锁竞争（本项目为单机单用户，影响较小）。
  - **备份**: 需手动实现文件拷贝或 WAL 模式备份策略。

## 相关工具

- [[Node.js]]: 运行环境。
- [[Better-SQLite3]]: 推荐的 Node.js 驱动库。
