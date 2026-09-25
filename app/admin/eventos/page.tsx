"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Plus, Trash2, X } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";
import { ChurchEvent, generateId } from "@/lib/local-data";

export default function EventsPage() {
  const { data, update } = useChurchData();
  const [open,setOpen] = useState(false);
  const [editing,setEditing] = useState<ChurchEvent|null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title:String(fd.get("title")||"").trim(), date:String(fd.get("date")||""),
      time:String(fd.get("time")||""), location:String(fd.get("location")||"").trim(),
      description:String(fd.get("description")||"").trim(), published:fd.get("published")==="on"
    };
    if(!payload.title||!payload.date) return;
    update(c=>({...c,events: editing ? c.events.map(x=>x.id===editing.id?{...x,...payload}:x) : [...c.events,{id:generateId("event"),...payload}]}));
    setEditing(null);setOpen(false);
  }

  return <>
    <header className="app-top"><div><b>Eventos</b><small> Agenda da comunidade</small></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setOpen(true)}}><Plus size={16}/> Novo evento</button></header>
    <div className="dashboard"><div className="page-title"><div><h1>Eventos</h1><p>O que estiver publicado aparece automaticamente na área do membro.</p></div></div>
      <div className="cards-list">
        {(data?.events||[]).sort((a,b)=>a.date.localeCompare(b.date)).map(event=><article className="management-card" key={event.id}>
          <div className="date-block"><b>{new Date(event.date+"T12:00:00").getDate().toString().padStart(2,"0")}</b><small>{new Date(event.date+"T12:00:00").toLocaleDateString("pt-BR",{month:"short"}).replace(".","").toUpperCase()}</small></div>
          <div className="management-main"><div><h3>{event.title}</h3><p>{event.time} · {event.location}</p></div><small>{event.description}</small></div>
          <span className={event.published?"publish-pill on":"publish-pill"}>{event.published?"Publicado":"Rascunho"}</span>
          <button className="small-action" onClick={()=>{setEditing(event);setOpen(true)}}>Editar</button>
          <button className="icon-danger" onClick={()=>confirm("Excluir evento?")&&update(c=>({...c,events:c.events.filter(x=>x.id!==event.id)}))}><Trash2 size={15}/></button>
        </article>)}
      </div>
    </div>
    {open&&<div className="modal-backdrop" onMouseDown={()=>setOpen(false)}><div className="modal-card" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{editing?"Editar evento":"Novo evento"}</h2><p>Publique na agenda dos membros.</p></div><button onClick={()=>setOpen(false)}><X/></button></div>
      <form className="product-form" onSubmit={submit}><label>Título<input name="title" defaultValue={editing?.title} required/></label><div className="form-grid"><label>Data<input type="date" name="date" defaultValue={editing?.date} required/></label><label>Horário<input type="time" name="time" defaultValue={editing?.time}/></label></div><label>Local<input name="location" defaultValue={editing?.location}/></label><label>Descrição<textarea rows={4} name="description" defaultValue={editing?.description}/></label><label className="check-row"><input type="checkbox" name="published" defaultChecked={editing?.published??true}/> Publicar para os membros</label><div className="form-actions"><button type="button" className="btn btn-light" onClick={()=>setOpen(false)}>Cancelar</button><button className="btn btn-primary">Salvar evento</button></div></form>
    </div></div>}
  </>;
}
