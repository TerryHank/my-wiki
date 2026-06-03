---
type: concept
title: Comet Optimizer
created: 2026-05-30
updated: 2026-05-30
tags: [hyperparameter-optimization, mlops, automation]
related: [hyperparameter-optimization, comet-ml-platform]
sources: ["Comet 日志集成.md"]
---
# Comet Optimizer

The **Comet Optimizer** is a specialized tool within the Comet ML platform designed for **Hyperparameter Optimization (HPO)**. It automates the process of searching for the best model configuration by running multiple experiments with varying hyperparameters based on a defined search space.

## Configuration

The Optimizer is configured via a JSON file that defines:
- **Parameters**: The hyperparameters to tune (e.g., learning rate, batch size, momentum).
- **Search Space**: The range or discrete values for each parameter.
- **Algorithm**: The strategy for selecting the next set of parameters (e.g., Random Search, Bayesian Optimization, Grid Search).

## Execution

In the YOLO integration, the Optimizer is invoked using the `hpo.py` script:
```bash
python utils/loggers/comet/hpo.py --comet_optimizer_config "optimizer_config.json"
```
This script manages the sweep, launching individual training runs with different parameter sets and logging all results to a central Comet Project for comparison.

## Visualization
Comet provides dedicated panels for analyzing optimization sweeps, allowing users to:
- Correlate hyperparameters with performance metrics (e.g., mAP vs. Learning Rate).
- Identify optimal configurations quickly.
- Compare the convergence of different runs side-by-side.

This tool enhances the standard [[hyperparameter-optimization]] workflow by providing a managed interface and advanced visualization specific to the Comet ecosystem.