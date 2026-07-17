import { useEffect, useRef } from "react";

/**
 * 3D-Hero: Ein perspektivischer Holzboden, der sich Planke für Planke selbst
 * verlegt. Eine Planke schwebt als Signature-Element über dem Boden.
 * - Reines CSS-3D (keine Bibliotheken), Maus-Parallaxe nur auf Desktop
 * - prefers-reduced-motion: Boden steht fertig, keine Animation
 * - Mobil: flachere Perspektive, keine Parallaxe
 */

const ROWS = 6;
const COLS = 4;
const TONES = ["plank-tone-a", "plank-tone-b", "plank-tone-c"];

type PlankDef = {
  key: string;
  left: number; // %
  top: number; // %
  width: number; // %
  delay: number; // s
  tone: string;
  floating?: boolean;
};

function buildPlanks(): PlankDef[] {
  const planks: PlankDef[] = [];
  const rowH = 100 / ROWS;
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    // Läuferverband: jede zweite Reihe um eine halbe Planke versetzt
    const offset = r % 2 === 0 ? 0 : -12.5;
    for (let c = 0; c < COLS + 1; c++) {
      const width = 25;
      const left = offset + c * width;
      if (left > 100) continue;
      planks.push({
        key: `p-${r}-${c}`,
        left,
        top: r * rowH,
        width,
        delay: 0.25 + i * 0.08,
        tone: TONES[(r + c) % TONES.length],
      });
      i++;
    }
  }
  return planks;
}

const PLANKS = buildPlanks();

export function PlankHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // kein Parallax auf Touch

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        scene.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
        scene.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      scene.style.setProperty("--tilt-x", "0deg");
      scene.style.setProperty("--tilt-y", "0deg");
    };

    const region = scene.closest("section") ?? scene;
    region.addEventListener("mousemove", onMove as EventListener);
    region.addEventListener("mouseleave", onLeave);
    return () => {
      region.removeEventListener("mousemove", onMove as EventListener);
      region.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="plank-scene relative aspect-[16/12] w-full select-none sm:aspect-[16/11]"
      role="img"
      aria-label="Animierter Holzboden in 3D-Perspektive – Planke für Planke sauber verlegt, wie bei einer echten Bodenverlegung durch Verlegt & Verschraubt"
    >
      <div className="plank-stage">
        {/* Bodenebene in Perspektive */}
        <div className="plank-floor">
          {PLANKS.map((p) => (
            <div
              key={p.key}
              className={`plank ${p.tone}`}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.width}%`,
                height: `${100 / ROWS}%`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          {/* Goldene Fugen-Lichtkante am Horizont */}
          <div className="plank-horizon" aria-hidden />
        </div>

        {/* Schwebende Signature-Planke */}
        <div className="plank-float" aria-hidden>
          <div className="plank plank-tone-b plank-float-inner" />
          <div className="plank-float-shadow" />
        </div>
      </div>

      {/* Vignette für Tiefe */}
      <div className="plank-vignette" aria-hidden />
    </div>
  );
}
