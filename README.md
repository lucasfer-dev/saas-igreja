# Comunidade — plataforma local para igrejas

Aplicação em Next.js focada em **gestão, relacionamento e experiência do membro**.

Esta versão funciona **sem banco de dados e sem backend**. Os dados são persistidos no `localStorage` do navegador, o que torna o produto útil para demonstrações, validação comercial e operação local em um único computador/navegador.

## O que já funciona

- dashboard administrativo com indicadores dinâmicos;
- CRUD de membros;
- CRUD de visitantes;
- jornada de acolhimento com status;
- abertura de follow-up no WhatsApp;
- CRUD de eventos;
- publicação/rascunho de eventos;
- CRUD de notícias;
- publicação/rascunho de notícias;
- área do membro alimentada pelos mesmos eventos e notícias;
- rádio/link externo configurável;
- convite de evento por WhatsApp;
- personalização de nome da igreja, administrador, endereço e mensagem;
- backup dos dados em JSON;
- restauração de backup JSON;
- restauração dos dados de demonstração;
- layout responsivo para desktop e celular.

## Rotas

- `/` — apresentação do produto
- `/admin` — visão geral
- `/admin/membros` — gestão de membros
- `/admin/visitantes` — visitantes e acompanhamento
- `/admin/eventos` — agenda
- `/admin/noticias` — comunicação
- `/admin/configuracoes` — identidade, canais e backups
- `/membros` — experiência do membro

## Rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para validar a versão de produção:

```bash
npm run typecheck
npm run build
```

## Limitação intencional desta versão

Como não há servidor, autenticação nem banco:

- os dados não sincronizam entre dispositivos;
- limpar o armazenamento do navegador remove os dados locais;
- não existe isolamento real entre igrejas/usuários;
- não existe login seguro;
- não é apropriado armazenar informações sensíveis.

Use **Configurações → Baixar backup JSON** regularmente.

Quando houver necessidade de múltiplos usuários, dispositivos ou clientes, a camada de persistência local pode ser substituída por um backend sem refazer a experiência visual.
