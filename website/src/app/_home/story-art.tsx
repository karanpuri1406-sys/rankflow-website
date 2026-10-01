/* Panel art for "The case of the missing clicks", drawn as graphic-novel
   noir: three inks only (night, cream light, Rankflow red), silhouettes
   instead of faces. Every panel shares a 480×360 stage and is cropped to
   its frame with `slice`, so the subject of each sits near the centre.
   Class names from story.module.css mark the parts that move. */
import st from './story.module.css';
import { RED } from './art';

const NIGHT = '#0B0B0C';
const WALL = '#151515';
const CREAM = '#F3EBD8';
const SHADOW = '#050505';
const typewriter = { fontFamily: 'var(--font-typewriter), "Courier New", monospace' };
const condensed = { fontFamily: 'var(--font-condensed), Impact, sans-serif' };

type ArtProps = { className?: string };
const stage = { viewBox: '0 0 480 360', preserveAspectRatio: 'xMidYMid slice' } as const;

/* Light falling through window blinds, as diagonal bands. */
function Blinds({ opacity, clip }: { opacity: number; clip?: string }) {
  return (
    <g fill={CREAM} opacity={opacity} clipPath={clip}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <polygon key={i} points={`${-60 + i * 56},0 ${-28 + i * 56},0 ${172 + i * 56},360 ${140 + i * 56},360`} />
      ))}
    </g>
  );
}

/* 1 — 9:04 a.m., a cutting chai going cold, a phone that hasn't rung. */
export function SilentPhone({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" {...stage} className={className}>
      <defs>
        <clipPath id="sp-desk"><polygon points="0,236 480,218 480,360 0,360" /></clipPath>
      </defs>
      <rect width={480} height={360} fill={WALL} />
      <Blinds opacity={0.1} />
      <polygon points="0,236 480,218 480,360 0,360" fill="#1F1A16" />
      <Blinds opacity={0.2} clip="url(#sp-desk)" />
      <polyline points="0,236 480,218" fill="none" stroke={CREAM} strokeOpacity={0.4} strokeWidth={2} />

      <g transform="translate(150 246)">
        <ellipse cx={0} cy={2} rx={20} ry={4} fill={SHADOW} opacity={0.6} />
        <path d="M-17 -48 L17 -48 L13 0 L-13 0 Z" fill={CREAM} fillOpacity={0.12} stroke={CREAM} strokeOpacity={0.7} strokeWidth={1.5} />
        <path d="M-15.6 -32 L15.6 -32 L13 0 L-13 0 Z" fill="#B9773E" />
        <path className={st.steam} d="M-6 -54 C -14 -66, 2 -74, -6 -90" fill="none" stroke={CREAM} strokeWidth={2} strokeLinecap="round" />
        <path className={st.steam} style={{ ['--sd' as string]: '1.1s' }} d="M4 -54 C 12 -68, -4 -78, 4 -96" fill="none" stroke={CREAM} strokeWidth={2} strokeLinecap="round" />
      </g>

      <g transform="translate(296 270) rotate(-9)">
        <rect x={-70} y={-33} width={140} height={66} rx={11} fill={SHADOW} stroke={CREAM} strokeOpacity={0.45} strokeWidth={1.5} />
        <rect className={st.lockScreen} x={-63} y={-26} width={126} height={52} rx={7} fill="#1C1C1C" />
        <text x={0} y={2} textAnchor="middle" fontSize={20} fill={CREAM} style={typewriter}>9:04</text>
        <text x={0} y={17} textAnchor="middle" fontSize={7.5} fill={CREAM} fillOpacity={0.65} style={typewriter}>No new notifications</text>
      </g>
    </svg>
  );
}

