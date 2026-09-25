import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MessageCircleMore,
  Radio,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Brand } from "@/components/brand";

const benefits = [
  { icon: UsersRound, title: "Pessoas no centro", text: "Membros e visitantes organizados com histórico, integração e cuidado pastoral." },
  { icon: MessageCircleMore, title: "Relacionamento contínuo", text: "Acompanhe novos visitantes e crie jornadas de acolhimento que não se perdem." },
  { icon: CalendarDays, title: "Vida da igreja", text: "Eventos, avisos, notícias e próximos encontros em um único lugar." },
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <nav className="site-nav container">
          <Brand />
          <div className="nav-links">
            <a href="#produto">Produto</a>
            <a href="#membro">Para membros</a>
            <a href="#gestao">Gestão</a>
          </div>
          <div className="nav-actions">
            <Link href="/membros" className="btn btn-ghost">Ver área do membro</Link>
            <Link href="/admin" className="btn btn-dark">Abrir demonstração <ArrowRight size={16} /></Link>
          </div>
        </nav>

        <div className="hero container">
          <div className="eyebrow"><Sparkles size={15} /> Uma nova forma de viver a comunidade</div>
          <h1>Gestão para líderes.<br/><span>Conexão para pessoas.</span></h1>
          <p className="hero-copy">
            Uma plataforma que ajuda a igreja a cuidar de quem chega, organizar quem serve
            e manter cada membro conectado ao que está acontecendo.
          </p>
          <div className="hero-actions">
            <Link href="/admin" className="btn btn-primary">Explorar o painel <ArrowRight size={17} /></Link>
            <Link href="/membros" className="btn btn-light">Conhecer a experiência do membro</Link>
          </div>
          <div className="trust-row">
            <span><CheckCircle2 size={16}/> Sem foco em burocracia financeira</span>
            <span><CheckCircle2 size={16}/> Experiência personalizável</span>
            <span><CheckCircle2 size={16}/> Feito para relacionamento</span>
          </div>

          <div className="hero-product">
            <div className="product-glow" />
            <div className="browser">
              <div className="browser-top"><i/><i/><i/><span>app.comunidade.church</span></div>
              <div className="browser-body">
                <aside className="mini-sidebar">
                  <Brand />
                  <div className="mini-menu">
                    <b>Visão geral</b><span>Pessoas</span><span>Visitantes</span><span>Comunicação</span><span>Eventos</span>
                  </div>
                </aside>
                <div className="mini-dashboard">
                  <div className="mini-welcome">
                    <div><small>SEXTA-FEIRA, 25 DE SETEMBRO</small><h3>Bom dia, Pr. Rafael 👋</h3><p>Veja o que merece sua atenção hoje.</p></div>
                    <button>+ Novo visitante</button>
                  </div>
                  <div className="mini-kpis">
                    <div><small>Pessoas conectadas</small><strong>486</strong><em>+18 este mês</em></div>
                    <div><small>Novos visitantes</small><strong>24</strong><em>7 aguardam contato</em></div>
                    <div><small>Próximos eventos</small><strong>06</strong><em>124 confirmações</em></div>
                  </div>
                  <div className="mini-content">
                    <div className="mini-card"><h4>Jornada de acolhimento</h4><p>Visitantes que precisam de atenção</p><div className="person"><span>AM</span><div><b>Ana Martins</b><small>Visitou há 2 dias</small></div><button>Conversar</button></div><div className="person"><span>JS</span><div><b>João Souza</b><small>Visitou no domingo</small></div><button>Conversar</button></div></div>
                    <div className="mini-card"><h4>Próximo encontro</h4><div className="event-art"><span>DOM<br/><b>27</b></span><div><b>Culto de Celebração</b><small>19:00 · Templo principal</small></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="produto" className="section container">
        <div className="section-heading">
          <div className="eyebrow neutral">O produto</div>
          <h2>Não é só um sistema.<br/>É a ponte entre <span>liderança e comunidade.</span></h2>
          <p>O administrativo continua poderoso, mas o diferencial está no que o membro percebe no dia a dia.</p>
        </div>
        <div className="feature-grid">
          {benefits.map(({icon: Icon, title, text}) => (
            <article className="feature-card" key={title}>
              <div className="icon-box"><Icon size={23}/></div>
              <h3>{title}</h3><p>{text}</p><a href="#">Entender melhor <ArrowRight size={15}/></a>
            </article>
          ))}
        </div>
      </section>

      <section id="membro" className="member-section">
        <div className="container member-grid">
          <div className="member-copy">
            <div className="eyebrow light">Experiência do membro</div>
            <h2>A igreja continua presente durante a semana.</h2>
            <p>O membro abre a plataforma e encontra exatamente aquilo que importa: comunidade, próximos encontros, notícias e conteúdo.</p>
            <div className="member-list">
              <span><Radio size={19}/> Rádio e transmissões da igreja</span>
              <span><CalendarDays size={19}/> Agenda e confirmação em eventos</span>
              <span><HeartHandshake size={19}/> Notícias, avisos e oportunidades de servir</span>
              <span><ShieldCheck size={19}/> Ambiente privado e controlado pela igreja</span>
            </div>
            <Link href="/membros" className="btn btn-white">Abrir experiência do membro <ArrowRight size={17}/></Link>
          </div>
          <div className="phone-wrap">
            <div className="phone">
              <div className="phone-top"><span>9:41</span><b>● ● ●</b></div>
              <div className="phone-head"><small>Bom dia, Mariana</small><strong>Que bom ter você aqui ✨</strong></div>
              <div className="story"><div><span>DOMINGO<br/><b>27</b></span><strong>Culto de Celebração</strong><small>19:00 · Igreja Central</small><button>Confirmar presença</button></div></div>
              <div className="phone-section"><b>Acontecendo na comunidade</b><a>Ver tudo</a></div>
              <div className="news-card"><div className="news-img">COMUNIDADE</div><small>NOTÍCIA</small><strong>Uma semana inteira para servir nossa cidade</strong><p>Participe da nossa ação comunitária.</p></div>
              <div className="phone-nav"><span>⌂<small>Início</small></span><span>◫<small>Eventos</small></span><span>◉<small>Rádio</small></span><span>♙<small>Perfil</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="gestao" className="section container final-cta">
        <div>
          <div className="eyebrow neutral">Feito para crescer junto</div>
          <h2>Comece simples.<br/>Torne-se indispensável.</h2>
          <p>A base já nasce preparada para evoluir para múltiplas igrejas, personalização por organização e automações.</p>
        </div>
        <Link href="/admin" className="btn btn-primary">Ver demonstração completa <ArrowRight size={17}/></Link>
      </section>
    </main>
  );
}