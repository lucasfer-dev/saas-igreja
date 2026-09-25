"use client";

import { FormEvent, useMemo, useState } from "react";
import { Search, Trash2, UserPlus, X } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";
import { generateId, VisitorStatus } from "@/lib/local-data";

const labels: Record<VisitorStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  integracao: "Integração",
  conectado: "Conectado",
};

export default function VisitorsPage() {
  const { data, update } = useChurchData();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const visitors = useMemo(() => {
    const all = data?.visitors ?? [];
    const q = query.toLowerCase().trim();
    return q ? all.filter(v => [v.name, v.phone, v.email].join(" ").toLowerCase().includes(q)) : all;
  }, [data, query]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const visitor = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      status: String(fd.get("status") || "novo") as VisitorStatus,
      notes: String(fd.get("notes") || "").trim(),
    };
    if (!visitor.name) return;

    update(current => ({
      ...current,
      visitors: editingId
        ? current.visitors.map(v => v.id === editingId ? { ...v, ...visitor } : v)
        : [{ id: generateId("visitor"), createdAt: new Date().toISOString(), ...visitor }, ...current.visitors],
    }));
    setEditingId(null); setOpen(false);
  }

  const editing = data?.visitors.find(v => v.id === editingId);

  return <>
    <header className="app-top"><div><b>Visitantes</b><small> Acompanhe quem está chegando</small></div><button className="btn btn-primary" onClick={() => {setEditingId(null);setOpen(true)}}><UserPlus size={16}/> Novo visitante</button></header>
    <div className="dashboard">
      <div className="page-title"><div><h1>Jornada de acolhimento</h1><p>Registre contatos e acompanhe cada pessoa até a integração.</p></div></div>
      <div className="toolbar"><div className="search-field"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nome, telefone ou e-mail"/></div><span>{visitors.length} registros</span></div>
      <div className="data-card">
        {visitors.length === 0 ? <div className="empty-state"><UserPlus/><h3>Nenhum visitante encontrado</h3><p>Cadastre a primeira pessoa para iniciar o acompanhamento.</p></div> :
          visitors.map(v => <div className="data-row" key={v.id}>
            <span className="avatar">{v.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
            <div className="data-main"><b>{v.name}</b><small>{v.phone || "Sem telefone"} {v.email ? "· "+v.email : ""}</small></div>
            <select value={v.status} onChange={e=>update(c=>({...c,visitors:c.visitors.map(x=>x.id===v.id?{...x,status:e.target.value as VisitorStatus}:x)}))}>
              {Object.entries(labels).map(([value,label])=><option value={value} key={value}>{label}</option>)}
            </select>
            <button className="small-action" onClick={()=>{setEditingId(v.id);setOpen(true)}}>Editar</button>
            <button className="icon-danger" aria-label="Excluir" onClick={()=>confirm("Excluir este visitante?")&&update(c=>({...c,visitors:c.visitors.filter(x=>x.id!==v.id)}))}><Trash2 size={15}/></button>
          </div>)}
      </div>
    </div>

    {open && <div className="modal-backdrop" onMouseDown={()=>setOpen(false)}><div className="modal-card" onMouseDown={e=>e.stopPropagation()}>
      <div className="modal-head"><div><h2>{editing ? "Editar visitante" : "Novo visitante"}</h2><p>Informações para acompanhamento da equipe.</p></div><button onClick={()=>setOpen(false)}><X/></button></div>
      <form className="product-form" onSubmit={submit}>
        <label>Nome completo<input name="name" defaultValue={editing?.name} required/></label>
        <div className="form-grid"><label>WhatsApp<input name="phone" defaultValue={editing?.phone} placeholder="(21) 99999-9999"/></label><label>E-mail<input type="email" name="email" defaultValue={editing?.email}/></label></div>
        <label>Status<select name="status" defaultValue={editing?.status || "novo"}>{Object.entries(labels).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>
        <label>Observações<textarea name="notes" rows={4} defaultValue={editing?.notes}/></label>
        <div className="form-actions"><button type="button" className="btn btn-light" onClick={()=>setOpen(false)}>Cancelar</button><button className="btn btn-primary">Salvar visitante</button></div>
      </form>
    </div></div>}
  </>;
}
