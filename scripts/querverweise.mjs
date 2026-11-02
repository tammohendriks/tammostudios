/**
 * Erzeugt posts/QUERVERWEISE.md — Vorschlaege fuer Verweise IM TEXT.
 *
 * Aufruf:
 *   npm run querverweise
 *
 * Braucht einen Build im dist/, um zu sehen, welche Verweise schon im
 * Text stehen. Ohne Build laeuft es trotzdem, meldet dann aber jeden
 * vorhandenen Verweis als offenen Vorschlag.
 *
 * WARUM EIN SKRIPT und keine fest eingecheckte Liste: nach jedem neuen
 * Beitrag verschieben sich die Aehnlichkeiten im ganzen Bestand, nicht
 * nur beim neuen. Eine Liste von Hand waere ab dem naechsten Beitrag
 * falsch, und falsche Verweise sind schlimmer als keine.
 *
 * Gerechnet wird mit DEMSELBEN Code wie der Weiterlesen-Block unter
 * jedem Beitrag (src/lib/journalVerwandt.ts). Eine zweite Rechnung
 * wuerde andere Vorschlaege liefern als die Seite zeigt, und dann
 * wuesste niemand, welcher der beiden zu glauben ist.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createClient } from '@sanity/client';
import { normalisieren } from '../src/lib/journalSuche.ts';
import { verwandteBerechnen } from '../src/lib/journalVerwandt.ts';

// fileURLToPath, nicht .pathname: im Pfad dieses Projekts steht ein
// Umlaut, und der kommt als URL prozentkodiert an.
const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Wie viele Vorschlaege je Beitrag, bevor vorhandene abgezogen werden. */
const VORSCHLAEGE = 4;

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'dszzp6oh',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const posts = await client.fetch(`*[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) { "slug": slug.current, title,
    "excerpt": coalesce(excerpt, ""), "tags": coalesce(tags, []),
    "volltext": pt::text(body), publishedAt }`);

if (posts.length < 2) {
  console.error('Weniger als zwei Beitraege — nichts zu verweisen.');
  process.exit(1);
}
const nach = Object.fromEntries(posts.map((p) => [p.slug, p]));

// Welche Verweise stehen schon IM TEXT? Aus dem Build gelesen, aber nur
// bis zum Weiterlesen-Block — der zaehlt hier nicht, den schreibt ja
// niemand von Hand.
// Alte Slugs aufloesen: ein Verweis auf /journal/recruiting-handwerk-website
// landet ueber vercel.json bei /journal/recruiting-mit-website. Ohne das
// hier wuerde ein laengst eingebauter Verweis als offener Vorschlag
// wieder auftauchen — und der veraltete Link bliebe unbemerkt.
const umleitung = new Map();
try {
  const vercel = JSON.parse(readFileSync(join(WURZEL, 'vercel.json'), 'utf8'));
  for (const r of vercel.redirects ?? []) {
    if (!r.source || !r.destination || r.source.includes(':')) continue;
    umleitung.set(r.source.replace(/^\/journal\//, ''), r.destination.replace(/^\/journal\//, ''));
  }
} catch {
  // Ohne vercel.json laeuft alles weiter, nur ohne Aufloesung.
}

/** Verweise, die nur noch ueber eine Weiterleitung ankommen. */
const veraltet = [];

let ohneBuild = 0;
const vorhanden = {};
for (const slug of Object.keys(nach)) {
  let html;
  try {
    html = readFileSync(join(WURZEL, 'dist/client/journal', slug, 'index.html'), 'utf8');
  } catch {
    ohneBuild += 1;
    vorhanden[slug] = new Set();
    continue;
  }
  const rumpf = html.split('class="post-weiter"')[0];
  const roh = [...rumpf.matchAll(/href="\/journal\/([a-z0-9-]+)"/g)].map((m) => m[1]);
  const aufgeloest = new Set();
  for (const ziel of roh) {
    if (ziel === slug) continue;
    if (nach[ziel]) { aufgeloest.add(ziel); continue; }
    const neuesZiel = umleitung.get(ziel);
    if (neuesZiel && nach[neuesZiel]) {
      aufgeloest.add(neuesZiel);
      veraltet.push({ von: slug, alt: ziel, neu: neuesZiel });
    }
  }
  vorhanden[slug] = aufgeloest;
}
if (ohneBuild) {
  console.warn(`Hinweis: ${ohneBuild} Beitraege nicht im dist/ gefunden — erst "npm run build",`);
  console.warn('sonst erscheinen schon vorhandene Verweise als offene Vorschlaege.');
}

const karte = verwandteBerechnen(
  posts.map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt,
    tags: p.tags ?? [], volltext: p.volltext ?? '',
  })),
  VORSCHLAEGE
);

// Worueber sind sich zwei Beitraege einig? Die seltensten gemeinsamen
// Woerter sagen das am deutlichsten. Woerter, die in mehr als 40% der
// Beitraege stehen, fallen raus — die verbinden nichts.
const N = posts.length;
const woerter = {};
const df = new Map();
for (const p of posts) {
  const z = new Map();
  const text = normalisieren([p.title, p.excerpt, p.volltext ?? ''].join(' '));
  for (const w of text.split(' ').filter((w) => w.length >= 5)) z.set(w, (z.get(w) ?? 0) + 1);
  woerter[p.slug] = z;
  for (const w of z.keys()) df.set(w, (df.get(w) ?? 0) + 1);
}
const gemeinsam = (a, b) =>
  [...woerter[a].keys()]
    .filter((w) => woerter[b].has(w) && df.get(w) <= N * 0.4)
    .map((w) => [w, Math.min(woerter[a].get(w), woerter[b].get(w)) * Math.log(N / df.get(w))])
    .sort((x, y) => y[1] - x[1])
    .slice(0, 6)
    .map(([w]) => w);

