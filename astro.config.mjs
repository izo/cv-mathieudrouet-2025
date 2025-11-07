import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Tailwind is configured via PostCSS v4 plugin; no Astro integration needed
  site: 'https://cv.drouet.io',

  // Integrations
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  
  // Performance optimizations
  build: {
    // Enable assets inlining for better performance
    inlineStylesheets: 'auto',
    // Split chunks for better caching
    split: true,
  },
  
  // Vite optimizations
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
        autoInstall: true,
      })
    ],
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunks
      rollupOptions: {
        output: {
          // Optimize asset naming for caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
              return `fonts/[name]-[hash][extname]`;
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(assetInfo.name)) {
              return `images/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },
  
  // Enable compression and optimizations
  compressHTML: true,
  
  // Prefetch configuration
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
});