// Formatierung & Parsing in deutscher Schreibweise.

export const eur = (n: number | null | undefined): string =>
  Number(n ?? 0).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export const num = (n: number | null | undefined, frac = 2): string =>
  Number(n ?? 0).toLocaleString("de-DE", {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });

export const fmtDate = (iso?: string | null): string =>
  iso ? new Date(iso).toLocaleDateString("de-DE") : "–";

export const fmtDateTime = (iso?: string | null): string =>
  iso ? new Date(iso).toLocaleString("de-DE") : "–";

export const todayISO = (): string => new Date().toISOString().slice(0, 10);

/** Geldbetrag aus Eingabe (750 | 750,00 | 1.250,50) in Number. */
export const parseMoney = (s: string): number => {
  s = String(s ?? "")
    .trim()
    .replace(/[€\s]/g, "");
  if (!s) return 0;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

export const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;
