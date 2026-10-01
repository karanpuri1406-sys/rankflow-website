import { CONTACT, OFFER, waLink } from '@/config';
import { anton, bangers, comicNeue, specialElite } from './_home/fonts';
import { Burst, RED } from './_home/art';
import Story from './_home/Story';
import FreeCheckForm from './_home/FreeCheckForm';
import s from './_home/home.module.css';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/* ──────────────────────────────────────────────
   HEADER
   ────────────────────────────────────────────── */
function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.brand}>
          <a href="#top" className={s.logo}>Rankflow</a>
          <span className={s.issue}>No. 1 · Oct 2026 · ₹0</span>
        </div>
        <nav aria-label="Sections" className={s.nav}>
          <a href="#evidence">The evidence</a>
          <a href="#method">The method</a>
          <a href="#prices">The prices</a>
          <a href="#cases">Case files</a>
        </nav>
        <a href="#request" className={`${s.btn} ${s.btnYellow} ${s.headerCta}`}>Free check!</a>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────
   CHAPTER ONE — headline + comic strip
   ────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className={s.section}>
      <div className={s.heroInner}>
        <div className={s.heroTop}>
          <h1 id="hero-title" className={s.h1}>
            <span className={s.h1Line1}>AI gives your buyers three names.</span>
            <span className={s.h1Line2}>Is yours one of them?</span>
          </h1>
          <div className={s.heroAside}>
            <p className={s.lead}>
              Rankflow checks what ChatGPT, Perplexity and Google’s AI tell your customers about
              your business, then fixes whatever keeps you out of the answer. Prices on this page.
              Month to month.
            </p>
            <div className={s.ctaRow}>
              <a href="#request" className={`${s.btn} ${s.btnRed} ${s.btnBig}`}>Run my free check! →</a>
              <a href={waLink()} {...external} className={s.btn}>WhatsApp us</a>
            </div>
            <ul className={s.ticks}>
              <li>Back in 2 working days</li>
              <li>No call needed</li>
              <li>Cancel any month</li>
            </ul>
          </div>
        </div>
        <Story />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   §1 — THE EVIDENCE
   ────────────────────────────────────────────── */
