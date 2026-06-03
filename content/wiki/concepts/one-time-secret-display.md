---
type: concept
title: One-Time Secret Display
created: 2026-04-29
updated: 2026-04-29
tags: [security, ux-pattern, authentication]
related: [ultralytics-api-keys, key-rotation]
sources: ["API 密钥.md"]
---
# One-Time Secret Display

**One-Time Secret Display** is a security user interface pattern where a sensitive credential (like an API key or password) is shown to the user exactly once—typically immediately after creation—and is never displayed again in plaintext.

## Purpose

This pattern prevents:
- **Admin Insider Threats**: Platform administrators cannot retrieve user secrets from the database.
- **Accidental Exposure**: Reduces the risk of keys being left visible on screens or in browser history.
- **Retrieval Attacks**: Even if an attacker gains read-only access to the user dashboard, they cannot steal existing keys.

## Implications for Users

1.  **Immediate Action Required**: Users must copy the key to a secure location (password manager, `.env` file) immediately upon creation. Closing the modal means the key is lost forever.
2.  **Recovery Procedure**: If a key is lost, it cannot be "retrieved." The only recovery path is **Revocation and Regeneration**:
    - Create a new key.
    - Update all systems with the new key.
    - Revoke the lost key.
3.  **Automation Constraints**: Automated scripts cannot "fetch" an existing key from the platform; they must rely on the key being pushed to them via secure configuration management during the initial setup.

## Context in Ultralytics

The Ultralytics Platform enforces this pattern for [[ultralytics-api-keys]]. This design choice prioritizes long-term security over short-term convenience, necessitating robust local secret management practices like using environment variables (`ULTRALYTICS_API_KEY`).

## Related
- [[key-rotation]]: The process triggered when a one-time secret is lost or expired.
- [[ultralytics-api-keys]]: The specific implementation of this pattern.