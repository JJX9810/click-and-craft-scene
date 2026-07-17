interface Props {
  className?: string;
  intensity?: "soft" | "medium";
}

/**
 * Sehr dezenter Sonnenlicht-/Schleier-Effekt.
 * Reine CSS-Radial-Gradients mit langsamer Bewegung – kein Canvas, kein JS.
 */
export function SunlightHaze({ className, intensity = "soft" }: Props) {
  const opacity = intensity === "medium" ? 0.32 : 0.16;
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      <div
        className="absolute inset-0"
        style={{
          opacity,
          background:
            "radial-gradient(45% 35% at 18% 22%, oklch(0.78 0.10 78 / 0.18), transparent 65%), radial-gradient(40% 30% at 82% 78%, oklch(0.62 0.08 50 / 0.14), transparent 65%)",
        }}
      />
    </div>
  );
}
