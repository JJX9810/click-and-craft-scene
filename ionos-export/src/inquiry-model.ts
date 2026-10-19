export type Service = "boden" | "kueche" | "raeumung" | "sonstiges";
export const services: { id: Service; title: string; short: string; description: string; options: string[] }[] = [
  { id: "boden", title: "Bodenverlegung", short: "Laminat, Vinyl, PVC & Teppich", description: "Vom vorbereiteten Untergrund bis zu Leisten und sauberen Übergängen.", options: ["Noch offen / Beratung", "Laminat", "Klickvinyl", "Klebevinyl", "PVC", "Teppich"] },
  { id: "kueche", title: "Küchenmontage", short: "Aufbau, Anpassung & Restmontage", description: "Küche nach dem Umzug, neue Arbeitsplatte oder die letzten Handgriffe.", options: ["Kompletter Aufbau", "Restmontage", "Arbeitsplatte / Anpassung", "Abbau und Wiederaufbau"] },
  { id: "raeumung", title: "Entrümpelung", short: "Wohnung, Keller & Dachboden", description: "Platz für Neues schaffen – mit abgestimmtem Umfang und besenreiner Übergabe.", options: ["Wohnung / Haus", "Keller", "Dachboden", "Garage", "Einzelne Möbel"] },
  { id: "sonstiges", title: "Anderes Projekt", short: "Ihr Vorhaben kurz beschreiben", description: "Sie sind unsicher, welche Leistung passt? Wir schauen uns Ihr Vorhaben an.", options: ["Beratung zum Vorhaben", "Umzugshilfe", "Mehrere Leistungen"] },
];
export type Inquiry = { service: Service | ""; kind: string; size: string; location: string; timing: string; description: string; name: string; email: string; phone: string; acknowledged: boolean };
export const emptyInquiry: Inquiry = { service: "", kind: "", size: "", location: "", timing: "", description: "", name: "", email: "", phone: "", acknowledged: false };
export function validateInquiry(data: Inquiry, step: number): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0 && !services.some(s => s.id === data.service)) errors.service = "Bitte wählen Sie eine Leistung aus.";
  if (step === 1) {
    if (!data.location.trim()) errors.location = "Bitte geben Sie den Projektort ein.";
    if (data.description.trim().length < 10) errors.description = "Bitte beschreiben Sie Ihr Projekt mit mindestens 10 Zeichen.";
    if (data.size && (!Number.isFinite(Number(data.size)) || Number(data.size) <= 0 || Number(data.size) > 100000)) errors.size = "Bitte geben Sie eine Größe zwischen 0 und 100.000 ein.";
  }
  if (step === 2) {
    if (data.name.trim().length < 2) errors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!data.acknowledged) errors.acknowledged = "Bitte bestätigen Sie den Hinweis zur Kontaktaufnahme.";
  }
  return errors;
}
export function inquiryText(data: Inquiry): string {
  const service = services.find(s => s.id === data.service)?.title || "Projekt";
  return [`Guten Tag,`, `ich möchte folgendes Projekt anfragen:`, `Leistung: ${service}`, `Ausführung: ${data.kind || "Noch offen"}`, data.size ? `Umfang: ${data.size} ${data.service === "kueche" ? "lfm Küchenlänge" : "m²"}` : "Umfang: Noch offen", `Projektort: ${data.location.trim()}`, `Wunschzeitraum: ${data.timing.trim() || "Flexibel / nach Absprache"}`, `Beschreibung:\n${data.description.trim()}`, `Kontaktdaten:\n${data.name.trim()}\n${data.email.trim()}${data.phone.trim() ? `\n${data.phone.trim()}` : ""}`].join("\n\n");
}
export function inquiryLinks(data: Inquiry) {
  const text = inquiryText(data);
  const subject = `Projektanfrage · ${services.find(s => s.id === data.service)?.title || "Projekt"} · ${data.location.trim()}`;
  return { email: `mailto:justus.brosch@verlegt-verschraubt.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`, whatsapp: `https://wa.me/491634799286?text=${encodeURIComponent(text)}` };
}
