---
title: Spécification de migration — Netlify → Cloudflare Pages
type: spec
category: migration
date: 2026-05-29
status: proposed
author: claude
tags: [migration, cloudflare, pages, netlify, infra]
source: code-analysis
---

# Spécification de migration — Netlify → Cloudflare Pages

> Document de spécification rédigé le 2026-05-29.
> Cible : héberger le CV de Mathieu Drouet (`cv.drouet.io`) sur **Cloudflare Pages**
> à la place de **Netlify**, à iso-fonctionnalité.

## 1. Contexte et objectifs

### 1.1 Situation actuelle

Le site est un **site statique Astro (SSG)**, déployé sur **Netlify**. Le build
produit un répertoire `dist/` servi tel quel par le CDN Netlify. Trois
fonctionnalités reposent sur des primitives spécifiques à Netlify :

| # | Fonctionnalité Netlify | Fichier | Criticité |
|---|------------------------|---------|-----------|
| F1 | Configuration de build | `netlify.toml` | Bloquant |
| F2 | Edge Function de négociation Markdown (`Accept: text/markdown`) | `netlify/edge-functions/markdown-negotiation.ts` | Important |
| F3 | Formulaire de contact (Netlify Forms) | `src/components/ContactModal.astro` | Important |
| F4 | Headers cache + sécurité + CSP | `public/_headers` | Bloquant |

Tout le reste (génération SSG, assets, sitemap, `.well-known`, `robots.txt`,
service worker kill-switch) est agnostique de l'hébergeur.

### 1.2 Objectifs de la migration

- **O1** : Déployer le même `dist/` sur Cloudflare Pages, build via `bun`.
- **O2** : Conserver la négociation de contenu Markdown pour les agents IA (F2).
- **O3** : Conserver un formulaire de contact fonctionnel (F3) — sans Netlify Forms.
- **O4** : Conserver tous les headers (cache, sécurité, CSP, Link RFC 8288) (F4).
- **O5** : Basculer `cv.drouet.io` sans interruption de service ni perte SEO.
- **O6** : Pouvoir revenir à Netlify en < 15 min (rollback).

### 1.3 Hors périmètre

- Refonte du design ou du contenu du CV.
- Changement de framework (reste Astro SSG).
- Migration des emails / DNS non liés au site (MX, etc.).

## 2. Analyse de compatibilité Netlify → Cloudflare Pages

| Primitive Netlify | Équivalent Cloudflare Pages | Effort | Compatibilité |
|-------------------|-----------------------------|--------|---------------|
| `netlify.toml` (`build`, `publish`) | Réglages projet (dashboard) ou `wrangler.toml` | Faible | Reconfiguration |
| `[build.environment]` (NODE/BUN_VERSION) | Variables d'env de build + détection `bun.lock` | Faible | Reconfiguration |
| `public/_headers` | `_headers` (**format identique**) | Nul | ✅ Natif |
| `_redirects` (absent ici) | `_redirects` (format identique) | Nul | ✅ Natif |
| Edge Functions (Deno, `https://edge.netlify.com`) | **Pages Functions** (Workers runtime, `functions/`) | Moyen | Réécriture |
| Netlify Forms (`data-netlify`) | Aucun équivalent natif → **Pages Function + service tiers** | Moyen | Remplacement |
| Déploiement sur push `main` | Intégration Git Cloudflare (build automatique) | Faible | Reconfiguration |

**Conclusion** : la migration est réaliste. Les deux seuls vrais chantiers de
code sont **F2** (Edge Function → Pages Function) et **F3** (Netlify Forms →
solution alternative).

## 3. Spécification détaillée

### 3.1 Build et configuration projet (F1)

Cloudflare Pages détecte `bun.lock` et installe les dépendances avec `bun`.
Réglages à configurer dans le dashboard Cloudflare Pages (ou via `wrangler.toml`) :

| Réglage | Valeur |
|---------|--------|
| Framework preset | `Astro` (ou `None`) |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version (env) | `NODE_VERSION=22` |

