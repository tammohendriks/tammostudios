/**
 * POST /api/quiz-submit
 *
 * Nimmt den Skizzen-Fragebogen der Branchen-Landingpages entgegen
 * (multipart/form-data, weil Dateien mitkommen), validiert per zod und
 * verschickt zwei Mails ueber Resend: die Anfrage an Tammo, eine
 * Bestaetigung an den Absender.
 *
 * Response-Format, identisch zu /api/kontakt:
 *   { success: true }                             (200)
 *   { success: false, error: '<Satz>' }           (400 / 413 / 429 / 500 / 502)
 *
 * WARUM DIE DATEIEN ALS MAIL-ANHANG UND NICHT IN SANITY:
 * das Briefing sah Sanity Assets vor, "um keine neue Infrastruktur zu
 * brauchen". Der Anhang braucht noch weniger:
 *   - kein Schreib-Token in Produktion. Ein Sanity-Write-Token muesste
 *     in die Vercel-Umgebung, und Astro setzt import.meta.env zur
 *     BUILD-Zeit ein — das Geheimnis landete im Artefakt und ein
 *     rotierter Token wuerde erst nach einem Rebuild greifen.
 *   - keine Waisen. Jeder Sanity-Upload erzeugt ein eigenstaendiges
 *     Asset-Dokument, das an nichts haengt und nie wieder verschwindet.
 *     Bei Werbe-Traffic sammelt sich das.
 *   - die Dateien liegen dort, wo Tammo sie sucht: an der Mail, die er
 *     ohnehin oeffnet.
 *
 * WARUM NUR 4 MB:
 * Vercel kappt den Rumpf jeder Funktions-Anfrage bei 4,5 MB (413
 * FUNCTION_PAYLOAD_TOO_LARGE) — hart, auf allen Tarifen, nicht
 * konfigurierbar. Das Briefing nannte 20 MB; die waeren an dieser Wand
 * verlaesslich gescheitert, mit einer Fehlermeldung, die niemand
 * versteht. Die Grenze steht deshalb bei 4 MB (src/lib/skizze.ts) und
 * die Bestaetigungsmail laedt ausdruecklich dazu ein, Groesseres
 * einfach zu antworten.
 *
 * Anti-Spam
 * - Honeypot-Feld `website` — wenn gefuellt: 200 OHNE Mail
 * - Rate-Limit 5/Stunde pro IP, GETEILT mit /api/kontakt
 *
 * ENV noetig (Vercel Dashboard → Env Vars) — dieselben wie /api/kontakt,
 * keine neuen:
 * - RESEND_API_KEY
 * - CONTACT_FROM_EMAIL   (Standard tammo@tammostudios.de)
 * - CONTACT_TO_EMAIL     (Standard tammo@tammostudios.de)
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { Resend } from 'resend';
import { PHONE_INTERNATIONAL, SITE } from '../../lib/constants';
import { limitPruefen } from '../../lib/rateLimit';
import {
  ZIELE,
  STILE,
  FUNKTIONEN,
  ALLE_FUNKTIONEN,
  UPLOAD,
  type SkizzeBranche,
} from '../../lib/skizze';
import { de as skizzeDe } from '../../lib/i18n/seiten/skizze';

type Locale = 'de' | 'en';

// --- Beschriftungen fuer die Mail an Tammo ------------------------------
//
// Immer deutsch — er liest sie. Die Werte kommen sprachunabhaengig aus
// dem Formular, uebersetzt waren nur die Beschriftungen davor.

const BRANCHEN: Record<SkizzeBranche, string> = {
  handwerk: 'Handwerk',
  praxis: 'Praxis',
  gastronomie: 'Gastronomie',
  medien: 'Medien',
  kanzlei: 'Kanzlei',
  immobilien: 'Immobilien',
};

/**
 * Die erlaubten Branchen, abgeleitet statt aufgezaehlt.
 *
 * Stand hier vorher als eigene Liste im zod-Schema. Eine neue Branche
 * haette dann ueberall funktioniert — nur der Fragebogen haette sie
 * mit "Bitte prüf deine Eingaben" abgelehnt, und zwar erst in
 * Produktion, weil der Typchecker eine vollstaendige, aber falsche
 * Liste nicht bemaengelt. Jetzt ist FUNKTIONEN die einzige Quelle.
 */
