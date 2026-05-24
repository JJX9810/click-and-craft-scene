import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PlatformEntry {
  name: string;
  url?: string;
  description: string;
  active: boolean;
}

const platforms: PlatformEntry[] = [
  {
    name: "Google",
    url: "https://share.google/47AcEDNTSDkltR1un",
    description:
      "Google Unternehmensprofil mit Standort, Kontakt und Bewertungen.",
    active: true,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61579455697023",
    description:
      "Offizielle Facebook-Seite von Verlegt & Verschraubt mit Updates und Projekten.",
    active: true,
  },
  {
    name: "MyHammer",
    url: "https://www.my-hammer.de/auftragnehmer/justus-1",
    description:
      "Profil auf MyHammer – Handwerker-Plattform mit Bewertungen und Aufträgen.",
    active: true,
  },
  {
    name: "Kleinanzeigen",
    url: "https://www.kleinanzeigen.de/s-bestandsliste.html?userId=162496234",
    description:
      "Aktuelle Anzeigen und Angebote auf Kleinanzeigen.de.",
    active: true,
  },
  {
    name: "Gelbe Seiten",
    url: "https://www.gelbeseiten.de/gsbiz/cb6b8b66-db85-4b56-8397-4a920963c6d1",
    description: "Branchenverzeichniseintrag mit Unternehmensdaten.",
    active: true,
  },
  {
    name: "11880",
    url: "https://www.11880.com/branchenbuch/wilhelmshaven/060690823B113934961/verlegt-verschraubt-handwerkerservice.html",
    description:
      "Branchenbucheintrag von Verlegt & Verschraubt Handwerkerservice in Wilhelmshaven.",
    active: true,
  },
  {
    name: "Das Telefonbuch",
    url: "https://adresse.dastelefonbuch.de/Wilhelmshaven/2-Holzfu%C3%9Fb%C3%B6den-Verlegt-Verschraubt-Handwerkerservice-Wilhelmshaven-Weichselstr.html",
    description:
      "Eintrag im Telefonbuch mit Unternehmensdaten und Standort in Wilhelmshaven.",
    active: true,
  },
  {
    name: "goLocal",
    url: "https://www.golocal.de/wilhelmshaven/bodenbelaege/verlegtverschraubt-handwerkerservice-YVD9o/",
    description:
      "Lokaler Unternehmenseintrag für Verlegt & Verschraubt im Bereich Bodenbeläge.",
    active: true,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function OnlinePresenceSection() {
  const active = platforms.filter((p) => p.active && p.url);

  if (active.length === 0) return null;

  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">
            Weitere Einträge & Online-Präsenz
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Online auffindbar.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Verlegt & Verschraubt Handwerkerservice ist nicht nur über die eigene
            Website erreichbar, sondern auch auf ausgewählten externen Plattformen
            und Branchenverzeichnissen vertreten. So können Interessenten
            zusätzliche Unternehmensinformationen einsehen und den Betrieb auch
            außerhalb der Website finden.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((p) => (
            <article
              key={p.name}
              className="tile-shader group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.35)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xs font-semibold uppercase tracking-wider text-accent">
                  {getInitials(p.name)}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-full border-border bg-transparent px-5 text-sm hover:bg-card"
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Eintrag ansehen
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Weitere Plattformen und Verzeichniseinträge werden laufend ergänzt.
        </p>
      </div>
    </section>
  );
}
