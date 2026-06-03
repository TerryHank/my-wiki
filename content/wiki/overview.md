---
type: overview
title: My Knowledge Base
created: 2026-04-03
updated: 2026-04-29
tags: [overview]
related: []
sources: ["2026-04-03 验收表单实现.md", "2026-04-04 矩阵工作台实现.md", "AI 健身房.md", "AI 陪伴型机器人.md", "AI 陪伴机器人需求文档_1.md", "API 密钥.md"]
---
# Welcome to My Knowledge Base

This is my personal knowledge base, primarily focusing on **AI-assisted development**, **full-stack system architecture**, **robotics**, and **engineering acceptance automation**. The repository documents technical decisions, implementation details, and best practices. The scope now covers **Computer Vision** applications, **Voice/Tactile IoT** devices, and **Cloud Security** practices.

## 📁 Core Domains

- **🤖 AI & Automation**: Exploring the application of AI agents in software development and physical products. This includes **Computer Vision** (using [[ultralytics-yolo]] for [[pose-estimation]] and [[gym-step-counting]]) and **Voice AI** (integrating ASR/LLM/TTS for the [[ai-companion-robot-mvp]]).
- **☁️ Cloud Integration & Security**: A new focus on securing cloud interactions. This involves managing [[ultralytics-api-keys]] with **Scoped Permissions**, adhering to the [[least-privilege-principle]], and implementing [[key-rotation]] policies. It enables [[remote-training]] workflows where heavy computation is offloaded to the Ultralytics Platform.
- **💻 Full-Stack Development**: Documenting lightweight full-stack architecture practices using **Node.js**, **Vue 3**, and **SQLite**. This extends to **Embedded Systems** via the [[embedded-device-workflow]], bridging the gap between web technologies and hardware control.
- **🏗️ Engineering Acceptance**: Implementing digital tools for construction acceptance scenarios. Key innovations include the **Matrix Workbench** with **Dynamic Snake Mapping** and **Sparse Record Patterns** to optimize data entry and visualization.
- **👁️ Computer Vision vs. 🎙️ Voice/Tactile**: The wiki now distinguishes between two distinct product lines:
  - **Visual Analytics**: Focused on camera-based solutions like the AI Gym module for fitness tracking, now enhanced with cloud training capabilities.
  - **Voice/Tactile Interaction**: Focused on camera-less, privacy-friendly devices like the AI Companion Robot, utilizing [[cloud-voice-architecture]] and [[expression-state-machine]] for emotional feedback.
- **🛠️ Tools & Frameworks**: Deep dives into modern tools like **VitePress**, **Vitest**, and embedded hardware stacks, analyzing their unconventional uses and performance optimizations.

## 📂 Directory Structure

- **📥 raw/** — Raw input area
  - `sources/` — Source documents (papers, articles, tutorials, implementation plans)
  - `assets/` — Images, attachments, and other resources
- **📚 wiki/** — Compiled knowledge base
  - `entities/` — Entities (tools, organizations, people, specific project systems, AI models, products)
  - `concepts/` — Concepts, technologies, frameworks, algorithms (e.g., TDD, Grid Mapping, Snake Algorithm, Sparse Record, Pose Estimation, Weak Memory Strategy, Minimum Demo Loop, Remote Training, Least Privilege)
  - `sources/` — Source index
  - `queries/` — Open questions and research topics
  - `comparisons/` — Technology selection comparisons
  - `synthesis/` — Comprehensive summaries and cross-domain conclusions
  - [[wiki/index|Knowledge Base Index]]
- **📤 raw/assets/** — Query results and reports

## Recent Focus

The current primary focus remains the architectural refactoring and implementation of the **Acceptance Form System**. The project has successfully transitioned to the **Option A Matrix Workbench**, employing a **Dynamic Snake Mapping Algorithm** and **Sparse Record Pattern** to enhance efficiency. Strict **TDD** processes ensure quality across the stack.

Simultaneously, the wiki is expanding into **AI-driven physical interaction** and **Cloud Security**:
1.  **Visual Path**: Investigating **Ultralytics YOLO** for automated fitness analytics. A critical update is the integration of **Remote Training** capabilities, which requires strict adherence to `ultralytics>=8.4.0` and secure management of [[ultralytics-api-keys]].
2.  **Voice/Tactile Path**: Launching the **AI Companion Robot MVP**. This direction emphasizes a "subtraction strategy" (no cameras, no apps) to rapidly prototype a plush doll capable of touch feedback and voice dialogue. It introduces new concepts like the [[embedded-device-workflow]], [[cloud-voice-architecture]], [[weak-memory-strategy]], and the newly defined [[minimum-demo-loop]].
3.  **Security Hygiene**: The ingestion of the API Key documentation highlights the need for robust credential management. Future work will ensure all embedded devices and CI pipelines adopt the **Least Privilege Principle** and **Key Rotation** schedules to prevent security debt.

Future work will investigate integration strategies between these domains, such as applying TDD to embedded testing or exploring hybrid models that combine visual and voice inputs for richer interaction.

---

*Built with Quartz v5*