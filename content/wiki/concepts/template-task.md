---
type: concept
title: Template Task
created: 2026-05-30
updated: 2026-05-30
tags: [mlops, clearml, automation]
related: [hyperparameter-optimization, remote-execution, clearml-platform]
sources: ["ClearML 日志集成.md"]
---
# Template Task

A **Template Task** is an operational unit within the [[clearml-platform]] workflow used to scale experiments and automate pipelines. It refers to a recorded experiment that serves as a blueprint for cloning and modifying parameters.

## Functionality
- **Reproducibility**: Since ClearML captures the full environment (code, packages, weights) of an experiment, a template task guarantees that any clone starts from an identical baseline.
- **Hyperparameter Optimization**: In HPO workflows, a template task is cloned repeatedly by an optimizer (e.g., Optuna) with varied hyperparameters to search for optimal configurations.
- **Remote Queuing**: A template task can be edited and then enqueued to a specific queue, allowing a [[clearml-agent]] to pick it up and execute it on heterogeneous hardware without manual setup.

## Workflow
1. **Record**: Run a standard training session to create a baseline experiment.
2. **Clone**: Duplicate the experiment in the ClearML UI or via API.
3. **Modify**: Change specific parameters (e.g., learning rate, batch size) in the cloned task.
4. **Execute**: Run the clone locally or enqueue it for remote execution.

This concept bridges the gap between manual experimentation and fully automated CI/CD pipelines for machine learning.