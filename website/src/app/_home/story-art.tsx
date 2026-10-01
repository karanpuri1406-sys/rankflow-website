/* Panel art for the "missing clicks" comic strip. Pure SVG; the class names
   from story.module.css are the parts that move once a panel plays. */
import st from './story.module.css';
import { INK, RED, YELLOW } from './art';

const SKIN = '#F2C9A0';
const HAIR = '#1B1B1B';
const BLUE = '#1E5BD8';
const WOOD = '#C98A4B';
const font = { fontFamily: 'var(--font-bangers), cursive' };

type ArtProps = { className?: string };

/* 1 — the owner: ranking fine, enquiries falling, phone silent. */
export function OwnerAtDesk({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <path d="M84 200 Q90 146 148 142 Q206 146 212 200 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <path d="M142 146 L154 146 L152 176 L148 182 L144 176 Z" fill={RED} stroke={INK} strokeWidth={2.5} />
      <circle cx={148} cy={100} r={38} fill={SKIN} stroke={INK} strokeWidth={3} />
      <path d="M110 94 Q112 56 150 56 Q188 56 186 94 Q172 76 150 78 Q126 76 110 94 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      <path d="M126 96 L140 90 M170 96 L156 90" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={136} cy={104} r={4} fill={INK} />
      <circle cx={160} cy={104} r={4} fill={INK} />
      <path d="M136 124 Q142 118 148 124 Q154 130 160 124" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path className={st.drip} d="M192 80 Q198 92 192 98 Q186 92 192 80 Z" fill="#5AA9FF" stroke={INK} strokeWidth={2} />

      <rect x={-10} y={196} width={420} height={70} fill={WOOD} stroke={INK} strokeWidth={3} />

      <rect x={24} y={184} width={46} height={13} rx={4} fill={INK} />
      <g className={st.thought}>
        <ellipse cx={47} cy={160} rx={26} ry={14} fill="#FFFFFF" stroke={INK} strokeWidth={2.5} />
        <circle cx={47} cy={180} r={3.5} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
        <circle className={st.dot} style={{ ['--dd' as string]: '0.8s' }} cx={36} cy={160} r={3.6} fill={INK} />
        <circle className={st.dot} style={{ ['--dd' as string]: '1s' }} cx={47} cy={160} r={3.6} fill={INK} />
        <circle className={st.dot} style={{ ['--dd' as string]: '1.2s' }} cx={58} cy={160} r={3.6} fill={INK} />
      </g>

      <rect x={226} y={92} width={150} height={100} rx={5} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <text x={238} y={118} fontSize={17} fill={INK} style={font}>Rank #3</text>
      <polygon points="300,117 307,104 314,117" fill={BLUE} stroke={INK} strokeWidth={1.5} />
      <line x1={236} y1={128} x2={366} y2={128} stroke="#D9D9D9" strokeWidth={2} />
      <text x={238} y={148} fontSize={14} fill={INK} style={font}>Enquiries</text>
      <polyline className={st.draw} points="240,156 268,162 290,158 318,176 350,182" fill="none" stroke={RED}
        strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path className={st.arrowHead} d="M340 176 L351 183 L339 187" fill="none" stroke={RED} strokeWidth={4}
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M218 192 L384 192 L398 204 L204 204 Z" fill="#B9C2CF" stroke={INK} strokeWidth={3} />
    </svg>
  );
}

/* 2 — a buyer on the sofa, typing a question to an AI assistant. */
export function BuyerOnPhone({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <rect x={58} y={128} width={284} height={150} rx={30} fill={YELLOW} stroke={INK} strokeWidth={3} />
      <path d="M58 200 L342 200" stroke={INK} strokeWidth={3} />
      <path d="M130 262 Q136 172 200 166 Q264 172 270 262 Z" fill={BLUE} stroke={INK} strokeWidth={3} />
      <path d="M184 168 Q200 186 216 168" fill="none" stroke={INK} strokeWidth={3} />
      <circle cx={200} cy={72} r={15} fill={HAIR} stroke={INK} strokeWidth={3} />
      <circle cx={200} cy={118} r={36} fill={SKIN} stroke={INK} strokeWidth={3} />
      <path d="M164 114 Q164 78 200 78 Q236 78 236 114 Q226 94 200 96 Q174 94 164 114 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      <circle cx={165} cy={128} r={4} fill={YELLOW} stroke={INK} strokeWidth={1.5} />
      <circle cx={235} cy={128} r={4} fill={YELLOW} stroke={INK} strokeWidth={1.5} />
      <path d="M182 120 Q188 125 194 120 M206 120 Q212 125 218 120" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M193 138 Q200 143 207 138" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <rect x={180} y={176} width={40} height={66} rx={7} fill={INK} />
      <rect className={st.screenGlow} x={185} y={184} width={30} height={48} rx={3} fill="#DCEBFF" />
      <ellipse cx={178} cy={216} rx={9} ry={13} fill={SKIN} stroke={INK} strokeWidth={3} />
      <ellipse cx={222} cy={216} rx={9} ry={13} fill={SKIN} stroke={INK} strokeWidth={3} />
    </svg>
  );
}

