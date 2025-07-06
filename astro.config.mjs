import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), mdx(), react()],
  site: 'https://cv.mathieu-drouet.com',
});