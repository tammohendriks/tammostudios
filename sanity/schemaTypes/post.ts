import { defineField, defineType } from 'sanity';
// @ts-expect-error — plain-ESM shared constants (auch von scripts/publish-post
// konsumiert). Vite handled den Import zur Build-Zeit.
import { TAG_OPTIONS, CODE_LANGUAGES } from './constants.js';

/**
 * Journal-Beitrag Schema.
 *
 * Alle deutschen Labels + Descriptions damit das Studio ohne Uebersetzungs-
 * Ballast in der Alltagssprache lesbar ist.
 *
 * Feld-Design entspricht dem was auf /journal + /journal/[slug] gerendert
 * wird: title, slug, excerpt, coverImage, publishedAt, author, tags, body
 * (Portable Text mit block/image/code/link), plus optionale SEO-Felder
 * (seoTitle, seoDescription, ogImage) im collabsible fieldset.
 *
 * TAG_OPTIONS + CODE_LANGUAGES kommen aus ./constants.js damit der
 * publish-post CLI dieselben Werte kennt und Frontmatter-Tags gegen
 * die Whitelist validieren kann (statt nur Studio-Warning nach dem Upsert).
 */

export const post = defineType({
  name: 'post',
  title: 'Journal-Beitrag',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO (optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      description: 'Wird aus dem Titel generiert — Klick auf "Generate"',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung',
      description: 'Teaser für die Journal-Übersicht + SEO-Snippet — max 200 Zeichen',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover-Bild',
      description: 'Hauptbild — erscheint auf /journal und im Beitrag',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          description: 'Kurze Beschreibung — Pflicht für Screen-Reader + SEO',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      description: 'Beitrag erscheint erst wenn dieses Datum in der Vergangenheit liegt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor:in',
      type: 'string',
      initialValue: 'Tammo Hendriks',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Bestimmt die Filter-Chips auf /journal — mehrere möglich',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: TAG_OPTIONS.map((t) => ({ title: t, value: t })),
      },
    }),
    defineField({
      name: 'body',
      title: 'Beitrag',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Fließtext', value: 'normal' },
            { title: 'Zwischenüberschrift', value: 'h2' },
            { title: 'Unter-Überschrift', value: 'h3' },
            { title: 'Zitat', value: 'blockquote' },
          ],
          lists: [
            { title: 'Aufzählung', value: 'bullet' },
            { title: 'Nummeriert', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['https', 'http', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt-Text',
              type: 'string',
            }),
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code-Block',
          fields: [
            {
              name: 'language',
              title: 'Sprache',
              type: 'string',
              options: {
                list: CODE_LANGUAGES.map((v: string) => ({
                  title: v,
                  value: v,
                })),
              },
              initialValue: 'text',
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 8,
            },
          ],
          preview: {
            select: { language: 'language', code: 'code' },
            prepare({ language, code }) {
              return {
                title: `Code (${language || 'text'})`,
                subtitle: code?.slice(0, 60),
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-Titel',
      description: 'Optional — überschreibt den Standard-Titel im Browser-Tab und in Google',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-Beschreibung',
      description: 'Optional — überschreibt die Kurzbeschreibung in Google-Ergebnissen',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social-Share-Bild',
      description: 'Optional — nur wenn das Cover-Bild schlecht als Preview beim Teilen aussieht',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Älteste zuerst',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', date: 'publishedAt' },
    prepare({ title, media, date }) {
      return {
        title: title || 'Ohne Titel',
        subtitle: date
          ? new Date(date).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : 'Kein Datum',
        media,
      };
    },
  },
});
