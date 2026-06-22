// Cockpit-Authentifizierung: Nutzer + Rolle (server-/RLS-gestuetzt).
import { useEffect, useState } from "react";
import { db } from "./db";

export interface CockpitAuth {
  status: "loading" | "authed" | "anon";
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
}

export function useCockpitAuth(): CockpitAuth {
  const [auth, setAuth] = useState<CockpitAuth>({
    status: "loading",
    userId: null,
    email: null,
    isAdmin: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await db.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setAuth({ status: "anon", userId: null, email: null, isAdmin: false });
        return;
      }
      const { data: roles } = await db.from("user_roles").select("role").eq("user_id", user.id);
      if (cancelled) return;
      const isAdmin = !!roles?.some((r: { role: string }) => r.role === "admin");
      setAuth({ status: "authed", userId: user.id, email: user.email ?? null, isAdmin });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return auth;
}
