// Texte des Werbe-Umbaus der Branchenseiten, beide Sprachen:
// Projektstart-Block, Scroll-Moment, Über-mich, Angebotskarte,
// Kundenstimmen, Abschluss-Block, Fragebogen und Danke-Seite.
//
// Die Werte hinter den Auswahlpunkten stehen NICHT hier, sondern in
// src/lib/skizze.ts — sie gehen so an den Server und werden dort gegen
// ein Enum geprüft. Übersetzt werden nur die Beschriftungen, in
// derselben Reihenfolge.
//
// Die Funktions-Listen sind per Gleichlang<> an die Schlüssel gebunden:
// eine Zeile mehr oder weniger bricht `npm run check`, statt im Browser
// einen Auswahlpunkt ohne Beschriftung zu erzeugen.
//
// Platzhalter in geschweiften Klammern ersetzt die Komponente. Eine
// Funktion wäre bequemer, verträgt sich aber nicht mit Shape<> — das
// bildet Funktionstypen auf ihre Eigenschaften ab und verliert dabei
// die Prüfung.

import type { Shape, Gleichlang } from '../shape';
import { FUNKTIONEN, type SkizzeBranche } from '../../skizze';

/** Beschriftungen der Funktions-Auswahl, gebunden an die Schlüssel. */
type Funktionsnamen = {
  [B in SkizzeBranche]: Gleichlang<(typeof FUNKTIONEN)[B], string>;
};

const funktionenDe = {
  handwerk: [
    'Kontaktformular',
    'Notdienst-Knopf',
    'Google Maps + Unternehmensprofil',
    'Google-Bewertungen eingebunden',
    'Projekt-Galerie / Referenzen',
    'Blog / Neuigkeiten',
    'Kundenbereich mit Login',
  ],
  praxis: [
    'Kontaktformular (mit DSGVO-Haken)',
    'Online-Terminbuchung',
    'Team-Vorstellung',
    'Leistungs-Übersicht',
    'Zweisprachig (DE/EN)',
    'Google Maps + Unternehmensprofil',
    'Patientenbereich mit Login',
  ],
  gastronomie: [
    'Kontaktformular',
    'Speisekarte (selbst pflegbar)',
    'Tisch-Reservierung',
    'Öffnungszeiten + Feiertage',
    'Google Maps + Unternehmensprofil',
    'Bilder-Galerie',
    'Lieferdienste verlinkt',
  ],
} as const satisfies Funktionsnamen;

const funktionenEn = {
  handwerk: [
    'Contact form',
    'Emergency call button',
    'Google Maps + Business Profile',
    'Google reviews embedded',
    'Project gallery / past work',
    'Blog / news',
    'Customer area with login',
  ],
  praxis: [
    'Contact form (with privacy checkbox)',
    'Online appointment booking',
    'Team section',
    'Services overview',
    'Bilingual (German/English)',
    'Google Maps + Business Profile',
    'Patient area with login',
  ],
  gastronomie: [
    'Contact form',
    'Menu you can edit yourself',
    'Table reservations',
    'Opening hours + holidays',
    'Google Maps + Business Profile',
    'Photo gallery',
    'Delivery services linked',
  ],
} as const satisfies Funktionsnamen;

