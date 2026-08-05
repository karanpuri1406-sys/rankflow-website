'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Menu, X, Search, Bot,
  CheckCircle2, XCircle, Shield, Eye, MessageCircle,
  Phone, AlertCircle, Quote, MapPin, FileText, Network,
} from 'lucide-react';
import { CONTACT, waLink, formEndpoint } from '@/config';

/* ──────────────────────────────────────────────
   DESIGN TOKENS
   ────────────────────────────────────────────── */
const BG      = '#05070E';
const BG_ALT  = '#070A15';
const CYAN    = '#22D3EE';
const WHITE   = '#FFFFFF';
const BODY    = '#CBD5E1';
const MUTED   = '#64748B';
const BORDER  = 'rgba(255,255,255,0.08)';
const AMBER   = '#FBBF24';
const SYNE    = "'Syne', sans-serif";
const SANS    = "'DM Sans', sans-serif";
const MONO    = "'DM Mono', monospace";

const WRAP   = { maxWidth:'1160px', margin:'0 auto', padding:'0 24px' } as const;
const NARROW = { maxWidth:'760px',  margin:'0 auto', padding:'0 24px' } as const;

const H2 = {
  fontFamily:SYNE, fontWeight:800,
  fontSize:'clamp(1.6rem, 3.2vw, 2.5rem)',
  color:WHITE, lineHeight:1.14, margin:0,
} as const;

const P = {
  fontFamily:SANS, fontWeight:300,
  fontSize:'1.02rem', color:BODY, lineHeight:1.85,
} as const;

const EYEBROW = {
  fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
  textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px',
} as const;

const rise = {
  initial:{ opacity:0, y:26 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true, margin:'-60px' },
  transition:{ duration:0.55, ease:[0.22,1,0.36,1] as [number,number,number,number] },
};

/* ──────────────────────────────────────────────
   LOGO + FLOAT
   ────────────────────────────────────────────── */
function Logo() {
  return (
    <a href="#top" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill={CYAN}/>
        <polyline points="7,26 13,17 19,21 25,13 29,8"
          stroke={BG} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="29" cy="8" r="2.8" fill={BG}/>
      </svg>
      <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.12rem', letterSpacing:'0.06em', color:WHITE }}>
        RANKFLOW
      </span>
    </a>
  );
}

function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with Rankflow on WhatsApp"
      style={{
        position:'fixed', right:'20px', bottom:'20px', zIndex:60,
        display:'flex', alignItems:'center', gap:'10px',
        background:'#25D366', color:'#062314',
        padding:'13px 18px', borderRadius:'999px',
        fontFamily:SANS, fontWeight:700, fontSize:'0.9rem',
        textDecoration:'none', boxShadow:'0 8px 30px rgba(37,211,102,0.4)',
      }}>
      <MessageCircle size={19} strokeWidth={2.2}/>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}

