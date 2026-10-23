// Englische Unterzeilen der Referenzen.
//
// Nur die Unterzeile ist uebersetzbar. Titel sind Eigennamen, und Bild,
// URL und Kategorie sind in beiden Sprachen dieselben — die stehen
// weiter in references.ts.
//
// Record<Slug, string> statt eines eigenen Typs: das reicht hier, weil
// es pro Referenz genau ein Feld ist. Fehlt ein Slug oder steht einer
// zu viel drin, bricht npm run check.

import type { REFERENCES } from './references';

type Slug = (typeof REFERENCES)[number]['slug'];

export const REFERENCE_SUBTITLES_EN: Record<Slug, string> = {
  samedos: 'Occupational medicine practice',
  'er-und-sie': 'Corner bar in Bremen Walle',
  waermepower: 'Heating, heat pumps, plumbing',
  'ibi-doc': 'Occupational health practice',
  'graefe-media': 'Media design from Bremen',
  'kirsch-dach-fassade': 'Roofing and facades in Bremen',
};

type Kategorie = (typeof REFERENCES)[number]['category'];

/**
 * Englische Beschriftung der Kategorien.
 *
 * Im Deutschen ist die Beschriftung der Wert selbst, deshalb gibt es
 * nur diese eine Tabelle. Der WERT bleibt in beiden Sprachen derselbe:
 * er steht als data-Attribut an den Filter-Chips und landet als
 * #handwerk in der Adresse.
 */
export const CATEGORY_LABELS_EN: Record<Kategorie, string> = {
  Handwerk: 'Contractors',
  Medizin: 'Medical',
  Gastronomie: 'Restaurants',
  Medien: 'Media',
};

/** Beschriftung einer Kategorie in der gewuenschten Sprache. */
export function categoryLabel(kategorie: Kategorie, locale: 'de' | 'en'): string {
  return locale === 'en' ? CATEGORY_LABELS_EN[kategorie] : kategorie;
}

/** Unterzeile einer Referenz in der gewuenschten Sprache. */
export function subtitleFor(
  ref: { slug: Slug; subtitle: string },
  locale: 'de' | 'en',
): string {
  return locale === 'en' ? REFERENCE_SUBTITLES_EN[ref.slug] : ref.subtitle;
}
