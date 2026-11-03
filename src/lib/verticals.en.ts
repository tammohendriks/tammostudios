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

import type { Gleichlang } from './i18n/shape';
import type { VERTICALS } from './verticals';

type DeutscheEintraege = (typeof VERTICALS)[number];

/** Die Slugs, wie sie in verticals.ts stehen. */
type Slug = DeutscheEintraege['slug'];

/** Der deutsche Eintrag zu einem Slug. */
type Deutsch<S extends Slug> = Extract<DeutscheEintraege, { slug: S }>;

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
  faq: Gleichlang<V['faq'], { q: string; a: string }>;
} & Fallstudie<V>;

/**
 * Der Fallstudien-Teil, und zwar nur dann, wenn es ihn im Deutschen
 * gibt.
 *
 * Ein einfaches `caseStudy?:` würde zu wenig prüfen: man könnte ihn
 * deutsch pflegen und englisch vergessen, oder umgekehrt einen
 * englischen Block für eine Branche schreiben, die gar keinen hat.
 * Der bedingte Typ bindet beides aneinander — entweder beide oder
 * keiner.
 */
type Fallstudie<V> = V extends {
  caseStudy: { paragraphs: infer P; references: infer R };
}
  ? {
      caseStudy: {
        eyebrow: string;
        paragraphs: Texte<P>;
        // Nur Alternativtext und Linktext. Name, Bild und URL sind in
        // beiden Sprachen dieselben.
        references: Gleichlang<R, { alt: string; linkLabel: string }>;
      };
    }
  : { caseStudy?: undefined };

export type VerticalTexte = { [S in Slug]: Uebersetzbar<Deutsch<S>> };

