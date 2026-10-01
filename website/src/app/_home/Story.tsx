'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Answer, Buyer, Dashboard, Doorway, SilentPhone } from './story-art';
import s from './home.module.css';
import st from './story.module.css';

/* Time between one panel starting and the next, when several are on screen at once. */
const STEP_MS = 1500;

/* "The case of the missing clicks" — a six-panel noir motion comic.
   Each panel plays once it is on screen, one after another, so on desktop
   the strip reads left to right and on a phone each panel plays as it
   scrolls in. Without JS, or with reduced motion, every panel simply shows
   its finished frame. */
export default function Story() {
  const gridRef = useRef<HTMLDivElement>(null);
  const played = useRef(new Set<number>());
  const queue = useRef<number[]>([]);
  const visible = useRef(new Set<number>());
  const timer = useRef<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  const pump = useCallback(() => {
    if (timer.current !== null) return;
    const next = () => {
      const i = queue.current.shift();
      if (i === undefined) { timer.current = null; return; }
      played.current.add(i);
      rerender();
      timer.current = window.setTimeout(next, STEP_MS);
    };
    next();
  }, []);

  const enqueue = useCallback((i: number) => {
    if (played.current.has(i) || queue.current.includes(i)) return;
    queue.current.push(i);
    queue.current.sort((a, b) => a - b);
    pump();
  }, [pump]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setAnimated(true);
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        const i = Number((e.target as HTMLElement).dataset.panel);
        if (e.isIntersecting) { visible.current.add(i); enqueue(i); }
        else visible.current.delete(i);
      }
    }, { threshold: 0.4 });
    grid.querySelectorAll('[data-panel]').forEach(p => io.observe(p));
    return () => {
      io.disconnect();
      if (timer.current !== null) clearTimeout(timer.current);
      timer.current = null;
    };
  }, [enqueue]);

  function replay() {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    queue.current = [];
    played.current.clear();
    rerender();
    /* Let the browser style the reset frame first, so the animations restart. */
    window.setTimeout(() => [...visible.current].sort((a, b) => a - b).forEach(enqueue), 80);
  }

  const panel = (i: number) => ({
    'data-panel': i,
    'data-played': played.current.has(i) ? '' : undefined,
  });

  return (
    <figure className={st.story} aria-label="Comic strip: the case of the missing clicks">
      <div className={st.storyHead}>
        <span className={s.caption}>Chapter one: The case of the missing clicks</span>
        {animated && (
          <button type="button" onClick={replay} className={st.replay}>↻ Replay</button>
        )}
      </div>

      <div ref={gridRef} className={st.grid} data-animated={animated ? '' : undefined}>
        <div {...panel(0)} className={`${st.panel} ${st.p1}`}>
          <SilentPhone className={st.art} />
          <p className={`${st.cap} ${st.top}`} style={{ ['--d' as string]: '0.6s' }}>Chandigarh. 9:04 a.m.</p>
          <p className={`${st.cap} ${st.bottom} ${st.right}`} style={{ ['--d' as string]: '1.4s' }}>
            The phone hadn’t rung in eleven days.
          </p>
        </div>

        <div {...panel(1)} className={`${st.panel} ${st.p2}`}>
          <Dashboard className={st.art} />
          <p className={`${st.cap} ${st.top}`} style={{ ['--d' as string]: '0.5s' }}>
            The rankings said nothing had changed.
          </p>
          <p className={`${st.cap} ${st.bottom} ${st.right}`} style={{ ['--d' as string]: '2.2s' }}>
            The enquiries said otherwise.
          </p>
        </div>

        <div {...panel(2)} className={`${st.panel} ${st.p3}`}>
          <Buyer className={st.art} />
          <p className={`${st.cap} ${st.top}`} style={{ ['--d' as string]: '0.5s' }}>
            Across town, a buyer had a question.
          </p>
          <p className={st.query}>
            <span className={st.typed}>Who’s the best CA firm in Chandigarh?</span>
            <span className={st.caret} aria-hidden="true" />
          </p>
          <p className={`${st.cap} ${st.bottom}`} style={{ ['--d' as string]: '2.6s' }}>
            She didn’t search. She asked.
          </p>
        </div>

        <div {...panel(3)} className={`${st.panel} ${st.p4}`}>
          <Answer className={st.art} />
          <p className={`${st.cap} ${st.top}`} style={{ ['--d' as string]: '0.3s' }}>Four seconds later.</p>
          <p className={`${st.cap} ${st.bottom}`} style={{ ['--d' as string]: '2s' }}>
            Three names. Each one cited. Polite, confident, final.
          </p>
        </div>

        <div {...panel(4)} className={`${st.panel} ${st.p5}`}>
          <div className={st.reveal}>
            <p className={st.revealLine} style={{ ['--d' as string]: '0.3s' }}>His firm</p>
            <p className={st.revealLine} style={{ ['--d' as string]: '0.8s' }}>wasn’t</p>
            <p className={`${st.revealLine} ${st.revealRed}`} style={{ ['--d' as string]: '1.3s' }}>one of them.</p>
            <p className={st.revealSub} style={{ ['--d' as string]: '2.2s' }}>
              Not on page two. Not in a footnote. Nowhere.
            </p>
          </div>
        </div>

        <div {...panel(5)} className={`${st.panel} ${st.p6}`}>
          <Doorway className={st.art} />
          <div className={st.detective}>
            <p className={`${st.cap} ${st.inline}`} style={{ ['--d' as string]: '1.6s' }}>That’s where I come in.</p>
            <p className={`${st.cap} ${st.inline}`} style={{ ['--d' as string]: '2.3s' }}>
              I find out who the machine trusts, and why. Then I fix what’s keeping you off the list.
            </p>
            <p className={st.signature} style={{ ['--d' as string]: '2.9s' }}>— Karan Puri, Rankflow</p>
            <a href="#request" className={`${s.btn} ${s.btnYellow} ${st.panelCta}`}>Open your case — free →</a>
          </div>
        </div>
      </div>

      <figcaption className={st.note}>
        Illustrative story, names hidden. Your free check uses live answers for your own category.
      </figcaption>
    </figure>
  );
}
