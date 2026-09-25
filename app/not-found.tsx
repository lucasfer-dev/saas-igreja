import Link from "next/link";

export default function NotFound(){return <main className="system-page"><div><span>404</span><h1>Página não encontrada</h1><p>Esse caminho não existe ou foi movido.</p><Link className="btn btn-primary" href="/">Voltar ao início</Link></div></main>}
