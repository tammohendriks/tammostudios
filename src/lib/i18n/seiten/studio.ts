// Texte der Studio-Seite, beide Sprachen.
//
// Inhaltliche Grundlage ist der Journal-Beitrag
// posts/website-selbst-pflegen-studio.md. Hier steht die gekuerzte,
// verkaufende Fassung: der Beitrag erklaert, diese Seite ueberzeugt.
// Wer alles wissen will, folgt am Ende dem Verweis auf den Beitrag.
//
// WAS BEWUSST NICHT DRINSTEHT: „Sanity" als Produktname taucht nur
// einmal auf, in der FAQ zur Abhaengigkeit. Der Kunde kauft kein CMS,
// er kauft, dass er seine Preise selbst aendern kann. Der Markenname
// des Werkzeugs hilft ihm dabei nicht und macht die Seite technisch,
// wo sie konkret sein muesste.
//
// Du-Form, klein geschrieben. Der Journal-Beitrag schreibt „Du" gross,
// die Website durchgaengig klein — hier gilt die Website.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Studio',
    title: 'Website selbst pflegen: dein eigenes Studio | Tammo Studios',
    description:
      'Jede Website von mir kommt mit einem eigenen Studio: Preise, Texte, Team und Öffnungszeiten änderst du selbst, in Minuten statt Tagen. Kostenlos, für immer.',
  },

  hero: {
    // EIN String, kein hervorgehobenes Wort und keine Augenbraue
    // darueber: der Hero sieht aus wie auf /software, /website und
    // /preise. Auf Ansage des Betreibers — die Unterseiten sollen
    // nicht jede ihre eigene Kopfzeile haben.
    headline: 'Ändern statt anrufen.',
    sub:
      'Jede Website von mir kommt mit einem eigenen Studio. Preise, Texte, Team, Öffnungszeiten:\n' +
      'du änderst das selbst, in Minuten statt Tagen. Kostenlos, für immer.',
    cta: 'Projekt anfragen',
    telVor: 'Lieber kurz telefonieren?',
  },

  // Der Mock-Editor unter dem Hero. Alle sichtbaren Beschriftungen
  // stehen hier, damit die englische Fassung nicht deutsche Knöpfe
  // zeigt.
  editor: {
    label: 'Nachgebaut: eine Preisänderung im Studio, vom Klick bis live',
    browser: 'deine-website.de',
    panel: 'Preis bearbeiten',
    feld: 'Betrag',
    posten: 'Labor G35 (Auslandstauglichkeit)',
    alt: '113,70 €',
    neu: '119,00 €',
    knopf: 'Veröffentlichen',
    live: 'Live',
    // Für Vorleseprogramme und für abgeschaltete Bewegung: derselbe
    // Vorgang als ein Satz.
    beschreibung:
      'Im Studio wird der Betrag von 113,70 € auf 119,00 € geändert, mit einem Klick veröffentlicht, und die Website zeigt den neuen Preis.',
  },

  problem: {
    headline:
      'Preis geändert? Mail an die Agentur. Warten. Nachfragen.\nFreitag ist es dann live.',
    pointe: 'Muss nicht sein.',
    // data-zaehlen zählt die Zahl am Anfang hoch. Der Text drumherum
    // bleibt stehen.
    zahlen: [
      { wert: '5 Min', text: 'bis die Änderung live ist' },
      { wert: '0 €', text: 'laufende Kosten fürs Studio' },
      { wert: '100 %', text: 'deine Inhalte, jederzeit exportierbar' },
    ],
  },

  arten: {
    braue: 'DREI ARTEN',
    headline: 'Nicht jeder will dasselbe pflegen.',
    punkte: [
      {
        titel: 'Klassisch',
        text: 'Klare Felder für alles, was du pflegst. Du siehst, was gefragt ist, und füllst es aus.',
        beispiel: 'Samedos pflegt so Team, Stellenanzeigen und Preislisten.',
      },
      {
        titel: 'Visual Editing',
        text: 'Du siehst deine Website, klickst auf einen Text und änderst ihn direkt. Änderungen werden gesammelt, ein Klick, alles live.',
        beispiel: 'So läuft es bei Maadkey Media.',
      },
      {
        titel: 'Minimal',
        text: 'Nur das Nötigste: Öffnungszeiten, Team, Preise. Für alle, die wenig Zeit haben und nichts kaputt machen wollen.',
        beispiel: 'Wenige Felder, kein Überbau, keine Verwirrung.',
      },
    ],
    fuss: 'Welche Variante zu dir passt, klären wir am Anfang. Das Studio wird für dich gebaut, nicht von der Stange.',
  },

  pdf: {
    braue: 'EIN BEISPIEL',
    headline: 'Eine Preisliste, die sich selbst zum PDF macht.',
    absatz:
      'Samedos ändert Preise im Studio und klickt auf PDF-Vorschau. Das Dokument auf der Website ist sofort aktuell, auf Deutsch und Englisch. Wird jede Woche genutzt.',
    // Die nachgebaute Oberfläche rechts. Beträge aus dem
    // Journal-Beitrag, keine erfundenen Preise.
    mock: {
      titel: 'Preisliste',
      abschnitt: 'Labor',
      zeilen: [
        { posten: 'Labor G35 (Auslandstauglichkeit)', preis: '113,70 €' },
        { posten: 'Labor G37 (Bildschirmarbeitsplatz)', preis: '28,40 €' },
        { posten: 'Hepatitis-Titer', preis: '42,10 €' },
      ],
      knopf: 'PDF-Vorschau',
      datei: 'preisliste.pdf',
      sprachen: ['DE', 'EN'],
    },
  },

  rollen: {
    braue: 'EHRLICH AUFGETEILT',
    headline: 'Was du selbst machst, was ich mache.',
    du: {
      titel: 'Du, im Studio',
      punkte: [
        'Texte',
        'Bilder',
        'Preise und Preislisten',
        'Team',
        'Öffnungszeiten und Sondertermine',
        'Journal und News',
        'Referenzen',
        'Stellenanzeigen',
      ],
    },
    ich: {
      titel: 'Ich, wenn es mehr wird',
      punkte: [
        'Farben und Layout',
        'neue Seiten mit neuem Design',
        'neue Funktionen wie Formular, Rechner oder Buchung',
      ],
    },
    fuss: 'Neue Funktionen kosten ab 500 €, fix kalkuliert. Danach pflegst du sie wieder selbst.',
  },

  sicherheit: {
    braue: 'SICHERHEIT UND BESITZ',
    headline: 'Du kannst mutig sein.',
    punkte: [
      {
        titel: 'Nichts geht kaputt',
        text: 'Jede Version wird gespeichert. Alte Stände sind mit einem Klick zurück.',
      },
      {
        titel: 'Kostenlos, für immer',
        text: 'Keine Lizenz, keine Monatsgebühr. Im Website-Preis drin.',
      },
      {
        titel: 'Deine Daten',
        text: 'Alle Inhalte gehören dir und lassen sich jederzeit exportieren.',
      },
      {
        titel: 'Lebenslang Zugang',
        text: 'Auch wenn du irgendwann mit jemand anderem weitermachst.',
      },
    ],
  },

  einfuehrung: {
    braue: 'WIE DU ES LERNST',
    headline: 'In drei Schritten drin.',
    schritte: [
      {
        titel: 'Früher Einblick',
        text: 'Du siehst dein Studio, während die Website noch entsteht. Da legen wir fest, welche Felder du wirklich brauchst.',
      },
      {
        titel: 'Schulung zum Launch',
        text: 'So lang wie du sie brauchst. Manche wollen eine Stunde, manche zehn Minuten, manche nur den Zugang.',
      },
      {
        titel: 'Danach',
        text: 'Mail oder WhatsApp, wenn was ist. Kein Ticket-System, keine Hotline.',
      },
    ],
  },

  faq: {
    braue: 'HÄUFIGE FRAGEN',
    headline: 'Häufige Fragen zum Studio',
    eintraege: [
      {
        frage: 'Brauche ich technisches Wissen?',
        antwort:
          'Nein. Wenn du eine Mail schreiben kannst, kannst du dein Studio bedienen. Die Felder sind beschriftet, und was unklar sein könnte, bekommt einen Hilfetext.',
      },
      {
        frage: 'Geht das auch vom Handy?',
        antwort:
          'Ja. Für die schnelle Korrektur unterwegs reicht das Handy. Für längere Sessions empfehle ich den Rechner: auf dem großen Bildschirm siehst du besser, was du änderst.',
      },
      {
        frage: 'Was passiert, wenn ich etwas falsch mache?',
        antwort:
          'Nichts Bleibendes. Jede Änderung wird versioniert, alte Stände holst du selbst zurück. Wenn du nicht weiterkommst, fische ich die vorherige Version raus.',
      },
      {
        frage: 'Was kostet das Studio?',
        antwort:
          'Nichts. Es ist im Website-Preis enthalten, dauerhaft, ohne Lizenz- oder Monatsgebühr. Wartung, Updates und Sicherheit laufen bei mir.',
      },
      {
        frage: 'Bin ich damit von dir abhängig?',
        antwort:
          'Nein, und das ist der Punkt. Die Inhalte gehören dir und lassen sich komplett als Datei exportieren. Das Studio läuft auf Sanity, einem verbreiteten Standard — ein anderer Entwickler kann damit weiterarbeiten.',
      },
    ],
  },

  abschluss: {
    headlineVor: 'Deine Website.',
    headlineHell: 'Dein Studio.',
    sub: 'Erzähl mir kurz, was du vorhast. Ich zeige dir ein echtes Studio aus einem laufenden Projekt.',
    cta: 'Projekt anfragen',
    telVor: 'Lieber kurz telefonieren?',
    journalVor: 'Mehr lesen:',
    journalText: 'So pflegst du deine Website selbst',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Studio',
    title: 'Edit your own website: your own studio | Tammo Studios',
    description:
      'Every website I build comes with its own studio: prices, texts, team and opening hours are yours to change, in minutes instead of days. Free, forever.',
  },

  hero: {
    headline: "Edit it. Don't call.",
    sub:
      'Every website I build comes with its own studio. Prices, texts, team, opening hours:\n' +
      'you change them yourself, in minutes instead of days. Free, forever.',
    cta: 'Start a project',
    telVor: 'Rather talk for a minute?',
  },

  editor: {
    label: 'A rebuild: one price change in the studio, from click to live',
    browser: 'your-website.com',
    panel: 'Edit price',
    feld: 'Amount',
    posten: 'Lab panel G35 (overseas fitness)',
    alt: '€113.70',
    neu: '€119.00',
    knopf: 'Publish',
    live: 'Live',
    beschreibung:
      'In the studio the amount changes from €113.70 to €119.00, one click publishes it, and the website shows the new price.',
  },

  problem: {
    headline:
      'Changed a price? Email the agency. Wait. Follow up.\nIt goes live on Friday.',
    pointe: "It doesn't have to be like that.",
    zahlen: [
      { wert: '5 min', text: 'until the change is live' },
      { wert: '€0', text: 'running cost for the studio' },
      { wert: '100 %', text: 'your content, exportable any time' },
    ],
  },

  arten: {
    braue: 'THREE KINDS',
    headline: 'Not everyone wants to edit the same things.',
    punkte: [
      {
        titel: 'Classic',
        text: 'Clear fields for everything you maintain. You see what is asked for and fill it in.',
        beispiel: 'Samedos keeps team, job ads and price lists this way.',
      },
      {
        titel: 'Visual editing',
        text: 'You see your website, click a piece of text and change it right there. Changes collect up, one click puts them all live.',
        beispiel: 'That is how it works for Maadkey Media.',
      },
      {
        titel: 'Minimal',
        text: 'Only the essentials: opening hours, team, prices. For anyone short on time who does not want to break anything.',
        beispiel: 'A few fields, no scaffolding, nothing to get lost in.',
      },
    ],
    fuss: 'Which one fits you is something we settle at the start. The studio gets built for you, not off the shelf.',
  },

  pdf: {
    braue: 'ONE EXAMPLE',
    headline: 'A price list that turns itself into a PDF.',
    absatz:
      'Samedos changes prices in the studio and hits PDF preview. The document on the website is current straight away, in German and English. Used every week.',
    mock: {
      titel: 'Price list',
      abschnitt: 'Lab',
      zeilen: [
        { posten: 'Lab panel G35 (overseas fitness)', preis: '€113.70' },
        { posten: 'Lab panel G37 (screen work)', preis: '€28.40' },
        { posten: 'Hepatitis titre', preis: '€42.10' },
      ],
      knopf: 'PDF preview',
      datei: 'price-list.pdf',
      sprachen: ['DE', 'EN'],
    },
  },

  rollen: {
    braue: 'HONESTLY SPLIT',
    headline: 'What you do, what I do.',
    du: {
      titel: 'You, in the studio',
      punkte: [
        'Texts',
        'Images',
        'Prices and price lists',
        'Team',
        'Opening hours and special dates',
        'Journal and news',
        'Work and references',
        'Job ads',
      ],
    },
    ich: {
      titel: 'Me, when it goes further',
      punkte: [
        'Colours and layout',
        'new pages with a new design',
        'new features like a form, a calculator or booking',
      ],
    },
    fuss: 'New features start at €500, quoted up front. After that you maintain them yourself again.',
  },

  sicherheit: {
    braue: 'SAFETY AND OWNERSHIP',
    headline: 'You can be bold.',
    punkte: [
      {
        titel: 'Nothing breaks',
        text: 'Every version is kept. Old states come back with one click.',
      },
      {
        titel: 'Free, forever',
        text: 'No licence, no monthly fee. Included in the price of the website.',
      },
      {
        titel: 'Your data',
        text: 'All content belongs to you and can be exported at any time.',
      },
      {
        titel: 'Access for life',
        text: 'Even if you carry on with someone else one day.',
      },
    ],
  },

  einfuehrung: {
    braue: 'HOW YOU LEARN IT',
    headline: 'Three steps and you are in.',
    schritte: [
      {
        titel: 'An early look',
        text: 'You see your studio while the website is still being built. That is when we decide which fields you actually need.',
      },
      {
        titel: 'Training at launch',
        text: 'As long as you need it. Some want an hour, some ten minutes, some just the login.',
      },
      {
        titel: 'After that',
        text: 'Email or WhatsApp whenever something comes up. No ticket system, no hotline.',
      },
    ],
  },

  faq: {
    braue: 'COMMON QUESTIONS',
    headline: 'Common questions about the studio',
    eintraege: [
      {
        frage: 'Do I need technical knowledge?',
        antwort:
          'No. If you can write an email, you can work your studio. The fields are labelled, and anything that could be unclear gets a help text.',
      },
      {
        frage: 'Does it work from a phone?',
        antwort:
          'Yes. For a quick fix on the go a phone is fine. For longer sessions I recommend a computer: on the bigger screen you see better what you are changing.',
      },
      {
        frage: 'What if I get something wrong?',
        antwort:
          'Nothing permanent happens. Every change is versioned and you can restore an older state yourself. If you get stuck, I will pull the previous version back.',
      },
      {
        frage: 'What does the studio cost?',
        antwort:
          'Nothing. It is included in the price of the website, permanently, with no licence or monthly fee. Maintenance, updates and security are on me.',
      },
      {
        frage: 'Does this make me dependent on you?',
        antwort:
          'No, and that is the whole point. The content is yours and exports as a single file. The studio runs on Sanity, a widely used standard — another developer can pick it up.',
      },
    ],
  },

  abschluss: {
    headlineVor: 'Your website.',
    headlineHell: 'Your studio.',
    sub: 'Tell me briefly what you have in mind. I will show you a real studio from a running project.',
    cta: 'Start a project',
    telVor: 'Rather talk for a minute?',
    journalVor: 'Read more:',
    journalText: 'How to maintain your own website',
  },
};

export const STUDIO = { de, en } as const;
