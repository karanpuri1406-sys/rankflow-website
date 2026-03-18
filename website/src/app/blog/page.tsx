import { sanityFetch } from '../../../sanity/lib/client'
import { allBlogPostsQuery } from '../../../sanity/lib/queries'
import Link from 'next/link'

export const metadata = {
  title: 'SEO Blog | RANKFLOW',
  description: 'Expert SEO insights, strategies and case studies for SaaS and tech startups.',
}

export default async function BlogPage() {
  const posts = await sanityFetch(allBlogPostsQuery)

  return (
    <main style={{ background: '#05070E', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22D3EE', marginBottom: '16px' }}>
            SEO INSIGHTS
          </p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', margin: 0 }}>
            The RANKFLOW Blog
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#94A3B8', marginTop: '16px', fontSize: '1.05rem' }}>
            Actionable SEO strategies for SaaS and tech startups.
          </p>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#334155' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem' }}>No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
                >
                  {post.coverImage?.asset?.url && (
                    <img src={post.coverImage.asset.url} alt={post.coverImage.alt || post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '24px' }}>
                    {post.categories?.[0] && (
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#22D3EE' }}>{post.categories[0]}</span>
                    )}
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: 'white', marginTop: '10px', marginBottom: '10px', lineHeight: 1.35 }}>{post.title}</h2>
                    {post.excerpt && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>{post.excerpt}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: '#334155' }}>
                      <span>{post.author}</span>
                      <span>{post.estimatedReadingTime || 5} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
