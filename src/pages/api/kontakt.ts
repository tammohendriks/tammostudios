/**
 * POST /api/kontakt
 *
 * Server-side API-Route (SSR via Vercel-Adapter) fuer das Kontakt-
 * Formular auf /kontakt. Nimmt JSON oder FormData, validiert per zod,
 * versendet 2 Mails via Resend (Notification an Tammo + Auto-Reply
 * an Absender).
 *
 * Response-Format:
 *   { success: true }                                  (200)
 *   { success: false, error: '<human-message>' }       (400 / 429 / 500)
 *
 * Sprache
 * Das Formular schickt `locale` mit ('de' oder 'en', aus dem lang-
 * Attribut der Seite). Danach richten sich die Fehlermeldungen an den
 * Absender und die Bestaetigungsmail. Die Benachrichtigung an Tammo
 * bleibt deutsch — er liest sie — traegt bei einer englischen Anfrage
 * aber einen Hinweis, damit er weiss, in welcher Sprache er antwortet.
 *
 * Anti-Spam
 * - Honeypot-Feld `website` — wenn nicht leer: 200 zurueck OHNE Mail
 *   (Bot merkt keinen Fehler)
 * - Rate-Limit: 5 Anfragen / Stunde pro IP (in-memory Map — reicht fuer
 *   Solo-Setup, ueberlebt Cold-Starts nicht aber macht Serverless
 *   trotzdem hart genug gegen naive Spam-Bursts)
 *
 * ENV noetig (Vercel Dashboard → Env Vars)
 * - RESEND_API_KEY        (secret, Resend-Dashboard)
 * - CONTACT_FROM_EMAIL    (z.B. tammo@tammostudios.de — Sender)
 * - CONTACT_TO_EMAIL      (z.B. tammo@tammostudios.de — Empfaenger)
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { Resend } from 'resend';
import { PHONE_INTERNATIONAL, SITE } from '../../lib/constants';
import type { Gleichlang } from '../../lib/i18n/shape';

// --- Config ------------------------------------------------------------

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 Stunde

// Fuer die Benachrichtigung an Tammo, also immer deutsch. Der Wert
// selbst ist sprachunabhaengig und kommt so aus dem Formular — auf der
// englischen Seite stehen nur andere Beschriftungen in der Auswahl.
const SUBJECT_LABELS = {
  'website-projekt': 'Website-Projekt',
  'online-shop': 'Online-Shop-Projekt',
  'wartung-support': 'Wartung/Support',
  'allgemein': 'Allgemeine Projektanfrage',
  'anderes': 'Anderes',
} as const;

type SubjectKey = keyof typeof SUBJECT_LABELS;

type Locale = 'de' | 'en';

// --- Meldungen an den Absender -----------------------------------------
//
// Ohne `as const`, damit die englische Fassung mit `typeof` dagegen
// typisiert werden kann: mit const waeren die deutschen Saetze exakte
// Literal-Typen und kein englischer Satz passte mehr. So bleibt die
// Pruefung auf Struktur, und ein fehlender oder ueberzaehliger
// Schluessel bricht npm run check.

const meldungenDe = {
  nameZuKurz: 'Bitte gib deinen Namen an (mindestens 2 Zeichen).',
  emailUngueltig: 'Bitte gib eine gueltige Email-Adresse an.',
  telefonUngueltig: 'Bitte gib eine gueltige Telefonnummer an.',
  nachrichtZuKurz: 'Bitte beschreib dein Anliegen etwas ausfuehrlicher (mindestens 20 Zeichen).',
  validierung: 'Validierung fehlgeschlagen.',
  datenschutz: 'Bitte die Datenschutz-Bestaetigung ankreuzen.',
  contentType: 'Ungueltiger Content-Type. Erwartet JSON oder Formular.',
  rateLimit: (sekunden: number) => `Zu viele Anfragen. Bitte in ${sekunden}s erneut versuchen.`,
  konfiguration: 'Server-Konfiguration unvollstaendig. Bitte melde dich direkt.',
  versand: 'Mail-Versand fehlgeschlagen. Bitte melde dich direkt.',
  serverFehler: 'Server-Fehler beim Senden. Bitte spaeter erneut versuchen.',
};

const meldungenEn: typeof meldungenDe = {
  nameZuKurz: 'Please enter your name (at least 2 characters).',
  emailUngueltig: 'Please enter a valid email address.',
  telefonUngueltig: 'Please enter a valid phone number.',
  nachrichtZuKurz: 'Please describe your inquiry in a little more detail (at least 20 characters).',
  validierung: 'Validation failed.',
  datenschutz: 'Please confirm the privacy notice.',
  contentType: 'Invalid content type. JSON or form data expected.',
  rateLimit: (sekunden: number) => `Too many requests. Please try again in ${sekunden}s.`,
  konfiguration: 'Server configuration incomplete. Please get in touch directly.',
  versand: 'Sending the email failed. Please get in touch directly.',
  serverFehler: 'Server error while sending. Please try again later.',
};

const MELDUNGEN: Record<Locale, typeof meldungenDe> = { de: meldungenDe, en: meldungenEn };

// --- Validation --------------------------------------------------------
//
// Das Schema haengt an der Sprache, weil die Meldungen Teil des Schemas
// sind. Deshalb eine Funktion statt einer Konstante.

const contactSchema = (m: typeof meldungenDe) =>
  z.object({
    name: z.string().trim().min(2, m.nameZuKurz),
    email: z.string().trim().email(m.emailUngueltig),
    phone: z.string().trim().min(6, m.telefonUngueltig),
    company: z.string().trim().optional(),
    subject: z.enum(['website-projekt', 'online-shop', 'wartung-support', 'allgemein', 'anderes']),
    message: z.string().trim().min(20, m.nachrichtZuKurz),
    datenschutz: z
      .union([z.boolean(), z.literal('true'), z.literal('on'), z.literal('1')])
      .transform((v) => v === true || v === 'true' || v === 'on' || v === '1'),
    // Honeypot — MUSS leer sein. String-Type, optional, keine Validation.
    website: z.string().optional(),
  });

type ContactData = z.infer<ReturnType<typeof contactSchema>>;

// --- Rate-Limiting (in-memory) -----------------------------------------

const rateLimits = new Map<string, { count: number; resetAt: number }>();

const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true };
};

// --- Helpers -----------------------------------------------------------

const escapeHtml = (s: string): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildNotificationText = (
  data: ContactData,
  subjectLabel: string,
  locale: Locale
): string =>
  [
    `Neue Kontaktanfrage — ${subjectLabel}`,
    '',
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Telefon:  ${data.phone}`,
    ...(data.company ? [`Firma:    ${data.company}`] : []),
    `Anliegen: ${subjectLabel}`,
    // Nur bei einer englischen Anfrage. Steht hier nicht als "Sprache:
    // Deutsch" bei jeder zweiten Mail, sondern genau dann, wenn es eine
    // Information ist.
    ...(locale === 'en' ? ['Sprache:  Englisch — bitte auf Englisch antworten.'] : []),
    '',
    'Nachricht:',
    data.message,
    '',
    '---',
    'Reply-To ist gesetzt — du kannst direkt auf diese Mail antworten.',
  ].join('\n');

const buildNotificationHtml = (
  data: ContactData,
  subjectLabel: string,
  locale: Locale
): string => `
<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1c;line-height:1.55;">
  <div style="max-width:600px;margin:24px auto;padding:32px;background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);">
    <p style="font-family:'Neue Montreal',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:rgba(245,158,11,0.95);margin:0 0 16px;">NEUE ANFRAGE</p>
    <h1 style="font-family:'Neue Montreal',sans-serif;font-size:1.6rem;font-weight:700;margin:0 0 24px;color:#1a1a1c;">${escapeHtml(subjectLabel)} von ${escapeHtml(data.name)}</h1>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:8px 0;color:#6b6b70;width:110px;">Name</td><td style="padding:8px 0;"><strong>${escapeHtml(data.name)}</strong></td></tr>
      <tr><td style="padding:8px 0;color:#6b6b70;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:rgba(245,158,11,0.95);text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b6b70;">Telefon</td><td style="padding:8px 0;"><a href="tel:${escapeHtml(data.phone)}" style="color:rgba(245,158,11,0.95);text-decoration:none;">${escapeHtml(data.phone)}</a></td></tr>
      ${data.company ? `<tr><td style="padding:8px 0;color:#6b6b70;">Firma</td><td style="padding:8px 0;">${escapeHtml(data.company)}</td></tr>` : ''}
      <tr><td style="padding:8px 0;color:#6b6b70;">Anliegen</td><td style="padding:8px 0;">${escapeHtml(subjectLabel)}</td></tr>
      ${locale === 'en' ? `<tr><td style="padding:8px 0;color:#6b6b70;">Sprache</td><td style="padding:8px 0;"><strong>Englisch</strong> — bitte auf Englisch antworten.</td></tr>` : ''}
    </table>

    <div style="padding:20px;background:#f5f5f4;border-left:3px solid rgba(245,158,11,0.6);border-radius:4px;margin-bottom:24px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

    <p style="font-size:0.85rem;color:#6b6b70;margin:0;">Reply-To ist gesetzt — du kannst direkt auf diese Mail antworten.</p>
  </div>
</body>
</html>
`.trim();

// Die Bestaetigung geht an den Absender, also in SEINER Sprache. Jede
// Fassung steht einmal als Textzeilen da; das HTML setzt dieselben
// Zeilen mit <br /> zusammen, damit Text- und HTML-Teil derselben Mail
// nicht auseinanderlaufen koennen.
// Deutsch ist die Quelle, Englisch wird dagegen typisiert — dasselbe
// Verfahren wie bei den Meldungen oben. Vorher waren beide Rueckgaben
// nur string[]: eine fuenfte Zeile im deutschen Zweig haette die
// englische Mail vierzeilig gelassen, ohne Typfehler und ohne
// Build-Abbruch. Genau die Drift, gegen die der Rest der Datei
// gesichert ist.
const antwortZeilenDe = (vorname: string) =>
  [
    `Hi ${vorname},`,
    'danke für deine Anfrage.',
    'Ich melde mich innerhalb von 24 Stunden bei dir zurück.',
    'Falls dringend: du erreichst mich auch per WhatsApp unter:',
  ] as const;

const antwortZeilenEn: (vorname: string) => Gleichlang<
  ReturnType<typeof antwortZeilenDe>,
  string
> = (vorname) => [
  `Hi ${vorname},`,
  'Thanks for your inquiry.',
  "I'll get back to you within 24 hours.",
  'If it is urgent, you can also reach me on WhatsApp:',
];

const antwortZeilen: Record<Locale, (vorname: string) => readonly string[]> = {
  de: antwortZeilenDe,
  en: antwortZeilenEn,
};

const antwortDe = {
  subject: 'Danke für deine Anfrage — Tammo Studios',
  signatur: 'Tammo Studios — Freelance-Webdesign aus Bremen',
};

const antwortEn: typeof antwortDe = {
  subject: 'Thanks for your inquiry — Tammo Studios',
  signatur: 'Tammo Studios — freelance web design from Bremen',
};

const ANTWORT: Record<Locale, typeof antwortDe> = { de: antwortDe, en: antwortEn };

// Die Rufnummer in der Schreibweise, die zur Sprache passt: eine 0177
// kann aus dem Ausland niemand waehlen. Beide Fassungen stammen aus
// constants.ts, die internationale ist dort abgeleitet.
const rufnummer = (locale: Locale) =>
  locale === 'en' ? PHONE_INTERNATIONAL : SITE.phone;

const buildAutoReplyText = (firstName: string, locale: Locale): string =>
  [...antwortZeilen[locale](firstName), `${rufnummer(locale)}.`].join('\n');

const buildAutoReplyHtml = (firstName: string, locale: Locale): string => `
<!doctype html>
<html lang="${locale}">
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1c;line-height:1.65;">
  <div style="max-width:560px;margin:32px auto;padding:36px 32px;background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);">
    <p style="font-size:1.05rem;margin:0;">
      ${antwortZeilen[locale](escapeHtml(firstName)).join('<br />\n      ')}<br />
      <a href="https://wa.me/491771962704" style="color:rgba(245,158,11,0.95);text-decoration:none;font-weight:500;">${rufnummer(locale)}</a>.
    </p>
    <div style="margin-top:36px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);font-size:0.85rem;color:#6b6b70;">
      ${ANTWORT[locale].signatur}<br />
      <a href="https://tammostudios.de" style="color:#6b6b70;text-decoration:underline;">tammostudios.de</a>
    </div>
  </div>
</body>
</html>
`.trim();

// --- Route Handler -----------------------------------------------------

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const jsonResponse = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  // Steht vor dem try, damit auch der catch-Zweig unten eine Sprache
  // hat. Wird gleich nach dem Lesen des Bodys gesetzt.
  let m = meldungenDe;

  try {
    // --- Parse body ---
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown> = {};
    if (contentType.includes('application/json')) {
      body = (await request.json()) as Record<string, unknown>;
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const fd = await request.formData();
      body = Object.fromEntries(fd);
    } else {
      return jsonResponse({ success: false, error: m.contentType }, 400);
    }

    // --- Sprache ---
    // Vor der Validierung, weil die Meldungen der Validierung schon in
    // der richtigen Sprache sein sollen. Alles ausser 'en' gilt als
    // deutsch, ein unbekannter Wert ist also harmlos.
    const locale: Locale = body.locale === 'en' ? 'en' : 'de';
    m = MELDUNGEN[locale];

    // --- Honeypot: fake-success ohne Mail wenn ausgefuellt ---
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      // Log fuer Analytics — aber Bot bekommt success
      console.log('[kontakt] Honeypot triggered — no mail sent.');
      return jsonResponse({ success: true });
    }

    // --- Validate ---
    const parsed = contactSchema(m).safeParse(body);
    if (!parsed.success) {
      return jsonResponse(
        { success: false, error: parsed.error.issues[0]?.message ?? m.validierung },
        400
      );
    }
    const data = parsed.data;

    if (!data.datenschutz) {
      return jsonResponse({ success: false, error: m.datenschutz }, 400);
    }

    // --- Rate-Limit ---
    const ip = clientAddress || 'unknown';
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return jsonResponse({ success: false, error: m.rateLimit(rate.retryAfter ?? 0) }, 429);
    }

    // --- Send mails ---
    const apiKey = import.meta.env.RESEND_API_KEY;
    const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'tammo@tammostudios.de';
    const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'tammo@tammostudios.de';

    if (!apiKey) {
      console.error('[kontakt] Missing RESEND_API_KEY env var.');
      return jsonResponse({ success: false, error: m.konfiguration }, 500);
    }

    const resend = new Resend(apiKey);
    const subjectLabel = SUBJECT_LABELS[data.subject as SubjectKey];
    const firstName = data.name.split(/\s+/)[0] || data.name;

    // Mail 1 — Notification an Tammo
    const notify = await resend.emails.send({
      from: `Kontakt <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      // Der Zusatz (EN) steht in der Betreffzeile, damit im Postfach auf
      // einen Blick klar ist, in welcher Sprache zu antworten ist.
      subject: `Neue Anfrage${locale === 'en' ? ' (EN)' : ''}: ${subjectLabel} von ${data.name}`,
      text: buildNotificationText(data, subjectLabel, locale),
      html: buildNotificationHtml(data, subjectLabel, locale),
    });
    if (notify.error) {
      console.error('[kontakt] Notification-Mail fehlgeschlagen:', notify.error);
      return jsonResponse({ success: false, error: m.versand }, 502);
    }

    // Mail 2 — Auto-Reply an Absender
    const reply = await resend.emails.send({
      from: `Tammo Studios <${fromEmail}>`,
      to: data.email,
      subject: ANTWORT[locale].subject,
      text: buildAutoReplyText(firstName, locale),
      html: buildAutoReplyHtml(firstName, locale),
    });
    if (reply.error) {
      // Nicht fatal — Notification war erfolgreich, User hat sich gemeldet.
      // Nur loggen. Auto-Reply-Fehler passiert selten (meist SMTP/domain-Themen).
      console.warn('[kontakt] Auto-Reply-Mail fehlgeschlagen (nicht fatal):', reply.error);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error('[kontakt] Unerwarteter Fehler:', err);
    return jsonResponse({ success: false, error: m.serverFehler }, 500);
  }
};
