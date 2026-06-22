// Laedt eine Liste und abonniert Realtime-Aenderungen der Tabelle.
// Bei jeder Aenderung (auch von einem anderen Geraet) wird neu geladen
// -> PC und Handy zeigen automatisch denselben Stand.
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "./db";

export function useRealtimeQuery<T>(table: string, load: () => Promise<T[]>, deps: unknown[] = []) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const loadRef = useRef(load);
  loadRef.current = load;

  const reload = useCallback(async () => {
    try {
      const r = await loadRef.current();
      setRows(r);
    } catch (e) {
      console.error(`[cockpit] load ${table} failed`, e);
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    reload();
    const channel = db
      .channel(`rt-${table}-${Math.random().toString(36).slice(2, 8)}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        if (active) reload();
      })
      .subscribe();
    return () => {
      active = false;
      db.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, reload, ...deps]);

  return { rows, loading, reload, setRows };
}
