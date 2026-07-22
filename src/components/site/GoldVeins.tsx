import { useId } from "react";

/**
 * Goldadern für den Marmor-Hintergrund ("Wand & Wirkung").
 *
 * Zwei Ebenen pro Ader:
 *  1. Basis-Ader – dünner Goldstrich mit weichem Grundglühen (immer sichtbar).
 *  2. Funken-Overlay – ein heller Lichtpunkt, der an der Ader entlangwandert
 *     ("aufleuchten"). Über CSS gesteuert, sodass der Effekt später leicht
 *     verstärkt oder getriggert werden kann (siehe .gold-veins[data-glow]).
 *
 * Das viewBox ist 1440×900 und wird per "slice" formatfüllend skaliert.
 */

type Vein = {
  /** SVG-Pfad der Ader */
  d: string;
  /** Strichstärke der Basis-Ader */
  w: number;
  /** Startverzögerung des Funken in Sekunden (staffelt das Aufleuchten) */
  delay: number;
  /** Dauer eines Funken-Durchlaufs in Sekunden */
  dur: number;
};

// Organische Marmor-Adern, grob diagonal von oben nach unten-rechts – wie in der Vorlage.
const VEINS: Vein[] = [
  { d: "M -60 90 C 260 170 430 230 690 300 S 1120 430 1520 560", w: 1.6, delay: 0, dur: 5.5 },
  { d: "M 180 -40 C 340 190 470 300 660 420 S 1030 640 1240 900", w: 1.3, delay: 1.1, dur: 6.2 },
  { d: "M 560 -30 C 690 150 800 300 980 430 S 1280 630 1500 690", w: 1.1, delay: 2.3, dur: 5.8 },
  { d: "M -50 360 C 210 410 430 470 660 520 S 1130 640 1520 700", w: 1.2, delay: 0.6, dur: 6.6 },
  { d: "M 40 640 C 320 640 520 610 760 640 S 1180 760 1500 800", w: 0.9, delay: 3.1, dur: 5.2 },
  { d: "M 900 -30 C 980 170 1010 320 1120 470 S 1330 720 1420 900", w: 1.0, delay: 1.7, dur: 6.0 },
  // feinere Verästelungen
  { d: "M 690 300 C 760 360 820 430 840 540", w: 0.7, delay: 2.9, dur: 4.4 },
  { d: "M 660 420 C 720 470 800 500 900 500", w: 0.6, delay: 3.6, dur: 4.0 },
  { d: "M 660 520 C 740 560 820 600 880 680", w: 0.6, delay: 4.2, dur: 4.6 },
  { d: "M 980 430 C 1030 470 1050 520 1030 590", w: 0.55, delay: 1.4, dur: 5.0 },
  { d: "M 430 230 C 470 300 430 360 470 430", w: 0.5, delay: 3.9, dur: 4.8 },
];

export function GoldVeins({
  className = "",
  glow = false,
}: {
  className?: string;
  /** true => verstärktes, schnelleres Aufleuchten (z.B. bei Hover/Trigger) */
  glow?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const gGold = `gold-${id}`;
  const gSpark = `spark-${id}`;
  const fGlow = `glow-${id}`;
  const fSpark = `sparkglow-${id}`;

  return (
    <svg
      className={`gold-veins ${className}`}
      data-glow={glow ? "on" : "off"}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gGold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6d2f" />
          <stop offset="45%" stopColor="#d8b45a" />
          <stop offset="70%" stopColor="#f2e0a3" />
          <stop offset="100%" stopColor="#b8923f" />
        </linearGradient>
        <linearGradient id={gSpark} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="100%" stopColor="#f4d982" />
        </linearGradient>
        <filter id={fGlow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={fSpark} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Ebene 1: Basis-Adern mit Grundglühen */}
      <g className="veins-base" filter={`url(#${fGlow})`}>
        {VEINS.map((v, i) => (
          <path
            key={`base-${i}`}
            d={v.d}
            fill="none"
            stroke={`url(#${gGold})`}
            strokeWidth={v.w}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Ebene 2: wandernder Funke pro Ader ("aufleuchten") */}
      <g className="veins-spark" filter={`url(#${fSpark})`}>
        {VEINS.map((v, i) => (
          <path
            key={`spark-${i}`}
            className="vein-spark"
            d={v.d}
            pathLength={100}
            fill="none"
            stroke={`url(#${gSpark})`}
            strokeWidth={v.w + 0.7}
            strokeLinecap="round"
            style={{
              // je Ader eigene Timing-Variablen – vom CSS-Keyframe genutzt
              ["--spark-delay" as string]: `${v.delay}s`,
              ["--spark-dur" as string]: `${v.dur}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
