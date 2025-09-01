# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route files (e.g., `index.astro`, `about.astro`).
- `src/components/`: Reusable UI (`PascalCase.astro`, e.g., `ExperienceCard.astro`).
- `src/content/`: Markdown content (CV at `src/content/cv/cv.md`).
- `src/layouts/`: Page layouts (e.g., `BaseLayout.astro`).
- `src/utils/`: TypeScript utilities (e.g., `cvParser.ts`).
- `src/config/`: App configuration (`env.ts`, `site.ts`, `images.ts`).
- `src/styles/`: Global styles (`global.css`, Tailwind).
- `public/`: Static assets served as-is.
- `tests/`: Vitest tests and setup.
- `scripts/`: Build helpers (`watch-content.js`).
- Aliases: `@`, `@/components`, `@/utils`, `@/config` resolve to `src/*`.

## Build, Test, and Development Commands
- `pnpm dev` / `pnpm start`: Run Astro dev server.
- `pnpm build`: Content check + production build.
- `pnpm preview`: Serve the built site locally.
- `pnpm build:watch`: Watch CV content and run dev.
- `pnpm content:check|sync|watch`: Manage Markdown content cache.
- `pnpm test` / `pnpm test:watch`: Run tests.
- `pnpm test:coverage` / `pnpm test:ui`: Coverage report / Vitest UI.

## Coding Style & Naming Conventions
- Language: TypeScript + Astro. Indentation: 2 spaces.
- Components: `PascalCase.astro`; utilities: `camelCase.ts`; pages: `kebab-case.astro`.
- Tailwind CSS (utility-first): keep class names declarative and co-locate with templates.
- Imports: prefer aliases (e.g., `import { env } from '@/config/env'`).

## Testing Guidelines
- Framework: Vitest (`vitest.config.ts`). Environment: `node` with `tests/setup.ts`.
- Locations: `tests/**/*.test.ts` or `src/**/*.test.ts`.
- Coverage: global thresholds at 80% (branches, functions, lines, statements). Use `pnpm test:coverage`.
- Conventions: name tests after unit under test (e.g., `cvParser.test.ts`); focus on pure utils.

## Commit & Pull Request Guidelines
- Commits: short, imperative subject; include scope when helpful (e.g., `feat(cv): improve parsing`).
- PRs: clear description, affected pages/components, and any content changes (`src/content/cv/cv.md`).
- Requirements before opening PR: `pnpm test` passes, coverage ≥ 80%, `pnpm build` succeeds, screenshots for UI changes.
- Link related issues; prefer small, focused PRs.

## Security & Configuration Tips
- Configuration lives in `src/config/env.ts` (no secrets in VCS). Adjust flags via exported configs.
- Deploy: Netlify (`netlify.toml`, Node 18). Local verify with `pnpm build && pnpm preview`.
