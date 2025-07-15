# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal CV/resume website for Mathieu Drouet built with Astro v5.9.3, TypeScript, and Tailwind CSS. The site is statically generated and deployed to https://cv.mathieu-drouet.com.

## Commands
- Install: `pnpm install`
- Development: `pnpm run dev` or `pnpm start` (starts server at localhost:4321)
- Build: `pnpm run build` (detects content changes and builds to ./dist/)
- Preview: `pnpm run preview` (preview build locally)
- Type-check: `pnpm run astro check` (validate TypeScript)
- Content Check: `pnpm run content:check` (check for CV content changes)
- Content Watch: `pnpm run content:watch` (watch CV content for changes)
- Build with Watch: `pnpm run build:watch` (starts dev server with content watching)

## Architecture & Structure
- **Content Management**: CV content is stored in `src/content/cv/cv.md` using Markdown format with Astro Content Collections, parsed dynamically through `src/utils/cvParser.ts`
- **Layout System**: Two-layout architecture:
  - `Layout.astro`: Base layout with HTML structure and meta tags
  - `CVLayout.astro`: Specific CV layout with sidebar (desktop) and mobile sidebar (responsive)
- **Component Organization**:
  - `ExperienceCard.astro`: Work experience display with company links, roles, and descriptions
  - `SidebarContent.astro`: Contact info, languages, and interests
  - `MobileSidebar.astro`: Responsive navigation for mobile devices
  - `cv/CVCard.astro`: CV-specific card component with icon support
  - `cv/CVGrid.astro`: Grid layout system for CV sections
  - `cv/CVSection.astro`: Section headers with icons
  - `mdx/`: MDX-specific components for content rendering
- **Styling Architecture**: Tailwind CSS with Lumon Design System configuration in `tailwind.config.mjs`:
  - **Lumon Theme**: Green-based color system with comprehensive neutral scale
  - **Typography**: IBM Plex Sans/Mono + Lora fonts via Google Fonts
  - **Glass Morphism**: Backdrop blur effects and gradient overlays
  - **Legacy CV Colors**: Mapped for backward compatibility (`cv-bg`, `cv-paper`, `cv-content`, etc.)
  - **No Border Radius**: Clean, square design aesthetic

## Code Style Guidelines
- **TypeScript**: Use TypeScript for type safety (extends astro/tsconfigs/base)
- **Component Structure**: Use Astro components (.astro) with frontmatter (---) for component logic
- **Styling**: Use Tailwind CSS for styling (avoid custom CSS when possible)
- **Props**: Define interfaces for component props with clear types
- **Formatting**: Use consistent indentation (2 spaces) and meaningful variable names
- **Imports**: Group imports by type (Astro, React, utilities)
- **Custom Colors**: Use predefined colors from tailwind.config.mjs (cv-bg, cv-paper, cv-content, etc.)
- **Error Handling**: Use appropriate error handling for async operations
- **Naming**: Use camelCase for variables/functions, PascalCase for components

## Key Configuration Files
- `astro.config.mjs`: Configures Tailwind integration, build optimizations, and performance settings
- `tailwind.config.mjs`: Contains Lumon Design System theme, colors, and typography settings
- `tsconfig.json`: TypeScript configuration extending Astro's base
- `renovate.json`: Automated dependency updates configuration
- `package.json`: Uses pnpm as package manager with Puppeteer for PDF generation

## Code Analysis & Architecture Review

### Current Status (Last Analysis: 2025-07-07)
**Overall Grade**: B+ (82%) | **Bundle Size**: 31KB CSS only | **Security**: Static site (low risk)

### Architecture Issues Identified
1. **Layout Duplication** 🔴 HIGH PRIORITY
   - `CVLayout.astro` vs `CVLayoutWithFooter.astro` - different slot patterns
   - `index.astro:10-15` architectural mismatch (uses CVLayout but renders Footer outside)
   - **Fix**: Consolidate into single layout with conditional slots

2. **Component Duplication** 🟡 MEDIUM PRIORITY
   - `ExperienceCard.astro` exists in both `/components/` and `/components/mdx/`
   - **Fix**: Single source of truth in `/components/`, re-export from `/mdx/index.ts`

3. **Performance Optimizations** 🟡 MEDIUM PRIORITY
   - `background.jpg` not optimized, potentially large
   - No lazy loading for company logos
   - `background-attachment: fixed` causes mobile repaints
   - **Fix**: Implement `astro:assets`, add lazy loading, remove fixed attachment

