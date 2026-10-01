/* Hand-drawn comic art for the home page, as inline SVG so it needs no image
   requests and stays crisp at any size. Colours match home.module.css. */

export const INK = "#111111";
export const RED = "#E3262B";
export const YELLOW = "#FFD93B";

/* 12-point starburst on a 200×200 box. */
const BURST_12 =
  "196,119 163,131 173,165 139,158 131,193 104,170 81,196 69,163 35,173 42,139 7,131 30,104 4,81 37,69 27,35 61,42 69,7 96,30 119,4 131,37 165,27 158,61 193,69 170,96";

/* 14-point starburst on a 300×220 box, for the wide "not mentioned" panel. */
const BURST_14 =
  "257,121 218,133 242,166 202,160 209,201 175,178 163,217 143,182 116,212 112,171 75,187 90,149 49,147 79,119 43,99 82,87 58,54 98,60 91,19 125,42 137,3 157,38 184,8 188,49 225,33 210,71 251,73 221,101";

type BurstProps = {
  lines: string[];
  label: string;
  fill?: string;
  textFill?: string;
  fontSize?: number;
  className?: string;
};

export function Burst({ lines, label, fill = YELLOW, textFill = INK, fontSize = 58, className }: BurstProps) {
  const lineHeight = fontSize * 0.95;
  const firstY = 100 - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.32;
  return (
    <svg role="img" aria-label={label} viewBox="0 0 200 200" className={className}>
      <polygon points={BURST_12} fill={fill} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      {lines.map((line, i) => (
        <text key={line} x={100} y={firstY + i * lineHeight} textAnchor="middle"
          style={{ fontFamily: "var(--font-bangers), cursive" }} fontSize={fontSize} fill={textFill}>
          {line}
        </text>
      ))}
    </svg>
  );
}

export function NotMentionedBurst({ className }: { className?: string }) {
  return (
    <svg role="img" aria-label="Not mentioned!" viewBox="0 0 300 220" className={className}>
      <polygon points={BURST_14} fill={YELLOW} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <g transform="rotate(-6 150 110)" style={{ fontFamily: "var(--font-bangers), cursive" }} textAnchor="middle">
        <text x={150} y={102} fontSize={34} fill={INK}>Not</text>
        <text x={150} y={138} fontSize={34} fill={RED} stroke={INK} strokeWidth={1.4}>mentioned!</text>
      </g>
    </svg>
  );
}
