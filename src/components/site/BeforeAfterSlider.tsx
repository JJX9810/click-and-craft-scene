import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  /** Ausgangsposition in % (0–100). */
  initial?: number;
  /** Aspect-Ratio, z.B. "4/3" oder "3/2". */
  aspect?: string;
  /** Label der linken Seite. */
  beforeLabel?: string;
  /** Label der rechten Seite. */
  afterLabel?: string;
  className?: string;
  eager?: boolean;
}

/**
 * Vorher-/Nachher-Slider mit Pointer-, Touch- und Tastatur-Bedienung.
 * Reduziert Bewegungspräferenzen respektiert (keine Transitions).
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  initial = 50,
  aspect = "4/3",
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  className,
  eager = false,
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setValue((v) => Math.max(0, v - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setValue((v) => Math.min(100, v + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setValue(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setValue(100);
    }
  };

  // Prefers-reduced-motion — nur für Cursor-Feedback
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  return (
    <figure className={cn("group", className)}>
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-2xl border border-border/70 bg-card/40 touch-none"
        style={{ aspectRatio: aspect }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Nachher-Bild (Basis, volle Fläche) */}
        <img
          src={after}
          alt={`${alt} – Nachher`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Vorher-Bild (oben, per clip-path aufgedeckt) */}
        <img
          src={before}
          alt={`${alt} – Vorher`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            !dragging && !reduceMotion && "transition-[clip-path] duration-100 ease-out",
          )}
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        />

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
          {afterLabel}
        </span>

        {/* Trennlinie */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-accent"
          style={{ left: `${value}%`, transform: "translateX(-0.5px)" }}
        />

        {/* Griff */}
        <div
          role="slider"
          aria-label="Vorher-Nachher-Vergleich"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent/70 bg-background text-accent shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ left: `${value}%` }}
        >
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 6-4 6 4 6" />
            <path d="m15 6 4 6-4 6" />
          </svg>
        </div>
      </div>
    </figure>
  );
}
