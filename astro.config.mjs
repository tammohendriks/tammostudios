// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tammostudios.de',

  // Kanonisch: apex ohne trailing slash (matcht Search-Console-Setup
  // + vercel.json trailingSlash:false). trailingSlash:'never' streicht
  // Slashes aus Canonical-Tags und Sitemap-URLs. build.format bleibt
  // auf 'directory' default — Vercel served dist/preise/index.html
  // korrekt unter /preise, kein cleanUrls-Rewrite noetig.
  trailingSlash: 'never',

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