export const de = {
  hero: {
    // {frei}, {gesamt}, {monat}, {start} und {hinweis} kommen aus
    // SLOT_KNAPPHEIT in constants.ts.
    slotZeile: 'Noch {frei} von {gesamt} Projektstarts frei im {monat}',
    slotZeileEiner: 'Noch 1 von {gesamt} Projektstarts frei im {monat}',
    slotUnten: 'Nächster Start: {start} · {hinweis}',
    // Für Vorleseprogramme: die fünf Punkte sind gemalt und sagen einem
    // Vorleseprogramm nichts.
    slotPunkte: '{frei} von {gesamt} Projektstarts frei',
    cta: 'Kostenlose Website-Skizze in 48h',
    // Der zweite Weg, bewusst leiser: wer lieber redet als tippt, soll
    // ihn finden, aber nicht als gleichwertige Alternative angeboten
    // bekommen — sonst zerfällt die Aufmerksamkeit auf zwei Knöpfe.
    ctaZweit: 'Lieber kurz telefonieren?',
    ctaZweitRuf: 'Direkt anrufen',
    vertrauen: [
      'DSGVO-konform',
      'Festpreis garantiert',
      'Keine Abo-Falle',
      'Du besitzt alles',
    ],
  },

  stimmen: {
    titel: 'Was Kunden sagen',
    unter: 'Drei Stimmen aus laufenden Projekten',
    // Für Vorleseprogramme: fünf gemalte Sterne sind sonst fünf
    // bedeutungslose Zeichen.
    sterne: 'Fünf von fünf Sternen',
  },

  quiz: {
    titel: 'Kostenlose Website-Skizze',
    untertitel: 'Sechs kurze Fragen. Danach bekommst du einen Entwurf, kein Angebot.',
    schrittVon: 'Schritt {n} von {gesamt}',
    fortschrittLabel: 'Fortschritt im Fragebogen',
    weiter: 'Weiter',
    zurueck: 'Zurück',
    ueberspringen: 'Überspringen',
    schliessen: 'Fragebogen schließen',
    abbrechenFrage: 'Deine Antworten gehen verloren — wirklich schließen?',
    abbrechenJa: 'Ja, schließen',
    abbrechenNein: 'Weiter ausfüllen',
    bitteWaehlen: 'Bitte triff eine Auswahl.',
    bitteEineAntwort: 'Wähl mindestens eine Antwort.',

    ziel: {
      frage: 'Was soll die Website für dich tun?',
      hinweis: 'Mehrere Antworten möglich',
      optionen: [
        { titel: 'Mehr Anfragen', text: 'Kunden sollen dich schnell erreichen' },
        { titel: 'Online-Terminbuchung', text: 'Kalender direkt auf der Seite' },
        { titel: 'Vertrauen aufbauen', text: 'Eine Visitenkarte, die etwas hermacht' },
        { titel: 'Produkte verkaufen', text: 'Kleiner Shop oder Katalog' },
      ],
    },

    website: {
      frage: 'Hast du schon eine Website?',
      ja: 'Ja',
      nein: 'Noch nicht',
      urlLabel: 'Adresse deiner Website',
      urlPlatzhalter: 'www.beispiel.de',
      urlUngueltig: 'Das sieht nicht nach einer Web-Adresse aus.',
    },

    funktionen: {
      frage: 'Was soll alles drin sein?',
      hinweis: 'Mehrfachauswahl — such aus, was du brauchst.',
      namen: funktionenDe,
    },

    stil: {
      frage: 'Wie darf es visuell werden?',
      optionen: [
        { titel: 'Seriös & klassisch', text: 'Ruhig, viel Weißraum' },
        { titel: 'Modern & verspielt', text: 'Bewegung, Farbe, Charakter' },
        { titel: 'Handwerklich & kantig', text: 'Dunkel, kräftig, direkt' },
        { titel: 'Überrasch mich', text: 'Du kennst dein Fach' },
      ],
    },

    upload: {
      frage: 'Hast du Logo, Fotos oder Texte, die wir nutzen sollen?',
      hinweis: 'PNG, JPG, SVG, PDF oder ZIP · zusammen bis 4 MB · optional',
      waehlen: 'Dateien auswählen',
      ablegen: 'oder hierher ziehen',
      entfernen: 'Entfernen',
      zuGross: 'Diese Datei ist größer als 4 MB: {name}',
      gesamtZuGross: 'Zusammen über 4 MB. Nimm etwas heraus — Größeres kannst du mir einfach auf die Bestätigungsmail antworten.',
      zuViele: 'Höchstens 10 Dateien.',
      falscherTyp: 'Dieses Format geht nicht: {name}',
    },

    kontakt: {
      frage: 'Wohin schicken wir dir die Skizze?',
      firma: 'Firma / Betrieb',
      firmaPlatzhalter: 'Mustermann GmbH',
      vorname: 'Vorname',
      vornamePlatzhalter: 'Max',
      email: 'E-Mail',
      emailPlatzhalter: 'max@beispiel.de',
      telefon: 'Telefon',
      telefonHinweis: 'Nur falls du angerufen werden möchtest',
      telefonPlatzhalter: 'z.B. +49 177 1962704',
      nachricht: 'Noch etwas, das wir wissen sollten?',
      nachrichtPlatzhalter: 'Optional, max. 500 Zeichen',
      optional: '(optional)',
      // Versteckt, nur für Bots. Die Beschriftung steht trotzdem da,
      // weil ein Feld ohne label auch für ein Vorleseprogramm existiert.
      honeypot: 'Website (bitte nicht ausfüllen)',
      datenschutzVor: 'Ich habe die ',
      datenschutzLink: 'Datenschutzerklärung',
      datenschutzNach: ' gelesen und akzeptiere sie.',
      senden: 'Jetzt kostenlose Skizze anfordern',
      sendenLaeuft: 'Wird gesendet …',
    },

    fehler: {
      allgemein: 'Das hat nicht geklappt. Versuch es nochmal oder ruf an: ',
      erneut: 'Nochmal versuchen',
    },
  },

  danke: {
    pageTitle: 'Danke',
    title: 'Danke — deine Website-Skizze ist unterwegs | Tammo Studios',
    description:
      'Deine Anfrage ist angekommen. Innerhalb von 48 Stunden bekommst du eine individuelle Website-Skizze per Mail.',
    headline: 'Danke, {name}! Deine Skizze ist auf dem Weg.',
    headlineOhneName: 'Danke! Deine Skizze ist auf dem Weg.',
    text: 'Du bekommst dein individuelles Design-Konzept innerhalb von 48 Stunden per Mail — werktags garantiert, am Wochenende etwas länger.',
    schritteTitel: 'Was jetzt passiert',
    schritte: [
      'Ich schaue mir deine Angaben an — jede einzeln, keine Vorlage.',
      'Du bekommst eine Skizze, die zu deinem Betrieb gehört.',
      'Wenn du magst, telefonieren wir danach kurz darüber.',
    ],
    journalText: 'Bis dahin etwas zu lesen:',
    journalLabel: 'Ins Journal',
    folgenText: 'Oder schau, woran ich gerade arbeite:',
  },
} as const;

