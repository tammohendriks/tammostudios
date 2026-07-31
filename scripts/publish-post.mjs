#!/usr/bin/env node
/**
 * Sanity Journal-Publish Helper.
 *
 * Aus einer Markdown-Datei mit Frontmatter erstellt dieses Script einen
 * Post-Draft im Sanity-Studio. Bild wird uploaded, Body zu Portable Text
 * konvertiert, alles zu einem sauberen Draft zusammengesetzt. Publish
 * passiert manuell im Studio (Review-Step, bewusst).
 *
 * Aufruf:
 *   npm run publish-post posts/was-kostet-eine-website-2026.md
 *   node --env-file-if-exists=.env --env-file-if-exists=.env.local \
 *     scripts/publish-post.mjs <path>
 *
 * ENV noetig:
 *   SANITY_WRITE_TOKEN — Editor-Token aus manage.sanity.io.
 *   ⚠  NICHT `SANITY_STUDIO_TOKEN` nennen — Sanity CLI inlined
 *   SANITY_STUDIO_* Vars in den Browser-Build (via `sanity dev`/deploy).
 *   ⚠  NICHT mit `PUBLIC_` prefixen — dann waere er im Astro-Client-Bundle.
 *   Sicherer Ort: `.env.local` (gitignored).
 *
 * Cover-Image Lookup (in dieser Reihenfolge):
 *   1. posts/images/{slug}.jpg | .jpeg | .png | .webp (lokal, bevorzugt)
 *   2. frontmatter.coverImageUrl (download via fetch, https-only)
 *   3. Error mit klarer Anleitung
 *
 * Slug: frontmatter.slug > basename(file, '.md'). Wird automatisch
 * slugified (umlaute → ae/oe/ue/ss, spaces → -, non-alphanumeric weg,
 * lowercase, cap bei 96 Zeichen) — Ergebnis MUSS Sanity-Document-ID
 * konform sein sonst die() mit klarer Meldung.
 *
 * Draft-ID: `drafts.post-{slug}` — re-runnable mit gleichem Slug ohne
 * Duplikate zu erzeugen (createOrReplace ueberschreibt).
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { createClient } from '@sanity/client';
import { tokensToBlocks } from './lib/markdownToPortableText.mjs';
import { TAG_OPTIONS } from '../sanity/schemaTypes/constants.js';

// ANSI-Farben fuer lesbaren Terminal-Output (kein extra-Dep noetig)
const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  amber: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};
const log = {
  info: (m) => console.log(m),
  step: (m) => console.log(`${c.cyan}${m}${c.reset}`),
  ok: (m) => console.log(`${c.green}✓${c.reset} ${m}`),
  warn: (m) => console.log(`${c.amber}⚠${c.reset}  ${m}`),
  err: (m) => console.error(`${c.red}✗ ${m}${c.reset}`),
  dim: (m) => console.log(`  ${c.dim}${m}${c.reset}`),
};

const die = (msg) => {
  log.err(msg);
  process.exit(1);
};

// --- Slug helpers -------------------------------------------------------

/**
 * Sanity Document-ID Regex — konservativ. Muss mit alphanumerisch anfangen
 * und enden, in der Mitte sind `._-` erlaubt. Cap bei ~96 Zeichen damit
 * mit `drafts.post-` Prefix noch unter 128 (Sanity-Limit) bleibt.
 */
const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,94}[a-z0-9])?$/;

const slugify = (input) =>
  String(input)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);

// --- CLI-Arg parsen -----------------------------------------------------

const inputPath = process.argv[2];
if (!inputPath) {
  die(
    'Missing argument.\n' +
      '  Usage:    npm run publish-post <pfad-zur-markdown>\n' +
      '  Beispiel: npm run publish-post posts/was-kostet-eine-website-2026.md'
  );
}

const absPath = path.isAbsolute(inputPath)
  ? inputPath
  : path.resolve(process.cwd(), inputPath);

if (!fs.existsSync(absPath)) {
  // Wenn Ordner-Sibling .md-Dateien existieren, als Suggestion listen
  let suggestion = '';
  try {
    const dir = path.dirname(absPath);
    const siblings = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .slice(0, 5);
    if (siblings.length) {
      suggestion = `\n  Available im gleichen Ordner:\n    ${siblings.join('\n    ')}`;
    }
  } catch (_) {
    /* dir listing fehlgeschlagen — ignore */
  }
  die(`File not found: ${absPath}${suggestion}`);
}

