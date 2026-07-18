import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Firmenlogo von Verlegt & Verschraubt Handwerkerservice"
                title="Verlegt & Verschraubt Handwerkerservice"
                className="h-12 w-auto"
                width={140}
                height={56}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Handwerkerservice aus Wilhelmshaven für Privatkunden:
              Bodenverlegung, Küchenmontage und Entrümpelung – zuverlässig,
              ordentlich, zügig.
            </p>
            <Button
              asChild
              className="mt-6 h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/kontakt">
                Projekt anfragen <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Leistungen</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/bodenverlegung-wilhelmshaven" className="hover:text-foreground">Bodenleger &amp; Bodenverlegung</Link></li>
              <li><Link to="/kuechenmontage-in-wilhelmshaven" className="hover:text-foreground">Küchenmonteur & Küchenmontage</Link></li>
              <li><Link to="/entruempelung-entsorgung-in-wilhelmshaven" className="hover:text-foreground">Entrümpelung & Haushaltsauflösung</Link></li>
              <li><Link to="/preise" className="hover:text-foreground">Preise</Link></li>
              <li><Link to="/wunschtermin" className="hover:text-foreground">Wunschtermin</Link></li>
              <li><Link to="/referenzen" className="hover:text-foreground">Referenzen</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Einsatzorte</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/handwerkerservice-wilhelmshaven" className="hover:text-foreground">Wilhelmshaven</Link></li>
              <li><Link to="/handwerkerservice-schortens" className="hover:text-foreground">Schortens</Link></li>
              <li><Link to="/handwerkerservice-sande" className="hover:text-foreground">Sande</Link></li>
              <li><Link to="/handwerkerservice-jever" className="hover:text-foreground">Jever</Link></li>
              <li><Link to="/handwerkerservice-varel" className="hover:text-foreground">Varel</Link></li>
              <li><Link to="/handwerkerservice-wangerland" className="hover:text-foreground">Wangerland</Link></li>
              <li><Link to="/handwerkerservice-wittmund" className="hover:text-foreground">Wittmund</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Kontakt</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+491634799286" className="whitespace-nowrap hover:text-foreground">0163 4799286</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:justus.brosch@verlegt-verschraubt.de" className="break-all hover:text-foreground">
                  justus.brosch@verlegt-verschraubt.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Weichselstraße 12<br />26388 Wilhelmshaven</span>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <li><Link to="/kontakt" className="hover:text-foreground">Kontakt</Link></li>
              <li><Link to="/ueber-uns" className="hover:text-foreground">Über uns</Link></li>
              <li><Link to="/partner" className="hover:text-foreground">Netzwerk</Link></li>
              <li><Link to="/wir-unterstuetzen" className="hover:text-foreground">Wir unterstützen</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/impressum" className="hover:text-foreground">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-foreground">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p className="uppercase tracking-[0.2em]">
            Z.O.Z. · Zuverlässig · Ordentlich · Zügig
          </p>
          <p>© {new Date().getFullYear()} Justus Brosch · Verlegt &amp; Verschraubt Handwerkerservice</p>
        </div>
      </div>
    </footer>
  );
}
