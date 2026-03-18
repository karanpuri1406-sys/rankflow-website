import { sanityFetch } from '../../../sanity/lib/client'
import { allCollateralsQuery } from '../../../sanity/lib/queries'
import Link from 'next/link'

export const metadata = {
  title: 'Free SEO Resources | RANKFLOW',
  description: 'Free guides, templates, and tools to help you grow organic traffic.',
}

const typeColors: Record<string, string> = {
  Whitepaper: '#818CF8', eBook: '#34D399', Guide: '#22D3EE',
  Template: '#F472B6', Checklist: '#FBBF24', Report: '#FB923C',
  Webinar: '#A78BFA', Infographic: '#67E8F9',
}

export default async function ResourcesPage() {
  const items = await sanityFetch(allCollateralsQuery)

  return (
    <main style={{ background: '#05070E', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22D3EE', marginBottom: '16px' }}>FREE DOWNLOADS</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', margin: 0 }}>
            SEO Resources
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#94A3B8', marginTop: '16px', fontSize: '1.05rem' }}>
            Free guides, templates, and checklists to accelerate your SEO.
          </p>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#334155' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem' }}>Resources coming soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {items.map((item: any) => (
              <Link key={item._id} href={`/resources/${item.slug.current}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
                >
                  {item.coverImage?.asset?.url && (
                    <img src={item.coverImage.asset.url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: typeColors[item.type] || '#22D3EE' }}>{item.type}</span>
                      {item.gated && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#334155', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px' }}>FREE</span>}
                    </div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'white', marginBottom: '10px', lineHeight: 1.35 }}>{item.title}</h2>
                    {item.description && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6 }}>{item.description}</p>}
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
