import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/kueche-umzug-checkliste";

const CHECK = "text-accent";

export const Route = createFileRoute("/kueche-umzug-checkliste")({
  component: RatgeberKuecheUmzug,
  head: () => ({
    meta: [
      { title: "Küche umziehen: Die komplette Checkliste vom Küchenmonteur" },
      {
        name: "description",
        content:
          "Küche mit umziehen? Die komplette Checkliste vom Küchenmonteur aus Wilhelmshaven: Lohnt-sich-Check, Zeitplan, Demontage-Reihenfolge, Transport, Anpassung und Aufbau – inkl. Kosten (Montage 189 €/lfm) und Steuer-Tipp.",
      },
      { property: "og:title", content: "Küche umziehen: Die komplette Checkliste vom Küchenmonteur" },
      {
        property: "og:description",
        content:
          "Lohnt-sich-Check, Demontage-Reihenfolge, Transport, Aufbau und Kosten – die komplette Küchenumzugs-Checkliste vom Monteur aus Wilhelmshaven.",
      },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Küchenumzugs-Checkliste von Verlegt & Verschraubt Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Küche umziehen: Die komplette Checkliste vom Küchenmonteur" },
      {
        name: "twitter:description",
        content:
          "Lohnt-sich-Check, Demontage-Reihenfolge, Transport, Aufbau und Kosten – die komplette Küchenumzugs-Checkliste.",
      },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: URL,
          name: "Küche umziehen: Die komplette Checkliste vom Küchenmonteur",
          description:
            "Vollständiger Ratgeber zum Küchenumzug: Lohnt-sich-Entscheidung, Zeitplan, Demontage-Reihenfolge, Transport, Anpassung an die neue Wohnung, Aufbau mit Funktionstest, Kosten und steuerliche Absetzbarkeit – vom Küchenmonteur aus Wilhelmshaven.",
        }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: "Küche umziehen", url: URL },
        ]),
      ]),
    ],
  }),
});

function Punkt({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed text-muted-foreground">
      <span className={`mt-0.5 shrink-0 ${CHECK}`} aria-hidden>✓</span>
      <span>{children}</span>
    </li>
  );
}

