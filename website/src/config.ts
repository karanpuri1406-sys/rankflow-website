/* ──────────────────────────────────────────────────────────────
   RANKFLOW — SITE CONFIGURATION

   Everything you need to fill in lives in this one file.
   Search for TODO to find anything still outstanding.
   ────────────────────────────────────────────────────────────── */

export const SITE = {
  /* Drives canonical URLs, Open Graph image paths and the sitemap.
     Must match the host the site is actually served from — a canonical
     pointing at a domain you don't control is worse than none at all.

     When a custom domain (e.g. rankflow.co) is connected in Vercel,
     change this to it and redeploy. Nothing else needs touching. */
  url: "https://rankflow-website.vercel.app",

  /* TODO: confirm your Chandigarh postal code. Feeds LocalBusiness schema,
     which is what Google reads for local/map-pack results. */
  postalCode: "160017",

  /* GA4 measurement ID. Set NEXT_PUBLIC_GA_ID in your environment
     (Vercel/Netlify dashboard or .env.local) — analytics stay off until you do. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
};

export const CONTACT = {
  /* WhatsApp number, digits only, country code first, no + or spaces. */
  whatsapp: "917087252700",

  /* Display version of the phone number. */
  phoneDisplay: "+91 70872 52700",

  /* E.164 format for tel: links and schema. Set to "" to hide the call button. */
  phoneE164: "+917087252700",

  email: "hello@rankflow.co",

  /* Formspree form ID — the part after formspree.io/f/ in the endpoint.
     If this is ever emptied the form is replaced by a WhatsApp fallback
     rather than silently failing. */
  formspreeId: "mbdnwkvb",
};

/* Prefilled WhatsApp opener. Keep it short — long text gets truncated on iOS. */
export const WHATSAPP_MESSAGE =
  "Hi Rankflow, I'd like a free check of how my business shows up on Google.";

export const waLink = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

export const formEndpoint = () =>
  CONTACT.formspreeId ? `https://formspree.io/f/${CONTACT.formspreeId}` : "";
