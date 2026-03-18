import { defineField, defineType } from 'sanity'

export const marketingCollateral = defineType({
  name: 'marketingCollateral',
  title: 'Marketing Collateral',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string',
      options: { list: ['Whitepaper', 'eBook', 'Guide', 'Template', 'Checklist', 'Report', 'Webinar', 'Infographic'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    ]}),
    defineField({ name: 'body', title: 'Body Content', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
    ]}),
    defineField({ name: 'gated', title: 'Gated (requires email)', type: 'boolean', initialValue: true }),
    defineField({ name: 'downloadFile', title: 'Download File URL', type: 'url', description: 'Link to PDF or file' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
      defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
      defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
    ]}),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'coverImage' },
  },
})
