// Illustrated placeholder imagery. Until real photography of Hi Hat Ranch is
// available, every image slot renders one of these scenes, varied by `seed`
// so cards don't all look identical. Swap for <Image> once photos exist.

type Kind = "home" | "land" | "aerial";

const SKIES = [
  ["#8fd0f4", "#dff3fb"],
  ["#79c3ee", "#e9f6fd"],
  ["#f7b58c", "#fde6c8"],
  ["#9ad6f0", "#f1fbf4"],
  ["#f2a3a0", "#fbe0c6"],
];
const WALLS = ["#f4efe6", "#e8edf0", "#f6f6f2", "#efe3d0", "#dfe7ea"];
const ROOFS = ["#7c8a96", "#b5694a", "#5d6b78", "#a8553c", "#8a8f93"];

function Oak({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-22" width="6" height="24" fill="#6b5237" />
      <ellipse cx="0" cy="-34" rx="30" ry="18" fill="#3f8a4c" />
      <ellipse cx="-16" cy="-28" rx="18" ry="12" fill="#357a42" />
      <ellipse cx="16" cy="-27" rx="19" ry="12" fill="#4a9a57" />
    </g>
  );
}

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#2f7d45" strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M0 0 Q3 -30 -1 -58" stroke="#8a6a45" strokeWidth="4" />
      <path d="M-1 -58 Q-18 -70 -30 -56" />
      <path d="M-1 -58 Q-14 -78 -26 -76" />
      <path d="M-1 -58 Q4 -80 18 -78" />
      <path d="M-1 -58 Q18 -70 30 -54" />
      <path d="M-1 -58 Q10 -60 20 -44" />
    </g>
  );
}

function House({ x, y, w, wall, roof, garage }: { x: number; y: number; w: number; wall: string; roof: string; garage: number }) {
  const h = w * 0.36;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={`${-w * 0.06},${-h} ${w * 0.5},${-h - w * 0.2} ${w * 1.06},${-h}`} fill={roof} />
      <rect x="0" y={-h} width={w} height={h} fill={wall} />
      <polygon points={`${w * 0.52},${-h} ${w * 0.8},${-h - w * 0.17} ${w * 1.08},${-h}`} fill={roof} opacity="0.92" />
      {/* garage doors */}
      {Array.from({ length: garage > 2 ? 2 : 1 }).map((_, i) => (
        <rect key={i} x={w * (0.58 + i * 0.22)} y={-h * 0.62} width={w * (garage > 2 ? 0.19 : 0.36)} height={h * 0.62} fill="#cfd6da" stroke="#aab3b8" />
      ))}
      {/* entry + windows */}
      <rect x={w * 0.36} y={-h * 0.66} width={w * 0.1} height={h * 0.66} fill="#3a5568" />
      <rect x={w * 0.08} y={-h * 0.7} width={w * 0.2} height={h * 0.36} fill="#9fd0e6" stroke="#fff" strokeWidth="2" />
    </g>
  );
}

export function Scene({ seed, kind = "home", className = "" }: { seed: number; kind?: Kind; className?: string }) {
  const sky = SKIES[seed % SKIES.length];
  const wall = WALLS[(seed * 3) % WALLS.length];
  const roof = ROOFS[(seed * 7) % ROOFS.length];
  const id = `sky-${seed}-${kind}`;
  const flip = seed % 2 === 1;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role="img"
      aria-label="Illustrated placeholder image"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      <g fill="#fff" opacity="0.85">
        <ellipse cx={flip ? 300 : 90} cy="52" rx="46" ry="13" />
        <ellipse cx={flip ? 330 : 120} cy="44" rx="30" ry="11" />
        <ellipse cx={flip ? 110 : 290} cy="84" rx="38" ry="10" />
      </g>

      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
        {/* distant tree line and pasture */}
        <path d="M0 176 Q40 160 80 172 T170 166 T260 172 T340 164 T400 172 V300 H0Z" fill="#5fa568" />
        <path d="M0 196 Q120 176 230 192 T400 186 V300 H0Z" fill="#86c871" />
        <path d="M0 232 Q140 212 260 228 T400 222 V300 H0Z" fill="#74bb62" />

        {kind === "land" && (
          <>
            <ellipse cx="270" cy="236" rx="110" ry="20" fill="#7cc7e6" />
            <ellipse cx="270" cy="234" rx="92" ry="13" fill="#a6dcf0" />
            <Oak x={70} y={214} s={1.5} />
            <Oak x={150} y={200} s={0.9} />
            <g stroke="#f4efe6" strokeWidth="3">
              <path d="M0 262 H400 M0 274 H400" />
              {Array.from({ length: 9 }).map((_, i) => (
                <path key={i} d={`M${i * 50 + 10} 254 V282`} />
              ))}
            </g>
          </>
        )}

        {kind === "aerial" && (
          <>
            <ellipse cx="120" cy="238" rx="120" ry="24" fill="#7cc7e6" />
            <path d="M250 300 Q260 240 400 226" stroke="#e9e4d8" strokeWidth="14" fill="none" />
            {[0, 1, 2, 3].map((i) => (
              <House key={i} x={236 + i * 42} y={212 - i * 5} w={34} wall={WALLS[(seed + i) % WALLS.length]} roof={ROOFS[(seed + i) % ROOFS.length]} garage={2} />
            ))}
            <Oak x={60} y={204} s={1.1} />
            <Palm x={210} y={236} s={0.7} />
            <Palm x={30} y={268} s={0.9} />
          </>
        )}

        {kind === "home" && (
          <>
            <Oak x={52} y={220} s={1.25} />
            <House x={96} y={246} w={210} wall={wall} roof={roof} garage={2 + (seed % 2)} />
            <path d="M218 246 L206 300 H330 L296 246Z" fill="#dedad0" />
            <Palm x={330} y={254} s={1.05} />
            <Palm x={80} y={262} s={0.75} />
            <ellipse cx="150" cy="250" rx="34" ry="7" fill="#3f8a4c" />
          </>
        )}
      </g>
    </svg>
  );
}
