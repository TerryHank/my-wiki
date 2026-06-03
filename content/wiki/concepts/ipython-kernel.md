---
type: concept
title: IPython Kernel
created: 2026-05-30
updated: 2026-05-30
tags: [development-tool, python, notebook]
related: [azure-ml, conda, jupyter]
sources: ["Azure ML 快速入门教程.md"]
---
# IPython Kernel

An **IPython Kernel** is the computational engine that executes code within a Jupyter Notebook or similar interactive environment. It acts as a bridge between the user interface (the notebook) and the programming language runtime (e.g., Python).

## Role in Cloud Development

In cloud environments like [[azure-ml]], creating a custom IPython kernel is essential for linking a notebook interface to a specific [[conda]] virtual environment. By default, notebooks may run on a system-wide Python installation which lacks project-specific dependencies.

## Configuration Process

To enable a notebook to use a custom environment (e.g., `yolov5env` for [[ultralytics-yolo]]):
1.  Activate the target Conda environment in the terminal.
2.  Install the `ipykernel` package within that environment.
3.  Register the kernel using `python -m ipykernel install --user --name <env-name> --display-name "<Display Name>"`.

Once registered, the kernel appears in the notebook's kernel selector menu, allowing code cells to execute with the correct library versions and paths. This is critical for ensuring reproducibility and avoiding dependency conflicts during interactive experimentation.