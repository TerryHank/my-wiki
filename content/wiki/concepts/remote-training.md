---
type: concept
title: Remote Training
created: 2026-04-29
updated: 2026-04-29
tags: [cloud-computing, machine-learning, ultralytics, workflow]
related: [ultralytics-api-keys, ultralytics-yolo, ai-gym-module]
sources: ["API 密钥.md"]
---
# Remote Training

**Remote Training** is a workflow pattern where model training processes are offloaded to cloud infrastructure while being initiated and monitored from local environments or edge devices. In the context of the Ultralytics ecosystem, this allows developers to leverage scalable cloud GPUs without managing the underlying hardware directly.

## Mechanism

Remote training is enabled by authenticating local scripts with the [Ultralytics Platform](https://platform.ultralytics.com) using [[ultralytics-api-keys]]. When a training command is executed locally with a valid key, the system streams metrics to the cloud dashboard and can utilize cloud resources for the actual computation depending on the configuration.

## Prerequisites

1.  **Authentication**: A valid API key with the `training` scope.
2.  **Version Compatibility**: The local environment must have `ultralytics>=8.4.0` installed. Older versions lack the necessary protocols for platform communication.
3.  **Network Access**: The training node must have outbound internet access to reach `platform.ultralytics.com`.

## Application in This Project

- **AI Gym Module**: The [[ai-gym-module]] can utilize remote training to refine pose estimation models on large datasets without tying up local development machines.
- **CI/CD Pipelines**: Automated tests can trigger small-scale training runs to validate model changes, using scoped keys with limited permissions to ensure security.

## Security Considerations

Since remote training requires write access to models and datasets, the associated API keys should be:
- Stored securely in environment variables (`ULTRALYTICS_API_KEY`).
- Rotated periodically.
- Restricted to the `training` and `models` scopes only, avoiding `admin` privileges unless absolutely necessary.

## Related
- [[ultralytics-api-keys]]: The credential mechanism enabling this workflow.
- [[least-privilege-principle]]: The security strategy applied to key scope selection.