'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Menu, X, Search, FileText,
  MapPin, BarChart3, Megaphone, Wrench, CheckCircle2,
  Shield, Clock, Eye, MessageCircle, Phone, AlertCircle,
} from 'lucide-react';
import { CONTACT, waLink, formEndpoint } from '@/config';

/* ──────────────────────────────────────────────
   DESIGN TOKENS
   ────────────────────────────────────────────── */
const BG      = '#05070E';
const BG_ALT  = '#070A15';
const CYAN    = '#22D3EE';
const WHITE   = '#FFFFFF';
const BODY    = '#CBD5E1';   // slate-300 — highly readable
const MUTED   = '#64748B';   // slate-500
const BORDER  = 'rgba(255,255,255,0.08)';
const SYNE    = "'Syne', sans-serif";
const SANS    = "'DM Sans', sans-serif";
const MONO    = "'DM Mono', monospace";

/* ──────────────────────────────────────────────
   LOGO
   ────────────────────────────────────────────── */
function Logo() {
  return (
    <a href="#top" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill={CYAN}/>
        <polyline
          points="7,26 13,17 19,21 25,13 29,8"
          stroke={BG} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="29" cy="8" r="2.8" fill={BG}/>
      </svg>
      <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.18rem', letterSpacing:'0.06em', color:WHITE }}>
        RANKFLOW
      </span>
    </a>
  );
}

/* ──────────────────────────────────────────────
   FLOATING WHATSAPP  —  the channel this market actually uses
   ────────────────────────────────────────────── */
