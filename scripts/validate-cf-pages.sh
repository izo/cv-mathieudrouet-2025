#!/usr/bin/env bash
# Validation pre-cutover — Cloudflare Pages
# Usage: ./scripts/validate-cf-pages.sh <preview-url>
# Ex:    ./scripts/validate-cf-pages.sh https://cv-mathieudrouet-2025.pages.dev
#
# Re-run avec l'URL prod après cutover DNS :
#        ./scripts/validate-cf-pages.sh https://cv.drouet.io

set -euo pipefail

BASE="${1:-}"
if [[ -z "$BASE" ]]; then
  echo "Usage: $0 <url>"
  echo "Ex:    $0 https://cv-mathieudrouet-2025.pages.dev"
  exit 1
fi
BASE="${BASE%/}"  # supprime le trailing slash

PASS=0; FAIL=0

ok()   { echo "  ✅ $1"; PASS=$((PASS + 1)); }
fail() { echo "  ❌ $1"; FAIL=$((FAIL + 1)); }
h1()   { echo; echo "── $1 ──────────────────────────────────"; }

check_header() {
  local label="$1" url="$2" flags_str="$3" pattern="$4"
  local val
  if [[ -n "$flags_str" ]]; then
    val=$(eval "curl -sI $flags_str '$url'" | grep -i "$pattern" | head -1 | tr -d '\r' || true)
  else
    val=$(curl -sI "$url" | grep -i "$pattern" | head -1 | tr -d '\r' || true)
  fi
  if [[ -n "$val" ]]; then ok "$label → $val"; else fail "$label manquant ($pattern)"; fi
}

check_body() {
  local label="$1" url="$2" flag="$3" pattern="$4"
  if curl -s $flag "$url" | grep -q "$pattern" 2>/dev/null; then ok "$label"; else fail "$label"; fi
}

check_status() {
  local label="$1" url="$2" expected="$3"
  local code
  code=$(curl -so /dev/null -w "%{http_code}" "$url")
  if [[ "$code" == "$expected" ]]; then ok "$label → HTTP $code"; else fail "$label → attendu $expected, reçu $code"; fi
}

echo "═══════════════════════════════════════════════════"
echo "  Validation CF Pages — $BASE"
echo "═══════════════════════════════════════════════════"

# ── 1. HTML par défaut ───────────────────────────────
h1 "1. HTML par défaut"
check_status "GET / → 200" "$BASE/" "200"
check_header "Content-Type HTML" "$BASE/" "" "content-type.*text/html"
check_header "Vary: Accept sur /" "$BASE/" "" "^vary:.*Accept"

# ── 2. Négociation Markdown ──────────────────────────
h1 "2. Négociation Markdown (Pages Function)"
check_header "/ → text/markdown" "$BASE/" '-H "Accept: text/markdown"' "content-type.*text/markdown"
check_header "/ → x-markdown-source: /cv.md" "$BASE/" '-H "Accept: text/markdown"' "x-markdown-source:.*cv\.md"
check_header "/ → Vary: Accept (Function)" "$BASE/" '-H "Accept: text/markdown"' "^vary:.*Accept"

check_header "/about → text/markdown" "$BASE/about" '-H "Accept: text/markdown"' "content-type.*text/markdown"
check_header "/about → x-markdown-source: /about.md" "$BASE/about" '-H "Accept: text/markdown"' "x-markdown-source:.*about\.md"

# Navigateurs (Accept: text/html,*/*) → doivent recevoir HTML
browser_accept='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
ct=$(curl -sI -H "$browser_accept" "$BASE/" | grep -i "^content-type:" | head -1 | tr -d '\r')
if echo "$ct" | grep -qi "text/html"; then ok "Navigateur reçoit HTML (pas Markdown)"; else fail "Navigateur ne reçoit pas text/html → $ct"; fi

# ── 3. Assets statiques Markdown ────────────────────
h1 "3. Assets .md statiques"
check_header "GET /cv.md → text/markdown" "$BASE/cv.md" "" "content-type.*text/markdown"
check_header "GET /about.md → text/markdown" "$BASE/about.md" "" "content-type.*text/markdown"
check_header "/llms.txt → text/markdown" "$BASE/llms.txt" "" "content-type.*text/markdown"

# ── 4. Cache immutable ───────────────────────────────
h1 "4. Cache-Control immutable"
# On ne connaît pas le hash _astro, on récupère l'un des assets depuis la page
astro_asset=$(curl -s "$BASE/" | grep -oE '/_astro/[^"]+\.(css|js)' | head -1 || true)
if [[ -n "$astro_asset" ]]; then
  check_header "_astro/* → immutable" "$BASE$astro_asset" "" "cache-control.*immutable"
else
  fail "_astro asset introuvable dans le HTML (build non présent ?)"
fi
check_header "/fonts/* → immutable (si fonts présents)" "$BASE/fonts/" "" "cache-control.*immutable" 2>/dev/null || true
check_header "/logos/*.png → immutable" "$BASE/logos/ddd.png" "" "cache-control.*immutable" 2>/dev/null || true