const BRANCHEN_SCHLUESSEL = Object.keys(BRANCHEN) as [SkizzeBranche, ...SkizzeBranche[]];

const ZIEL_LABEL: Record<string, string> = Object.fromEntries(
  ZIELE.map((wert, i) => [wert, skizzeDe.quiz.ziel.optionen[i].titel])
);

const STIL_LABEL: Record<string, string> = Object.fromEntries(
  STILE.map((wert, i) => [wert, skizzeDe.quiz.stil.optionen[i].titel])
);

/**
 * Funktions-Schluessel auf deutsche Namen.
 *
 * Aus allen drei Branchen zusammengefuehrt: 'kontaktformular' und
 * 'maps' kommen in mehreren vor, und die Schreibweisen unterscheiden
 * sich leicht. Die erste gewinnt — welche das ist, spielt fuer die
 * Mail keine Rolle, Hauptsache es steht ein Name statt eines
 * Schluessels da.
 */
const FUNKTION_LABEL: Record<string, string> = (() => {
  const karte: Record<string, string> = {};
  for (const branche of Object.keys(FUNKTIONEN) as SkizzeBranche[]) {
    const schluessel = FUNKTIONEN[branche];
    const namen = skizzeDe.quiz.funktionen.namen[branche];
    schluessel.forEach((key, i) => {
      // Die erste gewinnt. 'kontaktformular' und 'maps' stehen in
      // mehreren Branchen mit leicht verschiedener Schreibweise —
      // welche in der Mail landet, ist gleichgueltig, Hauptsache ein
      // Name statt eines Schluessels.
      if (!karte[key]) karte[key] = namen[i];
    });
  }
  return karte;
})();

// --- Meldungen an den Absender ------------------------------------------
//
// Bewusst OHNE `as const`: mit Literal-Typen liesse sich meldungenEn
// nicht mehr befuellen. Dasselbe Muster wie in kontakt.ts, und dort
// steht der Grund ausfuehrlich.

const meldungenDe = {
  contentType: 'Unerwartetes Format der Anfrage.',
  validierung: 'Bitte prüf deine Eingaben.',
  datenschutz: 'Bitte akzeptiere die Datenschutzerklärung.',
  zuGross: `Die Dateien sind zusammen zu groß (max. ${Math.round(UPLOAD.maxGesamtBytes / 1024 / 1024)} MB). Schick mir Größeres einfach als Antwort auf die Bestätigungsmail.`,
  dateiTyp: 'Dieses Dateiformat kann ich nicht annehmen.',
  rateLimit: (sekunden: number) =>
    `Zu viele Anfragen. Versuch es in ${Math.ceil(sekunden / 60)} Minuten nochmal — oder ruf an: ${SITE.phone}.`,
  konfiguration: 'Der Versand ist gerade nicht eingerichtet. Ruf mich an: ' + SITE.phone,
  versand: 'Die Mail ging nicht raus. Versuch es nochmal oder ruf an: ' + SITE.phone,
  serverFehler: 'Da ist etwas schiefgegangen. Ruf mich an: ' + SITE.phone,
};

const meldungenEn: typeof meldungenDe = {
  contentType: 'Unexpected request format.',
  validierung: 'Please check your entries.',
  datenschutz: 'Please accept the privacy policy.',
  zuGross: `Your files are too large together (max. ${Math.round(UPLOAD.maxGesamtBytes / 1024 / 1024)} MB). Just reply to the confirmation email with anything bigger.`,
  dateiTyp: 'I cannot accept that file format.',
  rateLimit: (sekunden: number) =>
    `Too many requests. Try again in ${Math.ceil(sekunden / 60)} minutes, or call me: ${PHONE_INTERNATIONAL}.`,
  konfiguration: 'Sending is not set up right now. Call me: ' + PHONE_INTERNATIONAL,
  versand: 'The email did not go out. Try again or call me: ' + PHONE_INTERNATIONAL,
  serverFehler: 'Something went wrong. Call me: ' + PHONE_INTERNATIONAL,
};

const MELDUNGEN: Record<Locale, typeof meldungenDe> = { de: meldungenDe, en: meldungenEn };

// --- Validierung ---------------------------------------------------------

