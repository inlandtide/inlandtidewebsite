import { randomUUID } from "node:crypto";
import { after, NextRequest, NextResponse } from "next/server";
import { summarizeAttribution } from "../../lib/lead-attribution";
import { type ContactLead, saveToSheets, sendNotification } from "../../lib/contact-delivery";

// Includes email, spreadsheet fallback and post-response work; external calls have
// shorter timeouts. after() keeps Vercel alive even after the visitor leaves.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const { name, email, phone = "", message } = body;
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim() ||
      typeof message !== "string" || !message.trim() || typeof phone !== "string") {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 254 || phone.length > 100 || message.length > 10000) {
    return NextResponse.json({ error: "Please shorten your form entry and try again." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const reference = randomUUID();
  const lead: ContactLead = { name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim(), attribution: summarizeAttribution(body.attribution) };
  const started = Date.now();
  const emailed = await sendNotification(lead, reference);

  if (emailed) {
    after(async () => {
      // Do not blindly retry an append: a lost receipt may hide a successful save.
      if (!await saveToSheets(lead, reference)) {
        await sendNotification(lead, reference, true);
      }
    });
    console.info("Contact accepted via email", { reference, durationMs: Date.now() - started });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Email is normally the fast durable handoff. During an email outage, wait for
  // a confirmed spreadsheet save instead of claiming receipt or losing the lead.
  if (await saveToSheets(lead, reference)) {
    after(async () => { await sendNotification(lead, reference); });
    console.info("Contact accepted via spreadsheet fallback", { reference, durationMs: Date.now() - started });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json(
    { error: "We couldn’t confirm your request. Please try again or call (314) 818-0815." },
    { status: 503 }
  );
}
