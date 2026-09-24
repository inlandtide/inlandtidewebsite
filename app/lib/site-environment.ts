// Set at build time by next.config.ts; no query string or browser input can
// turn a preview into a production lead submission.
export const isPreview = process.env.NEXT_PUBLIC_SITE_MODE !== "production";