> **Note bun** : Cloudflare Pages utilise `bun install` automatiquement si
> `bun.lock` est présent. Pour forcer une version, définir la variable
> d'environnement de build correspondante. Si la détection échoue, fallback
> possible : `npm`/`pnpm` via le lockfile correspondant — éviter d'avoir
> plusieurs lockfiles concurrents au commit (`bun.lock` est la référence ;
> `package-lock.json` et `pnpm-lock.yaml` présents dans le repo devraient être
> retirés ou ignorés pour lever l'ambiguïté de détection).

**Fichier optionnel `wrangler.toml`** (versionner la config de déploiement) :

```toml
name = "cv-mathieudrouet-2025"
pages_build_output_dir = "dist"
compatibility_date = "2026-05-29"
compatibility_flags = ["nodejs_compat"]
```

### 3.2 Headers (F4)

`public/_headers` est copié tel quel dans `dist/` au build et est **nativement
supporté par Cloudflare Pages avec la même syntaxe**. Aucune modification
fonctionnelle requise.

Points de vigilance à valider après bascule :
- Les règles `Cache-Control: immutable` sur `/_astro/*`, `/fonts/*`, `/images/*`,
  `/logos/*`.
- Le `Content-Type: text/markdown` + `Vary: Accept` sur `/*.md`.
- Les en-têtes `Link:` (RFC 8288) sur `/` et `/about`.
- La CSP complète (ligne `/*`). **Cloudflare n'injecte pas de CSP** ; celle du
  projet reste seule maîtresse — la conserver à l'identique.

> ⚠️ Cloudflare Pages applique aussi `_headers` aux réponses servies par les
> Pages Functions selon les règles de précédence. Vérifier que le `Content-Type`
> renvoyé par la Function de négociation Markdown (§3.3) n'est pas écrasé.

### 3.3 Négociation de contenu Markdown (F2)

**Comportement à préserver** : sur `GET /`, `GET /about`, `GET /about/`, si le
header `Accept` préfère `text/markdown` (q ≥ q de `text/html`), renvoyer la
source Markdown (`/cv.md` ou `/about.md`) au lieu du HTML, avec `Vary: Accept`,
`x-markdown-source` et les `Link` d'agent discovery. Sinon, laisser passer le HTML.

**Implémentation cible** : une **Pages Function** middleware. Cloudflare exécute
les fichiers du répertoire `functions/` sur le runtime Workers. Un middleware
`functions/_middleware.ts` intercepte toutes les routes et applique la logique.

```ts
// functions/_middleware.ts
const ROUTE_TO_MARKDOWN: Record<string, string> = {
  "/": "/cv.md",
  "/about": "/about.md",
  "/about/": "/about.md",
};

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  const target = ROUTE_TO_MARKDOWN[url.pathname];

  // Routes non concernées OU méthode non idempotente → pipeline normal
  if (!target || (request.method !== "GET" && request.method !== "HEAD")) {
    return next();
  }

  const accept = request.headers.get("accept") || "";
  if (!prefersMarkdown(accept)) return next();

  // Récupère l'asset statique .md servi par Pages
  const mdResponse = await context.env.ASSETS.fetch(
    new URL(target, url.origin).toString(),
    { headers: { accept: "text/markdown" } },
  );
  if (!mdResponse.ok) return next();

  const body = request.method === "HEAD" ? null : await mdResponse.text();
  const headers = new Headers({
    "content-type": "text/markdown; charset=utf-8",
    "vary": "Accept",
    "cache-control": "public, max-age=3600, must-revalidate",
    "x-markdown-source": target,
    "link": [
      `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
      `</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"`,
      `<${url.pathname}>; rel="canonical"`,
    ].join(", "),
  });
  return new Response(body, { status: 200, headers });
};

