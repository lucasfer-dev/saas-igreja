"use client";

import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, Search, Trash2, UserRoundPlus, X } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";
import { generateId, Member, MemberStatus, normalizePhone } from "@/lib/local-data";

export default function MembersAdminPage(){
  const {data,update}=useChurchData();
  const [query,setQuery]=useState("");
  const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<Member|null>(null);

  const members=useMemo(()=>{
    const all=data?.members??[];
    const q=query.trim().toLowerCase();
    return q?all.filter(m=>[m.name,m.phone,m.email,m.ministry].join(" ").toLowerCase().includes(q)):all;
  },[data,query]);

  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const fd=new FormData(e.currentTarget);
    const payload={name:String(fd.get("name")||"").trim(),phone:String(fd.get("phone")||"").trim(),email:String(fd.get("email")||"").trim(),ministry:String(fd.get("ministry")||"").trim(),status:String(fd.get("status")||"ativo") as MemberStatus,since:String(fd.get("since")||"")};
    if(!payload.name)return;
    update(c=>({...c,members:editing?c.members.map(m=>m.id===editing.id?{...m,...payload}:m):[{id:generateId("member"),...payload},...c.members]}));
    setEditing(null);setOpen(false);
  }

  function whatsapp(member:Member){
    const phone=normalizePhone(member.phone);
    if(!phone)return alert("Este membro não possui telefone.");
    window.open(`https://wa.me/${phone}`,"_blank","noopener,noreferrer");
  }

  return <>
    <header className="app-top"><div><b>Membros</b><small> Pessoas da comunidade</small></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setOpen(true)}}><UserRoundPlus size={16}/> Novo membro</button></header>
    <div className="dashboard">
      <div className="page-title"><div><h1>Membros</h1><p>Organize contatos, ministérios e situação de cada pessoa.</p></div></div>
      <div className="toolbar"><div className="search-field"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar nome, ministério, telefone ou e-mail"/></div><span>{members.length} membros</span></div>
      <div className="data-card">
        {members.map(m=><div className="data-row member-data-row" key={m.id}>
          <span className="avatar">{m.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
          <div className="data-main"><b>{m.name}</b><small>{m.ministry||"Sem ministério"} · {m.phone||m.email||"Sem contato"}</small></div>
          <span className={m.status==="ativo"?"publish-pill on":"publish-pill"}>{m.status==="ativo"?"Ativo":"Inativo"}</span>
          <button className="icon-neutral" onClick={()=>whatsapp(m)} aria-label="Abrir WhatsApp"><MessageCircle size={15}/></button>
          <button className="small-action" onClick={()=>{setEditing(m);setOpen(true)}}>Editar</button>
          <button className="icon-danger" onClick={()=>confirm("Excluir membro?")&&update(c=>({...c,members:c.members.filter(x=>x.id!==m.id)}))}><Trash2 size={15}/></button>
        </div>)}
        {!members.length&&<div className="empty-state"><UserRoundPlus/><h3>Nenhum membro encontrado</h3><p>Cadastre a primeira pessoa da comunidade.</p></div>}
      </div>
    </div>

    {open&&<div className="modal-backdrop" onMouseDown={()=>setOpen(false)}><div className="modal-card" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{editing?"Editar membro":"Novo membro"}</h2><p>Cadastro interno da comunidade.</p></div><button onClick={()=>setOpen(false)}><X/></button></div>
      <form className="product-form" onSubmit={submit}><label>Nome completo<input name="name" defaultValue={editing?.name} required/></label><div className="form-grid"><label>WhatsApp<input name="phone" defaultValue={editing?.phone}/></label><label>E-mail<input type="email" name="email" defaultValue={editing?.email}/></label></div><div className="form-grid"><label>Ministério / equipe<input name="ministry" defaultValue={editing?.ministry}/></label><label>Membro desde<input type="date" name="since" defaultValue={editing?.since}/></label></div><label>Status<select name="status" defaultValue={editing?.status||"ativo"}><option value="ativo">Ativo</option><option value="inativo">Inativo</option></select></label><div className="form-actions"><button type="button" className="btn btn-light" onClick={()=>setOpen(false)}>Cancelar</button><button className="btn btn-primary">Salvar membro</button></div></form>
    </div></div>}
  </>;
}
