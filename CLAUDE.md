# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal CV/resume website for Mathieu Drouet built with Astro v5.9.3, TypeScript, and Tailwind CSS. The site is statically generated and deployed to https://cv.mathieu-drouet.com.

## Commands
- Install: `npm install`
- Development: `npm run dev` (starts server at localhost:4321)
- Build: `npm run build` (builds to ./dist/)
- Preview: `npm run preview` (preview build locally)
- Type-check: `npm run astro check` (validate TypeScript)

## Architecture & Structure
- **Content Management**: CV content is stored in `src/content/cv.mdx` using MDX format, allowing rich text formatting with React components
- **Layout System**: Two-layout architecture:
  - `Layout.astro`: Base layout with HTML structure and meta tags
  - `CVLayout.astro`: Specific CV layout with sidebar (desktop) and mobile sidebar (responsive)
- **Component Organization**:
  - `Card.astro`: Reusable card component for section containers
  - `MobileSidebar.astro`: Responsive navigation for mobile devices
- **Styling Architecture**: Tailwind CSS with custom theme configuration in `tailwind.config.mjs`:
  - Custom colors: `cv-bg` (background), `cv-paper` (paper texture), `cv-content` (text)
  - Custom typography using Cormorant serif font
  - Extensive typography plugin customization for professional appearance

## Code Style Guidelines
- **TypeScript**: Use TypeScript for type safety (extends astro/tsconfigs/base)
- **Component Structure**: Use Astro components (.astro) with frontmatter (---) for component logic
- **Styling**: Use Tailwind CSS for styling (avoid custom CSS when possible)
- **Props**: Define interfaces for component props with clear types
- **Formatting**: Use consistent indentation (2 spaces) and meaningful variable names
- **Imports**: Group imports by type (Astro, React, utilities)
- **Custom Colors**: Use predefined colors from tailwind.config.mjs (cv-bg, cv-paper, cv-content)
- **Error Handling**: Use appropriate error handling for async operations
- **Naming**: Use camelCase for variables/functions, PascalCase for components

## Key Configuration Files
- `astro.config.mjs`: Configures Tailwind and MDX integrations
- `tailwind.config.mjs`: Contains custom theme, colors, and typography settings
- `tsconfig.json`: TypeScript configuration extending Astro's base
- `renovate.json`: Automated dependency updates configuration