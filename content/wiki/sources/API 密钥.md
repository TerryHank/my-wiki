---
type: source
title: "API Keys: Ultralytics Platform Authentication"
created: 2026-04-29
updated: 2026-04-29
tags: [security, authentication, ultralytics, cloud-integration]
related: [ultralytics-yolo, ultralytics-api-keys, remote-training]
authors: [Ultralytics]
year: 2026
url: https://docs.ultralytics.com/platform/api-keys/
venue: Ultralytics Documentation
sources: ["API 密钥.md"]
---
# API Keys: Ultralytics Platform Authentication

This source document details the authentication mechanism for the [Ultralytics Platform](https://platform.ultralytics.com), enabling secure programmatic access for remote training, inference, and automation.

## Key Takeaways

- **Scoped Permissions**: API keys support granular access control (e.g., `training`, `models`, `datasets`, `read`, `write`, `admin`), enforcing the principle of least privilege.
- **Version Constraint**: Platform integration strictly requires `ultralytics>=8.4.0`. Older versions will fail to authenticate.
- **One-Time Secret**: Keys are displayed only once upon creation. If lost, they cannot be retrieved and must be revoked and regenerated.
- **Environment Variables**: The recommended method for injecting credentials is via the `ULTRALYTICS_API_KEY` environment variable.
- **Security Hygiene**: Best practices include rotating keys every 90 days, using separate keys for different environments (CI/CD, mobile, training), and avoiding key sharing among team members to ensure auditability.

## Usage Patterns

The document outlines specific workflows for creating keys with descriptive names (e.g., `training-server`, `ci-pipeline`) and managing them through the platform settings. It emphasizes that revocation is immediate and affects all dependent applications.

## Connections

This source extends the capabilities of [[ultralytics-yolo]] by defining the cloud integration layer. It is critical for implementing [[remote-training]] workflows and securing the [[embedded-device-workflow]] when edge devices require cloud connectivity.