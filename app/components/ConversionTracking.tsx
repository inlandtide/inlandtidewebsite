"use client";
import { useEffect } from "react";
import { isPreview } from "../lib/site-environment";

export default function ConversionTracking() {
  useEffect(() => {
    if (isPreview) return;
    const click = (event: MouseEvent) => {
      const element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cta]")
          : null;
      const id = element?.dataset.cta;
      if (!id || !/^[a-z_]+$/.test(id)) return;
      try {
        window.gtag?.("event", "consultation_cta_click", {
          cta_location: id,
          page_path: window.location.pathname,
        });
      } catch {
        /* best effort */
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
