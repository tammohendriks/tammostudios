// Texte der Über-Seite, beide Sprachen.
//
// Die Absaetze mit fett gesetzten Zahlen stehen in Stuecken: set:html
// waere kuerzer und wuerde die Auszeichnung verlieren, weil die
// Astro-Kennung der Komponente am <strong> fehlte.
//
// Der schema.org-Block ist mit uebersetzt. Es ist dieselbe Person unter
// derselben @id, nur in der Sprache der Seite beschrieben — hreflang
// verbindet die beiden Fassungen.

import type { Shape } from '../shape';

export const de = {
  meta: {
    pageTitle: 'Über mich',
    title: 'Tammo Hendriks — Webentwickler aus Bremen | Tammo Studios',
    description:
      'Tammo Hendriks, 25, aus Bremen. Webentwickler mit Marketing-Hintergrund. Baut Websites und die Anwendungen darin, ohne Agentur dazwischen.',
  },

  schema: {
    jobTitle: 'Webentwickler',
    description:
      'Webentwickler aus Bremen. Baut individuelle Websites handgemacht, ohne Templates, mit klaren Fixpreisen.',
    knowsAbout: [
      'Webentwicklung',
      'Astro Framework',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel Deployment',
      'E-Commerce',
      'SEO',
    ],
    land: 'Deutschland',
  },

  hero: {
    headline: 'Hi, ich bin Tammo.',
    sub:
      '25 Jahre alt, aus Bremen — aktuell auf Reise durch Asien.\n' +
      'Freelance-Webdeveloper mit Marketing-Background.\n' +
      'Ich baue handgemachte Websites und die Anwendungen darin. Eine nach der anderen.',
    fotoAlt: 'Tammo Hendriks, Gründer von Tammo Studios',
  },

  werIchBin: {
    headline: 'Wer ich bin',
    absatz1:
      'Angefangen hat alles mit einer Ausbildung zum Kaufmann für Digitalisierungsmanagement bei einer Sparkassen-Tochter. Danach bin ich dort ein Jahr lang als Online Marketing Manager geblieben. Nebenbei habe ich aber gemerkt, dass mir etwas fehlt: das Programmieren. Genau das, was mich am Anfang am meisten gepackt hat.',
    absatz2:
      'Im Mai 2026 habe ich Tammo Studios gegründet — erst nebenbei. Inzwischen habe ich meinen Job aufgegeben und arbeite vollständig selbständig. Der Sprung ins Kalte, mich vollständig durchzusetzen. Ab August reise ich für längere Zeit durch Asien. Videos kann man schlecht aus 9.000 Kilometern Entfernung drehen. Websites schon.',
  },

  wieIchArbeite: {
    headline: 'Wie ich arbeite',
    absatz1:
      'Ein Projekt zur Zeit. Du sprichst direkt mit der Person, die deine Seite baut. Keine Agentur-Hierarchie dazwischen.',
    absatz2:
      'Ich arbeite vollständig remote, auf Deutsch oder Englisch. Wo du sitzt, ist mir egal. Eine gute Internetverbindung reicht.',
    absatz3:
      'Was mir wichtig ist: Geduld bei Feedback und ein Gespür für den richtigen Ton. Eine Kneipenwebsite soll nicht clean wie ein SaaS-Startup aussehen. Sie darf dunkel sein, ein bisschen rau, vintage. Eine Yogapraxis darf weich atmen. Ich höre mir an, wer du bist, und baue dann genau das.',
    dauerVor: 'Eine normale Website steht in maximal',
    dauerTage: '14 Tagen',
    dauerMitte: '. Ein Online-Shop in maximal',
    dauerTage2: '30',
    dauerNach: '. Schneller meistens. Länger nie.',
  },

  kosten: {
    headline: 'Was es kostet',
    websiteVor: 'Eine Website kostet',
    websitePreis: '2.000 €',
    shopVor: '. Ein Online-Shop',
    shopPreis: '3.000 €',
    nach:
      '. In beiden ist eine individuelle Anwendung enthalten — ein Preisrechner, ein Anfrageformular, das mitdenkt. Keine versteckten Stundensätze, keine Pakete mit Sternchen.',
    cta: 'Volle Preisübersicht ansehen',
  },

  ausserhalb: {
    headline: 'Außerhalb vom Code',
    absatz1:
      "Wenn ich nicht arbeite, bin ich meistens beim Sport oder unterwegs. Reisen ist das, was mir Energie gibt. Und der Grund, warum ich das hier so aufgebaut habe, wie ich's aufgebaut habe.",
    absatz2:
      'Manchmal baue ich auch einfach Sachen, die kein Kunde bestellt hat. Zuletzt ein Arcade-Spiel mit Musik, die im Browser entsteht, und einer weltweiten Bestenliste.',
    cta: 'In der Werkstatt spielen',
  },

  empfehlung: {
    text: 'Sehen, was dabei rauskommt?',
    label: 'Zu den Referenzen',
  },
} as const;

