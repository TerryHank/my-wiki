---
type: concept
title: Key Rotation
created: 2026-04-29
updated: 2026-04-29
tags: [security, maintenance, lifecycle-management]
related: [ultralytics-api-keys, least-privilege-principle]
sources: ["API 密钥.md"]
---
# Key Rotation

**Key Rotation** is the security practice of periodically replacing cryptographic credentials (such as API keys) to mitigate the risk of compromise. Even if a key has not been explicitly leaked, regular rotation limits the time window an attacker can exploit a stolen credential.

## Recommended Schedule

For sensitive applications interacting with the Ultralytics Platform, a rotation schedule of **every 90 days** is recommended.

## Rotation Workflow

1.  **Generate**: Create a new API key in the Ultralytics Platform with the same scopes as the expiring key.
2.  **Deploy**: Update the environment variables (`ULTRALYTICS_API_KEY`) in all dependent systems (servers, CI pipelines, edge devices) with the new key.
3.  **Verify**: Confirm that all services are functioning correctly with the new credential.
4.  **Revoke**: Once verification is complete, revoke the old key in the platform dashboard.

## Challenges

- **Downtime Risk**: If the new key is deployed but fails (e.g., due to a typo or missing scope), services may break before the old key is revoked.
- **Hardcoded Secrets**: Rotation is difficult if keys are hardcoded in source code rather than managed via environment variables or secret managers. This reinforces the need for the [[embedded-device-workflow]] to use secure injection methods.

## Connection to One-Time Secrets

Since Ultralytics API keys are **One-Time Secrets** (displayed only once), rotation requires generating a completely new key rather than "refreshing" an existing one. The old key must be explicitly revoked to invalidate it.

## Related
- [[ultralytics-api-keys]]: The credential type being rotated.
- [[one-time-secret-display]]: The security pattern necessitating careful handling during rotation.