// --- ENV validieren -----------------------------------------------------

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  die(
    'Missing SANITY_WRITE_TOKEN.\n' +
      '  → Token erstellen: https://www.sanity.io/manage/project/dszzp6oh/api/tokens\n' +
      '  → Permissions: "Editor"\n' +
      '  → In .env.local ablegen (nicht committen!):\n' +
      '    SANITY_WRITE_TOKEN=sk...\n' +
      '  ⚠  NICHT als SANITY_STUDIO_TOKEN nennen — Sanity CLI leaked SANITY_STUDIO_*\n' +
      '     Vars in den Browser-Build. Also nicht mit PUBLIC_ prefixen.'
  );
}

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'dszzp6oh';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

// --- Sanity Client (write-enabled) --------------------------------------

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Writes muessen an die live-API, nicht ueber CDN
});

// --- Markdown lesen + parsen -------------------------------------------

log.info(`\n${c.bold}📄  Publish-Post Helper${c.reset}`);
log.info(`${c.dim}   ${absPath}${c.reset}\n`);

log.step('▸ Frontmatter + Body parsen');
const raw = fs.readFileSync(absPath, 'utf-8');
const { data: fm, content } = matter(raw);

// Slug: Frontmatter > Dateiname (ohne .md), dann slugify
const filenameSlug = path.basename(absPath, path.extname(absPath));
const rawSlug = fm.slug || filenameSlug;
const slug = slugify(rawSlug);

if (!slug || !SLUG_RE.test(slug)) {
  die(
    `Ungueltiger Slug nach Slugify: "${slug}" (aus "${rawSlug}")\n` +
      '  → Slug darf nur a-z, 0-9, - enthalten und muss alphanumerisch\n' +
      '    anfangen + enden. Max 96 Zeichen.\n' +
      '  → Setz explizit `slug: "..."` im Frontmatter oder benenn die Datei um.'
  );
}
if (slug !== rawSlug) {
  log.dim(`Slug normalisiert: "${rawSlug}" → "${slug}"`);
}

// Required frontmatter (slug ist optional weil aus Dateiname derivable)
const required = ['title', 'excerpt', 'publishedAt', 'coverImageAlt'];
const missing = required.filter((k) => !fm[k]);
if (missing.length) {
  die(
    `Missing frontmatter fields: ${missing.join(', ')}\n` +
      '  → Template + Beispiel: posts/README.md § Frontmatter-Template'
  );
}

// Tags gegen Whitelist validieren
let tags = [];
if (fm.tags !== undefined) {
  const rawTags = Array.isArray(fm.tags) ? fm.tags : [fm.tags];
  const unknownTags = rawTags.filter((t) => !TAG_OPTIONS.includes(t));
  if (unknownTags.length) {
    die(
      `Unknown tags: ${unknownTags.join(', ')}\n` +
        `  → Erlaubt: ${TAG_OPTIONS.join(', ')}\n` +
        '  → Case-sensitive.'
    );
  }
  tags = rawTags;
}

log.dim(`Slug:  ${slug}`);
log.dim(`Title: ${fm.title}`);
log.dim(`Tags:  ${tags.join(', ') || '(none)'}`);

// --- Cover-Image finden -------------------------------------------------

log.step('\n▸ Cover-Image finden');

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp'];
const CONTENT_TYPE_MAP = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'posts', 'images');

let imgBuffer;
let imgContentType;
let imgFilename;
let imgSource;

// 1. Lokal via Naming-Konvention (Slug muss stimmen — nach Slugify)
for (const ext of IMAGE_EXTS) {
  const candidate = path.join(imagesDir, `${slug}.${ext}`);
  if (fs.existsSync(candidate)) {
    imgBuffer = fs.readFileSync(candidate);
    imgContentType = CONTENT_TYPE_MAP[ext];
    imgFilename = `${slug}-cover.${ext}`;
    imgSource = `posts/images/${slug}.${ext}`;
    break;
  }
}

