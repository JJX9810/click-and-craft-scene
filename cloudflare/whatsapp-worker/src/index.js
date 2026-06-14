/**
 * V&V Cockpit – WhatsApp-Versand-Worker (Cloudflare Worker)
 * ---------------------------------------------------------
 * Separater, optionaler Dienst für den AUTOMATISCHEN Versand von
 * Angebots-/Rechnungs-PDFs über die offizielle WhatsApp-Business-API (Meta Graph).
 *
 * WICHTIG
 *  - Dieser Worker wird NICHT automatisch deployt. Erst nach manueller
 *    Einrichtung der Meta-App, der Templates und der Secrets aktivieren.
 *  - ALLE Zugangsdaten kommen ausschließlich aus Worker-Secrets/Env –
 *    niemals aus dem Browser, dem Repo oder dem Cockpit-Backup.
 *  - Es werden keine PDF-Inhalte und keine personenbezogenen Daten geloggt.
 *
 * Endpunkte:
 *   GET  /api/whatsapp/health         → einfacher Liveness-Check
 *   GET  /api/whatsapp/config-status  → welche Secrets gesetzt sind (true/false, KEINE Werte)
 *   POST /api/whatsapp/send-document  → multipart/form-data, lädt PDF hoch + sendet
 *   GET  /api/whatsapp/status?id=...  → Zustellstatus (aus KV, falls vorhanden)
 *   GET  /api/whatsapp/webhook        → Meta-Verify (hub.challenge)
 *   POST /api/whatsapp/webhook        → Statusupdates (Signatur wird geprüft)
 *
 * Erwartete Env/Secrets (siehe wrangler.toml.example):
 *   WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_BUSINESS_ACCOUNT_ID,
 *   WHATSAPP_APP_SECRET, WHATSAPP_WEBHOOK_VERIFY_TOKEN,
 *   WHATSAPP_TEMPLATE_OFFER, WHATSAPP_TEMPLATE_INVOICE
 *   ALLOWED_ORIGIN (var, z. B. https://vv-cockpit.pages.dev)
 *   Optional Bindings: IDEMPOTENCY (KV), STATUS (KV), RATE (KV)
 */

const GRAPH_VERSION = "v20.0";
const MAX_PDF_BYTES = 15 * 1024 * 1024; // WhatsApp-Dokumentlimit ~100MB, hier konservativ
const RATE_MAX = 20;                     // Anfragen pro Fenster
const RATE_WINDOW_S = 60;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "");
    const cors = corsHeaders(env, request);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    try {
      if (path === "/api/whatsapp/health" && request.method === "GET") {
        return json({ ok: true, service: "vv-whatsapp-worker", time: new Date().toISOString() }, 200, cors);
      }
      if (path === "/api/whatsapp/config-status" && request.method === "GET") {
        return json(configStatus(env), 200, cors);
      }
      if (path === "/api/whatsapp/webhook" && request.method === "GET") {
        return webhookVerify(url, env);
      }
      if (path === "/api/whatsapp/webhook" && request.method === "POST") {
        return webhookReceive(request, env, ctx);
      }
      if (path === "/api/whatsapp/status" && request.method === "GET") {
        return statusLookup(url, env, cors);
      }
      if (path === "/api/whatsapp/send-document" && request.method === "POST") {
        return sendDocument(request, env, ctx, cors);
      }
      return json({ ok: false, error: "not_found" }, 404, cors);
    } catch (err) {
      // Fehler normalisieren – keine internen Details/Token preisgeben
      return json({ ok: false, error: "internal_error" }, 500, cors);
    }
  }
};

/* ---------------- CORS / Origin ---------------- */
function allowedOrigin(env) { return (env.ALLOWED_ORIGIN || "").trim(); }
function corsHeaders(env, request) {
  const allow = allowedOrigin(env);
  const origin = request.headers.get("Origin") || "";
  const ok = allow && origin && origin === allow;
  return {
    "Access-Control-Allow-Origin": ok ? origin : (allow || "null"),
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin"
  };
}
function originAllowed(env, request) {
  const allow = allowedOrigin(env);
  if (!allow) return false; // ohne konfigurierte Origin nichts annehmen
  const origin = request.headers.get("Origin") || "";
  if (origin) return origin === allow;
  // Fallback: Referer prüfen
  const ref = request.headers.get("Referer") || "";
  return ref.startsWith(allow);
}

