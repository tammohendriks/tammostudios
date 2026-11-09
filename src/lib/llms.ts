/**
 * llms.txt — eine Landkarte der Seite für Sprachmodelle.
 *
 * WAS DAS IST UND WAS NICHT: llms.txt ist ein Vorschlag von Jeremy
 * Howard (llmstxt.org, v1 September 2024, v2 August 2026), keine
 * Norm. Kein W3C, kein IETF, keine Registrierung.
 *
 * WIE EHRLICH DIE ERWARTUNG SEIN MUSS: Google sagt in seinem
 * AI-Optimization-Guide ausdrücklich, die Datei werde ignoriert und
 * helfe der Sichtbarkeit in der Google-Suche weder noch schade sie
 * ihr. OpenAI, Anthropic und Perplexity dokumentieren nur robots.txt.
 * Eine Auswertung von Ahrefs über rund 137.000 Domains (Mai 2026)
 * fand, dass etwa 97 Prozent der gültigen llms.txt-Dateien nie
 * abgerufen wurden. Gegenbeispiel: Meta-ExternalAgent holt sie
 * regelmäßig, OpenAI und Anthropic gelegentlich.
 *
 * Sie steht hier trotzdem, weil sie billig ist und ein paar Abnehmer
 * hat — aber niemand sollte Rankings davon erwarten. Ob sie etwas
 * bringt, zeigen die Server-Logs, nicht die Suchergebnisse.
 *
 * WARUM GENERIERT UND NICHT IN public/: eine Datei von Hand wäre nach
 * dem dritten Journal-Beitrag veraltet, und eine veraltete Landkarte
 * ist schlimmer als keine. Alles hier kommt aus denselben Quellen wie
 * die Seiten selbst.
 *
 * WARUM KEIN llms-full.txt: das ist ein Muster für Doku-Seiten
 * (Mintlify), nicht für eine Firmenseite mit 25 Seiten — und es legt
 * Scrapern den fertigen Volltext hin.
 *
 * WARUM NICHT /.well-known/: die Spezifikation lehnt das ausdrücklich
 * ab, weil Well-Known-URIs nur an der Wurzel existieren. Die deutsche
 * Fassung liegt unter /llms.txt, die englische unter /en/llms.txt —
 * das deckt sich mit dem Pfad-Scoping aus v2.
 */
import { ROUTES, path, absUrl } from './routes.mjs';
import { SITE, mitAlter } from './constants';
import { getVertical, type VerticalSlug } from './verticals.i18n';
import { getJournalPosts } from './sanity';
import { TESTIMONIALS, zerlegenFuer } from './testimonials';

import { WEBSITE } from './i18n/seiten/website';
import { SOFTWARE } from './i18n/seiten/software';
import { STUDIO } from './i18n/seiten/studio';
import { SICHTBARKEIT } from './i18n/seiten/sichtbarkeit';
import { PREISE } from './i18n/seiten/preise';
import { UEBER } from './i18n/seiten/ueber';
import { REFERENZEN } from './i18n/seiten/referenzen';
import { WERKSTATT } from './i18n/seiten/werkstatt';
import { KONTAKT } from './i18n/seiten/kontakt';

type Locale = 'de' | 'en';
/** Die Schluessel, die ROUTES wirklich kennt — nicht irgendein String. */
type Schluessel = keyof typeof ROUTES;

