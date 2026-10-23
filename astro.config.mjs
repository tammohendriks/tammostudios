// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import { SITE_URL, sitemapAlternates, ROUTES } from './src/lib/routes.mjs';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // Vercel-Adapter fuer server-side API-Routes (src/pages/api/*.ts mit
  // `export const prerender = false`). Alle statischen Pages bleiben
  // static-prerendered — nur die API-Routes werden zu Serverless-
  // Functions gebaut. Kein Impact auf Landing/Sub-Page Perf.
  adapter: vercel(),

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
    // Sicherung gegen den einen Fehler, der sich nicht zuruecknehmen
    // laesst: ein ROUTES-Eintrag, dessen Seite es gar nicht gibt. Der
    // wuerde per hreflang auf eine 404 zeigen, und Google meldet das
    // erst Wochen spaeter. Hier bricht stattdessen der Build.
    {
      name: 'i18n-routen-guard',
      hooks: {
        'astro:routes:resolved': ({ routes, logger }) => {
          const vorhanden = new Set(
            routes
              .filter((r) => r.type === 'page')
              .map((r) => (r.pathname ?? '').replace(/\/$/, '') || '/')
          );
          const fehlend = [];
          for (const [key, eintrag] of Object.entries(ROUTES)) {
            for (const locale of /** @type {const} */ (['de', 'en'])) {
              const pfad = eintrag[locale];
              if (!pfad) continue;
              if (!vorhanden.has(pfad)) fehlend.push(`${key}.${locale} → ${pfad}`);
            }
          }
          if (fehlend.length) {
            logger.error(
              'ROUTES zeigt auf Seiten, die es nicht gibt:\n  ' +
                fehlend.join('\n  ') +
                '\nEntweder die Seite anlegen oder den Eintrag auf null setzen.'
            );
            throw new Error(`i18n-Routen-Guard: ${fehlend.length} Eintrag/Eintraege ohne Seite`);
          }
        },
      },
    },
    sitemap({
      // 404 nicht in die Sitemap aufnehmen — Google soll keine Fehler-
      // Seite indexieren.
      filter: (page) => !page.endsWith('/404') && !page.includes('/admin'),

      // hreflang von Hand statt ueber sitemap({ i18n }). Die eingebaute
      // Option paart URLs ueber den Pfad NACH dem Sprach-Praefix: aus
      // /preise wird '/preise', aus /en/pricing wird '/pricing'. Die
      // finden nie zueinander, und bei nur einem Treffer liefert sie
      // undefined. Es entstuende kein einziges xhtml:link — ohne
      // Warnung. Solange kein en-Eintrag gesetzt ist, gibt
      // sitemapAlternates() ebenfalls undefined zurueck und das Item
      // bleibt unveraendert.
      serialize(item) {
        const links = sitemapAlternates(item.url);
        return links ? { ...item, links } : item;
      },
    }),
    // React-Integration ausschliesslich fuer /admin (Sanity Studio).
     // Alles andere bleibt reines Astro — Landing/Sub-Pages ziehen KEIN
     // React ins Bundle.
    react({
      include: ['**/SanityStudio.*', '**/pages/admin/**'],
    }),
  ],
});