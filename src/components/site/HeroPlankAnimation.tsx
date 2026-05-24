import { useEffect, useRef, useState, Suspense } from "react";

/**
 * Hero-3D-Animation: "Plank Assembly".
 * Drei Holzdielen schweben ein, klicken zusammen, eine Messing-Sockelleiste
 * legt sich an. Loop ~12 s, ruhige Kamera, warme Lichtstimmung.
 *
 * Client-only Mounting (three.js braucht window).
 */
export function HeroPlankAnimation() {
  const [Mod, setMod] = useState<null | {
    Scene: React.ComponentType;
  }>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ Canvas, useFrame }, drei, THREE] = await Promise.all([
        import("@react-three/fiber"),
        import("@react-three/drei"),
        import("three"),
      ]);
      if (!alive) return;

      const { Environment, ContactShadows } = drei;

      // ---------- Easing helpers ----------
      const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

      const PLANK_W = 2.6;
      const PLANK_D = 0.8;
      const PLANK_H = 0.07;

      // Procedural wood texture (Canvas2D → THREE.CanvasTexture)
      function makeWoodTexture() {
        const c = document.createElement("canvas");
        c.width = 1024;
        c.height = 256;
        const ctx = c.getContext("2d")!;
        // Base
        const grad = ctx.createLinearGradient(0, 0, 0, c.height);
        grad.addColorStop(0, "#8a6a44");
        grad.addColorStop(1, "#6b4f30");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, c.width, c.height);
        // Grain lines
        for (let i = 0; i < 90; i++) {
          const y = Math.random() * c.height;
          const a = 0.05 + Math.random() * 0.1;
          ctx.strokeStyle = `rgba(${30 + Math.random() * 30},${20 + Math.random() * 20},${10 + Math.random() * 10},${a})`;
          ctx.lineWidth = 0.5 + Math.random() * 1.4;
          ctx.beginPath();
          ctx.moveTo(0, y);
          for (let x = 0; x <= c.width; x += 16) {
            const ny = y + Math.sin(x * 0.012 + i) * (1 + Math.random() * 2);
            ctx.lineTo(x, ny);
          }
          ctx.stroke();
        }
        // Subtle knots
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * c.width;
          const y = Math.random() * c.height;
          const r = 6 + Math.random() * 14;
          const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
          g2.addColorStop(0, "rgba(40,25,12,0.55)");
          g2.addColorStop(1, "rgba(40,25,12,0)");
          ctx.fillStyle = g2;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.anisotropy = 8;
        return tex;
      }

      function Plank({
        index,
        cycle,
        woodMap,
      }: {
        index: number;
        cycle: { current: number };
        woodMap: any;
      }) {
        const ref = useRef<any>(null);

        useFrame(() => {
          const t = cycle.current; // 0..1 over loop
          // Each plank has its own window inside the loop.
          // Loop layout (0..1):
          // 0.00–0.18: plank 0 enters
          // 0.18–0.36: plank 1 enters
          // 0.36–0.54: plank 2 enters
          // 0.54–0.70: baseboard
          // 0.70–0.88: hold + light pass
          // 0.88–1.00: ease back to start (reverse fade)
          const start = 0.0 + index * 0.18;
          const end = start + 0.16;
          const local = clamp01((t - start) / (end - start));
          const eased = easeInOut(local);

          // Hold
          let opacity = 1;
          let yOffset = (1 - eased) * 1.4;
          let xOffset = (1 - eased) * (index === 1 ? 1.2 : -1.2);
          let rotZ = (1 - eased) * (index % 2 === 0 ? 0.18 : -0.18);

          // Reverse-fade phase to make a clean loop
          if (t > 0.88) {
            const out = clamp01((t - 0.88) / 0.12);
            opacity = 1 - out;
          }
          if (t < start) opacity = 0;

          const targetY = 0;
          const targetX = (index - 1) * (PLANK_D + 0.002);

          if (ref.current) {
            ref.current.position.x = targetX + xOffset * 0.1;
            ref.current.position.y = targetY + yOffset;
            ref.current.position.z = 0;
            ref.current.rotation.z = rotZ;
            ref.current.material.opacity = opacity;
            ref.current.material.transparent = true;
          }
        });

        return (
          <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={[PLANK_W, PLANK_H, PLANK_D]} />
            <meshStandardMaterial
              map={woodMap}
              roughness={0.55}
              metalness={0.05}
              color={"#a07a4a"}
            />
          </mesh>
        );
      }

      function Baseboard({ cycle }: { cycle: { current: number } }) {
        const ref = useRef<any>(null);
        useFrame(() => {
          const t = cycle.current;
          const start = 0.54;
          const end = 0.7;
          const local = clamp01((t - start) / (end - start));
          const eased = easeInOut(local);
          let opacity = eased;
          if (t > 0.88) opacity *= 1 - clamp01((t - 0.88) / 0.12);
          if (ref.current) {
            ref.current.position.set(0, 0.06 + (1 - eased) * 0.4, -1.2);
            ref.current.material.opacity = opacity;
            ref.current.material.transparent = true;
          }
        });
        return (
          <mesh ref={ref} castShadow>
            <boxGeometry args={[PLANK_W, 0.18, 0.05]} />
            <meshStandardMaterial color="#c9a84c" metalness={0.85} roughness={0.28} />
          </mesh>
        );
      }

      function CameraRig() {
        useFrame(({ camera, clock }) => {
          const t = clock.getElapsedTime();
          // Sehr dezenter Atem (≤ 2°)
          camera.position.x = Math.sin(t * 0.25) * 0.18;
          camera.position.y = 2.2 + Math.sin(t * 0.2) * 0.05;
          camera.position.z = 3.6;
          camera.lookAt(0, 0, -0.2);
        });
        return null;
      }

      function Stage() {
        const cycle = useRef(0);
        const LOOP = 12; // seconds
        useFrame(({ clock }) => {
          cycle.current = (clock.getElapsedTime() % LOOP) / LOOP;
        });
        const woodMap = makeWoodTexture();
        return (
          <>
            <CameraRig />
            <ambientLight intensity={0.25} />
            <directionalLight
              position={[-3, 5, 3]}
              intensity={2.2}
              color="#ffd9a8"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight position={[4, 2, 2]} intensity={0.6} color="#fff2dd" />
            <directionalLight position={[0, 2, -4]} intensity={0.5} color="#e8c07a" />
            <Environment preset="warehouse" />

            <group position={[0, 0, 0]}>
              <Plank index={0} cycle={cycle} woodMap={woodMap} />
              <Plank index={1} cycle={cycle} woodMap={woodMap} />
              <Plank index={2} cycle={cycle} woodMap={woodMap} />
              <Baseboard cycle={cycle} />
            </group>

            <ContactShadows
              position={[0, -0.04, 0]}
              opacity={0.55}
              scale={8}
              blur={2.4}
              far={4}
              color="#000000"
            />
          </>
        );
      }

      const Scene: React.ComponentType = () => (
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 32, position: [0, 2.2, 3.6] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Stage />
          </Suspense>
        </Canvas>
      );

      setMod({ Scene });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {Mod ? (
        <Mod.Scene />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Szene wird geladen…
        </div>
      )}
      {/* Vignette führt das Auge zurück zum Text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(13,13,13,0.55) 100%)",
        }}
      />
    </div>
  );
}
