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
  medien: [
    'Kontaktformular',
    'Projekt-Portfolio',
    'Video ohne YouTube',
    'Kundengalerie mit Passwort',
    'Kundenlogos als Beleg',
    'Blog / Journal',
    'Shop für Prints oder Presets',
  ],
  kanzlei: [
    'Kontaktformular (mit DSGVO-Haken)',
    'Rechtsgebiete / Leistungen',
    'Team-Vorstellung',
    'Sicherer Unterlagen-Upload',
    'Terminanfrage',
    'Karriere-Seite',
    'Zweisprachig (DE/EN)',
  ],
  immobilien: [
    'Kontaktformular',
    'Objekt-Übersicht',
    'Suche nach Lage und Preis',
    'Wertermittlung anfragen',
    'Team-Vorstellung',
    'Google Maps + Unternehmensprofil',
    'Anbindung ans Maklerprogramm',
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
  medien: [
    'Contact form',
    'Project portfolio',
    'Video without YouTube',
    'Password-protected client gallery',
    'Client logos as proof',
    'Blog / journal',
    'Shop for prints or presets',
  ],
  kanzlei: [
    'Contact form (with privacy checkbox)',
    'Practice areas / services',
    'Team section',
    'Secure document upload',
    'Appointment request',
    'Careers page',
    'Bilingual (German/English)',
  ],
  immobilien: [
    'Contact form',
    'Listing overview',
    'Search by area and price',
    'Request a valuation',
    'Team section',
    'Google Maps + Business Profile',
    'Link to your agency software',
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
    vertrauen: [
      'DSGVO-konform',
      'Festpreis garantiert',
      'Keine Abo-Falle',
      'Du besitzt alles',
    ],
  },

  /**
   * Der Über-mich-Teaser nach der Checkliste.
   *
   * Der Satz nennt die Branche der eigenen Seite zuerst: wer auf der
   * Praxis-Seite liest, soll „für Praxen" lesen und nicht raten, ob er
   * gemeint ist. Der Rest des Satzes ist überall gleich — das ist der
   * Punkt, nicht die Aufzählung.
   */
  /**
   * Der Scroll-Moment nach dem Hero. Ersetzt dort, wo es ihn gibt, den
   * Intro-Absatz — der Inhalt ist derselbe, nur nimmt er sich Zeit.
   *
   * NUR FUER BRANCHEN MIT EIGENEN WORTEN. Die drei Fragen sind die,
   * die ein Patient wirklich stellt; für einen Dachdecker wären es
   * andere, und erfundene wären schlechter als keine. Wer eine Branche
   * dazunimmt, trägt sie in BEIDEN Sprachen ein — Shape<> erzwingt,
   * dass hier und drüben dieselben Schlüssel stehen.
   */
  ersteSekunden: {
    praxis: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Patienten checken deine Praxis zuerst online.',
      fragen: ['Passt der Ansatz?', 'Wer arbeitet dort?', 'Wie kommen sie zum Termin?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — ohne Fachchinesisch, ohne Bürokratie.',
      // Die Sekundenanzeige läuft beim Scrollen mit. {s} ist die Zahl.
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
    handwerk: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Dein Kunde sucht dich mit dem Handy in der Hand.',
      fragen: ['Macht ihr das überhaupt?', 'Kommt ihr bis zu mir?', 'Wie erreiche ich euch jetzt?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — bevor er zurück zur Trefferliste wischt.',
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
    gastronomie: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Gäste entscheiden am Handy, wo sie heute Abend essen.',
      fragen: ['Was gibt es heute?', 'Habt ihr offen?', 'Kriege ich einen Tisch?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — sonst ist der Tisch woanders gebucht.',
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
    medien: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Dein Kunde sieht deine Seite, bevor er deine Arbeit sieht.',
      fragen: ['Was macht ihr genau?', 'Für wen habt ihr das gemacht?', 'Könnt ihr das auch für mich?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — sonst geht der Auftrag an die nächste Agentur.',
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
    kanzlei: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Mandanten öffnen drei Kanzleien in drei Tabs.',
      fragen: ['Macht ihr meinen Fall?', 'Wer sitzt da eigentlich?', 'Wie komme ich an einen Termin?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — sonst rufen sie bei Nummer zwei an.',
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
    immobilien: {
      augenbraue: 'DIE ERSTEN 5 SEKUNDEN',
      aufmacher: 'Wer verkaufen will, prüft zuerst, wem er das zutraut.',
      fragen: ['Was habt ihr schon verkauft?', 'Kennt ihr meine Lage?', 'Was kostet mich das?'],
      pointeVor: 'Deine Website muss diese Fragen ',
      pointeStark: 'in Sekunden',
      pointeNach: ' beantworten — sonst steht nächste Woche ein anderes Schild im Vorgarten.',
      uhr: '{s}s',
      uhrLabel: 'Die ersten fünf Sekunden auf deiner Seite',
    },
  },

  /**
   * Der Ablauf. Steht dort, wo es noch keine Referenzen aus der
   * Branche gibt.
   *
   * Erfundene oder branchenfremde Referenzen waeren an dieser Stelle
   * das Gegenteil von Vertrauen. Der Ablauf braucht kein fremdes
   * Material und beantwortet die Frage, die ohne Referenz offen
   * bleibt: was passiert eigentlich, wenn ich hier klicke?
   *
   * {preis} kommt aus lib/angebote.ts.
   */
  /**
   * Die Wörter, aus denen die Überschriften ihre Suchbegriffe
   * beziehen.
   *
   * Google gewichtet Überschriften. Vorher hiessen sie „Klar, fix,
   * ohne Sternchen.", „Häufige Fragen" und „Samedos + IBI" — gute
   * Sätze, in denen kein einziger Begriff steht, nach dem jemand
   * sucht. Die Sätze bleiben im Kern, bekommen aber den Branchen-
   * begriff dazu.
   *
   * ZWEI FORMEN, weil beide gesucht werden: das Kompositum
   * („Praxis-Website", häufiger in Verbindung mit „kosten") und die
   * Umschreibung („Websites für Praxen", häufiger allein).
   */
  seo: {
    wort: {
      praxis: 'Praxis-Website',
      handwerk: 'Handwerker-Website',
      gastronomie: 'Gastro-Website',
      medien: 'Portfolio-Website',
      kanzlei: 'Kanzlei-Website',
      immobilien: 'Makler-Website',
    },
    fuerWen: {
      praxis: 'für Praxen',
      handwerk: 'für Handwerker',
      gastronomie: 'für Gastronomie',
      medien: 'für Kreative',
      kanzlei: 'für Kanzleien',
      immobilien: 'für Makler',
    },
    // Für das Service-Schema: audienceType will eine Zielgruppe
    // benennen, keine Präposition.
    zielgruppe: {
      praxis: 'Arztpraxen und Zahnarztpraxen',
      handwerk: 'Handwerksbetriebe',
      gastronomie: 'Restaurants, Cafés und Bars',
      medien: 'Fotografen, Videografen, Werbe- und Produktionsfirmen',
      kanzlei: 'Steuerberater, Rechtsanwälte und Notare',
      immobilien: 'Immobilienmakler und Hausverwaltungen',
    },
    /**
     * Kurze Beschriftungen für die Branchen-Zeile in der Fußzeile.
     *
     * Sechs Seiten, auf die nichts verweist, findet eine Suchmaschine
     * schlecht und ein Besucher gar nicht. Die Fußzeile ist der
     * richtige Ort dafür: sie steht auf jeder Seite und nimmt
     * niemandem etwas weg.
     */
    branchenTitel: 'Websites für Branchen',
    /**
     * Der letzte Eintrag der Branchenzeile.
     *
     * Sechs Branchen in einer Reihe lesen sich wie eine Liste dessen,
     * was geht — und damit wie eine Liste dessen, was nicht geht. Ein
     * Betrieb aus einer siebten Branche klickt dann gar nicht erst.
     * Der Verweis fuehrt deshalb auf den Kontakt, nicht ins Leere.
     */
    mehr: '… und viele mehr',
    kurz: {
      praxis: 'Praxen',
      handwerk: 'Handwerk',
      gastronomie: 'Gastronomie',
      medien: 'Medien',
      kanzlei: 'Kanzleien',
      immobilien: 'Makler',
    },
    preisTitel: 'Was eine {wort} kostet.',
    faqTitel: 'Häufige Fragen zur {wort}',
    // {namen} sind die Namen der Referenzen.
    fallstudieTitel: 'Websites {fuerWen}: {namen}',
  },

  ablauf: {
    augenbraue: 'SO LÄUFT ES AB',
    headline: 'Von der Skizze bis live.',
    schritte: [
      {
        titel: 'Skizze, kostenlos',
        text: 'Du beantwortest sechs kurze Fragen. Innerhalb von 48 Stunden bekommst du einen echten Entwurf deiner Startseite — kein Angebot, kein Verkaufsgespräch.',
      },
      {
        titel: 'Du entscheidest',
        text: 'Passt die Richtung, machen wir weiter. Passt sie nicht, hast du einen Entwurf und ich eine Absage. Beides ist in Ordnung, und beides kostet dich nichts.',
      },
      {
        titel: 'Gebaut, nicht zusammengeklickt',
        text: 'Ich baue die Seite von Hand und du siehst sie wachsen. Unterwegs sagst du, was anders soll. {preis} € fest — keine Stundensätze, keine Nachträge.',
      },
      {
        titel: 'Live, und danach',
        text: 'Launch, Übergabe, und du pflegst alles selbst in deinem eigenen CMS. Fehler nach dem Start behebe ich kostenlos. Du sprichst immer mit mir, nicht mit einem Ticket.',
      },
    ],
  },

  ueberMich: {
    augenbraue: 'WER DAHINTER STECKT',
    headline: 'Hi, ich bin Tammo.',
    text: {
      praxis:
        'Ich baue Websites für Praxen, Handwerk und Unternehmen jeder Größe, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
      handwerk:
        'Ich baue Websites für Handwerksbetriebe, Praxen und Unternehmen jeder Größe, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
      gastronomie:
        'Ich baue Websites für Gastronomie, Handwerk und Unternehmen jeder Größe, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
      medien:
        'Ich baue Websites für Medienbetriebe, Praxen und Handwerk, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
      kanzlei:
        'Ich baue Websites für Kanzleien, Praxen und Unternehmen jeder Größe, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
      immobilien:
        'Ich baue Websites für Makler, Handwerk und Unternehmen jeder Größe, von Bremen aus für ganz Deutschland. Kein Team, keine Agentur dazwischen: Du sprichst von der ersten Skizze bis zum Launch mit mir. Und wenn danach was ist, auch.',
    },
    // KEINE ZAHL VON LIVE-SEITEN. Stand hier bis zum 04.11.2026 als
    // „{n} Websites live", abgeleitet aus references.ts. Technisch
    // sauber, strategisch falsch: eine einstellige Zahl neben dem
    // eigenen Gesicht liest sich als Anfaenger, nicht als Beleg. Die
    // Referenzen stehen weiter unten auf der Seite und sprechen fuer
    // sich.
    fakten: ['Antwort < 24 h', 'Alles aus einer Hand', 'Bremen'],
    fotoAlt: 'Tammo Hendriks, Gründer von Tammo Studios',
  },

  /**
   * Die Angebotskarte. Preis und Anzahl kommen aus lib/angebote.ts,
   * hier stehen nur die Worte drumherum.
   */
  angebot: {
    // Wortgleich mit /preise — zwei Seiten, eine Formulierung.
    einmalig: 'Einmalig. Fix.',
    abzeichen: {
      praxis: 'Von Praxen am häufigsten gebucht',
      handwerk: 'Von Betrieben am häufigsten gebucht',
      gastronomie: 'Von Lokalen am häufigsten gebucht',
      medien: 'Von Agenturen am häufigsten gebucht',
      kanzlei: 'Von Kanzleien am häufigsten gebucht',
      immobilien: 'Von Maklern am häufigsten gebucht',
    },
    bezeichnung: {
      praxis: 'Eine Praxis-Website',
      handwerk: 'Eine Handwerker-Website',
      gastronomie: 'Eine Gastro-Website',
      medien: 'Eine Portfolio-Website',
      kanzlei: 'Eine Kanzlei-Website',
      immobilien: 'Eine Makler-Website',
    },
    // {n} ist die Zahl der Anwendungen aus angebote.ts.
    anwendungen: '{n} individuelle Anwendungen deiner Wahl',
    anwendungenEine: 'Eine individuelle Anwendung deiner Wahl',
    anwendungenHinweis: {
      praxis:
        'z. B. Anfrage-Formular mit PDF, Online-Terminbuchung, Preisliste als PDF, mehrsprachige Seiten',
      handwerk:
        'z. B. Angebotsrechner, Notdienst-Formular, Projekt-Galerie, Anfahrts-Rechner',
      gastronomie:
        'z. B. Speisekarte zum Selbstpflegen, Tischreservierung, Tageskarte als PDF, Veranstaltungs-Kalender',
      medien:
        'z. B. Kundengalerie mit Passwort, Video-Player ohne Fremdanbieter, Shop für Prints, Anfrage mit Budget-Abfrage',
      kanzlei:
        'z. B. verschlüsselter Unterlagen-Upload, Terminanfrage, Karriere-Seite mit Bewerbungsformular, Mandanten-Login',
      immobilien:
        'z. B. Objektsuche nach Lage und Preis, Wertermittlungs-Anfrage, Exposé als PDF, Anbindung ans Maklerprogramm',
    },
    // Die Merkmale ohne die Anwendungen — die stehen als eigene Zeile
    // dazwischen, weil ihr Hinweis darunter gehört.
    merkmaleVor: {
      praxis: ['Eigenes Design, auf deine Praxis zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
      handwerk: ['Eigenes Design, auf deinen Betrieb zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
      gastronomie: ['Eigenes Design, auf dein Lokal zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
      medien: ['Eigenes Design, auf deine Arbeit zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
      kanzlei: ['Eigenes Design, auf deine Kanzlei zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
      immobilien: ['Eigenes Design, auf dein Büro zugeschnitten', 'Eigenes CMS, das du selbst pflegst'],
    },
    merkmaleNach: {
      praxis: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
      handwerk: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
      gastronomie: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
      medien: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
      kanzlei: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
      immobilien: [
        'DSGVO-konform, verschlüsselte Formulare',
        'Mobil und am Rechner schnell, SEO-sauber',
      ],
    },
    /**
     * Die Zeile, die das Paket einordnet.
     *
     * Zwei Dinge auf einmal, und beide auf Ansage: der Betrag auf
     * dieser Karte ist das Paket, das in DIESER Branche am häufigsten
     * gebucht wird — und wer in keiner der sechs Branchen steckt,
     * fängt trotzdem bei 2.000 € an. Ohne diesen Satz liest sich eine
     * Seite mit 2.500 € so, als wäre das der Einstiegspreis, und sechs
     * Branchenseiten lesen sich so, als gäbe es nur sechs Branchen.
     *
     * Der Betrag kommt aus angebote.ts (MINDESTPREIS), nicht von
     * Hand: sonst läuft er beim nächsten Mal auseinander.
     */
    breite: 'Andere Branche, anderer Umfang? Websites baue ich ab {ab} € — für jede Art von Unternehmen, klein wie groß.',
    zahlung: 'Zahlung: 50 % bei Auftrag, 50 % bei Launch.',
    bugfix: 'Bug-Fixes nach Launch: kostenlos.',
    pflege: 'Optional: Wartung und Support für 30 € im Monat, monatlich kündbar.',
  },

  stimmen: {
    titel: 'Was Kunden sagen',
    /**
     * Der Schnitt. Muss zum Google-Profil passen — die Zahl ist
     * nachprüfbar, und eine Seite, die mit echten Bewertungen wirbt,
     * verliert bei genau dieser Zahl am meisten, wenn sie nicht
     * stimmt.
     */
    note: '5,0',
    /**
     * ACHTUNG, eine Behauptung: „100 % Weiterempfehlung" liest sich
     * wie eine Zahl über alle Kunden, belegt ist sie nur über die
     * drei gezeigten Stimmen. Wer das enger fassen will, schreibt
     * hier „ALLE DREI EMPFEHLEN WEITER" — das steht wörtlich in den
     * Zitaten und ist von jedem nachlesbar.
     */
    unterZeile: 'AUS ECHTEN PROJEKTEN · 100 % WEITEREMPFEHLUNG',
    // Für Vorleseprogramme: fünf gemalte Sterne sind sonst fünf
    // bedeutungslose Zeichen.
    sterne: 'Fünf von fünf Sternen',
    noteLabel: 'Durchschnitt: 5,0 von 5 Sternen',
    // Auf der deutschen Fassung ist nichts übersetzt, der Hinweis
    // bleibt leer. Der Schlüssel steht trotzdem da, damit beide
    // Sprachen dieselbe Form haben.
    uebersetzt: '',
  },

  /**
   * Der Abschluss-Block. Ersetzt auf den umgebauten Seiten den
   * geteilten ClosingCta: der schickt zum Erstgespräch und zu einer
   * anderen Seite, hier soll genau eine Sache passieren.
   */
  /**
   * Der mitlaufende Knopf, der ab dem Hero unten mitfährt.
   *
   * Zwei Beschriftungen, weil zwei Größen: auf dem Handy eine Leiste
   * über die ganze Breite, am Rechner eine kleine Pille unten rechts.
   * Die Leiste hat weniger Platz, also den kürzeren Satz.
   */
  schwebend: {
    handy: 'Skizze in 48h',
    rechner: 'Kostenlose Skizze',
  },

  abschluss: {
    augenbraue: 'DER NÄCHSTE SCHRITT',
    headlineVor: 'Deine Skizze.',
    headlineStark: 'In 48 Stunden.',
    // {fuer} wird aus der Branche gefüllt.
    sub: 'Sechs kurze Fragen, zwei Minuten. Danach bekommst du einen echten Entwurf für {fuer} — kein Angebot, kein Verkaufsgespräch.',
    fuer: {
      praxis: 'deine Praxis',
      handwerk: 'deinen Betrieb',
      gastronomie: 'dein Lokal',
      medien: 'dein Studio',
      kanzlei: 'deine Kanzlei',
      immobilien: 'dein Büro',
    },
    cta: 'Kostenlose Website-Skizze anfordern',
    fakten: ['Antwort < 24 h', 'Kostenlos', 'DE & EN'],
    // Der einzige Weg, der von dieser Seite wegführt, und zwar ans
    // Telefon. Wer lieber redet als tippt, bricht sonst ganz ab.
    telVor: 'Lieber kurz telefonieren?',
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
    vertrauen: [
      'GDPR compliant',
      'Fixed price, guaranteed',
      'No subscription trap',
      'You own everything',
    ],
  },

  ersteSekunden: {
    praxis: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Patients check your practice online first.',
      fragen: ['Is this the right approach?', 'Who works there?', 'How do I get an appointment?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — no jargon, no paperwork.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
    handwerk: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Your customer is looking for you with a phone in hand.',
      fragen: ['Do you even do this?', 'Do you come out to me?', 'How do I reach you right now?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — before they swipe back to the results.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
    gastronomie: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Guests decide on their phone where to eat tonight.',
      fragen: ['What is on today?', 'Are you open?', 'Can I get a table?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — or the table is booked somewhere else.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
    medien: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Your client sees your site before they see your work.',
      fragen: ['What exactly do you do?', 'Who did you do it for?', 'Could you do that for me?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — or the job goes to the next studio.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
    kanzlei: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Clients open three firms in three tabs.',
      fragen: ['Do you handle my case?', 'Who actually works here?', 'How do I get an appointment?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — or they call number two.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
    immobilien: {
      augenbraue: 'THE FIRST 5 SECONDS',
      aufmacher: 'Anyone selling first checks who they would trust with it.',
      fragen: ['What have you sold already?', 'Do you know my area?', 'What will this cost me?'],
      pointeVor: 'Your website has to answer all three ',
      pointeStark: 'in seconds',
      pointeNach: ' — or a different sign goes up in that front garden next week.',
      uhr: '{s}s',
      uhrLabel: 'The first five seconds on your site',
    },
  },

  seo: {
    wort: {
      praxis: 'practice website',
      handwerk: 'website for your trade business',
      gastronomie: 'restaurant website',
      medien: 'portfolio website',
      kanzlei: 'law firm website',
      immobilien: 'estate agent website',
    },
    fuerWen: {
      praxis: 'for medical practices',
      handwerk: 'for contractors',
      gastronomie: 'for restaurants',
      medien: 'for creatives',
      kanzlei: 'for law and tax firms',
      immobilien: 'for estate agents',
    },
    zielgruppe: {
      praxis: 'Medical and dental practices',
      handwerk: 'Trade businesses',
      gastronomie: 'Restaurants, cafes and bars',
      medien: 'Photographers, videographers, advertising and production companies',
      kanzlei: 'Tax advisors, lawyers and notaries',
      immobilien: 'Estate agents and property managers',
    },
    branchenTitel: 'Websites by industry',
    mehr: '… and many more',
    kurz: {
      praxis: 'Practices',
      handwerk: 'Trades',
      gastronomie: 'Restaurants',
      medien: 'Media',
      kanzlei: 'Law firms',
      immobilien: 'Estate agents',
    },
    preisTitel: 'What a {wort} costs.',
    faqTitel: 'Common questions about a {wort}',
    fallstudieTitel: 'Websites {fuerWen}: {namen}',
  },

  ablauf: {
    augenbraue: 'HOW IT WORKS',
    headline: 'From sketch to live.',
    schritte: [
      {
        titel: 'A free sketch',
        text: 'You answer six short questions. Within 48 hours you get a real draft of your home page: not a quote, not a sales call.',
      },
      {
        titel: 'You decide',
        text: 'If the direction fits, we keep going. If it does not, you have a draft and I have a no. Both are fine, and both cost you nothing.',
      },
      {
        titel: 'Built, not clicked together',
        text: 'I build the site by hand and you watch it grow, saying what should change along the way. €{preis} fixed: no hourly rates, no add-ons.',
      },
      {
        titel: 'Live, and after',
        text: 'Launch, handover, and you maintain everything yourself in your own CMS. Bugs after launch are on me. You always talk to me, never to a ticket.',
      },
    ],
  },

  ueberMich: {
    augenbraue: 'WHO IS BEHIND THIS',
    headline: "Hi, I'm Tammo.",
    text: {
      praxis:
        'I build websites for medical practices, trades and companies of every size, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
      handwerk:
        'I build websites for trades, medical practices and companies of every size, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
      gastronomie:
        'I build websites for restaurants, trades and companies of every size, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
      medien:
        'I build websites for media studios, medical practices and trades, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
      kanzlei:
        'I build websites for law and tax firms, medical practices and companies of every size, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
      immobilien:
        'I build websites for estate agents, trades and companies of every size, from Bremen for all of Germany. No team, no agency in between: you talk to me from the first sketch to launch. And afterwards too, if something comes up.',
    },
    fakten: ['Reply < 24 h', 'One person, start to finish', 'Bremen'],
    fotoAlt: 'Tammo Hendriks, founder of Tammo Studios',
  },

  angebot: {
    einmalig: 'One time. Fixed.',
    abzeichen: {
      praxis: 'Most booked by practices',
      handwerk: 'Most booked by trades',
      gastronomie: 'Most booked by restaurants',
      medien: 'Most booked by agencies',
      kanzlei: 'Most booked by law firms',
      immobilien: 'Most booked by estate agents',
    },
    bezeichnung: {
      praxis: 'One practice website',
      handwerk: 'One website for your trade business',
      gastronomie: 'One restaurant website',
      medien: 'One portfolio website',
      kanzlei: 'One firm website',
      immobilien: 'One estate agent website',
    },
    anwendungen: '{n} custom applications of your choice',
    anwendungenEine: 'One custom application of your choice',
    anwendungenHinweis: {
      praxis:
        'e.g. an inquiry form with PDF, online appointment booking, a price list as PDF, bilingual pages',
      handwerk:
        'e.g. a quote calculator, an emergency callout form, a project gallery, a service-area checker',
      gastronomie:
        'e.g. a menu you edit yourself, table reservations, a daily special as PDF, an events calendar',
      medien:
        'e.g. a password-protected client gallery, a video player with no third party, a shop for prints, an inquiry form that asks for the budget',
      kanzlei:
        'e.g. an encrypted document upload, an appointment request, a careers page with an application form, a client login',
      immobilien:
        'e.g. a listing search by area and price, a valuation request, the brochure as a PDF, a link to your agency software',
    },
    merkmaleVor: {
      praxis: ['Your own design, cut to your practice', 'Your own CMS, maintained by you'],
      handwerk: ['Your own design, cut to your business', 'Your own CMS, maintained by you'],
      gastronomie: ['Your own design, cut to your place', 'Your own CMS, maintained by you'],
      medien: ['Your own design, cut to your work', 'Your own CMS, maintained by you'],
      kanzlei: ['Your own design, cut to your firm', 'Your own CMS, maintained by you'],
      immobilien: ['Your own design, cut to your office', 'Your own CMS, maintained by you'],
    },
    merkmaleNach: {
      praxis: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
      handwerk: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
      gastronomie: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
      medien: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
      kanzlei: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
      immobilien: ['GDPR compliant, encrypted forms', 'Fast on phone and desktop, clean SEO'],
    },
    breite: 'Different industry, different scope? I build websites from €{ab} — for any kind of business, small or large.',
    zahlung: 'Payment: 50 % on order, 50 % at launch.',
    bugfix: 'Bug fixes after launch: free.',
    pflege: 'Optional: maintenance and support for €30 a month, month to month.',
  },

  stimmen: {
    titel: 'What clients say',
    note: '5.0',
    /* Spiegelt die deutsche Zeile. Vorher stand hier „ORIGINAL GERMAN
       REVIEWS" — das stimmte, solange die Zitate im Original blieben.
       Seit sie übersetzt sind, trägt der Hinweis an jedem einzelnen
       Zitat diese Einschränkung, nicht mehr die Überschrift.

       Dieselbe Vorsicht wie auf Deutsch: „100 % would recommend" ist
       über die drei gezeigten Stimmen belegt, nicht über alle Kunden. */
    unterZeile: 'FROM REAL PROJECTS · 100% WOULD RECOMMEND',
    sterne: 'Five out of five stars',
    noteLabel: 'Average: 5.0 out of 5 stars',
    // Steht unter jedem übersetzten Zitat. Ohne ihn wäre es ein Zitat
    // mit fremder Stimme.
    uebersetzt: 'Translated from German',
  },

  schwebend: {
    handy: 'Sketch in 48h',
    rechner: 'Free sketch',
  },

  abschluss: {
    augenbraue: 'THE NEXT STEP',
    headlineVor: 'Your sketch.',
    headlineStark: 'In 48 hours.',
    sub: 'Six short questions, two minutes. Then you get a real draft for {fuer} — not a quote, not a sales call.',
    fuer: {
      praxis: 'your practice',
      handwerk: 'your business',
      gastronomie: 'your place',
      medien: 'your studio',
      kanzlei: 'your firm',
      immobilien: 'your office',
    },
    cta: 'Request your free website sketch',
    fakten: ['Reply < 24 h', 'Free', 'DE & EN'],
    telVor: 'Rather talk for a minute?',
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
