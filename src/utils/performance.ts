// Performance monitoring utilities
import { siteConfig } from '../config/site';
declare const gtag: (...args: any[]) => void;
export interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

// Core Web Vitals measurement
export function measureWebVitals(callback: (metrics: Partial<PerformanceMetrics>) => void) {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    callback({ lcp: lastEntry.startTime });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const e = entry as any;
      callback({ fid: e.processingStart - e.startTime });
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const e = entry as any;
      if (!e.hadRecentInput) {
        clsValue += e.value;
      }
    });
    callback({ cls: clsValue });
  }).observe({ entryTypes: ['layout-shift'] });

  // Time to First Byte (TTFB)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const e = entry as any;
      callback({ ttfb: e.responseStart - e.requestStart });
    });
  }).observe({ entryTypes: ['navigation'] });

  // First Contentful Paint (FCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      callback({ fcp: entry.startTime });
    });
  }).observe({ entryTypes: ['paint'] });
}

// Lazy loading implementation
export function setupLazyLoading() {
  const lazyElements = document.querySelectorAll('.lazy-load');
  
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('loaded');
          lazyObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lazyElements.forEach((element) => {
      lazyObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyElements.forEach((element) => {
      (element as HTMLElement).classList.add('loaded');
    });
  }
}

// Resource hints for critical resources
export function addResourceHints() {
  const head = document.head;
  
  // Preload critical resources
  const criticalResources = [
    { href: siteConfig.author.image, as: 'image' },
    { href: 'https://code.iconify.design/3/3.1.1/iconify.min.js', as: 'script' }
  ];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    head.appendChild(link);
  });
}

// Performance budget checker
export function checkPerformanceBudget(metrics: Partial<PerformanceMetrics>) {
  const budget = {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 800, // 800ms
    fcp: 1800  // 1.8s
  };

  const results = Object.entries(metrics).map(([key, value]) => {
    const budgetValue = budget[key as keyof PerformanceMetrics];
    const isWithinBudget = value <= budgetValue;
    
    return {
      metric: key,
      value,
      budget: budgetValue,
      withinBudget: isWithinBudget,
      score: isWithinBudget ? 'GOOD' : 'NEEDS_IMPROVEMENT'
    };
  });

  return results;
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Setup lazy loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyLoading);
  } else {
    setupLazyLoading();
  }

  // Add resource hints
  addResourceHints();

  // Monitor Core Web Vitals
  measureWebVitals((metrics) => {
    const budget = checkPerformanceBudget(metrics);
    
    // Development logging only
    if (import.meta.env.DEV) {
      console.log('Performance Metrics:', metrics);
      console.log('Budget Check:', budget);
    }
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      Object.entries(metrics).forEach(([key, value]) => {
        gtag('event', key, {
          value: Math.round(value),
          custom_parameter: 'web_vitals'
        });
      });
    }
  });
}