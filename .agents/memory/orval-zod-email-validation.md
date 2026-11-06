---
name: Orval and Zod email validation
description: Compatibility edge case when OpenAPI email formats generate Zod validators.
---

When Orval emits `zod.email()` for an OpenAPI `format: email`, the generated validator does not compile against Zod 3, where email validation is a string method. Prefer an OpenAPI `pattern` unless the generator and Zod versions are upgraded together.

**Why:** Code generation succeeded, but the generated validator failed TypeScript compilation because the emitted API did not match the installed Zod version.

**How to apply:** For new email fields in API specs, inspect generated Zod code and run API code generation plus typecheck before relying on the schema.