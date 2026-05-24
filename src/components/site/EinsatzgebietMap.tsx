import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type Props = {
  /** Center coordinates [lat, lng] */
  center?: [number, number];
  /** Radius in meters */
  radiusMeters?: number;
  /** Marker label, e.g. "Wilhelmshaven" */
  label?: string;
  /** Map height in CSS units */
  height?: string;
  /** zoom level */
  zoom?: number;
};

/**
 * Einsatzgebiets-Karte mit Radius-Kreis. Client-only Rendering
 * (Leaflet braucht window, läuft daher nicht im SSR).
 */
export function EinsatzgebietMap({
  center = [53.5285, 8.1083],
  radiusMeters = 30000,
  label = "Wilhelmshaven",
  height = "440px",
  zoom = 9,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [Comp, setComp] = useState<null | {
    MapContainer: any;
    TileLayer: any;
    Circle: any;
    CircleMarker: any;
    Tooltip: any;
  }>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const mod = await import("react-leaflet");
      if (!alive) return;
      setComp({
        MapContainer: mod.MapContainer,
        TileLayer: mod.TileLayer,
        Circle: mod.Circle,
        CircleMarker: mod.CircleMarker,
        Tooltip: mod.Tooltip,
      });
      setMounted(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40"
      style={{ height }}
    >
      {!mounted || !Comp ? (
        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Karte wird geladen…
        </div>
      ) : (
        <Comp.MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          attributionControl={true}
        >
          <Comp.TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Comp.Circle
            center={center}
            radius={radiusMeters}
            pathOptions={{
              color: "#c9a84c",
              weight: 2,
              fillColor: "#c9a84c",
              fillOpacity: 0.12,
            }}
          />
          <Comp.CircleMarker
            center={center}
            radius={8}
            pathOptions={{ color: "#c9a84c", fillColor: "#c9a84c", fillOpacity: 1, weight: 3 }}
          >
            <Comp.Tooltip permanent direction="top" offset={[0, -8]}>
              {label}
            </Comp.Tooltip>
          </Comp.CircleMarker>
        </Comp.MapContainer>
      )}
    </div>
  );
}
