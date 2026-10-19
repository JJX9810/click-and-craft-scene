import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Layers3, Mail, MessageCircle, PackageOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { emptyInquiry, inquiryLinks, inquiryText, services, validateInquiry, type Inquiry, type Service } from "./inquiry-model";

export const serviceIcons = [Layers3, Wrench, PackageOpen, MessageCircle];

export function ProjectInquiry({ initialService = "" }: { initialService?: Service | "" }) {
  const [data, setData] = useState<Inquiry>({ ...emptyInquiry, service: initialService });
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const selected = services.find(s => s.id === data.service);
  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setData(d => ({ ...d, [key]: value }));
    setErrors(e => ({ ...e, [key]: "" }));
  }
  function move(next: number) { setStep(next); setErrors({}); setTimeout(() => heading.current?.focus(), 0); }
  function next(event: React.FormEvent) {
    event.preventDefault();
    const issues = validateInquiry(data, step);
    setErrors(issues);
    if (Object.keys(issues).length) {
      const first = document.getElementById(`inquiry-${Object.keys(issues)[0]}`);
      first?.focus();
      return;
    }
    if (step < 2) move(step + 1);
    else {
      const allIssues = { ...validateInquiry(data, 0), ...validateInquiry(data, 1), ...issues };
      if (Object.keys(allIssues).length) { move(allIssues.service ? 0 : 1); setErrors(allIssues); return; }
      setReady(true); setTimeout(() => heading.current?.focus(), 0);
    }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(inquiryText(data)); setCopyStatus("Anfrage kopiert."); }
    catch { textArea.current?.focus(); textArea.current?.select(); setCopyStatus("Bitte kopieren Sie den markierten Text manuell."); }
  }
  const field = (key: keyof Inquiry, label: string, control: React.ReactNode, optional = false) => <label className="vv-field" htmlFor={`inquiry-${key}`}><span>{label}{optional ? <small>Optional</small> : <span aria-hidden="true"> *</span>}</span>{control}{errors[key] && <span className="vv-error" id={`error-${key}`} role="alert">{errors[key]}</span>}</label>;
  const attrs = (key: keyof Inquiry) => ({ id: `inquiry-${key}`, "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `error-${key}` : undefined });

  if (ready) {
    const links = inquiryLinks(data);
    return <div className="vv-wizard vv-review">
      <span className="vv-check"><Check aria-hidden="true" size={26} /></span>
      <p className="vv-eyebrow">Prüfen & weitergeben</p>
      <h3 ref={heading} tabIndex={-1}>Ihre Anfrage ist vorbereitet.</h3>
      <p>Prüfen Sie Ihre Angaben. Öffnen Sie anschließend E-Mail oder WhatsApp und senden Sie die Nachricht dort ab.</p>
      <dl className="vv-summary"><div><dt>Leistung</dt><dd>{selected?.title}</dd></div><div><dt>Projektort</dt><dd>{data.location}</dd></div><div><dt>Kontakt</dt><dd>{data.name}<br />{data.email}</dd></div></dl>
      <label className="vv-field" htmlFor="inquiry-preview"><span>Vollständige Nachricht</span><textarea ref={textArea} id="inquiry-preview" rows={10} readOnly value={inquiryText(data)} /></label>
      <div className="vv-actions"><a className="vv-btn" href={links.email}><Mail size={18} aria-hidden="true" /> E-Mail öffnen</a><a className="vv-btn vv-btn-outline" href={links.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp öffnen</a><button type="button" className="vv-text-btn" onClick={copy}><Copy size={16} aria-hidden="true" /> Kopieren</button></div>
      <p className="vv-note">Es wurde noch nichts gesendet. Fotos können Sie in Ihrer E-Mail oder bei WhatsApp ergänzen. Falls sich kein Programm öffnet, kopieren Sie die Nachricht an justus.brosch@verlegt-verschraubt.de.</p>
      <p role="status" className="vv-copy-status">{copyStatus}</p>
      <div className="vv-actions"><button type="button" className="vv-text-btn" onClick={() => { setReady(false); move(2); }}><ArrowLeft size={16} aria-hidden="true" /> Angaben bearbeiten</button><button type="button" className="vv-text-btn" onClick={() => { setData({ ...emptyInquiry }); setReady(false); setCopyStatus(""); move(0); }}>Neue Anfrage</button></div>
    </div>;
  }
  return <form className="vv-wizard" noValidate onSubmit={next}>
    <ol className="vv-progress" aria-label="Anfrageschritte">{["Leistung", "Ihr Projekt", "Kontakt"].map((title, index) => <li key={title} aria-current={index === step ? "step" : undefined} className={index <= step ? "is-current" : ""}><span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>{title}</li>)}</ol>
    <p className="vv-eyebrow">Schritt {step + 1} von 3</p>
    <h3 ref={heading} tabIndex={-1}>{["Was haben Sie vor?", "Ein paar Details genügen.", "Wie erreichen wir Sie?"][step]}</h3>
    <p className="vv-wizard-intro">{["Wählen Sie die Leistung, die am besten zu Ihrem Vorhaben passt.", "Ungefähre Angaben sind für die erste Einschätzung ausreichend. Pflichtfelder sind mit * markiert.", "Ihre Daten werden für die Kontaktaufnahme benötigt. Pflichtfelder sind mit * markiert."][step]}</p>
    {step === 0 && <><div className="vv-options" id="inquiry-service" tabIndex={-1} role="group" aria-label="Leistung auswählen" aria-describedby={errors.service ? "error-service" : undefined}>{services.map((s, i) => { const Icon = serviceIcons[i]; return <button key={s.id} type="button" aria-pressed={data.service === s.id} className={`vv-option ${data.service === s.id ? "is-selected" : ""}`} onClick={() => setData(d => ({ ...d, service: s.id, kind: d.service === s.id ? d.kind : "", size: d.service === s.id ? d.size : "" }))}><Icon size={23} aria-hidden="true" /><span><strong>{s.title}</strong><small>{s.short}</small></span><span className="vv-option-check" aria-hidden="true">{data.service === s.id && <Check size={14} />}</span></button>; })}</div>{errors.service && <p role="alert" className="vv-error" id="error-service">{errors.service}</p>}</>}
    {step === 1 && <div className="vv-fields">
      {field("kind", selected?.id === "boden" ? "Gewünschter Bodenbelag" : "Was soll gemacht werden?", <select {...attrs("kind")} value={data.kind} onChange={e => update("kind", e.target.value)}><option value="">Bitte auswählen / noch offen</option>{selected?.options.map(o => <option key={o}>{o}</option>)}</select>, true)}
      {data.service !== "sonstiges" && field("size", data.service === "kueche" ? "Küchenlänge in lfm (ca.)" : "Fläche in m² (ca.)", <input {...attrs("size")} type="number" inputMode="decimal" min="0.1" max="100000" step="any" placeholder={data.service === "kueche" ? "z. B. 3,5" : "z. B. 40"} value={data.size} onChange={e => update("size", e.target.value)} />, true)}
      {field("location", "PLZ / Projektort", <input {...attrs("location")} autoComplete="address-level2" required maxLength={100} placeholder="z. B. 26388 Wilhelmshaven" value={data.location} onChange={e => update("location", e.target.value)} />)}
      {field("timing", "Wunschzeitraum", <input {...attrs("timing")} maxLength={100} placeholder="z. B. im November oder flexibel" value={data.timing} onChange={e => update("timing", e.target.value)} />, true)}
      <div className="vv-full">{field("description", "Beschreiben Sie Ihr Vorhaben", <textarea {...attrs("description")} required minLength={10} maxLength={3000} rows={4} placeholder={data.service === "boden" ? "Welche Räume? Ist alter Boden vorhanden? Sind Material und Sockelleisten schon da?" : data.service === "kueche" ? "Neue oder gebrauchte Küche? Etage, Arbeitsplatte und Besonderheiten …" : "Was soll erledigt werden? Umfang, Zugang, Etage und Besonderheiten …"} value={data.description} onChange={e => update("description", e.target.value)} />)}</div>
      {data.service === "kueche" && <p className="vv-note vv-full">Elektro- und Festanschlüsse werden separat mit einem geeigneten Fachbetrieb abgestimmt.</p>}
    </div>}
    {step === 2 && <div className="vv-fields">
      {field("name", "Ihr Name", <input {...attrs("name")} required autoComplete="name" maxLength={120} value={data.name} onChange={e => update("name", e.target.value)} />)}
      {field("email", "E-Mail-Adresse", <input {...attrs("email")} required type="email" autoComplete="email" maxLength={200} value={data.email} onChange={e => update("email", e.target.value)} />)}
      {field("phone", "Telefonnummer", <input {...attrs("phone")} type="tel" autoComplete="tel" maxLength={50} value={data.phone} onChange={e => update("phone", e.target.value)} />, true)}
      <div className="vv-full"><label className="vv-consent"><input {...attrs("acknowledged")} type="checkbox" checked={data.acknowledged} onChange={e => update("acknowledged", e.target.checked)} required /><span>Ich habe den <Link to="/datenschutz">Datenschutzhinweis</Link> gelesen. Meine Angaben werden zur Bearbeitung meiner Anfrage verwendet. *</span></label>{errors.acknowledged && <p className="vv-error" id="error-acknowledged" role="alert">{errors.acknowledged}</p>}<p className="vv-note">Im nächsten Schritt prüfen Sie die Nachricht und wählen E-Mail oder WhatsApp. Ihre Eingaben bleiben bis dahin in diesem geöffneten Formular.</p></div>
    </div>}
    <div className="vv-wizard-bottom"><span className="vv-note">Unverbindliche Projektanfrage</span><div className="vv-actions">{step > 0 && <button type="button" className="vv-text-btn" onClick={() => move(step - 1)}><ArrowLeft size={16} aria-hidden="true" /> Zurück</button>}<button className="vv-btn" type="submit">{step === 2 ? "Anfrage prüfen" : "Weiter"}<ArrowRight size={18} aria-hidden="true" /></button></div></div>
  </form>;
}
