# TODO - CV Website Improvements

## =4 HIGH PRIORITY (This Week)

### Component Cleanup
- [ ] Remove duplicate ExperienceCard component from `/src/components/ExperienceCard.astro`
- [ ] Keep only `/src/components/mdx/ExperienceCard.astro` 
- [ ] Consolidate layout approach - choose between CVLayout and CVLayoutWithFooter
- [ ] Update imports if layout changes

### File Cleanup
- [ ] Delete unused component files:
  - `/src/components/Footer.astro`
  - `/src/components/SidebarContent.astro`
  - `/src/components/MobileSidebar.astro`
  - `/src/components/ThemeSwitcher.astro`
  - `/src/components/MDXComponents.astro`
- [ ] Remove unused content files:
  - `/src/content/cv.md`
  - `/src/content/cv.mdx`
  - `/src/content/meta.mdx`
- [ ] Clean up unused layout: `/src/layouts/CVLayoutWithFooter.astro`

### 🎨 VISUAL DESIGN FIXES (CRITIQUE)

#### Theme System Consolidation
- [ ] **URGENT**: Remove dual theme system - keep only Zed theme
- [ ] Delete Liquid Glass theme from `global.css` (lines 9-28)
- [ ] Remove glass-wrapper functionality from `CVLayout.astro`
- [ ] Simplify CSS variables to single theme approach

#### Typography Consistency
- [ ] **CRITICAL**: Remove forced monospace from ALL h3 elements (`global.css` line 418)
- [ ] Remove `h3.flex` special case styling (`global.css` line 422)
- [ ] Implement unified typography scale using Zed theme fonts only
- [ ] Fix heading hierarchy: h1 (Lora), h2 (Lora), h3 (Agrandir)

#### Color System Unification
- [ ] Replace hardcoded `bg-blue-500` in ExperienceCard with `var(--cv-accent)`
- [ ] Standardize all color usage to theme variables
- [ ] Remove conflicting color definitions between themes
- [ ] Audit all components for hardcoded colors

#### Component Visual Consistency
- [ ] Fix destructive glass-card hover effects (`global.css` lines 427-436)
- [ ] Remove `border-radius: 0 !important` from hover states
- [ ] Unify card styling across all components
- [ ] Standardize button/badge styling for dates

## =� MEDIUM PRIORITY (Next Sprint)

### Accessibility Improvements
- [ ] Add semantic HTML elements (`<main>`, `<article>`, `<section>`)
- [ ] Add ARIA labels to icon buttons
- [ ] Implement proper heading hierarchy
- [ ] Add keyboard navigation support
- [ ] Verify color contrast ratios

### Performance Optimization
- [ ] Remove `background-attachment: fixed` from global.css (causes mobile repaints)
- [ ] Optimize `will-change` usage in animations
- [ ] Implement `astro:assets` for image optimization
- [ ] Add lazy loading for company logos
- [ ] Optimize background images

### Component Refactoring
- [ ] Create purpose-built Skills component instead of reusing ExperienceCard
- [ ] Add proper TypeScript interfaces for all component props
- [ ] Implement fallbacks for iconify icons
- [ ] Add error boundaries for external dependencies

### 🎨 VISUAL IMPROVEMENTS (MEDIUM)

#### Grid System & Layout
- [ ] Replace fixed 3-column grid with responsive grid system in `GridSection.astro`
- [ ] Implement proper breakpoints: mobile (1col), tablet (2col), desktop (3col)
- [ ] Fix sidebar positioning issues (`global.css` lines 296-300)
- [ ] Standardize spacing scale integration with Tailwind

#### Icon System Standardization
- [ ] Create contextual icon usage guide (dates, titles, actions)
- [ ] Standardize icon sizes: 16px (small), 20px (medium), 24px (large)
- [ ] Replace generic icons with contextual ones:
  - `carbon:calendar` for dates
  - `carbon:document` for titles  
  - `carbon:location` for location
- [ ] Add icon fallbacks for accessibility

#### Animation & Transitions
- [ ] Remove `!important` overrides from hover effects
- [ ] Implement consistent transition timing (0.3s cubic-bezier)
- [ ] Fix glass-card hover background pattern conflicts
- [ ] Add proper focus states for keyboard navigation

## =5 LOW PRIORITY (Future Improvements)

### Security Enhancements
- [ ] Self-host CDN dependencies (Font Awesome, Iconify)
- [ ] Implement Content Security Policy (CSP) headers
- [ ] Add integrity checks for external scripts
- [ ] Review and minimize external dependencies

### Code Quality
- [ ] Add component testing with Vitest
- [ ] Implement ESLint and Prettier configurations
- [ ] Add pre-commit hooks for code quality
- [ ] Create component documentation

### Feature Enhancements
- [ ] Migrate to Astro content collections for type safety
- [ ] Add progressive enhancement with minimal JavaScript
- [ ] Prepare for internationalization (i18n)
- [ ] Add dark mode toggle functionality
- [ ] Implement print-friendly CSS

### Developer Experience
- [ ] Add development scripts for linting and formatting
- [ ] Create component stories for better development
- [ ] Add automated testing pipeline
- [ ] Implement automated dependency updates

## =� Technical Debt Notes

### Current Issues
- **Component Duplication**: ExperienceCard exists in two locations
- **Layout Inconsistency**: Multiple layout approaches causing confusion
- **Unused Files**: 8+ components and content files not being used
- **Mixed Content Strategy**: TypeScript data mixed with unused MDX/Markdown

### Architecture Decisions Needed
- Choose single layout approach (CVLayout vs CVLayoutWithFooter)
- Decide on content strategy (pure TypeScript vs content collections)
- Standardize component organization (flat vs nested directories)
- Define theming approach (current multi-theme vs simplified)

### 🎨 Visual Design Issues
- **Dual Theme Conflict**: Liquid Glass vs Zed themes creating inconsistencies
- **Typography Fracture**: Forced monospace fonts breaking visual hierarchy
- **Color System Chaos**: Hardcoded colors vs theme variables inconsistency
- **Component Visual Mismatch**: Different card styles across components
- **Grid System Rigidity**: Fixed 3-column layout breaking responsive design
- **Icon Usage Inconsistency**: Same icons used for different contexts
- **Animation Conflicts**: Hover effects overriding theme styles with !important

### Performance Considerations
- Mobile performance impacted by `background-attachment: fixed`
- Multiple CDN dependencies affect loading times
- Unused CSS and JavaScript should be purged
- Image optimization not implemented

### Accessibility Gaps
- Missing semantic HTML structure
- No ARIA labels on interactive elements
- Insufficient keyboard navigation support
- Color contrast not verified

---

## <� Success Metrics

### Code Quality
- [ ] TypeScript errors: 0
- [ ] Build time: < 1 second
- [ ] Bundle size: < 50KB
- [ ] Accessibility score: > 90

### Performance
- [ ] Lighthouse Performance: > 95
- [ ] Core Web Vitals: All green
- [ ] Mobile load time: < 2 seconds
- [ ] SEO score: 100

### Maintainability
- [ ] Test coverage: > 80%
- [ ] Documentation coverage: 100%
- [ ] No duplicate code
- [ ] Clear component boundaries

### 🎨 Visual Design Quality
- [ ] Single unified theme system
- [ ] Consistent typography hierarchy
- [ ] Cohesive color palette usage
- [ ] Unified component styling
- [ ] Responsive grid system
- [ ] Contextual icon usage
- [ ] Smooth animations without conflicts

---

*Last updated: 2025-01-08*
*Priority levels: =4 High | =� Medium | =5 Low*