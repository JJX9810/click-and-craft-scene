
DROP POLICY IF EXISTS "Admins delete active_sessions" ON public.active_sessions;
DROP POLICY IF EXISTS "Admins read active_sessions" ON public.active_sessions;
DROP POLICY IF EXISTS "Admins delete calc_sessions" ON public.calculator_sessions;
DROP POLICY IF EXISTS "Admins read calc_sessions" ON public.calculator_sessions;
DROP POLICY IF EXISTS "Admins delete calc_subs" ON public.calculator_submissions;
DROP POLICY IF EXISTS "Admins read calc_subs" ON public.calculator_submissions;
DROP POLICY IF EXISTS "Admins delete page_views" ON public.page_views;
DROP POLICY IF EXISTS "Admins read page_views" ON public.page_views;

DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user_role();
DROP TABLE IF EXISTS public.user_roles;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP TYPE IF EXISTS public.app_role;
