import { defineField, defineType } from 'sanity';

/**
 * Journal-Beitrag Schema.
 *
 * Feld-Design orientiert an dem was auf /journal + /journal/[slug] gebraucht
 * wird: Titel + URL + Datum + Teaser + Hero + Portable-Text-Body + Tags.
 * Alle deutschen Labels + Descriptions damit das Studio ohne Uebersetzungs-
 * Ballast in der Alltagssprache lesbar ist — passt zum "Dein Studio"-
 * Konzept auf der Marketing-Seite.
 */
export const post = defineType({
  name: 'post',
  title: 'Journal-Beitrag',
  type: 'document',
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
      name: 'publishedAt',
      title: 'Veröffentlicht am',
      description: 'Beitrag erscheint erst wenn dieses Datum in der Vergangenheit liegt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung',
      description: 'Teaser für die Journal-Übersicht + SEO-Beschreibung',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(60).max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-Bild',
      description: 'Optional — zeigt am Anfang des Beitrags und in der Übersicht',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          description: 'Kurze Beschreibung für Screen-Reader + SEO',
          type: 'string',
        }),
      ],
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
          marks: {
            decorators: [
              { title: 'Fett', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
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
                      Rule.uri({ scheme: ['https', 'mailto', 'tel'] }),
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
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Optional — z.B. "Design", "Prozess", "Kunden-Story"',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
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
    select: { title: 'title', media: 'heroImage', date: 'publishedAt' },
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
