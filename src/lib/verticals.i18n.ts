// Ein Branchen-Eintrag in der Sprache der aufgerufenen Seite.
//
// Deutsch ist die Quelle: dort stehen Struktur, Bilder, URLs und die
// Entscheidung, welche Headline-Zeile den Marker-Strich bekommt.
// verticals.en.ts liefert nur Text. Hier wird beides zusammengesetzt,
// damit die Komponente nicht wissen muss, dass es zwei Dateien gibt.
//
// Beide Sprachen laufen durch DIESELBE Funktion. Ein zweiter Weg fuer
// Deutsch waere bequemer gewesen, haette aber bedeutet, dass ein Fehler
// im Zusammenbau erst auf der englischen Seite auffaellt — also dort,
// wo seltener jemand hinsieht.

import { VERTICALS, type Vertical } from './verticals';
import { VERTICAL_TEXT_EN } from './verticals.en';

/** Die drei Slugs, wie sie in verticals.ts stehen. */
export type VerticalSlug = (typeof VERTICALS)[number]['slug'];

/**
 * Branchen-Eintrag zu einem Slug, oder undefined wenn es ihn nicht
 * gibt. Die Bilder, die URLs und der Slug sind in beiden Sprachen
 * dieselben, nur die Texte wechseln.
 */
export function getVertical(
  slug: VerticalSlug,
  locale: 'de' | 'en' = 'de',
): Vertical | undefined {
  const deutsch = VERTICALS.find((v) => v.slug === slug);
  if (!deutsch) return undefined;
  if (locale === 'de') return deutsch;

  const en = VERTICAL_TEXT_EN[deutsch.slug];

  return {
    slug: deutsch.slug,
    pageSlug: deutsch.pageSlug,
    meta: en.meta,
    hero: {
      eyebrow: en.hero.eyebrow,
      // Erst den deutschen Eintrag ausbreiten, dann den Text
      // ueberschreiben: so bleibt highlight erhalten, ohne dass hier
      // ein Feld abgefragt wird, das nur manche Zeilen haben. Dass die
      // Laengen passen, hat der Typchecker in verticals.en.ts schon
      // sichergestellt.
      headlineLines: deutsch.hero.headlineLines.map((zeile, i) => ({
        ...zeile,
        text: en.hero.headlineLines[i],
      })),
      subheadline: en.hero.subheadline,
      // Nur mitnehmen, wenn die Branche ein Foto hat. Fuer eine
      // Branche ohne eines gibt es den Schluessel gar nicht, und ein
      // `background: undefined` waere ein Feld, das die Komponente
      // pruefen muesste, obwohl es nie etwas enthaelt.
      ...('background' in deutsch.hero ? { background: deutsch.hero.background } : {}),
    },
    intro: en.intro,
    checklistTitle: en.checklistTitle,
    checklist: en.checklist,
    pricing: { paragraphs: en.pricingParagraphs },
    // Nur mitnehmen, wenn es die Branche hat. Ein leeres Objekt waere
    // schlimmer als gar keins: die Komponente pruefte dann auf
    // Vorhandensein und bekaeme einen Block ohne Inhalt.
    //
    // `'caseStudy' in …` statt eines Wahrheitstests: bei einer Branche
    // ohne Fallstudie gibt es den Schluessel gar nicht, und der
    // Typchecker laesst den Zugriff dann zu Recht nicht zu.
    ...(fallstudie(deutsch, en)),
    faq: en.faq,
  };
}

/**
 * Der Fallstudien-Teil, zusammengesetzt aus beiden Sprachen — oder
 * nichts, wenn die Branche keinen hat.
 *
 * Steht als eigene Funktion da, weil der Typchecker die beiden
 * Schluessel sonst innerhalb eines Objekt-Literals nicht als
 * vorhanden erkennt: die Einengung durch `in` traegt dort nicht bis
 * in die verschachtelten Zugriffe.
 */
function fallstudie(
  deutsch: (typeof VERTICALS)[number],
  en: (typeof VERTICAL_TEXT_EN)[keyof typeof VERTICAL_TEXT_EN]
): Pick<Vertical, 'caseStudy'> | Record<string, never> {
  if (!('caseStudy' in deutsch) || !('caseStudy' in en)) return {};
  const d = deutsch.caseStudy;
  const e = en.caseStudy;
  if (!d || !e) return {};
  return {
    caseStudy: {
      eyebrow: e.eyebrow,
      paragraphs: e.paragraphs,
      references: d.references.map((ref, i) => ({
        ...ref,
        alt: e.references[i].alt,
        linkLabel: e.references[i].linkLabel,
      })),
    },
  };
}
