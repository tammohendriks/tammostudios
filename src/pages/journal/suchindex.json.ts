/**
 * Der Suchindex des Journals, als statische Datei beim Build erzeugt.
 *
 * WARUM EINE EIGENE DATEI und nicht in die Seite eingebettet: gemessen
 * an den 21 Beitraegen ist der Index mit Volltext rund 50 kB gzip. Den
 * wuerde man nicht jedem Besucher mitschicken, der das Journal nur
 * liest. Als eigene Datei laedt ihn das Skript erst, wenn jemand
 * wirklich ins Suchfeld tippt — wer nur liest, zahlt nichts.
 *
 * WARUM VOLLTEXT und nicht nur Titel und Teaser: ebenfalls gemessen.
 * Von 28 plausiblen Suchbegriffen findet NEUN nur der Volltext —
 * darunter cms, wix, squarespace, mobil, ladezeit und datenschutz. Also
 * genau das, was ein Interessent eintippt. Titel und Teaser allein
 * waeren 1,8 kB und zu wenig.
 *
 * WARUM KOPF UND FLIESSTEXT GETRENNT: ein Wort im Titel heisst, der
 * Beitrag handelt davon; dasselbe Wort irgendwo im Fliesstext heisst
 * das nicht. In einem Topf waren beide nicht mehr zu unterscheiden, und
 * die Suche traf fast alles (siehe journalSuche.ts). Getrennt kann die
 * Bewertung den Titel hoeher wiegen.
 *
 * Der Index enthaelt pro Beitrag NUR den Slug und zwei normalisierte
 * Suchtexte. Titel, Teaser und Datum stehen schon in den Karten im DOM —
 * das Skript blendet vorhandene Karten ein und aus, es baut keine neuen.
 * Deshalb muss hier nichts Anzeigbares mit.
 */
import type { APIRoute } from 'astro';
import { getJournalSuchtexte } from '../../lib/sanity';
import { normalisieren, type Indexeintrag } from '../../lib/journalSuche';

export const GET: APIRoute = async () => {
  const beitraege = await getJournalSuchtexte();

  // Schon hier normalisieren, nicht im Browser: der Besucher soll nicht
  // bei jedem Tastendruck 150 kB Text kleinschreiben und Umlaute falten.
  const index: Record<string, Indexeintrag> = {};
  for (const b of beitraege) {
    index[b.slug] = {
      // Der Slug gehoert in den Kopf: er ist nach Suchbegriffen gebaut
      // und weicht manchmal vom Titel ab. Gemessen am Beitrag
      // betriebe-die-keine-website-brauchen — der heisst "Fuer welche
      // Betriebe eine Website Zeitverschwendung ist", das Wort
      // "brauchen" steht NUR im Slug. Ohne ihn fand "brauche ich eine
      // website" alles ausser diesem einen Beitrag.
      kopf: normalisieren(
        [b.slug.replace(/-/g, ' '), b.title, b.excerpt, (b.tags ?? []).join(' ')].join(' ')
      ),
      body: normalisieren(b.volltext ?? ''),
    };
  }

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Der Index aendert sich nur mit einem neuen Build, und jeder
      // Build schreibt ihn neu. Lange Haltbarkeit ist damit sicher.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