function RatgeberKuecheUmzug() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Küche umziehen: Die komplette Checkliste."
        intro="Die Küche ist das teuerste Möbelstück im Haushalt – und das komplizierteste beim Umzug. Hier ist der komplette Ablauf, wie wir ihn als Küchenmonteure selbst arbeiten: von der Lohnt-sich-Frage über die Demontage bis zum Funktionstest im neuen Zuhause. Ehrlich, vollständig, aus der Praxis in Wilhelmshaven."
      />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>
          Ein Küchenumzug lohnt sich, wenn Maße, Anschlüsse und Zustand der
          Küche zur neuen Wohnung passen – das klärt ein Aufmaß vor der
          Kündigung des alten Mietvertrags. Entscheidend für das Gelingen sind
          die richtige Demontage-Reihenfolge (Geräte zuerst), lückenlose
          Beschriftung und die Anpassung an die neuen Raummaße. Wir montieren
          Umzugsküchen in Wilhelmshaven und Umgebung für 189 €/lfm Arbeitslohn –
          auf Wunsch inklusive Demontage im alten Zuhause.
        </QuickAnswer>
      </Section>

      <Section eyebrow="Schritt 1" title="Lohnt sich der Umzug der Küche überhaupt?" bordered>
        <p className="leading-relaxed text-muted-foreground">
          Die ehrlichste Frage zuerst – denn nicht jede Küche sollte umziehen.
          Vier Kriterien entscheiden:
        </p>
        <ul className="mt-5 space-y-3">
          <Punkt>
            <b className="text-foreground">Die Maße:</b> Passt die Zeile in den neuen Raum – inklusive
            Fenster, Türen, Heizkörpern und Dachschrägen? Eine 4-Meter-Küche in einem
            3,60-Meter-Raum bedeutet Umbau, nicht nur Aufbau.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Die Anschlüsse:</b> Wasser, Abwasser und Starkstrom sitzen in der
            neuen Wohnung fast nie an derselben Stelle. Kleine Distanzen lassen sich
            überbrücken – wandert die Spüle quer durch den Raum, wird es aufwendig.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Der Zustand:</b> Aufgequollene Spanplatten, ausgeleierte
            Scharniere und Geräte kurz vor dem Ende überleben den Umzug selten. Faustregel:
            Was jetzt schon wackelt, wackelt nach dem Umzug doppelt.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Die Alternative:</b> Manchmal ist der Verkauf an den Nachmieter
            das beste Geschäft – kein Abbau, kein Transport, und das Geld fließt in die
            neue Küche.
          </Punkt>
        </ul>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Unser Rat aus der Praxis: Messen Sie die neue Küche <b className="text-foreground">vor</b> der
          Entscheidung aus – oder schicken Sie uns Fotos und Maße beider Räume, dann sagen
          wir Ihnen ehrlich, ob sich der Umzug lohnt.
        </p>
      </Section>

      <Section eyebrow="Schritt 2" title="Der Zeitplan: Wann muss was passieren?">
        <ul className="space-y-3">
          <Punkt>
            <b className="text-foreground">4–6 Wochen vorher:</b> Neue Küche/neuen Raum ausmessen,
            Anschlüsse fotografieren, Entscheidung treffen, Monteur-Termin sichern (gute
            Termine zum Monatswechsel sind früh weg).
          </Punkt>
          <Punkt>
            <b className="text-foreground">1–2 Wochen vorher:</b> Anpassungen klären (Arbeitsplatte
            kürzen? Schrank weglassen?), Transport organisieren, bei Bedarf Elektriker
            für den Herdanschluss über das Partnernetzwerk anfragen.
          </Punkt>
          <Punkt>
            <b className="text-foreground">2–3 Tage vorher:</b> Küche komplett ausräumen, Kühlschrank
            abtauen (mindestens 24 Stunden vorher!), Geschirrspüler leer laufen lassen.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Umzugstag(e):</b> Erst Demontage, dann Transport, dann Aufbau –
            bei einer durchschnittlichen Küche realistisch zwei Arbeitstage, wenn alles
            vorbereitet ist.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Vorbereitung" title="Das Werkzeug: Was bereitliegen muss" bordered>
        <p className="leading-relaxed text-muted-foreground">
          Nichts kostet mehr Nerven als die Baumarkt-Fahrt mitten in der Demontage.
          Diese Ausstattung deckt einen kompletten Küchenumzug ab:
        </p>
        <ul className="mt-5 space-y-3">
          <Punkt><b className="text-foreground">Akkuschrauber mit vollständigem Bit-Satz</b> – Küchen kombinieren gern Kreuz, Torx und Pozidriv in einem einzigen Schrank.</Punkt>
          <Punkt><b className="text-foreground">Wasserwaage (mind. 60 cm)</b> – fürs Ausrichten beim Aufbau unverzichtbar, denn kein Altbauboden ist gerade.</Punkt>
          <Punkt><b className="text-foreground">Kreppband, wasserfester Stift, Gefrierbeutel</b> – das Nummerier- und Schrauben-System steht und fällt damit.</Punkt>
          <Punkt><b className="text-foreground">Cuttermesser</b> – zum Aufschneiden der Silikonfugen an Arbeitsplatte und Nischenrückwand, bevor gezogen wird.</Punkt>
          <Punkt><b className="text-foreground">Maulschlüssel/Wasserpumpenzange, Eimer und alte Handtücher</b> – in Zu- und Ablaufschläuchen steht immer Restwasser.</Punkt>
          <Punkt><b className="text-foreground">Umzugsdecken und Spanngurte</b> – Fronten und Arbeitsplatten überleben den Transport nur gepolstert und fixiert.</Punkt>
        </ul>
      </Section>

      <Section eyebrow="Schritt 3" title="Demontage im alten Zuhause: die richtige Reihenfolge" bordered>
        <p className="leading-relaxed text-muted-foreground">
          Hier entscheidet sich, ob der Aufbau später zwei Stunden oder zwei Tage
          dauert. Die Profi-Reihenfolge:
        </p>
        <ul className="mt-5 space-y-3">
          <Punkt>
            <b className="text-foreground">Sicherheit zuerst:</b> Sicherungen der Küchen-Stromkreise raus,
            Eckventile für Wasser zudrehen. Bei Gasgeräten gilt ohne Ausnahme: nur der
            Fachbetrieb trennt die Leitung.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Fotos von allem:</b> Jede Anschluss-Situation, jede
            Schrankfront, die Gesamtansicht. Die Bilder sind beim Aufbau Gold wert – und
            im Streitfall mit dem Vermieter ebenfalls.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Nummerieren:</b> Alle Schränke, Türen und Blenden mit
            Kreppband durchnummerieren (im Uhrzeigersinn), Einlegeböden und Fachbodenträger
            pro Schrank in beschriftete Beutel.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Geräte zuerst:</b> Herd, Spülmaschine, Kühlschrank raus – sie
            sind schwer, sperrig und blockieren den Zugriff auf die Schrauben dahinter.
            Schläuche mit Handtuch drunter lösen (Restwasser!).
          </Punkt>
          <Punkt>
            <b className="text-foreground">Dann von oben nach unten:</b> Hängeschränke, Arbeitsplatte
            (Verschraubung von unten lösen, Silikonfugen aufschneiden), Unterschränke –
            zuerst die Verbindungsschrauben zwischen den Schränken, dann die
            Wandbefestigung.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Alle Schrauben in EIN System:</b> Pro Schrank ein beschrifteter
            Beutel, alle Beutel in eine Kiste. Der Klassiker unter den Aufbau-Katastrophen
            ist die verschwundene Spezialschraube.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Zwischenschritt" title="Der Transport: Wo Küchen wirklich sterben">
        <p className="leading-relaxed text-muted-foreground">
          Die meisten Küchenschäden passieren nicht beim Schrauben, sondern auf der
          Ladefläche. Die vier Regeln:
        </p>
        <ul className="mt-5 space-y-3">
          <Punkt>
            <b className="text-foreground">Arbeitsplatten hochkant transportieren</b> – flach liegend
            brechen sie beim ersten Schlagloch am Ausschnitt für Spüle oder Kochfeld.
            Hochkant an der Bordwand, gepolstert und verzurrt.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Kühlschrank stehend fahren – und danach warten:</b> Nach dem
            Transport mindestens 12, nach liegendem Transport 24 Stunden stehen lassen,
            bevor er eingesteckt wird. Das Kältemittel-Öl muss zurücklaufen – wer zu früh
            einschaltet, riskiert den Kompressor.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Geschirrspüler nicht kippen:</b> Restwasser läuft sonst in die
            Elektronik. Aufrecht tragen, aufrecht fahren.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Fronten wie Möbelstücke behandeln:</b> Türen und Blenden
            paarweise Front an Front mit Decke dazwischen – Kratzer auf Hochglanzfronten
            sind der teuerste Transportschaden pro Quadratzentimeter.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Schritt 4" title="Das neue Zuhause vorbereiten">
        <ul className="space-y-3">
          <Punkt>
            <b className="text-foreground">Der Boden kommt VOR der Küche:</b> Der meistgemachte
            Planungsfehler. Wird erst die Küche gestellt und dann der Boden verlegt,
            entstehen sichtbare Kanten und die Küche steht auf altem Belag. Richtige
            Reihenfolge: Boden verlegen, dann Küche montieren. (Praktisch, wenn beides
            aus einer Hand kommt – wir machen genau das.)
          </Punkt>
          <Punkt>
            <b className="text-foreground">Anschlüsse abgleichen:</b> Fotos der neuen Anschluss-Situation
            mit der alten vergleichen. Abweichungen sind normal – sie entscheiden über
            Verlängerungen, Umbauten oder den Elektriker-Termin.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Wände prüfen:</b> Hängeschränke brauchen tragfähige Wände.
            Altbau-Wände aus Lehm oder Hohlraum tragen anders als Beton – das klären wir
            vor der Montage, nicht beim ersten herunterfallenden Schrank.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Anpassungen einplanen:</b> Arbeitsplatte kürzen, ein Schrank
            weniger, neue Blende – fast jede Umzugsküche braucht mindestens eine
            Anpassung an den neuen Raum. Das ist normal und kein Grund zur Panik.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Schritt 5" title="Aufbau & Funktionstest: das Finale" bordered>
        <ul className="space-y-3">
          <Punkt>
            <b className="text-foreground">Reihenfolge rückwärts:</b> Unterschränke ausrichten (Wasserwaage –
            Altbauböden sind nie gerade!), verbinden, Arbeitsplatte, Hängeschränke, dann
            die Geräte.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Wasser mit Kontrolle:</b> Spüle und Spülmaschine anschließen,
            Eckventile langsam öffnen, alle Verbindungen zehn Minuten auf Tropfen
            beobachten – erst dann die Sockelblende montieren.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Elektro ehrlich:</b> Geräte mit normalem Stecker sind
            Steckdosensache. Der Starkstrom-Herdanschluss gehört in Fachhände – bei uns
            übernimmt das ein Partnerbetrieb, koordiniert über einen Ansprechpartner.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Funktionstest vor Feierabend:</b> Jede Tür, jeder Auszug, jedes
            Gerät einmal in Betrieb. Erst wenn alles läuft, ist der Küchenumzug fertig.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Sonderfälle" title="Drei Küchen, drei Eigenheiten" bordered>
        <ul className="space-y-3">
          <Punkt>
            <b className="text-foreground">IKEA-Küchen (Metod &amp; Co.):</b> Die Hängeschienen-Montage ist
            beim Umzug ein Vorteil – im neuen Raum wird zuerst die Schiene exakt
            ausgerichtet, dann hängen die Schränke in Serie. Dafür sind die Korpusse
            empfindlicher: Einmal ausgerissene Verbindungen halten beim zweiten Aufbau
            oft nur noch mit Nachrüst-Lösungen.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Gebraucht gekaufte Küchen:</b> Der Abbau passiert beim Verkäufer –
            meist unter Zeitdruck und in fremder Umgebung. Hier sind Fotos und Nummerierung
            doppelt wichtig, und: Vor dem Kauf die eigenen Raummaße mitnehmen, nicht nur
            die Küche anschauen. Wir bauen regelmäßig Kleinanzeigen-Küchen ab und im neuen
            Zuhause wieder auf.
          </Punkt>
          <Punkt>
            <b className="text-foreground">Stein-Arbeitsplatten (Granit, Quarz, Keramik):</b> Bei 60–120 kg
            pro Platte ist das keine Zwei-Mann-Aufgabe mehr. Steinplatten brechen ohne
            Vorwarnung bei Punktbelastung – Transport nur hochkant im Gestell und mit
            genug Händen. Im Zweifel die Platte dem Profi überlassen und den Rest selbst
            machen.
          </Punkt>
        </ul>
      </Section>

      <Section eyebrow="Aus der Praxis" title="Die fünf klassischen Küchenumzugs-Pannen">
        <ul className="space-y-3">
          <Punkt><b className="text-foreground">Der zu früh eingeschaltete Kühlschrank</b> – Kompressorschaden am ersten Abend. Die Wartezeit ist keine Legende.</Punkt>
          <Punkt><b className="text-foreground">Die nicht aufgeschnittene Silikonfuge</b> – wer die Arbeitsplatte oder Nischenrückwand einfach abreißt, nimmt Fliesen und Putz gleich mit. Erst schneiden, dann lösen.</Punkt>
          <Punkt><b className="text-foreground">Der Schraubenbeutel im Nirgendwo</b> – ohne System fehlen beim Aufbau garantiert genau die vier Spezialschrauben der Hängeschränke. Ein Beutel pro Schrank, eine Kiste für alle.</Punkt>
          <Punkt><b className="text-foreground">Der unterschätzte Herdanschluss</b> – Starkstrom ist kein Steckdosen-Thema. Wer den Elektriker erst am Aufbautag sucht, kocht die erste Woche mit der Mikrowelle.</Punkt>
          <Punkt><b className="text-foreground">Die Küche vor dem Boden</b> – der Klassiker: Erst steht die Zeile, dann fällt auf, dass der neue Vinyl noch fehlt. Jetzt heißt es: alles nochmal raus – oder für immer mit sichtbaren Kanten leben.</Punkt>
        </ul>
      </Section>

      <Section eyebrow="Häufige Fragen" title="Kurz beantwortet" bordered>
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-base font-semibold">Wie lange dauert ein Küchenumzug insgesamt?</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">Für eine durchschnittliche Küche (3–4 m): Demontage 3–5 Stunden, Aufbau mit Anpassungen 4–8 Stunden – plus Transport. Realistisch also zwei Arbeitstage. In Eigenregie ohne Routine gern das Doppelte.</p>
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Kann ich die Küche komplett selbst abbauen?</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">Schränke, Fronten und Einlegeböden: ja, mit Sorgfalt und dieser Checkliste. Die Grenzen: Gasgeräte (nur Fachbetrieb), Starkstrom-Herd (Elektriker) und schwere Steinplatten. Eine beliebte Arbeitsteilung: Sie räumen aus und demontieren die Schränke, wir übernehmen Geräte, Platte und den kompletten Wiederaufbau.</p>
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Macht das nicht einfach die Umzugsfirma mit?</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">Viele Umzugsfirmen transportieren die Küche, schließen aber Montage und Anschlüsse aus – oder berechnen sie als teure Zusatzposition ohne Küchen-Spezialisierung. Nachfragen lohnt sich: „Ist die Remontage inklusive Ausrichten, Arbeitsplatte und Geräteanschluss enthalten?" Die Antwort entscheidet, ob Sie zusätzlich einen Küchenmonteur brauchen.</p>
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Alte Geräte mitnehmen oder neue kaufen?</h3>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">Faustregel: Geräte über zehn Jahre lohnen den Umzug selten – der Stromverbrauch alter Kühlschränke und Spüler frisst den gesparten Neupreis in wenigen Jahren auf, und ein Transportschaden trifft dann ein Gerät ohne Restwert. Jüngere Geräte: mitnehmen.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Zum Abhaken" title="Die Checkliste auf einen Blick">
        <div className="rounded-2xl border border-accent/30 bg-card/50 p-6 sm:p-8">
          <ul className="space-y-2.5">
            <Punkt>Neuen Raum ausmessen, Anschlüsse fotografieren, Lohnt-sich-Entscheidung treffen</Punkt>
            <Punkt>Monteur-/Transporttermin sichern, Anpassungen und ggf. Elektriker klären</Punkt>
            <Punkt>Küche ausräumen, Kühlschrank 24 h vorher abtauen</Punkt>
            <Punkt>Sicherungen raus, Wasser zu, alles fotografieren und nummerieren</Punkt>
            <Punkt>Geräte zuerst raus, dann Hängeschränke, Platte, Unterschränke – Schrauben pro Schrank in beschriftete Beutel</Punkt>
            <Punkt>Transport: Platten hochkant, Kühlschrank stehend, Spüler nicht kippen, Fronten gepolstert</Punkt>
            <Punkt>Neues Zuhause: Boden VOR der Küche verlegen, Anschlüsse abgleichen, Wände prüfen</Punkt>
            <Punkt>Aufbau: ausrichten, verbinden, anschließen – Wasserverbindungen 10 Minuten beobachten</Punkt>
            <Punkt>Kühlschrank-Wartezeit einhalten, Funktionstest aller Geräte und Auszüge</Punkt>
          </ul>
        </div>
      </Section>

      <Section eyebrow="Kosten & Steuer" title="Was kostet das – und was zahlt das Finanzamt mit?">
        <p className="leading-relaxed text-muted-foreground">
          Branchenüblich liegen Küchenmontagen bei etwa 150–300 € pro laufendem
          Meter. Bei uns kostet die Montage <b className="text-foreground">189 €/lfm Arbeitslohn</b> –
          Demontage im alten Zuhause, Arbeitsplatten-Zuschnitt und Entsorgung der
          Altküche kommen je nach Bedarf dazu; eine erste Einschätzung liefert der{" "}
          <Link to="/preise" className="font-medium text-accent hover:underline">
            Kostenrechner
          </Link>
          . Und ein Tipp, den viele verschenken: Küchenmontage ist in der Regel als
          Handwerkerleistung <b className="text-foreground">steuerlich absetzbar</b> (20 % der
          Arbeitskosten). Voraussetzung: eine ordentliche Rechnung und Zahlung per
          Überweisung – Barzahlung erkennt das Finanzamt nicht an. Beides ist bei uns
          selbstverständlich; die Details für Ihren Fall klärt Ihr Steuerberater.
        </p>
      </Section>

      <Section eyebrow="Abkürzung" title="Oder: Sie schicken uns einfach Fotos.">
        <p className="leading-relaxed text-muted-foreground">
          Diese Checkliste ist der komplette Weg in Eigenregie. Die Abkürzung: Fotos
          der Küche und beider Räume per WhatsApp, grobe Maße dazu – Sie bekommen eine
          ehrliche Einschätzung, ob sich der Umzug lohnt und was er kostet, meist am
          selben Werktag. Wir übernehmen auf Wunsch Demontage, Aufbau, Anpassungen und –
          als einziger sinnvoller Zeitpunkt – die{" "}
          <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">
            Bodenverlegung vor der Küchenmontage
          </Link>
          . Mehr zur Leistung:{" "}
          <Link to="/kuechenmontage-in-wilhelmshaven" className="font-medium text-accent hover:underline">
            Küchenmontage in Wilhelmshaven
          </Link>
          .
        </p>
      </Section>

      <CtaBlock
        title="Küche zieht um?"
        text="Fotos beider Räume per WhatsApp – ehrliche Lohnt-sich-Einschätzung meist am selben Werktag."
      />
    </>
  );
}