const TEXTE = {
  de: {
    kurz: 'Individuelle Websites aus Bremen, handgemacht statt Baukasten — in 14 Tagen live, mit eigenem Redaktionssystem zum Selberpflegen.',
    fliess: [
      `${SITE.name} ist das Einzelunternehmen von Tammo Hendriks in ${SITE.location}. Gebaut wird für jede Art von Unternehmen: Handwerk, Arztpraxen, Gastronomie, Kanzleien, Medien, Immobilien und alles dazwischen.`,
      'Eine Website kostet 2.000 € fix, ein Shop 3.000 €, beides ohne laufende Kosten für die Pflege. Jeder Kunde bekommt ein eigenes Studio, in dem er Preise, Texte, Team und Öffnungszeiten selbst ändert. Dazu kommt auf Wunsch alles Sichtbare drumherum: Google Ads, Flyer, Visitenkarten, Banner, Social Media — 50 € pro Stunde.',
      `Kontakt: ${SITE.email}, ${SITE.phone}.`,
    ],
    leistungen: 'Leistungen',
    branchen: 'Branchen',
    betrieb: 'Über den Betrieb',
    journal: 'Journal',
    stimmen: 'Kundenstimmen',
    stimmenHinweis:
      'Wörtlich aus öffentlichen Google-Bewertungen. Sie stehen hier als Text und nicht als strukturierte Daten: Google zeigt für selbstbezügliche Bewertungen grundsätzlich keine Sterne.',
    optional: 'Optional',
    andereSprache: 'Englische Fassung dieser Datei',
    anfuehrung: ['„', '“'] as const,
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    rechtNotiz: '',
  },
  en: {
    kurz: 'Hand-built websites from Bremen, Germany — live in 14 days, each with its own editing studio so you can maintain the site yourself.',
    fliess: [
      `${SITE.name} is the sole proprietorship of Tammo Hendriks in ${SITE.location}, Germany. Built for every kind of business: trades, medical practices, restaurants, law firms, media agencies, estate agents and everything in between.`,
      'A website costs a fixed €2,000, an online store €3,000, neither with running fees for maintenance. Every client gets their own studio to change prices, copy, team and opening hours themselves. On request everything visible around it as well: Google Ads, flyers, business cards, banners, social media — €50 per hour.',
      `Contact: ${SITE.email}, ${SITE.phone}.`,
    ],
    leistungen: 'Services',
    branchen: 'By industry',
    betrieb: 'About',
    journal: 'Journal',
    stimmen: 'Client reviews',
    stimmenHinweis:
      'Quoted from public Google reviews, translated from German. They appear here as text rather than structured data: Google never shows stars for reviews a business hosts about itself.',
    optional: 'Optional',
    andereSprache: 'German version of this file',
    // Englische Anfuehrungszeichen. Mit den deutschen sah ein
    // englisches Zitat aus wie ein Uebersetzungsfehler.
    anfuehrung: ['“', '”'] as const,
    // Die Rechtstexte gibt es nur auf Deutsch — sie sind
    // vorgeschrieben und nicht uebersetzt. Lieber mit Hinweis
    // verlinken als weglassen.
    impressum: 'Imprint',
    datenschutz: 'Privacy policy',
    rechtNotiz: 'German only',
  },
} as const;

/** Eine Zeile der Form `- [Name](URL): Notiz`, wie die Spezifikation sie will. */
const zeile = (name: string, url: string, notiz?: string) =>
  `- [${name}](${url})${notiz ? `: ${einzeilig(notiz)}` : ''}`;

/**
 * Notizen muessen einzeilig sein, sonst bricht die Listenstruktur.
 * Zeilenumbrueche und doppelte Leerzeichen fallen weg.
 */
const einzeilig = (s: string) => s.replace(/\s+/g, ' ').trim();

const VERTICAL_SLUGS: readonly VerticalSlug[] = [
  'handwerk',
  'praxis',
  'gastronomie',
  'medien',
  'kanzlei',
  'immobilien',
] as const;

/**
 * Seiten mit ihrem Woerterbuch. Titel und Beschreibung kommen aus
 * derselben Quelle wie die Seite selbst — zwei Orte fuer denselben
 * Satz laufen auseinander.
 */
const SEITEN = (locale: Locale) =>
  [
    { key: 'website', d: WEBSITE[locale] },
    { key: 'software', d: SOFTWARE[locale] },
    { key: 'studio', d: STUDIO[locale] },
    { key: 'sichtbarkeit', d: SICHTBARKEIT[locale] },
    { key: 'preise', d: PREISE[locale] },
  ] as const;

const BETRIEB = (locale: Locale) =>
  [
    { key: 'ueber', d: UEBER[locale] },
    { key: 'referenzen', d: REFERENZEN[locale] },
    { key: 'werkstatt', d: WERKSTATT[locale] },
    { key: 'kontakt', d: KONTAKT[locale] },
  ] as const;

