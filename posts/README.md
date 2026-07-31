# Journal-Posts als Markdown

Ordner für Journal-Content im Source-Format. Jede `.md`-Datei wird via
`npm run publish-post <pfad>` als Draft ins Sanity-Studio geladen.

## Voraussetzung

**Node ≥ 22.12** (`node -v` prüfen). Das npm-Script nutzt
`--env-file-if-exists`, stabilisiert seit 22.12.

## Setup einmalig

1. **Sanity Write-Token erstellen**
   → https://www.sanity.io/manage/project/dszzp6oh/api/tokens
   → **Add API Token** → Name: `publish-post-script` → Permissions: **Editor**
   → Token kopieren (wird nur einmal angezeigt!)

2. **Token in `.env.local` ablegen** (im Repo-Root, gitignored)

   ```
   SANITY_WRITE_TOKEN=sk...
   ```

   > **Wichtig:** NICHT als `SANITY_STUDIO_TOKEN` benennen — der `SANITY_STUDIO_*`-Prefix
   > wird von der Sanity CLI beim Studio-Build in den **Client-Bundle inlined**.
   > Auch NICHT mit `PUBLIC_` prefixen — dann landet der Write-Token im Astro-Client-Bundle.
   > Neutraler Name `SANITY_WRITE_TOKEN` bleibt server-only.

## Neuen Beitrag anlegen

1. **Cover-Bild** ablegen unter `posts/images/{slug}.jpg` (oder `.png` / `.webp`)
2. **Markdown-Datei** anlegen unter `posts/{slug}.md`, siehe Template unten
3. **Publish-Script** laufen lassen:

   ```
   npm run publish-post posts/{slug}.md
   ```

4. **Draft im Studio reviewen** (Editor-URL kommt im Terminal) und
   auf **Publish** klicken wenn's passt.
5. **Vercel-Rebuild** wird durch den Sanity→Vercel Webhook getriggert
   (~60s bis der Beitrag auf `/journal` sichtbar ist).

## Frontmatter-Template

Zum Kopieren (4-Backtick Fence damit die inneren 3er Fences sauber bleiben):

````markdown
---
title: "Was kostet eine Website 2026? Ehrliche Zahlen für kleine Unternehmen"
slug: "was-kostet-eine-website-2026"       # optional, sonst aus Dateiname
excerpt: "Freelancer 500 €, Agentur 8.000 €, Baukasten 15 €/Monat — die Preisspanne ist absurd. Ehrliche Einordnung."
tags: ["Preise", "Prozess"]                # aus predefined Liste (siehe unten)
publishedAt: "2026-08-04T09:00:00+02:00"   # ISO-Datum
coverImageUrl: "https://…"                 # optional, Fallback wenn kein lokales Bild
coverImageAlt: "Notizbuch mit Stift und Kaffee"
author: "Tammo Hendriks"                   # optional, default = Tammo Hendriks
seoTitle: "Was kostet eine Website 2026?"  # optional, sonst = title
seoDescription: "…"                        # optional, sonst = excerpt
---

# Post-Body startet hier in Markdown

Freitext, Absätze, **Bold**, *Italic*, `inline code`, [Links](https://example.com).

## Zwischenüberschrift (H2)

Absätze werden zu Portable-Text-Paragraphen konvertiert.

### Unter-Überschrift (H3)

- Bullet-Listen
- Werden supported
- Ebenso wie …

1. Nummerierte Listen
2. Genauso

> Blockquotes bekommen den `blockquote`-Style.

```bash
# Code-Blocks (mit Language) landen als codeBlock-Type im Studio
npm run publish-post posts/hallo.md
```
````

## Tag-Liste (predefined im Sanity-Schema)

Nur diese 9 Tags sind erlaubt (case-sensitive) — das Script bricht mit
Fehler ab wenn du einen anderen Wert schreibst:

Handwerk · Praxis · Gastronomie · Preise · Prozess · Recruiting · Tools · SEO · Design

## Cover-Bild Lookup

Das Script sucht in dieser Reihenfolge:

1. `posts/images/{slug}.jpg` (oder `.jpeg`, `.png`, `.webp`) — **bevorzugt**
2. `coverImageUrl` aus Frontmatter (Download via fetch, https-only)
3. Fehler mit klarer Meldung

## Slug

- Frontmatter `slug:` gewinnt, sonst wird der Dateiname (ohne `.md`) genommen
- Wird automatisch **slugified**: lowercase, Umlaute → `ae/oe/ue/ss`,
  Sonderzeichen → `-`, max 96 Zeichen
- Muss nach Slugify Sanity-ID-konform sein (`[a-z0-9-]`, alphanumerischer
  Start + Ende) — sonst hilfreicher Fehler

## Re-Runs

Führst du das Script mit gleichem Slug nochmal aus, wird der bestehende
Draft **überschrieben** (via `createOrReplace` mit deterministischer ID
`drafts.post-{slug}`). Kein Draft-Duplikat.

Ist der Beitrag bereits published, erzeugt ein Re-Run einen neuen Draft
der bei Publish die Live-Version überschreibt. Terminal-Ausgabe warnt
dich explizit vor dieser Situation.

## Was der Konverter supported

- Headings H1 → H2 (weil Post-Titel schon als H1 auf der Page rendert), H2, H3
- Paragraphen
- Bold (`**…**`), Italic (`*…*`), Inline-Code (`` `…` ``)
- Links (Annotations mit href) — nur `http`/`https`/`mailto`/`tel`/`/…`.
  Unsafe schemes (`javascript:`, `data:` etc.) werden mit Warning gedroppt
- Bullet + Numbered Lists (flat, nested lists werden mit Warning geskippt)
- Blockquotes (nur Paragraphen im Inneren; anderes wird mit Warning geskippt)
- Code-Blocks (mit Sprache) → `codeBlock`-Type mit Language-Selector im Studio.
  Aliases werden gemappt (`typescript`→`ts`, `shell`→`bash`, `yaml`→`text`, …).
  Unbekannte Sprachen fallen auf `text` zurück.
- **Nicht supported**: Inline-Bilder im Body (kommt später falls Bedarf),
  Tables, HTML-Blocks, `hr`. Werden mit Warning geskippt.
