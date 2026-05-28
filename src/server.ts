import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

// Long-cache static assets (hashed JS/CSS bundles + images/fonts in /public).
// HTML responses get a short revalidate window so deployments propagate quickly.
const IMMUTABLE_ASSET_RE = /\.(?:js|mjs|css|woff2?|ttf|otf|eot)$/i;
const CACHEABLE_MEDIA_RE = /\.(?:png|jpe?g|webp|avif|gif|svg|ico|mp4|webm)$/i;

function applyCacheControl(request: Request, response: Response): Response {
  if (response.headers.has("cache-control")) return response;
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return response;
  if (response.status >= 400) return response;

  const url = new URL(request.url);
  const path = url.pathname;
  let value: string | undefined;

  if (path.startsWith("/_build/") || path.startsWith("/assets/") || path.startsWith("/_server/")) {
    value = "public, max-age=31536000, immutable";
  } else if (IMMUTABLE_ASSET_RE.test(path)) {
    value = "public, max-age=31536000, immutable";
  } else if (CACHEABLE_MEDIA_RE.test(path)) {
    value = "public, max-age=2592000, stale-while-revalidate=86400";
  } else {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      value = "public, max-age=0, must-revalidate";
    }
  }

  if (!value) return response;
  const headers = new Headers(response.headers);
  headers.set("cache-control", value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applyCacheControl(request, normalized);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};

