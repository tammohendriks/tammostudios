/**
 * Zentrale Content-Konstanten: TAG_OPTIONS + CODE_LANGUAGES.
 *
 * Wird von sanity/schemaTypes/post.ts UND scripts/publish-post.mjs
 * konsumiert damit Studio-Schema + CLI-Konverter nicht auseinander driften.
 * Plain-ESM (.js) — sowohl TypeScript (Vite in Studio-Build) als auch
 * Node-ESM (scripts) importieren ohne extra Konfig.
 */

/** Predefined Tags fuer /journal Filter-Chips + Studio-Auswahl. */
export const TAG_OPTIONS = [
  'Handwerk',
  'Praxis',
  'Gastronomie',
  'Preise',
  'Prozess',
  'Recruiting',
  'Tools',
  'SEO',
  'Design',
];

/** Erlaubte Sprachen fuer codeBlock-Type im Body Portable Text. */
export const CODE_LANGUAGES = [
  'bash',
  'ts',
  'js',
  'html',
  'css',
  'json',
  'astro',
  'text',
];

/**
 * Alias-Mapping fuer Markdown Code-Fence-Sprachen die nicht 1:1 in
 * CODE_LANGUAGES stehen. Unbekannte Sprachen fallen auf 'text' zurueck.
 */
export const CODE_LANGUAGE_ALIASES = {
  typescript: 'ts',
  javascript: 'js',
  tsx: 'ts',
  jsx: 'js',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  yml: 'text',
  yaml: 'text',
  md: 'text',
  markdown: 'text',
};

/**
 * Normalisiert eine Markdown-Code-Fence Sprache auf einen Wert der im
 * CODE_LANGUAGES-Whitelist steht. Return 'text' bei unbekannten Sprachen.
 */
export const normalizeCodeLanguage = (lang) => {
  if (!lang) return 'text';
  const lower = String(lang).toLowerCase().trim();
  const aliased = CODE_LANGUAGE_ALIASES[lower] ?? lower;
  return CODE_LANGUAGES.includes(aliased) ? aliased : 'text';
};
