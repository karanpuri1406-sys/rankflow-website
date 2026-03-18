import { sanityFetch } from '../../../sanity/lib/client'
import { allCaseStudiesQuery } from '../../../sanity/lib/queries'
import Link from 'next/link'

export const metadata = {
  title: 'Case Studies | RANKFLOW',
  description: 'Real SEO results for SaaS and tech startups. See how we deliver measurable growth.',
}

export default async function CaseStudiesPage() {
  const studies = await sanityFetch(allCaseStudiesQuery)

  return (
    <main style={{ background: '#05070E', minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22D3EE', marginBottom: '16px' }}>RESULTS</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', margin: 0 }}>
            Client Case Studies
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#94A3B8', marginTop: '16px', fontSize: '1.05rem' }}>
            Documented results from real client engagements.
          </p>
        </div>

        {studies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#334155' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem' }}>Case studies coming soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {studies.map((study: any) => (
              <Link key={study._id} href={`/case-studies/${study.slug.current}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
                >
                  {study.coverImage?.asset?.url && (
                    <img src={study.coverImage.asset.url} alt={study.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '24px' }}>
                    {study.industry && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#22D3EE' }}>{study.industry}</span>}
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'white', marginTop: '10px', marginBottom: '16px' }}>{study.title}</h2>
                    {study.results?.length > 0 && (
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {study.results.slice(0, 3).map((r: any, i: number) => (
                          <div key={i} style={{ background: 'rgba(34,211,238,0.08)', borderRadius: '8px', padding: '10px 14px' }}>
                            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#22D3EE' }}>{r.value}</div>
                            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>{r.metric}</div>
                          </div>
                        ))}
                      </div>
                    )}
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
