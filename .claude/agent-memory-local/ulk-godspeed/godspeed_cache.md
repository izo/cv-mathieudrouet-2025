---
name: godspeed-cache
description: Last Godspeed diagnostic snapshot for cv-mathieudrouet-2025 (cache for 30min reuse)
metadata:
  type: project
---

## godspeed_cache
- date: 2026-06-25T00:00:00Z
- last_commit: 0a3587dc131af04f2b1d6ddb1db010906d88ae7b
- modified_files: 0 tracked (2 untracked dirs: .claude/, .ulk-reports/)
- state: RELEASE_READY
- stack: Astro 7 (SSG) / TypeScript 6 / Tailwind CSS 4 / bun 1.3.13 / Vitest 4 / Netlify
- todo_stats:
  - total: 17
  - done: 15
  - p0_remaining: 0
  - format: legacy (Monoboard-style columns, NO kanban-plugin frontmatter)
  - columns: { backlog: 1, todo: 1, in_progress: 0, blocked: 0, done: 15 }
- vault: en attente d'init (no docs/_memory/, no MEMORY.md root)
- docs: full ulk doc set present (00-index through 06-architecture, dated 2026-04-10)
- tests: 38 (cvParser.test.ts=20, integration.test.ts=18), Vitest, coverage threshold 80%

**How to apply:** On next scan, if HEAD == this commit AND age < 30min, return this without full rescan. Format is legacy — Bruce can offer kanban conversion.
