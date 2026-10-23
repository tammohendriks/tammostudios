// Englische Texte der drei Branchen-Landingpages.
//
// NUR TEXT. Bilder, URLs, Slugs und die Entscheidung, welche
// Headline-Zeile den Marker-Strich bekommt, stehen weiter in
// verticals.ts. verticals.i18n.ts mischt beides zusammen. Stuende das
// Bild hier nochmal, gaebe es zwei Orte fuer dieselbe Datei — genau die
// Art Doppelung, die irgendwann auseinanderlaeuft.
//
// Begriffe, so entschieden:
//   Handwerk    → Contractors        (gaengig fuer Bau- und Ausbaugewerke)
//   Praxis      → Medical Practices  (deckt auch die Betriebsmedizin)
//   Gastronomie → Restaurants        (Kneipen und Cafes mitgemeint)
//
// Tonfall wie in en.ts: direkt, "you", kurze Saetze, keine
// Gedankenstriche, amerikanische Schreibweise. Deshalb steht im
// Englischen ein Doppelpunkt, wo im Deutschen ein Gedankenstrich steht.

import type { VERTICALS } from './verticals';

type DeutscheEintraege = (typeof VERTICALS)[number];

/** Die Slugs, wie sie in verticals.ts stehen. */
type Slug = DeutscheEintraege['slug'];

/** Der deutsche Eintrag zu einem Slug. */
type Deutsch<S extends Slug> = Extract<DeutscheEintraege, { slug: S }>;

/**
 * Ein Tupel gleicher Laenge wie T, in dem jeder Eintrag E ist.
 *
 * Darauf beruht die ganze Sicherung: `as const satisfies` in
 * verticals.ts macht aus den Listen Tupel mit fester Laenge, und ein
 * Mapped Type ueber ein Tupel erhaelt diese Laenge. Hat die englische
 * Checkliste einen Punkt weniger als die deutsche, meldet
 * `npm run check` TS2322. Ein handgeschriebenes `readonly string[]`
 * faenge das nicht.
 *
 * T MUSS hier ein nackter Typ-Parameter sein. Stuende stattdessen
 * direkt `{ [K in keyof V['faq']]: ... }` unten im Typ, waere der
 * Mapped Type nicht mehr homomorph: TypeScript wuerde dann auch length,
 * toString und den ganzen Rest des Array-Prototyps mitabbilden und das
 * Tupel verlieren. Genau deshalb diese Zwischenstufe.
 */
type Gleichlang<T, E> = { [K in keyof T]: E };

/** Tupel gleicher Laenge aus Zeichenketten. */
type Texte<T> = Gleichlang<T, string>;

/**
 * Der uebersetzbare Teil eines Branchen-Eintrags.
 *
 * Shape<> aus i18n/shape.ts passt hier nicht: das spiegelt eine
 * Struktur 1:1, waehrend hier bewusst Felder FEHLEN — Bilder, URLs,
 * Namen, der Hintergrund, der Slug. Deshalb ein eigener Typ, der aus
 * dem deutschen Eintrag nur die Textfelder ableitet.
 */
type Uebersetzbar<V extends DeutscheEintraege> = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    // Gleiche Anzahl Zeilen wie im Deutschen, aber nur der Text: welche
    // Zeile den Marker-Strich bekommt, bleibt eine Gestaltungsfrage und
    // steht in verticals.ts.
    headlineLines: Texte<V['hero']['headlineLines']>;
    subheadline: string;
  };
  intro: string;
  checklistTitle: string;
  checklist: Texte<V['checklist']>;
  // Flacher als im Deutschen (dort pricing.paragraphs): das Objekt
  // drumherum traegt nichts, wenn es nur ein Feld hat.
  pricingParagraphs: Texte<V['pricing']['paragraphs']>;
  caseStudy: {
    eyebrow: string;
    paragraphs: Texte<V['caseStudy']['paragraphs']>;
    // Nur Alternativtext und Linktext. Name, Bild und URL sind in
    // beiden Sprachen dieselben.
    references: Gleichlang<V['caseStudy']['references'], { alt: string; linkLabel: string }>;
  };
  faq: Gleichlang<V['faq'], { q: string; a: string }>;
};

export type VerticalTexte = { [S in Slug]: Uebersetzbar<Deutsch<S>> };

