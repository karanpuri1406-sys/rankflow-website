import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Client / Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'industry', title: 'Industry', type: 'string' }),
    defineField({ name: 'challenge', title: 'Challenge', type: 'text', rows: 3 }),
    defineField({ name: 'solution', title: 'Solution', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'results', title: 'Key Results', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'metric', title: 'Metric', type: 'string' }),
        defineField({ name: 'value', title: 'Value (e.g. +340%)', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'string' }),
      ],
      preview: { select: { title: 'metric', subtitle: 'value' } },
    }]}),
    defineField({ name: 'body', title: 'Full Story', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'testimonial', title: 'Testimonial', type: 'object', fields: [
      defineField({ name: 'quote', title: 'Quote', type: 'text' }),
      defineField({ name: 'name', title: 'Name', type: 'string' }),
      defineField({ name: 'role', title: 'Role / Company', type: 'string' }),
    ]}),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
      defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
      defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
    ]}),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry', media: 'coverImage' },
  },
})