/* ──────────────────────────────────────────────
   NAV
   ────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label:'What changed', href:'#problem' },
    { label:'How it works', href:'#how'     },
    { label:'Pricing',      href:'#offer'   },
    { label:'Questions',    href:'#faq'     },
  ];

  return (
    <motion.nav
      initial={{ y:-70, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        transition:'background 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(5,7,14,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
      }}>
      <div style={{ ...WRAP, height:'70px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Logo />
        <div className="hidden md:flex" style={{ alignItems:'center', gap:'2px' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily:SANS, fontSize:'0.88rem', color:'#94A3B8',
                padding:'8px 14px', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex" style={{ alignItems:'center', gap:'10px' }}>
          {CONTACT.phoneE164 && (
            <a href={`tel:${CONTACT.phoneE164}`}
              style={{ display:'inline-flex', alignItems:'center', gap:'7px',
                fontFamily:SANS, fontWeight:600, fontSize:'0.84rem', color:WHITE,
                padding:'9px 14px', borderRadius:'8px', textDecoration:'none',
                border:`1px solid ${BORDER}` }}>
              <Phone size={14}/> {CONTACT.phoneDisplay}
            </a>
          )}
          <a href="#check"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:SANS, fontWeight:600, fontSize:'0.86rem',
              background:CYAN, color:BG, padding:'10px 20px', borderRadius:'8px',
              textDecoration:'none', transition:'all 0.25s' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(34,211,238,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}>
            Free AI check <ArrowRight size={15}/>
          </a>
        </div>
        <button className="md:hidden" aria-label="Toggle menu"
          style={{ background:'none', border:'none', color:'#94A3B8', cursor:'pointer', padding:'4px' }}
          onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            style={{ overflow:'hidden', background:'rgba(5,7,14,0.98)', borderTop:`1px solid ${BORDER}` }}>
            <div style={{ padding:'12px 24px 24px', display:'flex', flexDirection:'column', gap:'4px' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontFamily:SANS, color:'#94A3B8', padding:'13px 0',
                    borderBottom:`1px solid ${BORDER}`, textDecoration:'none', fontSize:'0.95rem' }}>
                  {l.label}
                </a>
              ))}
              {CONTACT.phoneE164 && (
                <a href={`tel:${CONTACT.phoneE164}`}
                  style={{ marginTop:'14px', border:`1px solid ${BORDER}`, color:WHITE, padding:'13px',
                    textAlign:'center', borderRadius:'8px', fontFamily:SANS, fontWeight:600, textDecoration:'none' }}>
                  Call {CONTACT.phoneDisplay}
                </a>
              )}
              <a href="#check" onClick={() => setOpen(false)}
                style={{ marginTop:'8px', background:CYAN, color:BG, padding:'13px',
                  textAlign:'center', borderRadius:'8px', fontFamily:SANS, fontWeight:700, textDecoration:'none' }}>
                Get a free AI check
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────
   A1 · THE LEAD
   ────────────────────────────────────────────── */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (wide && !still) { el.src = '/hero.mp4'; el.play().catch(() => {}); }
  }, []);

  return (
    <section id="top" style={{ position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', overflow:'hidden', background:BG }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <video ref={videoRef} loop muted playsInline preload="none"
          poster="/hero-mobile.jpg" aria-hidden="true"
          style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(5,7,14,0.86) 0%, rgba(5,7,14,0.55) 38%, rgba(5,7,14,0.5) 62%, rgba(5,7,14,0.97) 100%)' }}/>
        <div style={{ position:'absolute', inset:0,
          background:'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 42%, rgba(5,7,14,0.65) 100%)' }}/>
      </div>

      <div style={{ position:'relative', zIndex:10, flex:1,
        display:'flex', flexDirection:'column', justifyContent:'center',
        ...WRAP, padding:'128px 24px 0', width:'100%' }}>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
          <span className="animate-pulse" style={{ width:'7px', height:'7px', borderRadius:'50%',
            background:CYAN, display:'block', flexShrink:0 }}/>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN }}>
            AI Search Optimisation · Working with businesses across India
          </span>
        </motion.div>

        <div style={{ marginBottom:'26px', maxWidth:'1000px' }}>
          {['AI is answering', 'your customer’s question.'].map((text, i) => (
            <div key={text} style={{ overflow:'hidden' }}>
              <motion.span
                initial={{ y:90, opacity:0 }} animate={{ y:0, opacity:1 }}
                transition={{ delay:0.3 + i*0.13, duration:0.75, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SYNE, fontWeight:800,
                  fontSize:'clamp(2.1rem, 4.8vw, 4.1rem)', lineHeight:1.06,
                  color:WHITE, textShadow:'0 2px 24px rgba(0,0,0,0.75)', display:'block' }}>
                {text}
              </motion.span>
            </div>
          ))}
          <div style={{ overflow:'hidden' }}>
            <motion.span
              initial={{ y:90, opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ delay:0.56, duration:0.75, ease:[0.22,1,0.36,1] }}
              style={{ fontFamily:SYNE, fontWeight:800,
                fontSize:'clamp(2.1rem, 4.8vw, 4.1rem)', lineHeight:1.06,
                color:CYAN, textShadow:'0 2px 24px rgba(0,0,0,0.75)', display:'block' }}>
              It isn&apos;t naming you.
            </motion.span>
          </div>
        </div>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.78 }}
          style={{ ...P, fontSize:'clamp(1rem, 1.7vw, 1.16rem)', color:'#E2E8F0',
            maxWidth:'640px', marginBottom:'38px', textShadow:'0 1px 14px rgba(0,0,0,0.6)' }}>
          When someone asks ChatGPT, Perplexity or Google&apos;s AI for a recommendation in
          your category, a handful of companies get named. We do the work that decides
          whether you are one of them —{' '}
          <span style={{ color:WHITE, fontWeight:500 }}>and we&apos;ll show you where you
          stand today, free.</span>
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.92 }}
          style={{ display:'flex', flexWrap:'wrap', gap:'14px', marginBottom:'48px' }}>
          <a href="#check"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'16px 30px', borderRadius:'9px', background:CYAN, color:BG,
              fontFamily:SANS, fontWeight:700, fontSize:'0.96rem', textDecoration:'none',
              transition:'all 0.25s' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 44px rgba(34,211,238,0.45)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}>
            See if AI mentions you <ArrowRight size={16}/>
          </a>
          <a href="#problem"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'16px 30px', borderRadius:'9px',
              border:'1px solid rgba(255,255,255,0.24)', color:WHITE,
              background:'rgba(255,255,255,0.07)',
              fontFamily:SANS, fontWeight:500, fontSize:'0.96rem', textDecoration:'none' }}>
            What changed <ChevronDown size={16}/>
          </a>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05 }}
          style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'12px 26px',
            borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'26px', maxWidth:'860px' }}>
          {['Free check, no call required','Prices published below','Month to month, nothing locked in'].map((t,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <CheckCircle2 size={14} color={CYAN} strokeWidth={2.2} style={{ flexShrink:0 }}/>
              <span style={{ fontFamily:SANS, fontWeight:500, fontSize:'0.85rem', color:'#E2E8F0' }}>{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A2 · THE PROBLEM
   ────────────────────────────────────────────── */
function Problem() {
  return (
    <section id="problem" style={{ background:BG_ALT, padding:'110px 0', borderTop:`1px solid ${BORDER}` }}>
      <div style={NARROW}>
        <motion.div {...rise}>
          <span style={EYEBROW}>What changed</span>
          <h2 style={H2}>
            Your rankings held.{' '}
            <span style={{ color:CYAN }}>Your clicks didn&apos;t.</span>
          </h2>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'30px', display:'flex', flexDirection:'column', gap:'22px' }}>
          <p style={P}>
            Something odd has been happening in analytics. Positions look roughly the same.
            Impressions may even be up. But the clicks are thinner, the enquiries are fewer,
            and nobody can quite explain where the traffic went.
          </p>
          <p style={P}>
            It went to the answer. Google now writes a summary at the top of the results and
            most people never scroll past it. Meanwhile a growing share of buyers skip search
            altogether and ask ChatGPT, Perplexity or Gemini directly:{' '}
            <span style={{ color:'#E2E8F0' }}>&ldquo;who are the best companies for this in
            India?&rdquo;</span> They get three or four names and a short reason for each.
            The rest of the industry does not exist in that conversation.
          </p>
          <p style={P}>
            If your agency is still reporting keyword positions, they are measuring a race
            that fewer people are watching. Ranking on page one matters less every quarter
            if the answer arrives before anyone reaches page one.
          </p>
        </motion.div>

        <motion.div {...rise}
          style={{ marginTop:'40px', background:BG, border:`1px solid rgba(251,191,36,0.28)`,
            borderLeft:`3px solid ${AMBER}`, borderRadius:'12px', padding:'30px 30px 30px 32px' }}>
          <span style={{ ...EYEBROW, color:AMBER, marginBottom:'12px' }}>The part that catches people out</span>
          <p style={{ ...P, margin:0, color:'#E2E8F0' }}>
            Search engines rank pages. AI engines{' '}
            <span style={{ color:WHITE, fontWeight:500 }}>cite sources</span>. Those are not
            the same job. A page can rank perfectly well and still be unusable to a model
            that needs a clear, attributable, well-structured statement it can quote with
            confidence. Most sites were never built to be quoted — so they aren&apos;t.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A3 · THE TURNING POINT
   ────────────────────────────────────────────── */
function Turning() {
  return (
    <section style={{ background:BG, padding:'110px 0' }}>
      <div style={NARROW}>
        <motion.div {...rise}>
          <span style={EYEBROW}>Why this is good news</span>
          <h2 style={H2}>
            Nobody has a ten-year head start{' '}
            <span style={{ color:CYAN }}>in a two-year-old game.</span>
          </h2>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'30px', display:'flex', flexDirection:'column', gap:'22px' }}>
          <p style={P}>
            Classic SEO rewards age and accumulated authority. A competitor who started in
            2014 with thousands of backlinks is genuinely hard to displace, and no amount of
            effort compresses that gap quickly.
          </p>
          <p style={P}>
            AI citation does not work that way. Models favour sources that answer a specific
            question cleanly, state facts in an attributable form, and are consistent about
            what the company actually is and does. Those are things a well-run business can
            fix in a quarter, regardless of when it was founded.
          </p>
          <p style={{ ...P, color:'#E2E8F0' }}>
            <span style={{ color:WHITE, fontWeight:500 }}>This is the rarest thing in
            search: a reset.</span> The incumbents in your category are mostly not working on
            this yet. The window closes as they notice.
          </p>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'44px', display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1px',
          background:BORDER, borderRadius:'14px', overflow:'hidden' }}>
          {[
            { icon:XCircle, c:'#F87171', t:'What most sites look like to AI',
              l:['Claims with no source or date','Key facts buried inside long prose','Inconsistent description of the company','No structured data to read'] },
            { icon:CheckCircle2, c:'#4ADE80', t:'What gets cited instead',
              l:['Direct answers, stated plainly','Facts attributed and dated','One consistent entity across the web','Machine-readable structure throughout'] },
          ].map((col, i) => (
            <div key={i} style={{ background:BG_ALT, padding:'30px 28px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'18px' }}>
                <col.icon size={17} color={col.c} strokeWidth={2}/>
                <span style={{ fontFamily:SYNE, fontWeight:700, fontSize:'0.98rem', color:WHITE }}>{col.t}</span>
              </div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'11px' }}>
                {col.l.map((x,j) => (
                  <li key={j} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                    <span style={{ color:col.c, marginTop:'7px', fontSize:'0.45rem', flexShrink:0 }}>●</span>
                    <span style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.9rem', color:BODY, lineHeight:1.65 }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A4 · THE MECHANISM
   ────────────────────────────────────────────── */
function Mechanism() {
  const steps = [
    { n:'01', Icon:Bot, t:'We ask the AI engines about you',
      d:'The real questions your buyers ask, run through ChatGPT, Perplexity and Google’s AI answers. We record who gets named, who gets cited, and where you appear — if you appear at all.' },
    { n:'02', Icon:Network, t:'We make your business legible to a model',
      d:'One consistent description of what you are, structured data throughout, entity clarity across the sites AI engines already trust. This is the groundwork that decides whether a model can use you at all.' },
    { n:'03', Icon:FileText, t:'We write pages built to be quoted',
      d:'Direct answers near the top, facts stated in an attributable form, sources and dates on the claims. Written for people first — but structured so a model can lift a passage without ambiguity.' },
    { n:'04', Icon:Search, t:'We keep the classic foundations working',
      d:'Technical SEO, site speed, internal linking, and Google Business Profile where location matters. AI citation sits on top of ordinary SEO health; it does not replace it.' },
  ];

  return (
    <section id="how" style={{ background:BG_ALT, padding:'110px 0' }}>
      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'720px', marginBottom:'54px' }}>
          <span style={EYEBROW}>How it works</span>
          <h2 style={H2}>
            Optimised to be cited,{' '}
            <span style={{ color:CYAN }}>not just ranked.</span>
          </h2>
          <p style={{ ...P, marginTop:'18px' }}>
            There is no trick here and nothing proprietary to hide behind. AI engines cite
            sources they can parse, verify and attribute. Most of this work is making a
            business unambiguous to a machine — and it happens to make the site clearer for
            people at the same time.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px, 1fr))', gap:'2px',
          background:BORDER, borderRadius:'16px', overflow:'hidden' }}>
          {steps.map((s, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.09 }}
              style={{ background:BG, padding:'34px 28px', position:'relative' }}>
              <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'3.4rem',
                color:'rgba(255,255,255,0.03)', position:'absolute', top:'14px', right:'18px',
                lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{s.n}</span>
              <div style={{ width:'40px', height:'40px', borderRadius:'10px', marginBottom:'18px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(34,211,238,0.09)', border:'1px solid rgba(34,211,238,0.22)' }}>
                <s.Icon size={18} color={CYAN} strokeWidth={1.7}/>
              </div>
              <h3 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.02rem',
                color:WHITE, marginBottom:'10px', lineHeight:1.35 }}>{s.t}</h3>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.87rem',
                color:BODY, lineHeight:1.75, margin:0 }}>{s.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise}
          style={{ marginTop:'22px', display:'flex', alignItems:'flex-start', gap:'13px',
            background:BG, border:`1px solid ${BORDER}`, borderRadius:'13px', padding:'24px 26px',
            maxWidth:'820px' }}>
          <MapPin size={19} color={CYAN} strokeWidth={1.7} style={{ flexShrink:0, marginTop:'3px' }}/>
          <p style={{ ...P, fontSize:'0.92rem', margin:0 }}>
            <span style={{ color:WHITE, fontWeight:500 }}>Serving a city rather than a country?</span>{' '}
            Local SEO and Google Business Profile work is included in every plan, not sold
            separately. AI assistants increasingly answer &ldquo;near me&rdquo; questions
            from exactly the same local signals — so the two jobs overlap more than most
            agencies admit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A5 · PROOF
   ────────────────────────────────────────────── */
function Proof() {
  const work = [
    { c:'A consulting firm', r:'Client · SEO and content, 2026', a:CYAN,
      p:['Their contact form had been silently discarding every enquiry. We found it, fixed it, and it produced a real enquiry within weeks.',
         'Their sitemap pointed at the wrong domain and listed 4 pages out of roughly 30.',
         'Published 7 in-depth guides and built 6 pages of interactive tools.'] },
    { c:'A risk advisory firm', r:'Client · Website and content, 2026', a:'#4ADE80',
      p:['Built an interactive diagnostic — 16 questions across 4 scored dimensions.',
         'Launched an insights blog and published 8 in-depth articles.',
         'Set up analytics tracking 11 specific actions, so enquiries are measured rather than guessed at.'] },
    { c:'BelWo', r:'In-house · Marketing Specialist, 2022–2026', a:'#A78BFA',
      p:['Three and a half years running marketing for a US customer-communications firm.',
         'Content, newsletters, LinkedIn, events and lead tracking.',
         'Built the marketing strategy the leadership team worked from.'] },
    { c:'Lawgic', r:'Founder-led venture · Law entrance coaching', a:'#FB923C',
      p:['Built the SEO, directory presence and lead system from nothing.',
         'Listed across directories including UrbanPro, Brownbook and Justdial.',
         'Every method we recommend here was run on our own business first.'] },
  ];

  return (
    <section style={{ background:BG, padding:'110px 0' }}>
      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'720px', marginBottom:'20px' }}>
          <span style={EYEBROW}>Can you trust us with this</span>
          <h2 style={H2}>
            Rankflow is new.{' '}
            <span style={{ color:CYAN }}>The work behind it isn&apos;t.</span>
          </h2>
        </motion.div>

        <motion.div {...rise}
          style={{ maxWidth:'720px', marginBottom:'46px', display:'flex', gap:'14px',
            background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'12px', padding:'24px 26px' }}>
          <Quote size={20} color={MUTED} strokeWidth={1.6} style={{ flexShrink:0, marginTop:'3px' }}/>
          <p style={{ ...P, fontSize:'0.96rem', margin:0 }}>
            You will not find star ratings, client counts or glowing quotes on this page.
            Rankflow launched in 2026 and has not earned them yet — so we have not invented
            any. What we can show you is the work behind it, and a first engagement
            structured so that you hold the evidence, not us.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(310px, 1fr))', gap:'16px' }}>
          {work.map((w, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.08 }}
              className="card-hover"
              style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'14px', padding:'30px 26px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'5px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:w.a, flexShrink:0 }}/>
                <span style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.06rem', color:WHITE }}>{w.c}</span>
              </div>
              <div style={{ fontFamily:MONO, fontSize:'0.64rem', color:MUTED,
                letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'16px' }}>{w.r}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}>
                {w.p.map((x,j) => (
                  <li key={j} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                    <span style={{ color:w.a, marginTop:'7px', fontSize:'0.45rem', flexShrink:0 }}>◆</span>
                    <span style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.86rem', color:BODY, lineHeight:1.7 }}>{x}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p {...rise} style={{ ...P, fontSize:'0.9rem', color:MUTED, marginTop:'26px', maxWidth:'680px' }}>
          Rankflow was founded by Karan Puri and works remotely with businesses across
          India. Client names available on request — ask, and we will walk you through
          any of this in detail.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A6 · THE OFFER
   ────────────────────────────────────────────── */
function Offer() {
  const audit = [
    { Icon:Bot,     t:'Your category, asked across three AI engines', o:'ChatGPT, Perplexity and Google’s AI answers — the actual questions your buyers ask, not invented ones.' },
    { Icon:Eye,     t:'Who gets named instead of you',                o:'The competitors AI currently recommends in your space, and the source it pulled each one from.' },
    { Icon:Network, t:'Why they are cited and you are not',           o:'The specific structural gaps on your site that make you unusable to a model.' },
    { Icon:FileText,t:'A prioritised fix list',                       o:'What to change, in order of impact. Yours to keep and hand to any agency, including one that is not us.' },
  ];

  return (
    <section id="offer" style={{ background:BG_ALT, padding:'110px 0' }}>
      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'720px', marginBottom:'46px' }}>
          <span style={EYEBROW}>Where to start</span>
          <h2 style={H2}>The AI Visibility Audit</h2>
          <p style={{ ...P, marginTop:'18px' }}>
            Before anyone commits to a retainer, it is worth knowing whether AI engines
            mention you at all. This is a one-off piece of work with a fixed price and no
            obligation attached to it.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'16px', marginBottom:'44px' }}>
          {audit.map((x, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.06 }}
              style={{ background:BG, border:`1px solid ${BORDER}`, borderRadius:'13px', padding:'26px 24px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'13px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'9px', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(34,211,238,0.09)', border:'1px solid rgba(34,211,238,0.2)' }}>
                  <x.Icon size={16} color={CYAN} strokeWidth={1.7}/>
                </div>
                <div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'0.96rem',
                    color:WHITE, marginBottom:'7px', lineHeight:1.4 }}>{x.t}</h3>
                  <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.85rem',
                    color:BODY, lineHeight:1.7, margin:0 }}>{x.o}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise}
          style={{ background:BG, border:`1px solid ${CYAN}38`, borderRadius:'18px',
            padding:'44px 36px', textAlign:'center', maxWidth:'720px', margin:'0 auto',
            boxShadow:'0 0 70px rgba(34,211,238,0.07)' }}>
          <p style={{ ...P, fontSize:'0.96rem', maxWidth:'540px', margin:'0 auto 26px' }}>
            Most agencies will not quote you without a discovery call and a proposal.
            This is a fixed price for a finished document, delivered in a week.
          </p>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:'10px', marginBottom:'8px' }}>
            <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'3.1rem', color:CYAN, lineHeight:1 }}>₹9,000</span>
            <span style={{ fontFamily:SANS, fontSize:'0.92rem', color:MUTED }}>one time</span>
          </div>
          <p style={{ fontFamily:SANS, fontSize:'0.86rem', color:MUTED, marginBottom:'28px' }}>
            No retainer. No contract. Nothing renews.
          </p>
          <a href="#check"
            style={{ display:'inline-flex', alignItems:'center', gap:'9px',
              padding:'16px 34px', borderRadius:'10px', background:CYAN, color:BG,
              fontFamily:SANS, fontWeight:700, fontSize:'0.98rem', textDecoration:'none',
              transition:'all 0.25s' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 38px rgba(34,211,238,0.42)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}>
            Start with the free check <ArrowRight size={17}/>
          </a>
          <p style={{ fontFamily:SANS, fontSize:'0.8rem', color:MUTED, margin:'16px 0 0' }}>
            The free check comes first and shows you one question&apos;s worth of results.
            You only pay if you want the full audit.
          </p>
        </motion.div>

        {/* Retainers */}
        <motion.div {...rise} style={{ maxWidth:'860px', margin:'54px auto 0' }}>
          <p style={{ ...P, fontSize:'0.94rem', color:MUTED, textAlign:'center', marginBottom:'20px' }}>
            If you want the work done rather than just diagnosed, these are the monthly
            options. The audit fee is credited against your first month.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'16px' }}>
            {[
              { n:'Foundation', p:'₹18,000', d:'Entity and structured-data groundwork, technical SEO, Google Business Profile where relevant, 2 citable articles a month, monthly AI visibility tracking.', h:false },
              { n:'Growth', p:'₹35,000', d:'Everything in Foundation plus 4 articles a month, competitor citation tracking, landing pages, and fortnightly calls.', h:true },
              { n:'Scale', p:'₹65,000', d:'Everything in Growth plus 8 articles, digital PR aimed at the sources AI engines trust, and weekly reporting.', h:false },
            ].map((t,i) => (
              <div key={i} style={{ background:BG, position:'relative',
                border: t.h ? `1px solid ${CYAN}40` : `1px solid ${BORDER}`,
                borderRadius:'14px', padding:'28px 24px',
                boxShadow: t.h ? '0 0 50px rgba(34,211,238,0.07)' : 'none' }}>
                {t.h && (
                  <div style={{ position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)' }}>
                    <span style={{ background:CYAN, color:BG, fontFamily:SYNE, fontWeight:700,
                      fontSize:'0.66rem', padding:'4px 14px', borderRadius:'20px', whiteSpace:'nowrap' }}>
                      Most chosen
                    </span>
                  </div>
                )}
                <div style={{ fontFamily:MONO, fontSize:'0.62rem', letterSpacing:'0.18em',
                  textTransform:'uppercase', color: t.h ? CYAN : MUTED, marginBottom:'9px' }}>{t.n}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'5px', marginBottom:'12px' }}>
                  <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.7rem',
                    color: t.h ? CYAN : WHITE }}>{t.p}</span>
                  <span style={{ fontFamily:SANS, fontSize:'0.78rem', color:MUTED }}>/month</span>
                </div>
                <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.84rem', color:BODY, lineHeight:1.72, margin:0 }}>{t.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:SANS, fontSize:'0.8rem', color:MUTED, textAlign:'center', marginTop:'18px' }}>
            Month to month, cancel any time, every account in your name. Ad spend, if you
            ever run ads, is paid by you directly to the platform — we never touch it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A7 · OBJECTIONS + FAQ
   ────────────────────────────────────────────── */