export const VERTICAL_TEXT_EN: VerticalTexte = {
  handwerk: {
    meta: {
      title: 'Websites for contractors',
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
      'Local work that proves it',
      'An inquiry form without 15 required fields',
      'Mobile optimized (80% of your callers are on the road)',
      'Google Maps and Google Business integration',
      'Emergency button up front, one tap to call',
    ],
    pricingParagraphs: [
      'A website: €2,000.\nAn online store for accessories: €3,000.\nOne custom application is included either way, for example a quote calculator.\nNo hourly rates, no fine print. Done in 14 days.',
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
      // Gekuerzt auf 41 Zeichen: mit dem ' — Tammo Studios' des Layouts
      // dahinter bleibt der Titel unter 60. Die Substantivgruppe vorn
      // ist auch die, nach der gesucht wird ("medical practice website").
      title: 'GDPR-compliant medical practice websites',
      // Die Beschreibung lag bei 172 Zeichen. Google schnitt damit genau
      // den Teil ab, der den Beweis traegt — die beiden Referenzen.
      description:
        'Handcrafted websites for medical practices in Bremen: GDPR ' +
        'compliant, with appointment requests and team profiles. ' +
        '€2,500 all in. Recent work: Samedos and IBI.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR MEDICAL PRACTICES',
      headlineLines: ['Your', 'medical practice website.', 'Discreet, clear, professional.'],
      subheadline:
        'GDPR compliant. €2,500 all in.\nBuilt in Bremen for practices all over Germany.',
    },
    intro:
      'Patients look up your practice online first.\nThey want to know: is this the right approach?\nWho works there?\nHow do they get an appointment?\nYour website has to answer those questions in seconds, without jargon and without red tape.',
    checklistTitle: 'What belongs on a medical practice website',
    checklist: [
      'A GDPR-compliant build (critical in a medical context)',
      'Appointment requests, simple and discreet',
      'A clearly structured overview of services',
      'Team profiles with photos (this is where trust starts)',
      'Directions and office hours up front',
      'Secure contact forms (encrypted transmission)',
      'Built for accessibility',
    ],
    pricingParagraphs: [
      'A practice website: €2,500, including two custom applications — for example an inquiry form that asks for the type of checkup right away, and online appointment booking.\nEvery standard included: data protection, encryption, and GDPR compliance are mandatory, not an add-on.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: SAMEDOS + IBI',
      paragraphs: [
        'Samedos is an occupational health practice in Bremen with a clear focus on DGUV 2, the German occupational health regulation.\nThe Institut für Betriebsmedizin Isernhagen (IBI) provides occupational health care and offshore fitness-to-work exams.',
        'Both sites show the team, the services, and the ways to get in touch, without medical marketing speak.',
      ],
      references: [
        { alt: 'Preview of the Samedos website', linkLabel: 'Visit samedos.de' },
        { alt: 'Preview of the IBI website', linkLabel: 'Visit ibi-doc.de' },
      ],
    },
    faq: [
      {
        q: 'What belongs on a medical practice website?',
        a: 'Services, the team with photos, opening hours, directions, contact details and a way to ask for an appointment, roughly in that order of importance. Plus an imprint and a privacy policy. Everything else is optional: explainer videos, patient downloads, job openings. The list further up this page is exactly that.',
      },
      {
        q: 'Which rules does a doctor\'s website have to follow in Germany?',
        a: 'Four areas: the legal imprint, data protection under the GDPR, the German law on advertising in healthcare, and the professional code of your medical association. I build the technical side: a cookie banner with real opt-in, encrypted forms, EU hosting, a fitting privacy policy. On the content side you tell me what your association allows. I am a developer, not a lawyer.',
      },
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
      title: 'Websites for restaurants',
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
      'A restaurant website: €2,000, including one custom application, for example a reservation request that asks for party size and occasion right away.\nWith an online store for merchandise or gift cards: €3,000.\nYou keep the menu current yourself. No phone call needed when the weekly special changes.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: ER & SIE',
      paragraphs: [
        'Er & Sie is a corner bar in Bremen Walle. Dark, vintage, with a history.\nThe website had to carry exactly that atmosphere. Not clean startup design but a warm room, focused on three things: who we are, when we are open, how you get here.',
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
  medien: {
    meta: {
      title: 'Portfolio website, built by hand',
      description:
        'A portfolio website for photographers, videographers and agencies, built by hand in Bremen. Video without YouTube, fast even with heavy images. €2,000 all in, a sketch within 48 hours.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR CREATIVES',
      headlineLines: ['Your', 'portfolio website.', 'As good as your work.'],
      subheadline:
        '€2,000 all in. Live in 14 days.\nFor photographers, videographers and agencies.',
    },
    intro:
      'Whoever books you has seen your site first.\n' +
      'It is the first sample of your work you hand over, before the reel and before the portfolio PDF.\n' +
      'If it loads slowly or looks like a thousand others, you have already answered part of the question.',
    checklistTitle: 'What belongs on a portfolio website',
    checklist: [
      'Work shown large and sharp, and still fast to load',
      'Video without a YouTube logo and without a cookie banner in front of it',
      'Projects sorted by type: brand, product, wedding, documentary',
      'Client logos or a client list as proof',
      'A way to get in touch that does not feel like paperwork',
      'New work published by you, without asking anyone',
      'A site that does not look like a template',
    ],
    pricingParagraphs: [
      'A portfolio website: €2,000, including one custom application, for example a password-protected client gallery or a video player with no third party involved.\nNo hourly rates, no asterisks. Done in 14 days.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    caseStudy: {
      eyebrow: 'REAL PROJECTS: GRÄFE MEDIA',
      paragraphs: [
        'Gräfe Media is a media studio in Bremen: film, photography and graphic design under one roof.\nThe site puts the work first and explains who is behind it afterwards, in that order, because that is how clients look.',
        'Built like everything here: Astro, its own CMS, no page builder. The team publishes new projects themselves.',
      ],
      references: [
        { alt: 'Preview of the Gräfe Media website', linkLabel: 'Visit graefemedia.de' },
      ],
    },
    faq: [
      {
        q: 'Can I embed video without YouTube?',
        a: 'Yes. The files sit with you or with a provider that has no ads and no tracking. No foreign logo in the player, no suggested videos at the end, and no cookie banner sliding in front of your reel.',
      },
      {
        q: 'Will the site get slow if I show a lot of images?',
        a: 'Not if it is done right. Images are generated in several sizes and modern formats on upload, and only what is on screen gets loaded. Large galleries are the normal case in this field, not the exception.',
      },
      {
        q: 'I can design myself. Why not Webflow or Squarespace?',
        a: 'You can, and for some people that is enough. The difference: there is no grid your work has to fit into, no monthly fee that grows with the site, and no vendor changing the layout under your feet. You get the code.',
      },
      {
        q: 'Can I publish new projects myself?',
        a: 'Yes. You get your own CMS: add a project, upload images, drag them into order, done. No code, no call to me.',
      },
      {
        q: 'Can I have a protected area for clients?',
        a: 'Yes, that is one of the custom applications: a password-protected gallery your client picks from or pulls files out of.',
      },
      {
        q: 'What happens if we part ways?',
        a: 'You get the full code and all the content. The site keeps running on your own hosting without me. Nothing here locks you in.',
      },
    ],
  },
  kanzlei: {
    meta: {
      title: 'Website for law and tax firms',
      description:
        'A website for tax advisors and lawyers, built by hand in Bremen. Secure document upload, a careers page, and clean professional-law compliance. €2,500 all in, a sketch within 48 hours.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR LAW FIRMS',
      headlineLines: ['Your', 'firm website.', 'Serious, not stiff.'],
      subheadline:
        '€2,500 all in. Live in 14 days.\nFor tax advisors, lawyers and notaries.',
    },
    intro:
      'Clients compare before they call.\n' +
      'They open three firms in three tabs and decide within a minute which one to try.\n' +
      'What decides it is rarely expertise. It is who feels reachable.',
    checklistTitle: 'What belongs on a law firm website',
    checklist: [
      'Practice areas clearly separated, not a wall of text',
      'A team with faces: clients are looking for people',
      'First contact without a hurdle: a callback, a form, or an appointment',
      'Documents handed over securely and encrypted',
      'A careers page that actually speaks to applicants',
      'Mandatory details done right: imprint, professional law, privacy',
      'Maintained by you: new colleagues, new services, no agency',
    ],
    pricingParagraphs: [
      'A firm website: €2,500, including two custom applications, for example an encrypted document upload and an appointment request.\nNo hourly rates, no asterisks. Done in 14 days.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    faq: [
      {
        q: 'Are lawyers and tax advisors allowed to advertise like this?',
        a: 'German professional law allows factual information about your work and forbids advertising that misleads or promises outcomes. The sites I build inform; they promise nothing. I deliver the technical side. What your professional body allows in a given case, you tell me. I am a developer, not a lawyer.',
      },
      {
        q: 'Can clients upload documents securely?',
        a: 'Yes, that is one of the two custom applications: an encrypted upload that lands with you instead of in an email attachment. If you already run a client portal, you get a clear route to it instead.',
      },
      {
        q: 'Can it connect to DATEV or our portal?',
        a: 'Linking to it, always. Connecting more deeply depends on which interface your provider opens up. We settle that in the intro call, before anything is promised.',
      },
      {
        q: 'Does the site help with hiring?',
        a: 'For many firms that is now the real reason for a new site. A careers page with real faces, honest tasks and a two-minute application does more than a job ad, and it keeps working once the ad has expired.',
      },
      {
        q: 'How fast will we show up on Google?',
        a: 'The site is online immediately. For your own firm name you rank within 2 to 4 weeks. For general searches it takes 3 to 6 months.',
      },
      {
        q: 'Can we edit the texts ourselves?',
        a: 'Yes. You get your own CMS: add a colleague, add a service, fix a sentence. No code, no call to me.',
      },
    ],
  },
  immobilien: {
    meta: {
      title: 'Website for estate agents',
      description:
        'An estate agent website built by hand in Bremen: listings with search, the brochure as a PDF, a valuation request. €2,000 all in, a sketch within 48 hours.',
    },
    hero: {
      eyebrow: 'WEBSITE FOR ESTATE AGENTS',
      headlineLines: ['Your', 'agency website.', 'Listings that sell.'],
      subheadline:
        '€2,000 all in. Live in 14 days.\nFor estate agents and property managers in northern Germany.',
    },
    intro:
      'Your client is not the buyer. Your client is the owner.\n' +
      'They choose who to trust with their house, and to decide that they look at how you present other people\u2019s houses.\n' +
      'Your listing pages are the work sample they judge you on.',
    checklistTitle: 'What belongs on an estate agent website',
    checklist: [
      'Listings shown large, with images at full quality',
      'Search by area, price and number of rooms',
      'The brochure as a PDF, without a form in the way',
      'A valuation request as its own route for owners',
      'A team with faces: people buy from people',
      'A link to your agency software instead of double work',
      'A new listing online in minutes, with no agency involved',
    ],
    pricingParagraphs: [
      'An estate agent website: €2,000, including one custom application, for example the listing search or a valuation request that asks the right questions up front.\nNo hourly rates, no asterisks. Done in 14 days.',
      'For €30 a month I handle maintenance, security updates, and priority support.\nOptional, month to month.',
    ],
    faq: [
      {
        q: 'Can I pull listings from my agency software?',
        a: 'Usually yes. Most systems export listings through an interface or an OpenImmo file. I read that in and you keep working where you are used to. Which system you use we check beforehand: nothing gets promised before it is verified.',
      },
      {
        q: 'What about properties that are already sold?',
        a: 'They stay on as references, clearly marked as sold. An empty listing page convinces no owner. A page with twenty sold houses does.',
      },
      {
        q: 'Do I need a valuation form on the site?',
        a: 'If you want to win owners: yes. It is the route someone takes who was not even planning to sell yet. As a custom application, exactly that is included in the price.',
      },
      {
        q: 'Will all those property photos be slow?',
        a: 'Not if it is done right. Images are generated in several sizes on upload, served in modern formats, and only loaded once they come into view.',
      },
      {
        q: 'How fast will I show up on Google?',
        a: 'The site is online immediately. For your own name you rank within 2 to 4 weeks. For general searches it takes 3 to 6 months.',
      },
      {
        q: 'What about the mandatory energy certificate details?',
        a: 'The fields are part of the listing editor and are printed in the brochure. What you have to disclose you know better than I do. The site just makes it hard to forget.',
      },
    ],
  },
};
