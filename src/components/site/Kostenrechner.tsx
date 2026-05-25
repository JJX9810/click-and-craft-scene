import { useMemo, useState } from "react";
import {
  Layers,
  Wrench,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Copy,
  Phone,
  Check,
  Camera,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

type Service = "boden" | "kueche" | "ent" | "sonst";

type State = {
  service: Service | null;
  // gemeinsam
  ort: string;
  zeitraum: string;
  nachricht: string;
  // boden
  bodenart: string;
  qm: string;
  altEntfernen: "Ja" | "Nein" | "";
  untergrund: "Nein" | "Leicht ausgleichen" | "Vollflächig spachteln" | "Unsicher" | "";
  sockel: "Keine" | "Mit Eckstücken" | "Auf Gehrung" | "";
  tueren: "Ja" | "Nein" | "Unsicher" | "";
  raeumeLeer: "Ja" | "Nein" | "";
  // küche
  kueArt: string;
  kueMeter: string;
  kueArbeit: "Ja" | "Nein" | "Unsicher" | "";
  kueGeraete: "Ja" | "Nein" | "Unsicher" | "";
  kueSpuele: "Ja" | "Nein" | "Unsicher" | "";
  kueDemontage: "Ja" | "Nein" | "";
  kueTransport: "Ja" | "Nein" | "";
  // ent
  entObjekt: string;
  entMenge: "" | "klein" | "mittel" | "groß" | "sehr groß";
  entEtage: string;
  entAufzug: "Ja" | "Nein" | "";
  entEntsorgen: "Ja" | "Nein" | "";
  // sonst
  sonstText: string;
};

const initial: State = {
  service: null,
  ort: "",
  zeitraum: "",
  nachricht: "",
  bodenart: "Vinyl",
  qm: "",
  altEntfernen: "",
  untergrund: "",
  sockel: "",
  tueren: "",
  raeumeLeer: "",
  kueArt: "Neue Küche",
  kueMeter: "",
  kueArbeit: "",
  kueGeraete: "",
  kueSpuele: "",
  kueDemontage: "",
  kueTransport: "",
  entObjekt: "Wohnung",
  entMenge: "",
  entEtage: "",
  entAufzug: "",
  entEntsorgen: "",
  sonstText: "",
};

const PHONE_NUMBER = "491634799286";
const PHONE_DISPLAY = "0163 4799286";

const services: { key: Service; label: string; desc: string; icon: any }[] = [
  { key: "boden", label: "Bodenverlegung", desc: "Vinyl, Laminat, Designboden, PVC, Teppich", icon: Layers },
  { key: "kueche", label: "Küchenmontage", desc: "Aufbau, Restmontage, Umbau, Demontage", icon: Wrench },
  { key: "ent", label: "Entrümpelung & Entsorgung", desc: "Wohnung, Keller, Dachboden, Garage", icon: Trash2 },
  { key: "sonst", label: "Sonstiges Projekt", desc: "Beschreiben Sie kurz Ihr Anliegen", icon: Sparkles },
];

function fmtEUR(n: number) {
  return Math.round(n).toLocaleString("de-DE");
}

function calc(s: State): { min: number; max: number; ok: boolean } | null {
  if (s.service === "boden") {
    const qm = Number(s.qm);
    if (!qm || qm <= 0) return null;
    const base: Record<string, [number, number]> = {
      Vinyl: [22, 32],
      Laminat: [18, 28],
      Designboden: [28, 42],
      PVC: [16, 24],
      Teppich: [14, 22],
      Sonstiges: [18, 30],
    };
    const [bMin, bMax] = base[s.bodenart] ?? base.Vinyl;
    let min = bMin * qm;
    let max = bMax * qm;
    if (s.altEntfernen === "Ja") {
      min += 4 * qm;
      max += 7 * qm;
    }
    if (s.untergrund === "Leicht ausgleichen") {
      min += 6 * qm;
      max += 12 * qm;
    } else if (s.untergrund === "Vollflächig spachteln") {
      min += 14 * qm;
      max += 24 * qm;
    } else if (s.untergrund === "Unsicher") {
      min += 4 * qm;
      max += 18 * qm;
    }
    if (s.sockel === "Mit Eckstücken") {
      min += 3.5 * qm;
      max += 6 * qm;
    } else if (s.sockel === "Auf Gehrung") {
      min += 5 * qm;
      max += 9 * qm;
    }
    if (s.tueren === "Ja") {
      min += 30;
      max += 60;
    } else if (s.tueren === "Unsicher") {
      min += 0;
      max += 60;
    }
    return { min, max, ok: true };
  }
  if (s.service === "kueche") {
    const m = Number(s.kueMeter);
    if (!m || m <= 0) return null;
    let min = m * 110;
    let max = m * 170;
    if (s.kueArbeit === "Ja") {
      min += 120;
      max += 280;
    }
    if (s.kueGeraete === "Ja") {
      min += 80;
      max += 200;
    }
    if (s.kueSpuele === "Ja") {
      min += 80;
      max += 180;
    }
    if (s.kueDemontage === "Ja") {
      min += m * 35;
      max += m * 65;
    }
    if (s.kueTransport === "Ja") {
      min += 120;
      max += 280;
    }
    if (s.kueArt === "Küchenabbau") {
      // overwrite: pure abbau
      min = m * 60;
      max = m * 110;
      if (s.kueTransport === "Ja") {
        min += 120;
        max += 280;
      }
    }
    return { min, max, ok: true };
  }
  if (s.service === "ent") {
    if (!s.entMenge) return null;
    const baseByObjekt: Record<string, [number, number]> = {
      Wohnung: [380, 650],
      Haus: [800, 1500],
      Keller: [250, 500],
      Garage: [220, 480],
      Dachboden: [280, 560],
      Garten: [200, 450],
      Sonstiges: [300, 600],
    };
    const factor: Record<string, number> = { klein: 1, mittel: 1.7, groß: 2.6, "sehr groß": 4 };
    const [bMin, bMax] = baseByObjekt[s.entObjekt] ?? baseByObjekt.Wohnung;
    const f = factor[s.entMenge] ?? 1;
    let min = bMin * f;
    let max = bMax * f;
    const etage = Number(s.entEtage) || 0;
    if (etage > 1 && s.entAufzug !== "Ja") {
      const m = 1 + (etage - 1) * 0.08;
      min *= m;
      max *= m;
    }
    if (s.entEntsorgen === "Ja") {
      min += 80;
      max += 220;
    }
    return { min, max, ok: true };
  }
  return null;
}

function buildWaMessage(s: State, price: { min: number; max: number } | null): string {
  const lines: string[] = [];
  lines.push("Hallo Verlegt & Verschraubt,");
  lines.push("");
  lines.push("ich habe gerade den Kostenrechner auf Ihrer Website genutzt und möchte eine Einschätzung für mein Projekt anfragen.");
  lines.push("");
  const serviceLabel =
    s.service === "boden"
      ? "Bodenverlegung"
      : s.service === "kueche"
        ? "Küchenmontage"
        : s.service === "ent"
          ? "Entrümpelung & Entsorgung"
          : "Sonstiges Projekt";
  lines.push(`Leistung: ${serviceLabel}`);

  const push = (label: string, value?: string | number) => {
    if (value === undefined || value === null) return;
    const v = typeof value === "string" ? value.trim() : String(value);
    if (!v) return;
    lines.push(`${label}: ${v}`);
  };

  if (s.service === "boden") {
    push("Bodenart", s.bodenart);
    push("Fläche", s.qm ? `${s.qm} m²` : "");
    push("Altbelag entfernen", s.altEntfernen);
    push("Untergrundvorbereitung", s.untergrund);
    push("Sockelleisten", s.sockel);
    push("Türen kürzen", s.tueren);
    push("Räume leer", s.raeumeLeer);
  } else if (s.service === "kueche") {
    push("Projektart", s.kueArt);
    push("Küchenlänge", s.kueMeter ? `${s.kueMeter} m` : "");
    push("Arbeitsplatte zuschneiden", s.kueArbeit);
    push("Geräte einbauen", s.kueGeraete);
    push("Spüle montieren", s.kueSpuele);
    push("Demontage alte Küche", s.kueDemontage);
    push("Transport nötig", s.kueTransport);
  } else if (s.service === "ent") {
    push("Objektart", s.entObjekt);
    push("Geschätzte Menge", s.entMenge);
    push("Etage", s.entEtage);
    push("Aufzug vorhanden", s.entAufzug);
    push("Entsorgung nötig", s.entEntsorgen);
  } else if (s.service === "sonst") {
    push("Beschreibung", s.sonstText);
  }
  push("Ort / PLZ", s.ort);
  push("Wunschzeitraum", s.zeitraum);
  if (price) {
    lines.push(`Grobe Kosteneinschätzung laut Rechner: ca. ${fmtEUR(price.min)} – ${fmtEUR(price.max)} €`);
  }
  if (s.nachricht.trim()) {
    lines.push("");
    lines.push("Zusätzliche Nachricht:");
    lines.push(s.nachricht.trim());
  }
  lines.push("");
  lines.push("Ich kann Ihnen gerne Bilder für eine genauere Einschätzung senden.");
  lines.push("");
  lines.push("Viele Grüße");
  return lines.join("\n");
}

export function Kostenrechner() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s, set] = useState<State>(initial);
  const [errors, setErrors] = useState<string[]>([]);

  const upd = <K extends keyof State>(k: K, v: State[K]) => set((p) => ({ ...p, [k]: v }));
  const price = useMemo(() => calc(s), [s]);

  const validate = (): string[] => {
    const e: string[] = [];
    if (!s.service) e.push("Bitte eine Leistung auswählen.");
    if (!s.ort.trim()) e.push("Bitte Ort oder PLZ angeben.");
    if (s.service === "boden" && (!s.qm || Number(s.qm) <= 0)) e.push("Bitte Fläche in m² angeben.");
    if (s.service === "kueche" && (!s.kueMeter || Number(s.kueMeter) <= 0)) e.push("Bitte Küchenlänge in Metern angeben.");
    if (s.service === "ent" && !s.entMenge) e.push("Bitte geschätzte Menge auswählen.");
    if (s.service === "sonst" && !s.sonstText.trim()) e.push("Bitte Projektbeschreibung angeben.");
    return e;
  };

  const goResult = () => {
    const e = validate();
    setErrors(e);
    if (e.length === 0) setStep(3);
  };

  const message = useMemo(() => buildWaMessage(s, price), [s, price]);
  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Nachricht kopiert");
    } catch {
      toast.error("Kopieren nicht möglich");
    }
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card/60 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
      <Stepper step={step} hasService={!!s.service} />

      {step === 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold sm:text-xl">Welche Leistung benötigen Sie?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Wählen Sie eine Leistung. Die Felder im nächsten Schritt passen sich automatisch an.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((sv) => {
              const active = s.service === sv.key;
              return (
                <button
                  key={sv.key}
                  type="button"
                  onClick={() => upd("service", sv.key)}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-accent bg-accent/10"
                      : "border-border/70 bg-background/50 hover:border-accent/60 hover:bg-accent/5"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${active ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"}`}>
                    <sv.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold">{sv.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{sv.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!s.service}
              onClick={() => setStep(2)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">Details zu Ihrem Projekt</h3>
            <p className="mt-1 text-sm text-muted-foreground">Pflichtfelder sind mit * markiert. Restliches gerne so genau wie möglich.</p>
          </div>

          {s.service === "boden" && <BodenForm s={s} upd={upd} />}
          {s.service === "kueche" && <KuecheForm s={s} upd={upd} />}
          {s.service === "ent" && <EntForm s={s} upd={upd} />}
          {s.service === "sonst" && <SonstForm s={s} upd={upd} />}

          <Field label="Ort / PLZ *">
            <input
              value={s.ort}
              onChange={(e) => upd("ort", e.target.value)}
              maxLength={120}
              placeholder="z. B. Wilhelmshaven 26388"
              className={input}
            />
          </Field>
          <Field label="Wunschzeitraum">
            <Choice
              value={s.zeitraum}
              onChange={(v) => upd("zeitraum", v)}
              options={["Schnellstmöglich", "Innerhalb 2 Wochen", "Innerhalb 1 Monats", "Flexibel"]}
            />
          </Field>
          <Field label="Zusatznachricht (optional)">
            <textarea
              value={s.nachricht}
              onChange={(e) => upd("nachricht", e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="Besonderheiten, Zugang, Termine, Fragen…"
              className={input}
            />
          </Field>

          {errors.length > 0 && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
              <p className="font-medium text-destructive">Bitte ergänzen:</p>
              <ul className="mt-1 list-disc pl-5 text-destructive/90">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
            <button
              type="button"
              onClick={goResult}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              Einschätzung anzeigen <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-background/60 to-background/40 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Ihre grobe Ersteinschätzung ist da.</p>
            {price && s.service !== "sonst" ? (
              <p className="mt-3 text-3xl font-semibold sm:text-4xl">
                ca. {fmtEUR(price.min)} – {fmtEUR(price.max)} €
              </p>
            ) : (
              <p className="mt-3 text-2xl font-semibold sm:text-3xl">Individuelles Angebot</p>
            )}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Damit wir Ihr Projekt genauer bewerten können, senden Sie uns Ihre
              Angaben direkt per WhatsApp. Bilder vom Raum, Boden, der Küche oder
              der Fläche helfen uns besonders bei einer schnellen Einschätzung.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Diese Einschätzung ist unverbindlich. Endpreis nach Foto- oder
              Vor-Ort-Prüfung – abhängig von Untergrund, Material, Zugang und
              Sonderfaktoren.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Jetzt per WhatsApp anfragen
            </a>
            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 text-base font-semibold text-accent hover:bg-accent/20"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY} anrufen
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Mit dem Klick auf den WhatsApp-Button öffnen Sie WhatsApp und können
            Ihre Angaben freiwillig an uns senden. Es werden keine Daten
            automatisch ohne Ihre Bestätigung übertragen.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" /> Angaben bearbeiten
            </button>
            <button
              type="button"
              onClick={copyMsg}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm hover:bg-card"
            >
              <Copy className="h-4 w-4" /> Nachricht kopieren
            </button>
          </div>

          <details className="rounded-xl border border-border/70 bg-background/40 p-4 text-sm">
            <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-muted-foreground">Vorschau der WhatsApp-Nachricht</summary>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-muted-foreground">{message}</pre>
          </details>

          <div className="grid gap-2 rounded-2xl border border-border/70 bg-background/40 p-5 text-xs text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Kostenlose Ersteinschätzung</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Schnelle Rückmeldung</div>
            <div className="flex items-center gap-2"><Camera className="h-4 w-4 text-accent" /> Bilder per WhatsApp ergänzbar</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Regional in Wilhelmshaven & Umgebung</div>
          </div>
        </div>
      )}
    </div>
  );
}

const input = "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none";

function Stepper({ step, hasService }: { step: 1 | 2 | 3; hasService: boolean }) {
  const items = [
    { n: 1, label: "Leistung" },
    { n: 2, label: "Details" },
    { n: 3, label: "Ergebnis" },
  ];
  return (
    <ol className="flex items-center gap-2 text-xs">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        const reachable = it.n === 1 || (it.n === 2 && hasService) || (it.n === 3 && hasService);
        return (
          <li key={it.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : done
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border text-muted-foreground"
              } ${reachable ? "" : "opacity-50"}`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : it.n}
            </span>
            <span className={`hidden text-xs uppercase tracking-[0.2em] sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {it.label}
            </span>
            {i < items.length - 1 && <span className="ml-1 h-px flex-1 bg-border/70" />}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Choice({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(active ? "" : o)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active
                ? "border-accent bg-accent/15 text-accent"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function BodenForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Grid2>
        <Field label="Bodenart">
          <Choice value={s.bodenart} onChange={(v) => upd("bodenart", v || "Vinyl")} options={["Vinyl", "Laminat", "Designboden", "PVC", "Teppich", "Sonstiges"]} />
        </Field>
        <Field label="Fläche in m² *">
          <input type="number" min={1} value={s.qm} onChange={(e) => upd("qm", e.target.value)} className={input} placeholder="z. B. 28" />
        </Field>
      </Grid2>
      <Field label="Alter Boden muss entfernt werden">
        <Choice value={s.altEntfernen} onChange={(v) => upd("altEntfernen", v as State["altEntfernen"])} options={["Ja", "Nein"]} />
      </Field>
      <Field label="Untergrundvorbereitung / ausgleichen">
        <Choice
          value={s.untergrund}
          onChange={(v) => upd("untergrund", v as State["untergrund"])}
          options={["Nein", "Leicht ausgleichen", "Vollflächig spachteln", "Unsicher"]}
        />
      </Field>
      <Field label="Sockelleisten">
        <Choice value={s.sockel} onChange={(v) => upd("sockel", v as State["sockel"])} options={["Keine", "Mit Eckstücken", "Auf Gehrung"]} />
      </Field>
      <Grid2>
        <Field label="Türen kürzen nötig">
          <Choice value={s.tueren} onChange={(v) => upd("tueren", v as State["tueren"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Räume leer">
          <Choice value={s.raeumeLeer} onChange={(v) => upd("raeumeLeer", v as State["raeumeLeer"])} options={["Ja", "Nein"]} />
        </Field>
      </Grid2>
    </div>
  );
}

function KuecheForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Grid2>
        <Field label="Art des Projekts">
          <Choice value={s.kueArt} onChange={(v) => upd("kueArt", v || "Neue Küche")} options={["Neue Küche", "Gebrauchte Küche", "Küchenumbau", "Küchenabbau"]} />
        </Field>
        <Field label="Küchenlänge in m *">
          <input type="number" step={0.5} min={1} value={s.kueMeter} onChange={(e) => upd("kueMeter", e.target.value)} className={input} placeholder="z. B. 3" />
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Arbeitsplatte zuschneiden">
          <Choice value={s.kueArbeit} onChange={(v) => upd("kueArbeit", v as State["kueArbeit"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Geräte einbauen">
          <Choice value={s.kueGeraete} onChange={(v) => upd("kueGeraete", v as State["kueGeraete"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Spüle montieren">
          <Choice value={s.kueSpuele} onChange={(v) => upd("kueSpuele", v as State["kueSpuele"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Demontage alter Küche">
          <Choice value={s.kueDemontage} onChange={(v) => upd("kueDemontage", v as State["kueDemontage"])} options={["Ja", "Nein"]} />
        </Field>
      </Grid2>
      <Field label="Transport nötig">
        <Choice value={s.kueTransport} onChange={(v) => upd("kueTransport", v as State["kueTransport"])} options={["Ja", "Nein"]} />
      </Field>
      <p className="rounded-md border border-border/60 bg-background/40 p-3 text-xs text-muted-foreground">
        Hinweis: Elektro- und Gas-/Wasseranschlüsse übernehmen Fachbetriebe. Wir koordinieren das auf Wunsch.
      </p>
    </div>
  );
}

function EntForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Objektart">
        <Choice value={s.entObjekt} onChange={(v) => upd("entObjekt", v || "Wohnung")} options={["Wohnung", "Haus", "Keller", "Garage", "Dachboden", "Garten", "Sonstiges"]} />
      </Field>
      <Field label="Geschätzte Menge *">
        <Choice
          value={s.entMenge}
          onChange={(v) => upd("entMenge", v as State["entMenge"])}
          options={["klein", "mittel", "groß", "sehr groß"]}
        />
      </Field>
      <Grid2>
        <Field label="Etage">
          <input type="number" min={0} value={s.entEtage} onChange={(e) => upd("entEtage", e.target.value)} className={input} placeholder="z. B. 2" />
        </Field>
        <Field label="Aufzug vorhanden">
          <Choice value={s.entAufzug} onChange={(v) => upd("entAufzug", v as State["entAufzug"])} options={["Ja", "Nein"]} />
        </Field>
      </Grid2>
      <Field label="Muss entsorgt werden">
        <Choice value={s.entEntsorgen} onChange={(v) => upd("entEntsorgen", v as State["entEntsorgen"])} options={["Ja", "Nein"]} />
      </Field>
    </div>
  );
}

function SonstForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <Field label="Beschreibung Ihres Projekts *">
      <textarea
        value={s.sonstText}
        onChange={(e) => upd("sonstText", e.target.value)}
        rows={5}
        maxLength={1500}
        placeholder="Was soll gemacht werden? Räume, Maße, Besonderheiten…"
        className={input}
      />
    </Field>
  );
}

export function TrustChips() {
  return (
    <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><ShieldCheck className="h-4 w-4 text-accent" /> Kostenlose Ersteinschätzung</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><Clock className="h-4 w-4 text-accent" /> Schnelle Rückmeldung</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><Camera className="h-4 w-4 text-accent" /> Bilder per WhatsApp</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><MapPin className="h-4 w-4 text-accent" /> Wilhelmshaven & Umgebung</span>
    </div>
  );
}
