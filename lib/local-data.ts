export type VisitorStatus = "novo" | "contatado" | "integracao" | "conectado";
export type MemberStatus = "ativo" | "inativo";

export type Visitor = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: VisitorStatus;
  notes: string;
  createdAt: string;
};

export type Member = {
  id: string;
  name: string;
  phone: string;
  email: string;
  ministry: string;
  status: MemberStatus;
  since: string;
};

export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  published: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
};

export type ChurchSettings = {
  churchName: string;
  adminName: string;
  whatsapp: string;
  radioUrl: string;
  address: string;
  memberWelcome: string;
};

export type ChurchData = {
  members: Member[];
  visitors: Visitor[];
  events: ChurchEvent[];
  news: NewsItem[];
  settings: ChurchSettings;
};

const STORAGE_KEY = "comunidade.church.data.v1";

export const initialData: ChurchData = {
  members: [
    { id: "m1", name: "Mariana Martins", phone: "(21) 99999-2001", email: "mariana@email.com", ministry: "Louvor", status: "ativo", since: "2025-03-09" },
    { id: "m2", name: "Rafael Santos", phone: "(21) 99999-2002", email: "rafael@email.com", ministry: "Liderança", status: "ativo", since: "2023-08-13" },
    { id: "m3", name: "Lucas Almeida", phone: "(21) 99999-2003", email: "lucas@email.com", ministry: "Mídia", status: "ativo", since: "2026-02-15" },
    { id: "m4", name: "Beatriz Rocha", phone: "(21) 99999-2004", email: "bia@email.com", ministry: "Infantil", status: "ativo", since: "2024-11-10" },
  ],
  visitors: [
    { id: "v1", name: "Ana Martins", phone: "(21) 99999-1001", email: "ana@email.com", status: "novo", notes: "Visitou com uma amiga.", createdAt: "2026-09-23T18:00:00.000Z" },
    { id: "v2", name: "João Souza", phone: "(21) 99999-1002", email: "", status: "contatado", notes: "Respondeu pelo WhatsApp.", createdAt: "2026-09-20T18:00:00.000Z" },
    { id: "v3", name: "Camila Lima", phone: "(21) 99999-1003", email: "camila@email.com", status: "integracao", notes: "Interessada no grupo de jovens.", createdAt: "2026-09-17T18:00:00.000Z" },
  ],
  events: [
    { id: "e1", title: "Culto de Celebração", date: "2026-09-27", time: "19:00", location: "Templo principal", description: "Nosso encontro semanal de celebração e comunhão.", published: true },
    { id: "e2", title: "Noite de Jovens", date: "2026-10-02", time: "20:00", location: "Auditório", description: "Uma noite para novas conexões.", published: true },
    { id: "e3", title: "Café com Famílias", date: "2026-10-04", time: "09:30", location: "Salão social", description: "Café, conversa e comunhão para toda a família.", published: true },
  ],
  news: [
    { id: "n1", title: "Uma semana inteira para servir nossa cidade", category: "Comunidade", excerpt: "Veja como participar da próxima ação social.", content: "Durante a próxima semana teremos oportunidades para servir nossa cidade em diferentes frentes.", published: true, createdAt: "2026-09-24T12:00:00.000Z" },
    { id: "n2", title: "Uma noite feita para novas conexões", category: "Juventude", excerpt: "Convide alguém para estar com a gente.", content: "A próxima Noite de Jovens foi preparada para acolher quem está chegando e fortalecer amizades.", published: true, createdAt: "2026-09-22T12:00:00.000Z" },
  ],
  settings: {
    churchName: "Igreja Central",
    adminName: "Rafael",
    whatsapp: "5521999999999",
    radioUrl: "",
    address: "Rio de Janeiro, RJ",
    memberWelcome: "Que bom ter você por aqui. Veja o que está acontecendo na nossa comunidade.",
  },
};

function cloneInitial(): ChurchData {
  return JSON.parse(JSON.stringify(initialData));
}

function normalize(data: Partial<ChurchData>): ChurchData {
  const initial = cloneInitial();
  return {
    members: Array.isArray(data.members) ? data.members : initial.members,
    visitors: Array.isArray(data.visitors) ? data.visitors : initial.visitors,
    events: Array.isArray(data.events) ? data.events : initial.events,
    news: Array.isArray(data.news) ? data.news : initial.news,
    settings: { ...initial.settings, ...(data.settings || {}) },
  };
}

export function loadChurchData(): ChurchData {
  if (typeof window === "undefined") return cloneInitial();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const data = cloneInitial();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  try {
    return normalize(JSON.parse(raw) as Partial<ChurchData>);
  } catch {
    return cloneInitial();
  }
}

export function saveChurchData(data: ChurchData) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("church-data-change"));
  }
}

export function resetChurchData() {
  const data = cloneInitial();
  saveChurchData(data);
  return data;
}

export function generateId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function exportChurchData(data: ChurchData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `backup-comunidade-${new Date().toISOString().slice(0,10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importChurchData(file: File) {
  const text = await file.text();
  const parsed = JSON.parse(text) as Partial<ChurchData>;
  if (!parsed || typeof parsed !== "object") throw new Error("Arquivo inválido");
  const normalized = normalize(parsed);
  saveChurchData(normalized);
  return normalized;
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}
