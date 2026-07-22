/**
 * Gerissene Pinsel-/Reiß-Kante zwischen zwei Sektionen ("Wand & Wirkung").
 *
 * Der obere Rand ist gezackt wie ein Farbabriss, der Rest ist mit `fill`
 * gefüllt. Deterministisch erzeugt (fester Seed), damit Server- und
 * Client-Render identisch sind (keine Hydration-Sprünge).
 */

// kleiner deterministischer PRNG (mulberry32) – fester Seed => stabile Kante
function makeRand(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildEdgePath(seed: number, w = 1440, h = 60, spikes = 130) {
  const rand = makeRand(seed);
  const step = w / spikes;
  // feiner, unregelmäßiger Farbabriss: viele kleine Zacken um eine Grundlinie,
  // vereinzelt tiefere Ausreißer – wirkt wie gerissene Farbe statt Sägezahn.
  let d = `M 0 ${h} L 0 ${(h * 0.55).toFixed(1)}`;
  for (let i = 0; i <= spikes; i++) {
    const x = i * step;
    const r = rand();
    // meist flache Zacken nahe der Grundlinie, ~12% tiefe Risse nach oben
    let y = h * 0.5 + (rand() - 0.5) * h * 0.22;
    if (r > 0.88) y = h * (0.05 + rand() * 0.12); // tiefer Riss
    else if (r < 0.12) y = h * (0.72 + rand() * 0.2); // Farbnase nach unten
    y = Math.max(1, Math.min(h - 1, y));
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L ${w} ${h} Z`;
  return d;
}

type Props = {
  fill: string;
  /** true => Kante zeigt nach oben (unteres Sektionsende) */
  flip?: boolean;
  seed?: number;
  className?: string;
};

export function BrushEdge({ fill, flip = false, seed = 1337, className = "" }: Props) {
  const d = buildEdgePath(seed);
  return (
    <svg
      className={`ww-brush-edge ${flip ? "flip" : ""} ${className}`}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill={fill} />
    </svg>
  );
}
