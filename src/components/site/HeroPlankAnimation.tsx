import { useEffect, useRef, useState, Suspense } from "react";

/**
 * Hero-3D-Animation: "Plank Assembly" – premium edition.
 *
 * Cinematic, materialgetreue Szene:
 *  – 5 Eichendielen mit fein geschliffenen Kanten (RoundedBox)
 *  – Prozedurale Holz-Textur (Albedo + Roughness + Normal)
 *  – MeshPhysicalMaterial mit Clearcoat → echtes geöltes Holz
 *  – Messing-Schraube mit feinem Spiegelglanz
 *  – Studio-Lichtsetup (Key + Fill + Rim) und HDRI Environment
 *  – ACES Filmic Tonemapping, sRGB, Soft Shadows
 *  – Ruhige cineastische Kamera-Atmung (≤ 1.5°)
 *  – Loop ~14 s, choreographiert mit easeInOut + Mikro-Bounce beim Einrasten
 */
export function HeroPlankAnimation() {
  const [Mod, setMod] = useState<null | { Scene: React.ComponentType }>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [fiber, drei, THREE] = await Promise.all([
        import("@react-three/fiber"),
        import("@react-three/drei"),
        import("three"),
      ]);
      if (!alive) return;

      const { Canvas, useFrame } = fiber;
      const { Environment, ContactShadows, SoftShadows, RoundedBox } = drei;

      // ---------- helpers ----------
      const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      // soft overshoot for the "snap-in"
      const easeOutBack = (t: number) => {
        const c1 = 1.4;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };

      const PLANK_W = 2.4;
      const PLANK_D = 0.42;
      const PLANK_H = 0.06;
      const PLANK_COUNT = 5;
      const GAP = 0.004;

      // ---------- Procedural oak textures ----------
      function makeWoodTextures() {
        const W = 2048;
        const H = 512;

        // Albedo
        const albedoCanvas = document.createElement("canvas");
        albedoCanvas.width = W;
        albedoCanvas.height = H;
        const a = albedoCanvas.getContext("2d")!;
        const baseGrad = a.createLinearGradient(0, 0, 0, H);
        baseGrad.addColorStop(0, "#a07a4e");
        baseGrad.addColorStop(0.5, "#8a653d");
        baseGrad.addColorStop(1, "#6f4e2c");
        a.fillStyle = baseGrad;
        a.fillRect(0, 0, W, H);

        // long grain fibres
        for (let i = 0; i < 260; i++) {
          const y = Math.random() * H;
          const alpha = 0.04 + Math.random() * 0.09;
          const dark = Math.random() < 0.5;
          a.strokeStyle = dark
            ? `rgba(${20 + Math.random() * 25},${14 + Math.random() * 16},${6 + Math.random() * 10},${alpha})`
            : `rgba(${190 + Math.random() * 40},${150 + Math.random() * 30},${100 + Math.random() * 30},${alpha * 0.7})`;
          a.lineWidth = 0.4 + Math.random() * 1.6;
          a.beginPath();
          a.moveTo(0, y);
          for (let x = 0; x <= W; x += 12) {
            const ny =
              y +
              Math.sin(x * 0.006 + i * 0.7) * (0.6 + Math.random() * 1.4) +
              Math.sin(x * 0.02 + i) * 0.4;
            a.lineTo(x, ny);
          }
          a.stroke();
        }

        // knots
        for (let i = 0; i < 6; i++) {
          const x = Math.random() * W;
          const y = Math.random() * H;
          const r = 12 + Math.random() * 28;
          const g = a.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, "rgba(35,20,8,0.7)");
          g.addColorStop(0.6, "rgba(35,20,8,0.25)");
          g.addColorStop(1, "rgba(35,20,8,0)");
          a.fillStyle = g;
          a.beginPath();
          a.ellipse(x, y, r, r * 0.7, 0, 0, Math.PI * 2);
          a.fill();
        }

        // subtle dust / fine speckle
        const img = a.getImageData(0, 0, W, H);
        for (let p = 0; p < img.data.length; p += 4) {
          const n = (Math.random() - 0.5) * 14;
          img.data[p] = Math.max(0, Math.min(255, img.data[p] + n));
          img.data[p + 1] = Math.max(0, Math.min(255, img.data[p + 1] + n));
          img.data[p + 2] = Math.max(0, Math.min(255, img.data[p + 2] + n));
        }
        a.putImageData(img, 0, 0);

        const albedo = new THREE.CanvasTexture(albedoCanvas);
        albedo.colorSpace = THREE.SRGBColorSpace;
        albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
        albedo.anisotropy = 16;

        // Roughness map (derived: dark grain = slightly rougher)
        const roughCanvas = document.createElement("canvas");
        roughCanvas.width = W;
        roughCanvas.height = H;
        const r = roughCanvas.getContext("2d")!;
        r.fillStyle = "#7a7a7a";
        r.fillRect(0, 0, W, H);
        r.globalAlpha = 0.55;
        r.drawImage(albedoCanvas, 0, 0);
        r.globalAlpha = 1;
        const roughness = new THREE.CanvasTexture(roughCanvas);
        roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
        roughness.anisotropy = 8;

        // Normal map (very subtle, embossed grain)
        const normalCanvas = document.createElement("canvas");
        normalCanvas.width = W;
        normalCanvas.height = H;
        const n = normalCanvas.getContext("2d")!;
        n.fillStyle = "rgb(128,128,255)";
        n.fillRect(0, 0, W, H);
        for (let i = 0; i < 180; i++) {
          const y = Math.random() * H;
          n.strokeStyle = `rgba(${110 + Math.random() * 30},${110 + Math.random() * 30},255,${0.08 + Math.random() * 0.12})`;
          n.lineWidth = 0.6 + Math.random() * 1.2;
          n.beginPath();
          n.moveTo(0, y);
          for (let x = 0; x <= W; x += 14) {
            const ny = y + Math.sin(x * 0.006 + i) * 1.2;
            n.lineTo(x, ny);
          }
          n.stroke();
        }
        const normal = new THREE.CanvasTexture(normalCanvas);
        normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
        normal.anisotropy = 8;

        return { albedo, roughness, normal };
      }

      // ---------- Plank ----------
      function Plank({
        index,
        cycle,
        maps,
      }: {
        index: number;
        cycle: { current: number };
        maps: { albedo: any; roughness: any; normal: any };
      }) {
        const ref = useRef<any>(null);
        const matRef = useRef<any>(null);

        // staggered slot in 0..1 loop
        const order = [2, 0, 3, 1, 4][index]; // visual order of arrival (centre first)
        const start = 0.05 + order * 0.11;
        const dur = 0.18;
        const targetZ = (index - (PLANK_COUNT - 1) / 2) * (PLANK_D + GAP);
        const fromX = (index % 2 === 0 ? -1 : 1) * 3.2;

        useFrame(() => {
          const t = cycle.current;
          const local = clamp01((t - start) / dur);
          const eased = easeOutBack(local);

          // entrance
          const x = fromX * (1 - eased);
          const y = 0.6 * (1 - easeInOutCubic(local));
          const rotY = (1 - easeInOutCubic(local)) * (index % 2 === 0 ? -0.12 : 0.12);
          const rotZ = (1 - easeInOutCubic(local)) * (index % 2 === 0 ? 0.05 : -0.05);

          // micro settle bounce after lock-in
          const settle =
            local >= 1
              ? Math.sin((t - (start + dur)) * 28) *
                Math.exp(-(t - (start + dur)) * 12) *
                0.006
              : 0;

          // gentle reverse fade for clean loop
          let opacity = local > 0 ? 1 : 0;
          if (t > 0.92) opacity *= 1 - clamp01((t - 0.92) / 0.08);

          if (ref.current) {
            ref.current.position.set(x, y + settle, targetZ);
            ref.current.rotation.set(0, rotY, rotZ);
          }
          if (matRef.current) {
            matRef.current.opacity = opacity;
            matRef.current.transparent = opacity < 1;
          }
        });

        // per-plank UV offset for grain variation
        const uOffset = (index * 0.137) % 1;
        const flip = index % 2 === 0;

        return (
          <RoundedBox
            ref={ref as any}
            args={[PLANK_W, PLANK_H, PLANK_D]}
            radius={0.012}
            smoothness={4}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              ref={matRef}
              map={maps.albedo}
              roughnessMap={maps.roughness}
              normalMap={maps.normal}
              normalScale={[0.35, 0.35] as any}
              roughness={0.62}
              metalness={0}
              clearcoat={0.35}
              clearcoatRoughness={0.45}
              sheen={0.2}
              sheenRoughness={0.6}
              sheenColor={"#3a2614" as any}
              color={"#b88a58"}
              onUpdate={(m: any) => {
                if (m.map) {
                  m.map.offset.set(uOffset, flip ? 0.5 : 0);
                  m.map.repeat.set(1, 1);
                }
                if (m.roughnessMap) m.roughnessMap.offset.set(uOffset, flip ? 0.5 : 0);
                if (m.normalMap) m.normalMap.offset.set(uOffset, flip ? 0.5 : 0);
              }}
            />
          </RoundedBox>
        );
      }

      // ---------- Brass screw (final flourish) ----------
      function Screw({ cycle }: { cycle: { current: number } }) {
        const ref = useRef<any>(null);
        const matRef = useRef<any>(null);
        useFrame(() => {
          const t = cycle.current;
          const start = 0.72;
          const dur = 0.16;
          const local = clamp01((t - start) / dur);
          const eased = easeInOutCubic(local);
          let opacity = eased;
          if (t > 0.92) opacity *= 1 - clamp01((t - 0.92) / 0.08);
          if (ref.current) {
            ref.current.position.set(
              PLANK_W / 2 - 0.18,
              PLANK_H / 2 + (1 - eased) * 0.5 + 0.001,
              -PLANK_D * 1.5
            );
            ref.current.rotation.y = eased * Math.PI * 2.5;
          }
          if (matRef.current) {
            matRef.current.opacity = opacity;
            matRef.current.transparent = opacity < 1;
          }
        });
        return (
          <mesh ref={ref} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.012, 32]} />
            <meshPhysicalMaterial
              ref={matRef}
              color="#d6b15a"
              metalness={1}
              roughness={0.18}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
            />
          </mesh>
        );
      }

      // ---------- Camera ----------
      function CameraRig() {
        useFrame(({ camera, clock }) => {
          const t = clock.getElapsedTime();
          // slow cinematic breathing
          camera.position.x = Math.sin(t * 0.18) * 0.12;
          camera.position.y = 1.85 + Math.sin(t * 0.14) * 0.04;
          camera.position.z = 2.8;
          camera.lookAt(0, -0.05, 0);
        });
        return null;
      }

      // ---------- Stage ----------
      function Stage() {
        const cycle = useRef(0);
        const LOOP = 14;
        const mapsRef = useRef(makeWoodTextures());

        useFrame(({ clock, gl }) => {
          cycle.current = (clock.getElapsedTime() % LOOP) / LOOP;
          // ensure proper colour pipeline
          if ((gl as any).toneMapping !== THREE.ACESFilmicToneMapping) {
            (gl as any).toneMapping = THREE.ACESFilmicToneMapping;
            (gl as any).toneMappingExposure = 1.05;
            (gl as any).outputColorSpace = THREE.SRGBColorSpace;
          }
        });

        const planks = [];
        for (let i = 0; i < PLANK_COUNT; i++) {
          planks.push(
            <Plank key={i} index={i} cycle={cycle} maps={mapsRef.current} />
          );
        }

        return (
          <>
            <CameraRig />

            {/* studio lighting */}
            <ambientLight intensity={0.18} />
            <directionalLight
              position={[-3.5, 5, 2.5]}
              intensity={2.6}
              color="#ffe2b8"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0002}
              shadow-radius={6}
            />
            {/* fill */}
            <directionalLight position={[4, 2.5, 2]} intensity={0.55} color="#fff4e0" />
            {/* warm rim from behind */}
            <directionalLight position={[0, 1.5, -4]} intensity={0.7} color="#e8b572" />
            {/* subtle blue counter to separate from dark bg */}
            <pointLight position={[0, 1.2, 3]} intensity={0.3} color="#a8c8ff" distance={6} />

            <Environment preset="apartment" />

            <group position={[0, 0, 0]}>
              {planks}
              <Screw cycle={cycle} />
            </group>

            <ContactShadows
              position={[0, -0.005, 0]}
              opacity={0.7}
              scale={9}
              blur={2.6}
              far={4}
              resolution={1024}
              color="#000000"
            />
          </>
        );
      }

      const Scene: React.ComponentType = () => (
        <Canvas
          shadows="soft"
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ fov: 28, position: [0, 1.85, 2.8], near: 0.1, far: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <SoftShadows size={28} samples={16} focus={0.9} />
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
      {/* warm radial glow behind the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(232,165,114,0.18) 0%, rgba(13,13,13,0) 55%)",
        }}
      />
      {/* cinematic vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(13,13,13,0.65) 100%)",
        }}
      />
    </div>
  );
}
