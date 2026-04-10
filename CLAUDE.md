# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Site web CV de Mathieu Drouet — Senior Product Manager. Construit avec Astro (SSG), TypeScript et Tailwind CSS. Déployé sur https://cv.drouet.io via Netlify.

## Commands
- Install: `pnpm install`
- Development: `pnpm run dev` or `pnpm start` (starts server at localhost:4321)
- Build: `pnpm run build` (detects content changes and builds to ./dist/)
- Preview: `pnpm run preview` (preview build locally)
- Type-check: `pnpm run astro check` (validate TypeScript)
- Content Check: `pnpm run content:check` (check for CV content changes)
- Content Watch: `pnpm run content:watch` (watch CV content for changes)
- Build with Watch: `pnpm run build:watch` (starts dev server with content watching)
- Testing: `pnpm run test` (run Vitest tests), `pnpm run test:watch` (watch mode), `pnpm run test:ui` (UI mode), `pnpm run test:coverage` (coverage report)

## Architecture & Structure
- **Content Management**: CV content is stored in `src/content/cv/cv.md` using Markdown format with Astro Content Collections, parsed dynamically through `src/utils/cvParser.ts`
- **Layout System**: Single unified layout architecture:
  - `BaseLayout.astro`: Base layout with HTML structure, meta tags, CSP headers, and conditional footer
  - Responsive design with mobile-first approach
- **Component Organization**:
  - `ExperienceCard.astro`: Work experience display with company links, roles, and descriptions (mobile responsive with flexbox)
  - `ContactModal.astro`: Contact form modal using Netlify Forms (works in production only)
  - `cv/CVCard.astro`: CV-specific card component with icon support
  - `cv/CVGrid.astro`: Grid layout system for CV sections
  - `cv/CVSection.astro`: Section headers with icons
- **Styling Architecture**: Tailwind CSS with Lumon Design System configuration in `tailwind.config.mjs`:
  - **Lumon Theme** (default): Green-based color system with square design aesthetic
  - **Atari Theme**: Blue/beige palette, retro CRT style — set via `theme: "atari"` in `cv.md` frontmatter
  - **Typography**: IBM Plex Sans/Mono + Lora fonts via Google Fonts (async loaded)
  - **Legacy CV Colors**: Mapped for backward compatibility (`cv-bg`, `cv-paper`, `cv-content`, etc.)
- **Icons**: Iconify icons via CDN with proper CSP configuration for external APIs
- **Security**: Content Security Policy configured in BaseLayout with proper directives for all external resources

## Gotchas
- **Fetch réseau au build** : `ExperienceCard.astro` et `CVCard.astro` fetchent des SVG depuis `api.iconify.design` pendant le build SSG — un timeout réseau fait échouer le build
- **Formulaire de contact** : `ContactModal.astro` utilise Netlify Forms ; ne fonctionne pas en local ni hors Netlify
- **Format Markdown strict** : `cvParser.ts` attend un format précis dans `cv.md` (icônes, rôles, périodes). Un écart de format drop silencieusement les entrées sans erreur
- **Détection poste actuel** : `current: true` si la période contient l'année en cours (`new Date().getFullYear()`)

## Key Configuration Files
- `astro.config.mjs`: Configures integrations, build optimizations, and Vite plugins
- `tailwind.config.mjs`: Lumon Design System theme, colors, and typography settings
- `tsconfig.json`: TypeScript configuration extending Astro's base
- `renovate.json`: Automated dependency updates configuration
- `src/config/site.ts`: Site configuration including personal info, social links, and SEO settings
- `src/config/env.ts`: Environment-specific configuration with type safety and security settings
- `src/config/images.ts`: Mapping company name → logo file in `public/logos/`
- `public/sw.js`: Service worker for performance optimization with intelligent caching
- `public/_headers`: Netlify cache control and security headers

## Security Architecture
- **Content Security Policy**: Properly configured CSP headers in BaseLayout.astro allowing:
  - Google Fonts: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`
  - Iconify APIs: `https://api.iconify.design`, `https://api.simplesvg.com`, `https://api.unisvg.com`
  - Iconify CDN: `https://code.iconify.design`