/* 2 — a man in silhouette, lit by a dashboard: ranking flat, enquiries falling. */
export function Dashboard({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" {...stage} className={className}>
      <rect width={480} height={360} fill={NIGHT} />
      <polygon points="196,300 480,250 480,360 120,360" fill={CREAM} opacity={0.08} />
      <g transform="translate(190 64)">
        <rect width={210} height={156} rx={6} fill={CREAM} />
        <rect x={-10} y={156} width={230} height={9} rx={2} fill="#2A2A2A" />
        <text x={16} y={26} fontSize={11} fill={NIGHT} style={typewriter}>GOOGLE RANKING</text>
        <text x={194} y={28} textAnchor="end" fontSize={22} fill={NIGHT} style={condensed}>#3</text>
        <polyline className={st.drawFlat} points="16,48 69,46 126,48 194,47" fill="none" stroke={NIGHT} strokeWidth={2.5} strokeLinecap="round" />
        <text x={16} y={64} fontSize={8} fill={NIGHT} fillOpacity={0.6} style={typewriter}>unchanged · 90 days</text>
        <line x1={16} y1={76} x2={194} y2={76} stroke={NIGHT} strokeOpacity={0.2} />
        <text x={16} y={96} fontSize={11} fill={NIGHT} style={typewriter}>ENQUIRIES</text>
        <polyline className={st.drawFall} points="16,108 48,112 78,110 107,124 135,132 162,144 194,150" fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path
        transform="translate(-16 0)"
        d="M0 360 L0 300 Q10 262 64 252 L72 230 Q46 214 48 170 Q50 112 106 104 Q156 100 166 146 L168 160 L182 184 L170 190 L174 200 L168 204 L172 214 L160 222 Q146 236 136 236 L130 256 Q170 266 196 300 L210 360 Z"
        fill={SHADOW} stroke={CREAM} strokeOpacity={0.55} strokeWidth={2} strokeLinejoin="round"
      />
    </svg>
  );
}

/* 3 — across town, a buyer in silhouette, lit by her phone. */
export function Buyer({ className }: ArtProps) {
  const lights = [[70, 60], [96, 84], [122, 50], [388, 70], [410, 96], [436, 58], [360, 110], [84, 120]];
  return (
    <svg aria-hidden="true" {...stage} className={className}>
      <defs>
        <radialGradient id="buyer-glow">
          <stop offset="0" stopColor={CREAM} stopOpacity={0.32} />
          <stop offset="1" stopColor={CREAM} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={480} height={360} fill={NIGHT} />
      <rect x={40} y={24} width={420} height={140} fill="#141820" stroke="#2A2A2A" strokeWidth={4} />
      <line x1={250} y1={24} x2={250} y2={164} stroke="#2A2A2A" strokeWidth={4} />
      {lights.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={5} height={7} fill={CREAM} opacity={0.55} />)}
      <circle className={st.glow} cx={316} cy={232} r={110} fill="url(#buyer-glow)" />
      <circle cx={158} cy={140} r={21} fill={SHADOW} stroke={CREAM} strokeOpacity={0.35} strokeWidth={1.5} />
      <path
        d="M110 360 L112 300 Q118 268 160 258 L166 238 Q140 226 140 186 Q140 140 186 128 Q232 124 242 166 L244 176 L254 194 L244 198 L248 206 L242 210 L246 218 L236 226 Q224 238 214 238 L212 256 Q244 264 262 290 L270 360 Z"
        fill={SHADOW} stroke={CREAM} strokeOpacity={0.6} strokeWidth={2} strokeLinejoin="round"
      />
      <path d="M232 318 Q262 284 288 262 L302 274 Q280 296 254 336 Z" fill={SHADOW} stroke={CREAM} strokeOpacity={0.35} strokeWidth={1.5} />
      <g transform="rotate(14 318 228)">
        <rect x={286} y={170} width={66} height={118} rx={10} fill={SHADOW} />
        <rect className={st.glowScreen} x={291} y={177} width={56} height={104} rx={6} fill={CREAM} />
        <rect x={297} y={252} width={44} height={14} rx={7} fill="none" stroke={NIGHT} strokeOpacity={0.5} />
      </g>
    </svg>
  );
}

