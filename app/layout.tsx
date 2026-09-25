import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comunidade | Gestão e conexão para igrejas",
  description: "Uma plataforma para organizar a igreja e aproximar pessoas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}