function prefersMarkdown(accept: string): boolean {
  // logique identique à netlify/edge-functions/markdown-negotiation.ts
  if (!accept) return false;
  const entries = accept.split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    const [type, ...params] = e.split(";").map((s) => s.trim());
    const q = params.find((p) => p.startsWith("q="));
    const qv = q ? parseFloat(q.slice(2)) : 1;
    return { type: type.toLowerCase(), q: Number.isFinite(qv) ? qv : 1 };
  });
  const md = entries.find((e) => e.type === "text/markdown" || e.type === "text/x-markdown");
  if (!md || md.q === 0) return false;
  const html = entries.find((e) => e.type === "text/html");
  return md.q >= (html ? html.q : 0);
}
```

**Différences clés à connaître** :
- Runtime **Workers** (V8), pas Deno → pas d'import `https://edge.netlify.com`,
  on type avec `PagesFunction` (paquet `@cloudflare/workers-types`).
- Accès aux assets statiques via `context.env.ASSETS.fetch(...)` (le binding
  `ASSETS` est fourni automatiquement aux Pages Functions).
- La logique métier (`prefersMarkdown`, table de routes, headers) est **portée
  à l'identique** : aucun changement de comportement attendu.

**Migration de fichiers** : créer `functions/_middleware.ts`, puis supprimer
`netlify/edge-functions/markdown-negotiation.ts` une fois la bascule validée.

### 3.4 Formulaire de contact (F3) — chantier le plus impactant

Le `ContactModal.astro` utilise **Netlify Forms** (`data-netlify="true"`,
`data-netlify-honeypot`, champ caché `form-name`, POST AJAX vers `/`). **Cette
primitive n'existe pas sur Cloudflare Pages.** Options classées par effort :

| Option | Description | Effort | Dépendance externe |
|--------|-------------|--------|--------------------|
| **A. Pages Function + Email (recommandé)** | `functions/api/contact.ts` reçoit le POST, valide, envoie un email via API (Resend / MailChannels / SMTP) | Moyen | Compte service email |
| B. Service de formulaire tiers | Formspree / Web3Forms / Getform : changer l'`action` du form | Faible | Compte tiers, données chez un tiers |
| C. Cloudflare Worker + KV/D1 | Stocker les soumissions + notification | Élevé | Surdimensionné pour un CV |

**Recommandation : Option A** (cohérent avec l'écosystème Cloudflare, pas de
dépendance lourde, données maîtrisées). Spec :

```ts
// functions/api/contact.ts
interface Env { RESEND_API_KEY: string; CONTACT_TO: string; }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();

  // Honeypot anti-spam (champ "bot-field" laissé vide par un humain)
  if (form.get("bot-field")) return new Response("OK", { status: 200 });

  const name = String(form.get("name") || "").slice(0, 200);
  const email = String(form.get("email") || "").slice(0, 200);
  const message = String(form.get("message") || "").slice(0, 5000);
  if (!name || !email || !message) {
    return new Response("Champs requis manquants", { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "cv.drouet.io <noreply@drouet.io>",
      to: env.CONTACT_TO,
      reply_to: email,
      subject: `Contact CV — ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    }),
  });

  return res.ok
    ? new Response("OK", { status: 200 })
    : new Response("Erreur d'envoi", { status: 502 });
};
```

**Modifications côté `ContactModal.astro`** :
- Retirer les attributs `data-netlify`, `data-netlify-honeypot` et le champ
  caché `form-name` (spécifiques Netlify).
- Conserver le champ honeypot `bot-field` (réutilisé par la Function).
- Pointer la soumission AJAX vers `POST /api/contact` au lieu de `POST /`.
- Conserver les états loading / success / error et l'auto-close (3 s).

**Protection anti-spam recommandée** : ajouter **Cloudflare Turnstile** (gratuit,
intégré) en complément du honeypot — vérification du token côté Function via
`https://challenges.cloudflare.com/turnstile/v0/siteverify`. Si Turnstile est
ajouté, mettre à jour la **CSP** (`script-src` + `frame-src` pour
`https://challenges.cloudflare.com`).

**Secrets** : `RESEND_API_KEY` et `CONTACT_TO` sont des **variables
d'environnement / secrets** du projet Pages (jamais committés). Mettre à jour
`.gitignore` n'est pas nécessaire (déjà couvert), mais documenter ces secrets
dans le runbook.

### 3.5 CSP

La CSP actuelle (`public/_headers`, ligne `/*`) doit évoluer **uniquement si**
on ajoute des origines externes :
- Option B (formulaire tiers) → ajouter le domaine du service à `form-action` /
  `connect-src`.
