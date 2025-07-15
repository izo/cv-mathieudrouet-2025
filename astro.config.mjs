import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://cv.mathieu-drouet.com',
  
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