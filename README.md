# CV Mathieu Drouet - Technical Documentation

[![Performance](https://img.shields.io/badge/Performance-A%2B-brightgreen)](./PERFORMANCE.md)
[![Accessibility](https://img.shields.io/badge/Accessibility-95%25-green)](./ACCESSIBILITY.md)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-blue)](./ACCESSIBILITY.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](./src)

> Professional CV website for Mathieu Drouet, Senior Product Manager, built with modern web technologies and optimized for performance and accessibility.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Architecture Overview

This project uses a modern, performance-optimized architecture designed for maintainability and scalability:

### Core Technologies
- **[Astro 5.9.3](https://astro.build/)**: Static site generator with partial hydration
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling
- **[MDX](https://mdxjs.com/)**: Markdown with JSX components

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Card.astro      # Generic card component
│   ├── ExperienceCard.astro  # Work experience display
│   ├── SidebarContent.astro  # Contact & personal info
│   └── MobileSidebar.astro   # Mobile navigation
├── content/            # Content management
│   └── cv.mdx         # CV content in MDX format
├── layouts/           # Page layouts
│   └── BaseLayout.astro # Main layout with SEO & accessibility
├── styles/            # Global styles
│   └── global.css     # Tailwind + custom CSS
├── config/            # Configuration
│   └── site.ts        # Site metadata & settings
└── utils/             # Utilities
    └── performance.ts # Performance monitoring
```

## 🎨 Design System

### Zed Theme
Based on the Zed editor's clean, modern aesthetic:
- **Background**: `#fdfdfd` (almost white)
- **Paper**: `#ffffff` (pure white)
- **Text**: `#1a1a1a` (dark, 15:1 contrast ratio)
- **Accent**: `#0751cf` (Zed blue)
- **Borders**: `#e5e7eb` (light gray)

### Typography
- **System fonts**: Performance-optimized font stack
- **Responsive sizing**: `clamp()` functions for fluid typography
- **Accessibility**: WCAG AA compliant contrast ratios

### Components
- **Cards**: Consistent styling with hover effects
- **Buttons**: 44px minimum touch targets
- **Links**: External link indicators with icons

## 🔧 Technical Features

### Performance Optimizations
- **Bundle size**: 30KB CSS, 60B JavaScript
- **Service Worker**: Intelligent caching strategies
- **Lazy loading**: Intersection Observer for images
- **Core Web Vitals**: Monitored and optimized
- **Resource hints**: Preloading critical resources

### Accessibility (WCAG 2.1 AA - 95% Compliant)
- **Color contrast**: 4.5:1+ ratios for all text
- **Keyboard navigation**: Full keyboard accessibility
- **Screen readers**: Semantic HTML and ARIA labels
- **Focus management**: Visible focus indicators
- **Motion preferences**: Respects `prefers-reduced-motion`

### Security
- **Content Security Policy**: XSS protection
- **Security headers**: Comprehensive security configuration
- **External links**: `rel=\"noopener noreferrer\"` protection
- **Input validation**: TypeScript type safety

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Layout System
- **Mobile-first**: Progressive enhancement approach
- **Flexible grid**: CSS Grid with responsive columns
- **Touch-friendly**: 44px minimum touch targets
- **Readable text**: Optimal line lengths and spacing

## 🛠️ Development Workflow

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Component props**: Typed interfaces for all components

### Testing Strategy
- **Accessibility testing**: axe-core, WAVE, Lighthouse
- **Performance testing**: Core Web Vitals monitoring
- **Cross-browser testing**: Modern browser compatibility
- **Responsive testing**: Multiple device sizes

### Build Process
- **Static generation**: Pre-rendered HTML for performance
- **Asset optimization**: Images, fonts, and CSS minification
- **Cache busting**: Hash-based asset naming
- **Bundle splitting**: Optimal chunk organization

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Build Output
```
dist/
├── _astro/           # Optimized CSS and JS bundles
├── fonts/            # Font files (if any)
├── images/           # Optimized images
├── logos/            # Company logos
├── index.html        # Main HTML file
├── sw.js            # Service worker
└── _headers         # Cache control headers
```

### Hosting Requirements
- **Static hosting**: Netlify, Vercel, or similar
- **HTTP/2**: For optimal performance
- **SSL/TLS**: HTTPS required for service worker
- **Cache headers**: Configured via `_headers` file

## 📊 Performance Metrics

### Current Performance
- **Lighthouse Score**: 95+/100
- **Core Web Vitals**: All within budget
- **Bundle Size**: 30KB CSS, minimal JS
- **Load Time**: <2s on 3G networks

### Monitoring
- **Real User Monitoring**: Performance tracking
- **Error tracking**: Client-side error monitoring
- **Analytics**: Google Analytics integration
- **Performance budget**: Automated alerts

## 🔐 Security Configuration

### Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://code.iconify.design
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### Best Practices
- **Dependencies**: Regular security updates
- **Secrets**: No sensitive data in repository
- **HTTPS**: Required for production
- **Permissions**: Minimal required permissions

## 🧪 Testing

### Accessibility Testing
```bash
# Manual testing checklist
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast validation
- [ ] Focus management
```

### Performance Testing
```bash
# Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
```

## 📚 Additional Documentation

- **[Performance Report](./PERFORMANCE.md)**: Detailed performance analysis
- **[Accessibility Report](./ACCESSIBILITY.md)**: WCAG compliance documentation
- **[Architecture Analysis](./CLAUDE.md)**: Technical architecture overview

## 🤝 Contributing

### Code Style
- **2 spaces**: Indentation
- **camelCase**: Variables and functions
- **PascalCase**: Components and types
- **kebab-case**: File names and CSS classes

### Component Guidelines
- **TypeScript interfaces**: For all props
- **Semantic HTML**: Accessibility-first
- **Tailwind CSS**: Utility-first styling
- **Performance**: Optimize for Core Web Vitals

### Commit Messages
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: improve structure
test: add tests
perf: optimize performance
```

## 📄 License

This project is private and proprietary.

## 🙋‍♂️ Support

For technical questions or issues:
- **Email**: mathieu@drouet.io
- **LinkedIn**: [linkedin.com/in/mathieudrouet](https://linkedin.com/in/mathieudrouet)
- **GitHub**: [github.com/izo](https://github.com/izo)

---

**Built with ❤️ using Astro, TypeScript, and Tailwind CSS**