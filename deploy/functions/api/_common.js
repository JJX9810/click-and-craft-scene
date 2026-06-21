/**
 * Gemeinsame Helfer für die V&V-Cockpit Pages Functions (D1 State-Sync, Phase 1).
 * Dateiname mit führendem "_" => wird von Cloudflare Pages NICHT als Route behandelt.
 * Keine Secrets, keine sensiblen Logs.
 */

export const WORKSPACE_ID = "vv-main";
export const STATE_ID = "main";
// Schutzgrenze, damit ein zu großer State D1 nicht sprengt (Fotos/PDFs gehören nicht hierher).
export const MAX_STATE_BYTES = 4 * 1024 * 1024; // 4 MB
export const KEEP_VERSIONS = 30;                 // Versionshistorie begrenzen

export function nowISO(){ return new Date().toISOString(); }

export function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: Object.assign({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }, extraHeaders)
  });
}

export function dbMissing(env){ return !env || !env.DB; }

/**
 * Maskierte Actor-Kennung aus der von Cloudflare Access verifizierten Identität.
 * Access setzt diesen Header am Rand; er ist serverseitig vertrauenswürdig.
 * Es wird NIE eine vom Browser gelieferte E-Mail blind übernommen.
 */
export function actorFromRequest(request){
  try{
    const e = request.headers.get("Cf-Access-Authenticated-User-Email");
    if(e && e.indexOf("@") > 0){
      const p = e.split("@");
      return p[0].slice(0,2) + "***@" + p[1];   // maskiert, keine vollständige E-Mail speichern
    }
  }catch(_){}
  return "cockpit";
}

/** Legt die minimalen Tabellen idempotent an. */
export async function ensureSchema(env){
  await env.DB.batch([
    env.DB.prepare(
      "create table if not exists cockpit_state (" +
      "id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL, state_json TEXT NOT NULL, " +
      "revision INTEGER NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT, size_bytes INTEGER)"
    ),
    env.DB.prepare(
      "create table if not exists cockpit_state_versions (" +
      "id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL, state_json TEXT NOT NULL, " +
      "revision INTEGER NOT NULL, created_at TEXT NOT NULL, created_by TEXT, size_bytes INTEGER)"
    ),
    env.DB.prepare(
      "create table if not exists cockpit_users (" +
      "email TEXT PRIMARY KEY, role TEXT NOT NULL, created_at TEXT NOT NULL, last_seen_at TEXT)"
    )
  ]);
}
