import Link from "next/link";
import { Cross } from "lucide-react";

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className={`brand ${dark ? "brand-dark" : ""}`}>
      <span className="brand-mark"><Cross size={18} strokeWidth={2.6} /></span>
      <span>Comunidade</span>
    </Link>
  );
}