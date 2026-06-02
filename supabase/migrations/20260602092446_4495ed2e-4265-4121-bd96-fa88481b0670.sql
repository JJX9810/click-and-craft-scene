
-- Rollen-Enum + user_roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins see all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Erster registrierter Nutzer wird Admin
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- page_views (Seitenaufrufe)
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX page_views_created_at_idx ON public.page_views(created_at DESC);
CREATE INDEX page_views_path_idx ON public.page_views(path);

GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT, DELETE ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page_views" ON public.page_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins read page_views" ON public.page_views
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete page_views" ON public.page_views
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- active_sessions
CREATE TABLE public.active_sessions (
  session_id TEXT PRIMARY KEY,
  path TEXT NOT NULL,
  user_agent TEXT,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX active_sessions_last_seen_idx ON public.active_sessions(last_seen_at DESC);

GRANT INSERT, UPDATE ON public.active_sessions TO anon, authenticated;
GRANT SELECT, DELETE ON public.active_sessions TO authenticated;
GRANT ALL ON public.active_sessions TO service_role;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone insert active_sessions" ON public.active_sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone update active_sessions" ON public.active_sessions
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins read active_sessions" ON public.active_sessions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete active_sessions" ON public.active_sessions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- calculator_sessions (Live-Eingaben)
CREATE TABLE public.calculator_sessions (
  session_id TEXT PRIMARY KEY,
  snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_estimate NUMERIC,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX calc_sessions_updated_idx ON public.calculator_sessions(updated_at DESC);

GRANT INSERT, UPDATE ON public.calculator_sessions TO anon, authenticated;
GRANT SELECT, DELETE ON public.calculator_sessions TO authenticated;
GRANT ALL ON public.calculator_sessions TO service_role;
ALTER TABLE public.calculator_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone insert calc_sessions" ON public.calculator_sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone update calc_sessions" ON public.calculator_sessions
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins read calc_sessions" ON public.calculator_sessions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete calc_sessions" ON public.calculator_sessions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- calculator_submissions
CREATE TABLE public.calculator_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_estimate NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX calc_subs_created_idx ON public.calculator_submissions(created_at DESC);

GRANT INSERT ON public.calculator_submissions TO anon, authenticated;
GRANT SELECT, DELETE ON public.calculator_submissions TO authenticated;
GRANT ALL ON public.calculator_submissions TO service_role;
ALTER TABLE public.calculator_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone insert calc_subs" ON public.calculator_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins read calc_subs" ON public.calculator_submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete calc_subs" ON public.calculator_submissions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Realtime aktivieren
ALTER TABLE public.active_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.calculator_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.calculator_submissions REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.active_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.calculator_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.calculator_submissions;
