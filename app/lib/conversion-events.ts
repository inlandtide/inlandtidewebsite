import { isPreview } from "./site-environment";

export function trackFormEvent(
  event: "consultation_start" | "consultation_submit" | "consultation_error",
  location: string,
) {
  if (isPreview || typeof window === "undefined") return;
  // Only a fixed event and page/form identifier; never form values or query strings.
  try {
    window.gtag?.("event", event, { form_location: location });
  } catch {
    /* best effort */
  }
}
