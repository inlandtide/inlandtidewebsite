import { createHash } from "node:crypto";
import type { summarizeAttribution } from "./lead-attribution";

const NOTIFY_EMAILS = ["tim@inlandtide.com", "ryan@inlandtide.com"];
export type ContactLead = { name: string; email: string; phone: string; message: string; attribution: ReturnType<typeof summarizeAttribution> };

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function notification(lead: ContactLead, reference: string, crmFailed: boolean) {
  const { name, email, phone, message, attribution } = lead;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safeMessage = escapeHtml(message);
    const attributionRows = [
      ["Lead source", attribution.leadSource], ["Campaign", attribution.campaign || "Not provided"],
      ["Source / medium", attribution.sourceMedium || "Unknown"], ["First source", attribution.firstSource || "Unknown"],
      ["Landing page", attribution.landingPage || "Unknown"], ["Referring site", attribution.referringSite || "Not provided"],
    ].map(([label, value]) => `<tr><td style="padding: 7px 0; color: #B4904E; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 7px 0; color: #FEFAF1; overflow-wrap: anywhere;">${escapeHtml(value)}</td></tr>`).join("");

    const crmAlertBanner = crmFailed
      ? `
        <div style="background: #7f1d1d; border: 2px solid #ef4444; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
          <p style="color: #fecaca; font-family: Georgia, serif; font-size: 15px; font-weight: bold; margin: 0; letter-spacing: 1px;">
            CRM SAVE WAS NOT CONFIRMED
          </p>
          <p style="color: #fca5a5; font-family: Georgia, serif; font-size: 13px; margin: 8px 0 0 0;">
            Your original notification email contains this lead. The CRM save could not be confirmed after retries. This email contains the full inquiry and its reference. Check Form Submission Archives before adding it manually.
          </p>
        </div>
      `
      : "";

    return {
      from: "Moulding Saint Louis <contact@mouldingstl.com>",
      to: NOTIFY_EMAILS,
      reply_to: String(email),
      subject: !crmFailed
        ? `New Consultation Request [${attribution.leadSource}] — ${String(name)}`
        : `⚠️ [CHECK CRM] New Consultation Request [${attribution.leadSource}] — ${String(name)}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; background: #081828; color: #FEFAF1; padding: 34px; border: 1px solid #B4904E;">
          <h2 style="color: #B4904E; margin-top: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
            New Consultation Request
          </h2>
          <p style="color: #FEFAF1; line-height: 1.6; margin-top: 0;">
            A new Moulding Saint Louis inquiry was submitted through mouldingstl.com. The CRM is updated in the background; this email is your copy of the lead.
          </p>
          <hr style="border: 0; border-top: 1px solid #B4904E; margin: 24px 0;" />

          ${crmAlertBanner}

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">${attributionRows}</table>
          <p style="font-size: 12px; line-height: 1.6; color: #FEFAF1;">${escapeHtml(attribution.attributionDetails)}</p>
          <hr style="border: 0; border-top: 1px solid #B4904E; margin: 24px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 9px 0; color: #B4904E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
              <td style="padding: 9px 0; color: #FEFAF1;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #B4904E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 9px 0; color: #FEFAF1;"><a href="mailto:${safeEmail}" style="color: #B4904E;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 9px 0; color: #B4904E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 9px 0; color: #FEFAF1;">${safePhone}</td>
            </tr>
          </table>

          <hr style="border: 0; border-top: 1px solid #B4904E; margin: 22px 0;" />

          <p style="color: #B4904E; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Project Details</p>
          <p style="color: #FEFAF1; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>

          <hr style="border: 0; border-top: 1px solid #B4904E; margin-top: 26px;" />
          <p style="color: #B4904E; font-size: 11px; text-align: center; margin-bottom: 0; letter-spacing: 1px;">
            Moulding Saint Louis — mouldingstl.com<br />Reference: ${escapeHtml(reference)}
          </p>
        </div>
      `,
    };
}