- Turnstile → ajouter `https://challenges.cloudflare.com` à `script-src` et
  `frame-src` (actuellement `frame-src 'none'`).

Sans ces ajouts (Option A sans Turnstile), la CSP reste **inchangée** : le POST
vers `/api/contact` est same-origin (`connect-src 'self'` et `form-action 'self'`
déjà présents). ✅

## 4. Plan de migration (étapes)

### Phase 0 — Préparation (sans impact prod)
1. Créer un compte / projet Cloudflare Pages relié au repo GitHub.
2. Choisir l'option formulaire (recommandé : A + Turnstile) et provisionner les
   secrets (`RESEND_API_KEY`, `CONTACT_TO`).
3. Lever l'ambiguïté de lockfiles (garder `bun.lock`, retirer
   `package-lock.json` / `pnpm-lock.yaml` du repo).

### Phase 1 — Portage du code (sur cette branche)
4. Créer `functions/_middleware.ts` (négociation Markdown, §3.3).
5. Créer `functions/api/contact.ts` (formulaire, §3.4).
6. Adapter `ContactModal.astro` (retirer Netlify Forms, cibler `/api/contact`).
7. Ajouter `wrangler.toml` (optionnel mais recommandé).
8. Ajouter `@cloudflare/workers-types` en devDependency pour typer les Functions.
9. Mettre à jour la CSP si Turnstile / service tiers (§3.5).

### Phase 2 — Déploiement de validation (preview)
10. Push → build Cloudflare Pages sur l'URL `*.pages.dev` (preview).
11. Tests d'acceptation (§6) sur l'URL preview, **avant** tout changement DNS.

### Phase 3 — Bascule DNS (cutover)
12. Ajouter `cv.drouet.io` comme **custom domain** sur le projet Pages.
13. Pointer le DNS : si la zone `drouet.io` est déjà gérée par Cloudflare, créer
    un CNAME `cv` → `<projet>.pages.dev` (proxifié). Sinon, déléguer la zone à
    Cloudflare ou créer le CNAME chez le registrar courant.
14. Attendre l'émission du certificat TLS Cloudflare et la propagation.
15. Désactiver le déploiement automatique côté Netlify (éviter les double-builds)
    une fois la prod confirmée stable.

### Phase 4 — Nettoyage (post-validation, ≥ 1 semaine)
16. Supprimer `netlify.toml` et `netlify/edge-functions/`.
17. Mettre à jour la doc (`CLAUDE.md`, `README.md`, docs techniques) pour refléter
    Cloudflare Pages.

## 5. Risques et mitigations

| # | Risque | Impact | Mitigation |
|---|--------|--------|------------|
| R1 | Détection bun échoue au build CF | Build KO | Forcer via env / framework preset ; supprimer lockfiles concurrents |
| R2 | Précédence `_headers` vs Function écrase le `Content-Type` Markdown | F2 cassé | Tester `curl -H "Accept: text/markdown"` sur preview ; headers explicites dans la Response |
| R3 | Perte des soumissions de contact pendant la bascule | Leads perdus | Valider F3 sur preview avant cutover ; garder Netlify actif en parallèle 1 semaine |
| R4 | Régression SEO (canonical, sitemap, 404) | SEO | Comparer headers/`Link` prod vs preview ; vérifier `sitemap.xml` |
| R5 | CSP trop stricte casse Turnstile / form tiers | Form KO | Mettre à jour CSP en même temps que l'ajout d'origine |
| R6 | TTL DNS long → bascule lente | Indispo perçue | Réduire le TTL 24 h avant cutover |
| R7 | Secrets formulaire mal configurés | Form 502 | Tester l'envoi réel sur preview avec secrets de prod |

## 6. Critères d'acceptation (tests de bascule)

À exécuter sur l'URL **preview** Cloudflare avant le cutover, puis re-vérifier en
prod après bascule :

- [ ] `GET /` renvoie le HTML du CV (statut 200, `Content-Type: text/html`).
- [ ] `GET /` avec `Accept: text/markdown` renvoie `cv.md`
      (`Content-Type: text/markdown`, `x-markdown-source: /cv.md`, `Vary: Accept`).