const skizzeSchema = (m: typeof meldungenDe) =>
  z.object({
    // JEDES Feld bekommt eine eigene Meldung. Ohne sie gibt zod seine
    // englischen Standardtexte heraus — und die erste Meldung geht
    // ungefiltert an den Besucher. Gemessen stand da sonst
    // 'Invalid option: expected one of "handwerk"|"praxis"|…': eine
    // englische Zeile, die obendrein die internen Werte verraet.
    branche: z.enum(BRANCHEN_SCHLUESSEL, { error: m.validierung }),
    // Mehrfachauswahl seit Runde 2. Die Meldung steht dreimal, weil
    // zod sonst an drei Stellen englisch wird: beim fehlenden Feld,
    // beim unbekannten Wert und bei der leeren Liste.
    ziele: z
      .array(z.enum(ZIELE, { error: m.validierung }), { error: m.validierung })
      .min(1, m.validierung),
    hatWebsite: z.enum(['ja', 'nein'], { error: m.validierung }),
    url: z.string({ error: m.validierung }).trim().max(300).optional(),
    funktionen: z.array(z.string()).default([]),
    stil: z.enum(STILE, { error: m.validierung }),
    firma: z.string({ error: m.validierung }).trim().min(2, m.validierung).max(120),
    vorname: z.string({ error: m.validierung }).trim().min(2, m.validierung).max(80),
    // z.email() statt z.string().email() — in zod 4 ist die
    // Methodenform veraltet. kontakt.ts nutzt sie noch; hier gleich
    // richtig, statt die Warnung zu vererben.
    email: z.email(m.validierung).trim().max(200),
    telefon: z.string({ error: m.validierung }).trim().max(60).optional(),
    nachricht: z.string({ error: m.validierung }).trim().max(500).optional(),
    datenschutz: z
      .union([z.boolean(), z.literal('true'), z.literal('on'), z.literal('1')], {
        error: m.datenschutz,
      })
      .transform((v) => v === true || v === 'true' || v === 'on' || v === '1'),
    // Honeypot — MUSS leer sein.
    website: z.string().optional(),
  });

type SkizzeDaten = z.infer<ReturnType<typeof skizzeSchema>>;

// --- Helfer ---------------------------------------------------------------

const escapeHtml = (s: string): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const kb = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** Passt Typ UND Endung? Der gemeldete MIME-Typ kommt vom Browser. */
const typErlaubt = (datei: File): boolean => {
  const name = datei.name.toLowerCase();
  return UPLOAD.typen.some(
    (t) => t.mime === datei.type || t.endungen.some((e) => name.endsWith(e))
  );
};

const anfrageText = (
  d: SkizzeDaten,
  dateien: { name: string; size: number }[],
  locale: Locale
): string =>
  [
    `Neue Skizzen-Anfrage — ${BRANCHEN[d.branche]}`,
    '',
    `Firma:    ${d.firma}`,
    `Vorname:  ${d.vorname}`,
    `E-Mail:   ${d.email}`,
    ...(d.telefon ? [`Telefon:  ${d.telefon}`] : []),
    ...(locale === 'en' ? ['Sprache:  Englisch — bitte auf Englisch antworten.'] : []),
    '',
    '--- Fragebogen ---',
    `Ziele:       ${d.ziele.map((z) => ZIEL_LABEL[z] ?? z).join(', ')}`,
    `Website:     ${d.hatWebsite === 'ja' ? d.url || 'ja, ohne Adresse' : 'noch keine'}`,
    `Stil:        ${STIL_LABEL[d.stil] ?? d.stil}`,
    `Funktionen:  ${
      d.funktionen.length
        ? d.funktionen.map((f) => FUNKTION_LABEL[f] ?? f).join(', ')
        : '— keine ausgewählt'
    }`,
    '',
    ...(d.nachricht ? ['Nachricht:', d.nachricht, ''] : []),
    dateien.length
      ? `Anhänge (${dateien.length}): ${dateien.map((f) => `${f.name} (${kb(f.size)})`).join(', ')}`
      : 'Keine Anhänge.',
    '',
    '---',
    'Reply-To ist gesetzt — du kannst direkt auf diese Mail antworten.',
  ].join('\n');

