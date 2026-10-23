// Texte der Fehlerseite, beide Sprachen.

import type { Shape } from '../shape';

export const de = {
  pageTitle: 'Seite nicht gefunden',
  description: 'Diese Seite existiert nicht. Zurück zur Startseite gehts hier.',
  headline: 'Seite nicht gefunden.',
  sub: 'Sieht aus, als wäre der Pfad nicht ganz zu Ende gebaut. Kein Stress. Zurück zur Startseite ist nur ein Klick.',
  cta: 'Zurück zur Startseite',
  schreibMir: 'Oder schreib mir:',
} as const;

export const en: Shape<typeof de> = {
  pageTitle: 'Page not found',
  description: 'This page does not exist. The way back to the homepage is right here.',
  headline: 'Page not found.',
  sub: 'Looks like this path was never finished. No stress, the homepage is one click away.',
  cta: 'Back to the homepage',
  schreibMir: 'Or write to me:',
};

export const NICHT_GEFUNDEN = { de, en } as const;
