"use client";

import { FormEvent, useState } from "react";
import { Newspaper, Plus, Trash2, X } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";
import { generateId, NewsItem } from "@/lib/local-data";

export default function NewsPage() {
  const {data,update}=useChurchData();
  const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<NewsItem|null>(null);

  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const fd=new FormData(e.currentTarget);
    const payload={title:String(fd.get("title")||"").trim(),category:String(fd.get("category")||"Comunidade").trim(),excerpt:String(fd.get("excerpt")||"").trim(),content:String(fd.get("content")||"").trim(),published:fd.get("published")==="on"};
    if(!payload.title)return;
    update(c=>({...c,news:editing?c.news.map(x=>x.id===editing.id?{...x,...payload}:x):[{id:generateId("news"),createdAt:new Date().toISOString(),...payload},...c.news]}));
    setEditing(null);setOpen(false);
  }

  return <>
    <header className="app-top"><div><b>Notícias</b><small> Conteúdo da área do membro</small></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setOpen(true)}}><Plus size={16}/> Nova notícia</button></header>
    <div className="dashboard"><div className="page-title"><div><h1>Comunicação</h1><p>Crie avisos e histórias que aparecem na experiência do membro.</p></div></div>
      <div className="news-admin-grid">{(data?.news||[]).map(item=><article className="news-admin-card" key={item.id}><div className="news-admin-art"><Newspaper size={24}/><span>{item.category}</span></div><div><span className={item.published?"publish-pill on":"publish-pill"}>{item.published?"Publicado":"Rascunho"}</span><h3>{item.title}</h3><p>{item.excerpt}</p><div className="card-actions"><button className="small-action" onClick={()=>{setEditing(item);setOpen(true)}}>Editar</button><button className="icon-danger" onClick={()=>confirm("Excluir notícia?")&&update(c=>({...c,news:c.news.filter(x=>x.id!==item.id)}))}><Trash2 size={15}/></button></div></div></article>)}</div>
    </div>
    {open&&<div className="modal-backdrop" onMouseDown={()=>setOpen(false)}><div className="modal-card" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{editing?"Editar notícia":"Nova notícia"}</h2><p>Conteúdo publicado para a comunidade.</p></div><button onClick={()=>setOpen(false)}><X/></button></div>
      <form className="product-form" onSubmit={submit}><label>Título<input name="title" defaultValue={editing?.title} required/></label><label>Categoria<input name="category" defaultValue={editing?.category||"Comunidade"}/></label><label>Resumo<input name="excerpt" defaultValue={editing?.excerpt}/></label><label>Conteúdo<textarea rows={7} name="content" defaultValue={editing?.content}/></label><label className="check-row"><input type="checkbox" name="published" defaultChecked={editing?.published??true}/> Publicar para os membros</label><div className="form-actions"><button type="button" className="btn btn-light" onClick={()=>setOpen(false)}>Cancelar</button><button className="btn btn-primary">Salvar notícia</button></div></form>
    </div></div>}
  </>;
}