- [ ] `GET /about` idem avec `about.md`.
- [ ] `GET /cv.md` renvoie `text/markdown; charset=utf-8`.
- [ ] `/_astro/*`, `/fonts/*`, `/logos/*` servis avec `Cache-Control: …immutable`.
- [ ] En-têtes de sécurité présents (`X-Frame-Options`, `X-Content-Type-Options`,
      `Referrer-Policy`, `Permissions-Policy`) et **CSP** identique à l'actuelle.
- [ ] En-têtes `Link:` (api-catalog, agent-skills, llms.txt, alternate md/pdf,
      sitemap) présents sur `/` et `/about`.
- [ ] `/.well-known/api-catalog`, `/.well-known/agent-skills/index.json`,
      `/.well-known/agent-skills/cv-info/SKILL.md` servis avec le bon `Content-Type`.
- [ ] `/sitemap.xml` et `/robots.txt` accessibles et corrects.
- [ ] Soumission du formulaire de contact → email reçu ; honeypot bloque les bots.
- [ ] Une route inexistante renvoie une 404.
- [ ] Service worker kill-switch (`/sw.js`) toujours servi.
- [ ] Lighthouse / Core Web Vitals non régressés vs Netlify.

Exemples de commandes de vérification :

```bash
# Négociation Markdown
curl -sI -H "Accept: text/markdown" https://<preview>.pages.dev/ | grep -i "content-type\|x-markdown-source\|vary"
# HTML par défaut
curl -sI https://<preview>.pages.dev/ | grep -i "content-type"
# Headers cache
curl -sI https://<preview>.pages.dev/_astro/ | grep -i cache-control
# CSP
curl -sI https://<preview>.pages.dev/ | grep -i content-security-policy
```

## 7. Plan de rollback

La bascule étant un simple changement DNS, le rollback est rapide :

1. Re-pointer le CNAME `cv` vers Netlify (ou retirer le custom domain de Pages).
2. Réactiver le build automatique Netlify si désactivé.
3. Propagation DNS (TTL réduit en amont → quelques minutes).

Le code Netlify (`netlify.toml`, edge function) n'est **supprimé qu'en Phase 4**,
après une période de stabilité ≥ 1 semaine — garantissant un rollback sans
restauration de fichiers pendant la fenêtre critique.

## 8. Impact documentaire (à mettre à jour après migration)

| Fichier | Modification |
|---------|--------------|
| `CLAUDE.md` | Remplacer mentions Netlify (déploiement, Forms, `BUN_VERSION` dans `netlify.toml`, `_headers`) par Cloudflare Pages / Pages Functions |
| `README.md` | Section déploiement |
| `docs/02-doc-technique-*.md` | Stack (Hébergement = Cloudflare Pages), §7 CI/CD, arborescence (`functions/`) |
| `docs/06-architecture-*.md` | ADR « Hébergement » + diagrammes de flux (form, négociation md) |
| `src/config/env.ts` | `API_BASE_URL` prod (déjà incorrect, cf. D9) à corriger vers `cv.drouet.io` |

## 9. Récapitulatif des fichiers

**À créer**
- `functions/_middleware.ts` — négociation Markdown (remplace l'edge function).
- `functions/api/contact.ts` — backend formulaire de contact.
- `wrangler.toml` — config de déploiement Pages (optionnel).

**À modifier**
- `src/components/ContactModal.astro` — retrait Netlify Forms, cible `/api/contact`.
- `public/_headers` — uniquement si CSP à étendre (Turnstile / tiers).
- `package.json` — ajout `@cloudflare/workers-types` (devDependency).

**À conserver tel quel**
- `public/_headers` (format compatible), `dist/`, tout `src/` hors ContactModal,
  `.well-known/`, `robots.txt`, `sitemap`, `sw.js`.

**À supprimer (Phase 4 uniquement)**
- `netlify.toml`
- `netlify/edge-functions/markdown-negotiation.ts`
- Lockfiles concurrents `package-lock.json` / `pnpm-lock.yaml` (Phase 0).
