/* Shape of the Sanity documents this site reads.
   These mirror the projections in sanity/lib/queries.ts — if you change a
   query, change the matching type here. */

export type SanityImage = {
  asset?: { url?: string };
  alt?: string;
};

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
};

export type BlogPostSummary = {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
  coverImage?: SanityImage;
  estimatedReadingTime?: number;
};

export type BlogPost = BlogPostSummary & {
  body?: unknown;
  publishedAt?: string;
  seo?: SanitySeo;
};

export type CaseStudyResult = {
  value: string;
  metric: string;
};

export type CaseStudySummary = {
  _id: string;
  slug: { current: string };
  title: string;
  industry?: string;
  coverImage?: SanityImage;
  results?: CaseStudyResult[];
};

export type ResourceSummary = {
  _id: string;
  slug: { current: string };
  title: string;
  description?: string;
  type: string;
  gated?: boolean;
  coverImage?: SanityImage;
};
