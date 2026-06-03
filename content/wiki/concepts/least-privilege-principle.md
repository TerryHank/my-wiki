---
type: concept
title: Least Privilege Principle
created: 2026-04-29
updated: 2026-04-29
tags: [security, access-control, best-practice]
related: [ultralytics-api-keys, scoped-permissions]
sources: ["API 密钥.md"]
---
# Least Privilege Principle

The **Least Privilege Principle** is a security strategy where users, programs, or processes are granted only the minimum levels of access—or permissions—necessary to perform their specific functions. This minimizes the potential damage from accidents, errors, or malicious attacks.

## Application in Ultralytics Platform

In the context of [[ultralytics-api-keys]], this principle is enforced through **Scoped Permissions**. Instead of using a single "master" key with `admin` rights for all operations, developers should create distinct keys for distinct purposes:

| Use Case | Recommended Scopes | Rationale |
| :--- | :--- | :--- |
| **CI/CD Pipeline** | `models` (read), `datasets` (read) | The pipeline only needs to download models/data to run tests. It should not be able to delete or modify them. |
| **Training Server** | `training`, `models` (write) | Needs to start jobs and save checkpoints, but does not need account management rights. |
| **Mobile App** | `models` (read) | Only needs to download the latest model for inference. |
| **Debugging** | `read` | Allows viewing logs and metrics without risking data modification. |

## Benefits

1.  **Blast Radius Reduction**: If a key used by a mobile app is compromised, the attacker cannot delete datasets or stop training jobs.
2.  **Auditability**: Using separate keys for different services makes it easier to trace which component performed a specific action in the logs.
3.  **Compliance**: Aligns with standard security frameworks required for enterprise software.

## Implementation Steps

1.  Identify the specific actions a component needs to perform.
2.  Create a new API key in the Ultralytics Platform.
3.  Select **only** the scopes matching those actions.
4.  Name the key descriptively (e.g., `ci-pipeline-reader` instead of `my-key`).
5.  Distribute the key only to the intended environment.

## Related
- [[ultralytics-api-keys]]: The entity implementing scoped permissions.
- [[key-rotation]]: A complementary practice to limit the window of opportunity for compromised keys.