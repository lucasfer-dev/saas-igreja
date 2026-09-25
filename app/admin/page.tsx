import Link from "next/link";
import {
  Bell, CalendarDays, ChevronRight, CircleHelp, House, MessageSquareText,
  Search, Settings, Sparkles, UserPlus, UsersRound
} from "lucide-react";
import { Brand } from "@/components/brand";

const nav = [
  ["Visão geral", House], ["Pessoas", UsersRound], ["Visitantes", UserPlus],
  ["Comunicação", MessageSquareText], ["Eventos", CalendarDays],
];

export default function AdminPage() {
  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <Brand dark />
        <div className="church-switch"><span>IC</span><div><b>Igreja Central</b><small>Plano Comunidade</small></div><ChevronRight size={15}/></div>
        <nav className="app-menu">
          <small>PRINCIPAL</small>
          {nav.map(([label, Icon], i) => {
            const I = Icon as typeof House;
            return <a className={i===0 ? "active":""} key={label as string}><I size={18}/>{label as string}</a>
          })}
          <small>CONFIGURAÇÕES</small>
          <a><Settings size={18}/>Configurações</a><a><CircleHelp size={18}/>Ajuda</a>
        </nav>
        <div className="sidebar-user"><span>RS</span><div><b>Rafael Santos</b><small>Administrador</small></div></div>
      </aside>

      <section className="app-main">
        <header className="app-top">
          <div className="app-search"><Search size={17}/><span>Buscar pessoas, eventos...</span><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button><Bell size={18}/><i/></button><Link href="/membros" className="member-preview">Ver como membro</Link></div>
        </header>

        <div className="dashboard">
          <div className="dashboard-head">
            <div><small>SEXTA-FEIRA, 25 DE SETEMBRO</small><h1>Bom dia, Rafael 👋</h1><p>Aqui está o que está acontecendo na sua comunidade.</p></div>
            <button className="btn btn-primary"><UserPlus size={17}/> Adicionar visitante</button>
          </div>

          <div className="stats-grid">
            <article><div className="stat-icon"><UsersRound size={20}/></div><small>Pessoas conectadas</small><strong>486</strong><p><b>↑ 3,8%</b> nos últimos 30 dias</p></article>
            <article><div className="stat-icon"><UserPlus size={20}/></div><small>Novos visitantes</small><strong>24</strong><p><em>7</em> aguardando primeiro contato</p></article>
            <article><div className="stat-icon"><CalendarDays size={20}/></div><small>Próximos eventos</small><strong>06</strong><p>124 confirmações no total</p></article>
            <article><div className="stat-icon"><MessageSquareText size={20}/></div><small>Engajamento</small><strong>78%</strong><p><b>↑ 8%</b> este mês</p></article>
          </div>

          <div className="dashboard-grid">
            <article className="panel">
              <div className="panel-title"><div><h3>Jornada de acolhimento</h3><p>Pessoas que merecem atenção agora</p></div><a>Ver todos <ChevronRight size={15}/></a></div>
              <div className="people-table">
                {[
                  ["AM","Ana Martins","Visitou há 2 dias","Primeiro contato","Conversar"],
                  ["JS","João Souza","Visitou no domingo","Aguardando retorno","Relembrar"],
                  ["CL","Camila Lima","Visitou há 8 dias","Integração","Continuar"],
                  ["PR","Pedro Rocha","Visitou há 12 dias","Conectado","Ver perfil"]
                ].map((p,i)=><div className="person-row" key={p[1]}><span className="avatar">{p[0]}</span><div className="person-name"><b>{p[1]}</b><small>{p[2]}</small></div><span className={"status s"+i}>{p[3]}</span><button>{p[4]}</button></div>)}
              </div>
            </article>

            <article className="panel events-panel">
              <div className="panel-title"><div><h3>Próximos eventos</h3><p>Agenda da comunidade</p></div><a>Ver agenda</a></div>
              {[["27","SET","Culto de Celebração","19:00"],["02","OUT","Noite de Jovens","20:00"],["04","OUT","Café com Famílias","09:30"]].map(e=>
                <div className="event-row" key={e[0]}><span><b>{e[0]}</b><small>{e[1]}</small></span><div><b>{e[2]}</b><small>{e[3]} · Templo principal</small></div><ChevronRight size={17}/></div>
              )}
              <button className="outline-action"><CalendarDays size={17}/> Criar novo evento</button>
            </article>
          </div>

          <article className="insight">
            <span className="insight-icon"><Sparkles size={20}/></span>
            <div><b>Insight da semana</b><p>7 visitantes ainda não receberam um primeiro contato. Uma mensagem pessoal nas primeiras 48h pode aumentar a chance de retorno.</p></div>
            <button>Ver visitantes <ChevronRight size={15}/></button>
          </article>
        </div>
      </section>
    </main>
  );
}