// Zugriff auf das Wörterbuch. Komponenten rufen t(Astro.url.pathname)
// und bekommen die Texte der Sprache, in der die Seite läuft.
//
// Es gibt bewusst keinen globalen Zustand: die Sprache steckt im Pfad,
// und der Pfad liegt in jeder Komponente vor. Ein Store wäre eine
// zweite Wahrheit neben routes.mjs.

import { localeOf } from '../routes.mjs';
import { de } from './de';
import { en } from './en';

const WOERTERBUECHER = { de, en } as const;

export function t(pathname: string) {
  return WOERTERBUECHER[localeOf(pathname) as 'de' | 'en'];
}

export { de, en };