export const en: Shape<typeof de> = {
  hero: {
    slotZeile: '{frei} of {gesamt} project slots left in {monat}',
    slotZeileEiner: '1 of {gesamt} project slots left in {monat}',
    slotUnten: 'Next start: {start} · {hinweis}',
    slotPunkte: '{frei} of {gesamt} project slots left',
    cta: 'Free website sketch in 48h',
    ctaZweit: 'Rather talk for a minute?',
    ctaZweitRuf: 'Call directly',
    vertrauen: [
      'GDPR compliant',
      'Fixed price, guaranteed',
      'No subscription trap',
      'You own everything',
    ],
  },

  stimmen: {
    titel: 'What clients say',
    // Die Zitate bleiben im Original — eine uebersetzte Bewertung ist
    // keine Bewertung mehr. Der Hinweis sagt das, statt es zu
    // verschweigen.
    unter: 'Three voices from ongoing projects (in German)',
    sterne: 'Five out of five stars',
  },

  quiz: {
    titel: 'Free website sketch',
    untertitel: 'Six short questions. Then you get a draft, not a quote.',
    schrittVon: 'Step {n} of {gesamt}',
    fortschrittLabel: 'Progress through the questions',
    weiter: 'Next',
    zurueck: 'Back',
    ueberspringen: 'Skip',
    schliessen: 'Close the questions',
    abbrechenFrage: 'Your answers will be lost. Close anyway?',
    abbrechenJa: 'Yes, close',
    abbrechenNein: 'Keep going',
    bitteWaehlen: 'Please pick one.',
    bitteEineAntwort: 'Pick at least one answer.',

    ziel: {
      frage: 'What should the website do for you?',
      hinweis: 'Pick as many as you like',
      optionen: [
        { titel: 'More inquiries', text: 'Customers should reach you fast' },
        { titel: 'Online booking', text: 'A calendar right on the site' },
        { titel: 'Build trust', text: 'A calling card that carries weight' },
        { titel: 'Sell products', text: 'A small shop or catalog' },
      ],
    },

    website: {
      frage: 'Do you have a website already?',
      ja: 'Yes',
      nein: 'Not yet',
      urlLabel: 'Your website address',
      urlPlatzhalter: 'www.example.com',
      urlUngueltig: "That doesn't look like a web address.",
    },

    funktionen: {
      frage: 'What should it include?',
      hinweis: 'Pick as many as you need.',
      namen: funktionenEn,
    },

    stil: {
      frage: 'How should it look?',
      optionen: [
        { titel: 'Serious & classic', text: 'Calm, plenty of white space' },
        { titel: 'Modern & playful', text: 'Motion, color, character' },
        { titel: 'Rugged & bold', text: 'Dark, strong, direct' },
        { titel: 'Surprise me', text: 'You know your craft' },
      ],
    },

    upload: {
      frage: 'Do you have a logo, photos or text we should use?',
      hinweis: 'PNG, JPG, SVG, PDF or ZIP · up to 4 MB in total · optional',
      waehlen: 'Choose files',
      ablegen: 'or drop them here',
      entfernen: 'Remove',
      zuGross: 'This file is larger than 4 MB: {name}',
      gesamtZuGross: 'More than 4 MB in total. Take something out — you can simply reply to the confirmation email with anything bigger.',
      zuViele: 'Ten files at most.',
      falscherTyp: "That format won't work: {name}",
    },

    kontakt: {
      frage: 'Where should we send the sketch?',
      firma: 'Company',
      firmaPlatzhalter: 'Example Ltd',
      vorname: 'First name',
      vornamePlatzhalter: 'Jane',
      email: 'Email',
      emailPlatzhalter: 'jane@example.com',
      telefon: 'Phone',
      telefonHinweis: 'Only if you want a call',
      telefonPlatzhalter: 'e.g. +49 177 1962704',
      nachricht: 'Anything else we should know?',
      nachrichtPlatzhalter: 'Optional, max. 500 characters',
      optional: '(optional)',
      honeypot: 'Website (please leave this empty)',
      datenschutzVor: 'I have read the ',
      datenschutzLink: 'privacy policy (German)',
      datenschutzNach: ' and I accept it.',
      senden: 'Send me the free sketch',
      sendenLaeuft: 'Sending …',
    },

    fehler: {
      allgemein: "That didn't work. Try again or call me: ",
      erneut: 'Try again',
    },
  },

  danke: {
    pageTitle: 'Thanks',
    title: 'Thanks — your website sketch is on its way | Tammo Studios',
    description:
      'Your request came through. You will get a custom website sketch by email within 48 hours.',
    headline: 'Thanks, {name}! Your sketch is on its way.',
    headlineOhneName: 'Thanks! Your sketch is on its way.',
    text: 'You will get your custom design concept by email within 48 hours — guaranteed on weekdays, a little longer over the weekend.',
    schritteTitel: 'What happens now',
    schritte: [
      'I go through what you told me, one by one. No template.',
      'You get a sketch that belongs to your business.',
      'If you like, we talk it through on the phone afterwards.',
    ],
    journalText: 'Something to read in the meantime:',
    journalLabel: 'To the journal',
    folgenText: 'Or see what I am working on:',
  },
};

export const SKIZZE = { de, en } as const;
