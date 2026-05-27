import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarClock, MessageCircle, Calculator } from "lucide-react";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { KalenderPlatzhalter } from "@/components/site/Kostenrechner";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

export const Route = createFileRoute("/wunschtermin")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Wunschtermin anfragen | Verlegt & Verschraubt Wilhelmshaven" },
      {
        name: "description",
        content:
          "Wunschtermin für Bodenverlegung, Küchenmontage oder Entrümpelung in Wilhelmshaven und Umgebung anfragen. Termin wird nach Prüfung bestätigt.",
      },
      { property: "og:title", content: "Wunschtermin anfragen – Verlegt & Verschraubt" },
      {
        property: "og:description",
        content:
          "Unverbindliche Terminanfrage – wir prüfen Aufwand, Einsatzort und Verfügbarkeit und melden uns mit verbindlicher Rückbestätigung.",
      },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/wunschtermin" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Verlegt & Verschraubt – Wunschtermin anfragen" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Wunschtermin anfragen – Verlegt & Verschraubt" },
      { name: "twitter:description", content: "Unverbindliche Terminanfrage für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven und Umgebung." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/wunschtermin" }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: "https://www.verlegt-verschraubt.de/wunschtermin",
          name: "Wunschtermin anfragen – Verlegt & Verschraubt",
          description:
            "Unverbindliche Terminanfrage für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven und Umgebung.",
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: "Wunschtermin", url: "https://www.verlegt-verschraubt.de/wunschtermin" },
        ]),
      ]),
    ],
  }),
});

const PHONE_NUMBER = "491634799286";
const PHONE_DISPLAY = "0163 4799286";
const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.app.google/MbCnvoSqYjuLSAfY9";

const input =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none";

type Form = {
  name: string;
  telefon: string;
  email: string;
  leistung: string;
  ort: string;
  wunschDatum: string;
  wunschZeitraum: string;
  fertigDatum: string;
  dringlichkeit: string;
  hinweise: string;
};

const initial: Form = {
  name: "",
  telefon: "",
  email: "",
  leistung: "Bodenverlegung",
  ort: "",
  wunschDatum: "",
  wunschZeitraum: "",
  fertigDatum: "",
  dringlichkeit: "flexibel / normal planbar",
  hinweise: "",
};

