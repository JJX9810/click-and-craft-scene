import { useEffect, useState } from "react";
import { getAttributionFields, formatSource, formatCampaign } from "@/lib/attribution";

const STORAGE_KEY = "vv_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

function isDebug(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

export function AttributionDebugPanel() {
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isDebug());
  }, [tick]);

  if (!visible) return null;

  const fields = getAttributionFields();
  let expiresAt = "";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.stored_at) {
        expiresAt = new Date(parsed.stored_at + TTL_MS).toISOString();
      }
    }
  } catch {
    /* ignore */
  }

  const rows: [string, string][] = [
    ["Quelle (lesbar)", formatSource(fields.last_touch_source)],
    ["Kampagne (lesbar)", formatCampaign(fields.last_touch_campaign)],
    ["—", "—"],
    ["first_touch_source", fields.first_touch_source],
    ["first_touch_medium", fields.first_touch_medium],
    ["first_touch_campaign", fields.first_touch_campaign],
    ["first_touch_content", fields.first_touch_content],
    ["first_touch_landing_page", fields.first_touch_landing_page],
    ["first_touch_timestamp", fields.first_touch_timestamp],
    ["—", "—"],
    ["last_touch_source", fields.last_touch_source],
    ["last_touch_medium", fields.last_touch_medium],
    ["last_touch_campaign", fields.last_touch_campaign],
    ["last_touch_content", fields.last_touch_content],
    ["last_touch_landing_page", fields.last_touch_landing_page],
    ["last_touch_timestamp", fields.last_touch_timestamp],
    ["—", "—"],
    ["current_page", fields.current_page],
    ["expires_at (TTL)", expiresAt || "—"],
  ];

  return (
    <section className="mx-auto my-8 max-w-3xl rounded-md border border-border bg-muted/40 p-4 text-xs font-mono">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Attribution Debug</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded border border-border px-2 py-1 hover:bg-background"
            onClick={() => setTick((t) => t + 1)}
          >
            Aktualisieren
          </button>
          <button
            type="button"
            className="rounded border border-destructive px-2 py-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => {
              try {
                window.localStorage.removeItem(STORAGE_KEY);
              } catch {
                /* ignore */
              }
              window.location.reload();
            }}
          >
            Attribution zurücksetzen
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} className="border-t border-border/60">
              <td className="w-1/2 py-1 pr-2 text-muted-foreground">{k}</td>
              <td className="py-1 break-all">{v || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[10px] text-muted-foreground">
        Nur sichtbar mit ?debug=1. Keine externen Analytics aktiv.
      </p>
    </section>
  );
}
