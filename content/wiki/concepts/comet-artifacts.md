---
type: concept
title: Comet Artifacts
created: 2026-05-30
updated: 2026-05-30
tags: [data-management, versioning, mlops]
related: [dataset-versioning, comet-ml-platform, dataset-yaml-config]
sources: ["Comet 日志集成.md"]
---
# Comet Artifacts

**Comet Artifacts** are a data management feature within the Comet ML platform that allows datasets and models to be versioned, stored, and tracked as immutable objects. In the context of YOLO training, Artifacts solve reproducibility issues by ensuring that every experiment is linked to a specific version of the data.

## Key Characteristics

- **Versioning**: Every upload creates a new version, allowing users to track changes in data over time and revert to previous states if necessary.
- **Lineage Tracking**: Artifacts automatically generate lineage graphs, visualizing which experiments consumed specific dataset versions and which models were produced. This provides end-to-end traceability from raw data to final model.
- **Metadata Logging**: When a dataset is uploaded as an Artifact, Comet automatically parses and logs metadata from the configuration file (e.g., `coco128.yaml`), preserving class names and path structures.
- **Direct Integration**: Artifacts integrate seamlessly with the YOLO training pipeline. A dataset YAML file can point directly to an Artifact resource URL (e.g., `path: "comet://workspace/artifact:version"`), allowing the training script to download the correct data version automatically.

## Workflow

1.  **Upload**: Use the `--upload_dataset` flag during training to store the local dataset as a new Artifact version.
2.  **Reference**: Modify the dataset YAML `path` field to point to the Comet Artifact URL.
3.  **Consume**: Run training with the modified YAML; the system resolves the URL and downloads the versioned data.

This pattern complements the [[dataset-yaml-config]] abstraction by adding a remote, versioned storage layer to the local configuration file.