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

// --- Config ------------------------------------------------------------

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 Stunde

const SUBJECT_LABELS = {
  'website-projekt': 'Website-Projekt',
  'online-shop': 'Online-Shop-Projekt',
  'wartung-support': 'Wartung/Support',
  'allgemein': 'Allgemeine Projektanfrage',
  'anderes': 'Anderes',
} as const;

type SubjectKey = keyof typeof SUBJECT_LABELS;

// --- Validation --------------------------------------------------------

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Bitte gib deinen Namen an (mindestens 2 Zeichen).'),
  email: z.string().trim().email('Bitte gib eine gueltige Email-Adresse an.'),
  phone: z.string().trim().min(6, 'Bitte gib eine gueltige Telefonnummer an.'),
  company: z.string().trim().optional(),
  subject: z.enum(['website-projekt', 'online-shop', 'wartung-support', 'allgemein', 'anderes']),
  message: z.string().trim().min(20, 'Bitte beschreib dein Anliegen etwas ausfuehrlicher (mindestens 20 Zeichen).'),
  datenschutz: z
    .union([z.boolean(), z.literal('true'), z.literal('on'), z.literal('1')])
    .transform((v) => v === true || v === 'true' || v === 'on' || v === '1'),
  // Honeypot — MUSS leer sein. String-Type, optional, keine Validation.
  website: z.string().optional(),
});

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
  data: z.infer<typeof ContactSchema>,
  subjectLabel: string
): string =>
  [
    `Neue Kontaktanfrage — ${subjectLabel}`,
    '',
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Telefon:  ${data.phone}`,
    ...(data.company ? [`Firma:    ${data.company}`] : []),
    `Anliegen: ${subjectLabel}`,
    '',
    'Nachricht:',
    data.message,
    '',
    '---',
    'Reply-To ist gesetzt — du kannst direkt auf diese Mail antworten.',
  ].join('\n');

const buildNotificationHtml = (
  data: z.infer<typeof ContactSchema>,
  subjectLabel: string
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
    </table>

    <div style="padding:20px;background:#f5f5f4;border-left:3px solid rgba(245,158,11,0.6);border-radius:4px;margin-bottom:24px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

    <p style="font-size:0.85rem;color:#6b6b70;margin:0;">Reply-To ist gesetzt — du kannst direkt auf diese Mail antworten.</p>
  </div>
</body>
</html>
`.trim();

const buildAutoReplyText = (firstName: string): string =>
  [
    `Hi ${firstName},`,
    'danke für deine Anfrage.',
    'Ich melde mich innerhalb von 24 Stunden bei dir zurück.',
    'Falls dringend: du erreichst mich auch per WhatsApp unter:',
    '0177 1962704.',
  ].join('\n');

const buildAutoReplyHtml = (firstName: string): string => `
<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1c;line-height:1.65;">
  <div style="max-width:560px;margin:32px auto;padding:36px 32px;background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);">
    <p style="font-size:1.05rem;margin:0;">
      Hi ${escapeHtml(firstName)},<br />
      danke für deine Anfrage.<br />
      Ich melde mich innerhalb von 24 Stunden bei dir zurück.<br />
      Falls dringend: du erreichst mich auch per WhatsApp unter:<br />
      <a href="https://wa.me/491771962704" style="color:rgba(245,158,11,0.95);text-decoration:none;font-weight:500;">0177 1962704</a>.
    </p>
    <div style="margin-top:36px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);font-size:0.85rem;color:#6b6b70;">
      Tammo Studios — Freelance-Webdesign aus Bremen<br />
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
      return jsonResponse(
        { success: false, error: 'Ungueltiger Content-Type. Erwartet JSON oder Formular.' },
        400
      );
    }

    // --- Honeypot: fake-success ohne Mail wenn ausgefuellt ---
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      // Log fuer Analytics — aber Bot bekommt success
      console.log('[kontakt] Honeypot triggered — no mail sent.');
      return jsonResponse({ success: true });
    }

    // --- Validate ---
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse(
        { success: false, error: parsed.error.issues[0]?.message ?? 'Validierung fehlgeschlagen.' },
        400
      );
    }
    const data = parsed.data;

    if (!data.datenschutz) {
      return jsonResponse(
        { success: false, error: 'Bitte die Datenschutz-Bestaetigung ankreuzen.' },
        400
      );
    }

    // --- Rate-Limit ---
    const ip = clientAddress || 'unknown';
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return jsonResponse(
        {
          success: false,
          error: `Zu viele Anfragen. Bitte in ${rate.retryAfter}s erneut versuchen.`,
        },
        429
      );
    }

    // --- Send mails ---
    const apiKey = import.meta.env.RESEND_API_KEY;
    const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'tammo@tammostudios.de';
    const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'tammo@tammostudios.de';

    if (!apiKey) {
      console.error('[kontakt] Missing RESEND_API_KEY env var.');
      return jsonResponse(
        { success: false, error: 'Server-Konfiguration unvollstaendig. Bitte melde dich direkt.' },
        500
      );
    }

    const resend = new Resend(apiKey);
    const subjectLabel = SUBJECT_LABELS[data.subject as SubjectKey];
    const firstName = data.name.split(/\s+/)[0] || data.name;

    // Mail 1 — Notification an Tammo
    const notify = await resend.emails.send({
      from: `Kontakt <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `Neue Anfrage: ${subjectLabel} von ${data.name}`,
      text: buildNotificationText(data, subjectLabel),
      html: buildNotificationHtml(data, subjectLabel),
    });
    if (notify.error) {
      console.error('[kontakt] Notification-Mail fehlgeschlagen:', notify.error);
      return jsonResponse(
        { success: false, error: 'Mail-Versand fehlgeschlagen. Bitte melde dich direkt.' },
        502
      );
    }

    // Mail 2 — Auto-Reply an Absender
    const reply = await resend.emails.send({
      from: `Tammo Studios <${fromEmail}>`,
      to: data.email,
      subject: 'Danke für deine Anfrage — Tammo Studios',
      text: buildAutoReplyText(firstName),
      html: buildAutoReplyHtml(firstName),
    });
    if (reply.error) {
      // Nicht fatal — Notification war erfolgreich, User hat sich gemeldet.
      // Nur loggen. Auto-Reply-Fehler passiert selten (meist SMTP/domain-Themen).
      console.warn('[kontakt] Auto-Reply-Mail fehlgeschlagen (nicht fatal):', reply.error);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error('[kontakt] Unerwarteter Fehler:', err);
    return jsonResponse(
      { success: false, error: 'Server-Fehler beim Senden. Bitte spaeter erneut versuchen.' },
      500
    );
  }
};
