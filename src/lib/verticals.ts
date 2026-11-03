// Vertical Landing Pages fuer Long-Tail-SEO ("webdesign [branche] bremen").
// Kein Nav-Eintrag — zugaenglich via Direct-Link + interne Verlinkung von
// /referenzen-Cards + Search-Traffic.
//
// Alle 3 Verticals folgen exakt der gleichen Struktur (Hero → Intro →
// Checklist → Pricing → CaseStudy → FAQ). Den Abschluss liefert der
// gemeinsame ClosingCta-Block, deshalb steht hier kein eigener CTA-Text
// mehr. Rendering laeuft ueber src/components/VerticalLandingPage.astro —
// dieses File ist reine Datenquelle.
//
// Zuordnung Reference-Kategorie → Vertical-Slug (fuer /referenzen Cross-
// Links): Handwerk → handwerk, Medizin → praxis, Gastronomie → gastronomie.

import type { RouteKey } from './routes.mjs';

/**
 * Kategorie einer Referenz → Routen-SCHLUESSEL der passenden
 * Branchenseite.
 *
 * Vorher stand hier der fertige deutsche Pfad und die Beschriftung.
 * Beides geht in zwei Sprachen nicht: der Pfad haengt an der Sprache,
 * die Beschriftung steht im Woerterbuch. Uebrig bleibt die Zuordnung
 * selbst, und die ist sprachunabhaengig.
 */
export const VERTICAL_KEY_BY_CATEGORY = {
  Handwerk: 'handwerk',
  Medizin: 'praxis',
  Gastronomie: 'gastronomie',
  // Gräfe Media lag in references.ts schon unter dieser Kategorie,
  // hatte aber keine Branchenseite, auf die der Querverweis zeigen
  // konnte. Jetzt gibt es sie.
  Medien: 'medien',
} as const satisfies Record<string, RouteKey>;

export type VerticalReference = {
  name: string;
  image: string;
  alt: string;
  url: string;
  linkLabel: string;
};

export type VerticalFaqEntry = { q: string; a: string };

// Headline-Line unterstuetzt optionalen highlight-Flag — Component
// rendert die Line dann in eine <span class="hero-highlight"> mit
// SVG-Underline (schraeger Marker-Stroke).
export type VerticalHeadlineLine = { text: string; highlight?: boolean };

export type VerticalHeroBackground = {
  image: string;
  // object-position value (z.B. "center 30%") — Default ist "center center".
  focalPoint?: string;
};

export type Vertical = {
  slug: string;
  pageSlug: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headlineLines: readonly VerticalHeadlineLine[];
    subheadline: string;
    /**
     * Das Foto hinter dem Hero. OPTIONAL.
     *
     * Für eine neue Branche gibt es nicht immer eines, und ein
     * fremdes Stockfoto wäre schlechter als keines: es verspricht
     * eine Nähe zur Branche, die nicht da ist. Ohne Bild baut die
     * Komponente einen eigenen Hintergrund aus Verlauf und Raster —
     * dieselbe Sprache wie die Startseite. Kommt später ein Foto
     * dazu, reicht diese eine Zeile.
     */
    background?: VerticalHeroBackground;
  };
  // intro kann '\n' Zeilenumbrueche enthalten — Component nutzt .text-lines
  // (white-space: pre-line) fuer explizite Sentence-per-Line Kadenz.
  intro: string;
  checklistTitle: string;
  checklist: readonly string[];
  pricing: { paragraphs: readonly string[] };
  /**
   * Zwei Kundenseiten als Beleg. OPTIONAL.
   *
   * Für eine neue Branche gibt es noch keine. Erfundene oder
   * branchenfremde Referenzen wären an dieser Stelle das Gegenteil
   * von Vertrauen. Fehlt der Block, zeigt die Komponente stattdessen
   * den Ablauf — der überzeugt ohne fremdes Material.
   */
  caseStudy?: {
    eyebrow: string;
    paragraphs: readonly string[];
    references: readonly VerticalReference[];
  };
  faq: readonly VerticalFaqEntry[];
};

