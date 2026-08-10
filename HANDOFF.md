# Mariana Masi Site — Handoff

> Documento único de retomada. Ao terminar um bloco de trabalho relevante, **atualize este arquivo** — ver protocolo de manutenção em `~/Desktop/Ecosystem/AGENTS.md`.

**Criado em:** 10/08/2026, sessão inicial de construção (Fase 1 completa, ainda não publicado).

## O que é e por quê existe

Site pessoal/profissional da **Mariana Masi** (psicóloga, neuropsicóloga) — propriedade separada do **Instituto Nexium**: a Mariana como pessoa/pesquisadora/comunicadora científica, não a clínica. Baseado num brief detalhado que o José trouxe (feito com o GPT), cujo princípio central é: "Mariana Masi primeiro, não uma clínica" — identidade acadêmica/editorial, atendimento clínico só referenciado, nunca o foco.

Antes desta sessão, "Mariana Masi Neuropsicologia" era tratada como projeto pessoal fora do Ecosystem (vivia só em `~/Desktop/Projetos`). O **site** passou a fazer parte do Ecosystem como 4ª unidade — o resto do acervo de marca física (contratos, adesivo, envelope, PSDs) continua em `~/Desktop/Projetos/Mariana Masi Neuropsicologia/`, que é de onde os assets de logo e fotos usados aqui foram copiados.

## Identidade e produção

- **Domínio alvo:** `marianamasi.com` — já é da família, hoje apontado pro Wix. **Ainda não migrado** — falta cortar o DNS pra Vercel (mesmo processo já feito com `institutonexium.com`).
- **Hospedagem:** vai pra mesma conta/organização Vercel dos outros projetos, como projeto próprio (não compartilha app nem domínio com Instituto Nexium Site).
- **Repositório:** local em `~/Desktop/Ecosystem/Mariana Masi Site`, `git init` feito nesta sessão. **Sem remoto no GitHub ainda** — José precisa criar o repo (`gh`/CLI não estava disponível nesta sessão) e configurar o remote.
- **Sem Supabase, sem backend** — conteúdo (artigos, pesquisa, publicações) como código em `src/content/*.ts`, editado via Claude Code e publicado por push. Mesmo padrão da Instituto Nexium Site.

## Arquitetura técnica

| Camada | Tecnologia |
| --- | --- |
| Frontend | Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4 |
| Rotas | App Router em `src/app/[locale]` — bilíngue |
| i18n | `next-intl` v4. `pt` é o locale padrão **sem prefixo** (`/about`), `en` usa prefixo (`/en/about`). Negociação automática por `Accept-Language` no primeiro acesso; depois fica salvo em cookie. Seletor "PT / EN" discreto no canto superior direito do Header. |
| Conteúdo | `src/content/*.ts` — tipado (`types.ts`), sem CMS visual |
| Analytics | `@vercel/analytics` (`<Analytics />` no layout raiz) |
| Proxy | `src/proxy.ts` (convenção nova do Next 16 — **não** `middleware.ts`, que está deprecated; ver `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` se for mexer nisso de novo) |

## Tipografia — quase resolvida, falta 1 passo do José

A logo usa **Avenir Next Ultra Light**. É fonte comercial da Monotype — não existe versão gratuita legítima (sites que oferecem "grátis" hospedam cópia sem licença). José tem **Adobe Creative Cloud** e já criou o Web Project "Mariana Masi Site" em fonts.adobe.com com a família **Avenir Next LT Pro** (peso 200 = Ultra Light).

**Já integrado no código:**
- `src/app/[locale]/layout.tsx` carrega o kit via `<link rel="stylesheet" href="https://use.typekit.net/qiq2iiw.css">` no `<head>`.
- `src/app/globals.css` define `--font-display: "avenir-next-lt-pro", var(--font-display-loaded), sans-serif;` — usa a Adobe primeiro, cai pro Jost (`next/font/google`, fallback livre) se a Adobe não resolver.
- Headings principais usam peso explícito `font-[200]` (Tailwind arbitrary value) pra bater exato com o Ultra Light da Avenir Next.

