import { sanityFetch, sanityFetchOne } from '../../../../sanity/lib/client'
import { blogPostBySlugQuery, allBlogPostsQuery } from '../../../../sanity/lib/queries'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await sanityFetch(allBlogPostsQuery)
  return posts.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetchOne(blogPostBySlugQuery, { slug })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: { images: post.seo?.ogImage?.asset?.url ? [post.seo.ogImage.asset.url] : [] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetchOne(blogPostBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <main style={{ background: '#05070E', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <Link href="/blog" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#22D3EE', textDecoration: 'none', letterSpacing: '0.1em' }}>
          ← BACK TO BLOG
        </Link>

        {post.categories?.[0] && (
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22D3EE', marginTop: '32px', marginBottom: '16px' }}>
            {post.categories[0]}
          </p>
        )}

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', lineHeight: 1.15, margin: '0 0 24px' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', gap: '24px', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#334155', marginBottom: '40px' }}>
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {post.coverImage?.asset?.url && (
          <img src={post.coverImage.asset.url} alt={post.coverImage.alt || post.title}
            style={{ width: '100%', borderRadius: '12px', marginBottom: '48px', objectFit: 'cover', maxHeight: '460px' }} />
        )}

        <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#CBD5E1', lineHeight: 1.8, fontSize: '1.05rem' }}>
          {post.body && <PortableText value={post.body} />}
        </div>
      </div>
    </main>
  )
}
