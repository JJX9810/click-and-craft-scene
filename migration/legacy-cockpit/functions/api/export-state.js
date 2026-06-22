import { json, nowISO, dbMissing, ensureSchema, STATE_ID } from "./_common.js";

// GET /api/export-state – aktuellen D1-State als JSON-Download (bereits secret-frei vom Client gespeichert)
export async function onRequestGet({ env }) {
  if (dbMissing(env)) return json({ ok: false, error: "db_unavailable" }, 503);
  try {
    await ensureSchema(env);
    const row = await env.DB
      .prepare("select state_json, revision, updated_at from cockpit_state where id = ?")
      .bind(STATE_ID).first();

    let payload;
    if (!row) {
      payload = { ok: true, exists: false, revision: 0, updated_at: null, state: {}, exported_at: nowISO() };
    } else {
      let state = {};
      try { state = JSON.parse(row.state_json); } catch (_e) { state = {}; }
      payload = { ok: true, exists: true, revision: Number(row.revision || 0), updated_at: row.updated_at, state, exported_at: nowISO() };
    }
    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": "attachment; filename=vv-cockpit-state.json",
        "cache-control": "no-store"
      }
    });
  } catch (_e) {
    return json({ ok: false, error: "export_failed" }, 500);
  }
}
