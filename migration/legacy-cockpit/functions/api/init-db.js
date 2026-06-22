import { json, nowISO, dbMissing, ensureSchema } from "./_common.js";

// POST /api/init-db – legt Tabellen idempotent an.
export async function onRequestPost({ env }) {
  if (dbMissing(env)) return json({ ok: false, error: "db_unavailable", message: "D1-Binding 'DB' fehlt" }, 503);
  try {
    await ensureSchema(env);
    return json({ ok: true, timestamp: nowISO(), message: "Tabellen vorhanden oder neu angelegt (idempotent)." });
  } catch (_e) {
    return json({ ok: false, error: "init_failed" }, 500);
  }
}

// GET /api/init-db – aus Bequemlichkeit (Aufruf im Browser/Handy); identisch & idempotent.
export async function onRequestGet(ctx) { return onRequestPost(ctx); }
