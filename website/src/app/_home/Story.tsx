'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { NotMentionedBurst } from './art';
import { AnswerPhone, BuyerOnPhone, KaranHero, OwnerAtDesk, RingingPhone, ShockedOwner } from './story-art';
import s from './home.module.css';
import st from './story.module.css';

/* Time between one panel starting and the next, when several are on screen at once. */
const STEP_MS = 1100;

/* A motion comic: each panel plays once it is on screen, one after another,
   so on desktop the strip reads left to right and on a phone each panel
   plays as it scrolls in. Without JS, or with reduced motion, every panel
   simply shows its finished frame. */
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
        <div {...panel(0)} className={`${st.panel} ${st.p1} ${st.bgBlue}`}>
          <span className={st.cap}>Chandigarh. Monday, 9 a.m.</span>
          <p className={`${s.balloon} ${st.pop} ${st.b1}`}>
            Still ranking #3 on Google… so why has the phone gone quiet?
          </p>
          <OwnerAtDesk className={st.art} />
        </div>

        <div {...panel(1)} className={`${st.panel} ${st.p2} ${st.bgPink}`}>
          <span className={st.cap}>Meanwhile, across town…</span>
          <p className={`${st.search} ${st.pop}`}>
            <span className={st.searchIcon} aria-hidden="true">⌕</span>
            <span className={st.typed}>best CA firm in Chandigarh?</span>
            <span className={st.caret} aria-hidden="true" />
          </p>
          <BuyerOnPhone className={st.art} />
        </div>

        <div {...panel(2)} className={`${st.panel} ${st.p3} ${st.bgYellow}`}>
          <span className={st.cap}>The AI answers in seconds</span>
          <p className={`${s.balloon} ${st.pop} ${st.b3}`}>Perfect. I’ll call the first one.</p>
          <AnswerPhone className={st.art} />
        </div>

        <div {...panel(3)} className={`${st.panel} ${st.p4} ${st.bgBlue}`}>
          <span className={st.cap}>Two streets away…</span>
          <span className={`${st.sfx} ${st.sfx1}`} aria-hidden="true">Ring!</span>
          <span className={`${st.sfx} ${st.sfx2}`} aria-hidden="true">Ring!</span>
          <p className={`${s.balloon} ${st.pop} ${st.b4}`}>
            Hello, <span className={st.redact}>hidden</span> &amp; Co.!
          </p>
          <RingingPhone className={st.art} />
        </div>

        <div {...panel(4)} className={`${st.panel} ${st.p5}`}>
          <div className={st.rays} aria-hidden="true" />
          <p className={`${s.balloon} ${st.pop} ${st.b5}`}>We’re not even on the list?!</p>
          <div className={st.face}><ShockedOwner className={st.art} /></div>
          <div className={st.burstWrap}>
            <NotMentionedBurst className={st.burst} />
          </div>
        </div>

        <div {...panel(5)} className={`${st.panel} ${st.p6} ${st.bgHero}`}>
          <span className={`${st.cap} ${st.capWhite}`}>Enter: Rankflow.</span>
          <p className={`${s.balloon} ${st.pop} ${st.b6}`}>
            Let’s find out why. The first check is on us.
          </p>
          <div className={st.slideIn}><KaranHero className={st.art} /></div>
          <a href="#request" className={`${s.btn} ${s.btnYellow} ${st.panelCta}`}>Run my free check →</a>
        </div>
      </div>

      <figcaption className={st.note}>
        Illustrative story, names hidden. Your free check uses live answers for your own category.
      </figcaption>
    </figure>
  );
}