/* 4 — the answer, close up: three names, each with a source. */
export function Answer({ className }: ArtProps) {
  const rows = [
    { y: 112, w: 116, d: '0.7s' },
    { y: 176, w: 96, d: '1.1s' },
    { y: 240, w: 108, d: '1.5s' },
  ];
  return (
    <svg aria-hidden="true" {...stage} className={className}>
      <rect width={480} height={360} fill={NIGHT} />
      <g transform="rotate(-5 240 200)">
        <rect x={128} y={10} width={224} height={390} rx={28} fill={SHADOW} stroke="#2E2E2E" strokeWidth={2} />
        <rect x={140} y={34} width={200} height={350} rx={8} fill={CREAM} />
        <text x={158} y={66} fontSize={14} fill={NIGHT} style={typewriter}>Answer</text>
        <rect x={158} y={78} width={150} height={5} fill={NIGHT} opacity={0.25} />
        <rect x={158} y={88} width={120} height={5} fill={NIGHT} opacity={0.25} />
        {rows.map((r, i) => (
          <g key={r.y} className={st.row} style={{ ['--d' as string]: r.d }}>
            <circle cx={166} cy={r.y + 6} r={8} fill={NIGHT} />
            <text x={166} y={r.y + 10} textAnchor="middle" fontSize={10} fill={CREAM} style={typewriter}>{i + 1}</text>
            <rect x={182} y={r.y} width={r.w} height={13} fill={NIGHT} />
            <rect x={182} y={r.y + 20} width={130} height={4} fill={NIGHT} opacity={0.25} />
            <rect x={182} y={r.y + 29} width={100} height={4} fill={NIGHT} opacity={0.25} />
            <rect x={292} y={r.y + 37} width={30} height={13} rx={6.5} fill="none" stroke={RED} strokeWidth={1.5} />
            <text x={307} y={r.y + 47} textAnchor="middle" fontSize={8.5} fill={RED} style={typewriter}>{`[${i + 1}]`}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* 6 — a door opens; a figure stands in the light. */
export function Doorway({ className }: ArtProps) {
  return (
    <svg aria-hidden="true" {...stage} className={className}>
      <rect width={480} height={360} fill={NIGHT} />
      <rect x={256} y={26} width={128} height={296} fill="#1A1A1A" />
      <rect className={st.door} x={256} y={26} width={128} height={296} fill={CREAM} />
      <polygon className={st.spill} points="256,322 384,322 480,360 150,360" fill={CREAM} opacity={0.22} />
      <g className={st.figure}>
        <polygon points="300,320 340,320 306,360 218,360" fill={SHADOW} opacity={0.75} />
        <ellipse cx={320} cy={96} rx={15} ry={17} fill={SHADOW} />
        <rect x={314} y={110} width={12} height={10} fill={SHADOW} />
        <path d="M302 118 Q320 112 338 118 L342 150 L340 228 L300 228 L298 150 Z" fill={SHADOW} />
        <path d="M302 120 Q290 122 288 140 L284 212 L292 214 L298 150 Z" fill={SHADOW} />
        <path d="M338 120 Q350 122 352 140 L358 198 L350 202 L342 150 Z" fill={SHADOW} />
        <g transform="rotate(8 360 214)">
          <rect x={346} y={196} width={28} height={36} rx={2} fill={SHADOW} />
          <rect x={346} y={200} width={10} height={4} fill={RED} />
        </g>
        <path d="M302 226 L318 226 L316 318 L302 320 Z" fill={SHADOW} />
        <path d="M322 226 L338 226 L340 320 L324 318 Z" fill={SHADOW} />
      </g>
      <rect x={252} y={22} width={136} height={302} fill="none" stroke="#2A2A2A" strokeWidth={6} />
    </svg>
  );
}
