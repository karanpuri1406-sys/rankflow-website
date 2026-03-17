'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Menu, X, Search, Brain,
  Globe2, BarChart3, Target, Layers, CheckCircle2,
  TrendingUp, Star, Shield, Clock,
} from 'lucide-react';

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
    <a href="#" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
      {/* Trending-up chart in rounded square */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
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

  const links = ['Services','Process','Pricing','Results','Contact'];

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

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems:'center', gap:'2px' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:SANS, fontSize:'0.9rem', color:'#94A3B8',
                padding:'8px 16px', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >{l}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" className="hidden md:flex"
          style={{ alignItems:'center', gap:'8px', fontFamily:SANS, fontWeight:600,
            fontSize:'0.88rem', background:CYAN, color:BG,
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
          Free Audit <ArrowRight size={15}/>
        </a>

        <button className="md:hidden"
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
                <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                  style={{ fontFamily:SANS, color:'#94A3B8', padding:'13px 0',
                    borderBottom:`1px solid ${BORDER}`, textDecoration:'none', fontSize:'0.95rem' }}>
                  {l}
                </a>
              ))}
              <a href="#contact"
                style={{ marginTop:'16px', background:CYAN, color:BG, padding:'13px',
                  textAlign:'center', borderRadius:'8px', fontFamily:SANS, fontWeight:700, textDecoration:'none' }}>
                Get Free Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ──────────────────────────────────────────────
   HERO  —  full-screen video background
   ────────────────────────────────────────────── */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  return (
    <section style={{ position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', overflow:'hidden', background:BG }}>

      {/* ── Video background ── */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          poster="/hero-mobile.png"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        >
          <source src="/hero.mp4" type="video/mp4"/>
        </video>

        {/* Dark gradient overlay — heavier top/bottom, lighter mid to show video */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(5,7,14,0.80) 0%, rgba(5,7,14,0.48) 35%, rgba(5,7,14,0.42) 60%, rgba(5,7,14,0.95) 100%)',
        }}/>
        {/* Edge vignette */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, rgba(5,7,14,0.6) 100%)',
        }}/>
      </div>

      {/* ── Hero content ── */}
      <div style={{
        position:'relative', zIndex:10, flex:1,
        display:'flex', flexDirection:'column', justifyContent:'center',
        maxWidth:'1200px', margin:'0 auto', padding:'130px 24px 0', width:'100%',
      }}>
        {/* Label badge */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'30px' }}>
          <span className="animate-pulse" style={{
            width:'7px', height:'7px', borderRadius:'50%', background:CYAN, display:'block', flexShrink:0,
          }}/>
          <span style={{ fontFamily:MONO, fontSize:'0.7rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN }}>
            AI-Powered SEO Agency · Chandigarh, India
          </span>
        </motion.div>

        {/* Headline — 3 staggered lines */}
        <div style={{ marginBottom:'26px' }}>
          {[
            { text:'The SEO Agency',  color:WHITE },
            { text:'Built for',       color:WHITE },
            { text:'SaaS Growth.',    color:CYAN  },
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

        {/* Sub-description */}
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.76 }}
          style={{
            fontFamily:SANS, fontWeight:300,
            fontSize:'clamp(1rem, 1.8vw, 1.18rem)',
            color:'#E2E8F0', lineHeight:1.78,
            maxWidth:'540px', marginBottom:'40px',
            textShadow:'0 1px 14px rgba(0,0,0,0.6)',
          }}
        >
          We help SaaS and tech startups dominate search rankings using AI-powered workflows —
          delivering{' '}
          <span style={{ color:WHITE, fontWeight:500 }}>3× faster results</span>{' '}
          than traditional agencies, with complete visibility into every move we make.
        </motion.p>

        {/* CTA buttons */}
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
            Get Your Free SEO Audit <ArrowRight size={16}/>
          </a>
          <a href="#services"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'15px 32px', borderRadius:'9px',
              border:'1px solid rgba(255,255,255,0.24)', color:WHITE,
              fontFamily:SANS, fontWeight:500, fontSize:'0.95rem',
              textDecoration:'none', transition:'all 0.25s',
              background:'rgba(255,255,255,0.07)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.13)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.24)';
            }}
          >
            Explore Services <ChevronDown size={16}/>
          </a>
        </motion.div>

        {/* Social proof + stats */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05 }}
          style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'28px',
            borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'32px', maxWidth:'700px' }}>
          {/* Stars */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ display:'flex', gap:'3px' }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={13} style={{ fill:'#F59E0B', color:'#F59E0B' }}/>
              ))}
            </div>
            <span style={{ fontFamily:SANS, fontSize:'0.82rem', color:'#94A3B8' }}>
              4.9/5 · 30+ clients
            </span>
          </div>

          <div style={{ width:'1px', height:'28px', background:'rgba(255,255,255,0.1)' }}/>

          {/* Stats */}
          {[
            { n:'3×',   l:'Faster results' },
            { n:'40%',  l:'Avg traffic lift' },
            { n:'150+', l:'Pages optimized' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.5rem', color:WHITE, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:SANS, fontSize:'0.75rem', color:'#64748B', marginTop:'3px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
    'Technical SEO','AI Content Engine','GEO Optimization',
    'Link Building','Local SEO','Programmatic SEO',
    'Core Web Vitals','Real-Time Reports','SaaS Specialists','30-Day Results',
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
    { Icon:Search,   title:'Technical SEO',      desc:'AI-powered site crawls, Core Web Vitals fixes, schema markup, and prioritised action reports — not just a list of problems.' },
    { Icon:Brain,    title:'AI Content Engine',  desc:'Claude-assisted articles that rank. Every piece is human-reviewed for E-E-A-T accuracy and originality before it goes live.' },
    { Icon:Globe2,   title:'GEO Optimization',   desc:'Optimise for Google AI Overviews, ChatGPT Search, and Perplexity citations. The future of search — we\'re already in it.' },
    { Icon:BarChart3,title:'Link Building',       desc:'5–10 quality backlinks per month through outreach, digital PR, and niche edits. Authority that compounds month over month.' },
    { Icon:Target,   title:'Local SEO',           desc:'Dominate Chandigarh Tricity and beyond. GBP optimisation, local citations, map pack strategy, and review management.' },
    { Icon:Layers,   title:'Programmatic SEO',   desc:'Scale content 100× with data-driven templates. Perfect for SaaS comparison pages, directories, and location landings.' },
  ];

  return (
    <section id="services" style={{ background:BG, padding:'100px 0', position:'relative' }}>
      {/* Subtle dot grid decoration */}
      <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.4, pointerEvents:'none' }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', position:'relative' }}>
        {/* Heading */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginBottom:'64px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            What We Do
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Every service,{' '}
            <span style={{ color:CYAN }}>powered by AI.</span>
          </h2>
          <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.05rem', color:BODY,
            marginTop:'16px', maxWidth:'480px', lineHeight:1.75 }}>
            Not &ldquo;AI-flavoured&rdquo; marketing. Claude is integrated at every delivery step.
          </p>
        </motion.div>

        {/* 3 × 2 grid */}
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
   PROCESS
   ────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n:'01', title:'Free Audit',           desc:'AI-powered 5-point check: technical health, keyword gaps, competitor analysis, on-page score, speed. 48h turnaround. Zero commitment.' },
    { n:'02', title:'Strategy & Kickoff',   desc:'90-day growth roadmap, KPI targets, and a 45-min strategy call. You know exactly what we do and why before we begin.' },
    { n:'03', title:'AI-Led Execution',     desc:'Crawls, content pipeline, link outreach, and GEO optimisation — all tracked in a live client dashboard.' },
    { n:'04', title:'Report & Scale',       desc:'Monthly report with traffic, rankings, ROI attribution, and next-step recommendations. We advise — not just report.' },
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
            From audit to traction{' '}
            <span style={{ color:CYAN }}>in 30 days.</span>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:'2px',
          background:BORDER, borderRadius:'16px', overflow:'hidden' }}>
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.12 }}
              style={{ background:BG_ALT, padding:'36px 28px', position:'relative' }}>
              {/* Ghost number */}
              <span style={{ fontFamily:SYNE, fontWeight:800, fontSize:'3.5rem',
                color:'rgba(255,255,255,0.03)', position:'absolute', top:'16px', right:'20px',
                lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{s.n}</span>

              {/* Step badge */}
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
   WHY US  (trust + stats)
   ────────────────────────────────────────────── */
function WhyUs() {
  const stats = [
    { n:'3×',   l:'Faster than traditional agencies',   sub:'AI workflows compress timelines' },
    { n:'40%',  l:'Average organic traffic increase',   sub:'Across all active clients' },
    { n:'98%',  l:'Client retention rate',              sub:'We keep clients because we deliver' },
    { n:'48h',  l:'Free audit turnaround',              sub:'No waiting, no forms, real data' },
  ];

  const reasons = [
    { Icon:TrendingUp, t:'Speed-first delivery',    d:'AI tools compress months of work into weeks.' },
    { Icon:Shield,     t:'Zero vanity metrics',     d:'GA4 + GSC data, not made-up scores.' },
    { Icon:Brain,      t:'AI + human quality',      d:'Claude drafts. Experts review. Quality guaranteed.' },
    { Icon:Clock,      t:'Full transparency',       d:'Every action logged in your live dashboard.' },
  ];

  return (
    <section style={{ background:BG, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',
            gap:'1px', background:BORDER, borderRadius:'16px', overflow:'hidden', marginBottom:'80px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background:BG, padding:'40px 28px' }}>
              <div style={{ fontFamily:SYNE, fontWeight:800,
                fontSize:'clamp(1.8rem, 3vw, 2.6rem)', color:CYAN, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:SYNE, fontWeight:600, fontSize:'1rem',
                color:WHITE, marginTop:'8px', marginBottom:'4px' }}>{s.l}</div>
              <div style={{ fontFamily:SANS, fontSize:'0.82rem', color:MUTED }}>{s.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Why section */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}
          className="grid-cols-1 lg:grid-cols-2">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
              textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
              Why RANKFLOW
            </span>
            <h2 style={{ fontFamily:SYNE, fontWeight:800,
              fontSize:'clamp(1.6rem, 3vw, 2.4rem)', color:WHITE, lineHeight:1.12, marginBottom:'20px' }}>
              We move faster because we work smarter.
            </h2>
            <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.02rem', color:BODY, lineHeight:1.78 }}>
              Traditional SEO agencies are still copy-pasting reports from 2019.
              We&apos;ve rebuilt every process around AI — so your results arrive in weeks, not quarters.
            </p>
            <a href="#contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'28px',
                padding:'13px 26px', borderRadius:'8px', background:CYAN, color:BG,
                fontFamily:SANS, fontWeight:700, fontSize:'0.9rem', textDecoration:'none', transition:'all 0.25s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(34,211,238,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              Get Started Today <ArrowRight size={15}/>
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
   PRICING
   ────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name:'Starter', price:'₹40K – 60K', period:'/month',
      desc:'For early-stage startups and local businesses.',
      features:['Monthly technical SEO audit','On-page optimisation (5 pages)','Keyword research report','Monthly GA4 + GSC report','Email support'],
      highlight:false, badge:null,
    },
    {
      name:'Growth', price:'₹80K – 150K', period:'/month',
      desc:'Full-stack SEO for growing SaaS companies.',
      badge:'Most Popular',
      features:['Everything in Starter','On-page optimisation (10 pages)','10 SEO blog articles / month','Link building (5–10 links / month)','Local SEO & GBP management','Competitor gap analysis','Bi-weekly strategy calls'],
      highlight:true,
    },
    {
      name:'AI Premium', price:'₹150K – 300K', period:'/month',
      desc:'Enterprise AI SEO for serious SaaS scale.',
      features:['Everything in Growth','On-page optimisation (15 pages)','15 SEO blog articles / month','GEO + AI Overview optimisation','Dedicated account manager','CRO & conversion tracking setup','Weekly calls · priority < 2h'],
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
            Transparent pricing.{' '}
            <span style={{ color:CYAN }}>No surprises.</span>
          </h2>
          <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1.02rem', color:BODY,
            marginTop:'14px', maxWidth:'480px', margin:'14px auto 0' }}>
            All plans include a free onboarding audit and a 30-day results review.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
          {plans.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              style={{
                background: p.highlight ? BG : BG,
                border: p.highlight ? `1px solid ${CYAN}40` : `1px solid ${BORDER}`,
                borderRadius:'16px', padding:'36px 30px',
                display:'flex', flexDirection:'column', position:'relative',
                boxShadow: p.highlight ? `0 0 60px rgba(34,211,238,0.08)` : 'none',
              }}
            >
              {p.badge && (
                <div style={{ position:'absolute', top:'-13px', left:'50%', transform:'translateX(-50%)' }}>
                  <span style={{ background:CYAN, color:BG, fontFamily:SYNE, fontWeight:700,
                    fontSize:'0.7rem', padding:'4px 16px', borderRadius:'20px', letterSpacing:'0.04em' }}>
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
                <p style={{ fontFamily:SANS, fontSize:'0.85rem', color:BODY, marginTop:'8px' }}>{p.desc}</p>
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
                    : { border:`1px solid ${BORDER}`, color:WHITE,
                        background:'transparent' }),
                }}
                onMouseEnter={e => {
                  if (p.highlight) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(34,211,238,0.4)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  } else {
                    (e.currentTarget as HTMLElement).style.borderColor = `${CYAN}40`;
                    (e.currentTarget as HTMLElement).style.color = CYAN;
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLElement).style.color = p.highlight ? BG : WHITE;
                }}
              >
                Get Started <ArrowRight size={14}/>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:SANS, fontSize:'0.85rem', color:MUTED, textAlign:'center', marginTop:'28px' }}>
          Not sure which plan?{' '}
          <a href="#contact" style={{ color:CYAN, textDecoration:'none' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
            Start with a free mini-audit
          </a>{' '}
          and we&apos;ll recommend the right tier.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   RESULTS
   ────────────────────────────────────────────── */
function Results() {
  const cases = [
    { client:'SaaS Analytics Tool',  lift:'+218%', metric:'Organic Traffic',  period:'4 months',       accent:'#22D3EE' },
    { client:'Fintech Startup',      lift:'#1',    metric:'Google Ranking',   period:'Target keyword',  accent:'#4ADE80' },
    { client:'EdTech Platform',      lift:'+340%', metric:'Leads from SEO',   period:'6 months',        accent:'#A78BFA' },
    { client:'Chandigarh Clinic',    lift:'3×',    metric:'Map Pack Calls',   period:'60 days',         accent:'#FB923C' },
  ];

  return (
    <section id="results" style={{ background:BG, padding:'100px 0' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginBottom:'64px' }}>
          <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
            textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
            Client Results
          </span>
          <h2 style={{ fontFamily:SYNE, fontWeight:800,
            fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, margin:0 }}>
            Numbers that{' '}
            <span style={{ color:CYAN }}>don&apos;t lie.</span>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'16px' }}>
          {cases.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="card-hover"
              style={{ background:BG_ALT, border:`1px solid ${BORDER}`,
                borderRadius:'14px', padding:'36px 28px' }}>
              <div style={{ display:'block', background:`${c.accent}14`, border:`1px solid ${c.accent}33`,
                borderRadius:'10px', padding:'12px 16px', marginBottom:'14px',
                boxSizing:'border-box' as const, overflow:'hidden' as const }}>
                <div style={{ fontFamily:SYNE, fontWeight:800,
                  fontSize:'2rem', color:c.accent, lineHeight:1 }}>
                  {c.lift}
                </div>
              </div>
              <div style={{ fontFamily:SYNE, fontWeight:600, fontSize:'1rem', color:WHITE, marginBottom:'6px' }}>
                {c.metric}
              </div>
              <div style={{ height:'1px', background:BORDER, margin:'14px 0' }}/>
              <div style={{ fontFamily:SANS, fontWeight:500, fontSize:'0.9rem', color:BODY, marginBottom:'6px' }}>
                {c.client}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:c.accent }}/>
                <span style={{ fontFamily:MONO, fontSize:'0.7rem', color:MUTED, letterSpacing:'0.08em' }}>
                  {c.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT
   ────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:'', email:'', website:'', message:'' });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width:'100%', padding:'13px 16px',
    background:'rgba(255,255,255,0.04)', border:`1px solid ${BORDER}`,
    borderRadius:'8px', color:WHITE,
    fontFamily:SANS, fontSize:'0.9rem', outline:'none',
    transition:'border-color 0.25s',
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = `${CYAN}50`);
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = BORDER);

  return (
    <section id="contact" style={{ background:BG_ALT, padding:'100px 0', position:'relative', overflow:'hidden' }}>
      {/* Top accent line */}
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
        background:`linear-gradient(90deg, transparent, ${CYAN}40, transparent)` }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gap:'64px', alignItems:'start' }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* Left copy */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <span style={{ fontFamily:MONO, fontSize:'0.68rem', letterSpacing:'0.22em',
              textTransform:'uppercase', color:CYAN, display:'block', marginBottom:'14px' }}>
              Free Audit
            </span>
            <h2 style={{ fontFamily:SYNE, fontWeight:800,
              fontSize:'clamp(1.6rem, 3vw, 2.6rem)', color:WHITE, lineHeight:1.1, marginBottom:'20px' }}>
              Get your free<br/>
              <span style={{ color:CYAN }}>SEO health check.</span>
            </h2>
            <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'1rem', color:BODY,
              lineHeight:1.78, marginBottom:'36px' }}>
              We audit your site within 48 hours. No sales call required.
              Real data — not a template report.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {[
                '5-point technical health check',
                'Keyword gap & opportunity analysis',
                'Top 3 competitor benchmark',
                'On-page optimisation score',
                'Speed & Core Web Vitals diagnosis',
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <CheckCircle2 size={16} color={CYAN} strokeWidth={2}/>
                  <span style={{ fontFamily:SANS, fontSize:'0.9rem', color:BODY }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay:0.15 }}>
            <div style={{ background:BG, border:`1px solid ${BORDER}`,
              borderRadius:'16px', padding:'40px' }}>
              {!sent ? (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                  style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    {[
                      { label:'Name',  key:'name',  type:'text',  ph:'Your name' },
                      { label:'Email', key:'email', type:'email', ph:'you@company.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                          letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                          {f.label}
                        </label>
                        <input type={f.type} required placeholder={f.ph}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={{ ...inputStyle, boxSizing:'border-box' as const }}
                          onFocus={focus} onBlur={blur}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      Website URL
                    </label>
                    <input type="url" placeholder="https://yoursite.com" value={form.website}
                      onChange={e => setForm({ ...form, website:e.target.value })}
                      style={{ ...inputStyle, boxSizing:'border-box' as const }}
                      onFocus={focus} onBlur={blur}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily:MONO, fontSize:'0.62rem', color:MUTED,
                      letterSpacing:'0.18em', display:'block', textTransform:'uppercase', marginBottom:'8px' }}>
                      What are you struggling with?
                    </label>
                    <textarea rows={4} placeholder="Low traffic, bad rankings, no idea where to start…"
                      value={form.message} onChange={e => setForm({ ...form, message:e.target.value })}
                      style={{ ...inputStyle, resize:'none', boxSizing:'border-box' as const }}
                      onFocus={focus} onBlur={blur}
                    />
                  </div>

                  <button type="submit"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                      padding:'15px', borderRadius:'9px', background:CYAN, color:BG,
                      fontFamily:SANS, fontWeight:700, fontSize:'0.95rem',
                      border:'none', cursor:'pointer', transition:'all 0.25s' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(34,211,238,0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    Get My Free Audit <ArrowRight size={16}/>
                  </button>

                  <p style={{ fontFamily:SANS, fontSize:'0.78rem', color:MUTED,
                    textAlign:'center', margin:0 }}>
                    No spam. No sales call. Audit delivered in 48 hours.
                  </p>
                </form>
              ) : (
                <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                  style={{ padding:'40px 0', textAlign:'center' }}>
                  <div style={{ width:'56px', height:'56px', borderRadius:'12px', margin:'0 auto 24px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(34,211,238,0.08)', border:`1px solid ${CYAN}30` }}>
                    <CheckCircle2 size={28} color={CYAN} strokeWidth={1.5}/>
                  </div>
                  <h3 style={{ fontFamily:SYNE, fontWeight:800, fontSize:'1.5rem',
                    color:WHITE, marginBottom:'12px' }}>Audit request received!</h3>
                  <p style={{ fontFamily:SANS, fontSize:'0.92rem', color:BODY, lineHeight:1.7, margin:0 }}>
                    Your free SEO audit will be ready within 48 hours.<br/>
                    We&apos;ll reach out at{' '}
                    <span style={{ color:CYAN }}>{form.email}</span>.
                  </p>
                </motion.div>
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
    { label:'Services', items:['Technical SEO','AI Content Engine','GEO Optimization','Link Building','Local SEO'] },
    { label:'Company',  items:['About','Case Studies','Blog','Contact','Pricing'] },
    { label:'Contact',  items:['Chandigarh, India','hello@rankflow.co','LinkedIn','Twitter / X'] },
  ];

  return (
    <footer style={{ background:BG, borderTop:`1px solid ${BORDER}` }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'64px 24px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>
          <div style={{ display:'grid', gap:'48px', gridTemplateColumns:'1fr' }}
            className="grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <div style={{ marginBottom:'16px' }}><Logo/></div>
              <p style={{ fontFamily:SANS, fontWeight:300, fontSize:'0.88rem', color:MUTED,
                lineHeight:1.75, maxWidth:'260px' }}>
                AI-augmented SEO for SaaS companies. Faster results, full transparency, zero vanity metrics.
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
                    <li key={item}>
                      <a href="#" style={{ fontFamily:SANS, fontSize:'0.86rem', color:MUTED,
                        textDecoration:'none', transition:'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:'28px',
            display:'flex', flexWrap:'wrap', justifyContent:'space-between',
            alignItems:'center', gap:'16px' }}>
            <p style={{ fontFamily:MONO, fontSize:'0.65rem', color:'#2D3748',
              letterSpacing:'0.1em', margin:0 }}>
              © 2026 RANKFLOW. ALL RIGHTS RESERVED.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <span className="animate-pulse" style={{ width:'7px', height:'7px',
                borderRadius:'50%', background:'#4ADE80', display:'block' }}/>
              <span style={{ fontFamily:MONO, fontSize:'0.65rem', color:'#2D3748', letterSpacing:'0.1em' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
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
    <main className="noise-overlay">
      <Nav />
      <Hero />
      <Ticker />
      <Services />
      <Process />
      <WhyUs />
      <Pricing />
      <Results />
      <Contact />
      <Footer />
    </main>
  );
}