- **Environment Configuration**: Type-safe environment management with security controls
- **Static Site Generation**: Reduced attack surface through pre-rendering
- **External Link Security**: Proper `rel="noopener noreferrer"` attributes on external links

## Performance Architecture
- **Bundle Optimization**: 31KB CSS bundle, minimal JavaScript footprint
- **Font Loading**: Asynchronous Google Fonts loading with fallback handling
- **Service Worker**: Intelligent caching for static assets with cache invalidation
- **Build Pipeline**: Content change detection (SHA-256) to avoid unnecessary rebuilds
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics

## Implementation Guidelines

### Development Workflow
- Always run `pnpm run build` before committing to ensure no build errors
- Use `pnpm run astro check` for TypeScript validation
- Run `pnpm run test` to execute the full test suite (38 tests : 20 unit + 18 integration)

### Code Quality Standards
- All components must have TypeScript interfaces for props
- Follow existing naming conventions (cv-* for custom CSS classes)
- Maintain consistent 2-space indentation
- Use semantic HTML elements for accessibility

### Security Practices
- Validate all external links include proper rel attributes
- Review any new CDN dependencies for supply chain risks
- CSP is properly configured — update BaseLayout.astro when adding new external resources

## Content Management System

### Dynamic Markdown Parsing
- **Source**: `src/content/cv/cv.md` - Single source of truth for CV content
- **Parser**: `src/utils/cvParser.ts` - Converts Markdown to structured TypeScript data
- **Integration**: Astro Content Collections automatically handle frontmatter and content separation
- **Change Detection**: `scripts/watch-content.js` - Detects content changes during build (SHA-256)

### Content Structure

The CV content follows a specific Markdown format parsed by `cvParser.ts`:

```markdown
---
name: "Mathieu Drouet"
title: "Senior Product Manager"
description: "CV description"
iconSet: "carbon"           # Icon set to use (carbon, tabler, lucide, heroicons)
theme: "lumon"              # Theme variant (lumon, atari)
---

# Mathieu Drouet

## **carbon:icon-name** Education

### Degree Title
Institution, City – YYYY–YYYY

## **carbon:identification** Coordonnées

**carbon:email** **Email:** email@example.com
**carbon:globe** [**Portfolio**](https://example.com)
**carbon:logo-linkedin** [**LinkedIn**](https://linkedin.com/in/username)
**carbon:location-heart-filled** **Localisation:** City, Country

## **carbon:gamification** Centres d'intérêt

**carbon:camera-action** Photography
**carbon:music** Music

## Expériences

### Company Name
**carbon:location-heart-filled** Location – YYYY
**Role Title** | YYYY | [Company Link](https://company.com)

- Achievement with **bold** text
- Another achievement

## Compétences

### Category Title **carbon:cognitive**
**Subtitle** | **carbon:badge** Level

- Skill item 1
- Skill item 2
```

### Icon Format
- Section icons: `## **carbon:icon-name** Section Title`
- Inline icons: `**carbon:icon-name** Text content`
- Skill icons: `### Title **carbon:icon-name**` (icon after title)
- Level icons: `**Subtitle** | **carbon:icon-name** Level`

### Supported Icon Sets
- `carbon` (default): IBM Carbon Design icons
- `tabler`: Tabler icons
- `lucide`: Lucide icons
- `heroicons`: Hero icons

### Change Detection System
- **Cache File**: `.content-cache.json` - Stores content hash and modification timestamp
- **Build Integration**: `pnpm run build` automatically checks for content changes
- **Hash Comparison**: SHA256 hashing detects even minor content modifications

### Editing Workflow
1. Edit `src/content/cv/cv.md` directly
2. Run `pnpm run build` to detect changes and rebuild
3. Content is automatically parsed and integrated into the design system

## Testing Architecture
- **Vitest**: Testing framework with UI mode and coverage reporting
- **Test Commands**: `pnpm run test`, `pnpm run test:watch`, `pnpm run test:ui`, `pnpm run test:coverage`
- **Coverage**: @vitest/coverage-v8 — seuil minimum 80% (branches, functions, lines, statements)