function Page() {
  const [f, setF] = useState<Form>(initial);
  const upd = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const message = useMemo(() => {
    const lines: string[] = [];
    lines.push("Hallo Verlegt & Verschraubt,");
    lines.push("");
    lines.push("ich möchte einen Wunschtermin anfragen (unverbindlich).");
    lines.push("");
    if (f.name.trim()) lines.push(`Name: ${f.name.trim()}`);
    if (f.telefon.trim()) lines.push(`Telefon: ${f.telefon.trim()}`);
    if (f.email.trim()) lines.push(`E-Mail: ${f.email.trim()}`);
    if (f.leistung) lines.push(`Leistung: ${f.leistung}`);
    if (f.ort.trim()) lines.push(`Einsatzort: ${f.ort.trim()}`);
    if (f.wunschDatum) lines.push(`Wunschdatum: ${f.wunschDatum}`);
    if (f.wunschZeitraum) lines.push(`Wunschzeitraum: ${f.wunschZeitraum}`);
    if (f.fertigDatum) lines.push(`Fertigstellung gewünscht bis: ${f.fertigDatum}`);
    if (f.dringlichkeit) lines.push(`Dringlichkeit: ${f.dringlichkeit}`);
    if (f.hinweise.trim()) {
      lines.push("");
      lines.push("Besondere Hinweise:");
      lines.push(f.hinweise.trim());
    }
    lines.push("");
    lines.push("Terminstatus: unverbindliche Anfrage, Bestätigung nach Prüfung.");
    lines.push("Viele Grüße");
    return lines.join("\n");
  }, [f]);

  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <PageHero
        eyebrow="Terminanfrage"
        title="Wunschtermin anfragen"
        intro="Sie möchten einen Termin für Bodenverlegung, Küchenmontage oder Entrümpelung anfragen? Senden Sie uns Ihren Wunschzeitraum. Wir prüfen Aufwand, Einsatzort und Verfügbarkeit und melden uns mit einer verbindlichen Rückmeldung."
        breadcrumbs={[{ label: "Wunschtermin" }]}
      />

      <Section eyebrow="So funktioniert es" title="Unverbindliche Terminanfrage">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Über diese Seite können Sie uns Ihren bevorzugten Termin oder Zeitraum mitteilen. Der Termin ist nicht automatisch
          gebucht, sondern wird nach Prüfung bestätigt. Verlegt &amp; Verschraubt arbeitet als Kleinunternehmer nach
          § 19 UStG – alle Preise sind Endkundenpreise ohne Umsatzsteuer.
        </p>
      </Section>

      <Section eyebrow="Formular" title="Ihren Wunschtermin senden" bordered>
        <div className="rounded-3xl border border-border/70 bg-card/60 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <CalendarClock className="mt-0.5 h-5 w-5 text-accent" />
            <p className="text-sm text-muted-foreground">
              Pflichtangaben sind keine – je mehr Sie ausfüllen, desto schneller können wir prüfen. Der Termin wird erst nach
              unserer Rückbestätigung verbindlich.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <input value={f.name} onChange={(e) => upd("name", e.target.value)} maxLength={120} className={input} />
            </Field>
            <Field label="Telefonnummer">
              <input value={f.telefon} onChange={(e) => upd("telefon", e.target.value)} maxLength={40} className={input} />
            </Field>
            <Field label="E-Mail">
              <input type="email" value={f.email} onChange={(e) => upd("email", e.target.value)} maxLength={160} className={input} />
            </Field>
            <Field label="Gewünschte Leistung">
              <select value={f.leistung} onChange={(e) => upd("leistung", e.target.value)} className={input}>
                <option>Bodenverlegung</option>
                <option>Küchenmontage</option>
                <option>Entrümpelung &amp; Entsorgung</option>
                <option>Sonstiges Projekt</option>
              </select>
            </Field>
            <Field label="Einsatzort (Ort / PLZ)">
              <input value={f.ort} onChange={(e) => upd("ort", e.target.value)} maxLength={120} className={input} placeholder="z. B. Wilhelmshaven 26388" />
            </Field>
            <Field label="Wunschdatum">
              <input type="date" value={f.wunschDatum} onChange={(e) => upd("wunschDatum", e.target.value)} className={input} />
            </Field>
            <Field label="Wunschzeitraum">
              <select value={f.wunschZeitraum} onChange={(e) => upd("wunschZeitraum", e.target.value)} className={input}>
                <option value="">– bitte wählen –</option>
                <option>Vormittag</option>
                <option>Mittag</option>
                <option>Nachmittag</option>
                <option>Abend</option>
                <option>ganztägig flexibel</option>
              </select>
            </Field>
            <Field label="Fertigstellung gewünscht bis">
              <input type="date" value={f.fertigDatum} onChange={(e) => upd("fertigDatum", e.target.value)} className={input} />
            </Field>
            <Field label="Dringlichkeit">
              <select value={f.dringlichkeit} onChange={(e) => upd("dringlichkeit", e.target.value)} className={input}>
                <option>flexibel / normal planbar</option>
                <option>innerhalb von 14 Tagen</option>
                <option>innerhalb von 7 Tagen</option>
                <option>innerhalb von 3 Tagen / sehr kurzfristig</option>
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Besondere Hinweise">
              <textarea
                value={f.hinweise}
                onChange={(e) => upd("hinweise", e.target.value)}
                rows={4}
                maxLength={1500}
                placeholder="Zugang, Besonderheiten, Materialwünsche, gewünschte Uhrzeit…"
                className={input}
              />
            </Field>
          </div>

          <p className="mt-4 rounded-md border border-border/60 bg-background/40 p-3 text-xs text-muted-foreground">
            Foto-Upload: Bitte senden Sie Bilder direkt per WhatsApp – das geht am schnellsten und ohne Umweg über ein
            Upload-Formular.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Wunschtermin per WhatsApp anfragen
            </a>
            <Link
              to="/preise"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 text-base font-semibold text-accent hover:bg-accent/20"
            >
              <Calculator className="h-5 w-5" /> Vorher Preis grob berechnen
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Der Termin wird erst nach Rückbestätigung verbindlich. Wir prüfen Aufwand, Einsatzort, Materialverfügbarkeit und
            bestehende Planung.
          </p>

          <details className="mt-5 rounded-xl border border-border/70 bg-background/40 p-4 text-sm">
            <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Vorschau der WhatsApp-Nachricht
            </summary>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-muted-foreground">{message}</pre>
          </details>
        </div>
      </Section>

      <Section eyebrow="Verfügbarkeit" title="Kalender">
        <p className="max-w-3xl text-sm text-muted-foreground">
          Prüfen Sie verfügbare Zeiträume und senden Sie uns Ihren bevorzugten Termin. Der Termin wird erst nach
          Rückbestätigung verbindlich.
        </p>
        <div className="mt-4">
          <a
            href={GOOGLE_CALENDAR_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <CalendarClock className="h-4 w-4" /> Wunschtermin im Kalender auswählen
          </a>
        </div>
        <div className="mt-6">
          <KalenderPlatzhalter />
        </div>
        <p className="mt-3 max-w-3xl text-xs text-muted-foreground">
          Der ausgewählte Termin ist eine unverbindliche Terminanfrage und wird erst nach Rückbestätigung verbindlich.
          Es werden keine Kundennamen, Adressen oder Auftragsdetails angezeigt – nur „frei“, „belegt“ oder
          „eingeschränkt verfügbar“. Es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
      </Section>

      <CtaBlock
        title="Lieber direkt sprechen?"
        text={`Rufen Sie an unter ${PHONE_DISPLAY} – wir melden uns in der Regel innerhalb von 24 Stunden.`}
      />
    </>
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