/* 3 — the phone's AI answer: three names, none of them yours. */
export function AnswerPhone({ className }: ArtProps) {
  const rows = [
    { y: 88,  w: 96, d: '0.55s' },
    { y: 128, w: 76, d: '0.85s' },
    { y: 168, w: 88, d: '1.15s' },
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <rect x={150} y={14} width={176} height={290} rx={24} fill={INK} />
      <rect x={162} y={36} width={152} height={260} rx={8} fill="#FFFFFF" />
      <text x={176} y={64} fontSize={17} fill={INK} style={font}>AI answer:</text>
      {rows.map((r, i) => (
        <g key={r.y}>
          <text x={176} y={r.y + 13} fontSize={16} fill={INK} style={font}>{i + 1}.</text>
          <rect className={st.bar} style={{ ['--d' as string]: r.d }} x={194} y={r.y} width={r.w} height={15} fill={INK} />
          <rect className={st.bar} style={{ ['--d' as string]: r.d }} x={194} y={r.y + 21} width={r.w - 18} height={5} fill="#C9C9C9" />
        </g>
      ))}
      <circle className={st.tap} cx={242} cy={96} r={22} fill="none" stroke={RED} strokeWidth={4} />
      <path d="M118 262 Q126 214 160 206 L176 206 Q186 210 182 224 L170 262 Z" fill={SKIN} stroke={INK} strokeWidth={3} />
    </svg>
  );
}

/* 4 — a competitor's phone, ringing off the hook. */
export function RingingPhone({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <rect x={-10} y={204} width={420} height={60} fill={WOOD} stroke={INK} strokeWidth={3} />
      <g className={st.buzz}>
        <path d="M112 118 Q98 146 112 174 M92 106 Q74 146 92 186" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d="M288 118 Q302 146 288 174 M308 106 Q326 146 308 186" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      </g>
      <g className={st.shake}>
        <path d="M136 206 L158 142 L242 142 L264 206 Z" fill={RED} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={200} cy={176} r={22} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
        {[0, 45, 90, 135, 180, 225, 270].map(a => (
          <circle key={a} cx={200 + 13 * Math.cos((a * Math.PI) / 180)} cy={176 + 13 * Math.sin((a * Math.PI) / 180)} r={3} fill={INK} />
        ))}
        <path d="M126 134 Q126 112 150 112 L250 112 Q274 112 274 134 L274 144 L246 144 L240 130 L160 130 L154 144 L126 144 Z"
          fill={INK} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* 5 — the owner, close up, finding out. */
export function ShockedOwner({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <path d="M60 262 Q72 208 200 200 Q328 208 340 262 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <path d="M192 204 L208 204 L205 246 L195 246 Z" fill={RED} stroke={INK} strokeWidth={2.5} />
      <ellipse cx={200} cy={124} rx={78} ry={82} fill={SKIN} stroke={INK} strokeWidth={3.5} />
      <path d="M124 112 Q118 40 200 38 Q284 40 276 112 Q262 76 228 70 Q200 82 172 70 Q138 76 124 112 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      <path d="M158 50 L162 14 L180 44 Z M188 42 L198 4 L212 42 Z M220 44 L238 14 L244 50 Z" fill={HAIR} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M146 86 Q162 70 180 82 M220 82 Q238 70 254 86" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <circle cx={166} cy={112} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle cx={234} cy={112} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <circle className={st.pupil} cx={166} cy={112} r={5} fill={INK} />
      <circle className={st.pupil} cx={234} cy={112} r={5} fill={INK} />
      <ellipse cx={200} cy={168} rx={20} ry={26} fill={INK} />
      <ellipse cx={200} cy={184} rx={12} ry={8} fill={RED} />
      <g transform="rotate(-14 116 166)">
        <ellipse cx={116} cy={166} rx={22} ry={34} fill={SKIN} stroke={INK} strokeWidth={3} />
        <path d="M108 140 L110 160 M120 138 L120 160" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <g transform="rotate(14 284 166)">
        <ellipse cx={284} cy={166} rx={22} ry={34} fill={SKIN} stroke={INK} strokeWidth={3} />
        <path d="M292 140 L290 160 M280 138 L280 160" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <path className={st.flyL} d="M104 74 Q110 86 104 92 Q98 86 104 74 Z" fill="#5AA9FF" stroke={INK} strokeWidth={2} />
      <path className={st.flyR} d="M296 74 Q302 86 296 92 Q290 86 296 74 Z" fill="#5AA9FF" stroke={INK} strokeWidth={2} />
    </svg>
  );
}

/* 6 — Karan arrives, cape and magnifying glass. Same face as the founder portrait. */
export function KaranHero({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 250" preserveAspectRatio="xMidYMax meet" className={className}>
      <path className={st.cape} d="M146 172 Q70 206 48 262 L352 262 Q330 206 254 172 Z" fill={RED} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={188} y={154} width={24} height={30} fill={SKIN} stroke={INK} strokeWidth={3} />
      <path d="M118 262 Q126 186 200 178 Q274 186 282 262 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} />
      <path d="M184 182 L200 200 L216 182" fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={200} cy={228} r={20} fill={YELLOW} stroke={INK} strokeWidth={3} />
      <polyline points="187,236 195,228 202,232 213,218" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={200} cy={110} rx={44} ry={50} fill={SKIN} stroke={INK} strokeWidth={3} />
      <path d="M156 104 Q154 56 200 56 Q248 56 244 104 Q236 82 214 80 Q194 90 172 86 Q162 92 156 104 Z" fill={HAIR} stroke={INK} strokeWidth={3} />
      <path d="M174 98 L190 95 M210 91 Q219 86 228 91" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={182} cy={110} r={4.5} fill={INK} />
      <circle cx={218} cy={110} r={4.5} fill={INK} />
      <path d="M180 132 Q200 150 220 130" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M252 192 Q282 198 304 216 L292 230 Q270 214 246 210 Z" fill="#FFFFFF" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <line x1={302} y1={216} x2={284} y2={178} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <circle cx={304} cy={222} r={11} fill={SKIN} stroke={INK} strokeWidth={3} />
      <circle cx={274} cy={156} r={26} fill="#DCEBFF" stroke={INK} strokeWidth={5} />
      <path className={st.glint} d="M260 146 Q264 136 274 134" fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}
