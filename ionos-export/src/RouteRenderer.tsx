import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { matchRoute } from "./route-registry";
import { LoaderDataProvider, NotFoundError, type RouteRecord } from "./tanstack-shim";
import { NotFound } from "./NotFound";

const SITE_URL = "https://verlegt-verschraubt.de";

type HeadResult = {
  meta?: Array<Record<string, any>>;
  links?: Array<Record<string, any>>;
  scripts?: Array<{ type?: string; children?: string; src?: string }>;
};

/** Wandelt das TanStack-`head()`-Resultat in <Helmet>-Tags um und macht relative URLs absolut. */
function HeadFromTanstack({ head, params, loaderData }: { head?: RouteRecord["head"]; params: any; loaderData: any }) {
  if (!head) return null;
  let result: HeadResult;
  try {
    result = head({ params, loaderData }) || {};
  } catch {
    return null;
  }
  const titleEntry = result.meta?.find((m) => "title" in m);
  const otherMeta = (result.meta ?? []).filter((m) => !("title" in m));

  const absolutize = (val: string) => {
    if (!val) return val;
    if (val.startsWith("http://") || val.startsWith("https://")) return val;
    if (val.startsWith("/")) return SITE_URL + val;
    return val;
  };

  return (
    <Helmet>
      {titleEntry && <title>{String(titleEntry.title)}</title>}
      {otherMeta.map((m, i) => {
        const props: any = { ...m };
        if ((props.property === "og:url" || props.property === "og:image") && props.content) {
          props.content = absolutize(props.content);
        }
        return <meta key={`m-${i}`} {...props} />;
      })}
      {(result.links ?? []).map((l, i) => {
        const props: any = { ...l };
        if (props.rel === "canonical" && props.href) {
          props.href = absolutize(props.href);
        }
        return <link key={`l-${i}`} {...props} />;
      })}
      {(result.scripts ?? []).map((s, i) => {
        if (s.children) {
          return (
            <script key={`s-${i}`} type={s.type ?? "text/javascript"}>
              {s.children}
            </script>
          );
        }
        if (s.src) {
          return <script key={`s-${i}`} type={s.type ?? "text/javascript"} src={s.src} />;
        }
        return null;
      })}
    </Helmet>
  );
}

/** Rendert die zur aktuellen URL passende Route, inkl. Loader, Head und 404-Fallback. */
export function RouteRenderer() {
  const location = useLocation();
  const routeParams = useParams();
  const match = matchRoute(location.pathname);

  if (!match) {
    return <NotFound />;
  }
  const { route, params } = match;
  const allParams = { ...routeParams, ...params };

  // Loader synchron aufrufen (alle existierenden Loader sind synchron).
  let loaderData: any = null;
  let notFoundFromLoader = false;
  if (route.loader) {
    try {
      loaderData = route.loader({ params: allParams, context: {} });
    } catch (err) {
      if (err instanceof NotFoundError || (err as any)?.isNotFound) {
        notFoundFromLoader = true;
      } else {
        throw err;
      }
    }
  }

  if (notFoundFromLoader) {
    return <NotFound />;
  }

  const Component = route.component;

  return (
    <>
      <HeadFromTanstack head={route.head} params={allParams} loaderData={loaderData} />
      <LoaderDataProvider value={loaderData}>{Component ? <Component /> : null}</LoaderDataProvider>
    </>
  );
}