function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rankflow on WhatsApp"
      style={{
        position:'fixed', right:'20px', bottom:'20px', zIndex:60,
        display:'flex', alignItems:'center', gap:'10px',
        background:'#25D366', color:'#062314',
        padding:'13px 18px', borderRadius:'999px',
        fontFamily:SANS, fontWeight:700, fontSize:'0.9rem',
        textDecoration:'none', boxShadow:'0 8px 30px rgba(37,211,102,0.4)',
      }}
    >
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
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label:'Services', href:'#services' },
    { label:'Pricing',  href:'#pricing'  },
    { label:'Work',     href:'#work'     },
    { label:'Process',  href:'#process'  },
    { label:'Contact',  href:'#contact'  },
  ];

  return (
    <motion.nav
      initial={{ y:-70, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
      style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        transition:'background 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(5,7,14,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', height:'72px',
        display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Logo />

        <div className="hidden md:flex" style={{ alignItems:'center', gap:'2px' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily:SANS, fontSize:'0.9rem', color:'#94A3B8',
                padding:'8px 16px', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex" style={{ alignItems:'center', gap:'10px' }}>
          {CONTACT.phoneE164 && (
            <a href={`tel:${CONTACT.phoneE164}`}
              style={{ display:'inline-flex', alignItems:'center', gap:'7px',
                fontFamily:SANS, fontWeight:600, fontSize:'0.85rem', color:WHITE,
                padding:'10px 14px', borderRadius:'8px', textDecoration:'none',
                border:`1px solid ${BORDER}` }}>
              <Phone size={14}/> {CONTACT.phoneDisplay}
            </a>
          )}
          <a href="#contact"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:SANS, fontWeight:600, fontSize:'0.88rem',
              background:CYAN, color:BG,
              padding:'10px 22px', borderRadius:'8px', textDecoration:'none', transition:'all 0.25s' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(34,211,238,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            Free Check <ArrowRight size={15}/>
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
          <motion.div
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            style={{ overflow:'hidden', background:'rgba(5,7,14,0.98)', borderTop:`1px solid ${BORDER}` }}
          >
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
              <a href="#contact" onClick={() => setOpen(false)}
                style={{ marginTop:'8px', background:CYAN, color:BG, padding:'13px',
                  textAlign:'center', borderRadius:'8px', fontFamily:SANS, fontWeight:700, textDecoration:'none' }}>
                Get a Free Check
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────── */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Only load the video on larger screens and when the visitor hasn't asked
     for reduced motion. On mobile the poster alone carries the section —
     which keeps the heaviest asset off the metered connections most of our
     visitors are on. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (wide && !still) {
      el.src = '/hero.mp4';
      el.play().catch(() => {});
    }
  }, []);

  return (
    <section id="top" style={{ position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', overflow:'hidden', background:BG }}>

      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <video
          ref={videoRef}
          loop muted playsInline preload="none"
          poster="/hero-mobile.jpg"
          aria-hidden="true"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(5,7,14,0.80) 0%, rgba(5,7,14,0.48) 35%, rgba(5,7,14,0.42) 60%, rgba(5,7,14,0.95) 100%)',
        }}/>
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, rgba(5,7,14,0.6) 100%)',
        }}/>
      </div>

      <div style={{
        position:'relative', zIndex:10, flex:1,
        display:'flex', flexDirection:'column', justifyContent:'center',
        maxWidth:'1200px', margin:'0 auto', padding:'130px 24px 0', width:'100%',
      }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'30px' }}>
          <span className="animate-pulse" style={{
            width:'7px', height:'7px', borderRadius:'50%', background:CYAN, display:'block', flexShrink:0,
          }}/>
          <span style={{ fontFamily:MONO, fontSize:'0.7rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN }}>
            SEO &amp; Digital Marketing · Chandigarh Tricity
          </span>
        </motion.div>

        <div style={{ marginBottom:'26px' }}>
          {[
            { text:'Marketing for',      color:WHITE },
            { text:'Chandigarh firms',   color:WHITE },
            { text:'that need clients.', color:CYAN  },
          ].map(({ text, color }, i) => (
            <div key={text} style={{ overflow:'hidden' }}>
              <motion.span
                initial={{ y:90, opacity:0 }}
                animate={{ y:0, opacity:1 }}
                transition={{ delay:0.3 + i*0.14, duration:0.75, ease:[0.22,1,0.36,1] }}
                style={{
                  fontFamily:SYNE, fontWeight:800,
                  fontSize:'clamp(2.2rem, 5vw, 4.5rem)',
                  lineHeight:1.05, color,
                  textShadow:'0 2px 24px rgba(0,0,0,0.7)',
                  display:'block',
                }}
              >{text}</motion.span>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.76 }}
          style={{
            fontFamily:SANS, fontWeight:300,
            fontSize:'clamp(1rem, 1.8vw, 1.18rem)',
            color:'#E2E8F0', lineHeight:1.78,
            maxWidth:'560px', marginBottom:'40px',
            textShadow:'0 1px 14px rgba(0,0,0,0.6)',
          }}
        >
          SEO, Google Business Profile and content for consultancies, law firms,
          clinics and practices across Chandigarh, Mohali and Panchkula.{' '}
          <span style={{ color:WHITE, fontWeight:500 }}>
            Every price is published on this page
          </span>{' '}
          — you&apos;ll know what it costs before you speak to anyone.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
          style={{ display:'flex', flexWrap:'wrap', gap:'14px', marginBottom:'56px' }}>
          <a href="#contact"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'15px 32px', borderRadius:'9px',
              background:CYAN, color:BG,
              fontFamily:SANS, fontWeight:700, fontSize:'0.95rem',
              textDecoration:'none', transition:'all 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 44px rgba(34,211,238,0.45)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            See What Google Shows for Your Business <ArrowRight size={16}/>
          </a>
          <a href="#pricing"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'15px 32px', borderRadius:'9px',
              border:'1px solid rgba(255,255,255,0.24)', color:WHITE,
              fontFamily:SANS, fontWeight:500, fontSize:'0.95rem',
              textDecoration:'none', transition:'all 0.25s',
              background:'rgba(255,255,255,0.07)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.13)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            }}
          >
            See Pricing <ChevronDown size={16}/>
          </a>
        </motion.div>

        {/* Honest credentials — every claim here is verifiable */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05 }}
          style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-start', gap:'32px',
            borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'32px', maxWidth:'760px' }}>
          {[
            { n:'9 yrs',  l:'In marketing' },
            { n:'3.5 yrs', l:'In-house B2B marketing lead' },
            { n:'2',      l:'Consulting firms as active clients' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.5rem', color:WHITE, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:SANS, fontSize:'0.78rem', color:'#94A3B8', marginTop:'4px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
        style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'center',
          paddingBottom:'40px', paddingTop:'24px' }}>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
          style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.6rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:'#2D3748' }}>Scroll</span>
          <ChevronDown size={13} color="#2D3748"/>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   TICKER
   ────────────────────────────────────────────── */
