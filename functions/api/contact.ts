/// <reference types="@cloudflare/workers-types" />

// Pages Function — backend du formulaire de contact (remplace Netlify Forms).
// Reçoit le POST du ContactModal, valide les champs, applique un honeypot
// anti-spam, puis envoie un email via l'API Resend.
//
// Secrets / variables d'environnement à configurer côté Cloudflare Pages :
//   - RESEND_API_KEY : clé API Resend (secret)
//   - CONTACT_TO     : adresse email destinataire
//   - CONTACT_FROM   : expéditeur vérifié sur le domaine (ex: "noreply@drouet.io")

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return text("Requête invalide", 400);
  }

  // Honeypot : un humain laisse "bot-field" vide ; un bot le remplit.
  if (form.get("bot-field")) return text("OK", 200);

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