/* ---------------- Config-Status (keine Secrets) ---------------- */
function configStatus(env) {
  const has = (k) => !!(env[k] && String(env[k]).length > 0);
  return {
    ok: true,
    configured:
      has("WHATSAPP_ACCESS_TOKEN") && has("WHATSAPP_PHONE_NUMBER_ID"),
    secrets: {
      WHATSAPP_ACCESS_TOKEN: has("WHATSAPP_ACCESS_TOKEN"),
      WHATSAPP_PHONE_NUMBER_ID: has("WHATSAPP_PHONE_NUMBER_ID"),
      WHATSAPP_BUSINESS_ACCOUNT_ID: has("WHATSAPP_BUSINESS_ACCOUNT_ID"),
      WHATSAPP_APP_SECRET: has("WHATSAPP_APP_SECRET"),
      WHATSAPP_WEBHOOK_VERIFY_TOKEN: has("WHATSAPP_WEBHOOK_VERIFY_TOKEN"),
      WHATSAPP_TEMPLATE_OFFER: has("WHATSAPP_TEMPLATE_OFFER"),
      WHATSAPP_TEMPLATE_INVOICE: has("WHATSAPP_TEMPLATE_INVOICE")
    },
    allowedOriginSet: !!allowedOrigin(env)
  };
}

/* ---------------- Rate-Limit (best effort, KV optional) ---------------- */
async function rateLimited(env, key) {
  if (!env.RATE) return false;
  const bucket = "rate:" + key + ":" + Math.floor(Date.now() / 1000 / RATE_WINDOW_S);
  const cur = parseInt((await env.RATE.get(bucket)) || "0", 10) + 1;
  await env.RATE.put(bucket, String(cur), { expirationTtl: RATE_WINDOW_S + 5 });
  return cur > RATE_MAX;
}

/* ---------------- E.164-Validierung ---------------- */
function validE164(s) { return /^\+[1-9]\d{7,14}$/.test(String(s || "")); }

