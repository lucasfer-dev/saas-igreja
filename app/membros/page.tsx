import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, ChevronRight, Heart, Home, MessageCircle, Radio, UserRound } from "lucide-react";
import { Brand } from "@/components/brand";

export default function MembersPage() {
  return (
    <main className="member-app">
      <header className="member-topbar container">
        <Brand />
        <div className="member-desktop-nav"><a className="active">Início</a><a>Eventos</a><a>Comunidade</a><a>Conteúdos</a></div>
        <div className="member-profile"><button><Bell size={18}/><i/></button><span>MM</span><div><b>Mariana</b><small>Membro</small></div></div>
      </header>

      <section className="member-home container">
        <div className="member-greeting"><small>SEXTA-FEIRA, 25 DE SETEMBRO</small><h1>Bom dia, Mariana ✨</h1><p>Que bom ter você por aqui. Veja o que está acontecendo na nossa comunidade.</p></div>

        <div className="member-layout">
          <div className="member-feed">
            <article className="featured-event">
              <div className="featured-overlay"><span className="event-pill">PRÓXIMO ENCONTRO</span><h2>Culto de<br/>Celebração</h2><p>Domingo, 27 de setembro · 19:00</p><div><button>Confirmar presença <ArrowRight size={16}/></button><span>+ 84 pessoas confirmaram</span></div></div>
              <div className="featured-symbol">✦</div>
            </article>

            <div className="feed-heading"><div><h3>Acontecendo na comunidade</h3><p>Notícias e histórias para você</p></div><a>Ver tudo</a></div>
            <div className="news-grid">
              <article className="feed-card"><div className="feed-img one"><span>SERVIR<br/><b>TRANSFORMA</b></span></div><small>COMUNIDADE</small><h3>Uma semana inteira para servir nossa cidade</h3><p>Veja como participar da próxima ação social.</p><a>Ler notícia <ChevronRight size={14}/></a></article>
              <article className="feed-card"><div className="feed-img two"><span>JOVENS<br/><b>EM MOVIMENTO</b></span></div><small>JUVENTUDE</small><h3>Uma noite feita para novas conexões</h3><p>Convide alguém para estar com a gente.</p><a>Ver evento <ChevronRight size={14}/></a></article>
            </div>
          </div>

          <aside className="member-side">
            <article className="radio-card"><div className="radio-orbit"><Radio size={28}/></div><small>RÁDIO DA IGREJA</small><h3>Comunidade FM</h3><p>Louvor, mensagens e conteúdo durante toda a semana.</p><button><span>▶</span> Ouvir agora</button></article>
            <article className="side-card"><div className="panel-title"><div><h3>Seus próximos eventos</h3></div><a>Agenda</a></div>
              <div className="member-event"><span><b>02</b><small>OUT</small></span><div><b>Noite de Jovens</b><small>20:00 · Auditório</small></div></div>
              <div className="member-event"><span><b>04</b><small>OUT</small></span><div><b>Café com Famílias</b><small>09:30 · Salão social</small></div></div>
            </article>
            <article className="invite-card"><Heart size={19}/><div><b>Tem alguém no coração?</b><p>Envie um convite para o próximo encontro.</p></div><button><MessageCircle size={16}/> Convidar pelo WhatsApp</button></article>
          </aside>
        </div>
      </section>

      <nav className="mobile-tabbar"><a className="active"><Home size={19}/><small>Início</small></a><a><CalendarDays size={19}/><small>Eventos</small></a><a><Radio size={19}/><small>Rádio</small></a><a><UserRound size={19}/><small>Perfil</small></a></nav>
      <Link href="/admin" className="demo-float">← Voltar ao painel admin</Link>
    </main>
  );
}