// 2. Fallback: URL aus Frontmatter (https-only)
if (!imgBuffer && fm.coverImageUrl) {
  let urlSafe;
  try {
    const u = new URL(fm.coverImageUrl);
    if (u.protocol !== 'https:') {
      die(
        `coverImageUrl muss https:// sein (aktuell: ${u.protocol})\n` +
          `  → URL: ${fm.coverImageUrl}`
      );
    }
    // Credentials strippen fuer terminal log
    u.username = '';
    u.password = '';
    urlSafe = u.toString();
  } catch (e) {
    die(`coverImageUrl ist keine valide URL: ${fm.coverImageUrl}`);
  }

  log.dim(`Kein lokales Bild — lade von URL: ${urlSafe}`);

  let res;
  try {
    res = await fetch(fm.coverImageUrl);
  } catch (err) {
    die(
      `Cover-Image fetch fehlgeschlagen: ${err.message}\n` +
        `  → URL prüfen: ${urlSafe}\n` +
        `  → ODER lokal ablegen: posts/images/${slug}.jpg`
    );
  }
  if (!res.ok) {
    die(
      `Cover-Image download fehlgeschlagen: ${res.status} ${res.statusText}\n` +
        `  → URL prüfen: ${urlSafe}\n` +
        `  → ODER lokal ablegen: posts/images/${slug}.jpg`
    );
  }
  imgBuffer = Buffer.from(await res.arrayBuffer());
  imgContentType = res.headers.get('content-type') || 'image/jpeg';
  const ct = imgContentType.split(';')[0].trim();
  const ext =
    ct === 'image/png'
      ? 'png'
      : ct === 'image/webp'
      ? 'webp'
      : ct === 'image/jpeg'
      ? 'jpg'
      : 'jpg';
  imgFilename = `${slug}-cover.${ext}`;
  imgSource = urlSafe;
}

// 3. Beides fehlt → hilfreiche Meldung
if (!imgBuffer) {
  die(
    `Kein Cover-Bild gefunden.\n` +
      `  → Leg 'posts/images/${slug}.jpg' (oder .png / .webp) ab, ODER\n` +
      `  → Setz 'coverImageUrl' im Frontmatter der Markdown-Datei.`
  );
}

log.dim(`Source: ${imgSource}`);
log.dim(`Size:   ${(imgBuffer.length / 1024).toFixed(1)} KB`);
log.dim(`Type:   ${imgContentType}`);

// --- Bild zu Sanity uploaden -------------------------------------------

log.step('\n▸ Bild zu Sanity uploaden');
const asset = await client.assets.upload('image', imgBuffer, {
  filename: imgFilename,
  contentType: imgContentType,
});
log.dim(`Asset-ID: ${asset._id}`);

// --- Markdown → Portable Text ------------------------------------------

log.step('\n▸ Markdown → Portable Text konvertieren');
// marked-Optionen: keine automatischen mangle/headerIds Sachen — wir
// kontrollieren die Struktur selbst
marked.use({ gfm: true, breaks: false });
const tokens = marked.lexer(content);
const body = tokensToBlocks(tokens);
log.dim(`${body.length} block(s) generiert`);

// --- Existenz-Check: Draft vs Fresh vs Ueberschreibe-Published ----------

// Draft-ID basiert auf Slug → re-runnable ohne Duplikate. Wenn ein Post
// mit gleichem Slug bereits published ist, wird ein neuer Draft angelegt
// der bei Publish den publizierten Post ueberschreibt.
const publishedId = `post-${slug}`;
const draftId = `drafts.${publishedId}`;

const [existingDraft, existingPublished] = await Promise.all([
  client.getDocument(draftId).catch(() => null),
  client.getDocument(publishedId).catch(() => null),
]);

// --- Draft-Dokument bauen + upserten -----------------------------------

log.step('\n▸ Draft im Sanity erstellen');

const doc = {
  _type: 'post',
  _id: draftId,
  title: fm.title,
  slug: { _type: 'slug', current: slug },
  excerpt: fm.excerpt,
  coverImage: {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: fm.coverImageAlt,
  },
  publishedAt: fm.publishedAt,
  tags,
  author: fm.author || 'Tammo Hendriks',
  body,
  ...(fm.seoTitle ? { seoTitle: fm.seoTitle } : {}),
  ...(fm.seoDescription ? { seoDescription: fm.seoDescription } : {}),
};

await client.createOrReplace(doc);
log.dim(`Draft-ID: ${draftId}`);

// --- Erfolg -------------------------------------------------------------

const editorUrl = `https://tammostudios.de/admin/structure/post;${publishedId}`;
const localUrl = `http://localhost:4321/admin/structure/post;${publishedId}`;

console.log('');
if (existingDraft) {
  log.ok(`Draft aktualisiert: ${c.bold}${fm.title}${c.reset}`);
} else {
  log.ok(`Draft erstellt: ${c.bold}${fm.title}${c.reset}`);
}
log.ok(`Editor (Prod):  ${c.cyan}${editorUrl}${c.reset}`);
log.ok(`Editor (Local): ${c.cyan}${localUrl}${c.reset}`);
if (existingPublished) {
  log.warn(
    `Post ist bereits published — Publish im Studio überschreibt die Live-Version`
  );
}
console.log(
  `\n${c.dim}→ Reviewe im Studio und klick Publish wenn Du bereit bist.${c.reset}\n`
);