function Ticker() {
  const items = [
    'Local SEO','Google Business Profile','Content & Blogs',
    'Website Fixes','Google Ads','Meta Ads',
    'Analytics Setup','LinkedIn Content','Review Management','Transparent Pricing',
  ];
  const all = [...items, ...items];

  return (
    <div style={{ background:BG_ALT, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`,
      overflow:'hidden', padding:'14px 0' }}>
      <div className="ticker-track" style={{ display:'flex', gap:'0', whiteSpace:'nowrap', width:'max-content' }}>
        {all.map((item, i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center' }}>
            <span style={{ fontFamily:MONO, fontSize:'0.75rem', letterSpacing:'0.2em',
              textTransform:'uppercase', color:BODY, padding:'0 32px' }}>
              {item}
            </span>
            <span style={{ color:CYAN, fontSize:'0.5rem', opacity:0.7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SERVICES
   ────────────────────────────────────────────── */
function Services() {
  const svcs = [
    { Icon:MapPin,    title:'Google Business Profile', desc:'Claim it, fill it out properly, add photos and services, build local citations, and set up a system that keeps reviews coming in. This is where local results show up fastest.' },
    { Icon:Search,    title:'Local SEO',               desc:'Rank for what people in Chandigarh, Mohali and Panchkula actually search. Keyword research, on-page work, and the map pack — not vanity rankings for terms nobody types.' },
    { Icon:FileText,  title:'Content & Blogs',         desc:'Articles and guides that answer the questions your clients ask before they hire anyone. Written to be read by people first, and to rank as a consequence.' },
    { Icon:Wrench,    title:'Website Fixes',           desc:'Broken contact forms, wrong sitemaps, slow pages, dead links. The unglamorous problems that quietly cost you enquiries every single week.' },
    { Icon:Megaphone, title:'Google & Meta Ads',       desc:'Campaigns built to bring enquiries, not impressions. Ad spend stays in your own account and is billed separately — you always see exactly where it went.' },
    { Icon:BarChart3, title:'Analytics That Make Sense',desc:'GA4 and Search Console set up to track the actions that matter — calls, form fills, directions. Then a monthly report in plain English.' },
  ];

  return (
    <section id="services" style={{ background:BG, padding:'100px 0', position:'relative' }}>
      <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.4, pointerEvents:'none' }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', position:'relative' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginBottom:'64px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            What We Do
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Six things,{' '}
            <span style={{ color:CYAN }}>done properly.</span>
          </h2>
          <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.05rem', color:BODY,
            marginTop:'16px', maxWidth:'520px', lineHeight:1.75 }}>
            No packages padded with services you&apos;ll never use. Start with one, add more when it earns its place.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:'16px' }}>
          {svcs.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className="card-hover"
              style={{
                background:BG_ALT, border:`1px solid ${BORDER}`,
                borderRadius:'14px', padding:'32px',
              }}
            >
              <div style={{ width:'44px', height:'44px', borderRadius:'10px', marginBottom:'20px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(34,211,238,0.1)', border:'1px solid rgba(34,211,238,0.2)' }}>
                <s.Icon size={20} color={CYAN} strokeWidth={1.6}/>
              </div>
              <h3 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.15rem',
                color:WHITE, marginBottom:'10px' }}>{s.title}</h3>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.9rem',
                color:BODY, lineHeight:1.75, margin:0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PRICING
   ────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name:'Google Profile Rescue', price:'₹5,000', period:'one-time',
      desc:'The fastest way to be found locally. Start here if you\'re not sure.',
      features:[
        'Claim and verify your Google listing',
        'Categories, services and hours set up properly',
        'Up to 20 photos added and optimised',
        '10 local directory citations',
        'A review-request system you can keep using',
        'Before-and-after report after 30 days',
      ],
      highlight:false, badge:null,
    },
    {
      name:'Local Starter', price:'₹12,000', period:'/month',
      desc:'For practices that want to show up consistently, month after month.',
      badge:'Most Popular',
      features:[
        'Everything in Profile Rescue, maintained monthly',
        'Local SEO for your core service pages',
        '2 articles a month, written for your clients',
        'Google Posts and review management',
        'GA4 and Search Console set up and tracked',
        'Monthly report in plain English',
      ],
      highlight:true,
    },
    {
      name:'Growth', price:'₹22,000', period:'/month',
      desc:'For firms competing on search across the whole Tricity.',
      features:[
        'Everything in Local Starter',
        'Full technical SEO and site fixes',
        '4 articles a month plus landing pages',
        'Competitor tracking and gap analysis',
        'LinkedIn content for partners and directors',
        'Fortnightly calls',
      ],
      highlight:false, badge:null,
    },
  ];

  return (
    <section id="pricing" style={{ background:BG_ALT, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:'64px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            Pricing
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Most agencies won&apos;t tell you.{' '}
            <span style={{ color:CYAN }}>Here&apos;s ours.</span>
          </h2>
          <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.02rem', color:BODY,
            maxWidth:'540px', margin:'14px auto 0', lineHeight:1.7 }}>
            No lock-in contracts. Month to month, cancel whenever. Your Google profile,
            website and ad accounts stay in your name — always.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
          {plans.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              style={{
                background: BG,
                border: p.highlight ? `1px solid ${CYAN}40` : `1px solid ${BORDER}`,
                borderRadius:'16px', padding:'36px 30px',
                display:'flex', flexDirection:'column', position:'relative',
                boxShadow: p.highlight ? `0 0 60px rgba(34,211,238,0.08)` : 'none',
              }}
            >
              {p.badge && (
                <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%)' }}>
                  <span style={{ background:CYAN, color:BG, fontFamily:SYNE, fontWeight:700,
                    fontSize:'0.7rem', padding:'4px 16px', borderRadius:'20px', letterSpacing:'0.04em',
                    whiteSpace:'nowrap' }}>
                    {p.badge}
                  </span>
                </div>
              )}

              <div style={{ marginBottom:'24px' }}>
                <p style={{ fontFamily:MONO, fontSize:'0.65rem', letterSpacing:'0.2em',
                  textTransform:'uppercase', color: p.highlight ? CYAN : MUTED, marginBottom:'10px' }}>
                  {p.name}
                </p>
                <div style={{ display:'flex', alignItems:'baseline', gap:'6px' }}>
                  <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'2.1rem',
                    color: p.highlight ? CYAN : WHITE, lineHeight:1 }}>
                    {p.price}
                  </span>
                  <span style={{ fontFamily:SANS, fontSize:'0.82rem', color:MUTED }}>{p.period}</span>
                </div>
                <p style={{ fontFamily:SANS, fontSize:'0.85rem', color:BODY, marginTop:'8px', lineHeight:1.6 }}>{p.desc}</p>
              </div>

              <div style={{ height:'1px', background:BORDER, marginBottom:'24px' }}/>

              <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px', display:'flex',
                flexDirection:'column', gap:'12px', flex:1 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                    <CheckCircle2 size={15} color={ p.highlight ? CYAN : '#4ADE80' }
                      strokeWidth={2} style={{ marginTop:'2px', flexShrink:0 }}/>
                    <span style={{ fontFamily:SANS, fontSize:'0.88rem', color:BODY, lineHeight:1.55 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact"
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  padding:'13px', borderRadius:'9px', textDecoration:'none', transition:'all 0.25s',
                  fontFamily:SANS, fontWeight:700, fontSize:'0.9rem',
                  ...(p.highlight
                    ? { background:CYAN, color:BG }
                    : { border:`1px solid ${BORDER}`, color:WHITE, background:'transparent' }),
                }}
              >
                Get Started <ArrowRight size={14}/>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:SANS, fontSize:'0.85rem', color:MUTED, textAlign:'center', marginTop:'28px' }}>
          Running Google or Meta ads? Management is 15% of ad spend (minimum ₹8,000/month),
          and the ad budget itself is paid directly by you to Google or Meta.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   WORK  —  real projects, verifiable claims only
   ────────────────────────────────────────────── */
function Work() {
  const projects = [
    {
      client:'A consulting firm',
      role:'Client · SEO and content, 2026',
      accent:'#22D3EE',
      points:[
        'Found their contact form had been silently discarding every enquiry — fixed it, and it produced a real enquiry within weeks',
        'Their sitemap pointed at the wrong domain and listed 4 pages out of roughly 30',
        'Published 7 in-depth guides and built 6 pages of interactive tools',
        'Studied 130 recent posts across 6 competing firms to find the gaps',
      ],
    },
    {
      client:'A risk advisory firm',
      role:'Client · Website and content, 2026',
      accent:'#4ADE80',
      points:[
        'Built an interactive AI-disruption diagnostic — 16 questions across 4 scored dimensions',
        'Launched an insights blog and published 8 in-depth articles',
        'Set up GA4 tracking 11 specific actions, so we measure enquiries rather than guess',
        'Redirected legacy URLs and added 404 tracking to stop losing existing traffic',
      ],
    },
    {
      client:'BelWo',
      role:'In-house · Marketing Specialist, 2022–2026',
      accent:'#A78BFA',
      points:[
        'Three and a half years running marketing for a US customer-communications firm',
        'Content, newsletters, LinkedIn, events and lead tracking',
        'Grew the company LinkedIn following and ran the full event research programme',
        'Built the marketing strategy decks the leadership team worked from',
      ],
    },
    {
      client:'Lawgic',
      role:'Co-founder · Law entrance coaching',
      accent:'#FB923C',
      points:[
        'Built the SEO, directory presence and lead system from nothing',
        'Listed across directories including UrbanPro, Brownbook and Justdial',
        'Built the lead capture, WhatsApp automation and reporting dashboards myself',
        'Everything I recommend here, I have already done for my own business',
      ],
    },
  ];

  return (
    <section id="work" style={{ background:BG, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginBottom:'56px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            The Work
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Rankflow is new.{' '}
            <span style={{ color:CYAN }}>The work behind it isn&apos;t.</span>
          </h2>
          <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.02rem', color:BODY,
            marginTop:'16px', maxWidth:'620px', lineHeight:1.75 }}>
            I&apos;m Karan Puri. Nine years in marketing — three and a half of them running it
            in-house for a US software firm, and currently doing SEO and content for two
            consulting practices. Client names on request — ask me about any of it and
            I&apos;ll walk you through the work.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(330px, 1fr))', gap:'16px' }}>
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="card-hover"
              style={{ background:BG_ALT, border:`1px solid ${BORDER}`,
                borderRadius:'14px', padding:'32px 28px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'6px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:p.accent, flexShrink:0 }}/>
                <span style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.12rem', color:WHITE }}>
                  {p.client}
                </span>
              </div>
              <div style={{ fontFamily:MONO, fontSize:'0.66rem', color:MUTED,
                letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'18px' }}>
                {p.role}
              </div>
              <ul style={{ listStyle:'none', padding:0, margin:0,
                display:'flex', flexDirection:'column', gap:'11px' }}>
                {p.points.map((pt, j) => (
                  <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                    <span style={{ color:p.accent, marginTop:'6px', fontSize:'0.5rem', flexShrink:0 }}>◆</span>
                    <span style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.87rem',
                      color:BODY, lineHeight:1.7 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:SANS, fontSize:'0.86rem', color:MUTED, marginTop:'30px',
            maxWidth:'620px', lineHeight:1.7 }}>
          You won&apos;t find star ratings or client counts on this page. Rankflow launched in 2026
          and hasn&apos;t earned them yet — so we haven&apos;t invented any.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PROCESS
   ────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n:'01', title:'Free visibility check', desc:'I look up your business the way a customer would, and send you a one-page breakdown of what shows up, what doesn\'t, and what a competitor is doing differently. Free, no call required.' },
    { n:'02', title:'We agree the scope',    desc:'If it\'s useful, we pick a package from the pricing above. No proposal theatre, no three-week sales cycle. Month to month from the start.' },
    { n:'03', title:'The work happens',      desc:'Profile, citations, site fixes, content — in the order that gets you found fastest. You get told what changed and why.' },
    { n:'04', title:'Day 30: the numbers',   desc:'A before-and-after report on listing views, calls, directions and search positions. If it hasn\'t moved, we discuss why. Continue only if it worked.' },
  ];

  return (
    <section id="process" style={{ background:BG_ALT, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginBottom:'64px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            How It Works
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Four steps.{' '}
            <span style={{ color:CYAN }}>Thirty days.</span>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:'2px',
          background:BORDER, borderRadius:'16px', overflow:'hidden' }}>
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.12 }}
              style={{ background:BG_ALT, padding:'36px 28px', position:'relative' }}>
              <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'3.5rem',
                color:'rgba(255,255,255,0.03)', position:'absolute', top:'16px', right:'20px',
                lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{s.n}</span>

              <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
                width:'38px', height:'38px', borderRadius:'9px', marginBottom:'20px',
                background:'rgba(34,211,238,0.08)', border:'1px solid rgba(34,211,238,0.22)' }}>
                <span style={{ fontFamily:MONO, fontSize:'0.65rem', color:CYAN }}>{s.n}</span>
              </div>

              <h3 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'1.1rem',
                color:WHITE, marginBottom:'10px' }}>{s.title}</h3>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.88rem',
                color:BODY, lineHeight:1.75, margin:0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   WHY US
   ────────────────────────────────────────────── */
function WhyUs() {
  const reasons = [
    { Icon:Eye,    t:'Prices published',    d:'Every package and rate is on this page. No "request a quote".' },
    { Icon:Shield, t:'You own everything',  d:'Your Google profile, website and ad accounts stay in your name.' },
    { Icon:Clock,  t:'No lock-in',          d:'Month to month. Leave whenever, and take your accounts with you.' },
    { Icon:Phone,  t:'You deal with me',    d:'Not an account manager. The person doing the work answers the phone.' },
  ];

  return (
    <section style={{ background:BG, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}
          className="grid-cols-1 lg:grid-cols-2">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
              textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
              Why Rankflow
            </span>
            <h2 style={{ fontFamily:SYNE, fontWeight:800,
              fontSize:'clamp(1.6rem, 3vw, 2.4rem)', color:WHITE, lineHeight:1.12, marginBottom:'20px' }}>
              Built to be easy to leave.
            </h2>
            <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.02rem', color:BODY, lineHeight:1.78 }}>
              Agencies keep clients with lock-in contracts, accounts registered in the agency&apos;s
              name, and reports nobody can check. We&apos;d rather keep you because the work is good.
              So everything is month to month, everything is in your name, and the numbers come
              from your own Google account — not ours.
            </p>
            <a href="#contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'28px',
                padding:'13px 26px', borderRadius:'8px', background:CYAN, color:BG,
                fontFamily:SANS, fontWeight:700, fontSize:'0.9rem', textDecoration:'none' }}
            >
              Get Your Free Check <ArrowRight size={15}/>
            </a>
          </motion.div>

          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay:0.15 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {reasons.map((r, i) => (
              <div key={i}
                style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:'12px', padding:'24px' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'9px', marginBottom:'14px',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(34,211,238,0.08)', border:'1px solid rgba(34,211,238,0.18)' }}>
                  <r.Icon size={18} color={CYAN} strokeWidth={1.6}/>
                </div>
                <h4 style={{ fontFamily:SYNE, fontWeight:700, fontSize:'0.95rem',
                  color:WHITE, marginBottom:'6px' }}>{r.t}</h4>
                <p style={{ fontFamily:SANS, fontSize:'0.82rem', color:BODY,
                  lineHeight:1.65, margin:0 }}>{r.d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT  —  actually submits
   ────────────────────────────────────────────── */
type Status = 'idle' | 'sending' | 'sent' | 'error';

function Contact() {
  const [form, setForm]     = useState({ name:'', phone:'', business:'', message:'' });
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
    (e.target.style.borderColor = `${CYAN}50`);
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = BORDER);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) return;          // guarded: the form is not rendered without an endpoint
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          business: form.business,
          message: form.message,
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
    <section id="contact" style={{ background:BG_ALT, padding:'100px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
        background:`linear-gradient(90deg, transparent, ${CYAN}40, transparent)` }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gap:'64px', alignItems:'start' }}
          className="grid-cols-1 lg:grid-cols-2">

          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
              textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
              Free Visibility Check
            </span>
            <h2 style={{ fontFamily:SYNE, fontWeight:800,
              fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, marginBottom:'20px' }}>
              See what Google shows<br/>
              <span style={{ color:CYAN }}>for your business.</span>
            </h2>
            <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1rem', color:BODY,
              lineHeight:1.78, marginBottom:'36px' }}>
              Tell me your business name and I&apos;ll look it up the way a customer would.
              You get a one-page breakdown within two working days — free, and yours to keep
              whether or not we work together.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px', marginBottom:'34px' }}>
              {[
                'What your Google listing shows right now',
                'Which competitor is appearing above you, and why',
                'Whether your website works on a phone',
                'Three specific things to fix first',
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <CheckCircle2 size={16} color={CYAN} strokeWidth={2} style={{ marginTop:'2px', flexShrink:0 }}/>
                  <span style={{ fontFamily:SANS, fontSize:'0.9rem', color:BODY }}>{item}</span>
                </motion.div>
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

          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay:0.15 }}>
            <div style={{ background:BG, border:`1px solid ${BORDER}`,
              borderRadius:'16px', padding:'40px' }}>

              {/* No endpoint configured — send people somewhere that works
                  rather than showing a form that silently fails. */}
              {!endpoint ? (
                <div style={{ textAlign:'center', padding:'20px 0' }}>
                  <div style={{ width:'52px', height:'52px', borderRadius:'12px', margin:'0 auto 20px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.25)' }}>
                    <AlertCircle size={26} color="#FB923C" strokeWidth={1.6}/>
                  </div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.25rem',
                    color:WHITE, marginBottom:'12px' }}>
                    Message us directly
                  </h3>
                  <p style={{ fontFamily:SANS, fontSize:'0.9rem', color:BODY,
                    lineHeight:1.7, marginBottom:'26px' }}>
                    WhatsApp is the quickest way to reach us — usually a reply within a few hours.
                  </p>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:'9px',
                      background:'#25D366', color:'#062314', padding:'14px 26px', borderRadius:'9px',
                      fontFamily:SANS, fontWeight:700, fontSize:'0.95rem', textDecoration:'none' }}>
                    <MessageCircle size={18}/> Open WhatsApp
                  </a>
                  {/* DEV NOTE: set CONTACT.formspreeId in src/config.ts to enable the form. */}
                </div>
              ) : status === 'sent' ? (
                <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                  style={{ padding:'40px 0', textAlign:'center' }}>
                  <div style={{ width:'56px', height:'56px', borderRadius:'12px', margin:'0 auto 24px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(34,211,238,0.08)', border:`1px solid ${CYAN}30` }}>
                    <CheckCircle2 size={28} color={CYAN} strokeWidth={1.5}/>
                  </div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.5rem',
                    color:WHITE, marginBottom:'12px' }}>Got it — thank you.</h3>
                  <p style={{ fontFamily:SANS, fontSize:'0.92rem', color:BODY, lineHeight:1.7, margin:0 }}>
                    Your visibility check will be with you within two working days.
                    If it&apos;s urgent, WhatsApp is faster.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}
                  style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    {[
                      { label:'Name',  key:'name',  type:'text', ph:'Your name',    required:true },
                      { label:'Phone', key:'phone', type:'tel',  ph:'98765 43210',  required:true },
                    ].map(f => (
                      <div key={f.key}>
                        <label htmlFor={f.key} style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                          letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                          {f.label}
                        </label>
                        <input id={f.key} name={f.key} type={f.type} required={f.required} placeholder={f.ph}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={inputStyle} onFocus={focus} onBlur={blur}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="business" style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      Business name and area
                    </label>
                    <input id="business" name="business" type="text" required
                      placeholder="e.g. Sharma Dental Clinic, Sector 35"
                      value={form.business}
                      onChange={e => setForm({ ...form, business:e.target.value })}
                      style={inputStyle} onFocus={focus} onBlur={blur}
                    />
                    <p style={{ fontFamily:SANS, fontSize:'0.74rem', color:MUTED, marginTop:'7px' }}>
                      No website needed — that&apos;s often the problem we&apos;re fixing.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      What would you like more of? <span style={{ textTransform:'none' }}>(optional)</span>
                    </label>
                    <textarea id="message" name="message" rows={3}
                      placeholder="More calls, more walk-ins, no idea where to start…"
                      value={form.message} onChange={e => setForm({ ...form, message:e.target.value })}
                      style={{ ...inputStyle, resize:'none' }}
                      onFocus={focus} onBlur={blur}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{ display:'flex', alignItems:'flex-start', gap:'10px',
                      background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.3)',
                      borderRadius:'8px', padding:'13px 15px' }}>
                      <AlertCircle size={17} color="#F87171" style={{ marginTop:'1px', flexShrink:0 }}/>
                      <span style={{ fontFamily:SANS, fontSize:'0.84rem', color:'#FCA5A5', lineHeight:1.6 }}>
                        That didn&apos;t send — something went wrong at our end.{' '}
                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                          style={{ color:'#FCA5A5', textDecoration:'underline' }}>
                          Message us on WhatsApp
                        </a>{' '}
                        and we&apos;ll pick it up straight away.
                      </span>
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                      padding:'15px', borderRadius:'9px', background:CYAN, color:BG,
                      fontFamily:SANS, fontWeight:700, fontSize:'0.95rem',
                      border:'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1, transition:'all 0.25s' }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Get My Free Check'}
                    {status !== 'sending' && <ArrowRight size={16}/>}
                  </button>

                  <p style={{ fontFamily:SANS, fontSize:'0.78rem', color:MUTED,
                    textAlign:'center', margin:0, lineHeight:1.6 }}>
                    We&apos;ll only use your number to send the check and follow up once.
                    No lists, no spam.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      label:'Services',
      items:[
        { t:'Google Business Profile', h:'#services' },
        { t:'Local SEO',               h:'#services' },
        { t:'Content & Blogs',         h:'#services' },
        { t:'Website Fixes',           h:'#services' },
        { t:'Google & Meta Ads',       h:'#services' },
      ],
    },
    {
      label:'Company',
      items:[
        { t:'The Work', h:'#work'    },
        { t:'Pricing',  h:'#pricing' },
        { t:'Process',  h:'#process' },
        { t:'Contact',  h:'#contact' },
      ],
    },
    {
      label:'Get in touch',
      items:[
        { t:'WhatsApp',            h:waLink()                    },
        ...(CONTACT.phoneE164 ? [{ t:CONTACT.phoneDisplay, h:`tel:${CONTACT.phoneE164}` }] : []),
        { t:CONTACT.email,         h:`mailto:${CONTACT.email}`   },
        { t:'Chandigarh, India',   h:'#contact'                  },
      ],
    },
  ];

  return (
    <footer style={{ background:BG, borderTop:`1px solid ${BORDER}` }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'64px 24px 90px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>
          <div style={{ display:'grid', gap:'48px', gridTemplateColumns:'1fr' }}
            className="grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div style={{ marginBottom:'16px' }}><Logo/></div>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.88rem', color:MUTED,
                lineHeight:1.75, maxWidth:'280px' }}>
                SEO and digital marketing for professional firms across Chandigarh,
                Mohali and Panchkula. Published prices, no lock-in, accounts in your name.
              </p>
            </div>

            {cols.map(col => (
              <div key={col.label}>
                <p style={{ fontFamily:MONO, fontSize:'0.6rem', letterSpacing:'0.2em',
                  textTransform:'uppercase', color:'#2D3748', marginBottom:'16px' }}>
                  {col.label}
                </p>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex',
                  flexDirection:'column', gap:'10px' }}>
                  {col.items.map(item => (
                    <li key={item.t}>
                      <a href={item.h}
                        {...(item.h.startsWith('http')
                          ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                        style={{ fontFamily:SANS, fontSize:'0.86rem', color:MUTED,
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

          <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:'28px' }}>
            <p style={{ fontFamily:MONO, fontSize:'0.65rem', color:'#2D3748',
              letterSpacing:'0.1em', margin:0 }}>
              © {new Date().getFullYear()} RANKFLOW · CHANDIGARH, INDIA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   ROOT
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <Services />
      <Pricing />
      <Work />
      <Process />
      <WhyUs />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
