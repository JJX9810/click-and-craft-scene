// Anwendungs-Typen fuer die Cockpit-Tabellen (entsprechen den Migrationen).

export interface Audit {
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  deleted_at?: string | null;
}

export interface Customer extends Audit {
  id: string;
  customer_no: string | null;
  type: "privat" | "gewerblich" | string;
  stage: "lead" | "kunde" | string;
  display_name: string;
  company: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  street: string | null;
  zip: string | null;
  city: string | null;
  notes: string | null;
  status: string;
  tags: string[];
}

export interface Project extends Audit {
  id: string;
  project_no: string | null;
  customer_id: string;
  title: string;
  service_type: string | null;
  status: string;
  description: string | null;
  address_override: string | null;
  start_date: string | null;
  due_date: string | null;
  done_date: string | null;
  internal_notes: string | null;
  next_step: string | null;
  progress_pct: number;
  calc_cost: number | null;
  calc_revenue: number | null;
}

export interface Offer extends Audit {
  id: string;
  offer_no: string | null;
  customer_id: string;
  project_id: string | null;
  status: "entwurf" | "gesendet" | "angenommen" | "abgelehnt" | "abgelaufen" | string;
  issue_date: string;
  valid_until: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  note: string | null;
  converted_invoice_id: string | null;
}

export interface Invoice extends Audit {
  id: string;
  invoice_no: string | null;
  customer_id: string;
  project_id: string | null;
  offer_id: string | null;
  status: "entwurf" | "gesendet" | "teilbezahlt" | "bezahlt" | "storniert" | "mahnung" | string;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  paid_total: number;
  is_kleinunternehmer: boolean;
  dunning_level: number;
  note: string | null;
}

export interface Payment extends Audit {
  id: string;
  invoice_id: string | null;
  amount: number;
  paid_at: string;
  method: string | null;
  reference: string | null;
  is_deposit: boolean;
  note: string | null;
}

export interface OpenItem {
  invoice_id: string;
  invoice_no: string | null;
  customer_id: string;
  total: number;
  paid: number;
  open_amount: number;
  issue_date: string;
  due_date: string | null;
  days_overdue: number;
  status: string;
  dunning_level: number;
}

export interface Task extends Audit {
  id: string;
  title: string;
  due_date: string | null;
  status: "offen" | "erledigt" | "verschoben" | string;
  priority: string;
  assignee_id: string | null;
  customer_id: string | null;
  project_id: string | null;
  source: string;
}

export interface PriceRule {
  id: string;
  key: string;
  label: string;
  category: string;
  unit: string;
  unit_price: number | null;
  min_amount: number | null;
  is_active: boolean;
  sort_index: number;
}

export interface Settings {
  id: string;
  company_name: string;
  owner_name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  web: string | null;
  tax_number: string | null;
  iban: string | null;
  bic: string | null;
  is_kleinunternehmer: boolean;
  legal_note: string;
  tax_reserve_pct: number;
  default_deposit_pct: number;
  default_valid_days: number;
  default_due_days: number;
  offer_no_prefix: string;
  offer_no_next: number;
  invoice_no_prefix: string;
  invoice_no_next: number;
}

export const PROJECT_STATUS = [
  "anfrage",
  "besichtigung",
  "angebot",
  "beauftragt",
  "in_arbeit",
  "abgeschlossen",
  "storniert",
] as const;

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  anfrage: "Anfrage",
  besichtigung: "Besichtigung",
  angebot: "Angebot",
  beauftragt: "Beauftragt",
  in_arbeit: "In Arbeit",
  abgeschlossen: "Abgeschlossen",
  storniert: "Storniert",
};

export const INVOICE_STATUS_LABEL: Record<string, string> = {
  entwurf: "Entwurf",
  gesendet: "Gesendet",
  teilbezahlt: "Teilbezahlt",
  bezahlt: "Bezahlt",
  storniert: "Storniert",
  mahnung: "Mahnung",
};

export const OFFER_STATUS_LABEL: Record<string, string> = {
  entwurf: "Entwurf",
  gesendet: "Gesendet",
  angenommen: "Angenommen",
  abgelehnt: "Abgelehnt",
  abgelaufen: "Abgelaufen",
};
