# Zed Design System - Complete Implementation Guide

Based on analysis of zed.dev and ZED.md documentation, this guide provides all necessary elements to reproduce the Zed design system.

## 🎨 Color System

### Core Brand Colors
```css
/* Primary accent */
--color-accent-blue: #0751cf;
--color-accent-blue-alt: #084CCF;

/* Neutral base */
--color-neutral: #f6f4ef;
```

### Cream Palette (Warm Tones)
```css
--color-cream-50: #f5f4ef;   /* Very light */
--color-cream-100: #e8e6d9;  /* Light */
--color-cream-200: #d9d5bf;  /* Medium light */
--color-cream-300: #cfcaaf;  /* Medium */
--color-cream-400: #bab38c;  /* Medium dark */
--color-cream-500: #aba273;  /* Base */
--color-cream-600: #998f5c;  /* Dark */
--color-cream-700: #80774d;  /* Darker */
--color-cream-800: #665f3d;  /* Very dark */
--color-cream-900: #4c472e;  /* Extremely dark */
```

### OffGray Palette (Cool Tones)
```css
--color-offgray-50: #f1f2f4;    /* Very light */
--color-offgray-100: #dddfe4;   /* Light */
--color-offgray-200: #c6cad2;   /* Medium light */
--color-offgray-300: #b8bdc7;   /* Medium */
--color-offgray-400: #98a0ae;   /* Medium dark */
--color-offgray-500: #818b9c;   /* Base */
--color-offgray-600: #6c7689;   /* Dark */
--color-offgray-700: #5a6372;   /* Darker */
--color-offgray-800: #4c5461;   /* Very dark */
--color-offgray-900: #363b45;   /* Extremely dark */
--color-offgray-950: #22252b;   /* Ultra dark */
--color-offgray-1000: #0b0c0e;  /* Near black */
```

### Theme-Specific Colors
```css
/* Light theme */
html.light {
  --background: #f6f4ef;
  --foreground: #4c5461;
  --nav-bg-color: #f7f7f2f5;
  --sh-default: 6px 6px 0 #074dcf0f, -6px -6px 0 #074dcf0f;
  --sh-alt: 6px 6px 0 #074dcf0f;
  --sh-alt-opposite: -6px -6px 0 #074dcf0f;
}

/* Dark theme */
html.dark {
  --background: hsl(218, 13%, 7.5%);
  --foreground: #b8bdc7;
  --nav-bg-color: #15171bf2;
  --sh-default: 5px 5px 0 #3d7df51a, -5px -5px 0 #3a7df826;
  --sh-alt: 5px 5px 0 #3d7df514;
  --sh-alt-opposite: -5px -5px 0 #3d7df514;
}
```

## ✍️ Typography System

### Font Families
```css
/* Primary font - Interface */
--font-agrandir: "__agrandir_24f3dc", "__agrandir_Fallback_24f3dc";

/* Secondary font - Content */
--font-writer: "__writer_1deb74", "__writer_Fallback_1deb74";

/* Editorial font - Articles */
--font-lora: "__lora_1fc044", "__lora_Fallback_1fc044";

/* Monospace */
--font-mono: ui-monospace, 'SF Mono', monospace;
```

### Heading Scale
```css
/* Super heading */
.h0 {
  font-size: clamp(2.25rem, 1.5rem + 2.5vw, 3rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Primary heading */
.h1 {
  font-size: clamp(1.85rem, 1.3rem + 2.5vw, 2.15rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Section heading */
.h2 {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 1.7rem);
  letter-spacing: -0.005em;
  line-height: 1.25;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Subsection heading */
.h3 {
  font-size: clamp(1.15rem, 1rem + 0.75vw, 1.35rem);
  letter-spacing: -0.005em;
  line-height: 1.3;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Group heading */
.h4 {
  font-size: clamp(1.125rem, 0.9rem + 0.75vw, 1.15rem);
  letter-spacing: -0.005em;
  line-height: 1.2;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Small heading */
.h5 {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.2rem);
  letter-spacing: -0.005em;
  line-height: 1.1;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Tiny heading */
.h6 {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.1rem);
  letter-spacing: -0.005em;
  line-height: 1.1;
  font-family: var(--font-agrandir);
  font-weight: 700;
}

/* Subheader/Label */
.subheader {
  font-family: var(--font-mono);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-size: 0.6875rem;
  font-weight: 500;
}
```

### Body Text
```css
/* Base body text */
.text-body {
  font-size: 16px;
  line-height: 1.44;
  font-family: var(--font-writer);
  font-weight: 400;
}

/* Caption text */
.text-caption {
  font-size: 14px;
  line-height: 1.44;
  font-family: var(--font-writer);
  font-weight: 400;
}

/* Small text */
.text-small {
  font-size: 0.8125rem; /* 13px */
  line-height: 1.4;
}

/* Tiny text */
.text-tiny {
  font-size: 0.71875rem; /* 11.5px */
  line-height: 1.3;
}
```

## 🧩 Layout System

