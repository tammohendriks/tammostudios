// Texte der Website-Seite, beide Sprachen.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Website',
    title: 'Individuelle Website — handgemacht in Bremen | Tammo Studios',
    description:
      'Deine individuelle Website, handgemacht in Bremen: ab 2.000 €, in 14 Tagen live, mit eigenem Redaktionssystem und einer Anwendung inklusive.',
  },

  hero: {
    headline: 'Deine Website.',
    sub: 'Handgemacht in Bremen. Eine individuelle Anwendung ist drin.\nAb 2.000 €, in 14 Tagen live.',
    cta: 'Erstgespräch anfragen',
  },

  probleme: {
    eyebrow: 'WOFÜR DAS GANZE',
    headline: 'Drei Probleme, immer die gleichen.',
    // Die Verweise der zweiten und dritten Karte zeigen auf /software
    // bzw. auf den Anker #cms weiter unten. Die Ziele stehen in der
    // Komponente, hier nur die Linktexte.
    karten: [
      {
        label: 'Gefunden werden',
        body:
          'Wer dich googelt, muss dich finden, und zwar vor dem Wettbewerb. ' +
          'Saubere Technik, strukturierte Daten, schnelle Ladezeiten. Das ist ' +
          'eingebaut, nicht nachgerüstet.',
        linkLabel: '',
      },
      {
        label: 'Anfragen statt Anrufe',
        body:
          'Ein Formular, das die richtigen Fragen stellt, spart dir das ' +
          'Telefonat. Bei Bedarf mit Preisrechner, Konfigurator oder ' +
          'PDF-Ausgabe.',
        linkLabel: 'Wie weit das geht',
      },
      {
        label: 'Selbst aktuell halten',
        body:
          'Öffnungszeiten, Preise, neue Referenzen, ein Stellenangebot. Du ' +
          'änderst das selbst, in 30 Sekunden, ohne Ticket und ohne mich.',
        linkLabel: 'Wie das aussieht',
      },
    ],
    notiz:
      'Gebaut für Arztpraxen, Betriebsmedizin, Dachdecker, Heizungsbau, Gastronomie, Spedition. Die Branche war noch nie das Problem.',
    notizCta: 'Sieh dir an, was daraus wurde',
  },

  cms: {
    eyebrow: 'DU PFLEGST SELBST',
    headline: 'Kein Anruf beim Entwickler.',
    absatz1:
      'Deine Website wird von mir gebaut, nicht in Wix zusammengeklickt. Trotzdem änderst du Texte, Preise und Bilder selbst — über ein klares CMS-Studio, das ich für dich einrichte.',
    absatz2:
      'Kein Anruf beim Entwickler. Kein 30-Minuten-Ticket für eine Preisänderung. Du hast die volle Kontrolle über deinen Content, ich sorge dafür dass das Fundament technisch sauber bleibt.',
    punkte: [
      'Texte, Bilder und Preise ohne technisches Know-how',
      'Live-Vorschau bevor du speicherst',
      'Neue Team-Mitglieder, neue Öffnungszeiten, neue Preise in 30 Sekunden angepasst',
      'Bei Fragen: ich bin per Mail oder WhatsApp erreichbar',
    ],
    beispieleLabel: 'Beispiele:',
    beispiele:
      ' Bei Samedos änderst du die Preise → das PDF auf der Website aktualisiert sich automatisch. Bei IBI werden neue Team-Mitglieder in Minuten hinzugefügt.',
  },

  features: {
    eyebrow: 'WAS DU BEKOMMST',
    headline: 'Alles was eine Website 2026 braucht',
    punkte: [
      {
        title: 'Handgemacht',
        body: 'Kein Wix, kein Squarespace. Astro + Tailwind + eigener Code, sauber auf deinen Betrieb geschnitten.',
      },
      {
        title: 'Eigenes CMS',
        body: 'Du pflegst Inhalte selbst. Texte, Bilder, Preise, Öffnungszeiten, in 30 Sekunden aktualisiert.',
      },
      {
        title: 'Mobile-first',
        body: '60% deiner Besucher kommen vom Handy. Deine Seite ist dort genauso schnell wie am Desktop.',
      },
      {
        title: 'SEO-Basis',
        body: 'Google-Ready aus dem Karton: strukturierte Daten, saubere URLs, schnelle Ladezeiten.',
      },
      {
        title: 'DSGVO-konform',
        body: 'EU-Hosting, korrekte Cookie-Handhabung, Impressum + Datenschutz strukturiert.',
      },
      {
        title: 'In 14 Tagen live',
        body: 'Vom Erstgespräch bis zur Live-Schaltung in maximal zwei Wochen. Meistens schneller.',
      },
    ],
  },

  preise: {
    eyebrow: "WAS KOSTET'S",
    headline: 'Fixpreise, ohne Sternchen',
    websitePreis: '2.000 €',
    websiteLabel: 'Eine Website',
    shopPreis: '3.000 €',
    shopLabel: 'Online-Shop',
    inklusive:
      'In beiden Preisen ist eine individuelle Anwendung enthalten: ein Preisrechner, ein durchdachtes Anfrageformular, ein Konfigurator. Sie wird in denselben 14 Tagen mitgebaut. Jede weitere kostet 500 €.',
    cta: 'Volle Preisübersicht ansehen',
  },

  referenzen: {
    eyebrow: 'AUS DER PRAXIS',
    headline: 'Kunden, die schon live sind',
    // Wird dem Titel vorangestellt: "Vorschau: Samedos".
    vorschau: 'Vorschau:',
    cta: 'Alle Referenzen ansehen',
  },

  empfehlung: {
    text: 'Mehr als eine Website im Kopf?',
    label: 'Zu den individuellen Anwendungen',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Website',
    // "web development" ist die staerkste englische Suchanfrage in der
    // Search Console (25 Impressionen). Der deutsche Titel fuehrt mit
    // "Website", weil das die deutsche Nachfrage ist; die englische
    // Fassung fuehrt mit dem Begriff, der hier gesucht wird. Titel
    // muessen zwischen zwei hreflang-Fassungen nicht gleich sein.
    title: 'Custom web development from Bremen — from €2,000',
    description:
      'Custom web development from Bremen: your own website, live in 14 days, with a CMS of your own and one custom application included. From €2,000.',
  },

  hero: {
    headline: 'Your website.',
    sub: 'Handcrafted in Bremen. One custom application is included.\nFrom €2,000, live in 14 days.',
    cta: 'Request an intro call',
  },

  probleme: {
    eyebrow: 'WHAT IT IS ALL FOR',
    headline: 'Three problems, always the same ones.',
    karten: [
      {
        label: 'Being found',
        body:
          'Whoever googles you has to find you, ahead of the competition. ' +
          'Clean engineering, structured data, fast load times. That is ' +
          'built in, not bolted on.',
        linkLabel: '',
      },
      {
        label: 'Inquiries instead of phone calls',
        body:
          'A form that asks the right questions saves you the call. With a ' +
          'price calculator, a configurator, or PDF output when you need it.',
        linkLabel: 'How far that goes',
      },
      {
        label: 'Keeping it current yourself',
        body:
          'Opening hours, prices, new references, a job posting. You change ' +
          'that yourself, in 30 seconds, without a ticket and without me.',
        linkLabel: 'What that looks like',
      },
    ],
    notiz:
      'Built for medical practices, occupational health, roofers, heating contractors, restaurants, a freight company. The industry was never the problem.',
    notizCta: 'See what came out of it',
  },

  cms: {
    eyebrow: 'YOU KEEP IT CURRENT',
    headline: 'No call to the developer.',
    absatz1:
      'Your website is built by me, not clicked together in Wix. You still change text, prices, and images yourself, through a clear CMS studio that I set up for you.',
    absatz2:
      'No call to the developer. No 30-minute ticket for a price change. You have full control over your content, and I make sure the foundation stays technically sound.',
    punkte: [
      'Text, images, and prices without technical know-how',
      'A live preview before you save',
      'New team members, new opening hours, new prices changed in 30 seconds',
      'If you have questions: you reach me by mail or WhatsApp',
    ],
    beispieleLabel: 'Examples:',
    beispiele:
      ' At Samedos you change the prices and the PDF on the website updates itself. At IBI new team members are added in minutes.',
  },

  features: {
    eyebrow: 'WHAT YOU GET',
    headline: 'Everything a website needs in 2026',
    punkte: [
      {
        title: 'Handcrafted',
        body: 'No Wix, no Squarespace. Astro, Tailwind, and code of my own, cut cleanly to fit your business.',
      },
      {
        title: 'A CMS of your own',
        body: 'You maintain the content yourself. Text, images, prices, opening hours, updated in 30 seconds.',
      },
      {
        title: 'Mobile first',
        body: '60% of your visitors come from a phone. Your site is just as fast there as on a desktop.',
      },
      {
        title: 'An SEO foundation',
        body: 'Ready for Google out of the box: structured data, clean URLs, fast load times.',
      },
      {
        title: 'GDPR compliant',
        body: 'EU hosting, correct cookie handling, imprint and privacy policy properly structured.',
      },
      {
        title: 'Live in 14 days',
        body: 'From the intro call to going live in two weeks at most. Usually faster.',
      },
    ],
  },

  preise: {
    eyebrow: 'WHAT IT COSTS',
    headline: 'Fixed prices, no fine print',
    websitePreis: '€2,000',
    websiteLabel: 'One website',
    shopPreis: '€3,000',
    shopLabel: 'Online store',
    inklusive:
      'Both prices include one custom application: a price calculator, a well-thought-out inquiry form, a configurator. It gets built within the same 14 days. Every further one costs €500.',
    cta: 'See the full price list',
  },

  referenzen: {
    eyebrow: 'REAL PROJECTS',
    headline: 'Clients who are already live',
    vorschau: 'Preview:',
    cta: 'See all work',
  },

  empfehlung: {
    text: 'More than a website on your mind?',
    label: 'See the custom applications',
  },
};

export const WEBSITE = { de, en } as const;
