// Texte der Sichtbarkeits-Seite, beide Sprachen.
//
// DER ROTE FADEN: alles fuehrt zurueck auf die Website. Der Flyer hat
// den QR-Code, der Bauzaun die Adresse, die Anzeige den Klick. Ohne
// diesen Faden waere die Seite ein Bauchladen — „ich mache auch
// Visitenkarten" ist kein Angebot, sondern eine Aufzaehlung. Jeder
// Block hier zahlt deshalb auf denselben Satz ein, und die sechs
// Knoten der Nabe sagen einzeln, wie sie es tun.
//
// WAS NICHT DRINSTEHT: Paketpreise und Beispielrechnungen mit
// Stundenzahlen. Freigegeben ist der Stundensatz, sonst nichts. Eine
// erfundene „typischerweise 6 Stunden"-Zeile waere eine Zusage, die
// niemand gegeben hat.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Sichtbarkeit',
    title: 'Google Ads, Print, Social & Design aus Bremen | Tammo Studios',
    description:
      'Ein Ansprechpartner für alles, was man von deinem Betrieb sieht: Google Ads, Flyer, Visitenkarten, Bauzaun-Banner, Social Media und Design. 50 € pro Stunde, ehrlich abgerechnet.',
  },

  hero: {
    // Siehe studio.ts: ein String, keine Augenbraue, keine
    // Hervorhebung — Hero wie auf den uebrigen Unterseiten.
    // Der Umbruch ist gesetzt, nicht dem Zufall der Zeilenbreite
    // ueberlassen: „Ein Ansprechpartner." ist die Behauptung, der
    // Rest ihre Reichweite. Gerendert ueber .text-lines (pre-line).
    headline: 'Ein Ansprechpartner.\nFür alles, was man von dir sieht.',
    sub:
      'Google Ads, Flyer, Visitenkarten, Bauzaun, Social Media, Getränkekarte.\n' +
      'Ich mach das alles, im gleichen Look wie deine Website. Und alles führt zurück auf deine Seite.',
    // Stand als Pille unter der Unterzeile. Jetzt eine Notizzeile
    // unter dem Knopf — dieselbe Stelle wie der Hinweis auf
    // /software. Das geschuetzte Leerzeichen bleibt: der Betrag darf
    // nie zwischen Zahl und Zeichen umbrechen.
    preisNotiz: '50 € pro Stunde · Ehrlich abgerechnet',
    cta: 'Projekt anfragen',
    telVor: 'Lieber kurz telefonieren?',
  },

  problem: {
    braue: 'DER NORMALFALL',
    headline: 'Fünf Dienstleister, fünf Rechnungen.',
    // Die fünf Kärtchen, die beim Scrollen zu einem werden.
    karten: ['Webdesigner', 'Druckerei', 'Ads-Agentur', 'Grafiker', 'Neffe für Instagram'],
    einer: 'Tammo',
    text: 'Fünf Leute, fünf Rechnungen, fünf verschiedene Logos. Und keiner weiß, was der andere macht.',
    pointe: 'Oder: einer, der alles kennt.',
    // Für Vorleseprogramme und abgeschaltete Bewegung.
    beschreibung:
      'Fünf einzelne Dienstleister rücken zusammen und werden zu einem: Tammo.',
  },

  nabe: {
    braue: 'DER ROTE FADEN',
    headline: 'Alles zeigt auf deine Website.',
    mitte: 'deine-website.de',
    knoten: [
      {
        titel: 'Google Ads & Kampagnen',
        wirkung: 'Jede Anzeige führt auf eine Seite, die verkauft — nicht auf die Startseite.',
      },
      {
        titel: 'Google-Unternehmensprofil',
        wirkung: 'Wer dich in der Karte findet, landet mit einem Klick auf deiner Seite.',
      },
      {
        titel: 'Social Media & Content',
        wirkung: 'Der Beitrag weckt Interesse, die Seite beantwortet die Fragen danach.',
      },
      {
        titel: 'Print',
        wirkung: 'QR-Code auf jedem Flyer, direkt zur Anfrage.',
      },
      {
        titel: 'Außenwerbung',
        wirkung: 'Der Bauzaun trägt deine Adresse, auch wenn gerade niemand fragt.',
      },
      {
        titel: 'Design',
        wirkung: 'Ein Erscheinungsbild. Wer die Seite kennt, erkennt den Flyer.',
      },
    ],
    hinweis: 'Tippen oder zeigen für Details',
  },

  galerie: {
    braue: 'ECHTE ARBEITEN',
    headline: 'Von der Visitenkarte bis zum Bauzaun.',
    /**
     * Beschriftung und Alternativtext je Bild, GESCHLUESSELT MIT DEM
     * DATEINAMEN.
     *
     * Stand als Liste da und war an die Reihenfolge in der Komponente
     * gebunden. Am 06.11.2026 waren zwei Eintraege vertauscht: die
     * Visitenkarten von Samedos liefen als „A5-Flyer · Er & Sie" und
     * umgekehrt. Der Typ band nur die LAENGE, nicht die Reihenfolge —
     * eine Vertauschung war typkorrekt und fiel erst im Browser auf.
     *
     * Mit Schluesseln kann das nicht mehr passieren: ein Bild ohne
     * Eintrag und ein Eintrag ohne Bild brechen beide den Build.
     */
    stuecke: {
      'kirsch-bauzaun-foto': {
        label: 'Bauzaun-Banner · Kirsch Dach & Fassade',
        alt: 'Gerüst an einem Wohnhaus in Bremen mit zwei Bannern von Kirsch Dach & Fassade: links das Logo mit QR-Code, rechts „Ihr Dach. Unser Handwerk." mit Foto des Inhabers.',
      },
      'kirsch-bauzaun-banner': {
        label: 'Banner-Design · Kirsch',
        alt: 'Banner-Entwurf „Hier entsteht etwas Neues." mit Logo, Leistungen, Telefonnummer und QR-Code zur Projektanfrage.',
      },
      'kirsch-anzeige': {
        label: 'Social-Media-Anzeige · Kirsch',
        alt: 'Hochformatige Anzeige „Neues Dach gefällig?" über einem Foto von Dachfenstern, darunter Logo, Telefonnummer und Adresse.',
      },
      'samedos-visitenkarten': {
        label: 'Visitenkarten · Samedos Arbeitsmedizin',
        alt: 'Zwei dunkelblaue Visitenkarten von Samedos Arbeitsmedizin: Rückseite mit rundem Logo, Vorderseite mit Name und Kontaktdaten.',
      },
      'er-und-sie-getraenkekarte': {
        label: 'Getränkekarte · Er & Sie',
        alt: 'Zweiseitige Getränkekarte der Kneipe Er & Sie mit Bier, Spirituosen, Longdrinks, Öffnungszeiten und QR-Code.',
      },
      'er-und-sie-bundesliga-flyer': {
        label: 'A5-Flyer · Er & Sie',
        alt: 'Flyer „Alle Werder Spiele live im Er & Sie" zur Bundesliga-Saison 2026/2027, mit Stadionfoto und den Logos von Werder, Sky und DAZN.',
      },
    },
    fuss: 'Alles im Look der jeweiligen Website. Wer die Seite kennt, erkennt den Flyer.',
    oeffnen: 'Größer ansehen',
    schliessen: 'Schließen',
  },

  leistungen: {
    braue: 'WAS ICH MACHE',
    headline: 'Sechs Sachen, ein Ansprechpartner.',
    beispielVor: 'Zum Beispiel:',
    punkte: [
      {
        titel: 'Google Ads',
        text: 'Kampagnen aufsetzen, Budget im Blick behalten, Anzeigen, die auf eine Landingpage führen, die verkauft.',
        beispiel: 'Ads für Handwerksbetriebe mit eigener Landingpage.',
      },
      {
        titel: 'Google-Unternehmensprofil',
        text: 'Einrichten, pflegen, Bewertungen einsammeln. Damit du bei „Dachdecker in der Nähe" auftauchst.',
        beispiel: 'Profil, Fotos, Leistungen, Bewertungs-Links.',
      },
      {
        titel: 'Social Media',
        text: 'Anzeigen und Posts, die nach dir aussehen statt nach Vorlage.',
        beispiel: 'die Kirsch-Anzeige.',
      },
      {
        titel: 'Print',
        text: 'Flyer, Visitenkarten, Speise- und Getränkekarten, druckfertig mit Beschnitt.',
        beispiel: 'Er & Sie, Samedos.',
      },
      {
        titel: 'Außenwerbung',
        text: 'Bauzaun-Banner, Schilder, Fahrzeugbeschriftung. Groß gedacht, mit QR-Code zur Anfrage.',
        beispiel: 'Kirsch.',
      },
      {
        titel: 'Design',
        text: 'Logo-Feinschliff, Farben, ein Erscheinungsbild, das überall gleich aussieht.',
        beispiel: 'Farben und Schrift aus deiner Website, überall gleich.',
      },
    ],
  },

  sparring: {
    headline: 'Dein digitaler Sparringspartner.',
    text: 'Du hast eine Idee, ein Problem oder einfach eine Frage? Ob neue Visitenkarten, eine Kampagne oder „wie kriege ich mehr Bewertungen": Ruf an, schreib mir, wir finden eine Lösung. Kein Ticket, keine Agentur dazwischen.',
    fotoAlt: 'Tammo Hendriks, Gründer von Tammo Studios',
  },

  preis: {
    braue: 'WAS ES KOSTET',
    headline: 'Einfach und ehrlich.',
    bezeichnung: 'NACH AUFWAND',
    betrag: '50 €',
    einheit: 'pro Stunde',
    merkmale: [
      'Abrechnung nach echter Zeit, kein Pauschal-Aufschlag',
      'Vorher grobe Schätzung, damit du weißt, worauf du dich einlässt',
      'Ein Ansprechpartner für alles',
      'Im Look deiner Website',
    ],
    hinweis:
      'Druck- und Werbekosten (z. B. Druckerei, Ad-Budget) rechnest du direkt mit dem Anbieter ab oder ich gebe sie 1:1 weiter.',
    cta: 'Projekt anfragen',
  },

  faq: {
    braue: 'HÄUFIGE FRAGEN',
    headline: 'Häufige Fragen zur Sichtbarkeit',
    eintraege: [
      {
        frage: 'Muss ich auch die Website bei dir haben?',
        antwort:
          'Nein, aber dann passt alles am besten zusammen. Wenn ich die Seite gebaut habe, kenne ich Farben, Schrift und Tonfall schon — der Flyer sieht dann aus wie die Seite, ohne dass wir darüber reden müssen.',
      },
      {
        frage: 'Wie läuft die Abrechnung?',
        antwort:
          'Nach echter Zeit, 50 € pro Stunde. Vorher bekommst du eine grobe Schätzung, danach eine Rechnung mit dem, was wirklich angefallen ist. Keine Pauschale, auf die ich einen Puffer draufschlage.',
      },
      {
        frage: 'Kümmerst du dich auch um den Druck?',
        antwort:
          'Ich liefere druckfertig mit Beschnitt und kann den Druck für dich beauftragen. Die Druckkosten rechnest du entweder direkt mit der Druckerei ab oder ich gebe sie unverändert weiter.',
      },
      {
        frage: 'Wie schnell geht das?',
        antwort:
          'Eine Visitenkarte oder ein Flyer sind meist in ein paar Tagen fertig, eine Kampagne braucht länger, weil sie laufen und nachjustiert werden muss. Beim ersten Gespräch sage ich dir, womit du rechnen kannst.',
      },
      {
        frage: 'Machst du auch einmalige Kleinigkeiten?',
        antwort:
          'Ja. Auch eine einzelne Visitenkarte. Es gibt kein Mindestvolumen und keinen Vertrag.',
      },
    ],
  },

  abschluss: {
    headlineVor: 'Was soll',
    headlineHell: 'man von dir sehen?',
    sub: 'Erzähl mir kurz, was ansteht. Auch wenn es erstmal nur eine Frage ist.',
    cta: 'Projekt anfragen',
    telVor: 'Lieber kurz telefonieren?',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'Visibility',
    title: 'Google Ads, print, social & design from Bremen | Tammo Studios',
    description:
      'One person for everything people see of your business: Google Ads, flyers, business cards, hoarding banners, social media and design. €50 an hour, billed honestly.',
  },

  hero: {
    headline: 'One person.\nFor everything people see of you.',
    sub:
      'Google Ads, flyers, business cards, hoardings, social media, drinks menus.\n' +
      'I do all of it, in the same look as your website. And all of it leads back to your site.',
    preisNotiz: '€50 per hour · Billed honestly',
    cta: 'Start a project',
    telVor: 'Rather talk for a minute?',
  },

  problem: {
    braue: 'THE USUAL',
    headline: 'Five suppliers, five invoices.',
    karten: ['Web designer', 'Print shop', 'Ads agency', 'Graphic designer', 'Nephew for Instagram'],
    einer: 'Tammo',
    text: 'Five people, five invoices, five different versions of your logo. And none of them knows what the others are doing.',
    pointe: 'Or: one who knows all of it.',
    beschreibung: 'Five separate suppliers move together and become one: Tammo.',
  },

  nabe: {
    braue: 'THE THREAD',
    headline: 'All of it points at your website.',
    mitte: 'your-website.com',
    knoten: [
      {
        titel: 'Google Ads & campaigns',
        wirkung: 'Every ad lands on a page that sells — not on the home page.',
      },
      {
        titel: 'Google Business Profile',
        wirkung: 'Anyone who finds you on the map is one click from your site.',
      },
      {
        titel: 'Social media & content',
        wirkung: 'The post sparks interest, the site answers the questions that follow.',
      },
      {
        titel: 'Print',
        wirkung: 'A QR code on every flyer, straight to the enquiry form.',
      },
      {
        titel: 'Outdoor',
        wirkung: 'The hoarding carries your address, even when nobody is asking.',
      },
      {
        titel: 'Design',
        wirkung: 'One identity. If someone knows the site, they recognise the flyer.',
      },
    ],
    hinweis: 'Tap or hover for details',
  },

  galerie: {
    braue: 'REAL WORK',
    headline: 'From a business card to a hoarding.',
    stuecke: {
      'kirsch-bauzaun-foto': {
        label: 'Hoarding banners · Kirsch Dach & Fassade',
        alt: 'Scaffolding on a house in Bremen with two Kirsch Dach & Fassade banners: the logo with a QR code on the left, "Ihr Dach. Unser Handwerk." with a photo of the owner on the right.',
      },
      'kirsch-bauzaun-banner': {
        label: 'Banner design · Kirsch',
        alt: 'Banner design reading "Hier entsteht etwas Neues." with the logo, services, phone number and a QR code to the enquiry form.',
      },
      'kirsch-anzeige': {
        label: 'Social media ad · Kirsch',
        alt: 'Portrait ad reading "Neues Dach gefällig?" over a photo of roof windows, with the logo, phone number and address below.',
      },
      'samedos-visitenkarten': {
        label: 'Business cards · Samedos Arbeitsmedizin',
        alt: 'Two dark blue Samedos Arbeitsmedizin business cards: the back with a round logo, the front with a name and contact details.',
      },
      'er-und-sie-getraenkekarte': {
        label: 'Drinks menu · Er & Sie',
        alt: 'Two-page drinks menu for the Er & Sie pub listing beer, spirits and long drinks, with opening hours and a QR code.',
      },
      'er-und-sie-bundesliga-flyer': {
        label: 'A5 flyer · Er & Sie',
        alt: 'Flyer reading "Alle Werder Spiele live im Er & Sie" for the 2026/2027 Bundesliga season, with a stadium photo and the Werder, Sky and DAZN logos.',
      },
    },
    fuss: 'All in the look of the matching website. If someone knows the site, they recognise the flyer.',
    oeffnen: 'View larger',
    schliessen: 'Close',
  },

  leistungen: {
    braue: 'WHAT I DO',
    headline: 'Six things, one person.',
    beispielVor: 'For example:',
    punkte: [
      {
        titel: 'Google Ads',
        text: 'Setting campaigns up, keeping an eye on the budget, ads that lead to a landing page that sells.',
        beispiel: 'ads for trades with their own landing page.',
      },
      {
        titel: 'Google Business Profile',
        text: 'Set up, kept current, reviews collected. So you show up for "roofer near me".',
        beispiel: 'profile, photos, services, review links.',
      },
      {
        titel: 'Social media',
        text: 'Ads and posts that look like you rather than like a template.',
        beispiel: 'the Kirsch ad.',
      },
      {
        titel: 'Print',
        text: 'Flyers, business cards, food and drinks menus, print-ready with bleed.',
        beispiel: 'Er & Sie, Samedos.',
      },
      {
        titel: 'Outdoor',
        text: 'Hoarding banners, signs, vehicle lettering. Thought through at scale, with a QR code to the enquiry form.',
        beispiel: 'Kirsch.',
      },
      {
        titel: 'Design',
        text: 'Logo refinements, colours, an identity that looks the same everywhere.',
        beispiel: 'colours and type from your website, used everywhere.',
      },
    ],
  },

  sparring: {
    headline: 'Your digital sparring partner.',
    text: 'Got an idea, a problem or just a question? New business cards, a campaign, or "how do I get more reviews": call me, write to me, we will work it out. No ticket, no agency in between.',
    fotoAlt: 'Tammo Hendriks, founder of Tammo Studios',
  },

  preis: {
    braue: 'WHAT IT COSTS',
    headline: 'Simple and honest.',
    bezeichnung: 'BY THE HOUR',
    betrag: '€50',
    einheit: 'per hour',
    merkmale: [
      'Billed by real time, no blanket mark-up',
      'A rough estimate up front, so you know what you are getting into',
      'One person for all of it',
      'In the look of your website',
    ],
    hinweis:
      'Printing and advertising costs (the print shop, ad budget) you settle directly with the supplier, or I pass them on at cost.',
    cta: 'Start a project',
  },

  faq: {
    braue: 'COMMON QUESTIONS',
    headline: 'Common questions about visibility',
    eintraege: [
      {
        frage: 'Do I have to have my website with you too?',
        antwort:
          'No, but then it all fits together best. If I built the site, I already know the colours, the type and the tone — the flyer ends up looking like the site without us having to discuss it.',
      },
      {
        frage: 'How does billing work?',
        antwort:
          'By real time, €50 an hour. You get a rough estimate up front and an invoice for what actually came up. No flat rate with a buffer baked into it.',
      },
      {
        frage: 'Do you handle the printing as well?',
        antwort:
          'I deliver print-ready files with bleed and can place the order for you. You either settle the printing costs directly with the print shop or I pass them on unchanged.',
      },
      {
        frage: 'How fast is it?',
        antwort:
          'A business card or a flyer is usually done in a few days. A campaign takes longer, because it has to run and be adjusted. At our first conversation I will tell you what to expect.',
      },
      {
        frage: 'Do you take one-off small jobs?',
        antwort:
          'Yes. Even a single business card. There is no minimum and no contract.',
      },
    ],
  },

  abschluss: {
    headlineVor: 'What should',
    headlineHell: 'people see of you?',
    sub: 'Tell me briefly what is coming up. Even if it is just a question for now.',
    cta: 'Start a project',
    telVor: 'Rather talk for a minute?',
  },
};

export const SICHTBARKEIT = { de, en } as const;
