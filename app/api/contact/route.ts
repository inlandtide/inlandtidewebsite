import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAILS = ["tim@inlandtide.com", "ryan@inlandtide.com"];

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API);

  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // --- 1. Validate inputs ---
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

    // --- 2. Send notification email via Resend ---
    const { data, error } = await resend.emails.send({
      from: "Moulding Saint Louis <contact@mouldingstl.com>",
      to: NOTIFY_EMAILS,
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1A0A02; color: #F5ECD7; padding: 32px; border: 1px solid #C9A84C;">
          <h2 style="color: #C9A84C; margin-top: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">
            New Contact Form Submission
          </h2>
          <hr style="border-color: #C9A84C; margin-bottom: 24px;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #F5ECD7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0; color: #F5ECD7;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 8px 0; color: #F5ECD7;">${phone || "—"}</td>
            </tr>
          </table>

          <hr style="border-color: #C9A84C; margin: 20px 0;" />

          <p style="color: #C9A84C; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
          <p style="color: #F5ECD7; line-height: 1.7; white-space: pre-wrap;">${message}</p>

          <hr style="border-color: #C9A84C; margin-top: 24px;" />
          <p style="color: #C9A84C; font-size: 11px; text-align: center; margin-bottom: 0;">
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

    console.log("Email sent successfully, id:", data?.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
