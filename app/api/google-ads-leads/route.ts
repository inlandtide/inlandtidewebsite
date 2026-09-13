import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

// Google retries 5xx responses. A successful HTTP request to Apps Script alone
// is not a receipt: its error pages and application errors can also return 200.
export async function POST(req: NextRequest) {
  const key = process.env.GOOGLE_ADS_LEAD_WEBHOOK_KEY;
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!key || !sheetsUrl) {
    return NextResponse.json({ message: "Lead integration unavailable" }, { status: 503 });
  }

  let body;
  try {
    const text = await req.text();
    if (Buffer.byteLength(text, "utf8") > 100_000) {
      return NextResponse.json({ message: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const supplied = Buffer.from(typeof body?.google_key === "string" ? body.google_key : "");
  const expected = Buffer.from(key);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (typeof body.lead_id !== "string" || !body.lead_id.trim() || body.lead_id.length > 2000 ||
      !Array.isArray(body.user_column_data) || body.user_column_data.length > 100 ||
      (body.is_test !== undefined && typeof body.is_test !== "boolean")) {
    return NextResponse.json({ message: "Invalid lead payload" }, { status: 400 });
  }

  try {
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(45_000),
      redirect: "follow",
    });
    const receipt = await response.json().catch(() => null);
    if (!response.ok || receipt?.status !== "success" ||
        receipt?.integration !== "google_ads_lead_forms_v1") {
      return NextResponse.json({ message: "Lead storage unavailable; retry delivery" }, { status: 502 });
    }
    return NextResponse.json({});
  } catch {
    // Never log the request, contact details, webhook key, or receiver URL.
    return NextResponse.json({ message: "Lead storage unavailable; retry delivery" }, { status: 503 });
  }
}
