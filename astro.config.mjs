// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://tammostudios.de',
  // Prefetch aller internen Links bei Hover. Sub-Page-HTML + ihre
  // Assets werden beim Mauszeiger-Hover über Nav-Links schon in den
  // Browser-Cache geladen, sodass der eigentliche Klick fast
  // verzögerungsfrei navigiert.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
