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
  - `ExperienceCard.astro`: Work experience display with company links, roles, and descriptions
  - `SidebarContent.astro`: Contact info, languages, and interests
  - `MobileSidebar.astro`: Responsive navigation for mobile devices
- **Styling Architecture**: Tailwind CSS with custom theme configuration in `tailwind.config.mjs`:
  - Custom colors: `cv-bg` (background), `cv-paper` (paper texture), `cv-content` (text), `cv-muted`, `cv-light`, `cv-card`, `cv-accent`
  - Custom typography using Cormorant serif font
  - Extensive typography plugin customization for professional appearance

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
- `astro.config.mjs`: Configures Tailwind and MDX integrations
- `tailwind.config.mjs`: Contains custom theme, colors, and typography settings
- `tsconfig.json`: TypeScript configuration extending Astro's base
- `renovate.json`: Automated dependency updates configuration

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
- **Content Collections**: Migrate from MDX to type-safe Astro content collections
- **Image Optimization**: Use `astro:assets` for automatic image optimization
- **Configuration Externalization**: Move hardcoded data to `src/config/` files

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
- Always run `npm run build` before committing to ensure no build errors
- Use `npm run astro check` for TypeScript validation
- Test responsive design on mobile devices due to glass morphism effects
- Verify CDN dependencies are loading correctly

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