# Deployment Guide

## 📋 Overview

This document outlines the deployment process for the CV Mathieu Drouet website, including hosting requirements, build optimization, and performance monitoring.

## 🚀 Quick Deploy

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git repository access

### Build Commands
```bash
# Install dependencies
npm install

# Run type checking
npm run astro check

# Build for production
npm run build

# Preview build locally
npm run preview
```

## 🏗️ Build Configuration

### Astro Configuration
The project uses optimized build settings in `astro.config.mjs`:

```javascript
{
  build: {
    inlineStylesheets: 'auto',
    split: true,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  }
}
```

### Build Output Structure
```
dist/
├── _astro/                 # Optimized CSS and JS bundles
│   ├── index.yYDl8cu6.css # Main CSS bundle (~30KB)
│   └── *.js               # JavaScript chunks (minimal)
├── _headers               # Cache control headers
├── sw.js                  # Service worker
├── index.html             # Main HTML file
├── favicon.svg            # Favicon
├── profile.jpg            # Profile image
├── background.jpg         # Background image
└── logos/                 # Company logos
```

## 🌐 Hosting Platforms

### Recommended Platforms

#### 1. **Netlify** (Recommended)
```bash
# Deploy to Netlify
npm run build
# Upload dist/ folder or connect Git repository
```

**Configuration:**
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18+
- **Environment**: Production

**Features:**
- Automatic deployments from Git
- Form handling
- Analytics
- Edge functions
- Custom domains

#### 2. **Vercel**
```bash
# Deploy to Vercel
npm run build
# Use Vercel CLI or Git integration
```

**Configuration:**
- **Framework**: Astro
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18+

**Features:**
- Serverless functions
- Analytics
- Edge network
- Custom domains

#### 3. **GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v2
        with:
          path: ./dist
```

## 🔧 Performance Optimization

### Build Optimizations
- **CSS Minification**: Automatic via Astro
- **HTML Compression**: Enabled in config
- **Asset Optimization**: Hash-based naming
- **Code Splitting**: Enabled for better caching

### Cache Configuration
The `_headers` file provides optimal caching:

```
# Static Assets - 1 year cache
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Images - 1 year cache
/*.jpg
  Cache-Control: public, max-age=31536000, immutable

# HTML - 1 hour cache
/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

### Service Worker
Intelligent caching strategy:
- **Cache First**: Static assets, images, fonts
- **Network First**: HTML pages
- **Offline Support**: Basic offline functionality

## 🔒 Security Headers

### Content Security Policy
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://code.iconify.design; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'
```

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📊 Performance Monitoring

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1
- **TTFB**: < 800ms
- **FCP**: < 1.8s

### Monitoring Tools
1. **Google Analytics**: User behavior tracking
2. **Google Search Console**: SEO performance
3. **Lighthouse CI**: Automated performance testing
4. **Real User Monitoring**: Client-side metrics

### Performance Budget
- **CSS Bundle**: 30KB (current: 30KB ✅)
- **JavaScript**: < 100KB (current: 60B ✅)
- **Images**: Optimized and lazy-loaded
- **Fonts**: System fonts for performance

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run astro check
      - run: npm run build
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 SEO Configuration

### Meta Tags
- **Open Graph**: Complete social media integration
- **Twitter Cards**: Twitter-specific metadata
- **Structured Data**: JSON-LD for rich snippets
- **Canonical URLs**: Proper URL canonicalization

### SEO Checklist
- [x] Semantic HTML structure
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [x] Alt text for all images
- [x] Meta descriptions
- [x] Structured data
- [x] XML sitemap
- [x] Robots.txt

## 🧪 Testing Strategy

### Pre-deployment Testing
```bash
# Type checking
npm run astro check

# Build verification
npm run build

# Local preview
npm run preview
```

### Manual Testing Checklist
- [ ] Desktop responsiveness (1920px, 1440px, 1024px)
- [ ] Tablet responsiveness (768px, 1024px)
- [ ] Mobile responsiveness (320px, 375px, 414px)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Performance (Lighthouse score 95+)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Automated Testing
- **Lighthouse CI**: Performance regression testing
- **axe-core**: Accessibility testing
- **WAVE**: Additional accessibility validation
- **Visual regression**: Screenshot comparison

## 🚨 Rollback Strategy

### Immediate Rollback
1. **Netlify**: Use "Rollback to previous deploy" button
2. **Vercel**: Revert to previous deployment
3. **GitHub Pages**: Revert Git commit and push

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force-with-lease
```

## 📞 Support & Maintenance

### Monitoring Checklist
- [ ] Daily: Check Core Web Vitals
- [ ] Weekly: Review performance metrics
- [ ] Monthly: Security audit
- [ ] Quarterly: Dependency updates

### Common Issues & Solutions

#### Build Failures
- **Node version**: Ensure Node.js 18+ is used
- **Dependencies**: Clear node_modules and reinstall
- **TypeScript**: Check for type errors

#### Performance Issues
- **Images**: Optimize large images
- **CSS**: Review for unused styles
- **JavaScript**: Minimize client-side code

#### Security Issues
- **Dependencies**: Update vulnerable packages
- **Headers**: Verify security headers
- **Content**: Validate user-generated content

## 📚 Additional Resources

- **[Performance Report](./PERFORMANCE.md)**: Detailed performance analysis
- **[Accessibility Report](./ACCESSIBILITY.md)**: WCAG compliance documentation
- **[Architecture Overview](./CLAUDE.md)**: Technical architecture details

---

**Last Updated**: 2025-07-11  
**Next Review**: 2025-08-11