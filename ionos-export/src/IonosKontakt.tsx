import { useState } from "react";
import { PageHero, Section } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Camera, ArrowRight } from "lucide-react";
import { EinsatzgebietMap } from "@/components/site/EinsatzgebietMap";

const TEL = "+491634799286";
const TEL_DISPLAY = "0163 4799286";
const MAIL = "justus.brosch@verlegt-verschraubt.de";
const WA = "491634799286";

/**
 * Statisches Kontakt-Modul für den IONOS-Build.
 * Kein Backend nötig – das Formular baut eine vorgefertigte E-Mail
 * (mailto:) bzw. WhatsApp-Nachricht aus den Eingaben.
 */
export function IonosKontakt() {
  const [form, setForm] = useState({
    name: "",
    telefon: "",
    email: "",
    ort: "",
    leistung: "Bodenverlegung",
    zeitraum: "",
    budget: "Noch unklar",
    text: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const subject = `Anfrage ${form.leistung} – ${form.name || "neue Anfrage"}`;
  const body =
    `Name: ${form.name}\n` +
    `Telefon: ${form.telefon}\n` +
    `E-Mail: ${form.email}\n` +
    `Ort: ${form.ort}\n` +
    `Leistung: ${form.leistung}\n` +
    `Zeitraum: ${form.zeitraum}\n` +
    `Budget: ${form.budget}\n\n` +
    `Beschreibung:\n${form.text}\n`;

  const mailHref = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(`Hallo Justus, ${form.name ? "hier " + form.name + ". " : ""}${form.text || "ich hätte eine Anfrage:"}`)}`;
  const projectMail = `mailto:${MAIL}?subject=${encodeURIComponent("Projektanfrage mit Bildern und Maßen")}&body=${encodeURIComponent("Hallo Justus,\n\nim Anhang Bilder und Maße zu meinem Projekt.\n\nKurzbeschreibung:\n\nOrt:\nZeitraum:\nName/Tel:\n")}`;

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lassen Sie uns kurz reden."
        intro="Je genauer Fotos, Maße und Beschreibung sind, desto besser die Einschätzung. Antwort an Werktagen in der Regel innerhalb von 24 Stunden."
        breadcrumbs={[{ label: "Kontakt" }]}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button asChild size="lg" className="h-14 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={`tel:${TEL}`} className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> Direkt anrufen</span>
              <span className="text-xs opacity-80">{TEL_DISPLAY}</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-border bg-transparent">
            <a href={waHref} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
              <span className="text-xs text-muted-foreground">Schnell mit Foto</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-border bg-transparent">
            <a href={`mailto:${MAIL}`} className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> E-Mail</span>
              <span className="text-xs text-muted-foreground break-all">{MAIL}</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-border bg-transparent">
            <a href={projectMail} className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-2"><Camera className="h-4 w-4" /> Projekt anfragen</span>
              <span className="text-xs text-muted-foreground">Bilder &amp; Maße</span>
            </a>
          </Button>
        </div>
      </Section>

      <Section eyebrow="Formular" title="Anfrage zusammenstellen">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Felder ausfüllen – beim Klick auf <strong>„Per E-Mail senden"</strong> öffnet sich Ihr E-Mail-Programm
          mit der vorbereiteten Anfrage. Alternativ direkt per WhatsApp.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 grid gap-5 rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:grid-cols-2 sm:p-8"
        >
          <Field label="Name" required>
            <input required value={form.name} onChange={update("name")} className={input} />
          </Field>
          <Field label="Telefon">
            <input type="tel" value={form.telefon} onChange={update("telefon")} className={input} />
          </Field>
          <Field label="E-Mail" required>
            <input required type="email" value={form.email} onChange={update("email")} className={input} />
          </Field>
          <Field label="Ort">
            <input value={form.ort} onChange={update("ort")} className={input} placeholder="Wilhelmshaven" />
          </Field>
          <Field label="Gewünschte Leistung">
            <select value={form.leistung} onChange={update("leistung")} className={input}>
              <option>Bodenverlegung</option>
              <option>Küchenmontage</option>
              <option>Entrümpelung &amp; Entsorgung</option>
              <option>Sonstiges</option>
            </select>
          </Field>
          <Field label="Gewünschter Zeitraum">
            <input value={form.zeitraum} onChange={update("zeitraum")} className={input} placeholder="z. B. nächste 2 Wochen" />
          </Field>
          <Field label="Geplantes Budget (ca.)">
            <select value={form.budget} onChange={update("budget")} className={input}>
              <option>Noch unklar</option>
              <option>unter 500 €</option>
              <option>500 – 1.500 €</option>
              <option>1.500 – 3.000 €</option>
              <option>3.000 – 5.000 €</option>
              <option>über 5.000 €</option>
            </select>
          </Field>
          <Field label="Kurze Beschreibung" className="sm:col-span-2">
            <textarea rows={5} value={form.text} onChange={update("text")} className={input} placeholder="Räume, ungefähre Größe, Besonderheiten…" />
          </Field>
          <p className="sm:col-span-2 text-xs text-muted-foreground">
            Hinweis: Fotos bitte direkt aus dem E-Mail-Programm bzw. WhatsApp anhängen – das Senden erfolgt aus Datenschutzgründen über Ihren eigenen Mail-/WhatsApp-Client.
          </p>
          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
              <a href={mailHref}>
                <Mail className="mr-2 h-4 w-4" /> Per E-Mail senden <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border bg-transparent px-7">
              <a href={waHref} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Per WhatsApp senden
              </a>
            </Button>
          </div>
        </form>
      </Section>

      <Section eyebrow="Direktkontakt" bordered>
        <ul className="grid gap-4 text-sm sm:grid-cols-3">
          <li className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-5">
            <Phone className="h-5 w-5 text-accent" />
            <a href={`tel:${TEL}`} className="hover:text-accent">{TEL_DISPLAY}</a>
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-5">
            <Mail className="h-5 w-5 text-accent" />
            <a href={`mailto:${MAIL}`} className="break-all hover:text-accent">{MAIL}</a>
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-5">
            <MapPin className="h-5 w-5 text-accent" />
            <span>Weichselstraße 12<br />26388 Wilhelmshaven</span>
          </li>
        </ul>
      </Section>

      <Section eyebrow="Einsatzgebiet" title="Wilhelmshaven & Umgebung">
        <div className="mt-4">
          <EinsatzgebietMap height="500px" zoom={9} />
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
        {label}
        {required && " *"}
      </span>
      {children}
    </label>
  );
}
