// Texte der Software-Seite, beide Sprachen.
//
// Zu den Absaetzen, die als Liste von Zeilen stehen: im Markup sitzt
// zwischen ihnen ein <br class="hidden sm:inline" />, also ein Umbruch,
// der nur am Desktop greift. Als EIN String waere nicht uebersetzbar,
// wo der Umbruch hingehoert. Beide Sprachen brauchen dadurch dieselbe
// Anzahl Zeilen — das ist Absicht, so bleibt der Rhythmus des Absatzes
// in beiden Fassungen gleich.
//
// Beim Preis-Absatz stehen Betraege und Fliesstext getrennt, weil die
// Betraege fett gesetzt sind. set:html waere der kuerzere Weg und hier
// FALSCH: die Regel `.pricing-body strong` ist an die Astro-Kennung der
// Komponente gebunden, und ein per set:html eingefuegtes <strong>
// traegt diese Kennung nicht — die Auszeichnung waere unsichtbar.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Software',
    title: 'App- & Software-Entwicklung aus Bremen | Tammo Studios',
    description:
      'Software-Entwicklung aus Bremen: Preisrechner, Konfiguratoren, mitdenkende Formulare, eigene Apps. Eine Anwendung ist im Website-Preis enthalten.',
  },

  hero: {
    headline: 'Websites können mehr als nur da sein.',
    sub: 'Preisrechner, mitdenkende Anfrageformulare, Konfiguratoren, automatische PDFs. Eine davon ist im Website-Preis schon drin.',
    cta: 'Erstgespräch anfragen',
    notiz: 'Eine Anwendung inklusive · jede weitere 500 €',
  },

  positionierung: {
    label: 'Was ich baue',
    absatz1: [
      'Die meisten Websites hören auf, wo es interessant wird: bei „Formular abgeschickt".',
      'Rechnen, ein Dokument erzeugen, an die richtige Stelle schicken:',
      'das läuft dann wieder per Telefon.',
    ],
    absatz2: [
      'Genau der Teil ist mein Handwerk. Keine fertige Vorlage.',
      'Kein zugekauftes Modul, sondern deine Abläufe als Grundlage.',
    ],
  },

  arten: {
    headline: 'Was damit gemeint ist',
    punkte: [
      {
        title: 'Rechner',
        body: 'Ein paar Eckdaten rein, eine brauchbare Zahl raus: eine Empfehlung, ein Investitionsrahmen, eine Förderhöhe.',
      },
      {
        title: 'Anfrageformulare, die mitdenken',
        body: 'Nicht „Name, Mail, Nachricht". Sondern Formulare, die je nach Antwort anders weitergehen und dir am Ende ein fertiges PDF ins Postfach legen.',
      },
      {
        title: 'Konfiguratoren',
        body: 'Leistungen, Varianten, Optionen: zusammenklickbar, mit Preis oder Zusammenfassung am Ende. Spart das erste Klärungs-Telefonat.',
      },
      {
        title: 'Inhalte, die sich selbst ausgeben',
        body: 'Einmal gepflegt, und daraus entstehen Seite, PDF und Übersetzung. Keine drei Dateien, die auseinanderlaufen.',
      },
    ],
  },

  faelle: {
    headline: 'Vier, die live sind',
    ansehen: 'Ansehen',
    // name und href stehen in der Komponente: Eigenname und Adresse
    // sind in beiden Sprachen dieselben.
    eintraege: [
      {
        full: 'Institut für Betriebsmedizin',
        branch: 'Betriebsmedizin, Isernhagen',
        body: 'Anfrage-System für Vorsorgen mit drei Wegen durchs Formular. Unternehmen tragen Mitarbeitende ein, wählen die Untersuchungen aus, daraus entsteht automatisch ein PDF, das direkt in der Praxis landet. Der Absender bekommt eine Bestätigung. Die ganze Seite schaltet außerdem auf Englisch um, für internationale Belegschaften.',
        tags: ['Formular mit drei Wegen', 'PDF automatisch', 'Deutsch / Englisch'],
      },
      {
        full: 'Arbeitsmedizinische Praxis',
        branch: 'Betriebsmedizin, Bremen',
        body: 'Ein 360°-Rundgang durch die Praxis, direkt auf der Seite begehbar. Wer zur Vorsorge kommt, weiß vorher, wo er landet. Dazu eine vollständige englische Fassung der Seite auf Knopfdruck, ohne zweite Website und ohne doppelte Pflege.',
        tags: ['360°-Rundgang', 'Deutsch / Englisch', 'Eigenes Redaktionssystem'],
      },
      {
        full: 'Heizung, Wärmepumpe, Sanitär',
        branch: 'Handwerk, Bremen',
        body: 'Sechs Fragen zu Wohnfläche, Baujahr, Personen und Warmwasser. Daraus eine Empfehlung: Wärmepumpe, Hybrid oder Gas-Brennwert. Mit Investitionsrahmen, möglicher BEG-Förderung und Eigenanteil. WärmePower bekommt das ausgefüllte Formular als Mail und PDF, der Kunde eine Bestätigung. Zweimal im Monat kommen echte Anfragen darüber rein.',
        tags: ['Empfehlungs-Logik', 'PDF automatisch', 'Förder-Berechnung'],
      },
      {
        full: 'Dach & Fassade',
        branch: 'Dachdecker, Bremen',
        body: 'Investitionsrechner, der zeigt wie viel teurer dasselbe Bauprojekt in fünf und zehn Jahren wird, auf Basis realer Baupreis-Entwicklungen. Dazu: wie viel Wertsteigerung eine neue Dachhülle der Immobilie zurückgibt. Beratung wird damit nachvollziehbar statt gefühlt.',
        tags: ['Kosten-Prognose', 'Baupreis-Entwicklung', 'Wertsteigerung'],
      },
    ],
  },

  groesser: {
    headline: 'Größer als eine Website',
    absatz1:
      'Manches passt nicht mehr in eine Website. Eine Anwendung, die deine Mitarbeiter täglich benutzen. Ein System mit mehreren Rollen. Eine App. Oder ein Spiel.',
    absatz2: [
      'Das baue ich auch, nur eben nicht zum Listenpreis.',
      'Eine Zahl vor dem ersten Gespräch wäre geraten.',
    ],
    belegVor: 'Wie tief das geht, kannst du dir ansehen statt es mir zu glauben: In der ',
    belegLink: 'Werkstatt',
    belegNach: ' liegt ein Spiel, das ich ohne Auftrag gebaut habe. Spielbar direkt im Browser.',
  },

  ablauf: {
    headline: 'So läuft das ab',
    schritte: [
      {
        title: 'Erstgespräch',
        meta: '30 Minuten, kostenlos',
        body: 'Wir sprechen über deinen Ablauf. Was läuft von Hand, wo verbrennst du Zeit? Am Ende weißt du, ob sich eine eigene Anwendung für dich lohnt.',
      },
      {
        title: 'Konzeption + Angebot',
        meta: '48 Stunden',
        body: 'Du bekommst einen konkreten Vorschlag: was sie können soll, wie lange es dauert, was es kostet. Fix, nicht mit Sternchen. Darauf entscheidest du.',
      },
      {
        title: 'Entwicklung',
        // Bewusst keine Wochenzahl: wie lange etwas dauert, weiss man
        // erst, wenn klar ist was es koennen soll. Die feste Zahl steht
        // in Schritt 02.
        meta: 'Termin steht im Angebot',
        body: 'Kein wochenlanges Hin und Her an Details. Ich baue in klaren Schritten, du siehst nach jedem Abschnitt was passiert und kannst korrigieren. Zum Schluss bekommst du deine Zugänge, eine Anleitung und eine Einweisung.',
      },
    ],
  },

  kosten: {
    headline: 'Was das kostet',
    websitePreis: '2.000 €',
    websiteNach: ' für eine Website, ',
    shopPreis: '3.000 €',
    shopNach: 'für einen Online-Shop.',
    inklusive: 'Eine Anwendung deiner Wahl ist dabei, ohne Aufpreis und ohne längere Bauzeit:',
    entstehtVor: 'sie entsteht in denselben ',
    tage: '14 Tagen',
    weitereVor: '. Jede weitere kostet ',
    weiterePreis: '500 €',
    darueber:
      'Geht es über eine Website hinaus, etwa eine eigene App, nenne ich vorher keine Zahl. Das hängt zu sehr am Umfang. Nach dem Erstgespräch bekommst du eine feste.',
    // Zwei Fassungen des Schluss-Hinweises: der Preisrechner gibt es nur
    // auf Deutsch, und ohne ihn ergibt der Satz mit "oder" keinen Sinn
    // mehr. Beide stehen hier, die Komponente waehlt.
    hinweisMitRechner: {
      vor: 'Alles im Detail auf der ',
      preisseite: 'Preisseite',
      mitte: ', oder du stellst dir dein Paket direkt im ',
      rechner: 'Preisrechner',
      nach: ' zusammen.',
    },
    hinweisOhneRechner: {
      vor: 'Alles im Detail auf der ',
      preisseite: 'Preisseite',
      nach: '.',
    },
  },

  empfehlung: {
    text: 'Wissen wollen, wie weit das technisch geht?',
    label: 'In die Werkstatt schauen',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Software',
    title: 'App and software development from Bremen | Tammo Studios',
    description:
      'Software development from Bremen: price calculators, configurators, forms that think along, apps of your own. One application is included in the website price.',
  },

  hero: {
    headline: 'A website can do more than just be there.',
    sub: 'Price calculators, inquiry forms that think along, configurators, automatic PDFs. One of them is already part of the website price.',
    cta: 'Request an intro call',
    notiz: 'One application included · every further one €500',
  },

  positionierung: {
    label: 'What I build',
    absatz1: [
      'Most websites stop right where it gets interesting: at "form submitted".',
      'Calculating something, producing a document, sending it to the right place:',
      'that goes back to being a phone call.',
    ],
    absatz2: [
      'That part is exactly my craft. No ready-made template.',
      'No bought-in module, but your own processes as the basis.',
    ],
  },

  arten: {
    headline: 'What that means',
    punkte: [
      {
        title: 'Calculators',
        body: 'A few key figures in, a number you can use out: a recommendation, an investment range, a subsidy amount.',
      },
      {
        title: 'Forms that think along',
        body: 'Not "name, mail, message". Forms that take a different path depending on the answer and put a finished PDF in your inbox at the end.',
      },
      {
        title: 'Configurators',
        body: 'Services, variants, options: clickable together, with a price or a summary at the end. Saves you the first clarifying phone call.',
      },
      {
        title: 'Content that publishes itself',
        body: 'Maintained once, and out of it come the page, the PDF, and the translation. Not three files that drift apart.',
      },
    ],
  },

  faelle: {
    headline: 'Four that are live',
    ansehen: 'Take a look',
    eintraege: [
      {
        full: 'Institute for occupational medicine',
        branch: 'Occupational medicine, Isernhagen',
        body: 'An inquiry system for checkups with three paths through the form. Companies enter their staff, pick the examinations, and out of that a PDF is produced automatically that lands directly at the practice. The sender gets a confirmation. The whole site also switches to English, for international workforces.',
        tags: ['A form with three paths', 'PDF automatically', 'German / English'],
      },
      {
        full: 'Occupational medicine practice',
        branch: 'Occupational medicine, Bremen',
        body: 'A 360° tour through the practice, walkable right on the page. Anyone coming in for a checkup knows beforehand where they will end up. Plus a complete English version of the site at the push of a button, without a second website and without maintaining everything twice.',
        tags: ['360° tour', 'German / English', 'A CMS of its own'],
      },
      {
        full: 'Heating, heat pumps, plumbing',
        branch: 'Trades, Bremen',
        body: 'Six questions about floor space, year of construction, number of people, and hot water. Out of that comes a recommendation: heat pump, hybrid, or a gas condensing boiler. With an investment range, the possible BEG subsidy, and the share left to pay. WärmePower gets the completed form as mail and PDF, the customer gets a confirmation. Twice a month real inquiries come in through it.',
        tags: ['Recommendation logic', 'PDF automatically', 'Subsidy calculation'],
      },
      {
        full: 'Roofing and facades',
        branch: 'Roofing, Bremen',
        body: 'An investment calculator that shows how much more expensive the same building project will be in five and ten years, based on real construction price trends. Plus: how much value a new roof envelope gives back to the property. It makes the advice verifiable instead of a gut feeling.',
        tags: ['Cost projection', 'Construction price trends', 'Added value'],
      },
    ],
  },

  groesser: {
    headline: 'Bigger than a website',
    absatz1:
      'Some things no longer fit into a website. An application your staff use every day. A system with several roles. An app. Or a game.',
    absatz2: [
      'I build that too, just not at a list price.',
      'A number before the first conversation would be a guess.',
    ],
    belegVor: 'How deep this goes is something you can look at instead of taking my word for it: the ',
    belegLink: 'Lab',
    belegNach: ' holds a game I built without a client. Playable right in the browser.',
  },

  ablauf: {
    headline: 'How it goes',
    schritte: [
      {
        title: 'Intro call',
        meta: '30 minutes, free',
        body: 'We talk about how you work. What runs by hand, where do you burn time? By the end you know whether an application of your own is worth it for you.',
      },
      {
        title: 'Concept and quote',
        meta: '48 hours',
        body: 'You get a concrete proposal: what it should do, how long it takes, what it costs. Fixed, not with fine print. You decide on that basis.',
      },
      {
        title: 'Development',
        meta: 'The date is in the quote',
        body: 'No weeks of back and forth over details. I build in clear steps, you see what happens after each one and can correct course. At the end you get your access, a manual, and a walkthrough.',
      },
    ],
  },

  kosten: {
    headline: 'What it costs',
    websitePreis: '€2,000',
    websiteNach: ' for a website, ',
    shopPreis: '€3,000',
    shopNach: 'for an online store.',
    inklusive:
      'One application of your choice is included, at no extra charge and with no longer build time:',
    entstehtVor: 'it comes together within the same ',
    tage: '14 days',
    weitereVor: '. Every further one costs ',
    weiterePreis: '€500',
    darueber:
      'If it goes beyond a website, an app of your own for instance, I will not name a number beforehand. That depends too much on the scope. After the intro call you get a fixed one.',
    hinweisMitRechner: {
      vor: 'Everything in detail on the ',
      preisseite: 'pricing page',
      mitte: ', or you put your package together directly in the ',
      rechner: 'price calculator',
      nach: '.',
    },
    hinweisOhneRechner: {
      vor: 'Everything in detail on the ',
      preisseite: 'pricing page',
      nach: '.',
    },
  },

  empfehlung: {
    text: 'Want to know how far this goes technically?',
    label: 'Have a look in the Lab',
  },
};

export const SOFTWARE = { de, en } as const;
