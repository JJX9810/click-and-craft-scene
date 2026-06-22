import { json, nowISO, dbMissing } from "./_common.js";

// GET /api/health – prüft API + D1-Erreichbarkeit (ohne sensible Daten)
export async function onRequestGet({ env }) {
  if (dbMissing(env)) {
    return json({ ok: false, timestamp: nowISO(), db: "D1-Binding 'DB' nicht gefunden" }, 200);
  }
  try {
    const r = await env.DB.prepare("select 1 as ok").first();
    const up = !!(r && Number(r.ok) === 1);
    return json({ ok: up, timestamp: nowISO(), db: up ? "erreichbar" : "Antwort unerwartet" }, 200);
  } catch (_e) {
    return json({ ok: false, timestamp: nowISO(), db: "DB-Zugriff fehlgeschlagen" }, 200);
  }
}
