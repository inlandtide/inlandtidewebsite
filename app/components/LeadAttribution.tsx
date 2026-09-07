"use client";

import { useEffect } from "react";
import { getLeadAttribution } from "../lib/browser-attribution";

export default function LeadAttribution() {
  useEffect(() => { getLeadAttribution(); }, []);
  return null;
}