// `as const satisfies` statt einer Typ-Annotation: die Annotation
// wuerde die Literal-Typen wegwerfen, und damit auch die Laengen der
// Listen. Genau die braucht Shape<> aber, um zu merken, wenn die
// englische Checkliste einen Punkt weniger hat als die deutsche.
// `satisfies` prueft trotzdem weiter gegen Vertical.
export const VERTICALS = [
  {
    slug: 'handwerk',
    pageSlug: 'webdesign-handwerk',
    meta: {
      // „erstellen lassen" steht in fast jedem Titel, der zu dieser
      // Suche rankt, und fehlte hier komplett. Der Markenzusatz
      // „ — Tammo Studios" kommt vom Layout dazu; deshalb bleibt der
      // Titel unter 45 Zeichen, sonst schneidet Google ab.
      title: 'Website für Handwerker erstellen lassen',
      description:
        'Handwerker-Website vom Entwickler aus Bremen: Notdienst-Knopf, Referenzen, auf dem Handy schnell. 2.000 € komplett, Festpreis. Kostenlose Skizze in 48 Stunden.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR HANDWERK',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Handwerker-Website.', highlight: true },
        { text: 'Handfest gebaut.' },
      ],
      // „Ab" widerspricht dem Festpreis, mit dem die Angebotskarte
      // darunter wirbt. Der Betrag steht auch in lib/angebote.ts.
      subheadline:
        '2.000 € komplett. In 14 Tagen live.\nAus Bremen für Handwerker in Norddeutschland.',
      background: {
        image: '/webdesign-landings/hero-handwerk.webp',
        focalPoint: 'center 40%',
      },
    },
    intro:
      'Kunden finden dich auf dem Smartphone. Zwischen zwei Aufträgen, im Notdienst, spät am Abend. Deine Website muss genau dort funktionieren — schnell, klar, mit direkter Kontaktmöglichkeit.',
    checklistTitle: 'Was auf eine Handwerker-Website gehört',
    checklist: [
      'Direkte Erreichbarkeit (Anruf-Button, WhatsApp, Notdienst)',
      'Klares Einzugsgebiet — welche Städte du bedienst',
      'Referenzen aus der Region als Vertrauensbeweis',
      'Anfrageformular ohne 15 Pflichtfelder',
      'Mobile-optimiert (80% deiner Anrufer sind unterwegs)',
      'Google Maps + Google Business Anbindung',
      'Notdienst-Button prominent, ein Klick zum Anruf',
    ],
    pricing: {
      paragraphs: [
        'Eine Website 2.000 €.\nEin Online-Shop mit Zubehör 3.000 €.\nEine individuelle Anwendung ist jeweils drin — zum Beispiel ein Angebotsrechner.\nKeine Stundensätze, keine Sternchen. Fertig in 14 Tagen.',
        'Für 30 € im Monat übernehme ich Wartung, Sicherheits-Updates und priorisierten Support bei Störungen.\nOptional, monatlich kündbar.',
      ],
    },
    caseStudy: {
      eyebrow: 'AUS DER PRAXIS — WÄRMEPOWER + KIRSCH',
      paragraphs: [
        'Wärmepower ist ein Meisterbetrieb aus Lemwerder für Heizung, Wärmepumpe und Sanitär.\nNotdienst 24/7 direkt in der Navigation, klare Positionierung als lokaler Meister-Betrieb — kein anonymes Konzern-Look.',
        'Kirsch Dach & Fassade aus Bremen bedient Dach- und Fassadenprojekte in ganz Norddeutschland (bis 250 km Umkreis).\nProminente Sturmschaden-Hotline in der Navigation, "Schnelle Anfrage"-Formular direkt im Hero.',
        'Beide Sites setzen auf klares Handwerk-Vokabular ohne Konzern-Optik, mobile-first, mit Google-Business-Anbindung.',
      ],
      references: [
        {
          name: 'Wärmepower',
          image: '/referenzen/waermepowerwebsite.webp',
          alt: 'Vorschau der Wärmepower-Website',
          url: 'https://waermepower.de',
          linkLabel: 'waermepower.de ansehen',
        },
        {
          name: 'Kirsch Dach & Fassade',
          image: '/referenzen/kirsch-dach-fassade.webp',
          alt: 'Vorschau der Kirsch Dach & Fassade-Website',
          url: 'https://kirsch-dach-fassade.de',
          linkLabel: 'kirsch-dach-fassade.de ansehen',
        },
      ],
    },
    faq: [
      {
        q: 'Kann ich Texte und Öffnungszeiten selbst ändern?',
        a: 'Ja. Du bekommst ein eigenes CMS zum selbst Pflegen. Kein Code, kein Webmaster nötig.',
      },
      {
        q: 'Wie funktioniert der Notdienst-Button?',
        a: 'Wir bauen einen prominenten Anruf-Button in die Navigation. Auf Mobile ein Klick, Anruf ist raus.',
      },
      {
        q: 'Bekomme ich mehr Google-Bewertungen?',
        a: 'Ja, indirekt schon. Deine Website generiert selbst keine Bewertungen, aber sie sorgt für einfachere Kontaktaufnahme, klarere Buchungswege und ein prominent verlinktes Google-Profil. Mehr echte Anfragen → mehr zufriedene Kunden → mehr Bewertungen. Reichweite und Bewertungen wachsen zusammen.',
      },
      {
        q: 'Wie schnell werde ich bei Google sichtbar?',
        a: 'Deine Website ist sofort online. Ranking bei Google dauert 2–4 Wochen für den Namen deines Betriebs, 3–6 Monate für allgemeine Suchen wie "heizung bremen".',
      },
      {
        q: 'Was passiert bei einem Ausfall?',
        a: 'Deine Site läuft auf Vercel, einer der zuverlässigsten Hosting-Plattformen mit 99.99% Uptime. Im Pflege-Paket bin ich bei Störungen priorisiert erreichbar.',
      },
    ],
  },

  {
    slug: 'praxis',
    pageSlug: 'webdesign-praxis',
    meta: {
      // Der Praxis-Themenkreis ist die staerkste sichtbare Nachfrage
      // (43 Impressionen auf "praxis website inhalte", "arzt homepage
      // richtlinien", "praxis website vertrauen", "praxis website
      // dsgvo"). Titel und Description nehmen die Woerter deshalb auf.
      title: 'Website für Arztpraxis erstellen lassen',
      // Stand vorher „Ab 2.500 € komplett" — ein Widerspruch in sich,
      // entstanden beim Umstellen des Preises.
      description:
        'Praxis-Website vom Entwickler aus Bremen: DSGVO-konform, mit ' +
        'Terminanfrage und Team-Seite. 2.500 € komplett, Festpreis. ' +
        'Kostenlose Skizze in 48 Stunden.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR PRAXEN',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Praxis-Website.', highlight: true },
        { text: 'Diskret, klar, professionell.' },
      ],
      // Der Betrag steht auch in lib/angebote.ts und in der
      // Angebotskarte. Wer ihn hier aendert, aendert ihn dort mit.
      subheadline:
        'DSGVO-konform. Komplett für 2.500 €.\nAus Bremen für Praxen in ganz Deutschland.',
      background: {
        image: '/webdesign-landings/hero-praxis.webp',
        focalPoint: 'center 35%',
      },
    },
    // Sentence-per-Line via \n — Component nutzt .text-lines (pre-line).
    intro:
      'Patienten checken deine Praxis zuerst online.\n' +
      'Sie wollen wissen: Passt der Ansatz?\n' +
      'Wer arbeitet dort?\n' +
      'Wie kommen sie zum Termin?\n' +
      'Deine Website muss diese Fragen in Sekunden beantworten — ohne Fachchinesisch, ohne Bürokratie.',
    checklistTitle: 'Was auf eine Praxis-Website gehört',
    checklist: [
      'DSGVO-konforme Umsetzung (kritisch für medizinische Kontexte)',
      'Terminanfrage einfach und diskret',
      'Leistungsübersicht klar strukturiert',
      'Team-Vorstellung mit Fotos (Vertrauensaufbau)',
      'Anfahrt + Öffnungszeiten prominent',
      'Sichere Kontaktformulare (verschlüsselte Übertragung)',
      'Barrierearme Bedienung',
    ],
    pricing: {
      paragraphs: [
        // Wird auf der umgebauten Seite NICHT angezeigt — dort steht
        // die Angebotskarte. Der Text bleibt trotzdem richtig, damit
        // die Seite nicht zwei Preise kennt, falls der Umbau je
        // abgeschaltet wird.
        'Eine Praxis-Website 2.500 €, inklusive zwei individueller Anwendungen — etwa einem Anfrageformular, das die Vorsorge-Art direkt mit abfragt, und einer Online-Terminbuchung.\nAlle Standards inklusive — Datenschutz, Verschlüsselung, DSGVO-Konformität sind Pflicht, nicht Extra.',
        'Für 30 € im Monat übernehme ich Wartung, Sicherheits-Updates und priorisierten Support.\nOptional, monatlich kündbar.',
      ],
    },
    caseStudy: {
      eyebrow: 'AUS DER PRAXIS — SAMEDOS + IBI',
      paragraphs: [
        'Samedos ist eine arbeitsmedizinische Praxis aus Bremen mit klarem Fokus auf DGUV-Vorschrift 2.\nDas Institut für Betriebsmedizin Isernhagen (IBI) bietet betriebsmedizinische Betreuung und Offshore-Eignung.',
        'Beide Sites zeigen Team, Leistungen und Kontaktwege ohne medizinisches Marketing-Sprech.',
      ],
      references: [
        {
          name: 'Samedos',
          image: '/referenzen/samedoswebsite.webp',
          alt: 'Vorschau der Samedos-Website',
          url: 'https://www.samedos.de',
          linkLabel: 'samedos.de ansehen',
        },
        {
          name: 'IBI',
          image: '/referenzen/ibi.webp',
          alt: 'Vorschau der IBI-Website',
          url: 'https://www.ibi-doc.de',
          linkLabel: 'ibi-doc.de ansehen',
        },
      ],
    },
    faq: [
      // Die beiden folgenden Fragen bedienen Suchanfragen, fuer die
      // die Seite laut Search Console schon Impressionen bekommt
      // („praxis website inhalte", „arzt homepage richtlinien"), ohne
      // bisher eine Antwort darauf zu haben.
      {
        q: 'Welche Inhalte gehören auf eine Praxis-Website?',
        a: 'Leistungen, Team mit Fotos, Öffnungszeiten, Anfahrt, Kontakt und eine Terminanfrage — ungefähr in dieser Reihenfolge der Wichtigkeit. Dazu Impressum und Datenschutzerklärung. Alles Weitere ist Kür: Aufklärungsvideos, Downloads für Patienten, Stellenanzeigen. Die Liste weiter oben auf dieser Seite ist genau das.',
      },
      {
        q: 'Welche Richtlinien muss eine Arzt-Homepage einhalten?',
        a: 'Vier Bereiche: Impressumspflicht, Datenschutz nach DSGVO, das Heilmittelwerbegesetz und die Berufsordnung deiner Kammer. Die technische Seite baue ich mit — Cookie-Banner mit echtem Opt-in, verschlüsselte Formulare, EU-Hosting, passende Datenschutzerklärung. Bei den Inhalten sagst du mir, was deine Kammer erlaubt: ich bin Entwickler, kein Anwalt.',
      },
      {
        q: 'Ist die Seite DSGVO-konform?',
        a: 'Ja, komplett. Cookie-Banner mit echtem Opt-in, verschlüsselte Formulare, EU-Hosting, Datenschutzerklärung passend zur Praxis. Rechtlich sauber ab Tag 1.',
      },
      {
        q: 'Wie funktioniert die Terminanfrage?',
        a: 'Wir bauen ein diskretes Formular mit den Feldern die du brauchst — Name, Kontakt, kurze Beschreibung. Kein Kalender-Zwang, keine externe Software. Bei Bedarf integrierbar mit Doctolib oder ähnlichen.',
      },
      {
        q: 'Können wir Aufklärungsvideos einbauen?',
        a: 'Ja. Videos werden datenschutz-konform eingebettet (kein YouTube-Cookie ohne Consent).',
      },
      {
        q: 'Ist es mit Google-Bewertungen (Kununu, Jameda, Google) kompatibel?',
        a: 'Ja. Wir verlinken deine bestehenden Profile und machen es einfach, dich zu bewerten.',
      },
      {
        q: 'Kann ich Behandlungspreise nennen?',
        a: 'Rechtlich schwierig bei Kassenpraxen, unproblematisch bei Privat- und Wahlleistungen. Wir klären das im Erstgespräch und finden die passende Kommunikation.',
      },
    ],
  },

  {
    slug: 'gastronomie',
    pageSlug: 'webdesign-gastronomie',
    meta: {
      title: 'Website für Restaurants erstellen lassen',
      description:
        'Handgemachte Websites für Restaurants, Cafés und Kneipen in ' +
        'Bremen: Speisekarte selbst pflegen, Reservierungsanfrage, ' +
        'Instagram-Feed. Ab 2.000 €.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR GASTRONOMIE',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Gastro-Website.', highlight: true },
        { text: 'Einzigartig wie' },
        { text: 'dein Laden.' },
      ],
      subheadline:
        '2.000 € komplett.\nAus Bremen für Gastro in ganz Deutschland.',
      background: {
        image: '/webdesign-landings/hero-gastro.webp',
        focalPoint: 'center 45%',
      },
    },
    intro:
      'Eine Kneipe ist keine SaaS-Startup-Site. Ein feines Restaurant kein Baumarkt. Deine Website muss die Atmosphäre deines Ladens einfangen — dunkel und rau, warm und einladend, elegant und ruhig. Was auch immer du bist.',
    checklistTitle: 'Was auf eine Gastro-Website gehört',
    checklist: [
      'Aktuelle Speisekarte (im CMS selbst pflegen)',
      'Öffnungszeiten prominent + tagesaktuell',
      'Reservierung / Tisch buchen (einfach oder integriert)',
      'Instagram-Anbindung (da passiert eh Content)',
      'Events, Specials, Ruhetage klar sichtbar',
      'Google Maps-Anbindung mit korrektem Standort',
      'Fotos vom Laden, Team, Gerichten — echte Fotos, keine Stockbilder',
    ],
    pricing: {
      paragraphs: [
        'Eine Gastro-Website 2.000 €, inklusive einer individuellen Anwendung — etwa einer Reservierungsanfrage, die Gruppengröße und Anlass gleich mitnimmt.\nMit Onlineshop für Merchandise oder Gutscheine 3.000 €.\nSpeisekarte pflegst du selbst — kein Anruf nötig, wenn sich der Wochenteller ändert.',
        'Für 30 € im Monat übernehme ich Wartung, Sicherheits-Updates und priorisierten Support.\nOptional, monatlich kündbar.',
      ],
    },
    caseStudy: {
      eyebrow: 'AUS DER PRAXIS — ER & SIE',
      paragraphs: [
        'Er & Sie ist eine Eckkneipe in Bremen Walle. Dunkel, vintage, mit Geschichte.\nDie Website sollte genau diese Atmosphäre transportieren — kein sauberes Startup-Design, sondern warmes Ambiente mit Fokus auf Kernbotschaften: wer wir sind, wann wir offen haben, wie du herkommst.',
      ],
      references: [
        {
          name: 'Er & Sie',
          image: '/referenzen/erundsiewebsite.webp',
          alt: 'Vorschau der Er & Sie-Website',
          url: 'https://erundsiebremen.de',
          linkLabel: 'erundsiebremen.de ansehen',
        },
      ],
    },
    faq: [
      {
        q: 'Wie oft kann ich die Speisekarte ändern?',
        a: 'So oft du willst. Das CMS ist dein Tool — du gehst rein, änderst Preise oder Gerichte, klickst speichern, fertig. Kein Anruf, kein Aufpreis.',
      },
      {
        q: 'Was ist mit Reservierungen?',
        a: 'Kleine Betriebe: einfaches Formular. Größere: Integration mit OpenTable, Bookatable oder anderen Systemen.',
      },
      {
        q: 'Können wir Events dazu bauen?',
        a: 'Klar. Event-Kalender ist standardmäßig integrierbar. Live-Musik, Themenabende, private Events.',
      },
      {
        q: 'Wie kriege ich neue Gäste über die Website?',
        a: 'Kombination aus Local SEO (Google findet dich bei "kneipe bremen walle"), gutem Instagram-Feed auf der Site, und ehrlichen Bewertungen. Der Traffic-Aufbau dauert 3–6 Monate.',
      },
      {
        q: 'Was ist mit Google Maps und Bewertungen?',
        a: 'Wir verknüpfen dein Google Business Profile prominent. Falls du noch keins hast: setzen wir zusammen auf.',
      },
    ],
  },
  {
    slug: 'medien',
    pageSlug: 'webdesign-medien',
    meta: {
      // „Portfolio-Website" ist das Wort, das Fotografen, Videografen
      // und Agenturen fuer ihre eigene Seite benutzen — „Medien-
      // Website" tippt niemand.
      title: 'Portfolio-Website erstellen lassen',
      description:
        'Portfolio-Website für Fotografen, Videografen und Agenturen, von Hand gebaut in Bremen. Video ohne YouTube, schnell trotz schwerer Bilder. 2.000 € komplett, Skizze in 48 Stunden.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR MEDIEN',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Portfolio-Website.', highlight: true },
        { text: 'So gut wie deine Arbeit.' },
      ],
      subheadline:
        '2.000 € komplett. In 14 Tagen live.\nFür Fotografen, Videografen und Agenturen.',
      // KEIN FOTO, und das mit Absicht: fuer diese Branche gibt es
      // keins im Projekt, und ein gekauftes Stockbild vor einer Seite,
      // die mit eigener Bildsprache wirbt, waere der schlechteste
      // denkbare erste Eindruck. Die Komponente baut stattdessen einen
      // eigenen Hintergrund. Kommt spaeter ein Foto, reicht hier die
      // background-Zeile.
    },
    intro:
      'Wer dich bucht, hat vorher deine Seite gesehen.\n' +
      'Sie ist die erste Arbeitsprobe, die du abgibst — noch vor dem Reel und noch vor dem Portfolio-PDF.\n' +
      'Wenn sie langsam lädt oder aussieht wie tausend andere, hast du einen Teil der Antwort schon gegeben.',
    checklistTitle: 'Was auf eine Portfolio-Website gehört',
    checklist: [
      'Arbeiten groß, scharf und trotzdem schnell geladen',
      'Video ohne YouTube-Logo und ohne Cookie-Banner davor',
      'Projekte nach Art sortiert: Image, Produkt, Hochzeit, Doku',
      'Kundenlogos oder Kundenliste als Beleg',
      'Ein Anfrageweg, der nicht nach Behördenformular aussieht',
      'Neue Arbeiten selbst einstellen, ohne jemanden zu fragen',
      'Eine Seite, die nicht aussieht wie eine Vorlage',
    ],
    pricing: {
      paragraphs: [
        'Eine Portfolio-Website 2.000 €, inklusive einer individuellen Anwendung — zum Beispiel einer Kundengalerie mit Passwort oder einem Video-Player ohne Fremdanbieter.\nKeine Stundensätze, keine Sternchen. Fertig in 14 Tagen.',
        'Für 30 € im Monat übernehme ich Wartung, Sicherheits-Updates und priorisierten Support.\nOptional, monatlich kündbar.',
      ],
    },
    caseStudy: {
      eyebrow: 'AUS DER PRAXIS — GRÄFE MEDIA',
      paragraphs: [
        'Gräfe Media ist eine Mediengestaltung aus Bremen: Film, Foto und Grafik aus einer Hand.\nDie Seite stellt die Arbeiten nach vorn und erklärt erst danach, wer dahintersteckt — in dieser Reihenfolge, weil Kunden so suchen.',
        'Gebaut wie alles hier: Astro, eigenes CMS, kein Baukasten. Neue Projekte stellt das Team selbst ein.',
      ],
      references: [
        {
          name: 'Gräfe Media',
          image: '/referenzen/graefe-media.webp',
          alt: 'Vorschau der Website von Gräfe Media',
          url: 'https://graefemedia.de',
          linkLabel: 'graefemedia.de ansehen',
        },
      ],
    },
    faq: [
      {
        q: 'Kann ich Videos ohne YouTube einbinden?',
        a: 'Ja. Die Dateien liegen bei dir oder bei einem Anbieter ohne Werbung und ohne Tracking. Kein fremdes Logo im Player, keine Vorschläge für andere Videos am Ende, und kein Cookie-Banner, das sich vor dein Reel schiebt.',
      },
      {
        q: 'Wird die Seite langsam, wenn ich viele Bilder zeige?',
        a: 'Nicht, wenn man es richtig macht. Bilder werden beim Hochladen in mehreren Größen und modernen Formaten erzeugt, und geladen wird nur, was gerade zu sehen ist. Große Galerien sind der Normalfall in dieser Branche, nicht die Ausnahme.',
      },
      {
        q: 'Ich kann selbst gestalten. Warum nicht Webflow oder Squarespace?',
        a: 'Kannst du machen, und für manche reicht das. Der Unterschied: hier gibt es kein Raster, in das deine Arbeit hineinpassen muss, keine Monatsgebühr, die mit der Seite wächst, und keinen Anbieter, der dir das Layout unter den Füßen ändert. Du bekommst den Code.',
      },
      {
        q: 'Kann ich neue Projekte selbst einstellen?',
        a: 'Ja. Du bekommst ein eigenes CMS: Projekt anlegen, Bilder hochladen, Reihenfolge ziehen, fertig. Kein Code, kein Anruf bei mir.',
      },
      {
        q: 'Geht auch ein geschützter Bereich für Kunden?',
        a: 'Ja, das ist eine der individuellen Anwendungen: eine Galerie mit Passwort, aus der dein Kunde auswählt oder Dateien zieht.',
      },
      {
        q: 'Was passiert, wenn wir uns trennen?',
        a: 'Du bekommst den kompletten Code und alle Inhalte. Die Seite läuft auf deinem eigenen Hosting weiter, auch ohne mich. Es gibt nichts, was dich hier festhält.',
      },
    ],
  },
  {
    slug: 'kanzlei',
    pageSlug: 'webdesign-kanzlei',
    meta: {
      title: 'Kanzlei-Website erstellen lassen',
      description:
        'Kanzlei-Website für Steuerberater und Rechtsanwälte, von Hand gebaut in Bremen. Sicherer Unterlagen-Upload, Karriere-Seite, berufsrechtlich sauber. 2.500 € komplett, Skizze in 48 Stunden.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR KANZLEIEN',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Kanzlei-Website.', highlight: true },
        { text: 'Seriös, ohne steif.' },
      ],
      subheadline:
        '2.500 € komplett. In 14 Tagen live.\nFür Steuerberater, Anwälte und Notare.',
      // Kein Foto. Siehe medien: lieber ein gebauter Hintergrund als
      // ein gekaufter Händedruck vor grauem Himmel — das Bild, das
      // auf jeder zweiten Kanzlei-Seite steht.
    },
    intro:
      'Mandanten vergleichen, bevor sie anrufen.\n' +
      'Sie öffnen drei Kanzleien in drei Tabs und entscheiden in einer Minute, bei welcher sie es versuchen.\n' +
      'Entschieden wird dabei selten über Fachliches — sondern darüber, wer greifbar wirkt.',
    checklistTitle: 'Was auf eine Kanzlei-Website gehört',
    checklist: [
      'Rechtsgebiete klar getrennt, nicht als Bleiwüste',
      'Team mit Gesichtern — Mandanten suchen Menschen',
      'Erstkontakt ohne Hürde: Rückruf, Formular oder Termin',
      'Unterlagen sicher und verschlüsselt übergeben',
      'Eine Karriere-Seite, die Bewerber wirklich anspricht',
      'Pflichtangaben sauber: Impressum, Berufsrecht, Datenschutz',
      'Selbst pflegbar — neue Leute, neue Leistungen, ohne Agentur',
    ],
    pricing: {
      paragraphs: [
        'Eine Kanzlei-Website 2.500 €, inklusive zwei individueller Anwendungen — etwa einem verschlüsselten Unterlagen-Upload und einer Terminanfrage.\nKeine Stundensätze, keine Sternchen. Fertig in 14 Tagen.',
        'Für 30 € im Monat übernehme ich Wartung, Sicherheits-Updates und priorisierten Support.\nOptional, monatlich kündbar.',
      ],
    },
    faq: [
      {
        q: 'Darf ich als Anwalt oder Steuerberater so werben?',
        a: 'Das Berufsrecht erlaubt sachliche Information über die Tätigkeit und verbietet Reklame, die irreführt oder Erfolge verspricht. Die Seiten, die ich baue, informieren — sie versprechen nichts. Die technische Seite liefere ich; was deine Kammer im Einzelfall erlaubt, sagst du mir. Ich bin Entwickler, kein Anwalt.',
      },
      {
        q: 'Können Mandanten Unterlagen sicher hochladen?',
        a: 'Ja, das ist eine der beiden individuellen Anwendungen: ein verschlüsselter Upload, der direkt bei dir landet statt im E-Mail-Anhang. Wer schon ein Mandantenportal hat, bekommt stattdessen einen klaren Weg dorthin.',
      },
      {
        q: 'Lässt sich das mit DATEV oder unserem Portal verbinden?',
        a: 'Verlinken immer. Tiefer verbinden hängt davon ab, welche Schnittstelle dein Anbieter öffnet — das klären wir im Erstgespräch, bevor irgendetwas versprochen wird.',
      },
      {
        q: 'Hilft die Seite bei der Suche nach Mitarbeitern?',
        a: 'Bei vielen Kanzleien ist das inzwischen der eigentliche Grund für eine neue Seite. Eine Karriere-Seite mit echten Gesichtern, ehrlichen Aufgaben und einer Bewerbung in zwei Minuten bringt mehr als jede Anzeige — und sie läuft weiter, wenn die Anzeige ausgelaufen ist.',
      },
      {
        q: 'Wie schnell sind wir bei Google zu finden?',
        a: 'Die Seite ist sofort online. Beim eigenen Kanzleinamen stehst du nach 2–4 Wochen oben, bei allgemeinen Suchen wie „steuerberater bremen" dauert es 3–6 Monate.',
      },
      {
        q: 'Können wir Texte selbst ändern?',
        a: 'Ja. Du bekommst ein eigenes CMS: neue Kollegin eintragen, Leistung ergänzen, Text korrigieren. Kein Code, kein Anruf bei mir.',
      },
    ],
  },
] as const satisfies readonly Vertical[];
