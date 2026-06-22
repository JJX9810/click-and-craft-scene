// Cockpit-Datenzugriff.
// Wir verwenden DENSELBEN Supabase-Client wie die restliche App (gleiche Auth-Session,
// gleiches Realtime), aber ungetypt: die Cockpit-Tabellen sind (noch) nicht Teil der
// generierten Supabase-Typen. Ergebnisse werden ueber eigene Interfaces (lib/types.ts) typisiert.
//
// Nach dem Anwenden der Migrationen koennen die Typen via Supabase-CLI neu generiert werden;
// dann kann dieser Cast entfallen.
import { supabase } from "@/integrations/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const db = supabase as unknown as SupabaseClient;

/** Standard-Filter: nur nicht (soft-)geloeschte Zeilen. */
export const notDeleted = "deleted_at" as const;