function Objections() {
  const loud = [
    {
      q:'“Is this real, or is it SEO people rebranding to sound current?”',
      a:'A fair suspicion, and the industry has earned it. Here is the test: the free check shows you actual AI answers for your category, with names in them. Either your competitors are being recommended and you are not, or they aren’t and you can ignore all of this. We would rather you looked at the evidence than took our word for it.',
    },
    {
      q:'“Nobody in my industry is asking ChatGPT for recommendations yet.”',
      a:'In some categories that is still true, and where it is true we will tell you so and point you at ordinary SEO instead. But the free check answers this for your specific category in a couple of days rather than leaving it to opinion. If the answer is no, that is a useful thing to know cheaply.',
    },
    {
      q:'“We already have an SEO agency.”',
      a:'Then keep them. This is a different job and it is often complementary — most of what we do is structural and does not conflict with a content or link programme. If it turns out your existing agency already covers this, we will say so rather than sell you a duplicate.',
    },
    {
      q:'“You have no reviews and no case studies in this.”',
      a:'True, and we are not going to dress it up. Rankflow launched in 2026. What we can offer instead is a ₹9,000 first step rather than a retainer, no contract, everything registered in your name, and a refund term below that puts the risk on us rather than you.',
    },
  ];

  const faq = [
    { q:'Do you work outside Chandigarh?',
      a:'Yes. This work is done remotely and we work with businesses anywhere in India. Where a client needs local visibility in their own city, Google Business Profile work is included in the plan.' },
    { q:'How long before anything changes?',
      a:'Structural fixes land in the first few weeks. AI citation moves more slowly than rankings did, typically over one to three months, because models refresh on their own schedule. Anyone promising faster is guessing.' },
    { q:'Can you guarantee ChatGPT will recommend us?',
      a:'No. Nobody controls what a model outputs, and any agency claiming otherwise is selling something they cannot deliver. What we control is whether your business is findable, parseable and attributable — which is the part that is actually within reach.' },
    { q:'What if we have no website worth optimising?',
      a:'Then say so on the check and we will tell you honestly whether to fix the site first. Sometimes the right advice is to spend the money elsewhere before spending it here.' },
    { q:'Who owns the accounts and the work?',
      a:'You do. Analytics, Search Console, Google Business Profile, the content — all in your name, and yours to take with you if you leave.' },
    { q:'Is there a minimum commitment?',
      a:'No. The audit is one-off. The monthly plans are month to month and can be cancelled whenever you like.' },
  ];

  return (
    <section id="faq" style={{ background:BG, padding:'110px 0' }}>
      <div style={NARROW}>
        <motion.div {...rise} style={{ marginBottom:'44px' }}>
          <span style={EYEBROW}>What you&apos;re probably thinking</span>
          <h2 style={H2}>
            The objections{' '}
            <span style={{ color:CYAN }}>worth taking seriously.</span>
          </h2>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'58px' }}>
          {loud.map((o, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.07 }}
              style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'13px', padding:'28px' }}>
              <h3 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.03rem',
                color:WHITE, marginBottom:'12px', lineHeight:1.5 }}>{o.q}</h3>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.93rem',
                color:BODY, lineHeight:1.82, margin:0 }}>{o.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise} style={{ marginBottom:'28px' }}>
          <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.3rem', color:WHITE, margin:0 }}>
            Straight answers
          </h3>
        </motion.div>

        <div style={{ display:'grid', gap:'1px', background:BORDER, borderRadius:'13px', overflow:'hidden' }}>
          {faq.map((f, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.05 }}
              style={{ background:BG_ALT, padding:'24px 26px' }}>
              <h4 style={{ fontFamily:SANS, fontWeight:600, fontSize:'0.94rem', color:WHITE, marginBottom:'8px' }}>{f.q}</h4>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.89rem',
                color:BODY, lineHeight:1.78, margin:0 }}>{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A8 · THE GUARANTEE
   ────────────────────────────────────────────── */
function Guarantee() {
  return (
    <section style={{ background:BG_ALT, padding:'100px 0' }}>
      <div style={NARROW}>
        <motion.div {...rise}
          style={{ background:BG, border:`1px solid rgba(74,222,128,0.3)`,
            borderRadius:'18px', padding:'44px 38px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'42px', height:'42px', borderRadius:'11px',
              display:'flex', alignItems:'center', justifyContent:'center',
              background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.28)' }}>
              <Shield size={19} color="#4ADE80" strokeWidth={1.8}/>
            </div>
            <h2 style={{ ...H2, fontSize:'clamp(1.4rem, 2.6vw, 2rem)' }}>
              Our terms on the audit
            </h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            <p style={{ ...P, margin:0 }}>
              The audit is a finished document, delivered within seven days, covering your
              category across three AI engines with a prioritised list of what to fix.
            </p>
            <p style={{ ...P, margin:0, color:'#E2E8F0' }}>
              <span style={{ color:WHITE, fontWeight:600 }}>Read it, and if it does not tell
              you something you did not already know about your own visibility, ask and we
              will refund the ₹9,000 in full.</span> You keep the document either way.
            </p>
            <p style={{ ...P, margin:0, fontSize:'0.94rem', color:MUTED }}>
              We can offer that because almost nobody has looked at their business this way
              yet. If you are the exception, you should not be paying us to confirm what you
              already knew.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A9 · THE CLOSE + CAPTURE
   ────────────────────────────────────────────── */
type Status = 'idle' | 'sending' | 'sent' | 'error';

function Close() {
  const [form, setForm] = useState({ name:'', phone:'', business:'', message:'' });
  const [status, setStatus] = useState<Status>('idle');
  const endpoint = formEndpoint();

  const inputStyle = {
    width:'100%', padding:'13px 16px',
    background:'rgba(255,255,255,0.04)', border:`1px solid ${BORDER}`,
    borderRadius:'8px', color:WHITE,
    fontFamily:SANS, fontSize:'0.9rem', outline:'none',
    transition:'border-color 0.25s', boxSizing:'border-box' as const,
  };
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = `${CYAN}55`);
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = BORDER);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) return;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone,
          business: form.business, message: form.message,
          _subject: `New Rankflow enquiry — ${form.name || 'unnamed'}`,
        }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('sent');
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  }

  return (
    <section id="check" style={{ background:BG, padding:'110px 0 100px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:'12%', right:'12%', height:'1px',
        background:`linear-gradient(90deg, transparent, ${CYAN}45, transparent)` }}/>

      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'740px', margin:'0 auto 54px', textAlign:'center' }}>
          <span style={{ ...EYEBROW, textAlign:'center' }}>Start here</span>
          <h2 style={H2}>
            Find out what AI says about you{' '}
            <span style={{ color:CYAN }}>before you spend anything.</span>
          </h2>
          <p style={{ ...P, marginTop:'20px' }}>
            Tell us your company and what you do. We will run one real buying question for
            your category through ChatGPT, Perplexity and Google&apos;s AI answers, and send
            you what came back — who got named, who got cited, and whether you appeared.
            Free, no call, and yours to act on however you like.
          </p>
          <p style={{ ...P, marginTop:'18px', color:'#E2E8F0' }}>
            Right now a model somewhere is answering that question for a buyer.{' '}
            <span style={{ color:WHITE, fontWeight:500 }}>It is naming somebody. The only
            question is who.</span>
          </p>
        </motion.div>

        <div style={{ display:'grid', gap:'46px', alignItems:'start' }} className="grid-cols-1 lg:grid-cols-2">
          <motion.div {...rise}>
            <div style={{ display:'flex', flexDirection:'column', gap:'13px', marginBottom:'30px' }}>
              {[
                'The AI answer for your category, verbatim',
                'Which competitors are being named',
                'Whether you appear anywhere in it',
                'The first thing to fix if you don’t',
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <CheckCircle2 size={16} color={CYAN} strokeWidth={2} style={{ marginTop:'2px', flexShrink:0 }}/>
                  <span style={{ fontFamily:SANS, fontSize:'0.92rem', color:BODY }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'12px' }}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'9px',
                  background:'#25D366', color:'#062314', padding:'13px 22px', borderRadius:'9px',
                  fontFamily:SANS, fontWeight:700, fontSize:'0.9rem', textDecoration:'none' }}>
                <MessageCircle size={17}/> WhatsApp instead
              </a>
              {CONTACT.phoneE164 && (
                <a href={`tel:${CONTACT.phoneE164}`}
                  style={{ display:'inline-flex', alignItems:'center', gap:'9px',
                    border:`1px solid ${BORDER}`, color:WHITE, padding:'13px 22px', borderRadius:'9px',
                    fontFamily:SANS, fontWeight:600, fontSize:'0.9rem', textDecoration:'none' }}>
                  <Phone size={16}/> {CONTACT.phoneDisplay}
                </a>
              )}
            </div>
          </motion.div>

          <motion.div {...rise} transition={{ ...rise.transition, delay:0.1 }}>
            <div style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'16px', padding:'36px' }}>
              {!endpoint ? (
                <div style={{ textAlign:'center', padding:'18px 0' }}>
                  <div style={{ width:'50px', height:'50px', borderRadius:'12px', margin:'0 auto 18px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.25)' }}>
                    <AlertCircle size={24} color="#FB923C" strokeWidth={1.6}/>
                  </div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.2rem', color:WHITE, marginBottom:'10px' }}>
                    Message us directly
                  </h3>
                  <p style={{ ...P, fontSize:'0.9rem', marginBottom:'22px' }}>
                    WhatsApp is the quickest way to reach us.
                  </p>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:'9px',
                      background:'#25D366', color:'#062314', padding:'14px 26px', borderRadius:'9px',
                      fontFamily:SANS, fontWeight:700, fontSize:'0.94rem', textDecoration:'none' }}>
                    <MessageCircle size={18}/> Open WhatsApp
                  </a>
                </div>
              ) : status === 'sent' ? (
                <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                  style={{ padding:'34px 0', textAlign:'center' }}>
                  <div style={{ width:'54px', height:'54px', borderRadius:'12px', margin:'0 auto 20px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(34,211,238,0.08)', border:`1px solid ${CYAN}30` }}>
                    <CheckCircle2 size={27} color={CYAN} strokeWidth={1.5}/>
                  </div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.4rem', color:WHITE, marginBottom:'11px' }}>
                    Got it — thank you.
                  </h3>
                  <p style={{ ...P, fontSize:'0.92rem', margin:0 }}>
                    Your AI check will be with you within two working days.
                    If it is urgent, WhatsApp is faster.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                    {[
                      { label:'Name',  key:'name',  type:'text', ph:'Your name' },
                      { label:'Phone', key:'phone', type:'tel',  ph:'98765 43210' },
                    ].map(f => (
                      <div key={f.key}>
                        <label htmlFor={f.key} style={{ fontFamily:MONO, fontSize:'0.6rem', color:MUTED,
                          letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                          {f.label}
                        </label>
                        <input id={f.key} name={f.key} type={f.type} required placeholder={f.ph}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={inputStyle} onFocus={focus} onBlur={blur}/>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="business" style={{ fontFamily:MONO, fontSize:'0.6rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      Company and what you do
                    </label>
                    <input id="business" name="business" type="text" required
                      placeholder="e.g. Acme Legal, corporate law, Pune"
                      value={form.business}
                      onChange={e => setForm({ ...form, business:e.target.value })}
                      style={inputStyle} onFocus={focus} onBlur={blur}/>
                    <p style={{ fontFamily:SANS, fontSize:'0.73rem', color:MUTED, marginTop:'7px' }}>
                      Anywhere in India. The more specific your category, the sharper the check.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="message" style={{ fontFamily:MONO, fontSize:'0.6rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      A question your buyers ask <span style={{ textTransform:'none' }}>(optional)</span>
                    </label>
                    <textarea id="message" name="message" rows={3}
                      placeholder="e.g. “best corporate law firms in Pune for startups”"
                      value={form.message} onChange={e => setForm({ ...form, message:e.target.value })}
                      style={{ ...inputStyle, resize:'none' }} onFocus={focus} onBlur={blur}/>
                  </div>

                  {status === 'error' && (
                    <div style={{ display:'flex', alignItems:'flex-start', gap:'10px',
                      background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.3)',
                      borderRadius:'8px', padding:'13px 15px' }}>
                      <AlertCircle size={17} color="#F87171" style={{ marginTop:'1px', flexShrink:0 }}/>
                      <span style={{ fontFamily:SANS, fontSize:'0.84rem', color:'#FCA5A5', lineHeight:1.6 }}>
                        That didn&apos;t send.{' '}
                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                          style={{ color:'#FCA5A5', textDecoration:'underline' }}>Message us on WhatsApp</a>{' '}
                        and we will pick it up straight away.
                      </span>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                      padding:'15px', borderRadius:'9px', background:CYAN, color:BG,
                      fontFamily:SANS, fontWeight:700, fontSize:'0.95rem',
                      border:'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1, transition:'all 0.25s' }}>
                    {status === 'sending' ? 'Sending…' : 'Get my free AI check'}
                    {status !== 'sending' && <ArrowRight size={16}/>}
                  </button>
                  <p style={{ fontFamily:SANS, fontSize:'0.77rem', color:MUTED,
                    textAlign:'center', margin:0, lineHeight:1.6 }}>
                    We use your details to send the check and follow up once. No lists, no spam.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.p {...rise}
          style={{ ...P, fontSize:'0.88rem', color:MUTED, textAlign:'center',
            maxWidth:'660px', margin:'40px auto 0' }}>
          Rankflow works remotely with businesses across India, from Chandigarh. If AI search
          is not yet relevant to your category, we will tell you on the first reply rather
          than sell you something that will not work.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { label:'The page', items:[
      { t:'What changed', h:'#problem' },
      { t:'How it works', h:'#how'     },
      { t:'Pricing',      h:'#offer'   },
      { t:'Questions',    h:'#faq'     },
    ]},
    { label:'Get in touch', items:[
      { t:'WhatsApp', h:waLink() },
      ...(CONTACT.phoneE164 ? [{ t:CONTACT.phoneDisplay, h:`tel:${CONTACT.phoneE164}` }] : []),
      { t:CONTACT.email, h:`mailto:${CONTACT.email}` },
      { t:'Free AI check', h:'#check' },
    ]},
  ];

  return (
    <footer style={{ background:BG_ALT, borderTop:`1px solid ${BORDER}` }}>
      <div style={{ ...WRAP, padding:'56px 24px 90px' }}>
        <div style={{ display:'grid', gap:'40px', gridTemplateColumns:'1fr' }}
          className="grid-cols-1 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div style={{ marginBottom:'14px' }}><Logo/></div>
            <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.86rem', color:MUTED,
              lineHeight:1.75, maxWidth:'320px' }}>
              AI search optimisation for businesses across India — making companies findable
              and citable by ChatGPT, Perplexity and Google&apos;s AI answers. Local SEO
              included where it matters. Published prices, no lock-in, every account in
              your name.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.label}>
              <p style={{ fontFamily:MONO, fontSize:'0.58rem', letterSpacing:'0.2em',
                textTransform:'uppercase', color:'#2D3748', marginBottom:'14px' }}>{col.label}</p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}>
                {col.items.map(item => (
                  <li key={item.t}>
                    <a href={item.h}
                      {...(item.h.startsWith('http') ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                      style={{ fontFamily:SANS, fontSize:'0.85rem', color:MUTED,
                        textDecoration:'none', transition:'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                      onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                      {item.t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${BORDER}`, marginTop:'40px', paddingTop:'24px' }}>
          <p style={{ fontFamily:MONO, fontSize:'0.63rem', color:'#2D3748', letterSpacing:'0.1em', margin:0 }}>
            © {new Date().getFullYear()} RANKFLOW · INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   ROOT — Blueprint A, problem-first
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Turning />
      <Mechanism />
      <Proof />
      <Offer />
      <Objections />
      <Guarantee />
      <Close />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
