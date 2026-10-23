// Texte der Kontaktseite, beide Sprachen.
//
// Pro Seite eine Datei mit BEIDEN Fassungen untereinander. Zwei
// getrennte Dateien waeren sauberer sortiert, aber beim Lesen muesste
// man dauernd zwischen ihnen springen, um zu sehen, ob eine Zeile
// uebersetzt ist. So steht der englische Satz direkt unter dem
// deutschen.
//
// en ist als Shape<typeof de> typisiert: fehlt ein Schluessel, steht
// einer zu viel oder hat eine Liste eine andere Laenge, bricht
// npm run check (siehe i18n/shape.ts).
//
// Die Werte der Auswahlliste stehen NICHT hier. 'website-projekt' und
// die anderen vier sind Schluessel, die so an die API gehen und dort
// gegen ein Enum geprueft werden. Uebersetzt werden nur die
// Beschriftungen, in derselben Reihenfolge.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Kontakt',
    title: 'Kontakt — Webentwickler aus Bremen | Tammo Studios',
    description:
      'Anfrage, Rückruf oder 30-Minuten-Erstgespräch, Antwort innerhalb von 24 Stunden. Website 2.000 €, Online-Shop 3.000 €, aus Bremen und von Hand gebaut.',
  },

  hero: {
    headline: 'Sprechen wir.',
    sub: 'Antwort innerhalb 24 Stunden.\nSchreib mir kurz, was du vorhast.',
  },

  formular: {
    label: 'Kontaktformular',
    name: 'Name',
    email: 'Email',
    telefon: 'Telefon',
    firma: 'Firmenname',
    anliegen: 'Anliegen',
    nachricht: 'Nachricht',
    optional: '(optional)',
    platzhalterName: 'Max Mustermann',
    platzhalterEmail: 'max@beispiel.de',
    platzhalterTelefon: 'z.B. +49 177 1962704',
    platzhalterFirma: 'Firma / Betrieb',
    // Das Feld ist per CSS versteckt und nur fuer Bots sichtbar. Die
    // Beschriftung steht trotzdem da, weil ein input ohne label auch
    // für einen Screenreader existiert.
    honeypot: 'Website (bitte nicht ausfüllen)',
    datenschutzVor: 'Ich habe die ',
    datenschutzLink: 'Datenschutzerklärung',
    datenschutzNach: ' gelesen und akzeptiere die Verarbeitung meiner Anfrage.',
    senden: 'Anfrage senden →',
    sendenLaeuft: 'Wird gesendet …',
    fehler: 'Fehler beim Senden. Ruf mich alternativ direkt an: 0177 1962704.',
    dankeTitel: 'Danke!',
    dankeText:
      'Ich melde mich innerhalb 24h bei dir. Eine Bestätigungs-Mail ist auch schon in deinem Postfach.',
  },

  // Beschriftungen der Auswahlliste, in der Reihenfolge der Schlüssel in
  // ContactPage.astro.
  anliegen: [
    'Website-Projekt',
    'Online-Shop-Projekt',
    'Wartung / Support',
    'Allgemeine Projektanfrage',
    'Anderes',
  ],

  // Vorbelegung des Nachrichtenfeldes, passend zum gewählten Anliegen.
  // Reihenfolge wie bei anliegen.
  vorlagen: [
    'Hallo Tammo, ich brauche eine neue Website für meinen Betrieb [Betriebsart]. Aktuell habe ich [keine Site / eine veraltete Site unter www.beispiel.de]. Wichtig für mich wäre: [z.B. Referenzen, Kontaktformular, mobile Optimierung]. Wann könnten wir sprechen?',
    'Hallo Tammo, ich plane einen Online-Shop für [Produktkategorie]. Aktuell verkaufe ich [im Ladengeschäft / gar nicht online]. Wichtige Features wären: [z.B. Zahlungsanbieter, Lagerverwaltung, Versand-Abwicklung]. Können wir das kurz besprechen?',
    'Hallo Tammo, meine bestehende Website unter [www.beispiel.de] braucht [Aktualisierung / Erweiterung / Bug-Fix]. Konkret geht es um: [kurze Beschreibung]. Wann hast du Zeit?',
    'Hallo Tammo, ich habe eine Projektanfrage: [kurze Beschreibung deines Vorhabens]. Ich bin mir noch nicht sicher was ich genau brauche, aber [Kontext / Ziel]. Können wir das kurz besprechen?',
    'Hallo Tammo, [dein Anliegen hier]...',
  ],

  alternativen: {
    eyebrow: 'LIEBER ANDERS?',
    telefon: 'Telefon',
    email: 'E-Mail',
    instagram: 'Instagram',
  },

  kalender: {
    label: 'Termin direkt buchen',
    eyebrow: 'LIEBER DIREKT EINEN TERMIN?',
    headline: '30 Min Erstgespräch buchen',
    sub: 'Wähl dir einen Slot im Kalender, ohne den Umweg über das Formular.',
    oeffnen: 'Termin-Kalender öffnen ↓',
    schliessen: 'Kalender einklappen ↑',
    laedt: 'Kalender lädt …',
  },

  ablauf: {
    headline: 'Was im Erstgespräch passiert',
    schritte: [
      'Du erzählst kurz was du vorhast',
      'Ich stelle Fragen zu Zielgruppe, Timing, Budget',
      'Wir schauen ob\'s passt',
      'Wenn ja: Angebot innerhalb 24h',
    ],
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Contact',
    title: 'Contact — web developer from Bremen | Tammo Studios',
    description:
      'An inquiry, a callback, or a 30-minute intro call, answered within 24 hours. Website €2,000, online store €3,000, built by hand in Bremen.',
  },

  hero: {
    headline: "Let's talk.",
    sub: 'An answer within 24 hours.\nTell me briefly what you have in mind.',
  },

  formular: {
    label: 'Contact form',
    name: 'Name',
    email: 'Email',
    telefon: 'Phone',
    firma: 'Company name',
    anliegen: 'Subject',
    nachricht: 'Message',
    optional: '(optional)',
    platzhalterName: 'Jane Doe',
    platzhalterEmail: 'jane@example.com',
    platzhalterTelefon: 'e.g. +49 177 1962704',
    platzhalterFirma: 'Company',
    honeypot: 'Website (please leave this empty)',
    datenschutzVor: 'I have read the ',
    // Die Erklärung gibt es nur auf Deutsch, das steht im Linktext —
    // wie in der Fußzeile auch.
    datenschutzLink: 'privacy policy (German)',
    datenschutzNach: ' and I accept that my inquiry will be processed.',
    senden: 'Send inquiry →',
    sendenLaeuft: 'Sending …',
    fehler: 'Something went wrong. You can also call me directly: +49 177 1962704.',
    dankeTitel: 'Thanks!',
    dankeText:
      "I'll get back to you within 24 hours. A confirmation email is already in your inbox.",
  },

  anliegen: [
    'Website project',
    'Online store project',
    'Maintenance and support',
    'General project inquiry',
    'Something else',
  ],

  vorlagen: [
    'Hi Tammo, I need a new website for my business [type of business]. Right now I have [no site / an outdated site at www.example.com]. What matters to me: [e.g. past work, a contact form, mobile]. When could we talk?',
    "Hi Tammo, I'm planning an online store for [product category]. Right now I sell [in the shop / not online at all]. Important features would be: [e.g. payment provider, inventory, shipping]. Can we talk this through?",
    'Hi Tammo, my existing website at [www.example.com] needs [an update / an addition / a bug fix]. Specifically: [short description]. When do you have time?',
    "Hi Tammo, I have a project inquiry: [a short description of what you have in mind]. I'm not sure yet what exactly I need, but [context / goal]. Can we talk this through?",
    'Hi Tammo, [your inquiry here]...',
  ],

  alternativen: {
    eyebrow: 'PREFER SOMETHING ELSE?',
    telefon: 'Phone',
    email: 'Email',
    instagram: 'Instagram',
  },

  kalender: {
    label: 'Book a time directly',
    eyebrow: 'PREFER TO BOOK A TIME RIGHT AWAY?',
    headline: 'Book a 30-minute intro call',
    sub: 'Pick a slot in the calendar, without going through the form.',
    oeffnen: 'Open the calendar ↓',
    schliessen: 'Collapse the calendar ↑',
    laedt: 'Calendar loading …',
  },

  ablauf: {
    headline: 'What happens in the intro call',
    schritte: [
      'You tell me briefly what you have in mind',
      'I ask about your audience, timing, budget',
      'We see whether it fits',
      'If it does: a quote within 24 hours',
    ],
  },
};

export const KONTAKT = { de, en } as const;
