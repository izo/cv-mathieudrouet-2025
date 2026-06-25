/// <reference types="@cloudflare/workers-types" />

// Pages Function — backend du formulaire de contact (remplace Netlify Forms).
// Reçoit le POST du ContactModal, valide les champs, applique plusieurs couches
// anti-abus, puis envoie un email via l'API Resend.
//
// Secrets / variables d'environnement à configurer côté Cloudflare Pages :
//   - RESEND_API_KEY : clé API Resend (secret)
//   - CONTACT_TO     : adresse email destinataire
//   - CONTACT_FROM   : expéditeur vérifié sur le domaine (ex: "noreply@drouet.io")
//
// Pour aller plus loin (si abusé) : Cloudflare Turnstile
//   https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
//   Ajouter TURNSTILE_SECRET dans les secrets CF Pages, puis :
//     const token = form.get("cf-turnstile-response");
//     const ok = await verifyTurnstile(token, env.TURNSTILE_SECRET, request.headers.get("CF-Connecting-IP"));
//     if (!ok) return text("Vérification échouée", 403);

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // 1. Vérification Origin — rejette les requêtes cross-origin et les robots CLI.
  //    Les navigateurs envoient toujours l'Origin sur un fetch cross-origin ou same-origin.
  //    En dev (localhost), on accepte toute origine locale.
  const sentOrigin = request.headers.get("origin") ?? "";
  const expectedOrigin = new URL(request.url).origin;
  const isLocalhost = sentOrigin.startsWith("http://localhost") || sentOrigin.startsWith("http://127.0.0.1");
  if (!isLocalhost && sentOrigin !== expectedOrigin) {
    return text("Forbidden", 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return text("Requête invalide", 400);
  }

  // 2. Honeypot classique : un humain laisse "bot-field" vide ; un bot le remplit.
  if (form.get("bot-field")) return text("OK", 200);

  // 3. Honeypot temporel : le timestamp _t est injecté par JS à l'ouverture de la modal.
  //    Un bot qui soumet sans interagir avec la page aura _t=0 ou un elapsed < 2s.
  const submittedAt = parseInt(clip(form.get("_t"), 20) || "0", 10);
  const elapsed = Date.now() - submittedAt;
  if (!submittedAt || elapsed < 2000 || elapsed > 30 * 60 * 1000) {
    return text("OK", 200); // rejet silencieux, même comportement que le honeypot
  }

  const name = clip(form.get("name"), 200);
  const email = clip(form.get("email"), 200);
  const subject = clip(form.get("subject"), 300);
  const message = clip(form.get("message"), 5000);

  if (!name || !email || !subject || !message) {
    return text("Champs requis manquants", 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return text("Email invalide", 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return text("Service de contact non configuré", 503);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: `cv.drouet.io <${env.CONTACT_FROM ?? "noreply@drouet.io"}>`,
      to: env.CONTACT_TO,
      reply_to: email,
      subject: `Contact CV — ${subject}`,
      text: `De : ${name} <${email}>\nSujet : ${subject}\n\n${message}`,
    }),
  });

  return res.ok ? text("OK", 200) : text("Erreur d'envoi", 502);
};

function clip(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function text(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
