import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    ]}),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ]},
    ]}),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'RANKFLOW Team' }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }],
      options: { list: ['SEO Strategy', 'Technical SEO', 'Content SEO', 'Local SEO', 'AI & SEO', 'Case Study', 'SaaS SEO'] }
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', description: 'Max 60 characters' }),
      defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, description: 'Max 160 characters' }),
      defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
      defineField({ name: 'noIndex', title: 'No Index', type: 'boolean', initialValue: false }),
    ]}),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
  },
})
