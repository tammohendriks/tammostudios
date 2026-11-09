/**
 * Bausteine fuer die strukturierten Daten.
 *
 * WARUM DIESE DATEI: die JSON-LD-Knoten lagen an fuenf Stellen im
 * Markup verstreut (BaseLayout, StudioPage, SichtbarkeitPage,
 * VerticalLandingPage, UeberPage, journal/[slug]), jede mit eigener
 * Schreibweise derselben Ideen. Vier Mal „@type: FAQPage" mit vier
 * leicht verschiedenen Zuordnungen ist genau die Art Doppelung, aus
 * der spaeter Widersprueche werden.
 *
 * Hier stehen die Formen, nicht die Inhalte. Texte kommen weiter aus
 * den Woerterbuechern — eine Beschreibung in einer Schema-Datei waere
 * ein zweiter Ort fuer Seitentexte.
 *
 * ZU DEN IDs: Google fuehrt Knoten mit gleicher @id ueber Seiten
 * hinweg zusammen. Deshalb hat jeder wiederkehrende Knoten eine feste
 * @id, und Verweise darauf sind reine { '@id': ... }-Zeiger statt
 * wiederholter Definitionen.
 */
import { SITE } from './constants';

export const BUSINESS_ID = `${SITE.url}/#business`;
export const TAMMO_ID = `${SITE.url}/#tammo`;
export const WEBSITE_ID = `${SITE.url}/#website`;

type Knoten = Record<string, unknown>;

/**
 * Der WebSite-Knoten.
 *
 * Fehlte bisher ganz. Er ist der Knoten, an dem die Sprache der
 * Fassung haengt: ohne ihn steht im Graph zwar ein Betrieb und eine
 * Brotkrume, aber nirgends, dass es diese Seite in zwei Sprachen
 * gibt. inLanguage sagt es fuer die jeweilige Fassung, die beiden
 * Fassungen teilen sich denselben Betrieb als publisher.
 *
 * KEIN potentialAction/SearchAction: das Sitelinks-Suchfeld hat
 * Google 2023 abgeschaltet. Ein Feld, das nichts mehr ausloest, ist
 * nur noch Gewicht.
 */
export const webSite = (o: {
  locale: 'de' | 'en';
  url: string;
  name: string;
  beschreibung: string;
}): Knoten => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: o.url,
  name: o.name,
  description: o.beschreibung,
  inLanguage: o.locale === 'en' ? 'en' : 'de',
  publisher: { '@id': BUSINESS_ID },
});

/**
 * Ein Dienst, den eine einzelne Seite beschreibt.
 *
 * Dieselbe Form, die VerticalLandingPage fuer die Branchenseiten
 * schon benutzt — hier nur an einem Ort, damit /website und /preise
 * nicht eine dritte Schreibweise bekommen.
 *
 * `preis` ist bewusst ein String: schema.org empfiehlt das fuer
 * Waehrungsangaben, und eine Zahl wuerde bei 2000.0 landen.
 */
export const dienst = (o: {
  seitenUrl: string;
  name: string;
  beschreibung: string;
  art: string;
  land: string;
  preis?: string;
  /**
   * Abrechnungseinheit nach UN/CEFACT, etwa 'HUR' fuer Stunde. Gesetzt
   * wird daraus eine UnitPriceSpecification statt eines nackten
   * Preises — „50" ohne Einheit liest sich als Gesamtpreis, und das
   * waere bei einem Stundensatz eine falsche Zusage.
   */
  einheit?: string;
  zielgruppe?: string;
}): Knoten => {
  const knoten: Knoten = {
    '@type': 'Service',
    '@id': `${o.seitenUrl}#dienst`,
    name: o.name,
    description: o.beschreibung,
    serviceType: o.art,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Country', name: o.land },
  };

  if (o.zielgruppe) {
    knoten.audience = { '@type': 'BusinessAudience', audienceType: o.zielgruppe };
  }

  // Ein Angebot ohne Preis ist eine leere Zusage. Lieber keins.
  if (o.preis !== undefined) {
    const angebot: Knoten = {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: o.seitenUrl,
    };
    if (o.einheit) {
      angebot.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        price: o.preis,
        priceCurrency: 'EUR',
        unitCode: o.einheit,
      };
    } else {
      angebot.price = o.preis;
    }
    knoten.offers = angebot;
  }

  return knoten;
};

/**
 * Haeufige Fragen.
 *
 * BEDINGUNG, die man nicht umgehen darf: Google verlangt, dass Frage
 * UND Antwort auf der Seite sichtbar stehen. Diese Funktion bekommt
 * deshalb genau die Eintraege, die auch gerendert werden — niemals
 * eine eigene, laengere Liste.
 */
export const haeufigeFragen = (
  eintraege: readonly { frage: string; antwort: string }[]
): Knoten => ({
  '@type': 'FAQPage',
  mainEntity: eintraege.map((e) => ({
    '@type': 'Question',
    name: e.frage,
    acceptedAnswer: { '@type': 'Answer', text: e.antwort },
  })),
});
