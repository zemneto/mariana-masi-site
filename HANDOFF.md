# Mariana Masi Site — Handoff

> Documento único de retomada. Ao terminar um bloco de trabalho relevante, **atualize este arquivo** — ver protocolo de manutenção em `~/Desktop/Ecosystem/AGENTS.md`.

**Atualizado em:** 10/08/2026 — Fase 1 completa e **publicada em produção**.

## O que é e por quê existe

Site pessoal/profissional da **Mariana Masi** (psicóloga, neuropsicóloga) — propriedade separada do **Instituto Nexium**: a Mariana como pessoa/pesquisadora/comunicadora científica, não a clínica. Baseado num brief detalhado que o José trouxe (feito com o GPT), cujo princípio central é: "Mariana Masi primeiro, não uma clínica" — identidade acadêmica/editorial, atendimento clínico só referenciado, nunca o foco.

Antes desta sessão, "Mariana Masi Neuropsicologia" era tratada como projeto pessoal fora do Ecosystem (vivia só em `~/Desktop/Projetos`). O **site** passou a fazer parte do Ecosystem como 4ª unidade — o resto do acervo de marca física (contratos, adesivo, envelope, PSDs) continua em `~/Desktop/Projetos/Mariana Masi Neuropsicologia/`, que é de onde os assets de logo e fotos usados aqui foram copiados.

## Identidade e produção

- **Produção:** [marianamasi.com](https://marianamasi.com) — domínio raiz redireciona (308) pra `www.marianamasi.com`, que serve o site. HTTPS ativo nos dois. Domínio registrado no Wix (só DNS, não hospedagem); DNS migrado (A record da raiz já apontava pro IP certo por coincidência, CNAME do `www` trocado de `cdn1.wixdns.net` pra `e0477eecfa780d51.vercel-dns-016.com`).
- **Hospedagem:** Vercel, projeto `mariana-masi-site`, mesma conta/organização "Nexium" dos outros sites (plano Pro). Deploy automático a cada push pro `main`.
- **Repositório:** [github.com/zemneto/mariana-masi-site](https://github.com/zemneto/mariana-masi-site) (privado), remote em HTTPS (mesmo padrão da Instituto Nexium Site — **não** SSH, essa máquina não tem chave SSH configurada, autentica via `credential.helper=osxkeychain`).
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

## Tipografia — resolvida

A logo usa **Avenir Next Ultra Light**. É fonte comercial da Monotype — não existe versão gratuita legítima (sites que oferecem "grátis" hospedam cópia sem licença). José tem **Adobe Creative Cloud** e criou o Web Project "Mariana Masi Site" em fonts.adobe.com com a família **Avenir Next LT Pro** (peso 200 = Ultra Light).

**Nota:** Adobe Fonts não usa mais allowlist de domínio (política mudou — o kit funciona em qualquer site, incluindo `localhost`, sem configurar nada). Confirmado com `getComputedStyle` que `font-family` resolve pra `avenir-next-lt-pro` com `font-weight: 200` — está ativo e funcionando.

**Como está integrado:**
- `src/app/[locale]/layout.tsx` carrega o kit via `<link rel="stylesheet" href="https://use.typekit.net/qiq2iiw.css">` no `<head>`.
- `src/app/globals.css` define `--font-display: "avenir-next-lt-pro", var(--font-display-loaded), sans-serif;` — usa a Adobe primeiro, cai pro Jost (`next/font/google`, fallback livre, carregado via `displayFont` em `layout.tsx`) só se o kit da Adobe cair.
- Headings principais usam peso explícito `font-[200]` (Tailwind arbitrary value) pra bater exato com o Ultra Light.

## Tratamento visual — resolvido

José achou o primeiro preview "meio preto e branco demais" (parecia "site de memória póstuma"). Resolvido em duas partes:

- **Paleta** (`src/app/globals.css`): fundo trocado do quase-branco pro **creme real** (`#e9e3da`, cor exata amostrada de `Mariana Masi Neuropsicologia/videos/bege.png` — que por coincidência é idêntica ao `--color-fundo` da Instituto Nexium Site, reforçando a "família visual" que o brief original pedia). Tinta do texto trocada de quase-preto pro **azul-marinho da logo** (`#1c3f4b`). As 4 cores "principais" definidas pelo José: **creme, azul, terracota (`#c06c40`) e verde-sálvia (`#7c9078`)** — as duas últimas amostradas por script direto dos traços do arquivo da logo (`videos/logo 2026 no BG.png`). Vinho e dourado foram descartados (existiam numa iteração intermediária, removidos a pedido dele). Terracota e sálvia alternam como acento nas 4 "Áreas de interesse" (Home e Sobre).
- **Fotos**: removido o filtro CSS `grayscale`. Fotos definitivas escolhidas pelo José (coloridas, de `PICS/nanihits_Web2048px_/` na pasta de assets): hero = `altaresoluo/alta-resolucao-61.jpg`, about = `altaresoluo/alta-resolucao-27.jpg`, links (avatar circular) = `redessociais/redes-sociais-5.jpg`.

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
- Fotos: `public/photos/` — 3 fotos definitivas (ver seção "Tratamento visual" acima).

## Pendências gerais

1. **José/Mariana revisam todo conteúdo `[REVISAR]`** — única pendência real que falta (ver seção acima com a lista completa: bio, formação, CRP, Lattes/ORCID/Scholar/LinkedIn, e-mail, pesquisa/publicações, primeiros artigos do Insights).
2. Publicação (GitHub → Vercel → domínio) — **feita**, ver seção "Identidade e produção".

## Checklist de retomada para uma conversa nova

1. Ler este arquivo inteiro antes de mexer em qualquer coisa.
2. `git log --oneline` — ver o que já foi commitado; `git remote -v` só pra confirmar (já aponta pro GitHub).
3. Não confundir com Instituto Nexium Site nem com Nexium Clinic — domínio, propósito e identidade visual são intencionalmente diferentes.
4. Site já está em produção (`marianamasi.com`) — qualquer push pro `main` publica direto. Cuidado redobrado com o que vai pro `main`.
5. Ao terminar, atualizar este `HANDOFF.md`.
