// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

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
  },

  integrations: [
    sitemap({
      // 404 nicht in die Sitemap aufnehmen — Google soll keine Fehler-
      // Seite indexieren.
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
});