// Wo liesse sich der Verweis unterbringen? Der erste Satz, in dem das
// staerkste gemeinsame Wort steht — kurz genug zum Zitieren.
const satz = (slug, wort) => {
  if (!wort) return null;
  for (const s of (nach[slug].volltext ?? '').split(/(?<=[.!?])\s+/)) {
    const t = s.trim();
    if (t.length > 40 && t.length < 260 && normalisieren(t).includes(wort)) return t;
  }
  return null;
};

const datum = (iso) =>
  new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin',
  });

let md = `# Querverweise im Text

Erzeugt von \`npm run querverweise\`. **Von Hand bearbeiten lohnt nicht** —
der naechste Lauf ueberschreibt die Datei. Abgehakte Kaestchen gehen
dabei verloren; was eingebaut ist, erkennt das Skript beim naechsten Mal
von selbst am Build und schlaegt es nicht wieder vor.

Diese Liste ist ein Vorschlag, kein Automatismus. Der
Weiterlesen-Block unter jedem Beitrag wird beim Build gerechnet und
braucht nichts von Dir. Hier geht es um die andere Sorte Verweis: einen
Satz *mitten im Text*, der auf einen anderen Beitrag zeigt.

Der Unterschied ist nicht kosmetisch. Ein Verweis im Fliesstext steht in
einem Zusammenhang — er sagt, warum man dort weiterliest. Ein Block am
Ende sagt nur, dass es noch mehr gibt. Fuer Google ist der Linktext im
Satz ausserdem ein Signal, der Block unten kaum.

**Warum das noetig war:** von urspruenglich 46 Verweisen in allen
Beitraegen zeigten 38 auf /kontakt oder /preisrechner — rund einer von
jeder Sorte pro Beitrag. Das ist eine Vorlage, kein Versehen: jeder
Beitrag behandelt den Leser als jemanden, der gleich kaufen will. Wer
nur etwas wissen wollte, hatte keinen naechsten Schritt.

**Wie die Vorschlaege entstehen:** dieselbe Rechnung wie beim
Weiterlesen-Block (\`src/lib/journalVerwandt.ts\`) — tf-idf ueber alle
Beitraege, Aehnlichkeit als Kosinus, Tags als zusaetzliche Begriffe. Die
»gemeinsamen Begriffe« sind die seltensten Woerter, die in beiden
Beitraegen vorkommen; sie sagen, *worueber* sich die beiden einig sind.
Der zitierte Satz ist eine Stelle im Quell-Beitrag, an der das Thema
schon angesprochen wird — dort faellt ein Verweis nicht als Fremdkoerper
auf.

**Der Satz gehoert Dir.** Vorgeschlagen sind Ziel und Stelle, nicht die
Formulierung. Ein eingebauter Verweis liest sich gut, wenn er wie eine
Randbemerkung klingt (»Warum 1.500 Euro trotzdem normal sind, habe ich
hier aufgeschrieben«) und schlecht, wenn er wie ein Hinweisschild
klingt (»Lesen Sie auch: ...«).

Erzeugt am ${datum(new Date().toISOString())} aus ${N} Beitraegen.

---

`;

if (veraltet.length) {
  md += `## Zuerst: ${veraltet.length} Verweis${veraltet.length === 1 ? '' : 'e'} auf alte Adressen\n\n`;
  md += `Diese Verweise im Text zeigen auf Slugs, die es nicht mehr gibt. Sie\n`;
  md += `funktionieren nur, weil \`vercel.json\` sie weiterleitet — ein Umweg bei\n`;
  md += `jedem Klick, und er faellt weg, sobald die Weiterleitung aufgeraeumt\n`;
  md += `wird. Im Sanity-Studio auf die heutige Adresse aendern:\n\n`;
  for (const v of veraltet) {
    md += `- [ ] In *${nach[v.von].title}*: \`/journal/${v.alt}\` → \`/journal/${v.neu}\`\n`;
  }
  md += `\n---\n\n`;
}

let offen = 0;
for (const p of posts) {
  const schon = [...(vorhanden[p.slug] ?? [])];
  const ziele = (karte[p.slug] ?? []).filter((z) => !schon.includes(z));
  md += `## ${p.title}\n\n`;
  md += `\`/journal/${p.slug}\` · ${(p.tags ?? []).join(', ') || 'ohne Tag'} · ${datum(p.publishedAt)}\n\n`;
  if (schon.length) {
    md += `Verweist im Text schon auf: ${schon.map((z) => `*${nach[z]?.title ?? z}*`).join(', ')}\n\n`;
  }
  if (!ziele.length) {
    md += `Keine offenen Vorschlaege.\n\n---\n\n`;
    continue;
  }
  for (const z of ziele) {
    offen += 1;
    const g = gemeinsam(p.slug, z);
    md += `- [ ] **${nach[z].title}** → \`/journal/${z}\`\n`;
    if (g.length) md += `  Gemeinsame Begriffe: ${g.join(', ')}\n`;
    const s = satz(p.slug, g[0]);
    if (s) md += `  Moegliche Stelle: »${s}«\n`;
    md += `\n`;
  }
  md += `---\n\n`;
}
md += `\n${offen} offene Vorschlaege. Keiner davon ist Pflicht — ein erzwungener\nVerweis ist schlechter als keiner.\n`;

writeFileSync(join(WURZEL, 'posts/QUERVERWEISE.md'), md);
console.log(`posts/QUERVERWEISE.md geschrieben: ${N} Beitraege, ${offen} offene Vorschlaege.`);
if (veraltet.length) {
  console.log(`${veraltet.length} Verweis(e) zeigen auf alte Slugs — stehen oben in der Datei.`);
}
