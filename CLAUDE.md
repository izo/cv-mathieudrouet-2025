# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Install: `npm install`
- Development: `npm run dev` (starts server at localhost:4321)
- Build: `npm run build` (builds to ./dist/)
- Preview: `npm run preview` (preview build locally)
- Type-check: `npm run astro check` (validate TypeScript)

## Code Style Guidelines
- **TypeScript**: Use TypeScript for type safety (extends astro/tsconfigs/base)
- **Component Structure**: Use Astro components (.astro) with frontmatter (---) for component logic
- **Styling**: Use Tailwind CSS for styling (avoid custom CSS when possible)
- **Props**: Define interfaces for component props with clear types
- **Formatting**: Use consistent indentation (2 spaces) and meaningful variable names
- **Imports**: Group imports by type (Astro, React, utilities)
- **Custom Colors**: Use predefined colors from tailwind.config.mjs
- **Error Handling**: Use appropriate error handling for async operations
- **Naming**: Use camelCase for variables/functions, PascalCase for components