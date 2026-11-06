---
name: VPS and package managers
description: Cross-package-manager constraints for installing and building AtWassup on a VPS.
---

When supporting npm commands in this pnpm workspace, keep npm workspace declarations and explicit package ranges compatible with pnpm's local linking. npm's `min-release-age` uses days, while pnpm's `minimumReleaseAge` uses minutes. Keep the VPS npm workspace limited to the website, API, and their runtime libraries; including code-generation or database-tooling workspaces adds unnecessary packages and can trigger engine warnings.

**Why:** The package managers do not share workspace/catalog syntax or the units for their release-age safeguards; mismatches can break installs or weaken supply-chain protections. Optional OpenAPI codegen dependencies also pulled packages requiring a newer Node release than the app itself.

**How to apply:** Validate `npm install` and `npm run build` in a clean copy, then restart the configured pnpm workflows to confirm Replit remains functional.
