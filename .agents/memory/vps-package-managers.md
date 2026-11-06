---
name: VPS and package managers
description: Cross-package-manager constraints for installing and building AtWassup on a VPS.
---

When supporting npm commands in this pnpm workspace, keep npm workspace declarations and explicit package ranges compatible with pnpm's local linking. npm's `min-release-age` uses days, while pnpm's `minimumReleaseAge` uses minutes. Keep the VPS npm workspace limited to the website, API, and their runtime libraries; including code-generation or database-tooling workspaces adds unnecessary packages and can trigger engine warnings. When generating the VPS lockfile in Replit, explicitly use `https://registry.npmjs.org`; the default Replit proxy URLs are inaccessible from outside Replit. Assets required by production should live under the artifact source, not `attached_assets`, which is globally ignored here.

**Why:** The package managers do not share workspace/catalog syntax or the units for their release-age safeguards; mismatches can break installs or weaken supply-chain protections. Replit-generated absolute package URLs also made VPS installs wait on an unreachable private host, and globally ignored uploads are absent from Git-based VPS copies.

**How to apply:** Validate `npm install` and `npm run build` in a clean copy, then restart the configured pnpm workflows to confirm Replit remains functional.