### Security Assessment
✅ **Strengths**: Static generation, proper `rel="noopener noreferrer"` on external links
⚠️ **Concerns**: External Font Awesome CDN (supply chain risk)
**Recommendation**: Self-host Font Awesome or implement CSP headers

### Modernization Opportunities
- ✅ **Content Collections**: Successfully migrated to type-safe Astro content collections with dynamic Markdown parsing
- **Image Optimization**: Use `astro:assets` for automatic image optimization
- **Configuration Externalization**: Move hardcoded data to `src/config/` files
- ✅ **Content Change Detection**: Implemented build-time content change detection and caching system

### Performance Metrics
- CSS Bundle: 31KB (excellent)
- JavaScript: 0KB (optimal for CV site)
- Build Time: ~1s (fast)
- Critical Issue: Complex CSS animations without performance considerations

### Recommended Architecture
```
src/
├── config/           # Externalized configuration
├── content/          # Content collections (not MDX)
├── components/       # Single source components
├── layouts/          # Unified layout system
└── utils/           # Shared utilities
```

### Quality Scores
- Design System: 95% ⭐⭐⭐⭐⭐
- TypeScript Usage: 90% ⭐⭐⭐⭐⭐
- Architecture: 70% ⭐⭐⭐⚫⚫
- Performance: 85% ⭐⭐⭐⭐⚫
- Security: 88% ⭐⭐⭐⭐⚫
- Maintainability: 75% ⭐⭐⭐⚫⚫

## Implementation Guidelines

### Priority Development Tasks
1. **Layout Consolidation** - Merge `CVLayout.astro` and `CVLayoutWithFooter.astro`
2. **Component Deduplication** - Standardize `ExperienceCard.astro` location
3. **Performance Optimization** - Implement image optimization and lazy loading
4. **Configuration Externalization** - Move hardcoded values to config files

### Development Workflow
- Always run `pnpm run build` before committing to ensure no build errors
- Use `pnpm run astro check` for TypeScript validation
- Test responsive design on mobile devices due to glass morphism effects
- Verify CDN dependencies are loading correctly (Iconify, Google Fonts)

### Code Quality Standards
- All components must have TypeScript interfaces for props
- Follow existing naming conventions (cv-* for custom CSS classes)
- Maintain consistent 2-space indentation
- Use semantic HTML elements for accessibility
- Test glass morphism effects across different browsers

### Performance Considerations
- Monitor CSS bundle size (current: 31KB baseline)
- Avoid adding JavaScript unless absolutely necessary
- Optimize images before adding to public/ directory
- Test animation performance on lower-end devices

### Security Practices
- Validate all external links include proper rel attributes
- Review any new CDN dependencies for supply chain risks
- Maintain static site generation for optimal security posture
- Consider implementing Content Security Policy for production

## Content Management System

### Dynamic Markdown Parsing
- **Source**: `src/content/cv/cv.md` - Single source of truth for CV content
- **Parser**: `src/utils/cvParser.ts` - Converts Markdown to structured TypeScript data
- **Integration**: Astro Content Collections automatically handle frontmatter and content separation
- **Change Detection**: `scripts/watch-content.js` - Detects content changes during build

### Content Structure
```markdown
---
name: "Mathieu Drouet"
title: "Senior Product Manager"
description: "CV description"
---

# Mathieu Drouet

## Education
### Title
**Period**
Institution

## Experience
### Company
**Role** | Period | [Company Link](url)
- Achievement 1
- Achievement 2

## Skills
### Skill Category
**Subtitle** | Level
- Skill item 1
- Skill item 2
```

### Change Detection System
- **Cache File**: `.content-cache.json` - Stores content hash and modification timestamp
- **Build Integration**: `npm run build` automatically checks for content changes
- **Watch Mode**: `npm run content:watch` continuously monitors for changes
- **Hash Comparison**: SHA256 hashing detects even minor content modifications

### Editing Workflow
1. Edit `src/content/cv/cv.md` directly
2. Run `npm run build` to detect changes and rebuild
3. Content is automatically parsed and integrated into the design system
4. Changes are cached to avoid unnecessary rebuilds

## Memories & Notes
- une remarque , on garde un seul theme = lumon
- ✅ Content management system fully operational - edit `src/content/cv/cv.md` for updates
- ✅ Dynamic Markdown parsing with Lumon Design System integration complete
- ✅ Build-time content change detection implemented