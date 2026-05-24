interface Props {
  className?: string;
  intensity?: "soft" | "medium";
}

/**
 * Sehr dezenter Sonnenlicht-/Schleier-Effekt.
 * Reine CSS-Radial-Gradients mit langsamer Bewegung – kein Canvas, kein JS.
 */
export function SunlightHaze({ className, intensity = "soft" }: Props) {
  const opacity = intensity === "medium" ? 0.55 : 0.32;
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      <div
        className="absolute inset-0 mix-blend-screen animate-aurora-shift"
        style={{
          opacity,
          background:
            "radial-gradient(45% 35% at 18% 22%, oklch(0.78 0.10 78 / 0.22), transparent 65%), radial-gradient(40% 30% at 82% 78%, oklch(0.62 0.08 50 / 0.18), transparent 65%), radial-gradient(35% 25% at 50% 110%, oklch(0.70 0.09 70 / 0.14), transparent 70%)",
          backgroundSize: "180% 180%",
          filter: "blur(2px)",
        }}
      />
      {/* schmaler Lichtstrahl / Schleier */}
      <div
        className="absolute -inset-x-10 top-0 h-[140%] rotate-[14deg] opacity-[0.06] animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.95 0.04 80 / 0.6) 50%, transparent 100%)",
          width: "30%",
        }}
      />
    </div>
  );
}
