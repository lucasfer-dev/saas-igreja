"use client";

export default function ErrorPage({reset}:{reset:()=>void}){return <main className="system-page"><div><span>Ops</span><h1>Algo não saiu como esperado</h1><p>Seus dados locais continuam no navegador. Tente carregar esta tela novamente.</p><button className="btn btn-primary" onClick={reset}>Tentar novamente</button></div></main>}