/* ---------------- Hauptpfad: Dokument senden ---------------- */
async function sendDocument(request, env, ctx, cors) {
  if (!originAllowed(env, request)) return json({ ok: false, error: "forbidden_origin" }, 403, cors);
  if (!(env.WHATSAPP_ACCESS_TOKEN && env.WHATSAPP_PHONE_NUMBER_ID))
    return json({ ok: false, error: "worker_not_configured" }, 503, cors);

  // Cloudflare-Access-Identität (falls Access vorgeschaltet) – nur lesen, nicht erfinden
  const actor = request.headers.get("Cf-Access-Authenticated-User-Email") || "";

  let form;
  try { form = await request.formData(); }
  catch { return json({ ok: false, error: "bad_request" }, 400, cors); }

  const file = form.get("file");
  const normalizedPhone = String(form.get("normalizedPhone") || "");
  const documentType = String(form.get("documentType") || "offer");
  const documentNumber = String(form.get("documentNumber") || "");
  const fileName = String(form.get("fileName") || "Dokument.pdf");
  const messageText = String(form.get("messageText") || "");
  const idempotencyId = String(form.get("idempotencyId") || "");
  const optInConfirmed = String(form.get("optInConfirmed") || "") === "1";
  const templateName = String(form.get("templateName") || "");

  // Validierung
  if (!file || typeof file === "string") return json({ ok: false, error: "no_file" }, 400, cors);
  if (!validE164(normalizedPhone)) return json({ ok: false, error: "invalid_phone" }, 400, cors);
  if (!optInConfirmed) return json({ ok: false, error: "no_optin" }, 412, cors);
  const ctype = file.type || "";
  if (ctype && !/pdf|octet-stream|html/.test(ctype)) {
    // Hinweis: das Cockpit liefert derzeit ggf. HTML; echte PDFs sind erwünscht.
  }
  const buf = await file.arrayBuffer();
  if (buf.byteLength > MAX_PDF_BYTES) return json({ ok: false, error: "file_too_large" }, 413, cors);

  // Rate-Limit
  if (await rateLimited(env, normalizedPhone)) return json({ ok: false, error: "rate_limited" }, 429, cors);

  // Idempotenz: doppelte Sendung verhindern
  if (idempotencyId && env.IDEMPOTENCY) {
    const seen = await env.IDEMPOTENCY.get("idem:" + idempotencyId);
    if (seen) return json({ ok: true, deduped: true, messageId: seen }, 200, cors);
  }

  const phoneId = env.WHATSAPP_PHONE_NUMBER_ID;
  const token = env.WHATSAPP_ACCESS_TOKEN;
  const to = normalizedPhone.replace(/^\+/, "");

  // 1) Medien-Upload
  let mediaId;
  try {
    const up = new FormData();
    up.append("messaging_product", "whatsapp");
    up.append("type", ctype || "application/pdf");
    up.append("file", new Blob([buf], { type: ctype || "application/pdf" }), fileName);
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/media`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: up
    });
    if (r.status === 429) return json({ ok: false, error: "rate_limited" }, 429, cors);
    if (!r.ok) return json({ ok: false, error: "upload_failed", status: r.status }, 502, cors);
    mediaId = (await r.json()).id;
    if (!mediaId) return json({ ok: false, error: "upload_failed" }, 502, cors);
  } catch {
    return json({ ok: false, error: "upload_failed" }, 502, cors);
  }

  // 2) Nachricht senden: bevorzugt freie Dokumentnachricht (nur im 24h-Servicefenster
  //    zuverlässig). Wenn ein Template gefordert/konfiguriert ist, dieses verwenden.
  const useTemplate = !!templateName ||
    (documentType === "invoice" ? !!env.WHATSAPP_TEMPLATE_INVOICE : !!env.WHATSAPP_TEMPLATE_OFFER);
  const tplName = templateName ||
    (documentType === "invoice" ? env.WHATSAPP_TEMPLATE_INVOICE : env.WHATSAPP_TEMPLATE_OFFER);

  let payload;
  if (useTemplate && tplName) {
    payload = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: tplName,
        language: { code: "de" },
        components: [
          { type: "header", parameters: [{ type: "document", document: { id: mediaId, filename: fileName } }] },
          { type: "body", parameters: [
            { type: "text", text: (documentNumber || "-") }
          ] }
        ]
      }
    };
  } else {
    payload = {
      messaging_product: "whatsapp",
      to,
      type: "document",
      document: { id: mediaId, filename: fileName, caption: messageText.slice(0, 1000) }
    };
  }

  let messageId;
  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (r.status === 429) return json({ ok: false, error: "rate_limited" }, 429, cors);
    if (!r.ok) {
      let code = r.status;
      return json({ ok: false, error: "send_failed", status: code }, 502, cors);
    }
    const body = await r.json();
    messageId = body && body.messages && body.messages[0] && body.messages[0].id;
  } catch {
    return json({ ok: false, error: "send_failed" }, 502, cors);
  }

  // Idempotenz + Status merken (ohne personenbezogene Inhalte)
  if (messageId && idempotencyId && env.IDEMPOTENCY) {
    ctx.waitUntil(env.IDEMPOTENCY.put("idem:" + idempotencyId, messageId, { expirationTtl: 60 * 60 * 24 }));
  }
  if (messageId && env.STATUS) {
    ctx.waitUntil(env.STATUS.put("msg:" + messageId, JSON.stringify({ status: "accepted", at: Date.now(), documentType }), { expirationTtl: 60 * 60 * 24 * 30 }));
  }

  return json({ ok: true, messageId: messageId || null, status: "accepted" }, 200, cors);
}

/* ---------------- Status-Abfrage ---------------- */
async function statusLookup(url, env, cors) {
  const id = url.searchParams.get("id") || "";
  if (!id) return json({ ok: false, error: "no_message_id" }, 400, cors);
  if (!env.STATUS) return json({ ok: true, status: "unknown", note: "kein STATUS-KV gebunden" }, 200, cors);
  const raw = await env.STATUS.get("msg:" + id);
  if (!raw) return json({ ok: true, status: "unknown" }, 200, cors);
  return json({ ok: true, status: JSON.parse(raw) }, 200, cors);
}

/* ---------------- Webhook-Verify ---------------- */
function webhookVerify(url, env) {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token && token === env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge || "", { status: 200 });
  }
  return new Response("forbidden", { status: 403 });
}

/* ---------------- Webhook-Empfang (Signatur prüfen) ---------------- */
async function webhookReceive(request, env, ctx) {
  const raw = await request.text();
  const sig = request.headers.get("X-Hub-Signature-256") || "";
  const valid = await verifySignature(raw, sig, env.WHATSAPP_APP_SECRET);
  if (!valid) return new Response("invalid signature", { status: 401 });

  // Statusupdates extrahieren – KEINE vollständigen Nutzdaten loggen
  try {
    const body = JSON.parse(raw);
    const entries = (body.entry || []);
    for (const e of entries) {
      for (const ch of (e.changes || [])) {
        const statuses = (ch.value && ch.value.statuses) || [];
        for (const st of statuses) {
          if (st.id && env.STATUS) {
            ctx.waitUntil(env.STATUS.put("msg:" + st.id, JSON.stringify({ status: st.status, at: Date.now() }), { expirationTtl: 60 * 60 * 24 * 30 }));
          }
        }
      }
    }
  } catch { /* ignorieren */ }
  return new Response("ok", { status: 200 });
}

async function verifySignature(raw, header, appSecret) {
  if (!appSecret || !header || !header.startsWith("sha256=")) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(appSecret),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
    const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
    return timingSafeEqual("sha256=" + hex, header);
  } catch { return false; }
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

/* ---------------- JSON-Helper ---------------- */
function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, cors || {})
  });
}