// Profile-aware delivery retains a durable original before acknowledging. During
// a CRM outage the independent email service remains an emergency lead copy.
async function sendProfileNotification(lead: ContactLead, reference: string, crmFailed: boolean, mail: ReturnType<typeof notification> & {text?: string}, fetcher: typeof fetch, env: NodeJS.ProcessEnv, logger: Pick<Console, "error">): Promise<boolean | null> {
  if (env.CRM_NOTIFICATION_PREFERENCES !== "true") return null;
  const event = crmFailed ? "crm-alert" : "notification";
  const payload = { externalId: reference, name: lead.name, email: lead.email, phone: lead.phone,
    message: lead.message, campaign: lead.attribution.campaign, sourceLabel: lead.attribution.leadSource, attribution: lead.attribution };
  try {
    const response = await fetcher("https://crm.ckcwoodworks.com/api/intake/website_msl/notify", {
      method: "POST", headers: { "Content-Type": "application/json", "x-crm-key": env.CRM_INGEST_SECRET || "" },
      body: JSON.stringify({ reference, crmFailed, lead: payload, mail }), signal: AbortSignal.timeout(25000), redirect: "error",
    });
    const receipt = await response.json().catch(() => null);
    if (response.ok && receipt?.accepted === true && receipt?.integration === "crm_notification_preferences_v1") return true;
    // An identity conflict must never send different content under the same key.
    if (response.status === 409) return false;
  } catch { /* Fall through to independent email; never log contact details. */ }
  logger.error("CRM notification broker unavailable; using emergency email", { reference, crmFailed });
  if (!env.RESEND_API) return false;
  const results = await Promise.all(NOTIFY_EMAILS.map(async recipient => {
    try {
      const id = createHash("sha256").update(`website-notice:website_msl:${reference}:${event}:${recipient}`).digest("hex");
      const response = await fetcher("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API}`, "Content-Type": "application/json", "Idempotency-Key": "ckc-crm-" + id },
        body: JSON.stringify({ ...mail, to: [recipient], text: mail.text || lead.message }), signal: AbortSignal.timeout(10000),
      });
      const receipt = await response.json().catch(() => null);
      return response.ok && typeof receipt?.id === "string" && receipt.id.length > 0;
    } catch { return false; }
  }));
  return results.every(Boolean);
}

// Bound external requests so a slow integration cannot consume the whole invocation.
// Log references and timing only, never the submitted personal information.
export async function sendNotification(lead: ContactLead, reference: string, crmFailed = false) {
  const profileResult = await sendProfileNotification(lead, reference, crmFailed, notification(lead, reference, crmFailed), fetch, process.env, console);
  if (profileResult !== null) return profileResult;
  const started = Date.now();
  if (!process.env.RESEND_API) {
    console.error("Contact email not configured", { reference });
    return false;
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${reference}/${crmFailed ? "crm-alert" : "notification"}`,
      },
      body: JSON.stringify(notification(lead, reference, crmFailed)),
      signal: AbortSignal.timeout(10000),
    });
    const receipt = await response.json().catch(() => null);
    const accepted = response.ok && typeof receipt?.id === "string" && receipt.id.length > 0;
    console[accepted ? "info" : "error"]("Contact email receipt", { reference, accepted, crmFailed, status: response.status, durationMs: Date.now() - started });
    return accepted;
  } catch {
    console.error("Contact email request failed or timed out", { reference, crmFailed, durationMs: Date.now() - started });
    return false;
  }
}

export async function saveToCRM(lead: ContactLead, reference: string) {
  const key = process.env.CRM_INGEST_SECRET;
  if (!key) { console.error('CRM delivery is not configured', { reference }); return false; }
  const payload = {
    externalId: reference, name: lead.name, email: lead.email, phone: lead.phone,
    message: lead.message, campaign: lead.attribution.campaign,
    sourceLabel: lead.attribution.leadSource, attribution: lead.attribution,
  };
  // A lost response may follow a committed save. Every retry keeps the same ID
  // and content; the CRM acknowledges that receipt without creating another lead.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const started = Date.now();
    try {
      const response = await fetch('https://crm.ckcwoodworks.com/api/intake/website_msl', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-crm-key': key },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(8000), redirect: 'error',
      });
      const receipt = await response.json().catch(() => null);
      const saved = response.ok && receipt?.status === 'success' && receipt?.integration === 'crm_intake_v1' && typeof receipt?.id === 'string';
      console[saved ? 'info' : 'error']('CRM delivery receipt', { reference, saved, attempt, status: response.status, durationMs: Date.now() - started });
      if (saved) return true;
      if (response.status >= 400 && response.status < 500 && ![408, 429].includes(response.status)) return false;
    } catch { console.error('CRM delivery request failed or timed out', { reference, attempt }); }
  }
  return false;
}