**Passo pendente do José:** no projeto "Mariana Masi Site" em fonts.adobe.com → **Edit Project → aba Domains** → adicionar `marianamasi.com`, `www.marianamasi.com` e `localhost` (esse último pra funcionar em dev/preview). Confirmado via teste local: a Adobe está recusando servir o CSS (`transferSize: 0`) porque nenhum domínio foi liberado ainda — assim que adicionar, a fonte real entra sem precisar mexer em mais nada no código.

## Tratamento visual — pendência ativa

José achou o design "meio preto e branco demais" ao ver o primeiro preview. Perguntei se o problema é o filtro `grayscale` aplicado nas fotos (`className="... grayscale"` em `Header`/`page.tsx`/`about/page.tsx`/`links/page.tsx`), a paleta do site (hoje só tinta escura + um acento terracota `--color-acento`, sem as outras cores da logo — azul, verde-sálvia, dourado), ou as duas coisas — **ainda sem resposta**. Não mudar isso sozinho; esperar a decisão dele antes de mexer em `globals.css` ou nos `className` das imagens.

## Conteúdo real pendente — `[REVISAR]`

Regra já usada na Instituto Nexium Site pra bios da equipe: **nunca inventar credenciais**. Estes pontos estão com placeholder claramente marcado, esperando a Mariana/José:

- Biografia longa (`src/content/profile.ts` → `PROFILE.introduction` é genérico sobre a área, não uma bio pessoal real)
- Trajetória profissional e acadêmica, formação, CRP (`about` em `messages/pt.json` e `messages/en.json`, seções `journeyText`, `neuropsychologyText`, `educationEmpty`, `credentialsEmpty`)
- Links reais de Lattes, ORCID, Google Scholar, LinkedIn (`src/content/profile.ts` → `ACADEMIC_PROFILES`, todos com `url: null` hoje)
- E-mail profissional de contato (`src/lib/site.ts` → `CONTACT_EMAIL`, hoje é um placeholder `contato@marianamasi.com`, não confirmado)
- Projetos de pesquisa e publicações reais (`src/content/research.ts` — arrays vazios, estrutura pronta)
- Primeiros artigos do Insights (`src/content/insights.ts` — array vazio, estrutura pronta, cada artigo é uma entrada por idioma)

## Assets usados

- Logo principal: `public/logo-mariana-masi.png` — cópia de `Mariana Masi Neuropsicologia/videos/logo 2026 no BG.png` (a versão mais recente entre as 3 pastas de logo que existiam; nome completo "Mariana Costa Masi", fundo transparente).
- Favicon: `src/app/icon.png` — cópia redimensionada (512×512) de `LOGO/BRAIN/BRAIN.png` (marca isolada, traço preto).
- Fotos: `public/photos/` — 3 fotos selecionadas de `PICS/nanihits_Web2048px_/altaresoluo/` (editorial, preto e branco). Há ~130 fotos na pasta original pra escolher mais se precisar.

## Pendências gerais (ordem sugerida)

1. José decide P&B vs. cor (ver seção acima).
2. José manda o link de embed da Adobe Fonts.
3. José/Mariana revisam todo conteúdo `[REVISAR]`.
4. Criar repositório remoto no GitHub e dar push.
5. Criar projeto na Vercel (mesma conta/organização), configurar env/domain.
6. Migrar DNS de `marianamasi.com` do Wix pra Vercel.
7. Confirmar plano Vercel (Hobby não cobre uso comercial — provavelmente a conta já é Pro por causa dos outros dois sites).

## Checklist de retomada para uma conversa nova

1. Ler este arquivo inteiro antes de mexer em qualquer coisa.
2. Conferir se alguma das pendências ativas (tipografia, P&B/cor) foi resolvida numa conversa anterior — procurar no histórico ou perguntar ao José.
3. `git log --oneline` — ver o que já foi commitado localmente (ainda sem remoto).
4. Não confundir com Instituto Nexium Site nem com Nexium Clinic — domínio, propósito e identidade visual são intencionalmente diferentes.
5. Ao terminar, atualizar este `HANDOFF.md`.