export const en: Shape<typeof de> = {
  meta: {
    pageTitle: 'About',
    title: 'Tammo Hendriks — web developer from Bremen | Tammo Studios',
    description:
      'Tammo Hendriks, 25, from Bremen. A web developer with a marketing background. Builds websites and the applications inside them, with no agency in between.',
  },

  schema: {
    jobTitle: 'Web developer',
    description:
      'A web developer from Bremen. Builds custom websites by hand, without templates, at clear fixed prices.',
    knowsAbout: [
      'Web development',
      'Astro Framework',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel Deployment',
      'E-Commerce',
      'SEO',
    ],
    land: 'Germany',
  },

  hero: {
    headline: "Hi, I'm Tammo.",
    sub:
      '25 years old, from Bremen, currently traveling through Asia.\n' +
      'A freelance web developer with a marketing background.\n' +
      'I build handcrafted websites and the applications inside them. One at a time.',
    fotoAlt: 'Tammo Hendriks, founder of Tammo Studios',
  },

  werIchBin: {
    headline: 'Who I am',
    absatz1:
      'It all started with a vocational apprenticeship in digitalization management at a savings bank subsidiary. After that I stayed on there for a year as an online marketing manager. On the side I noticed that something was missing: programming. Exactly the thing that had gripped me most at the beginning.',
    absatz2:
      'In May 2026 I founded Tammo Studios, at first on the side. By now I have given up the job and work fully self-employed. Jumping in at the deep end, all in on my own. From August I am traveling through Asia for a longer stretch. Videos are hard to shoot from 9,000 kilometers away. Websites are not.',
  },

  wieIchArbeite: {
    headline: 'How I work',
    absatz1:
      'One project at a time. You talk directly to the person who builds your site. No agency hierarchy in between.',
    absatz2:
      'I work fully remote, in German or English. Where you sit does not matter to me. A good internet connection is enough.',
    absatz3:
      'What matters to me: patience with feedback and a feel for the right tone. A bar website should not look clean like a SaaS startup. It can be dark, a little rough, vintage. A yoga studio can breathe softly. I listen to who you are and then build exactly that.',
    dauerVor: 'A normal website is up in at most',
    dauerTage: '14 days',
    dauerMitte: '. An online store in at most',
    dauerTage2: '30',
    dauerNach: '. Usually faster. Never longer.',
  },

  kosten: {
    headline: 'What it costs',
    websiteVor: 'A website costs',
    websitePreis: '€2,000',
    shopVor: '. An online store',
    shopPreis: '€3,000',
    nach:
      '. Both include one custom application: a price calculator, an inquiry form that asks the right questions. No hidden hourly rates, no packages with fine print.',
    cta: 'See the full price list',
  },

  ausserhalb: {
    headline: 'Outside the code',
    absatz1:
      'When I am not working I am usually at the gym or out somewhere. Traveling is what gives me energy. And the reason I set all this up the way I set it up.',
    absatz2:
      'Sometimes I build things no client ordered. Most recently an arcade game with music that is generated in the browser and a worldwide leaderboard.',
    cta: 'Play in the Lab',
  },

  empfehlung: {
    text: 'Want to see what comes out of it?',
    label: 'See the work',
  },
};

export const UEBER = { de, en } as const;
