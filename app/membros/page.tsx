"use client";

import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, ChevronRight, Heart, Home, MessageCircle, Radio, UserRound } from "lucide-react";
import { Brand } from "@/components/brand";
import { useChurchData } from "@/hooks/use-church-data";

export default function MembersPage() {
  const { data } = useChurchData();
  const events = [...(data?.events ?? [])].filter(e=>e.published).sort((a,b)=>a.date.localeCompare(b.date));
  const news = (data?.news ?? []).filter(n=>n.published);
  const settings = data?.settings;
  const featured = events[0];

  const invite = () => {
    const text = featured
      ? `Quero te convidar para ${featured.title}, dia ${new Date(featured.date+"T12:00:00").toLocaleDateString("pt-BR")} às ${featured.time}. Vamos juntos?`
      : "Quero te convidar para estar com a gente na igreja!";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const playRadio = () => {
    if(settings?.radioUrl) window.open(settings.radioUrl, "_blank", "noopener,noreferrer");
    else alert("A igreja ainda não configurou o link da rádio.");
  };

  return (
    <main className="member-app">
      <header className="member-topbar container">
        <Brand />
        <div className="member-desktop-nav"><a className="active">Início</a><a href="#eventos">Eventos</a><a href="#noticias">Comunidade</a><a href="#radio">Rádio</a></div>
        <div className="member-profile"><button><Bell size={18}/><i/></button><span>MM</span><div><b>Mariana</b><small>Membro</small></div></div>
      </header>

      <section className="member-home container">
        <div className="member-greeting"><small>{settings?.churchName?.toUpperCase() || "NOSSA COMUNIDADE"}</small><h1>Bom dia, Mariana ✨</h1><p>{settings?.memberWelcome || "Que bom ter você por aqui."}</p></div>

        <div className="member-layout">
          <div className="member-feed">
            <article className="featured-event">
              <div className="featured-overlay">
                <span className="event-pill">{featured ? "PRÓXIMO ENCONTRO" : "AGENDA"}</span>
                <h2>{featured?.title || "Novos encontros em breve"}</h2>
                <p>{featured ? `${new Date(featured.date+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long"})} · ${featured.time} · ${featured.location}` : "Acompanhe aqui os próximos eventos da comunidade."}</p>
                {featured && <div><button onClick={()=>alert("Presença confirmada neste dispositivo.")}>Confirmar presença <ArrowRight size={16}/></button><span>{featured.description}</span></div>}
              </div>
              <div className="featured-symbol">✦</div>
            </article>

            <div className="feed-heading" id="noticias"><div><h3>Acontecendo na comunidade</h3><p>Notícias e histórias para você</p></div><span>{news.length} publicações</span></div>
            <div className="news-grid">
              {news.map((item,i)=><article className="feed-card" key={item.id}>
                <div className={"feed-img "+(i%2===0?"one":"two")}><span>{item.category.toUpperCase()}<br/><b>{settings?.churchName || "COMUNIDADE"}</b></span></div>
                <small>{item.category.toUpperCase()}</small><h3>{item.title}</h3><p>{item.excerpt}</p><details><summary>Ler notícia <ChevronRight size={14}/></summary><p className="news-full">{item.content}</p></details>
              </article>)}
              {!news.length && <div className="empty-member">Nenhuma notícia publicada ainda.</div>}
            </div>
          </div>

          <aside className="member-side">
            <article className="radio-card" id="radio"><div className="radio-orbit"><Radio size={28}/></div><small>RÁDIO DA IGREJA</small><h3>{settings?.churchName || "Comunidade"}</h3><p>Louvor, mensagens e conteúdo durante toda a semana.</p><button onClick={playRadio}><span>▶</span> {settings?.radioUrl ? "Ouvir agora" : "Aguardando configuração"}</button></article>
            <article className="side-card" id="eventos"><div className="panel-title"><div><h3>Próximos eventos</h3></div><span>{events.length}</span></div>
              {events.slice(0,4).map(event=>{const date=new Date(event.date+"T12:00:00");return <div className="member-event" key={event.id}><span><b>{String(date.getDate()).padStart(2,"0")}</b><small>{date.toLocaleDateString("pt-BR",{month:"short"}).replace(".","").toUpperCase()}</small></span><div><b>{event.title}</b><small>{event.time} · {event.location}</small></div></div>})}
              {!events.length && <p className="muted-small">Nenhum evento publicado.</p>}
            </article>
            <article className="invite-card"><Heart size={19}/><div><b>Tem alguém no coração?</b><p>Envie um convite para o próximo encontro.</p></div><button onClick={invite}><MessageCircle size={16}/> Convidar pelo WhatsApp</button></article>
          </aside>
        </div>
      </section>

      <nav className="mobile-tabbar"><a className="active"><Home size={19}/><small>Início</small></a><a href="#eventos"><CalendarDays size={19}/><small>Eventos</small></a><a href="#radio"><Radio size={19}/><small>Rádio</small></a><a><UserRound size={19}/><small>Perfil</small></a></nav>
      <Link href="/admin" className="demo-float">← Voltar ao painel admin</Link>
    </main>
  );
}
