import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { Building2, Mail, Phone, Globe, Scale, Hammer, ShieldCheck, FileText, Link2, Copyright, Lock } from "lucide-react";

export const Route = createFileRoute("/impressum")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Impressum | Verlegt & Verschraubt Handwerkerservice Wilhelmshaven" },
      { name: "description", content: "Impressum von Verlegt & Verschraubt Handwerkerservice, Inhaber Justus Brosch, Wilhelmshaven. Anbieterinformationen gemäß § 5 DDG." },
      { property: "og:title", content: "Impressum – Verlegt & Verschraubt Handwerkerservice" },
      { property: "og:description", content: "Anbieterinformationen gemäß § 5 DDG." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/impressum" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Impressum von Verlegt & Verschraubt Handwerkerservice Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Impressum – Verlegt & Verschraubt Handwerkerservice" },
      { name: "twitter:description", content: "Anbieterinformationen gemäß § 5 DDG." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Impressum von Verlegt & Verschraubt Handwerkerservice Wilhelmshaven" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/impressum" }],
  }),
});

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_20px_60px_-30px_rgba(201,168,76,0.45)]">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Angaben gemäß § 5 DDG"
        title="Impressum"
        intro="Hier finden Sie die gesetzlich vorgeschriebenen Anbieterinformationen von Verlegt & Verschraubt Handwerkerservice."
        breadcrumbs={[{ label: "Impressum" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={Building2} title="Anbieter">
            <p className="text-foreground">Verlegt &amp; Verschraubt Handwerkerservice</p>
            <p>Inhaber: Justus Brosch</p>
            <p>Weichselstraße 12<br />26388 Wilhelmshaven<br />Deutschland</p>
          </Card>

          <Card icon={Phone} title="Kontakt">
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-accent" />
              <a href="tel:+491634799286" className="hover:text-foreground">0163 4799286</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-accent" />
              <a href="mailto:justus.brosch@verlegt-verschraubt.de" className="hover:text-foreground">justus.brosch@verlegt-verschraubt.de</a>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-accent" />
              <a href="https://www.verlegt-verschraubt.de" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">verlegt-verschraubt.de</a>
            </p>
          </Card>

          <Card icon={Scale} title="Rechtsform &amp; Steuerliches">
            <p><span className="text-foreground">Rechtsform:</span> Einzelunternehmen</p>
            <p><span className="text-foreground">Zuständiges Finanzamt:</span> Finanzamt Wilhelmshaven</p>
            <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>
            {/* Platzhalter für später: USt-IdNr. / Wirtschafts-ID
                {ustId && <p>USt-IdNr.: {ustId}</p>} */}
          </Card>

          <Card icon={Hammer} title="Handwerkskammer">
            <p>Verlegt &amp; Verschraubt Handwerkerservice ist bei der <span className="text-foreground">Handwerkskammer Oldenburg</span> registriert.</p>
            <p className="pt-2">
              <span className="text-foreground">Tätigkeitsbereiche:</span> Bodenverlegung, Küchenmontage, Küchenfolierung, Entrümpelung &amp; Entsorgung sowie handwerksnahe Dienstleistungen.
            </p>
          </Card>

          <Card icon={ShieldCheck} title="Verantwortlich für den Inhalt">
            <p>Justus Brosch<br />Weichselstraße 12<br />26388 Wilhelmshaven<br />Deutschland</p>
            <p className="pt-2 text-xs">i.S.d. § 18 Abs. 2 MStV</p>
          </Card>

          <Card icon={FileText} title="Verbraucherstreitbeilegung">
            <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            <p className="pt-2 text-xs">
              Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ec.europa.eu/consumers/odr</a>
            </p>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card icon={ShieldCheck} title="Haftung für Inhalte">
            <p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.</p>
          </Card>
          <Card icon={Link2} title="Haftung für Links">
            <p>Unsere Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss. Deshalb übernehmen wir für diese fremden Inhalte keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.</p>
          </Card>
          <Card icon={Copyright} title="Urheberrecht">
            <p>Die auf dieser Website veröffentlichten Inhalte, Texte, Bilder, Grafiken und Gestaltungselemente unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung oder Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.</p>
          </Card>
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-4 w-4 text-accent" />
            <p className="text-sm text-muted-foreground">
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link to="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</Link>.
            </p>
          </div>
        </div>
      </Section>

      <CtaBlock
        title="Sie möchten ein Projekt besprechen?"
        text="Kontaktieren Sie uns für eine erste Einschätzung zu Bodenverlegung, Küchenmontage, Küchenfolierung oder Entrümpelung & Entsorgung in Wilhelmshaven und Umgebung."
      />
    </>
  );
}
