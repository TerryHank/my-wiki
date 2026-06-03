---
type: entity
title: Ultralytics API Keys
created: 2026-04-29
updated: 2026-04-29
tags: [security, authentication, ultralytics, credentials]
related: [ultralytics-yolo, remote-training, embedded-device-workflow, api-keys]
sources: ["API 密钥.md"]
---
# Ultralytics API Keys

**Ultralytics API Keys** are security credentials used to authenticate programmatic access to the [Ultralytics Platform](https://platform.ultralytics.com). They enable features such as remote model training, dataset management, and metric streaming from local scripts or edge devices.

## Key Characteristics

- **Format**: Keys follow the pattern `ul_` followed by 40 hexadecimal characters (43 characters total).
- **Scope-Based Access**: Unlike binary on/off tokens, these keys support granular permissions:
  - `training`: Start training jobs and stream metrics.
  - `models`: Upload, download, and delete models.
  - `datasets`: Access and modify datasets.
  - `read`/`write`: General read-only or full write access.
  - `admin`: Account management (high risk).
- **One-Time Display**: For security, the full key string is shown **only once** immediately after creation. It cannot be viewed again in the dashboard; if lost, it must be revoked and regenerated.

## Usage Guidelines

### Environment Injection
The standard method for using these keys is via the `ULTRALYTICS_API_KEY` environment variable:
```bash
export ULTRALYTICS_API_KEY="ul_your_key_here"
```

### Version Requirement
A critical constraint for using these keys with the Python client is the package version:
> **Requirement**: `ultralytics>=8.4.0`
> Versions older than 8.4.0 do not support platform integration and will fail authentication.

### Security Best Practices
- **Least Privilege**: Create separate keys for specific tasks (e.g., a read-only key for a CI pipeline, a training key for a GPU server).
- **No Sharing**: Team members should generate their own keys to maintain individual audit trails.
- **Rotation**: Implement a rotation policy (e.g., every 90 days) by generating a new key, updating the environment, and revoking the old one.

## Related Concepts
- [[remote-training]]: Uses API keys to offload heavy computation to the cloud.
- [[embedded-device-workflow]]: Requires secure injection of these keys into edge devices without hardcoding.
- [[ultralytics-yolo]]: The underlying library that consumes these keys for cloud features.