# ── 5. En-têtes de sécurité ─────────────────────────
h1 "5. En-têtes de sécurité"
check_header "X-Frame-Options: DENY" "$BASE/" "" "x-frame-options.*DENY"
check_header "X-Content-Type-Options: nosniff" "$BASE/" "" "x-content-type-options.*nosniff"
check_header "Referrer-Policy" "$BASE/" "" "referrer-policy"
check_header "Permissions-Policy" "$BASE/" "" "permissions-policy"
check_header "CSP définie" "$BASE/" "" "content-security-policy"
# Vérifie que la CSP contient les origines critiques
csp=$(curl -sI "$BASE/" | grep -i "^content-security-policy:" | tr -d '\r')
if echo "$csp" | grep -q "iconify.design"; then ok "CSP — iconify.design présent"; else fail "CSP — iconify.design manquant"; fi
if echo "$csp" | grep -q "fonts.googleapis.com"; then ok "CSP — fonts.googleapis.com présent"; else fail "CSP — fonts.googleapis.com manquant"; fi
if echo "$csp" | grep -q "form-action 'self'"; then ok "CSP — form-action 'self' présent"; else fail "CSP — form-action 'self' manquant"; fi

# ── 6. Link headers RFC 8288 ─────────────────────────
h1 "6. Link headers RFC 8288"
link_root=$(curl -sI "$BASE/" | grep -i "^link:" | tr -d '\r' | tr '\n' ' ')
echo "  Link headers /: $link_root"
if echo "$link_root" | grep -q "api-catalog"; then ok "/ → api-catalog"; else fail "/ → api-catalog manquant"; fi
if echo "$link_root" | grep -q "agent-skills"; then ok "/ → agent-skills"; else fail "/ → agent-skills manquant"; fi
if echo "$link_root" | grep -q "cv\.md"; then ok "/ → cv.md alternate"; else fail "/ → cv.md alternate manquant"; fi
if echo "$link_root" | grep -q "sitemap"; then ok "/ → sitemap"; else fail "/ → sitemap manquant"; fi

# ── 7. .well-known ───────────────────────────────────
h1 "7. Agent discovery (.well-known)"
check_status "/.well-known/api-catalog → 200" "$BASE/.well-known/api-catalog" "200"
check_header "api-catalog Content-Type" "$BASE/.well-known/api-catalog" "" "content-type.*linkset"
check_status "/.well-known/agent-skills/index.json → 200" "$BASE/.well-known/agent-skills/index.json" "200"
check_header "agent-skills/index.json Content-Type" "$BASE/.well-known/agent-skills/index.json" "" "content-type.*json"

# ── 8. Infra ─────────────────────────────────────────
h1 "8. Infra"
check_status "/sitemap.xml → 200" "$BASE/sitemap.xml" "200"
check_status "/robots.txt → 200" "$BASE/robots.txt" "200"
check_status "/sw.js → 200" "$BASE/sw.js" "200"
check_status "Route inexistante → 404" "$BASE/cette-page-nexiste-pas-123" "404"

# ── 9. Formulaire de contact ─────────────────────────
h1 "9. Formulaire de contact (/api/contact)"

# Honeypot — le champ bot-field est rempli → doit retourner 200 sans envoyer d'email
honeypot_code=$(curl -so /dev/null -w "%{http_code}" -X POST "$BASE/api/contact" \
  -d "bot-field=spam&name=Bot&email=bot@spam.com&subject=Test&message=Spam")
if [[ "$honeypot_code" == "200" ]]; then ok "Honeypot → 200 (silencieux)"; else fail "Honeypot → attendu 200, reçu $honeypot_code"; fi

# Champs manquants → 400
missing_code=$(curl -so /dev/null -w "%{http_code}" -X POST "$BASE/api/contact" \
  -d "name=Test")
if [[ "$missing_code" == "400" ]]; then ok "Champs manquants → 400"; else fail "Champs manquants → attendu 400, reçu $missing_code"; fi

# Email invalide → 400
invalid_email_code=$(curl -so /dev/null -w "%{http_code}" -X POST "$BASE/api/contact" \
  -d "name=Test&email=pasunemail&subject=Test&message=Test")
if [[ "$invalid_email_code" == "400" ]]; then ok "Email invalide → 400"; else fail "Email invalide → attendu 400, reçu $invalid_email_code"; fi

# Soumission réelle — décommenter quand les secrets RESEND_API_KEY + CONTACT_TO sont configurés
# real_code=$(curl -so /dev/null -w "%{http_code}" -X POST "$BASE/api/contact" \
#   -d "name=Validation+CF+Pages&email=test@example.com&subject=Test+migration+CF+Pages&message=Soumission+de+validation+pre-cutover")
# if [[ "$real_code" == "200" ]]; then ok "Soumission réelle → 200 (vérifier boîte mail)"; else fail "Soumission réelle → $real_code"; fi

echo
echo "───────────────────────────────────────────────────"
echo "  Résultat : $PASS ✅  $FAIL ❌"
echo "───────────────────────────────────────────────────"

if [[ $FAIL -gt 0 ]]; then
  echo "  ⚠️  $FAIL test(s) échoué(s) — ne pas basculer le DNS avant correction."
  exit 1
else
  echo "  🚀 Tous les tests passent — prêt pour le cutover DNS."
fi
