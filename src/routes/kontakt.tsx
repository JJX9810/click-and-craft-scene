import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
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

function Page() {
  const [sent, setSent] = useState(false);

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
              setSent(true);
            }}
            className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required><input required className={input} /></Field>
              <Field label="Telefon"><input type="tel" className={input} /></Field>
              <Field label="E-Mail" required><input required type="email" className={input} /></Field>
              <Field label="Ort"><input className={input} placeholder="Wilhelmshaven" /></Field>
              <Field label="Gewünschte Leistung">
                <select className={input}>
                  <option>Bodenverlegung</option>
                  <option>Küchenmontage</option>
                  <option>Entrümpelung & Entsorgung</option>
                  <option>Sonstiges</option>
                </select>
              </Field>
              <Field label="Gewünschter Zeitraum"><input className={input} placeholder="z. B. nächste 2 Wochen" /></Field>
              <Field label="Kurze Beschreibung" className="sm:col-span-2">
                <textarea rows={5} className={input} placeholder="Räume, ungefähre Größe, Besonderheiten…" />
              </Field>
              <Field label="Fotos hochladen" className="sm:col-span-2">
                <input type="file" multiple accept="image/*" className="text-sm" />
                <p className="mt-1 text-xs text-muted-foreground">Alternativ Fotos per WhatsApp oder E-Mail senden.</p>
              </Field>
              <label className="sm:col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-1" />
                <span>Ich habe die <a href="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</a> gelesen.</span>
              </label>
            </div>
            <div className="mt-6">
              {sent ? (
                <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                  Danke! Ihre Anfrage ist bei uns – wir melden uns zeitnah.
                </p>
              ) : (
                <Button type="submit" size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
                  Anfrage senden <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-card/50 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Direktkontakt</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <a href="tel:+4916347992866" className="hover:text-accent">0163 4799286</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href="mailto:justus.brosch@verlegt-verschraubt.de" className="break-all hover:text-accent">
                    justus.brosch@verlegt-verschraubt.de
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Weichselstraße 12<br />26388 Wilhelmshaven</span>
                </li>
              </ul>
            </div>
            <a
              href="https://wa.me/4916347992866"
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

function Field({ label, required, children, className = "" }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && " *"}
      </span>
      {children}
    </label>
  );
}
