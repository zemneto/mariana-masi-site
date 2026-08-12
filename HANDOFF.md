# Mariana Masi Site — Handoff

> Documento único de retomada. Ao terminar um bloco de trabalho relevante, **atualize este arquivo** — ver protocolo de manutenção em `~/Desktop/Ecosystem/AGENTS.md`.

**✅ Publicado em produção (12/08/2026):** redesign visual completo do site — "Direção A / Traço Clínico". Aprovado pela Mariana e pelo José, commitado (`a5fb39d`) e enviado pro `main` — Vercel publica automaticamente em [marianamasi.com](https://marianamasi.com).

### Por que existe

José achou o layout anterior "genérico, parecia feito por IA" (kicker numerado 01/02/03 + tipografia fina + paleta cream/terracota é literalmente o padrão que ferramentas de IA tendem a gerar sem direção autoral). Pediu 3 propostas de direção visual equilibrando identidade pessoal da Mariana e linguagem visual de neurociência. A Mariana escolheu **"Traço Clínico"**: o site como um registro/ficha clínica real — papel pautado, anotações de margem, carimbos, fotos anexadas como num processo físico, e a neurociência entrando pela estrutura do documento (não por decoração). As outras duas propostas descartadas eram "Rede" (grafo de conexões) e depois "Manuscrito"/"Instrumento" (artigo científico / ficha de instrumento de avaliação) — só ficam registradas aqui como histórico de decisão, não existem no código.

### Sistema visual novo

- **Tipografia — só Avenir Next LT Pro, em variações de peso** (correção do José: "a fonte tem que ser Avenir Next em todo lugar, é a fonte escolhida pela Mariana pra marca dela; pode usar variações, mas sempre ela"). Primeira versão do redesign introduziu uma serifa editorial (Iowan Old Style) pro corpo/headings — **revertido**. O kit da Adobe (`use.typekit.net/qiq2iiw.css`) carrega de verdade os pesos 200/400/500/700 (+ itálicos) de `avenir-next-lt-pro`, mais um corte `avenir-next-lt-pro-condensed` (400/700) — confirmado inspecionando o CSS do kit direto (`curl`), não por suposição. Sistema final: `font-display` (Avenir Next) em **peso 200 (Ultra Light, igual à logo dela)** pro wordmark de marca (Header, Footer, avatar de `/links`, assinatura de autor) **e** pros títulos grandes (H1 de hero/página); **peso 500** pros headings de seção (H2/H3); **peso 400** pro corpo de texto (é o padrão do `body` em `globals.css` agora). `font-condensed` (o corte condensado, mesma família) substituiu o antigo `font-mono` em todas as anotações/labels/códigos/datas/nav/botões — ainda uma "variação dela", não outra fonte.
- **Cores**: paleta real da marca mantida (papel/tinta/terracota/sálvia — nenhuma inventada). Novo token `--color-graphite` (`#6b6459`) pra anotações de margem. `--color-acento` continua o terracota escurecido (`#955030`, corrigido numa rodada anterior por contraste) — usado como "carimbo".
- **Fundo pautado**: `body` em `globals.css` ganhou um `background-image` de linhas horizontais sutis (papel pautado), site inteiro.
- **Sem botão em pílula em lugar nenhum** — trocado por bordas retas + mono uppercase (bracket/carimbo). `rounded-full` só sobrevive nos 2 lugares onde faz sentido de verdade: avatar circular da página `/links` e o selo de credenciais.
- **Marquee removido** da Home (não combinava com o conceito de documento).
- **Kicker numerado (01, 02...) virou `§1, §2...`** — componente compartilhado `src/components/Kicker.tsx`.
- **Índice de áreas de interesse**: `AREAS_DE_INTERESSE` (`src/content/profile.ts`) ganhou campo `codigo` (NP/EC/NC/IA) substituindo o campo `cor` (cores alternadas removidas — todo código usa a mesma cor de carimbo agora). Ver `src/content/types.ts`.
- **Fotos anexadas**: novo componente `src/components/PhotoAttach.tsx` (envolve o `MediaFrame` existente) — foto com leve rotação, sombra e uma "fita" no topo, como se estivesse grampeada num processo físico. Usa as fotos reais (`mariana-hero.jpg`, `mariana-about.jpg`).
- **Selo de credenciais**: novo componente `src/components/Stamp.tsx` — círculo com borda, usado em `/about` pra "Título de Especialista em Neuropsicologia — CFP".
- Aplicado em **todas** as páginas: Home, Sobre, Pesquisa, Insights (lista + artigo), Contato, Links, 404.
- Na página **Sobre**, a antiga seção "Trajetória" (prosa livre) foi **fundida com "Formação"** — vira uma única timeline real usando `EDUCATION_TIMELINE` (Universidade Paulista → PANI/HC-FMUSP → CEPSIC → SARI/CPN), eliminando repetição de conteúdo. As chaves `journeyHeading`/`journeyText` foram removidas de `messages/pt.json`/`en.json` (o conteúdo real já está coberto pela timeline). `neuropsychologyText` virou uma nota reflexiva curta própria.

### Bug real encontrado e corrigido durante a verificação

O hero da Home e do Sobre usava `grid-cols-[56px_1fr]` sem variante responsiva — no mobile, a coluna de anotação de margem fica com `hidden sm:block` (sai do fluxo do grid), e o único item restante era auto-posicionado na primeira track (56px) em vez da segunda, espremendo todo o conteúdo do hero numa coluna de 56px (texto quebrando palavra por palavra). Corrigido pra `grid-cols-1 sm:grid-cols-[56px_1fr]` nos dois arquivos. Vale lembrar desse padrão (`hidden` num grid item sem tornar o `grid-template-columns` responsivo junto) se replicar essa estrutura em outra página.

### Verificado

`npm run lint` limpo (só o warning pré-existente do `MediaFrame`), `tsc --noEmit` limpo, **`npm run build` (produção) limpo** — todas as 17 rotas geram como conteúdo estático. Testado ao vivo em PT e EN, desktop e mobile (inclusive o bug do grid acima, achado testando mobile de verdade). Menu mobile, `PageTransition` e `prefers-reduced-motion` (da rodada anterior) continuam funcionando com o novo visual.

### Rodada anterior (UX/motion, incorporada acima)

- **Transição entre páginas** (`src/components/PageTransition.tsx`, usado em `[locale]/layout.tsx`) — fade + leve deslocamento vertical (`AnimatePresence mode="wait"`, ~220ms) em vez do corte seco padrão do App Router.
- **Bug de hover de 1.6s corrigido** em `MediaFrame.tsx` — o `whileHover` (zoom nas fotos) usava a mesma duração da entrada no scroll (1.6s); agora tem transição própria (400ms).
- **`prefers-reduced-motion` respeitado** em `Reveal.tsx` e `MediaFrame.tsx`.
- **Menu mobile animado** (`Header.tsx`) — `AnimatePresence` com fade+slide.
- **Easing consolidado** em `src/lib/motion.ts` (`EASE_OUT`).
- **Contraste do link corrigido**: `--color-acento` tinha razão de contraste 3.02:1 — abaixo do mínimo WCAG AA (4.5:1). Escurecido pra `#955030` (4.75:1). `--color-terracota` (cor de marca amostrada da logo) mantida intacta.
- **Página 404 customizada** (`src/app/[locale]/not-found.tsx` + chave `notFound` em `messages/pt.json`/`en.json`) — antes caía na 404 genérica do Next (fundo preto, sem marca, em inglês). Funciona para links quebrados dentro do site (ex: slug de artigo inválido); uma URL totalmente fora do domínio de rotas conhecidas ainda pode cair na 404 genérica do Next — limitação conhecida, não resolvida.
- **Alinhamento de texto** nas listas de "Áreas de Interesse" (Home e Sobre): descrição de cada área estava `text-right` (difícil de escanear em várias linhas) — alinhado à esquerda.
- **Consistência de hover**: lista do Insights agora usa o mesmo tratamento (translate-x no hover) que a lista de Áreas de Interesse, em vez de só sublinhar.

Todos os 8 pontos vieram de uma auditoria pedida pelo José (skill `improve-animations` + revisão manual de contraste/UX/responsividade). Um ponto ficou só como observação, não corrigido: a legibilidade dos acentos (á, õ, ç) no peso ultra-fino da Avenir Next não pôde ser validada no preview local (sem acesso à Adobe Fonts no sandbox, caiu no fallback Jost) — vale conferir em produção.

**Atualizado em:** 11/08/2026 — rodada de correções de conteúdo pedida pela Mariana (via José): "especialista" com E maiúsculo, texto do Instituto Nexium reescrito pra deixar claro que **o Instituto atende e ela supervisiona a equipe** (não atende pessoalmente), "de crianças a idosos" → "de pré-escolares a idosos", card de Neurociência com texto mais humano, card de Neuropsicologia com reabilitação/SNC/emoção, e **Formação (`EDUCATION_TIMELINE`) e Credenciais preenchidas com dados reais** que a Mariana mandou: Universidade Paulista (graduação), nome completo do CEPSIC (Centro de Estudos Psico-Cirúrgicos da Divisão de Psicologia do ICHC-FMUSP), PANI corrigido pra "Protocolo" (não "Projeto") de Avaliação Neuropsicológica Infantil, HC-FMUSP por extenso, curso 2025 completo (Qualificação Profissional na Abordagem Neuropsicológica Multidisciplinar em Transtornos Neurocognitivos do Envelhecimento) no SARI/CPN (AFIP/UNIFESP), e título de Especialista em Neuropsicologia pelo CFP. Também corrigido "Experiência Clínica" (`clinicalText` em `messages/pt.json`/`en.json`): **Mariana não atende mais em Jundiaí** — para o Instituto ela é **head e supervisora clínica**, sem agenda de atendimento própria. Unidades do Instituto Nexium listadas: **Aldeia da Serra, Alphaville, Itu, Jundiaí e Sorocaba** (substituiu a menção antiga só a "Clínica Jundiaí e Consultório Itu"). Arquivos: `src/content/profile.ts`, `messages/pt.json`, `messages/en.json`. Ainda falta só o **número de CRP** (ver pendências). Antes disso: `next`/`eslint-config-next` atualizados pra 16.3.0 (auditoria de segurança do Ecosystem, corrige CVEs conhecidas do Next.js; `npm audit` já estava e continua com 0 vulnerabilidades; lint e `next build --webpack` validados). Fase 1 completa e **publicada em produção** (10/08/2026).

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

## Direção de design — editorial/conceitual

José achou o site "muito quadrado, institucional demais" mesmo depois da paleta resolvida — o problema era estrutural: toda seção era a mesma faixa com borda embaixo (título + texto + link), repetida. Redesenhado em torno de um conceito de **caderno de pesquisa editorial**:

- **Hero full-bleed assimétrico**: nome em tipografia gigante ultra-fina (`text-[15vw]` no mobile até `xl:text-[76px]`), foto sem moldura tocando a borda da viewport (não mais caixa arredondada contida). Mesmo padrão no hero da página Sobre.
- **"Áreas de interesse"** virou um índice numerado editorial (`01 Neuropsicologia ... descrição`) em vez de cards com borda — reusado em Home e Sobre.
- **Ritmo assimétrico**: seções usam uma coluna de "kicker" numerado (01, 02, 03...) + coluna de conteúdo deslocada, em vez de blocos centralizados idênticos empilhados com `border-b` repetido.
- **`framer-motion`** (novo em `package.json`): `src/components/Reveal.tsx` (fade+subida ao entrar na viewport), `src/components/MediaFrame.tsx` (zoom de entrada + hover sutil nas fotos), `src/components/AbstractLines.tsx` (motivo gráfico abstrato de linhas, amostrado do próprio traço da logo, com animação de "desenho" via `pathLength` — não é um ícone literal).
- **Ticker/marquee** com as áreas de interesse como "eyebrow" do hero (`.marquee-track` em `globals.css`, respeita `prefers-reduced-motion`).
- Nav do Header em versalete rastreado (`tracking-[0.18em] uppercase`) em vez de texto normal.

**Bug real corrigido durante a verificação**: no mobile, o nome no hero vazava horizontalmente em vez de quebrar linha — clássica pegadinha de CSS (`min-width: auto` padrão em filho de flex/grid faz a caixa se dimensionar pelo conteúdo em vez do espaço disponível). Corrigido com `min-w-0` nas colunas de texto do hero (Home e Sobre). Se replicar esse padrão de hero em outra página, lembrar de aplicar `min-w-0` na coluna de texto.

**Ajustes finos do José depois do redesign:**
- "Mariana Costa Masi" em **caixa alta** sempre que usado como marca/wordmark (assim que a fonte foi desenhada pra ser usada, mesmo tratamento da logo) — aplicado no hero da Home, Header, Footer, `/links` e no author card do artigo. Não afeta menções dela em texto corrido (ex: "Mariana é psicóloga...").
- **Header trocado**: em vez da imagem `logo-mariana-masi.png` (lockup completo achatado em PNG), agora usa só `public/brain-mark-color.png` (ícone isolado, versão colorida de `LOGO/BRAIN/BRAIN COLOR.png`, redimensionado pra 512px) + texto real "MARIANA COSTA MASI" em HTML (`font-display uppercase tracking-[0.14em]`) — mais proporcional no header e usa a fonte web de verdade em vez de texto travado num raster. O favicon (`src/app/icon.png`) também foi trocado pra essa versão colorida (era a versão preta antes).

## Tratamento visual — resolvido

José achou o primeiro preview "meio preto e branco demais" (parecia "site de memória póstuma"). Resolvido em duas partes:

- **Paleta** (`src/app/globals.css`): fundo trocado do quase-branco pro **creme real** (`#e9e3da`, cor exata amostrada de `Mariana Masi Neuropsicologia/videos/bege.png` — que por coincidência é idêntica ao `--color-fundo` da Instituto Nexium Site, reforçando a "família visual" que o brief original pedia). Tinta do texto trocada de quase-preto pro **azul-marinho da logo** (`#1c3f4b`). As 4 cores "principais" definidas pelo José: **creme, azul, terracota (`#c06c40`) e verde-sálvia (`#7c9078`)** — as duas últimas amostradas por script direto dos traços do arquivo da logo (`videos/logo 2026 no BG.png`). Vinho e dourado foram descartados (existiam numa iteração intermediária, removidos a pedido dele). Terracota e sálvia alternam como acento nas 4 "Áreas de interesse" (Home e Sobre).
- **Fotos**: removido o filtro CSS `grayscale`. Fotos definitivas escolhidas pelo José (coloridas, de `PICS/nanihits_Web2048px_/` na pasta de assets): hero = `altaresoluo/alta-resolucao-61.jpg`, about = `altaresoluo/alta-resolucao-27.jpg`, links (avatar circular) = `redessociais/redes-sociais-5.jpg`.

## Conteúdo real pendente — `[REVISAR]`

Regra já usada na Instituto Nexium Site pra bios da equipe: **nunca inventar credenciais**. Estes pontos estão com placeholder claramente marcado, esperando a Mariana/José:

- **Número de CRP** — único dado de credencial ainda faltando (`messages/pt.json`/`en.json` → `credentialsEmpty`, já marcado `[REVISAR]`). Formação, especialização, PANI, CEPSIC, SARI/CPN e título de Especialista pelo CFP já estão preenchidos com dados reais (atualização de 11/08/2026).
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
