import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import {
  KUECHE_MONTAGE_PRICE,
  SOCKEL_PRICE,
  SPACHTELN_PRICE,
} from "@/lib/pricing";

/**
 * Schlankes Chat-Fenster ohne KI: beantwortet die häufigsten Fragen mit den
 * echten Preisen (eine Preiswahrheit: lib/pricing) und leitet individuelle
 * Fragen als vorgetippte WhatsApp-Nachricht direkt an Justus weiter.
 */

const WA = "https://wa.me/491634799286?text=";

type Msg = { from: "bot" | "user"; text: string; wa?: string };

const ANSWERS: { key: string; q: string; a: string }[] = [
  {
    key: "boden",
    q: "Was kostet die Bodenverlegung?",
    a: `Unsere Richtpreise (Arbeitslohn, gemäß § 19 UStG ohne Umsatzsteuer):\n• Laminat: 16 €/m²\n• Vinyl schwimmend: 18 €/m² · verklebt: 22 €/m²\n• PVC: 12–15 €/m²\n• Teppich: 10–12 €/m²\n• Spachteln: ${SPACHTELN_PRICE} €/m² · Sockelleisten: ${SOCKEL_PRICE} €/lfm\n\nVerbindlich wird es nach Fotos und Maßen – der Kostenrechner auf der Preise-Seite liefert in 2 Minuten eine erste Einschätzung.`,
  },
  {
    key: "kueche",
    q: "Was kostet die Küchenmontage?",
    a: `Küchenmontage: ${KUECHE_MONTAGE_PRICE} €/lfm (Arbeitslohn). Der Endpreis hängt von Küchenlänge, Umfang und Arbeitsplatte ab. Schicken Sie uns Fotos und Maße per WhatsApp – Sie bekommen zügig eine ehrliche Einschätzung.`,
  },
  {
    key: "gebiet",
    q: "Wo seid ihr im Einsatz?",
    a: "Unser Kerngebiet: Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland und Wittmund. Größere Projekte auch darüber hinaus – gemeinsam mit unserem Partnernetzwerk (z. B. JS Küchenduo, Raum Ruhrgebiet/Rheinland).",
  },
  {
    key: "ablauf",
    q: "Wie läuft eine Anfrage ab?",
    a: "Ganz unkompliziert:\n1. Sie schicken Fotos + grobe Maße per WhatsApp\n2. Sie erhalten eine ehrliche Einschätzung\n3. Termin – bei Bedarf mit Aufmaß vor Ort\n4. Saubere Ausführung und Übergabe\n\nEin Ansprechpartner von Anfang bis Ende.",
  },
  {
    key: "besichtigung",
    q: "Was kostet die Besichtigung?",
    a: "Die Vor-Ort-Besichtigung kostet pauschal 39 €. Bei Auftragserteilung wird die Pauschale vollständig verrechnet – wer beauftragt, zahlt dafür im Ergebnis nichts. Danach bekommen Sie ein verbindliches Angebot statt einer Schätzung.",
  },
  {
    key: "netzwerk",
    q: "Macht ihr auch andere Gewerke?",
    a: "Selbst übernehmen wir Boden, Küche, Küchenfolierung und Entrümpelung. Für Gewerke wie Elektrik, Sanitär oder Malerarbeiten vermitteln und koordinieren wir geprüfte Partnerbetriebe – Sie behalten einen Ansprechpartner: uns.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, open]);

  const openChat = () => {
    setOpen((o) => !o);
    if (!started) {
      setStarted(true);
      setMsgs([
        { from: "bot", text: "Moin! Schön, dass Sie da sind. Was möchten Sie wissen?" },
      ]);
    }
  };

  const ask = (q: string, a: string) => {
    setMsgs((m) => [
      ...m,
      { from: "user", text: q },
      { from: "bot", text: a, wa: WA + encodeURIComponent(`Hallo, ich habe eine Frage zu: ${q} `) },
    ]);
  };

  const sendFree = () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMsgs((m) => [
      ...m,
      { from: "user", text: t },
      {
        from: "bot",
        text: "Gute Frage – die beantwortet Ihnen Justus am besten persönlich. Ein Klick, und Ihre Frage ist bei ihm im WhatsApp:",
        wa: WA + encodeURIComponent(`Hallo, ich habe eine Frage: ${t} `),
      },
    ]);
  };

  return (
    <>
      <button
        onClick={openChat}
        aria-label={open ? "Chat schließen" : "Fragen? Chat öffnen"}
        className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition hover:brightness-110 bottom-24 md:bottom-5 md:right-5"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-[#25D366]" />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Schnelle Fragen an Verlegt & Verschraubt"
          className="fixed right-4 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl bottom-40 max-h-[min(560px,calc(100svh-12rem))] md:bottom-24 md:right-5 md:max-h-[min(600px,calc(100svh-8rem))]"
        >
          <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-3">
            <img src="/logo-badge-rund.webp" alt="" className="h-9 w-9 rounded-full" width={512} height={512} />
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold">Verlegt &amp; Verschraubt</p>
              <p className="truncate text-xs text-muted-foreground">Schnelle Antworten · direkter Draht zu Justus</p>
            </div>
          </div>

          <div ref={bodyRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className={
                    m.from === "bot"
                      ? "max-w-[88%] self-start whitespace-pre-line rounded-2xl rounded-bl-sm border border-border bg-secondary/60 px-3.5 py-2.5 text-sm leading-relaxed"
                      : "max-w-[88%] self-end whitespace-pre-line rounded-2xl rounded-br-sm bg-accent px-3.5 py-2.5 text-sm font-medium text-accent-foreground"
                  }
                >
                  {m.text}
                </div>
                {i === 0 && (
                  <div className="flex flex-wrap gap-2">
                    {ANSWERS.map((x) => (
                      <button
                        key={x.key}
                        onClick={() => ask(x.q, x.a)}
                        className="min-h-[38px] rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-[13px] text-accent transition hover:bg-accent/20"
                      >
                        {x.q}
                      </button>
                    ))}
                  </div>
                )}
                {m.wa && (
                  <a
                    href={m.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Direkt per WhatsApp weiterfragen
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-border bg-secondary/60 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendFree()}
              placeholder="Ihre Frage eingeben …"
              aria-label="Ihre Frage"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-base outline-none focus:border-accent"
            />
            <button
              onClick={sendFree}
              aria-label="Senden"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:brightness-110"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
          <p className="bg-secondary/60 px-4 pb-2.5 text-center text-[10.5px] leading-snug text-muted-foreground">
            Kein KI-Chat – vordefinierte Antworten. Individuelle Fragen gehen per WhatsApp direkt an uns.
          </p>
        </div>
      )}
    </>
  );
}