export const VERTICAL_TEXT_EN: VerticalTexte = {
  handwerk: {
    meta: {
      title: 'Websites for Contractors',
      description:
        'Handcrafted websites for contractors in Bremen. From €2,000, ' +
        'live in 14 days. With an emergency call button and a ' +
        'mobile-first build.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR CONTRACTORS',
      headlineLines: ['Your', 'contractor website.', 'Built solid.'],
      subheadline:
        'From €2,000. Live in 14 days.\nBuilt in Bremen for contractors across northern Germany.',
    },
    intro:
      'Customers find you on their phone. Between two jobs, on an emergency call, late in the evening. Your website has to work right there: fast, clear, with a direct way to reach you.',
    checklistTitle: 'What belongs on a contractor website',
    checklist: [
      'Direct contact (call button, WhatsApp, emergency service)',
      'A clear service area: which towns you cover',
      'Local references as proof of trust',
      'An inquiry form without 15 required fields',
      'Mobile optimized (80% of your callers are on the road)',
      'Google Maps and Google Business integration',
      'Emergency button up front, one tap to call',
    ],
    pricingParagraphs: [
      'A website: €2,000.\nAn online store for accessories: €3,000.\nOne custom application is included either way, a quote calculator for example.\nNo hourly rates, no fine print. Done in 14 days.',
      'For €30 a month I handle maintenance, security updates, and priority support when something breaks.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: WÄRMEPOWER + KIRSCH',
      paragraphs: [
        'Wärmepower is a master-certified shop in Lemwerder for heating, heat pumps, and plumbing.\n24/7 emergency service right in the navigation, positioned clearly as the local master shop instead of an anonymous corporate look.',
        'Kirsch Dach & Fassade in Bremen takes on roofing and facade work across northern Germany, within a 250 km radius.\nA storm damage hotline up front in the navigation, a quick inquiry form right in the hero.',
        'Both sites speak plain trade language instead of corporate polish, mobile first, with Google Business connected.',
      ],
      references: [
        { alt: 'Preview of the Wärmepower website', linkLabel: 'Visit waermepower.de' },
        {
          alt: 'Preview of the Kirsch Dach & Fassade website',
          linkLabel: 'Visit kirsch-dach-fassade.de',
        },
      ],
    },
    faq: [
      {
        q: 'Can I change text and opening hours myself?',
        a: 'Yes. You get your own CMS to keep everything current. No code, no webmaster needed.',
      },
      {
        q: 'How does the emergency button work?',
        a: 'We put a prominent call button in the navigation. On mobile it is one tap and the call is going out.',
      },
      {
        q: 'Will I get more Google reviews?',
        a: "Yes, indirectly. Your website doesn't produce reviews on its own, but it makes getting in touch easier, booking paths clearer, and your Google profile prominently linked. More real inquiries, more happy customers, more reviews. Reach and reviews grow together.",
      },
      {
        q: 'How fast will I show up on Google?',
        a: 'Your website is online right away. Ranking on Google takes 2 to 4 weeks for the name of your business, 3 to 6 months for general searches like "heizung bremen".',
      },
      {
        q: 'What happens if the site goes down?',
        a: 'Your site runs on Vercel, one of the most reliable hosting platforms, with 99.99% uptime. With the care plan you reach me first when something breaks.',
      },
    ],
  },

  praxis: {
    meta: {
      title: 'Website for Medical Practices: GDPR Compliant',
      description:
        'Handcrafted websites for medical practices in Bremen: GDPR ' +
        'compliant, with appointment requests, team profiles, and ' +
        'office hours. From €2,000. Recent work: Samedos and IBI.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR PRACTICES',
      headlineLines: ['Your', 'practice website.', 'Discreet, clear, professional.'],
      subheadline:
        'GDPR compliant. From €2,000.\nBuilt in Bremen for practices all over Germany.',
    },
    intro:
      'Patients look up your practice online first.\nThey want to know: is this the right approach?\nWho works there?\nHow do they get an appointment?\nYour website has to answer those questions in seconds, without jargon and without red tape.',
    checklistTitle: 'What belongs on a practice website',
    checklist: [
      'A GDPR-compliant build (critical in a medical context)',
      'Appointment requests, simple and discreet',
      'A clearly structured overview of services',
      'Team profiles with photos (this is where trust starts)',
      'Directions and office hours up front',
      'Secure contact forms (encrypted transmission)',
      'Low-barrier operation',
    ],
    pricingParagraphs: [
      'A practice website: €2,000, including one custom application, an inquiry form that asks for the type of checkup right away for example.\nWith extended features like online booking or a patient portal: €3,000 (base setup).\nEvery standard included: data protection, encryption, and GDPR compliance are mandatory, not an add-on.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: SAMEDOS + IBI',
      paragraphs: [
        'Samedos is an occupational medicine practice in Bremen with a clear focus on DGUV Regulation 2.\nThe Institut für Betriebsmedizin Isernhagen (IBI) provides occupational health care and offshore fitness-to-work exams.',
        'Both sites show the team, the services, and the ways to get in touch, without medical marketing speak.',
      ],
      references: [
        { alt: 'Preview of the Samedos website', linkLabel: 'Visit samedos.de' },
        { alt: 'Preview of the IBI website', linkLabel: 'Visit ibi-doc.de' },
      ],
    },
    faq: [
      {
        q: 'Is the site GDPR compliant?',
        a: 'Yes, fully. A cookie banner with real opt-in, encrypted forms, EU hosting, and a privacy policy written for your practice. Legally clean from day one.',
      },
      {
        q: 'How does the appointment request work?',
        a: 'We build a discreet form with the fields you need: name, contact, a short description. No forced calendar, no external software. It can be integrated with Doctolib or similar systems if you want that.',
      },
      {
        q: 'Can we add patient information videos?',
        a: 'Yes. Videos are embedded in a privacy-compliant way (no YouTube cookie without consent).',
      },
      {
        q: 'Does it work with review platforms (Kununu, Jameda, Google)?',
        a: 'Yes. We link your existing profiles and make it easy for patients to leave a review.',
      },
      {
        q: 'Can I publish treatment prices?',
        a: 'Legally tricky for practices billing statutory health insurance, no problem for private and elective services. We sort that out in the intro call and find the right wording.',
      },
    ],
  },

  gastronomie: {
    meta: {
      title: 'Websites for Restaurants',
      description:
        'Handcrafted websites for restaurants, cafes, and bars in ' +
        'Bremen: edit the menu yourself, reservation requests, an ' +
        'Instagram feed. From €2,000.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR RESTAURANTS',
      headlineLines: ['Your', 'restaurant website.', 'As unique as', 'your place.'],
      subheadline: 'From €2,000.\nBuilt in Bremen for restaurants all over Germany.',
    },
    intro:
      'A corner bar is not a SaaS startup site. A fine restaurant is not a hardware store. Your website has to carry the atmosphere of your place: dark and rough, warm and welcoming, elegant and quiet. Whatever you are.',
    checklistTitle: 'What belongs on a restaurant website',
    checklist: [
      'A current menu (you edit it in the CMS yourself)',
      'Opening hours up front and correct for today',
      'Reservations and table booking (simple or integrated)',
      "An Instagram feed (that's where your content happens anyway)",
      'Events, specials, and closing days clearly visible',
      'Google Maps with the right location',
      'Photos of the place, the team, the food: real photos, no stock images',
    ],
    pricingParagraphs: [
      'A restaurant website: €2,000, including one custom application, a reservation request that asks for party size and occasion right away for example.\nWith an online store for merchandise or gift cards: €3,000.\nYou keep the menu current yourself. No phone call needed when the weekly special changes.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: ER & SIE',
      paragraphs: [
        'Er & Sie is a corner bar in Bremen Walle. Dark, vintage, with a history.\nThe website had to carry exactly that atmosphere: not clean startup design, but a warm room focused on what matters, who we are, when we are open, how you get here.',
      ],
      references: [{ alt: 'Preview of the Er & Sie website', linkLabel: 'Visit erundsiebremen.de' }],
    },
    faq: [
      {
        q: 'How often can I change the menu?',
        a: 'As often as you like. The CMS is your tool: you log in, change prices or dishes, hit save, done. No phone call, no extra charge.',
      },
      {
        q: 'What about reservations?',
        a: 'Small places: a simple form. Bigger ones: integration with OpenTable, Bookatable, or other systems.',
      },
      {
        q: 'Can we add events?',
        a: 'Sure. An event calendar can be built in as standard. Live music, theme nights, private events.',
      },
      {
        q: 'How do I get new guests through the website?',
        a: 'A mix of local SEO (Google finds you for "kneipe bremen walle"), a good Instagram feed on the site, and honest reviews. Building traffic takes 3 to 6 months.',
      },
      {
        q: 'What about Google Maps and reviews?',
        a: "We link your Google Business Profile up front. If you don't have one yet, we set it up together.",
      },
    ],
  },
};
