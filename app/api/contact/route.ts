import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAILS = ["tim@inlandtide.com", "ryan@inlandtide.com"];

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API);

  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    let sheetsSaved = false;
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (!sheetsUrl) {
      console.error("GOOGLE_SHEETS_WEBAPP_URL is not set.");
    } else {
      try {
        const sheetsRes = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(name),
            email: String(email),
            phone: String(phone ?? ""),
            message: String(message),
          }),
        });

        if (sheetsRes.ok) {
          sheetsSaved = true;
          console.log("Lead saved to Google Sheets successfully.");
        } else {
          const sheetsText = await sheetsRes.text().catch(() => "(no body)");
          console.error("Google Sheets error:", sheetsRes.status, sheetsText);
        }
      } catch (sheetsErr) {
        console.error("Google Sheets fetch threw an exception:", sheetsErr);
      }
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safeMessage = escapeHtml(message);

    const sheetsAlertBanner = !sheetsSaved
      ? `
        <div style="background: #7f1d1d; border: 2px solid #ef4444; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
          <p style="color: #fecaca; font-family: Georgia, serif; font-size: 15px; font-weight: bold; margin: 0; letter-spacing: 1px;">
            GOOGLE SHEETS DID NOT SAVE THIS LEAD
          </p>
          <p style="color: #fca5a5; font-family: Georgia, serif; font-size: 13px; margin: 8px 0 0 0;">
            The backup spreadsheet may be broken or misconfigured. Please check the Google Apps Script and Vercel environment variables immediately.
          </p>
        </div>
      `
      : "";

    const { data, error } = await resend.emails.send({
      from: "Moulding Saint Louis <contact@mouldingstl.com>",
      to: NOTIFY_EMAILS,
      replyTo: String(email),
      subject: sheetsSaved
        ? `New Consultation Request — ${String(name)}`
        : `⚠️ [SHEETS FAILED] New Consultation Request — ${String(name)}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; background: #081828; color: #FEFAF1; padding: 34px; border: 1px solid #B4904E;">
          <h2 style="color: #B4904E; margin-top: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">
            New Consultation Request
          </h2>
          <p style="color: #FEFAF1; line-height: 1.6; margin-top: 0;">
            A new Moulding Saint Louis inquiry was submitted through mouldingstl.com.
          </p>
          <hr style="border: 0; border-top: 1px solid #B4904E; margin: 24px 0;" />

          ${sheetsAlertBanner}

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
            Moulding Saint Louis — mouldingstl.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email. Please try again.", detail: error },
        { status: 500 }
      );
    }

    console.log("Notification email sent successfully, id:", data?.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
