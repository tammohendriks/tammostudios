/**
 * Das Angebot je Branchenseite — die Zahlen, nicht die Worte.
 *
 * Was der Besucher liest, steht im Wörterbuch
 * (src/lib/i18n/seiten/skizze.ts, Block `angebot`). Hier stehen nur
 * Preis und Anzahl: Zahlen sind in beiden Sprachen dieselben, und eine
 * Zahl, die zweimal irgendwo steht, ist eine Zahl, die irgendwann
 * auseinanderläuft.
 *
 * WO DER PREIS SONST NOCH AUFTAUCHT — wer ihn hier ändert, muss dort
 * mitgehen, der Typchecker kann das nicht erzwingen:
 *
 *   src/lib/verticals.ts      Hero-Unterzeile und meta.description
 *                             der Branche, und der Preis-Fließtext
 *                             unter pricing.paragraphs
 *   src/lib/verticals.en.ts   dieselben drei auf Englisch
 *
 * NICHT betroffen: /preise und die Startseite. Dort steht das
 * allgemeine Angebot (eine Website 2.000 €), hier das Paket der
 * jeweiligen Branche. Für Praxen ist es teurer, weil zwei individuelle
 * Anwendungen und der DSGVO-Aufwand drinstecken — das ist eine
 * Entscheidung des Betreibers, keine Unachtsamkeit.
 */

import type { SkizzeBranche } from './skizze';

export type Angebot = {
  /** Der Betrag ohne Währungszeichen, deutsch gesetzt. */
  preis: string;
  /**
   * Wie viele individuelle Anwendungen im Paket sind.
   *
   * Steht hier und nicht nur im Text, weil die Beschriftung daraus
   * gebaut wird: „2 individuelle Anwendungen deiner Wahl". Sonst
   * stünde die Zahl in zwei Sprachen je einmal im Wörterbuch und
   * würde beim nächsten Mal in einer davon vergessen.
   */
  anwendungen: number;
  /**
   * Ob das Abzeichen oben an der Karte erscheint.
   *
   * ACHTUNG, das ist eine Behauptung: „Von Praxen am häufigsten
   * gebucht" setzt voraus, dass es stimmt. Auf einer Seite mit genau
   * einem Paket hat das Abzeichen wenig Bedeutung und etwas Risiko —
   * deshalb steht es als Schalter hier und nicht fest im Markup.
   */
  abzeichen: boolean;
};

export const ANGEBOTE: Record<SkizzeBranche, Angebot> = {
  praxis: {
    preis: '2.500',
    anwendungen: 2,
    abzeichen: true,
  },
  handwerk: {
    preis: '2.000',
    anwendungen: 1,
    abzeichen: true,
  },
  gastronomie: {
    preis: '2.000',
    anwendungen: 1,
    abzeichen: true,
  },
  kanzlei: {
    // Wie Praxis: zwei individuelle Anwendungen und derselbe Aufwand
    // bei Pflichtangaben und Datenschutz. Der Markt ruft fuer eine
    // Kanzlei-Website 3.000 bis 8.000 Euro auf — 2.500 ist deutlich
    // darunter, ohne billig zu wirken.
    preis: '2.500',
    anwendungen: 2,
    abzeichen: false,
  },
  medien: {
    preis: '2.000',
    anwendungen: 1,
    // KEIN Abzeichen: „Von Agenturen am häufigsten gebucht" wäre für
    // eine Branche mit genau einer Referenz eine Behauptung ohne
    // Grundlage. Lieber kein Abzeichen als ein unglaubwürdiges.
    abzeichen: false,
  },
};