const anfrageHtml = (
  d: SkizzeDaten,
  dateien: { name: string; size: number }[],
  locale: Locale
): string => {
  const zeile = (k: string, v: string) =>
    `<tr><td style="padding:4px 14px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;color:#111827">${escapeHtml(v)}</td></tr>`;
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#111827">
  <h2 style="margin:0 0 4px;font-size:18px">Neue Skizzen-Anfrage</h2>
  <p style="margin:0 0 18px;color:#6b7280">${escapeHtml(BRANCHEN[d.branche])}${locale === 'en' ? ' · englische Anfrage' : ''}</p>
  <table style="border-collapse:collapse;margin-bottom:18px">
    ${zeile('Firma', d.firma)}
    ${zeile('Vorname', d.vorname)}
    ${zeile('E-Mail', d.email)}
    ${d.telefon ? zeile('Telefon', d.telefon) : ''}
  </table>
  <table style="border-collapse:collapse;margin-bottom:18px">
    ${zeile('Ziele', d.ziele.map((z) => ZIEL_LABEL[z] ?? z).join(', '))}
    ${zeile('Website', d.hatWebsite === 'ja' ? d.url || 'ja, ohne Adresse' : 'noch keine')}
    ${zeile('Stil', STIL_LABEL[d.stil] ?? d.stil)}
    ${zeile(
      'Funktionen',
      d.funktionen.length
        ? d.funktionen.map((f) => FUNKTION_LABEL[f] ?? f).join(', ')
        : '— keine ausgewählt'
    )}
  </table>
  ${
    d.nachricht
      ? `<p style="margin:0 0 6px;color:#6b7280">Nachricht</p><p style="margin:0 0 18px;white-space:pre-wrap">${escapeHtml(d.nachricht)}</p>`
      : ''
  }
  <p style="margin:0;color:#6b7280">${
    dateien.length
      ? `${dateien.length} Anhang/Anhänge: ${escapeHtml(dateien.map((f) => `${f.name} (${kb(f.size)})`).join(', '))}`
      : 'Keine Anhänge.'
  }</p>
</div>`;
};

const BESTAETIGUNG = {
  de: {
    subject: 'Deine Website-Skizze ist auf dem Weg',
    text: (name: string) =>
      [
        `Hey ${name},`,
        '',
        'danke für deine Anfrage — ich habe alles bekommen.',
        '',
        'Innerhalb von 48 Stunden (werktags) bekommst du von mir',
        'persönlich eine individuelle Skizze mit deinen Inhalten.',
        'Keine Vorlage, keine Standardlösung.',
        '',
        'Falls du noch etwas ergänzen willst — Logo, Fotos, Texte —',
        'antworte einfach auf diese Mail und häng es an. Auch große',
        'Dateien sind hier kein Problem.',
        '',
        'Liebe Grüße',
        'Tammo',
        '',
        SITE.phone + ' · ' + SITE.url,
      ].join('\n'),
  },
  en: {
    subject: 'Your website sketch is on its way',
    text: (name: string) =>
      [
        `Hey ${name},`,
        '',
        'thanks for your request. Everything came through.',
        '',
        'Within 48 hours (on weekdays) you will get a custom sketch',
        'from me personally, built around your content. No template,',
        'no off-the-shelf solution.',
        '',
        'If you want to add anything — a logo, photos, text — just',
        'reply to this email and attach it. Large files are fine here.',
        '',
        'Best',
        'Tammo',
        '',
        PHONE_INTERNATIONAL + ' · ' + SITE.url,
      ].join('\n'),
  },
};

// --- Route ---------------------------------------------------------------

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (nutzlast: unknown, status = 200) =>
    new Response(JSON.stringify(nutzlast), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  let m = meldungenDe;

  try {
    const typ = request.headers.get('content-type') || '';
    if (!typ.includes('multipart/form-data') && !typ.includes('x-www-form-urlencoded')) {
      return json({ success: false, error: m.contentType }, 400);
    }

    const fd = await request.formData();

    const locale: Locale = fd.get('locale') === 'en' ? 'en' : 'de';
    m = MELDUNGEN[locale];

    // Honigtopf zuerst: ein Bot soll weder Kontingent verbrauchen noch
    // merken, dass er aufgefallen ist.
    const honig = fd.get('website');
    if (typeof honig === 'string' && honig.trim() !== '') {
      console.log('[quiz] Honeypot ausgeloest — keine Mail.');
      return json({ success: true });
    }

    // Mehrfachauswahl kommt als mehrere Eintraege unter demselben
    // Namen; Object.fromEntries behielte nur den letzten.
    const roh: Record<string, unknown> = {};
    for (const [schluessel, wert] of fd.entries()) {
      if (wert instanceof File) continue;
      if (schluessel === 'funktionen' || schluessel === 'ziele') {
        const bisher = (roh[schluessel] as string[] | undefined) ?? [];
        bisher.push(wert);
        roh[schluessel] = bisher;
      } else {
        roh[schluessel] = wert;
      }
    }

    const geprueft = skizzeSchema(m).safeParse(roh);
    if (!geprueft.success) {
      return json(
        { success: false, error: geprueft.error.issues[0]?.message ?? m.validierung },
        400
      );
    }
    const daten = geprueft.data;

    if (!daten.datenschutz) {
      return json({ success: false, error: m.datenschutz }, 400);
    }

    // Unbekannte Funktions-Schluessel stillschweigend verwerfen statt
    // die Anfrage abzulehnen: sie sind reine Zusatzinformation, und ein
    // echter Interessent soll an einem veralteten Formular nicht
    // scheitern.
    daten.funktionen = daten.funktionen.filter((f) => ALLE_FUNKTIONEN.includes(f));

    // --- Dateien ---
    const dateien = fd.getAll('dateien').filter((w): w is File => w instanceof File && w.size > 0);
    if (dateien.length > UPLOAD.maxAnzahl) {
      return json({ success: false, error: m.zuGross }, 413);
    }
    let summe = 0;
    for (const datei of dateien) {
      if (!typErlaubt(datei)) return json({ success: false, error: m.dateiTyp }, 400);
      summe += datei.size;
      if (datei.size > UPLOAD.maxDateiBytes || summe > UPLOAD.maxGesamtBytes) {
        return json({ success: false, error: m.zuGross }, 413);
      }
    }

    const grenze = limitPruefen(clientAddress || 'unknown');
    if (!grenze.erlaubt) {
      return json({ success: false, error: m.rateLimit(grenze.erneutIn ?? 0) }, 429);
    }

    // --- Mails ---
    const apiKey = import.meta.env.RESEND_API_KEY;
    const vonMail = import.meta.env.CONTACT_FROM_EMAIL || SITE.email;
    const anMail = import.meta.env.CONTACT_TO_EMAIL || SITE.email;
    if (!apiKey) {
      console.error('[quiz] RESEND_API_KEY fehlt.');
      return json({ success: false, error: m.konfiguration }, 500);
    }

    const anhaenge = await Promise.all(
      dateien.map(async (datei) => ({
        filename: datei.name,
        content: Buffer.from(await datei.arrayBuffer()),
        contentType: datei.type || undefined,
      }))
    );
    const dateiInfo = dateien.map((f) => ({ name: f.name, size: f.size }));

    const resend = new Resend(apiKey);

    const anfrage = await resend.emails.send({
      from: `Skizze <${vonMail}>`,
      to: anMail,
      replyTo: daten.email,
      subject: `Neue Skizzen-Anfrage${locale === 'en' ? ' (EN)' : ''}: ${daten.firma} (${BRANCHEN[daten.branche]})`,
      text: anfrageText(daten, dateiInfo, locale),
      html: anfrageHtml(daten, dateiInfo, locale),
      ...(anhaenge.length ? { attachments: anhaenge } : {}),
    });
    if (anfrage.error) {
      console.error('[quiz] Anfrage-Mail fehlgeschlagen:', anfrage.error);
      return json({ success: false, error: m.versand }, 502);
    }

    // Die Bestaetigung ist nicht lebenswichtig: die Anfrage ist
    // angekommen, der Interessent sieht gleich die Danke-Seite. Ein
    // Fehler hier darf den Vorgang nicht umwerfen.
    const bestaetigung = await resend.emails.send({
      from: `Tammo Studios <${vonMail}>`,
      to: daten.email,
      subject: `${BESTAETIGUNG[locale].subject}, ${daten.vorname}`,
      text: BESTAETIGUNG[locale].text(daten.vorname),
    });
    if (bestaetigung.error) {
      console.warn('[quiz] Bestätigungsmail fehlgeschlagen (nicht fatal):', bestaetigung.error);
    }

    return json({ success: true });
  } catch (err) {
    console.error('[quiz] Unerwarteter Fehler:', err);
    return json({ success: false, error: m.serverFehler }, 500);
  }
};
