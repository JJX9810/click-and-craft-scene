// Zentrale Preisquelle – wird sowohl vom Kostenrechner als auch von den
// JSON-LD Service-Schemata der Leistungsseiten importiert. Preisänderungen
// hier wirken automatisch an beiden Stellen.

export type BodenVariante = {
  key: string;
  label: string;
  /** €/m² – null = auf Anfrage, kein Offer im Schema */
  price: number | null;
};

export const BODEN_VARIANTEN: BodenVariante[] = [
  { key: "laminat_schwimmend", label: "Laminat schwimmend", price: 16 },
  { key: "pvc_schwimmend", label: "PVC schwimmend", price: 12 },
  { key: "pvc_verklebt", label: "PVC verklebt", price: 15 },
  { key: "vinyl_schwimmend", label: "Vinyl schwimmend", price: 18 },
  { key: "vinyl_verklebt", label: "Vinyl verklebt", price: 22 },
  { key: "linoleum_verklebt", label: "Linoleum verklebt", price: null },
  { key: "teppich_lose", label: "Teppich lose verlegt / lose verklebt", price: 10 },
  { key: "teppich_vollflaechig", label: "Teppich vollflächig verklebt", price: 12 },
];

// Interne Berechnungswerte
export const ALT_PRICE_SCHWIMMEND = 4; // €/m²
export const ALT_PRICE_VERKLEBT = 7; // €/m²
export const SOCKEL_PRICE = 5; // €/lfm – normale Montage
export const SOCKEL_GEHRUNG_PRICE = 7; // €/lfm – auf Gehrung gesägt
export const DAEMMUNG_PRICE = 1.5; // €/m²
export const SPACHTELN_PRICE = 19; // €/m² – inkl. Grundierung

export const ALT_TEPPICH_LOSE_PRICE = 7;
export const ALT_TEPPICH_LOSE_MIN = 120;
export const ALT_TEPPICH_VERKLEBT_PRICE = 12;
export const ALT_TEPPICH_VERKLEBT_MIN = 180;
export const MATERIALSERVICE_RATE = 0.15;
export const MATERIALSERVICE_MIN = 150;
export const ANFAHRT_FREI_KM = 30;
export const ANFAHRT_PRO_KM = 0.7;

// Küchenmontage
export const KUECHE_MONTAGE_PRICE = 189; // €/lfm
export const KUECHE_DEMONTAGE_PRICE = 100; // €/lfm
export const KUECHE_ARBEITSPLATTE_PRICE = 119; // €/lfm
export const KUECHE_ENTSORGUNG_PAUSCHAL = 350; // €
