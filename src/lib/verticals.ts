// Vertical Landing Pages fuer Long-Tail-SEO ("webdesign [branche] bremen").
// Kein Nav-Eintrag — zugaenglich via Direct-Link + interne Verlinkung von
// /referenzen-Cards + Search-Traffic.
//
// Alle 3 Verticals folgen exakt der gleichen Struktur (Hero → Intro →
// Checklist → Pricing → CaseStudy → FAQ → FinalCTA). Rendering laeuft
// ueber src/components/VerticalLandingPage.astro — dieses File ist reine
// Datenquelle.
//
// Zuordnung Reference-Kategorie → Vertical-Slug (fuer /referenzen Cross-
// Links): Handwerk → handwerk, Medizin → praxis, Gastronomie → gastronomie.

export const VERTICAL_LINK_BY_CATEGORY: Record<string, { slug: string; label: string }> = {
  Handwerk: { slug: 'webdesign-handwerk', label: 'Websites für Handwerk' },
  Medizin: { slug: 'webdesign-praxis', label: 'Websites für Praxen' },
  Gastronomie: { slug: 'webdesign-gastronomie', label: 'Websites für Gastronomie' },
};

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
    background: VerticalHeroBackground;
  };
  // intro kann '\n' Zeilenumbrueche enthalten — Component nutzt .text-lines
  // (white-space: pre-line) fuer explizite Sentence-per-Line Kadenz.
  intro: string;
  checklistTitle: string;
  checklist: readonly string[];
  pricing: { paragraphs: readonly string[] };
  caseStudy: {
    eyebrow: string;
    paragraphs: readonly string[];
    references: readonly VerticalReference[];
  };
  faq: readonly VerticalFaqEntry[];
  finalCta: { headline: string; sub: string; buttonLabel: string };
};

export const VERTICALS: readonly Vertical[] = [
  {
    slug: 'handwerk',
    pageSlug: 'webdesign-handwerk',
    meta: {
      title: 'Websites für Handwerksbetriebe',
      description:
        'Handgemachte Websites für Handwerker in Bremen. Ab 2.000 €, in 14 Tagen live. Mit Notdienst-Funktion und mobile-first Design.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR HANDWERK',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Handwerker-Website.', highlight: true },
        { text: 'Handfest gebaut.' },
      ],
      subheadline:
        'Ab 2.000 €. In 14 Tagen live.\nAus Bremen für Handwerker in Norddeutschland.',
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
        'Eine Website 2.000 €.\nEin Online-Shop mit Zubehör 3.000 €.\nKeine Stundensätze, keine Sternchen.\nFertig in 14 Tagen.',
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
    finalCta: {
      headline: 'Klingt fair?',
      sub: '30 Minuten Erstgespräch. Kostenlos, unverbindlich.',
      buttonLabel: 'Erstgespräch anfragen',
    },
  },

  {
    slug: 'praxis',
    pageSlug: 'webdesign-praxis',
    meta: {
      title: 'Websites für Praxen und Ärzte',
      description:
        'Handgemachte Websites für Arztpraxen in Bremen. DSGVO-konform, mit Terminanfrage-Funktion, ab 2.000 €.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR PRAXEN',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Praxis-Website.', highlight: true },
        { text: 'Diskret, klar, professionell.' },
      ],
      subheadline: 'DSGVO-konform. Ab 2.000 €.\nAus Bremen für Praxen in ganz Deutschland.',
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
        'Eine Praxis-Website 2.000 €.\nMit erweiterten Features wie Online-Terminbuchung oder Patientenportal 3.000 € (Grundausstattung).\nAlle Standards inklusive — Datenschutz, Verschlüsselung, DSGVO-Konformität sind Pflicht, nicht Extra.',
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
          image: '/referenzen/ibi-doc-website.webp',
          alt: 'Vorschau der IBI-Website',
          url: 'https://www.ibi-doc.de',
          linkLabel: 'ibi-doc.de ansehen',
        },
      ],
    },
    faq: [
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
    finalCta: {
      headline: 'Klingt vertrauenswürdig?',
      sub: '30 Minuten Erstgespräch. Kostenlos, unverbindlich.',
      buttonLabel: 'Erstgespräch anfragen',
    },
  },

  {
    slug: 'gastronomie',
    pageSlug: 'webdesign-gastronomie',
    meta: {
      title: 'Websites für Gastronomie',
      description:
        'Handgemachte Websites für Gastronomiebetriebe in Bremen. Mit Speisekarte, Reservierung, Instagram-Feed, ab 2.000 €.',
    },
    hero: {
      eyebrow: 'WEBSITE FÜR GASTRONOMIE',
      headlineLines: [
        { text: 'Deine' },
        { text: 'Gastro-Website.', highlight: true },
        { text: 'Einzigartig wie' },
        { text: 'dein Laden.' },
      ],
      subheadline: 'Ab 2.000 €.\nAus Bremen für Gastro in ganz Deutschland.',
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
        'Eine Gastro-Website 2.000 €.\nMit Onlineshop für Merchandise oder Gutscheine 3.000 €.\nSpeisekarte pflegst du selbst — kein Anruf nötig, wenn sich der Wochenteller ändert.',
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
    finalCta: {
      headline: 'Klingt nach deinem Stil?',
      sub: '30 Minuten Erstgespräch. Kostenlos, unverbindlich.',
      buttonLabel: 'Erstgespräch anfragen',
    },
  },
];

export const getVerticalBySlug = (slug: string): Vertical | undefined =>
  VERTICALS.find((v) => v.slug === slug);
