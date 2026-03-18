import { groq } from 'next-sanity'

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, author, categories,
    coverImage { asset->{url}, alt },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, author, categories, body,
    coverImage { asset->{url, metadata{lqip}}, alt },
    seo { metaTitle, metaDescription, ogImage { asset->{url} } }
  }
`

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id, title, slug, industry, challenge, publishedAt,
    coverImage { asset->{url}, alt },
    results[]{ metric, value, description }
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, industry, challenge, solution, body,
    coverImage { asset->{url} },
    results[]{ metric, value, description },
    testimonial { quote, name, role },
    seo { metaTitle, metaDescription, ogImage { asset->{url} } }
  }
`

export const allCollateralsQuery = groq`
  *[_type == "marketingCollateral"] | order(publishedAt desc) {
    _id, title, slug, type, description, gated, tags, publishedAt,
    coverImage { asset->{url}, alt }
  }
`

export const featuredServicesQuery = groq`
  *[_type == "service" && featured == true] | order(order asc) {
    _id, title, slug, icon, shortDescription, deliverables
  }
`
