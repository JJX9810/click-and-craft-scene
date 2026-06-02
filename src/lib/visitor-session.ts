// Anonyme Besucher-Session-ID (sessionStorage, kein localStorage → keine DSGVO-Cookie-Pflicht)
const KEY = "vv_session_id";

export function getVisitorSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = (typeof crypto !== "undefined" && "randomUUID" in crypto)
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(KEY, id);
  }
  return id;
}
