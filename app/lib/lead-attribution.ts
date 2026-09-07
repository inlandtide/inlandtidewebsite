// First-party, best-effort attribution; no cross-device or view-through matching.
export const ATTRIBUTION_TTL = 30 * 24 * 60 * 60 * 1000;
export type Touch = {
  source: string; medium: string; campaign: string; content: string; term: string;
  landingPage: string; referrer: string; capturedAt: number;
  signal: "utm" | "google-click" | "meta-click" | "referrer" | "direct";
};
export type Attribution = { first: Touch; lastNonDirect: Touch | null };
const origin = "https://mouldingstl.com";
const text = (value: unknown, max = 160) => typeof value === "string"
  ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";
const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const isHost = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);
const ownHost = (host: string) => isHost(host, "mouldingstl.com");
function url(value: unknown) {
  try { const parsed = new URL(text(value, 2000)); return /^https?:$/.test(parsed.protocol) ? parsed : null; }
  catch { return null; }
}
function path(value: unknown) {
  const raw = text(value, 500);
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return new URL(raw, origin).pathname.slice(0, 500);
}
function searchSource(host: string) {
  if (/^(www\.)?google\.(com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(host)) return "google";
  for (const engine of ["bing.com", "duckduckgo.com", "search.yahoo.com", "search.brave.com", "ecosia.org"])
    if (isHost(host, engine)) return engine;
  return "";
}
const metaSource = (source: string) => ["meta", "metaads", "facebook", "fb", "instagram", "ig", "an", "messenger", "facebook.com", "instagram.com"].includes(source);
const paidMedium = (medium: string) => /^(cpc|ppc|paid|paid[_ -]?social|social[_ -]?ads|paid[_ -]?search|display|cpm)$/.test(medium);

export function captureTouch(href: string, referringUrl: string, now = Date.now()): Touch {
  const page = url(href);
  const params = page?.searchParams ?? new URLSearchParams();
  const ref = url(referringUrl);
  const host = ref && !ownHost(ref.hostname) && ref.origin !== page?.origin ? ref.hostname : "";
  const touch: Touch = {
    source: text(params.get("utm_source")).toLowerCase(), medium: text(params.get("utm_medium")).toLowerCase(),
    campaign: text(params.get("utm_campaign")), content: text(params.get("utm_content")), term: text(params.get("utm_term")),
    landingPage: page?.pathname.slice(0, 500) || "/", referrer: host, capturedAt: now, signal: "direct",
  };
  if (["gclid", "gbraid", "wbraid"].some(key => params.get(key))) {
    touch.source = "google"; touch.medium = "cpc"; touch.signal = "google-click";
  } else if (touch.source || touch.medium) {
    touch.signal = "utm";
  } else if (params.get("fbclid")) {
    touch.source = "meta"; touch.medium = "social (paid/organic unknown)"; touch.signal = "meta-click";
  } else if (host) {
    const search = searchSource(host);
    touch.source = search || host;
    touch.medium = search ? "organic" : "referral";
    touch.signal = "referrer";
  } else {
    touch.source = "direct"; touch.medium = "unknown";
  }
  return touch;
}

function normalizeTouch(value: unknown, now: number): Touch | null {
  const item = record(value);
  if (typeof item.capturedAt !== "number" || !Number.isFinite(item.capturedAt) ||
    item.capturedAt > now + 60000 || now - item.capturedAt > ATTRIBUTION_TTL) return null;
  if (!["utm", "google-click", "meta-click", "referrer", "direct"].includes(String(item.signal))) return null;
  return {
    source: text(item.source).toLowerCase(), medium: text(item.medium).toLowerCase(),
    campaign: text(item.campaign), content: text(item.content), term: text(item.term),
    landingPage: path(item.landingPage), referrer: url(`https://${text(item.referrer)}`)?.hostname || "",
    capturedAt: item.capturedAt, signal: item.signal as Touch["signal"],
  };
}

export function normalizeAttribution(value: unknown, now = Date.now()): Attribution | null {
  const item = record(value);
  const first = normalizeTouch(item.first, now);
  const last = normalizeTouch(item.lastNonDirect, now);
  const lastNonDirect = last?.signal !== "direct" ? last : null;
  return first || lastNonDirect ? { first: first ?? lastNonDirect!, lastNonDirect } : null;
}

export function advanceAttribution(previous: unknown, touch: Touch): Attribution {
  const saved = normalizeAttribution(previous, touch.capturedAt);
  return { first: saved?.first ?? touch, lastNonDirect: touch.signal === "direct" ? saved?.lastNonDirect ?? null : touch };
}

export function channel(touch: Touch): string {
  if (touch.signal === "google-click") return "Google Ads";
  if (touch.signal === "direct") return "Direct / unknown";
  if (touch.signal === "meta-click") return "Meta social (paid/organic unknown)";
  if (metaSource(touch.source) && paidMedium(touch.medium)) return "Meta Ads";
  if (["google", "google.com", "googleads"].includes(touch.source) && paidMedium(touch.medium)) return "Google Ads";
  if (touch.medium === "organic") return "Organic search / SEO";
  if (paidMedium(touch.medium)) return "Other paid campaign";
  if (metaSource(touch.source) || isHost(touch.source, "facebook.com") || isHost(touch.source, "instagram.com")) return "Meta social (paid/organic unknown)";
  if (touch.medium === "email") return "Email campaign";
  return touch.signal === "utm" ? "Other tagged campaign" : "Referral";
}

export function summarizeAttribution(value: unknown, now = Date.now()) {
  const data = normalizeAttribution(value, now);
  const selected = data?.lastNonDirect ?? data?.first;
  return {
    leadSource: selected ? channel(selected) : "Direct / unknown",
    campaign: selected?.campaign || "",
    sourceMedium: selected ? `${selected.source || "unknown"} / ${selected.medium || "unknown"}` : "",
    firstSource: data ? channel(data.first) : "",
    landingPage: selected?.landingPage || "",
    referringSite: selected?.referrer || "",
    attributionDetails: selected ? [
      "Last identifiable source within 30 days; browser-reported estimate",
      `Observed: ${new Date(selected.capturedAt).toISOString()}`,
      `Evidence: ${selected.signal}`,
      selected.content && `Ad/content: ${selected.content}`,
      selected.term && `Term: ${selected.term}`,
    ].filter(Boolean).join("; ") : "No usable attribution available; not proof of a direct visit",
  };
}
