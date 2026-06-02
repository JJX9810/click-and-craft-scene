import { supabase } from "@/integrations/supabase/client";
import { getVisitorSessionId } from "./visitor-session";

const isBrowser = () => typeof window !== "undefined";

export async function trackPageView(path: string) {
  if (!isBrowser()) return;
  const session_id = getVisitorSessionId();
  const ua = navigator.userAgent.slice(0, 255);
  const referrer = document.referrer ? document.referrer.slice(0, 500) : null;
  try {
    await Promise.all([
      supabase.from("page_views").insert({ session_id, path, referrer, user_agent: ua }),
      supabase.from("active_sessions").upsert(
        { session_id, path, user_agent: ua, last_seen_at: new Date().toISOString() },
        { onConflict: "session_id" },
      ),
    ]);
  } catch {
    /* tracking darf nie crashen */
  }
}

export async function heartbeat(path: string) {
  if (!isBrowser()) return;
  const session_id = getVisitorSessionId();
  try {
    await supabase
      .from("active_sessions")
      .update({ last_seen_at: new Date().toISOString(), path })
      .eq("session_id", session_id);
  } catch {
    /* */
  }
}

export async function upsertCalcSession(snapshot: Record<string, unknown>, totalEstimate: number | null) {
  if (!isBrowser()) return;
  const session_id = getVisitorSessionId();
  try {
    await supabase.from("calculator_sessions").upsert(
      {
        session_id,
        snapshot,
        total_estimate: totalEstimate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_id" },
    );
  } catch {
    /* */
  }
}

export async function submitCalculation(snapshot: Record<string, unknown>, totalEstimate: number | null) {
  if (!isBrowser()) return;
  const session_id = getVisitorSessionId();
  try {
    await supabase.from("calculator_submissions").insert({
      session_id,
      snapshot,
      total_estimate: totalEstimate,
    });
  } catch {
    /* */
  }
}
