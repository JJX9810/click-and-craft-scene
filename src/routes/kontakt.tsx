import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { EinsatzgebietMap } from "@/components/site/EinsatzgebietMap";

export const Route = createFileRoute("/kontakt")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Kontakt – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Anfrage starten: Telefon 0163 4799286, E-Mail justus.brosch@verlegt-verschraubt.de oder per Formular. Antwort in der Regel innerhalb von 24 Stunden." },
      { property: "og:title", content: "Kontakt aufnehmen" },
      { property: "og:description", content: "Anfrage senden – inklusive Fotos und Maßen für eine schnelle Einschätzung." },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
});

const MAIL = "justus.brosch@verlegt-verschraubt.de";
const TEL_HREF = "tel:+491634799286";
const WA_NUMBER = "491634799286";

type FormState = {
  name: string;
  phone: string;
  email: string;
  ort: string;
  leistung: string;
  zeitraum: string;
  budget: string;
  nachricht: string;
  datenschutz: boolean;
};

type Errors = Partial<Record<keyof FormState | "kontakt", string>>;

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  ort: "",
  leistung: "",
  zeitraum: "",
  budget: "",
  nachricht: "",
  datenschutz: false,
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Bitte Namen angeben.";
  const hasMail = f.email.trim().length > 0;
  const hasPhone = f.phone.trim().length > 0;
  if (!hasMail && !hasPhone) {
    e.kontakt = "Bitte mindestens E-Mail oder Telefon angeben.";
  }
  if (hasMail) {
    const v = f.email.trim();
    const at = v.indexOf("@");
    const dot = v.indexOf(".", at);
    if (at < 1 || dot < at + 2 || dot === v.length - 1) {
      e.email = "Bitte eine gültige E-Mail-Adresse angeben.";
    }
  }
  if (hasPhone) {
    const digits = f.phone.replace(/[\s+/()\-]/g, "");
    if (!/^\d+$/.test(digits) || digits.length < 5) {
      e.phone = "Bitte eine gültige Telefonnummer angeben.";
    }
  }
  if (!f.datenschutz) e.datenschutz = "Bitte die Datenschutzerklärung bestätigen.";
  return e;
}

function buildMessage(f: FormState): string {
  return [
    "Neue Projektanfrage über verlegt-verschraubt.de",
    "",
    "Name:",
    f.name.trim(),
    "",
    "Telefon:",
    f.phone.trim() || "nicht angegeben",
    "",
    "E-Mail:",
    f.email.trim() || "nicht angegeben",
    "",
    "Ort:",
    f.ort.trim() || "nicht angegeben",
    "",
    "Leistung:",
    f.leistung.trim() || "nicht ausgewählt / allgemeine Anfrage",
    "",
    "Wunschzeitraum:",
    f.zeitraum.trim() || "nicht angegeben",
    "",
    "Budget:",
    f.budget.trim() || "nicht angegeben",
    "",
    "Nachricht:",
    f.nachricht.trim() || "keine zusätzliche Nachricht",
    "",
    "Hinweis:",
    "Diese Anfrage wurde über das Kontaktformular der Website vorbereitet.",
  ].join("\n");
}

