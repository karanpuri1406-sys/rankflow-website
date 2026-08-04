'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Menu, X, MapPin, Search,
  CheckCircle2, XCircle, Shield, Eye, MessageCircle,
  Phone, AlertCircle, Quote, Camera, Star, FileText,
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

const WRAP = { maxWidth:'1160px', margin:'0 auto', padding:'0 24px' } as const;
const NARROW = { maxWidth:'760px', margin:'0 auto', padding:'0 24px' } as const;

/* Shared type styles — keeps rhythm consistent down a long page */
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
   LOGO
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
    { label:'The problem', href:'#problem' },
    { label:'How it works', href:'#how'     },
    { label:'What you get', href:'#offer'   },
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
            Free check <ArrowRight size={15}/>
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
                Get a free check
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
   Job: stop the scroll. Name the pain, not the offer.
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
            For practices in Chandigarh · Mohali · Panchkula
          </span>
        </motion.div>

        <div style={{ marginBottom:'26px', maxWidth:'980px' }}>
          {[
            'Someone searched for',
            'your service this week.',
          ].map((text, i) => (
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
              They found someone else.
            </motion.span>
          </div>
        </div>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.78 }}
          style={{ ...P, fontSize:'clamp(1rem, 1.7vw, 1.16rem)', color:'#E2E8F0',
            maxWidth:'620px', marginBottom:'38px', textShadow:'0 1px 14px rgba(0,0,0,0.6)' }}>
          Most established practices in the Tricity are invisible the moment someone
          searches instead of asks. We fix that, starting with your Google listing —
          <span style={{ color:WHITE, fontWeight:500 }}> ₹5,000, once, and you see the
          difference inside 30 days.</span>
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
            Show me what Google shows <ArrowRight size={16}/>
          </a>
          <a href="#problem"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'16px 30px', borderRadius:'9px',
              border:'1px solid rgba(255,255,255,0.24)', color:WHITE,
              background:'rgba(255,255,255,0.07)',
              fontFamily:SANS, fontWeight:500, fontSize:'0.96rem', textDecoration:'none' }}>
            Read on <ChevronDown size={16}/>
          </a>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05 }}
          style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'12px 26px',
            borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'26px', maxWidth:'820px' }}>
          {['Free check, no call required','Prices published below','Nothing locked in'].map((t,i) => (
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
   Job: make the reader feel seen. Ends on the insight.
   ────────────────────────────────────────────── */
function Problem() {
  return (
    <section id="problem" style={{ background:BG_ALT, padding:'110px 0', borderTop:`1px solid ${BORDER}` }}>
      <div style={NARROW}>
        <motion.div {...rise}>
          <span style={EYEBROW}>Why this happens</span>
          <h2 style={H2}>
            Your practice runs on referrals.{' '}
            <span style={{ color:CYAN }}>Until it stops.</span>
          </h2>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'30px', display:'flex', flexDirection:'column', gap:'22px' }}>
          <p style={P}>
            You built the practice the honest way. Good work, word of mouth, one client
            telling another. For years that was enough — and there is a real pride in
            that, because it means the work speaks.
          </p>
          <p style={P}>
            Then the curve flattens. Not dramatically. The phone still rings, but it rings
            with the same names, from the same circles. New enquiries arrive in months when
            someone happens to mention you. You notice a newer practice down the road
            filling up faster, and you know their work is not better than yours.
          </p>
          <p style={P}>
            Maybe you tried something. A cousin&apos;s friend built a website in 2019 that
            nobody has touched since. Or you paid an agency ₹20,000 a month and received
            reports full of impressions and keyword positions, none of which ever turned
            into a person walking through the door. After six months you stopped, and the
            experience taught you that this whole thing is noise.
          </p>
        </motion.div>

        <motion.div {...rise}
          style={{ marginTop:'40px', background:BG, border:`1px solid rgba(251,191,36,0.28)`,
            borderLeft:`3px solid ${AMBER}`, borderRadius:'12px', padding:'30px 30px 30px 32px' }}>
          <span style={{ ...EYEBROW, color:AMBER, marginBottom:'12px' }}>Here is what actually went wrong</span>
          <p style={{ ...P, margin:0, color:'#E2E8F0' }}>
            None of it failed because marketing doesn&apos;t work for practices like yours.
            It failed because the one place people actually look for you — the map that
            appears when someone types your service and your city into a phone — was never
            set up. No photos. Wrong hours. Missing services. Sometimes not even claimed.
            <span style={{ color:WHITE, fontWeight:500 }}> Everything else was built on top
            of a foundation that was never laid.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A3 · THE TURNING POINT
   Job: hope, not promise. The referral reframe lives here.
   ────────────────────────────────────────────── */
function Turning() {
  return (
    <section style={{ background:BG, padding:'110px 0' }}>
      <div style={NARROW}>
        <motion.div {...rise}>
          <span style={EYEBROW}>The part most practices miss</span>
          <h2 style={H2}>
            Every referral you get{' '}
            <span style={{ color:CYAN }}>googles you first.</span>
          </h2>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'30px', display:'flex', flexDirection:'column', gap:'22px' }}>
          <p style={P}>
            Think about the last time someone recommended a doctor, a lawyer or an
            architect to you. You did not simply call the number. You typed the name into
            your phone first — and what came back decided whether you called at all.
          </p>
          <p style={P}>
            Your referrals do exactly the same thing. Someone vouches for you, the person
            searches, and if what appears is a blank listing with no photos and no reviews,
            hesitation creeps in. They do not tell you this. They just take longer to call,
            or they never do.
          </p>
          <p style={{ ...P, color:'#E2E8F0' }}>
            So this is not about replacing word of mouth with advertising.{' '}
            <span style={{ color:WHITE, fontWeight:500 }}>It is about not leaking the word
            of mouth you have already earned</span> — and then being visible to the people
            who never got a referral in the first place.
          </p>
        </motion.div>

        <motion.div {...rise} style={{ marginTop:'44px', display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1px',
          background:BORDER, borderRadius:'14px', overflow:'hidden' }}>
          {[
            { icon:XCircle, c:'#F87171', t:'What people find today',
              l:['An unclaimed or bare listing','No photos of the practice','Hours that may be wrong','A competitor above you'] },
            { icon:CheckCircle2, c:'#4ADE80', t:'What they could find',
              l:['A complete, verified profile','Real photos of your space','Correct hours and services','Reviews from actual clients'] },
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
   Job: explain the approach, not the deliverables.
   ────────────────────────────────────────────── */
function Mechanism() {
  const steps = [
    { n:'01', Icon:Search, t:'We look you up the way a client would',
      d:'Your service, your sector, on a phone. We record what appears, which competitor sits above you, and what your listing is missing. You get this as a one-page breakdown whether or not you hire us.' },
    { n:'02', Icon:MapPin, t:'We rebuild the listing properly',
      d:'Claimed and verified, correct categories, every service listed, real photos, accurate hours, and the questions clients actually ask answered on the profile itself.' },
    { n:'03', Icon:Star, t:'We turn your existing clients into reviews',
      d:'You already have happy clients. Most practices have never asked. We set up a simple request that runs after each visit, so reviews accumulate without you chasing anyone.' },
    { n:'04', Icon:FileText, t:'Day 30, you see the numbers',
      d:'Listing views, calls, direction requests and search position — before and after, from your own Google account, not ours. If it did not move, we tell you that plainly.' },
  ];

  return (
    <section id="how" style={{ background:BG_ALT, padding:'110px 0' }}>
      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'700px', marginBottom:'54px' }}>
          <span style={EYEBROW}>How it works</span>
          <h2 style={H2}>
            The fastest thing to fix{' '}
            <span style={{ color:CYAN }}>is also the cheapest.</span>
          </h2>
          <p style={{ ...P, marginTop:'18px' }}>
            Search engine work on a website takes months. A Google Business Profile moves in
            weeks — it is the map result, the one that shows up above every website link when
            someone searches locally on a phone. For a practice that serves one city, it is
            the single highest-return thing you can fix, and almost nobody has done it properly.
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
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A5 · PROOF
   Job: evidence. We have no client testimonials yet, so this
   section is built on verifiable work and on saying so plainly.
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

        {/* Honesty block — the weakest dimension, addressed head on */}
        <motion.div {...rise}
          style={{ maxWidth:'720px', marginBottom:'46px', display:'flex', gap:'14px',
            background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'12px', padding:'24px 26px' }}>
          <Quote size={20} color={MUTED} strokeWidth={1.6} style={{ flexShrink:0, marginTop:'3px' }}/>
          <p style={{ ...P, fontSize:'0.96rem', margin:0 }}>
            You will not find star ratings, client counts or glowing quotes on this page.
            Rankflow launched in 2026 and has not earned them yet — so we have not invented
            any. What we can show you is the work behind it, and a first month structured so
            that you are the one holding the evidence, not us.
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

        <motion.p {...rise} style={{ ...P, fontSize:'0.9rem', color:MUTED, marginTop:'26px', maxWidth:'660px' }}>
          Rankflow was founded by Karan Puri. Client names available on request — ask, and
          we will walk you through any of this in detail.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   A6 · THE OFFER
   Job: make ₹5,000 feel small against what arrives.
   ────────────────────────────────────────────── */
function Offer() {
  const includes = [
    { Icon:MapPin,  t:'Your listing claimed and verified',       o:'The profile becomes yours to control, in your name — not ours.' },
    { Icon:Search,  t:'Categories and services set up properly', o:'You start appearing for the searches you actually want, not just your practice name.' },
    { Icon:Camera,  t:'Up to 20 photos added and optimised',     o:'Listings with photos get contacted noticeably more often than listings without.' },
    { Icon:FileText,t:'10 local directory citations',            o:'Consistent details across the web, which is one of the things Google weighs for local ranking.' },
    { Icon:Star,    t:'A review system you keep using',          o:'Reviews keep arriving after we are done, without you having to ask anyone face to face.' },
    { Icon:Eye,     t:'A before-and-after report on day 30',     o:'You see exactly what moved, measured from your own Google account.' },
  ];

  return (
    <section id="offer" style={{ background:BG_ALT, padding:'110px 0' }}>
      <div style={WRAP}>
        <motion.div {...rise} style={{ maxWidth:'720px', marginBottom:'46px' }}>
          <span style={EYEBROW}>What you get</span>
          <h2 style={H2}>
            The Google Profile Rescue
          </h2>
          <p style={{ ...P, marginTop:'18px' }}>
            One fixed price, done once, no retainer attached. It exists because the fastest
            way for us to prove we are worth paying is to fix the thing that produces a
            result inside a month — and let you decide afterwards.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'16px', marginBottom:'44px' }}>
          {includes.map((x, i) => (
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

        {/* Price — framed before it is announced */}
        <motion.div {...rise}
          style={{ background:BG, border:`1px solid ${CYAN}38`, borderRadius:'18px',
            padding:'44px 36px', textAlign:'center', maxWidth:'720px', margin:'0 auto',
            boxShadow:'0 0 70px rgba(34,211,238,0.07)' }}>
          <p style={{ ...P, fontSize:'0.96rem', maxWidth:'520px', margin:'0 auto 26px' }}>
            One new client at a practice like yours is worth somewhere between ₹15,000 and
            well over a lakh across the relationship. This costs less than a third of the
            lower end of that, once.
          </p>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:'10px', marginBottom:'8px' }}>
            <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'3.1rem', color:CYAN, lineHeight:1 }}>₹5,000</span>
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
          <p style={{ fontFamily:SANS, fontSize:'0.8rem', color:MUTED, marginTop:'16px', margin:'16px 0 0' }}>
            The check comes first and costs nothing. You only pay if you want the work done.
          </p>
        </motion.div>

        {/* Retainers, deliberately secondary */}
        <motion.div {...rise} style={{ maxWidth:'720px', margin:'46px auto 0' }}>
          <p style={{ ...P, fontSize:'0.92rem', color:MUTED, textAlign:'center', marginBottom:'18px' }}>
            If it works and you want it maintained, there are two monthly options —
            no obligation to take either.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'14px' }}>
            {[
              { n:'Local Starter', p:'₹12,000', d:'Profile managed monthly, local SEO on your service pages, 2 articles, reviews, monthly report.' },
              { n:'Growth', p:'₹22,000', d:'Everything above plus full technical SEO, 4 articles, competitor tracking, fortnightly calls.' },
            ].map((t,i) => (
              <div key={i} style={{ background:BG, border:`1px solid ${BORDER}`, borderRadius:'13px', padding:'24px' }}>
                <div style={{ fontFamily:MONO, fontSize:'0.62rem', letterSpacing:'0.18em',
                  textTransform:'uppercase', color:MUTED, marginBottom:'9px' }}>{t.n}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'5px', marginBottom:'10px' }}>
                  <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.5rem', color:WHITE }}>{t.p}</span>
                  <span style={{ fontFamily:SANS, fontSize:'0.78rem', color:MUTED }}>/month</span>
                </div>
                <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.83rem', color:BODY, lineHeight:1.7, margin:0 }}>{t.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:SANS, fontSize:'0.8rem', color:MUTED, textAlign:'center', marginTop:'16px' }}>
            Month to month. Cancel any time. Ad spend, if you ever run ads, is paid by you
            directly to Google or Meta — we never touch it.
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
      q:'“We get our clients by referral. This is for businesses that can’t.”',
      a:'That is true of the best practices, and it is exactly why this matters. The person your client recommends you to will still search your name before calling — almost everyone does now. If nothing credible comes back, the referral quietly cools. This does not replace word of mouth. It stops the word of mouth you have already earned from leaking.',
    },
    {
      q:'“You have no reviews and no case studies. Why would I take the risk?”',
      a:'A fair question, and we are not going to pretend otherwise. That is why the first step is free, why the first paid step is ₹5,000 rather than a retainer, why there is no contract, and why everything is registered in your name so you lose nothing if you walk away. We have structured this so the risk of being wrong about us is small and entirely recoverable.',
    },
    {
      q:'“I paid an agency before and got nothing but reports.”',
      a:'We have seen those reports. Impressions, keyword positions, traffic that never becomes a phone call. The day-30 report here covers four things only: listing views, calls, direction requests and search position — pulled from your own Google account, which you own and can check yourself. If those numbers have not moved, we will say so rather than dress it up.',
    },
    {
      q:'“I don’t have time for this.”',
      a:'You will spend about twenty minutes total. We need access to your Google listing, a few photos of the practice if you have them, and a short conversation about which services matter most. Everything else happens without you.',
    },
  ];

  const faq = [
    { q:'What if I don’t have a website?',
      a:'That is common and not a problem. A Google listing works entirely on its own and is often the better place to start. If you decide you want a website later, we can talk about it then.' },
    { q:'How long until I see something?',
      a:'The listing work is completed in the first week or two. Movement in views and calls usually appears within two to four weeks. Reviews build more gradually, over months.' },
    { q:'Who owns the accounts?',
      a:'You do. Your Google Business Profile, your website, your ad accounts — all registered in your name and your email. If we part ways, you keep everything and nothing needs migrating.' },
    { q:'Do I have to sign up for a monthly plan?',
      a:'No. The ₹5,000 Rescue is a one-time piece of work that ends when it is done. The monthly options exist if you want them and are ignored entirely if you don’t.' },
    { q:'Can you guarantee I’ll rank first?',
      a:'No, and you should treat anyone who does with suspicion. Nobody controls Google’s rankings. What we can do is make sure the things that are within your control are all correct, which is more than most practices in the Tricity have done.' },
    { q:'Which practices is this not right for?',
      a:'Anyone needing enquiries this week — local search does not move that fast. Anyone with no capacity to take on new clients. And any business too small to clear ₹5,000 comfortably, in which case we would rather point you at doing the basics yourself for free.' },
  ];

  return (
    <section id="faq" style={{ background:BG, padding:'110px 0' }}>
      <div style={NARROW}>
        <motion.div {...rise} style={{ marginBottom:'44px' }}>
          <span style={EYEBROW}>What you’re probably thinking</span>
          <h2 style={H2}>
            The objections{' '}
            <span style={{ color:CYAN }}>worth taking seriously.</span>
          </h2>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'58px' }}>
          {loud.map((o, i) => (
            <motion.div key={i} {...rise} transition={{ ...rise.transition, delay:i*0.07 }}
              style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'13px', padding:'28px 28px' }}>
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
              The 30-day terms
            </h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            <p style={{ ...P, margin:0 }}>
              We complete the listing work, then leave it for thirty days and measure what
              happened. On day 30 you get a before-and-after report drawn from your own
              Google account.
            </p>
            <p style={{ ...P, margin:0, color:'#E2E8F0' }}>
              <span style={{ color:WHITE, fontWeight:600 }}>If your listing views have not
              increased over those thirty days, ask and we will refund the ₹5,000 in full.</span>{' '}
              You keep the optimised profile, the photos, the citations and the review
              system regardless — they are on your account and we would not take them back
              even if we could.
            </p>
            <p style={{ ...P, margin:0, fontSize:'0.94rem', color:MUTED }}>
              We offer this because the work is straightforward and the outcome is
              predictable when a listing starts from nothing. If we are wrong about your
              situation, you should not be the one paying for it.
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
        {/* The final argument */}
        <motion.div {...rise} style={{ maxWidth:'720px', margin:'0 auto 54px', textAlign:'center' }}>
          <span style={{ ...EYEBROW, textAlign:'center' }}>Start here</span>
          <h2 style={H2}>
            Find out what a client sees{' '}
            <span style={{ color:CYAN }}>before you spend anything.</span>
          </h2>
          <p style={{ ...P, marginTop:'20px' }}>
            Tell us your practice name and we will look you up the way a client would.
            Within two working days you get a one-page breakdown: what your listing shows,
            which competitor is appearing above you, and the three things to fix first.
            It is free, there is no call, and it is yours to keep and act on yourself
            if you would rather.
          </p>
          <p style={{ ...P, marginTop:'18px', color:'#E2E8F0' }}>
            Nothing changes while you think about it, except that the practice down the
            road keeps appearing where you don&apos;t.
          </p>
        </motion.div>

        <div style={{ display:'grid', gap:'46px', alignItems:'start' }} className="grid-cols-1 lg:grid-cols-2">
          <motion.div {...rise}>
            <div style={{ display:'flex', flexDirection:'column', gap:'13px', marginBottom:'30px' }}>
              {[
                'What your Google listing shows right now',
                'Which competitor appears above you, and why',
                'Whether your details are correct and complete',
                'The three fixes that matter most, in order',
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
                    Your check will be with you within two working days.
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
                      Practice name and area
                    </label>
                    <input id="business" name="business" type="text" required
                      placeholder="e.g. Sharma Dental, Sector 35"
                      value={form.business}
                      onChange={e => setForm({ ...form, business:e.target.value })}
                      style={inputStyle} onFocus={focus} onBlur={blur}/>
                    <p style={{ fontFamily:SANS, fontSize:'0.73rem', color:MUTED, marginTop:'7px' }}>
                      No website needed — that is often the thing we are fixing.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="message" style={{ fontFamily:MONO, fontSize:'0.6rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      Anything we should know <span style={{ textTransform:'none' }}>(optional)</span>
                    </label>
                    <textarea id="message" name="message" rows={3}
                      placeholder="More calls, more walk-ins, no idea where to start…"
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
                    {status === 'sending' ? 'Sending…' : 'Get my free check'}
                    {status !== 'sending' && <ArrowRight size={16}/>}
                  </button>
                  <p style={{ fontFamily:SANS, fontSize:'0.77rem', color:MUTED,
                    textAlign:'center', margin:0, lineHeight:1.6 }}>
                    We use your number to send the check and follow up once. No lists, no spam.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.p {...rise}
          style={{ ...P, fontSize:'0.88rem', color:MUTED, textAlign:'center',
            maxWidth:'640px', margin:'40px auto 0' }}>
          Rankflow is based in Chandigarh and works with practices across Mohali, Panchkula
          and Zirakpur. If we are not the right fit for you, we will say so on the first call
          rather than sell you something that will not work.
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
      { t:'Why this happens', h:'#problem' },
      { t:'How it works',     h:'#how'     },
      { t:'What you get',     h:'#offer'   },
      { t:'Questions',        h:'#faq'     },
    ]},
    { label:'Get in touch', items:[
      { t:'WhatsApp', h:waLink() },
      ...(CONTACT.phoneE164 ? [{ t:CONTACT.phoneDisplay, h:`tel:${CONTACT.phoneE164}` }] : []),
      { t:CONTACT.email, h:`mailto:${CONTACT.email}` },
      { t:'Free check',  h:'#check' },
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
              lineHeight:1.75, maxWidth:'300px' }}>
              Local search and Google Business Profile work for professional practices
              across Chandigarh, Mohali and Panchkula. Published prices, no lock-in,
              every account in your name.
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
            © {new Date().getFullYear()} RANKFLOW · CHANDIGARH, INDIA
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   ROOT — Blueprint A, problem-first sequence
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />        {/* A1 lead */}
      <Problem />     {/* A2 problem + insight */}
      <Turning />     {/* A3 turning point */}
      <Mechanism />   {/* A4 mechanism */}
      <Proof />       {/* A5 proof */}
      <Offer />       {/* A6 offer */}
      <Objections />  {/* A7 objections + FAQ */}
      <Guarantee />   {/* A8 guarantee */}
      <Close />       {/* A9 close + capture */}
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
