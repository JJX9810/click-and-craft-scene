import { json, nowISO, dbMissing, ensureSchema, actorFromRequest,
         WORKSPACE_ID, STATE_ID, MAX_STATE_BYTES, KEEP_VERSIONS } from "./_common.js";

// GET /api/state – aktuellen zentralen Cockpit-State laden
export async function onRequestGet({ env }) {
  if (dbMissing(env)) return json({ ok: false, error: "db_unavailable" }, 503);
  try {
    await ensureSchema(env);
    const row = await env.DB
      .prepare("select state_json, revision, updated_at, updated_by, size_bytes from cockpit_state where id = ?")
      .bind(STATE_ID).first();
    if (!row) {
      // Noch kein State -> leerer Initialstand mit Revision 0
      return json({ ok: true, exists: false, revision: 0, state: {}, updated_at: null });
    }
    let state = {};
    try { state = JSON.parse(row.state_json); } catch (_e) { state = {}; }
    return json({
      ok: true, exists: true, revision: Number(row.revision || 0),
      state, updated_at: row.updated_at, updated_by: row.updated_by || null,
      size_bytes: Number(row.size_bytes || 0)
    });
  } catch (_e) {
    return json({ ok: false, error: "read_failed" }, 500);
  }
}

// POST /api/state – zentralen Cockpit-State speichern (optimistic concurrency)
export async function onRequestPost({ request, env }) {
  if (dbMissing(env)) return json({ ok: false, error: "db_unavailable" }, 503);

  let body;
  try { body = await request.json(); } catch (_e) { return json({ ok: false, error: "bad_json" }, 400); }

  const clientRev = Number(body && body.revision);
  const state = body && body.state;
  if (!Number.isFinite(clientRev) || clientRev < 0 || typeof state !== "object" || state === null) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const stateJson = JSON.stringify(state);
  const size = stateJson.length;
  if (size > MAX_STATE_BYTES) {
    // Schutz: zu großer State (z. B. eingebettete Fotos/PDFs) wird nicht gespeichert.
    return json({ ok: false, error: "payload_too_large", size_bytes: size, max_bytes: MAX_STATE_BYTES }, 413);
  }

  try {
    await ensureSchema(env);
    const cur = await env.DB
      .prepare("select revision, state_json from cockpit_state where id = ?")
      .bind(STATE_ID).first();
    const serverRev = cur ? Number(cur.revision || 0) : 0;

    // Server neuer als Client -> Konflikt, NICHT überschreiben
    if (serverRev > clientRev) {
      return json({ ok: false, error: "conflict", serverRevision: serverRev }, 409);
    }

    const newRev = serverRev + 1;
    const ts = nowISO();
    const actor = actorFromRequest(request);
    const stmts = [];

    if (cur) {
      // alte Version sichern
      stmts.push(env.DB
        .prepare("insert into cockpit_state_versions (id, workspace_id, state_json, revision, created_at, created_by, size_bytes) values (?,?,?,?,?,?,?)")
        .bind("ver_" + serverRev + "_" + Date.now(), WORKSPACE_ID, cur.state_json, serverRev, ts, actor, cur.state_json.length));
      stmts.push(env.DB
        .prepare("update cockpit_state set state_json = ?, revision = ?, updated_at = ?, updated_by = ?, size_bytes = ? where id = ?")
        .bind(stateJson, newRev, ts, actor, size, STATE_ID));
    } else {
      stmts.push(env.DB
        .prepare("insert into cockpit_state (id, workspace_id, state_json, revision, updated_at, updated_by, size_bytes) values (?,?,?,?,?,?,?)")
        .bind(STATE_ID, WORKSPACE_ID, stateJson, newRev, ts, actor, size));
    }
    await env.DB.batch(stmts);

    // Versionshistorie begrenzen (best effort, getrennt – kein harter Fehler)
    try {
      await env.DB.prepare(
        "delete from cockpit_state_versions where workspace_id = ?1 and revision <= ?2"
      ).bind(WORKSPACE_ID, newRev - 1 - KEEP_VERSIONS).run();
    } catch (_e) {}

    return json({ ok: true, revision: newRev, updated_at: ts, size_bytes: size });
  } catch (_e) {
    return json({ ok: false, error: "write_failed" }, 500);
  }
}