function Page() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k] || errors.kontakt) {
      setErrors((e) => {
        const { [k]: _ignored, kontakt: _kontakt, ...rest } = e;
        return rest;
      });
    }
  };

  const handle = (mode: "mail" | "whatsapp") => {
    const eobj = validate(form);
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) {
      setNotice(null);
      return;
    }
    const body = buildMessage(form);
    if (mode === "mail") {
      const subject = encodeURIComponent("Projektanfrage über verlegt-verschraubt.de");
      const encBody = encodeURIComponent(body);
      const url = `mailto:${MAIL}?subject=${subject}&body=${encBody}`;
      window.location.href = url;
      setNotice("Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Anfrage ab.");
    } else {
      const text = encodeURIComponent(body);
      const url = `https://wa.me/${WA_NUMBER}?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setNotice("Die WhatsApp-Nachricht wurde vorbereitet. Bitte senden Sie sie in WhatsApp ab.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lassen Sie uns kurz reden."
        intro="Je genauer Fotos, Maße und Beschreibung sind, desto besser die Einschätzung. Antwort an Werktagen in der Regel innerhalb von 24 Stunden."
        breadcrumbs={[{ label: "Kontakt" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handle("mail");
            }}
            noValidate
            className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required error={errors.name}>
                <input
                  required
                  className={input}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
              </Field>
              <Field label="Telefon" error={errors.phone}>
                <input
                  type="tel"
                  className={input}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                />
              </Field>
              <Field label="E-Mail" error={errors.email}>
                <input
                  type="email"
                  className={input}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field label="Ort">
                <input
                  className={input}
                  placeholder="Wilhelmshaven"
                  value={form.ort}
                  onChange={(e) => set("ort", e.target.value)}
                />
              </Field>
              <Field label="Gewünschte Leistung">
                <select
                  className={input}
                  value={form.leistung}
                  onChange={(e) => set("leistung", e.target.value)}
                >
                  <option value="">Bitte wählen (optional)</option>
                  <option>Bodenverlegung</option>
                  <option>Küchenmontage</option>
                  <option>Entrümpelung & Entsorgung</option>
                  <option>Sonstiges</option>
                </select>
              </Field>
              <Field label="Gewünschter Zeitraum">
                <input
                  className={input}
                  placeholder="z. B. nächste 2 Wochen"
                  value={form.zeitraum}
                  onChange={(e) => set("zeitraum", e.target.value)}
                />
              </Field>
              <Field label="Geplantes Budget (ca.)" className="sm:col-span-2">
                <select
                  className={input}
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                >
                  <option value="">Noch unklar / auf Angebot angewiesen</option>
                  <option>unter 500 €</option>
                  <option>500 – 1.500 €</option>
                  <option>1.500 – 3.000 €</option>
                  <option>3.000 – 5.000 €</option>
                  <option>über 5.000 €</option>
                </select>
              </Field>
              <Field label="Kurze Beschreibung" className="sm:col-span-2">
                <textarea
                  rows={5}
                  className={input}
                  placeholder="Räume, ungefähre Größe, Besonderheiten…"
                  value={form.nachricht}
                  onChange={(e) => set("nachricht", e.target.value)}
                />
              </Field>
              <div className="sm:col-span-2 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
                Fotos bitte direkt per E-Mail an{" "}
                <a href={`mailto:${MAIL}`} className="text-accent hover:underline">{MAIL}</a>{" "}
                oder per WhatsApp anhängen – das Formular kann keine Dateien mitsenden.
              </div>
              {errors.kontakt && (
                <p className="sm:col-span-2 text-xs text-destructive">{errors.kontakt}</p>
              )}
              <label className="sm:col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.datenschutz}
                  onChange={(e) => set("datenschutz", e.target.checked)}
                  aria-invalid={!!errors.datenschutz}
                />
                <span>
                  Ich habe die{" "}
                  <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a>{" "}
                  gelesen. *
                </span>
              </label>
              {errors.datenschutz && (
                <p className="sm:col-span-2 -mt-3 text-xs text-destructive">{errors.datenschutz}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
              >
                <Mail className="mr-2 h-4 w-4" /> Per E-Mail vorbereiten
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => handle("whatsapp")}
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Per WhatsApp vorbereiten
              </Button>
              <Button
                asChild
                type="button"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a href={TEL_HREF}>
                  <Phone className="mr-2 h-4 w-4" /> Direkt anrufen
                </a>
              </Button>
            </div>

            {notice && (
              <p className="mt-4 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                {notice}
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Hinweis: Diese Seite versendet selbst keine Nachricht – die Anfrage wird in Ihrem
              E-Mail-Programm oder in WhatsApp vorbereitet und muss dort von Ihnen abgesendet werden.
            </p>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Direktkontakt</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <a href="tel:+491634799286" className="hover:text-accent">0163 4799286</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href={`mailto:${MAIL}`} className="break-all hover:text-accent">
                    {MAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Weichselstraße 12<br />26388 Wilhelmshaven</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/491634799286"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-border/70 bg-card/30 p-6 text-sm hover:border-accent/60"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-accent">WhatsApp</p>
              <p className="mt-2">Schnelle Anfrage mit Foto direkt per WhatsApp senden.</p>
            </a>
          </aside>
        </div>
      </Section>

      <Section eyebrow="Einsatzgebiet" title="Wilhelmshaven & Umgebung" bordered>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Wir arbeiten lokal – kurze Wege, schnelle Termine. Der markierte
          Umkreis zeigt unser reguläres Einsatzgebiet rund um Wilhelmshaven.
          Andere Orte gerne auf Anfrage.
        </p>
        <div className="mt-8">
          <EinsatzgebietMap height="500px" zoom={9} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Hooksiel"].map((o) => (
            <span key={o} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/40 px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" /> {o}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

const input = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

function Field({
  label,
  required,
  children,
  className = "",
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && " *"}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
