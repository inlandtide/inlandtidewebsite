import { advanceAttribution, captureTouch, normalizeAttribution, type Attribution } from "./lead-attribution";

const key = "mouldingstl.lead-attribution.v1";
let memory: Attribution | null = null;
let initialized = false;

export function getLeadAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  if (!initialized) {
    initialized = true;
    let stored: unknown = null;
    try { stored = JSON.parse(window.localStorage.getItem(key) || "null"); } catch { /* Storage may be blocked. */ }
    memory = advanceAttribution(stored, captureTouch(window.location.href, document.referrer));
    try { window.localStorage.setItem(key, JSON.stringify(memory)); } catch { /* Keep this page's attribution in memory. */ }
  }
  return normalizeAttribution(memory);
}
