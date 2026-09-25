"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays, CircleHelp, House, Newspaper, Settings, UserPlus, UsersRound
} from "lucide-react";
import { Brand } from "@/components/brand";
import { useChurchData } from "@/hooks/use-church-data";

const items = [
  { href: "/admin", label: "Visão geral", icon: House },
  { href: "/admin/visitantes", label: "Visitantes", icon: UserPlus },
  { href: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/admin/noticias", label: "Notícias", icon: Newspaper },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useChurchData();
  const churchName = data?.settings.churchName ?? "Igreja Central";
  const adminName = data?.settings.adminName ?? "Administrador";

  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <Brand dark />
        <div className="church-switch">
          <span>{churchName.split(" ").map(x => x[0]).slice(0,2).join("").toUpperCase()}</span>
          <div><b>{churchName}</b><small>Armazenamento local</small></div>
        </div>

        <nav className="app-menu">
          <small>PRINCIPAL</small>
          {items.map(({ href, label, icon: Icon }) => (
            <Link className={pathname === href ? "active" : ""} href={href} key={href}>
              <Icon size={18}/>{label}
            </Link>
          ))}
          <small>SUPORTE</small>
          <Link href="/membros"><UsersRound size={18}/>Área do membro</Link>
          <a href="mailto:suporte@exemplo.com"><CircleHelp size={18}/>Ajuda</a>
        </nav>

        <div className="sidebar-user">
          <span>{adminName.slice(0,2).toUpperCase()}</span>
          <div><b>{adminName}</b><small>Administrador local</small></div>
        </div>
      </aside>
      <section className="app-main">{children}</section>
    </main>
  );
}
