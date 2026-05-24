import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  drift: number;
  hue: number;
}

interface Props {
  density?: number;
  className?: string;
}

/**
 * Subtle floating sawdust / wood-particle ambience.
 * GPU-friendly canvas, respects prefers-reduced-motion.
 */
export function SawdustParticles({ density = 70, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const count = Math.max(10, Math.floor((w * h) / 38000));
      const target = Math.min(count, density);
      particles = Array.from({ length: target }, () => makeParticle(true));
    };

    const makeParticle = (initial = false): Particle => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.08 - Math.random() * 0.18,
      r: 0.4 + Math.random() * 1.0,
      alpha: 0.06 + Math.random() * 0.18,
      drift: Math.random() * Math.PI * 2,
      hue: 38 + Math.random() * 12,
    });


    const step = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.drift += 0.008;
        p.x += p.vx + Math.sin(p.drift + t * 0.0004) * 0.25;
        p.y += p.vy;

        if (p.y < -10 || p.x < -20 || p.x > w + 20) {
          Object.assign(p, makeParticle(false));
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 70%, 70%, ${p.alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 70%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${Math.min(0.5, p.alpha + 0.08)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    seed();
    if (!reduceMotion) raf = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")
      }
    />
  );
}
