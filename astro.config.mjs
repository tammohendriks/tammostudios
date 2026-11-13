// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

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
          // Nur Seiten mit festem Pfad. Sammelrouten wie
          // /en/[...slug] haben kein pathname; waeren sie dabei,
          // zaehlte der Rueckfall unten sie als '/' und der Guard
          // uebersaehe eine fehlende Startseite.
          const vorhanden = new Set();
          for (const route of routes) {
            if (route.type !== 'page') continue;
            if (typeof route.pathname !== 'string') continue;
            vorhanden.add(route.pathname.replace(/\/$/, '') || '/');
          }
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
    // Sicherung gegen toten Verweis von einem Journal-Beitrag auf einen
    // anderen.
    //
    // Die Beitragstexte liegen in Sanity, die Verweise darin schreibt
    // ein Mensch von Hand, und bisher prueft sie NICHTS: weder das
    // Veroeffentlichen noch der Build. Genau so hat ein Verweis auf
    // /journal/recruiting-handwerk-website monatelang live als 404
    // ueberlebt — der Beitrag liegt unter recruiting-mit-website.
    //
    // Geprueft wird die GEBAUTE AusgabE, nicht ein Modell davon: jeder
    // /journal/...-Verweis im fertigen HTML muss auf eine Seite zeigen,
    // die es auch gibt. Damit faengt der Guard auch Verweise, die erst
    // ueber Sanity hereinkommen und in keiner Quelldatei stehen.
    //
    // Eine Weiterleitung in vercel.json gilt als gueltiges Ziel. Ein 301
    // auf die richtige Seite ist kein toter Verweis — der Besucher
    // landet dort, wo er landen soll.
    {
      name: 'journal-verweis-guard',
      hooks: {
        'astro:build:done': ({ dir, logger }) => {
          // fileURLToPath und nicht .pathname: der Projektpfad enthaelt
          // ein kombiniertes Umlaut-Zeichen, und als URL kommt es
          // prozentkodiert an ("Selbststa%CC%88ndigkeit"). readdirSync
          // findet darunter nichts.
          const wurzel = fileURLToPath(new URL('./', dir));

          /**
           * Alle gebauten Dateien einsammeln. ALLE, nicht nur HTML: das
           * Journal hat auch einen Feed unter /journal/rss.xml, und der
           * ist ein gueltiges Ziel. Gesucht wird spaeter nur in den
           * HTML-Dateien, aber die Liste dessen, was es GIBT, muss
           * vollstaendig sein — sonst meldet der Guard einen Fehlalarm
           * auf jeden Pfad, der nicht auf .html endet.
           * @type {string[]}
           */
          const dateien = [];
          /** @param {string} ordner */
          const gehen = (ordner) => {
            for (const name of readdirSync(ordner)) {
              const pfad = join(ordner, name);
              if (statSync(pfad).isDirectory()) gehen(pfad);
              else dateien.push(pfad);
            }
          };
          gehen(wurzel);

          /** Welche Journal-Pfade gibt es wirklich? */
          const vorhanden = new Set(['/journal']);
          for (const pfad of dateien) {
            const rel = '/' + relative(wurzel, pfad).replace(/\/?index\.html$/, '');
            if (rel.startsWith('/journal')) vorhanden.add(rel);
          }

          /**
           * Weiterleitungen ohne Platzhalter aus vercel.json.
           * @type {Map<string, string>}
           */
          const weiter = new Map();
          try {
            const conf = JSON.parse(readFileSync('vercel.json', 'utf8'));
            for (const r of conf.redirects ?? []) {
              if (r.source.includes(':') || r.has || r.missing) continue;
              weiter.set(r.source.replace(/\/$/, ''), r.destination.replace(/\/$/, ''));
            }
          } catch (err) {
            logger.warn('vercel.json nicht lesbar, Weiterleitungen bleiben unberuecksichtigt');
          }

          /** @param {string} ziel */
          const gueltig = (ziel) =>
            vorhanden.has(ziel) || vorhanden.has(weiter.get(ziel) ?? '\u0000');

          /** @type {Map<string, Set<string>>} */
          const tot = new Map();
          for (const pfad of dateien) {
            if (!pfad.endsWith('.html')) continue;
            const html = readFileSync(pfad, 'utf8');
            for (const treffer of html.matchAll(/href="(\/journal\/[^"#?]*)/g)) {
              const ziel = treffer[1].replace(/\/$/, '');
              if (gueltig(ziel)) continue;
              const seite = '/' + relative(wurzel, pfad).replace(/\/?index\.html$/, '');
              const bisher = tot.get(ziel) ?? new Set();
              bisher.add(seite || '/');
              tot.set(ziel, bisher);
            }
          }

          if (tot.size) {
            const liste = [...tot]
              .map(([ziel, seiten]) => `${ziel}  (verlinkt von ${[...seiten].join(', ')})`)
              .join('\n  ');
            logger.error(
              'Journal-Verweise zeigen auf Seiten, die es nicht gibt:\n  ' +
                liste +
                '\nDen Slug im Beitrag korrigieren, oder eine Weiterleitung in' +
                ' vercel.json setzen, falls die alte Adresse schon im Umlauf ist.'
            );
            throw new Error(`journal-verweis-guard: ${tot.size} toter Verweis/toter Verweise`);
          }

          logger.info(
            `${vorhanden.size - 1} Journal-Seiten, alle Verweise darauf zeigen ins Ziel`
          );
        },
      },
    },

    /* Einzelne Woerter am Zeilenende festbinden.
     *
     * Beobachtet auf dem Desktop: ein Satz endet, der naechste faengt
     * an, und nur sein erstes kurzes Wort passt noch in die Zeile.
     *
     *   …dass mir etwas fehlt: das Programmieren. Genau
     *   das, was mich am Anfang am meisten gepackt hat.
     *
     * text-wrap: pretty (global.css) hilft hier NICHT: das raeumt
     * Waisen in der LETZTEN Zeile eines Absatzes auf, nicht mitten
     * drin. Gemessen ueber sieben Seiten bei 1440 und 1280px:
     *
     *   nur text-wrap: pretty        16 gestrandete Woerter
     *   + hyphens: auto              15   (und 50 getrennte Woerter —
     *                                     grosse optische Aenderung
     *                                     fuer fast keinen Gewinn)
     *   + geschuetztes Leerzeichen    2   ohne Nebenwirkung
     *   beides                        5   (Trennung bricht die Bindung
     *                                     wieder auf)
     *
     * Also nur das geschuetzte Leerzeichen, und zwar HIER im Build
     * statt per Skript im Browser: eine Nachbesserung nach dem ersten
     * Zeichnen waere als Umbruch sichtbar.
     *
     * Gebunden wird nach einem Satzzeichen das folgende Wort, wenn es
     * hoechstens sechs Buchstaben hat. Laengere Woerter stranden
     * optisch nicht. Abkuerzungen wie "z. B." treffen nicht zu: dort
     * folgt auf den Buchstaben sofort ein Punkt, kein Leerzeichen.
     */
    {
      name: 'kurze-satzanfaenge-binden',
      hooks: {
        'astro:build:done': ({ dir, logger }) => {
          const wurzel = fileURLToPath(new URL('./', dir));
          /** @type {string[]} */
          const dateien = [];
          /** @param {string} ordner */
          const gehen = (ordner) => {
            for (const name of readdirSync(ordner)) {
              const pfad = join(ordner, name);
              if (statSync(pfad).isDirectory()) gehen(pfad);
              else if (pfad.endsWith('.html')) dateien.push(pfad);
            }
          };
          gehen(wurzel);

          // Worin NICHT ersetzt werden darf. script deckt auch das
          // JSON-LD ab — ein geschuetztes Leerzeichen in strukturierten
          // Daten waere eine stille Aenderung an dem, was Google liest.
          const TABU = /^(script|style|pre|code|textarea|title)$/i;
          const REGEL = /([.!?:]["\u00bb)]?[ \t\n\r]+)(\p{L}{1,6})[ \t\n\r]+/gu;

          let dateienGeaendert = 0;
          let bindungen = 0;
          for (const pfad of dateien) {
            const vor = readFileSync(pfad, 'utf8');
            let tiefe = 0;
            let aus = '';
            let i = 0;
            // Dokument in Tags und Textstuecke zerlegen. Ersetzt wird
            // ausschliesslich in den Textstuecken — nie in einem Tag,
            // nie in einem Attribut.
            while (i < vor.length) {
              const auf = vor.indexOf('<', i);
              const text = auf === -1 ? vor.slice(i) : vor.slice(i, auf);
              if (text) {
                if (tiefe === 0) {
                  aus += text.replace(REGEL, (_, satz, wort) => {
                    bindungen++;
                    return satz + wort + '\u00a0';
                  });
                } else aus += text;
              }
              if (auf === -1) break;
              const zu = vor.indexOf('>', auf);
              if (zu === -1) { aus += vor.slice(auf); break; }
              const tag = vor.slice(auf, zu + 1);
              aus += tag;
              const m = /^<\/?([a-zA-Z0-9-]+)/.exec(tag);
              if (m && TABU.test(m[1])) {
                if (tag.startsWith('</')) tiefe = Math.max(0, tiefe - 1);
                else if (!tag.endsWith('/>')) tiefe++;
              }
              i = zu + 1;
            }
            if (aus !== vor) {
              writeFileSync(pfad, aus);
              dateienGeaendert++;
            }
          }
          logger.info(
            `${bindungen} kurze Satzanfaenge in ${dateienGeaendert} Seiten festgebunden`
          );
        },
      },
    },

    sitemap({
      // 404 nicht in die Sitemap aufnehmen — Google soll keine Fehler-
      // Seite indexieren. Die Danke-Seite ebenso wenig: sie steht auf
      // noindex, und eine Seite gleichzeitig in die Sitemap zu
      // schreiben und per Meta-Tag abzulehnen sind zwei
      // widersprueckliche Signale. Es gibt KEINE Build-Sicherung dafuer
      // — eine neue Datei unter src/pages landet automatisch in der
      // Sitemap, und niemand warnt.
      filter: (page) =>
        !page.endsWith('/404') &&
        !page.includes('/admin') &&
        !page.endsWith('/danke-skizze'),

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