function Evidence() {
  const stats = [
    { burst:['8%'],     label:'8 percent',          size:58, text:'of searches showing an AI summary got a click on a result. Without one: 15%.', src:'Pew Research Center · 68,879 searches · US' },
    { burst:['1%'],     label:'1 percent',          size:58, text:'clicked a link inside the AI summary itself. The answer was the destination.', src:'Pew Research Center · US' },
    { burst:['−34.5%'], label:'minus 34.5 percent', size:42, text:'clicks to the top-ranking page once an AI Overview appeared above it.',      src:'Ahrefs · 300,000 keywords · US' },
  ];

  return (
    <section id="evidence" aria-labelledby="evidence-title" className={`${s.section} ${s.sectionPad} ${s.dotsRed}`}>
      <div className={s.wrap}>
        <span className={s.caption}>§1 · The evidence</span>
        <h2 id="evidence-title" className={s.h2Light}>Your ranking held. The click went to the answer.</h2>
        <div className={s.statGrid}>
          {stats.map(st => (
            <div key={st.label} className={s.statCard}>
              <Burst lines={st.burst} label={st.label} fontSize={st.size} className={s.statBurst} />
              <p className={s.statText}>{st.text}</p>
              <p className={s.source}>{st.src}</p>
            </div>
          ))}
        </div>
        <div className={s.bigBalloon}>
          <p className={s.bigBalloonTitle}>
            Search engines rank pages. AI engines <span className={s.red}>cite sources!</span>
          </p>
          <p className={s.bigBalloonText}>
            A page can rank well and still be useless to a model that needs a clear fact it can
            quote. Most sites were never written to be quoted.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   EXHIBIT A — the sample report
   ────────────────────────────────────────────── */
type Cell = { named: false } | { named: true; rank: number };
const NO: Cell = { named: false };

const SAMPLE: { q: string; cells: [Cell, Cell, Cell] }[] = [
  { q:'Best accounting firm for startups',        cells:[NO, NO, NO] },
  { q:'Accountant for small-business tax filing', cells:[NO, { named:true, rank:3 }, NO] },
  { q:'Who can handle my company registration?',  cells:[NO, NO, NO] },
  { q:'Affordable accountant near me',            cells:[NO, NO, { named:true, rank:2 }] },
];

function Report() {
  return (
    <section aria-labelledby="report-title" className={`${s.section} ${s.sectionPad}`}>
      <div className={s.reportRow}>
        <div className={s.reportCopy}>
          <span className={s.caption}>Exhibit A</span>
          <h2 id="report-title" className={s.h2}>This is what you get.</h2>
          <p className={s.lead}>
            Every buying question your customers ask, run through three AI engines. Who gets named.
            Who gets cited. Whether you appear. And the first thing to fix.
          </p>
          <p className={s.quoteBalloon}>
            “The free check gives you page one of this. The ₹9,000 audit gives you the whole thing.”
          </p>
          <p className={s.quoteBy}>— Rankflow</p>
        </div>

        <figure className={s.report} aria-label="Sample AI visibility report, illustrative">
          <span className={s.stamp} aria-hidden="true">Illustrative!</span>
          <div className={s.reportHead}>
            <p className={s.reportTitle}>Accounting firms</p>
            <p className={s.reportSub}>12 buying questions × 3 AI engines = 36 answers</p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Buying question</th>
                  <th scope="col">ChatGPT</th>
                  <th scope="col">Perplexity</th>
                  <th scope="col">Google AI</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE.map(row => (
                  <tr key={row.q}>
                    <td>{row.q}</td>
                    {row.cells.map((c, i) => c.named
                      ? <td key={i} className={s.yes}>✓ #{c.rank}</td>
                      : <td key={i} className={s.no}>✕ Nope</td>)}
                  </tr>
                ))}
                <tr><td colSpan={4}>+ 8 more questions…</td></tr>
              </tbody>
            </table>
          </div>
          <div className={s.scores}>
            <div className={`${s.score} ${s.dotsPink}`}>
              <div className={s.scoreNum} style={{ color: RED }}>2 / 36</div>
              <div className={s.scoreLabel}>answers that name you</div>
            </div>
            <div className={`${s.score} ${s.dotsBlue}`}>
              <div className={s.scoreNum} style={{ color: '#1E5BD8' }}>27 / 36</div>
              <div className={s.scoreLabel}>answers that name your top competitor</div>
            </div>
          </div>
          <figcaption className={s.firstFix}>
            <span className={s.firstFixTag}>First fix!</span>
            Your firm is described three different ways across your site, Google Business Profile
            and directories. Make it one.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   §2 — THE METHOD
   ────────────────────────────────────────────── */
function Method() {
  const steps = [
    { sfx:'Scan!',  t:'Measure',              d:'We run the questions your buyers really ask through ChatGPT, Perplexity and Google’s AI, and record who gets named and cited.', out:'a question-by-question sheet' },
    { sfx:'Fix!',   t:'Make you readable',    d:'One consistent description of your business, structured data throughout, the same facts on the sites AI already trusts.', out:'fixes live on your site' },
    { sfx:'Write!', t:'Write to be quoted',   d:'Direct answers near the top, facts with sources and dates. Written for people, easy for a model to lift.', out:'citable articles and pages' },
    { sfx:'Build!', t:'Keep the foundations', d:'Technical SEO, speed, internal links, and Google Business Profile where your city matters.', out:'a monthly report' },
  ];

  return (
    <section id="method" aria-labelledby="method-title" className={`${s.section} ${s.sectionPad} ${s.dotsPaper}`}>
      <div className={s.wrap}>
        <span className={s.caption}>§2 · The method</span>
        <h2 id="method-title" className={s.h2}>Four moves. Each one leaves you with something.</h2>
        <ol className={s.cardGrid} style={{ listStyle: 'none', padding: 0, marginBottom: 0 }}>
          {steps.map((st, i) => (
            <li key={st.t} className={s.card}>
              <span className={s.sfx} aria-hidden="true">{st.sfx}</span>
              <span className={s.stepNum} aria-hidden="true">{i + 1}</span>
              <h3 className={s.cardTitle}>{st.t}</h3>
              <p className={s.cardText}>{st.d}</p>
              <p className={s.tag}>You get: {st.out}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   §3 — THE PRICES
   ────────────────────────────────────────────── */
function Prices() {
  const auditHref = OFFER.auditPaymentUrl || '#request';
  const auditLinkProps = OFFER.auditPaymentUrl ? external : {};

  const plans = [
    { name:'Free check',      price:'₹0',      per:'',       head:s.planHead,    items:['1 buying question','3 AI engines','Back in 2 working days'], cta:'Request', href:'#request', btn:'' },
    { name:'Audit', tag:'Start here', price:'₹9,000', per:'once', head:s.planHeadRed, items:['Your full category','Who is named instead of you, and why','Fix list in 7 days','Refund if it tells you nothing new'], cta:'Buy the audit', href:auditHref, btn:s.btnRed, link:auditLinkProps },
    { name:'Foundation',      price:'₹18,000', per:'/month', head:s.planHead,    items:['Structured data, technical SEO','Google Business Profile','2 articles a month','Monthly AI tracking'], cta:'Start', href:'#request', btn:'' },
    { name:'Growth',          price:'₹35,000', per:'/month', head:s.planHead,    items:['Everything in Foundation','4 articles a month','Competitor citation tracking','Landing pages, fortnightly calls'], cta:'Start Growth', href:'#request', btn:s.btnInk, pick:true },
    { name:'Scale',           price:'₹65,000', per:'/month', head:s.planHeadInk, items:['Everything in Growth','8 articles a month','Digital PR for sources AI trusts','Weekly reporting'], cta:'Start', href:'#request', btn:'' },
  ];

  return (
    <section id="prices" aria-labelledby="prices-title" className={`${s.section} ${s.sectionPad}`}>
      <div className={s.wrap}>
        <div className={s.titleRow}>
          <div>
            <span className={s.caption}>§3 · The prices</span>
            <h2 id="prices-title" className={s.h2}>Every price. No secrets.</h2>
          </div>
          <p className={s.titleAside}>
            Start free. If you continue after the audit, its fee comes off your first month.
          </p>
        </div>
        <div className={s.priceGrid}>
          {plans.map(p => (
            <div key={p.name} className={p.pick ? s.planPick : s.plan}>
              {p.pick && <Burst lines={['Our', 'pick!']} label="Our pick" fill={RED} textFill="#FFFFFF" fontSize={30} className={s.pickBurst} />}
              <h3 className={p.head} style={{ margin: 0 }}>
                {p.name}
                {p.tag && <span className={s.planTag}>{p.tag}</span>}
              </h3>
              <div className={s.planBody}>
                <div className={s.priceLine}>
                  <span className={s.planPrice}>{p.price}</span>
                  {p.per && <span className={s.planPer}>{p.per}</span>}
                </div>
                <ul className={s.planList}>
                  {p.items.map(it => <li key={it}>{it}</li>)}
                </ul>
                <a href={p.href} {...(p.link ?? {})} className={`${s.planBtn} ${p.btn}`}>{p.cta}</a>
              </div>
            </div>
          ))}
        </div>
        <p className={s.priceNote}>
          Month to month, cancel any time · every account in your name
          {OFFER.gstNote ? ` · ${OFFER.gstNote}` : ''}
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   §4 — CASE FILES
   ────────────────────────────────────────────── */
const CASES = [
  {
    title: 'Case file #1',
    client: 'Consulting firm · SEO and content',
    rows: [
      ['Found', 'Their contact form had been silently discarding every enquiry, and their sitemap listed 4 of roughly 30 pages.'],
      ['Fixed', 'Both. Then published 7 in-depth guides and 6 pages of interactive tools.'],
      ['Result', 'A real enquiry arrived within weeks.'],
    ],
  },
  {
    title: 'Case file #2',
    client: 'Risk advisory firm · Website and content',
    rows: [
      ['Built', 'An interactive diagnostic: 16 questions across 4 scored dimensions.'],
      ['Published', 'An insights blog with 8 in-depth articles.'],
      ['Measured', 'Analytics tracking 11 specific actions, so enquiries are counted rather than guessed at.'],
    ],
  },
];

function CaseFiles() {
  const { quote, name } = OFFER.testimonial;

  return (
    <section id="cases" aria-labelledby="cases-title" className={`${s.section} ${s.sectionPad} ${s.dotsYellow}`}>
      <div className={s.wrap}>
        <span className={s.captionWhite}>§4 · Case files</span>
        <h2 id="cases-title" className={s.h2Red}>Real problems. Found, then fixed.</h2>
        <div className={s.caseGrid}>
          {CASES.map(cf => (
            <article key={cf.title} className={s.caseCard}>
              <h3 className={s.caseTitle}>{cf.title}</h3>
              <p className={s.caseClient}>{cf.client}</p>
              <dl className={s.caseRows}>
                {cf.rows.map(([label, text]) => (
                  <div key={label} className={s.caseRow}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        {quote && (
          <blockquote className={s.testimonial}>
            “{quote}”
            {name && <cite className={s.testimonialBy}>— {name}</cite>}
          </blockquote>
        )}
        <div className={s.ctaRow}>
          <a href="#request" className={`${s.btn} ${s.btnRed}`}>Open your case — free</a>
          <a href={waLink()} {...external} className={s.btn}>WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   §5 — YOUR TURN
   ────────────────────────────────────────────── */
function Request() {
  return (
    <section id="request" aria-labelledby="request-title" className={`${s.section} ${s.sectionPad} ${s.dotsRed}`}>
      <div className={s.requestRow}>
        <div className={s.requestCopy}>
          <span className={s.caption}>§5 · Your turn</span>
          <h2 id="request-title" className={s.requestTitle}>To be continued… by you!</h2>
          <p className={s.requestText}>
            Get page one of your report, free, in two working days. If AI search doesn’t matter in
            your category yet, we’ll say so in the first reply.
          </p>
          <div className={s.ctaRow}>
            <a href={waLink()} {...external} className={`${s.btn} ${s.btnYellow}`}>WhatsApp us</a>
            {CONTACT.phoneE164 && <a href={`tel:${CONTACT.phoneE164}`} className={s.btn}>{CONTACT.phoneDisplay}</a>}
          </div>
        </div>
        <div className={s.requestForm}>
          <FreeCheckForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <span className={s.theEnd}>The end.</span>
        <p>Rankflow · AI search optimisation and SEO</p>
        <p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          {CONTACT.phoneE164 && <> · <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a></>}
          {' '}· © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className={`${s.page} ${bangers.variable} ${comicNeue.variable} ${specialElite.variable} ${anton.variable}`}>
      <Header />
      <main>
        <Hero />
        <Evidence />
        <Report />
        <Method />
        <Prices />
        <CaseFiles />
        <Request />
      </main>
      <Footer />
      <a href={waLink()} {...external} className={s.waFloat} aria-label="Chat with Rankflow on WhatsApp">WhatsApp</a>
    </div>
  );
}
