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
function notification(lead: ContactLead, reference: string, sheetsFailed: boolean) {
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

    const sheetsAlertBanner = sheetsFailed
      ? `
        <div style="background: #7f1d1d; border: 2px solid #ef4444; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
          <p style="color: #fecaca; font-family: Georgia, serif; font-size: 15px; font-weight: bold; margin: 0; letter-spacing: 1px;">
            GOOGLE SHEETS SAVE WAS NOT CONFIRMED
          </p>
          <p style="color: #fca5a5; font-family: Georgia, serif; font-size: 13px; margin: 8px 0 0 0;">
            Your original notification email contains this lead. Check Web Forms before adding it manually: a timeout can occur after a row is saved. Please check the Google Apps Script integration.
          </p>
        </div>
      `
      : "";

    return {
      from: "Moulding Saint Louis <contact@mouldingstl.com>",
      to: NOTIFY_EMAILS,
      reply_to: String(email),
      subject: !sheetsFailed
        ? `New Consultation Request [${attribution.leadSource}] — ${String(name)}`
        : `⚠️ [CHECK SHEETS] New Consultation Request [${attribution.leadSource}] — ${String(name)}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; background: #081828; color: #FEFAF1; padding: 34px; border: 1px solid #B4904E;">
          <h2 style="color: #B4904E; margin-top: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
            New Consultation Request
          </h2>
          <p style="color: #FEFAF1; line-height: 1.6; margin-top: 0;">
            A new Moulding Saint Louis inquiry was submitted through mouldingstl.com. The spreadsheet is updated separately; this email is your copy of the lead.
          </p>
          <hr style="border: 0; border-top: 1px solid #B4904E; margin: 24px 0;" />

          ${sheetsAlertBanner}

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

// Bound external requests so a slow integration cannot consume the whole invocation.
// Log references and timing only, never the submitted personal information.
export async function sendNotification(lead: ContactLead, reference: string, sheetsFailed = false) {
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
        "Idempotency-Key": `contact/${reference}/${sheetsFailed ? "sheets-alert" : "notification"}`,
      },
      body: JSON.stringify(notification(lead, reference, sheetsFailed)),
      signal: AbortSignal.timeout(10000),
    });
    const receipt = await response.json().catch(() => null);
    const accepted = response.ok && typeof receipt?.id === "string" && receipt.id.length > 0;
    console[accepted ? "info" : "error"]("Contact email receipt", { reference, accepted, sheetsFailed, status: response.status, durationMs: Date.now() - started });
    return accepted;
  } catch {
    console.error("Contact email request failed or timed out", { reference, sheetsFailed, durationMs: Date.now() - started });
    return false;
  }
}

export async function saveToSheets(lead: ContactLead, reference: string) {
  const started = Date.now();
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) {
    console.error("Contact spreadsheet not configured", { reference });
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: lead.name, email: lead.email, phone: lead.phone, message: lead.message, ...lead.attribution }),
      signal: AbortSignal.timeout(20000),
    });
    const receipt = await response.json().catch(() => null);
    const saved = response.ok && receipt?.status === "success";
    console[saved ? "info" : "error"]("Contact spreadsheet receipt", { reference, saved, status: response.status, durationMs: Date.now() - started });
    return saved;
  } catch {
    console.error("Contact spreadsheet request failed or timed out", { reference, durationMs: Date.now() - started });
    return false;
  }
}