export const llmsTxt = async (locale: Locale): Promise<string> => {
  const t = TEXTE[locale];
  const url = (key: Schluessel) => {
    const p = path(key, locale);
    return p ? absUrl(p) : null;
  };

  const zeilen: string[] = [];
  zeilen.push(`# ${SITE.name}`, '');
  zeilen.push(`> ${t.kurz}`, '');
  for (const absatz of t.fliess) zeilen.push(absatz, '');

  // --- Leistungen ---
  zeilen.push(`## ${t.leistungen}`, '');
  for (const s of SEITEN(locale)) {
    const u = url(s.key as Schluessel);
    if (u) zeilen.push(zeile(s.d.meta.pageTitle, u, s.d.meta.description));
  }
  zeilen.push('');

  // --- Branchen ---
  const branchen = VERTICAL_SLUGS.map((slug) => {
    const v = getVertical(slug, locale);
    const u = url(slug as Schluessel);
    return v && u ? zeile(v.meta.title, u, v.meta.description) : null;
  }).filter(Boolean) as string[];
  if (branchen.length) {
    zeilen.push(`## ${t.branchen}`, '', ...branchen, '');
  }

  // --- Ueber den Betrieb ---
  zeilen.push(`## ${t.betrieb}`, '');
  for (const s of BETRIEB(locale)) {
    const u = url(s.key as Schluessel);
    // mitAlter, weil die Beschreibung von /ueber einen Platzhalter
    // traegt — sonst stuende hier woertlich „{alter}".
    if (u) zeilen.push(zeile(s.d.meta.pageTitle, u, mitAlter(s.d.meta.description)));
  }
  zeilen.push('');

  // --- Kundenstimmen ---
  // Wortlaut statt Auszeichnung: strukturierte Bewertungen ueber den
  // eigenen Betrieb sind bei Google nie sternfaehig, der Text hier ist
  // dagegen fuer jedes Modell lesbar.
  const stimmen = TESTIMONIALS.map((s) => {
    const { teile } = zerlegenFuer(s, locale);
    const [auf, zu] = t.anfuehrung;
    return `- ${auf}${einzeilig(teile.join(''))}${zu} \u2014 ${s.autor}, ${s.betrieb}`;
  });
  if (stimmen.length) {
    zeilen.push(`## ${t.stimmen}`, '', t.stimmenHinweis, '', ...stimmen, '');
  }

  // --- Journal ---
  // Nur auf Deutsch: die Beitraege gibt es nicht auf Englisch, und ein
  // Verweis in eine andere Sprache ohne Hinweis waere eine Falle.
  if (locale === 'de') {
    try {
      const posts = await getJournalPosts();
      if (posts.length) {
        zeilen.push(`## ${t.journal}`, '');
        for (const p of posts) {
          zeilen.push(zeile(p.title, absUrl(`/journal/${p.slug}`), p.excerpt));
        }
        zeilen.push('');
      }
    } catch {
      // Sanity nicht erreichbar: lieber eine Datei ohne Journal als
      // ein fehlgeschlagener Build.
    }
  }

  // --- Optional ---
  /* Impressum und Datenschutz gibt es nur auf Deutsch. path() liefert
     fuer die englische Fassung deshalb null — hier wird bewusst auf
     die deutsche Adresse verwiesen, mit Hinweis statt stillschweigend. */
  const optional: string[] = [];
  for (const key of ['impressum', 'datenschutz'] as const) {
    const p = path(key, locale) ?? ROUTES[key]?.de;
    if (!p) continue;
    optional.push(
      zeile(key === 'impressum' ? t.impressum : t.datenschutz, absUrl(p), t.rechtNotiz || undefined)
    );
  }
  optional.push(
    zeile(t.andereSprache, absUrl(locale === 'de' ? '/en/llms.txt' : '/llms.txt'))
  );
  zeilen.push(`## ${t.optional}`, '', ...optional, '');

  return zeilen.join('\n').replace(/\n{3,}/g, '\n\n');
};
