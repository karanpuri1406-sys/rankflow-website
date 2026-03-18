import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'icon', title: 'Icon Name (Lucide)', type: 'string', description: 'e.g. TrendingUp, Search, Brain' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'string', description: 'Used in service cards' }),
    defineField({ name: 'body', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'deliverables', title: 'Deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription' },
  },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
