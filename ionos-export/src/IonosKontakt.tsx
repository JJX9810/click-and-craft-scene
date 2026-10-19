import { useSearchParams } from "react-router-dom";
import { ProjectInquiry } from "./ProjectInquiry";
import { services, type Service } from "./inquiry-model";

export function IonosKontakt() {
  const [params] = useSearchParams();
  const rawService = params.get("leistung");
  const selected = services.some(s => s.id === rawService) ? rawService as Service : "";
  return <div className="vv-compact vv-container vv-section vv-inquiry-layout"><div className="vv-inquiry-aside"><p className="vv-eyebrow">Kontakt & Projektanfrage</p><h1>Was haben<br />Sie vor?</h1><p>Wählen Sie eine Leistung und schildern Sie Ihr Vorhaben. Im Anschluss können Sie Ihre Anfrage prüfen und per E-Mail oder WhatsApp weitergeben.</p><div className="vv-contact-direct"><strong>Lieber persönlich?</strong><a href="tel:+491634799286">0163 4799286</a><a href="mailto:justus.brosch@verlegt-verschraubt.de">justus.brosch@verlegt-verschraubt.de</a></div><p className="vv-note">Justus Brosch · Weichselstraße 12<br />26388 Wilhelmshaven</p></div><ProjectInquiry key={selected} initialService={selected} /></div>;
}
