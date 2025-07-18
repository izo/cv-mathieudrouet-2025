# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal CV/resume website for Mathieu Drouet built with Astro v5.11.1, TypeScript, and Tailwind CSS. The site is statically generated and deployed to https://cv.drouet.io.

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
- Audit: `pnpm run audit` (run comprehensive audit), `pnpm run audit:watch` (watch mode), `pnpm run audit:export` (export report)

## Architecture & Structure
- **Content Management**: CV content is stored in `src/content/cv/cv.md` using Markdown format with Astro Content Collections, parsed dynamically through `src/utils/cvParser.ts`
- **Layout System**: Single unified layout architecture:
  - `BaseLayout.astro`: Base layout with HTML structure, meta tags, CSP headers, and conditional footer
  - Responsive design with mobile-first approach
- **Component Organization**:
  - `ExperienceCard.astro`: Work experience display with company links, roles, and descriptions (mobile responsive with flexbox)
  - `SidebarContent.astro`: Contact info, languages, and interests (used in index.astro cards)
  - `cv/CVCard.astro`: CV-specific card component with icon support
  - `cv/CVGrid.astro`: Grid layout system for CV sections
  - `cv/CVSection.astro`: Section headers with icons
  - `audit/AuditDashboard.astro`: Comprehensive audit system dashboard
- **Styling Architecture**: Tailwind CSS with Lumon Design System configuration in `tailwind.config.mjs`:
  - **Lumon Theme**: Green-based color system with comprehensive neutral scale
  - **Typography**: IBM Plex Sans/Mono + Lora fonts via Google Fonts (async loaded)
  - **Glass Morphism**: Backdrop blur effects and gradient overlays
  - **Legacy CV Colors**: Mapped for backward compatibility (`cv-bg`, `cv-paper`, `cv-content`, etc.)
  - **No Border Radius**: Clean, square design aesthetic
- **Icons**: Iconify icons via CDN with proper CSP configuration for external APIs
- **Security**: Content Security Policy configured in BaseLayout with proper directives for all external resources

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
- `package.json`: Uses pnpm as package manager with Puppeteer for PDF generation and Vitest for testing
- `src/config/site.ts`: Site configuration including personal info, social links, and SEO settings
- `src/config/env.ts`: Environment-specific configuration with type safety and security settings
- `public/sw.js`: Service worker for performance optimization with intelligent caching

## Audit System Architecture
- **Comprehensive Audit System**: Built-in audit system (`src/utils/auditSystem.ts`) provides automated quality, security, and performance auditing
- **Audit Categories**: Code quality, security, performance, accessibility, and maintainability assessments
- **Automated Scoring**: Generates overall grades and category-specific scores with recommendations
- **Risk Assessment**: Evaluates potential risks and provides mitigation strategies
- **Export Capabilities**: Audit results can be exported in multiple formats (JSON, markdown)
- **Monitoring**: Continuous monitoring with scheduled audits and watch mode

## Security Architecture
- **Content Security Policy**: Properly configured CSP headers in BaseLayout.astro allowing:
  - Google Fonts: `https://fonts.googleapis.com`, `https://fonts.gstatic.com`
  - Iconify APIs: `https://api.iconify.design`, `https://api.simplesvg.com`, `https://api.unisvg.com`
  - Iconify CDN: `https://code.iconify.design`
- **Environment Configuration**: Type-safe environment management with security controls
- **Static Site Generation**: Reduced attack surface through pre-rendering
- **External Link Security**: Proper `rel="noopener noreferrer"` attributes on external links
- **Service Worker Security**: Intelligent caching with origin validation

## Performance Architecture
- **Bundle Optimization**: 31KB CSS bundle, minimal JavaScript footprint
- **Font Loading**: Asynchronous Google Fonts loading with fallback handling
- **Image Optimization**: Proper preloading and lazy loading strategies
- **Service Worker**: Intelligent caching for static assets with cache invalidation
- **Build Pipeline**: Content change detection to avoid unnecessary rebuilds
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics

## Implementation Guidelines

### Development Workflow
- Always run `pnpm run build` before committing to ensure no build errors
- Use `pnpm run astro check` for TypeScript validation
- Run `pnpm run test` to execute the full test suite
- Use `pnpm run audit` to run comprehensive quality checks
- Test responsive design on mobile devices due to glass morphism effects
- Verify CDN dependencies are loading correctly (Iconify, Google Fonts)

### Code Quality Standards
- All components must have TypeScript interfaces for props
- Follow existing naming conventions (cv-* for custom CSS classes)
- Maintain consistent 2-space indentation
- Use semantic HTML elements for accessibility
- Test glass morphism effects across different browsers
- Run audit system to verify code quality metrics

### Performance Considerations
- Monitor CSS bundle size (current: 31KB baseline)
- Avoid adding JavaScript unless absolutely necessary
- Optimize images before adding to public/ directory
- Test animation performance on lower-end devices
- Use the audit system to monitor performance metrics

### Security Practices
- Validate all external links include proper rel attributes
- Review any new CDN dependencies for supply chain risks
- Maintain static site generation for optimal security posture
- CSP is properly configured - update BaseLayout.astro when adding new external resources
- Run security audits using the built-in audit system

### Mobile Responsive Design
- **ExperienceCard.astro**: Uses flexbox layout for proper mobile display
- **Iconify Icons**: Properly configured with CDN and CSP headers
- **Google Fonts**: Async loading with proper fallbacks
- **Service Worker**: Optimized for mobile performance and caching

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

## Testing Architecture
- **Vitest**: Testing framework with UI mode and coverage reporting
- **Test Commands**: `pnpm run test`, `pnpm run test:watch`, `pnpm run test:ui`, `pnpm run test:coverage`
- **JSDOM**: Browser environment simulation for component testing
- **Coverage**: @vitest/coverage-v8 for comprehensive test coverage reporting

## Recent Updates & Status
- ✅ **Layout Architecture**: Consolidated to single BaseLayout.astro with conditional footer
- ✅ **Mobile Responsive**: ExperienceCard.astro fixed for proper mobile display using flexbox
- ✅ **Security**: Content Security Policy properly configured for all external resources
- ✅ **Icons**: Iconify integration working with proper CDN and API access
- ✅ **Performance**: Google Fonts async loading with fallback handling
- ✅ **Content Management**: Dynamic Markdown parsing with Lumon Design System integration
- ✅ **Build Pipeline**: Content change detection with caching system implemented
- ✅ **Audit System**: Comprehensive quality, security, and performance monitoring