// Zentrale Routen-Tabelle fuer die Zweisprachigkeit.
//
// WARUM .mjs UND NICHT .ts: astro.config.mjs braucht diese Tabelle fuer
// die Sitemap. Astro laedt die Config ueber configPaths
// ['astro.config.mjs', '.js', '.ts', '.mts'] und probiert bei .mjs
// zuerst einen nackten node-import, bevor es auf einen Vite-Server
// zurueckfaellt. Waere die Config .ts, entfiele der schnelle Pfad bei
// jedem Build. Als .mjs koennen sowohl die Config als auch die
// TypeScript-Dateien importieren (allowJs + moduleResolution Bundler).
//
// DEUTSCH IST DIE WURZEL. Englisch liegt unter /en mit SPRECHENDEN
// Slugs, nicht mit uebersetzten deutschen. /preise wird also /en/pricing
// und nicht /en/preise — englische Suchanfragen treffen damit besser,
// und die Seite wirkt nicht wie eine halbe Uebersetzung.
//
// en: null heisst "diese Seite gibt es auf Englisch nicht". Das ist
// kein Platzhalter, sondern ein gueltiger Zustand: das Journal und die
// Rechtstexte bleiben dauerhaft deutsch. Waehrend des Umbaus stehen
// zusaetzlich die noch nicht gebauten Seiten auf null — jeder Eintrag
// wird erst in dem Commit scharfgeschaltet, der die Datei anlegt.
//
// Ein Eintrag, der auf eine nicht existierende Datei zeigt, ist der
// teuerste Fehler hier: hreflang verweist dann auf eine 404, und Google
// meldet das erst Wochen spaeter. Dagegen laeuft ein Guard im Build
// (siehe astro.config.mjs), der genau das abbricht.

export const SITE_URL = 'https://tammostudios.de';

export const DEFAULT_LOCALE = 'de';
export const LOCALES = /** @type {const} */ (['de', 'en']);

/**
 * Schluessel sind sprachunabhaengig und bleiben deutsch, damit der Code
 * an einer Stelle lesbar bleibt. Sie tauchen nie in einer URL auf.
 *
 * @type {Record<string, { de: string, en: string | null }>}
 */
export const ROUTES = {
  home:         { de: '/',                      en: null }, // → /en
  ueber:        { de: '/ueber',                 en: '/en/about' },
  website:      { de: '/website',               en: '/en/website' },
  software:     { de: '/software',              en: '/en/software' },
  preise:       { de: '/preise',                en: '/en/pricing' },
  referenzen:   { de: '/referenzen',            en: null }, // → /en/work
  werkstatt:    { de: '/werkstatt',             en: '/en/lab' },
  kontakt:      { de: '/kontakt',               en: '/en/contact' },
  handwerk:     { de: '/webdesign-handwerk',    en: '/en/web-design-contractors' },
  praxis:       { de: '/webdesign-praxis',      en: '/en/web-design-medical-practices' },
  gastronomie:  { de: '/webdesign-gastronomie', en: '/en/web-design-restaurants' },

  // Dauerhaft nur deutsch. Das Journal ist rein deutsch geschrieben,
  // die Rechtstexte sind in der deutschen Fassung verbindlich.
  journal:      { de: '/journal',               en: null },
  impressum:    { de: '/impressum',             en: null },
  datenschutz:  { de: '/datenschutz',           en: null },

  // Steht in keiner Navigation und lebt fast vollstaendig im
  // Client-Skript. Bleibt deutsch; die englische Preisseite laesst den
  // Verweis darauf einfach weg.
  preisrechner: { de: '/preisrechner',          en: null },
};

/** Pfad ohne abschliessenden Slash, Wurzel bleibt '/'. */
function normalize(pathname) {
  if (!pathname) return '/';
  const ohneIndex = pathname.replace(/\/index\.html$/, '/');
  if (ohneIndex === '/') return '/';
  return ohneIndex.replace(/\/+$/, '') || '/';
}

/**
 * Sprache aus dem Pfad. Alles unter /en ist englisch, der Rest deutsch.
 * @returns {'de' | 'en'}
 */
export function localeOf(pathname) {
  const p = normalize(pathname);
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'de';
}

/**
 * Schluessel zu einem Pfad, oder null fuer Seiten ausserhalb der
 * Tabelle (Journal-Artikel, 404).
 */
export function keyOf(pathname) {
  const p = normalize(pathname);
  for (const [key, eintrag] of Object.entries(ROUTES)) {
    if (eintrag.de === p || eintrag.en === p) return key;
  }
  return null;
}

/** Pfad zu Schluessel und Sprache, oder null wenn es ihn nicht gibt. */
export function path(key, locale = DEFAULT_LOCALE) {
  const eintrag = ROUTES[key];
  if (!eintrag) return null;
  return eintrag[locale] ?? null;
}

/**
 * Wie path(), faellt aber auf Deutsch zurueck statt null zu liefern.
 * Fuer interne Links: ein href="null" darf nie im HTML landen. Wer den
 * Rueckfall nicht will, prueft vorher mit path().
 */
export function pathOr(key, locale = DEFAULT_LOCALE) {
  return path(key, locale) ?? ROUTES[key]?.de ?? '/';
}

/**
 * Gegenstueck in der jeweils anderen Sprache, oder null wenn es keins
 * gibt. Treibt den Sprach-Umschalter: null heisst, der Umschalter wird
 * auf dieser Seite gar nicht gerendert.
 */
export function counterpart(pathname) {
  const key = keyOf(pathname);
  if (!key) return null;
  const ziel = localeOf(pathname) === 'de' ? 'en' : 'de';
  return path(key, ziel);
}

/** Absolute URL ohne Slash am Ende, auch fuer die Wurzel. */
export function absUrl(pathname) {
  const p = normalize(pathname);
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}

/**
 * hreflang-Paare fuer eine Seite. Leeres Array fuer einsprachige
 * Seiten — dort gehoert gar kein hreflang hin, nicht etwa eins das auf
 * sich selbst zeigt.
 */
export function hreflangs(pathname) {
  const key = keyOf(pathname);
  if (!key) return [];
  const de = path(key, 'de');
  const en = path(key, 'en');
  if (!de || !en) return [];
  return [
    { hreflang: 'de', href: absUrl(de) },
    { hreflang: 'en', href: absUrl(en) },
    { hreflang: 'x-default', href: absUrl(de) },
  ];
}

/**
 * Alternates fuer @astrojs/sitemap im serialize-Hook.
 *
 * Die eingebaute sitemap({ i18n })-Option faellt hier still aus: sie
 * paart URLs ueber den Pfad NACH dem Locale-Praefix, also /preise gegen
 * /pricing — die werden nie ein Paar, und bei nur einem Treffer liefert
 * sie undefined zurueck. Es entstuende kein einziges xhtml:link, ohne
 * Warnung. Deshalb hier von Hand.
 */
export function sitemapAlternates(url) {
  const pathname = url.startsWith('http') ? new URL(url).pathname : url;
  const eintraege = hreflangs(pathname);
  if (!eintraege.length) return undefined;
  return eintraege
    .filter((e) => e.hreflang !== 'x-default')
    .map((e) => ({ url: e.href, lang: e.hreflang }));
}