### Container Sizes
```css
--container-3xs: 16rem;  /* 256px */
--container-2xs: 18rem;  /* 288px */
--container-xs: 20rem;   /* 320px */
--container-sm: 24rem;   /* 384px */
--container-md: 28rem;   /* 448px */
--container-lg: 32rem;   /* 512px */
--container-xl: 36rem;   /* 576px */
--container-2xl: 42rem;  /* 672px */
--container-3xl: 48rem;  /* 768px */
--container-4xl: 56rem;  /* 896px */
--container-5xl: 64rem;  /* 1024px */
--container-6xl: 72rem;  /* 1152px */
--container-7xl: 80rem;  /* 1280px */
```

### Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Spacing Scale
```css
--spacing: 0.25rem;  /* Base: 4px */
/* Follows standard scale: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128 */
```

## 🎭 Visual Effects

### Border Radius
```css
--radius-xs: 0.125rem;   /* 2px */
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-4xl: 2rem;      /* 32px */
```

### Shadows
```css
/* Standard shadows */
--shadow-2xs: 0 1px #0000000d;
--shadow-xs: 0 1px 2px 0 #0000000d;
--shadow-sm: 0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a;
--shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
--shadow-lg: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
--shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
--shadow-2xl: 0 25px 50px -12px #00000040;

/* Inset shadows */
--inset-shadow-2xs: inset 0 1px #0000000d;
--inset-shadow-xs: inset 0 1px 1px #0000000d;
--inset-shadow-sm: inset 0 2px 4px #0000000d;
```

### Blur Effects
```css
--blur-xs: 4px;
--blur-sm: 8px;
--blur-md: 12px;
--blur-lg: 16px;
--blur-xl: 24px;
--blur-2xl: 40px;
--blur-3xl: 64px;
```

## ⚡ Animations & Transitions

### Default Transitions
```css
--default-transition-duration: 0.15s;
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Easing curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Custom Animations
```css
/* Utility animations */
--animate-blink: blink 1s step-end infinite;
--animate-spin-slow: spin 32s linear infinite;
--animate-spin-much-slower: spin 64s linear infinite;

/* Marquee animations */
--animate-marquee: marquee 55s linear infinite;
--animate-marquee-reverse: marquee-reverse 55s linear infinite;
--animate-marquee-vertical: marquee-vertical 35s linear infinite;

/* Dialog animations */
--animate-dialogOverlayShow: dialogOverlayShow 0.15s cubic-bezier(0.16, 1, 0.3, 1);
--animate-dialogContentShow: dialogContentShow 0.15s cubic-bezier(0.16, 1, 0.3, 1);

/* Scale animations */
--animate-scaleIn: scaleIn 0.1s ease;
--animate-scaleOut: scaleOut 0.1s ease;
--animate-fadeIn: fadeIn 0.1s ease;
--animate-fadeOut: fadeOut 0.1s ease;
```

## 🧩 Component Patterns

### Interactive Elements
```css
/* Hover states */
.interactive-element {
  transition: all var(--default-transition-duration) var(--ease-out);
}

.interactive-element:hover {
  transform: scale(1.02);
  color: var(--color-accent-blue);
}

/* Focus states */
.interactive-element:focus {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 2px;
}
```

### Navigation
```css
.nav-item {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  transition: background-color var(--default-transition-duration);
}

.nav-item:hover {
  background-color: var(--color-cream-100);
}
```

### Cards
```css
.card {
  background: var(--background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  border: 1px solid var(--color-offgray-200);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
```

## 🎯 Implementation Guidelines

### Color Usage
1. **Primary Actions**: Use `--color-accent-blue` for CTAs and important interactive elements
2. **Text**: Use `--color-offgray-800` for primary text, `--color-offgray-600` for secondary
3. **Backgrounds**: Use `--color-cream-50` for light areas, `--color-offgray-950` for dark
4. **Borders**: Use `--color-offgray-200` for subtle divisions

### Typography Hierarchy
1. Use `.h0` for hero sections and major page titles
2. Use `.h1`-`.h3` for content hierarchy
3. Use `.subheader` for category labels and metadata
4. Use `--font-writer` for body content, `--font-agrandir` for interface elements

### Responsive Design
```css
/* Mobile-first approach */
.responsive-text {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.2rem);
}

.responsive-container {
  width: 100%;
  max-width: var(--container-6xl);
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .responsive-container {
    padding: 0 2rem;
  }
}
```

### Accessibility
```css
/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Text selection */
::selection {
  color: #201e13;
  background-color: #eceadf;
}
```

### Performance Optimizations
1. Use `transform` and `opacity` for animations
2. Avoid animating `width`, `height`, or `layout` properties
3. Use `will-change` sparingly and remove after animation
4. Prefer CSS custom properties for dynamic theming

## 🖼️ Visual Assets

### Logo Specifications
- **Primary Logo**: `logo_blue_no_gradient_padded.svg`
- **Color**: #084CCF
- **Format**: SVG (1524x1524)
- **Usage**: Scalable, suitable for all sizes

### Image Guidelines
- **Format Priority**: WebP > PNG > JPG
- **Aspect Ratios**: 16:9 for videos, 1.78 for interactive content
- **Optimization**: Compress for web, use appropriate sizing

---

*This design system ensures visual consistency when implementing Zed-inspired interfaces across different projects and platforms.*