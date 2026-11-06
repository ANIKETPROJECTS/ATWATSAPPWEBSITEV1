---
name: Device preview content sizing
description: Safe-area sizing with the react-device-mockup phone frame.
---

When the phone library supplies its status and navigation safe areas, let the conversation content flex into the remaining screen space instead of giving it a full-device aspect-ratio height.

**Why:** A full-device height inside the already-inset content area pushed the composer below the visible phone screen, even though the outer phone frame looked correct.

**How to apply:** Keep the inner conversation flexible, its scroll area shrinkable, and its header/composer non-shrinking. Check that the composer and home indicator are both visible.
