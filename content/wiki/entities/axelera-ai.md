---
type: entity
title: Axelera AI
created: 2026-05-30
updated: 2026-05-30
tags: [organization, edge-ai, hardware]
related: [metis-aipu, voyager-sdk, ultralytics-yolo]
sources: ["Axelera 平台.md"]
---
# Axelera AI

**Axelera AI** is a technology company specializing in high-performance, energy-efficient **Edge AI** hardware and software solutions. They are a key partner of **Ultralytics**, providing the **Metis AIPU** (AI Processing Unit) for deploying **YOLO** models at the edge.

## Value Proposition

Axelera AI focuses on **brownfield deployments**, allowing existing PCs and servers to be upgraded with AI acceleration via PCIe cards without replacing the entire system. Their technology leverages **dataflow architecture** and **in-memory computing** to maximize **TOPS-per-watt**, making it ideal for battery-powered devices and high-density video analytics.

## Ecosystem

- **Hardware**: The **Metis** family of accelerators (PCIe, M.2, Compute Boards).
- **Software**: The **Voyager SDK**, which handles model compilation, quantization, and runtime execution.
- **Partners**: Collaborations with **Dell**, **Lenovo**, **Advantech**, and **Ultralytics** to provide pre-validated workstations and seamless model export workflows.

## Current Status

The integration with Ultralytics is currently **experimental** (as of early 2026). Full support, including standard pip installation without hardware dependency for export, is anticipated by **February 2026**.
