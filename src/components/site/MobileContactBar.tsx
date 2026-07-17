import { useEffect, useState } from "react";
import { Phone, MessageSquare } from "lucide-react";

const WA_HREF =
  "https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20";

/**
 * Mobile Kontaktleiste – nur < md sichtbar, fixiert am unteren Rand.
 * Erscheint nach ~400px Scroll und bleibt danach stehen.
 * Beachtet safe-area-inset-bottom (iPhone).
 */
export function MobileContactBar() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const mqListener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", mqListener);

    const onScroll = () => {
      if (window.scrollY > 400) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", mqListener);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 backdrop-blur md:hidden ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      } ${reduceMotion ? "" : "transition-opacity duration-200"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2">
        <a
          href="tel:+491634799286"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground hover:border-accent/60 hover:text-accent"
        >
          <Phone className="h-4 w-4" />
          Anrufen
        </a>
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          <MessageSquare className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
