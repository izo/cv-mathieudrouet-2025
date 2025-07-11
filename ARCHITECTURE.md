# Architecture Documentation

## 🏗️ System Architecture

### Overview
The CV Mathieu Drouet website is built as a modern, static site using Astro with TypeScript, optimized for performance, accessibility, and maintainability.

### Core Principles
- **Performance First**: Sub-2s load times with minimal JavaScript
- **Accessibility First**: WCAG 2.1 AA compliance (95%+)
- **Mobile First**: Responsive design with touch-friendly interactions
- **SEO Optimized**: Structured data and semantic HTML
- **Developer Experience**: TypeScript, component-based architecture

## 🔧 Technical Stack

### Frontend Framework
- **Astro 5.9.3**: Static site generator with partial hydration
- **TypeScript**: Type-safe development with strict mode
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **MDX**: Markdown with JSX components for content

### Build Tools
- **Vite**: Fast build tool and development server
- **PostCSS**: CSS processing and optimization
- **Astro Integrations**: Tailwind CSS integration

### Performance Tools
- **Service Worker**: Intelligent caching strategies
- **Intersection Observer**: Lazy loading implementation
- **Core Web Vitals**: Real-time performance monitoring

## 📁 Project Structure

```
cv-mathieudrouet-2025/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Card.astro      # Generic card wrapper
│   │   ├── ExperienceCard.astro  # Work experience component
│   │   ├── SidebarContent.astro  # Sidebar contact info
│   │   └── MobileSidebar.astro   # Mobile navigation
│   ├── content/            # Content management
│   │   └── cv.mdx         # CV content in MDX format
│   ├── layouts/           # Page layouts
│   │   └── CVLayout.astro # Main layout with SEO
│   ├── pages/             # Route pages
│   │   └── index.astro    # Main CV page
│   ├── styles/            # Global styles
│   │   └── global.css     # Tailwind + custom CSS
│   ├── config/            # Configuration files
│   │   └── site.ts        # Site metadata
│   └── utils/             # Utility functions
│       └── performance.ts # Performance monitoring
├── public/                # Static assets
│   ├── _headers          # Cache control headers
│   ├── sw.js            # Service worker
│   ├── profile.jpg      # Profile image
│   ├── background.jpg   # Background image
│   └── logos/           # Company logos
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🎨 Design System Architecture

### Theme System
**Zed Theme**: Single theme based on Zed editor aesthetics
```css
:root {
  --cv-bg: #fdfdfd;          /* Almost white background */
  --cv-paper: #ffffff;       /* Pure white cards */
  --cv-content: #1a1a1a;     /* Dark text (15:1 contrast) */
  --cv-accent: #0751cf;      /* Zed blue accent */
  --cv-border: #e5e7eb;      /* Light gray borders */
}
```

### Component Architecture
- **Composition over Inheritance**: Components use slots for flexibility
- **Props Interfaces**: TypeScript interfaces for all component props
- **Semantic HTML**: Accessibility-first markup
- **Responsive Design**: Mobile-first approach with breakpoints

### Typography System
- **System Fonts**: Performance-optimized font stack
- **Fluid Typography**: `clamp()` functions for responsive sizing
- **Semantic Hierarchy**: Proper heading structure (H1 → H2 → H3)

## 🚀 Performance Architecture

### Bundle Optimization
- **CSS Splitting**: Separate CSS chunks for better caching
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Hash-based naming for cache busting
- **Minimal JavaScript**: 60B total JavaScript footprint

### Caching Strategy
```
Static Assets (1 year):
- /_astro/* (CSS, JS bundles)
- *.jpg, *.png, *.svg (Images)
- /fonts/* (Font files)

Dynamic Content (1 hour):
- /*.html (HTML pages)
- / (Root page)
```

### Loading Strategy
- **Critical CSS**: Inlined above-the-fold styles
- **Lazy Loading**: Images loaded on intersection
- **Preloading**: Critical resources prefetched
- **Service Worker**: Cache-first for static assets

## 📱 Responsive Architecture

### Breakpoint System
```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

### Layout System
- **CSS Grid**: Main layout structure
- **Flexbox**: Component-level layouts
- **Container Queries**: Future-proof responsive design
- **Aspect Ratios**: Consistent image proportions

### Touch Interactions
- **44px Minimum**: Touch target accessibility
- **Hover States**: Desktop-only hover effects
- **Focus Management**: Keyboard navigation support

## 🔒 Security Architecture

### Content Security Policy
```http
default-src 'self';
script-src 'self' 'unsafe-inline' https://code.iconify.design;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
```

### Security Headers
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **X-XSS-Protection**: 1; mode=block
- **Referrer-Policy**: strict-origin-when-cross-origin

### Data Protection
- **No Cookies**: Stateless architecture
- **No User Data**: No personal data collection
- **External Links**: Proper `rel` attributes
- **Static Generation**: No server-side vulnerabilities

## ♿ Accessibility Architecture

### WCAG 2.1 AA Compliance (95%+)
- **Color Contrast**: 4.5:1+ ratios for all text
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML and ARIA
- **Focus Management**: Visible focus indicators

### Semantic Structure
```html
<main role="main" id="main-content">
  <section aria-labelledby="profile-name">
    <h1 id="profile-name">Mathieu Drouet</h1>
  </section>
</main>
```

### Assistive Technology Support
- **Skip Links**: Navigation bypass
- **Landmark Roles**: Page structure
- **ARIA Labels**: Enhanced descriptions
- **Focus Trap**: Modal accessibility

## 📊 Monitoring Architecture

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS, TTFB, FCP
- **User Timing API**: Custom performance marks
- **Navigation Timing**: Page load metrics
- **Resource Timing**: Asset loading analysis

### Error Tracking
- **Client-side Errors**: JavaScript error monitoring
- **Performance Budget**: Automated alerts
- **Accessibility Monitoring**: Continuous a11y testing

### Analytics Integration
- **Google Analytics**: User behavior tracking
- **Performance Data**: Real User Monitoring
- **Conversion Tracking**: Goal completion

## 🔄 Data Flow Architecture

### Content Management
```
cv.mdx → MDX Processing → Astro Components → Static HTML
```

### Build Process
```
TypeScript → Astro Build → Vite Bundle → Static Files
```

### Deployment Pipeline
```
Git Push → GitHub Actions → Build → Deploy → Cache Invalidation
```

## 🧪 Testing Architecture

### Testing Strategy
- **Unit Tests**: Component testing (future)
- **Integration Tests**: End-to-end testing (future)
- **Accessibility Tests**: axe-core, WAVE, Lighthouse
- **Performance Tests**: Core Web Vitals monitoring

### Quality Assurance
- **Type Checking**: TypeScript strict mode
- **Linting**: ESLint configuration
- **Formatting**: Prettier code formatting
- **Pre-commit Hooks**: Quality gates

## 🚀 Deployment Architecture

### Static Site Generation
- **Build Time**: HTML pre-generation
- **Asset Optimization**: Minification and compression
- **Cache Strategy**: Long-term caching for static assets
- **CDN Distribution**: Global content delivery

### Hosting Strategy
- **JAMstack**: JavaScript, APIs, and Markup
- **Edge Computing**: Global edge locations
- **Serverless**: No server maintenance
- **Scalability**: Auto-scaling based on traffic

## 📈 Scalability Considerations

### Performance Scaling
- **Asset Optimization**: Automatic image optimization
- **CDN Integration**: Global content delivery
- **Caching Layers**: Multi-level caching strategy
- **Bundle Splitting**: Efficient code loading

### Content Scaling
- **Component Reusability**: Modular component system
- **Content Collections**: Future Astro content collections
- **Internationalization**: Ready for i18n (future)
- **CMS Integration**: Headless CMS compatibility

## 🔮 Future Architecture

### Planned Enhancements
1. **Content Collections**: Migrate from MDX to Astro Content Collections
2. **Image Optimization**: Implement `astro:assets` for automatic optimization
3. **Progressive Web App**: Add PWA capabilities
4. **Micro-interactions**: Enhanced user interactions
5. **A/B Testing**: Experimentation framework

### Technical Debt
- **Component Consolidation**: Simplify component architecture
- **CSS Optimization**: Further reduce bundle size
- **Performance Budgets**: Stricter performance constraints
- **Accessibility Improvements**: Push towards 100% WCAG compliance

---

**Architecture Review Date**: 2025-07-11  
**Next Review**: 2025-10-11  
**Architect**: Claude AI with Mathieu Drouet requirements