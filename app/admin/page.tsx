"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, MessageSquareText, Newspaper, Sparkles, UserPlus, UsersRound } from "lucide-react";
import { useChurchData } from "@/hooks/use-church-data";

const statusLabel = { novo: "Novo", contatado: "Contatado", integracao: "Integração", conectado: "Conectado" };

export default function AdminPage() {
  const { data } = useChurchData();
  const visitors = data?.visitors ?? [];
  const events = [...(data?.events ?? [])].sort((a,b)=>a.date.localeCompare(b.date));
  const news = data?.news ?? [];
  const newVisitors = visitors.filter(v=>v.status==="novo").length;
  const connected = visitors.filter(v=>v.status==="conectado").length;

  return <>
    <header className="app-top">
      <div><b>Visão geral</b><small> Central de operação da comunidade</small></div>
      <Link href="/membros" className="member-preview">Ver área do membro</Link>
    </header>

    <div className="dashboard">
      <div className="dashboard-head">
        <div>
          <small>PAINEL DA COMUNIDADE</small>
          <h1>Bom dia, {data?.settings.adminName || "Administrador"} 👋</h1>
          <p>Veja o que precisa da sua atenção e mantenha a comunidade atualizada.</p>
        </div>
        <Link href="/admin/visitantes" className="btn btn-primary"><UserPlus size={17}/> Adicionar visitante</Link>
      </div>

      <div className="stats-grid">
        <article><div className="stat-icon"><UsersRound size={20}/></div><small>Visitantes registrados</small><strong>{visitors.length}</strong><p>{connected} já marcados como conectados</p></article>
        <article><div className="stat-icon"><UserPlus size={20}/></div><small>Aguardando contato</small><strong>{newVisitors}</strong><p>{newVisitors ? "Priorize um primeiro contato" : "Tudo acompanhado por aqui"}</p></article>
        <article><div className="stat-icon"><CalendarDays size={20}/></div><small>Eventos publicados</small><strong>{events.filter(e=>e.published).length}</strong><p>{events.length} eventos cadastrados</p></article>
        <article><div className="stat-icon"><Newspaper size={20}/></div><small>Notícias publicadas</small><strong>{news.filter(n=>n.published).length}</strong><p>{news.length} conteúdos cadastrados</p></article>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-title">
            <div><h3>Jornada de acolhimento</h3><p>Pessoas que merecem atenção agora</p></div>
            <Link href="/admin/visitantes">Ver todos <ChevronRight size={15}/></Link>
          </div>
          <div className="people-table">
            {visitors.slice(0,5).map((v,i)=><div className="person-row" key={v.id}>
              <span className="avatar">{v.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</span>
              <div className="person-name"><b>{v.name}</b><small>{v.phone || v.email || "Sem contato informado"}</small></div>
              <span className={"status s"+Math.min(i,3)}>{statusLabel[v.status]}</span>
              <Link href="/admin/visitantes" className="small-action">Abrir</Link>
            </div>)}
            {!visitors.length && <div className="empty-state compact"><UserPlus/><p>Cadastre seu primeiro visitante.</p></div>}
          </div>
        </article>

        <article className="panel events-panel">
          <div className="panel-title"><div><h3>Próximos eventos</h3><p>Agenda da comunidade</p></div><Link href="/admin/eventos">Ver agenda</Link></div>
          {events.filter(e=>e.published).slice(0,3).map(e=>{
            const date=new Date(e.date+"T12:00:00");
            return <div className="event-row" key={e.id}><span><b>{String(date.getDate()).padStart(2,"0")}</b><small>{date.toLocaleDateString("pt-BR",{month:"short"}).replace(".","").toUpperCase()}</small></span><div><b>{e.title}</b><small>{e.time || "Sem horário"} · {e.location || "Local a definir"}</small></div><ChevronRight size={17}/></div>
          })}
          <Link href="/admin/eventos" className="outline-action"><CalendarDays size={17}/> Gerenciar eventos</Link>
        </article>
      </div>

      <article className="insight">
        <span className="insight-icon"><Sparkles size={20}/></span>
        <div><b>Próxima ação sugerida</b><p>{newVisitors ? `Você tem ${newVisitors} visitante(s) ainda marcado(s) como novo. Faça o primeiro contato e atualize a jornada.` : "Os visitantes estão acompanhados. Aproveite para revisar eventos e notícias da semana."}</p></div>
        <Link href={newVisitors?"/admin/visitantes":"/admin/noticias"}>{newVisitors?"Ver visitantes":"Ver notícias"} <ChevronRight size={15}/></Link>
      </article>

      <div className="quick-actions">
        <Link href="/admin/visitantes"><UserPlus/><div><b>Novo visitante</b><small>Iniciar acompanhamento</small></div></Link>
        <Link href="/admin/eventos"><CalendarDays/><div><b>Gerenciar eventos</b><small>Atualizar agenda</small></div></Link>
        <Link href="/admin/noticias"><MessageSquareText/><div><b>Publicar notícia</b><small>Falar com a comunidade</small></div></Link>
      </div>
    </div>
  </>;
}
