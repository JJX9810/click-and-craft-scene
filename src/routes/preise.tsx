import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { Layers, Wrench, Trash2 } from "lucide-react";

export const Route = createFileRoute("/preise")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Preise & Preisrechner – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Erste Preisorientierung für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – mit unverbindlichem Preisrechner." },
      { property: "og:title", content: "Preise & Preisrechner" },
      { property: "og:description", content: "Orientierungspreise für Bodenverlegung, Küchenmontage und Entrümpelung." },
      { property: "og:url", content: "/preise" },
    ],
    links: [{ rel: "canonical", href: "/preise" }],
  }),
});

type Mode = "boden" | "kueche" | "ent";

function Page() {
  const [mode, setMode] = useState<Mode>("boden");

  return (
    <>
      <PageHero
        eyebrow="Preise"
        title="Preise & Orientierung"
        intro="Jedes Projekt ist anders – mit dem Preisrechner bekommen Sie eine erste Orientierung. Ein verbindliches Angebot erstellen wir nach Prüfung der Fotos oder vor Ort."
        breadcrumbs={[{ label: "Preise" }]}
      />

      <Section eyebrow="Hinweis" title="Kein verbindliches Angebot ohne Prüfung">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Die Preise im Rechner sind Orientierungswerte, keine Festpreise.
          Endgültige Preise hängen von Untergrund, Material, Zugang und
          Sonderfaktoren ab. Senden Sie Fotos und ein paar Maße – wir geben eine
          realistische Einschätzung.
        </p>
      </Section>

      <Section eyebrow="Preisrechner" title="Erste Orientierung berechnen" bordered>
        <div className="flex flex-wrap gap-2">
          <ModeBtn icon={Layers} label="Bodenverlegung" active={mode === "boden"} onClick={() => setMode("boden")} />
          <ModeBtn icon={Wrench} label="Küchenmontage" active={mode === "kueche"} onClick={() => setMode("kueche")} />
          <ModeBtn icon={Trash2} label="Entrümpelung" active={mode === "ent"} onClick={() => setMode("ent")} />
        </div>

        <div className="mt-8 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:p-8">
          {mode === "boden" && <BodenForm />}
          {mode === "kueche" && <KuecheForm />}
          {mode === "ent" && <EntForm />}
        </div>
      </Section>

      <CtaBlock
        title="Genauere Einschätzung erhalten"
        text="Senden Sie Fotos – damit kommen wir näher an einen realistischen Preis."
      />
    </>
  );
}

function ModeBtn({ icon: Icon, label, active, onClick }: { icon: React.ElementType; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "border-accent bg-accent/10 text-accent" : "border-border bg-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function fmt(min: number, max: number) {
  return `${Math.round(min).toLocaleString("de-DE")} – ${Math.round(max).toLocaleString("de-DE")} €`;
}

function BodenForm() {
  const [qm, setQm] = useState(30);
  const [boden, setBoden] = useState("Vinyl");
  const [alt, setAlt] = useState(false);
  const [sockel, setSockel] = useState(true);
  const [unter, setUnter] = useState(false);

  const base: Record<string, [number, number]> = {
    Vinyl: [22, 32],
    Laminat: [18, 28],
    PVC: [16, 24],
    Teppich: [14, 22],
  };
  const [bMin, bMax] = base[boden];
  let min = bMin * qm;
  let max = bMax * qm;
  if (alt) { min += 4 * qm; max += 7 * qm; }
  if (sockel) { min += 4 * qm; max += 7 * qm; }
  if (unter) { min += 6 * qm; max += 12 * qm; }

  return (
    <Form>
      <Field label="Fläche in m²">
        <input type="number" min={1} value={qm} onChange={(e) => setQm(+e.target.value)} className={inputCls} />
      </Field>
      <Field label="Bodenart">
        <select value={boden} onChange={(e) => setBoden(e.target.value)} className={inputCls}>
          {Object.keys(base).map((b) => <option key={b}>{b}</option>)}
        </select>
      </Field>
      <Toggle label="Altbelag entfernen" checked={alt} onChange={setAlt} />
      <Toggle label="Sockelleisten" checked={sockel} onChange={setSockel} />
      <Toggle label="Untergrundvorbereitung" checked={unter} onChange={setUnter} />
      <Result range={fmt(min, max)} />
    </Form>
  );
}

function KuecheForm() {
  const [meter, setMeter] = useState(3);
  const [komplett, setKomplett] = useState(true);
  const [arbeit, setArbeit] = useState(true);
  const [spuele, setSpuele] = useState(true);
  const [haengen, setHaengen] = useState(true);

  let min = meter * (komplett ? 110 : 70);
  let max = meter * (komplett ? 160 : 110);
  if (arbeit) { min += 120; max += 280; }
  if (spuele) { min += 80; max += 180; }
  if (haengen) { min += meter * 30; max += meter * 60; }

  return (
    <Form>
      <Field label="Küchenlänge in m">
        <input type="number" min={1} step={0.5} value={meter} onChange={(e) => setMeter(+e.target.value)} className={inputCls} />
      </Field>
      <Toggle label="Komplette Montage (sonst Restmontage)" checked={komplett} onChange={setKomplett} />
      <Toggle label="Arbeitsplatte einpassen" checked={arbeit} onChange={setArbeit} />
      <Toggle label="Spüle & Armatur anschließen" checked={spuele} onChange={setSpuele} />
      <Toggle label="Hängeschränke montieren" checked={haengen} onChange={setHaengen} />
      <Result range={fmt(min, max)} />
    </Form>
  );
}

function EntForm() {
  const [raum, setRaum] = useState("Wohnung");
  const [volumen, setVolumen] = useState(15);
  const [etage, setEtage] = useState(1);
  const [aufzug, setAufzug] = useState(false);

  const baseRate = raum === "Wohnung" ? [50, 80] : raum === "Keller" ? [55, 90] : [60, 100];
  let min = baseRate[0] * volumen;
  let max = baseRate[1] * volumen;
  if (!aufzug && etage > 1) { const f = 1 + (etage - 1) * 0.08; min *= f; max *= f; }

  return (
    <Form>
      <Field label="Raumart">
        <select value={raum} onChange={(e) => setRaum(e.target.value)} className={inputCls}>
          <option>Wohnung</option>
          <option>Keller</option>
          <option>Dachboden</option>
        </select>
      </Field>
      <Field label="Volumen in m³">
        <input type="number" min={1} value={volumen} onChange={(e) => setVolumen(+e.target.value)} className={inputCls} />
      </Field>
      <Field label="Etage">
        <input type="number" min={0} value={etage} onChange={(e) => setEtage(+e.target.value)} className={inputCls} />
      </Field>
      <Toggle label="Aufzug vorhanden" checked={aufzug} onChange={setAufzug} />
      <Result range={fmt(min, max)} />
    </Form>
  );
}

const inputCls = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

function Form({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-border bg-background/40 px-3 py-2.5 text-sm">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[oklch(0.55_0.11_50)]" />
    </label>
  );
}
function Result({ range }: { range: string }) {
  return (
    <div className="sm:col-span-2 rounded-xl border border-accent/40 bg-accent/10 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Orientierungspreis</p>
      <p className="mt-1 text-2xl font-semibold">{range}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Unverbindlich. Endpreis nach Foto- oder Vor-Ort-Prüfung.
      </p>
    </div>
  );
}
