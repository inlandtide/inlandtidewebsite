# Moulding Saint Louis — Website

Welcome to the repository for the Moulding Saint Louis website. This document provides complete architectural context, integration details, and environment variable requirements for developers or AI agents (like Manus) working on this project in the future.

## 🏗️ Architecture & Infrastructure

This project is built using modern, serverless web technologies designed for high performance and zero-maintenance scaling.

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v4) + raw CSS variables in `globals.css`
*   **Hosting:** [Vercel](https://vercel.com/)
*   **Deployment:** Continuous Deployment (CD) is configured. Any push to the `main` branch on GitHub automatically triggers a build and deployment on Vercel.
*   **Domain:** `mouldingstl.com` (DNS managed via Cloudflare, pointed to Vercel)

## 🔌 Integrations & Data Flow

The site currently features a "Coming Soon" landing page with a contact form. The contact form does not use any client-side processing; it relies entirely on a secure Next.js serverless API route (`/app/api/contact/route.ts`).

The execution order on every form submission is:

1.  **Validate** — Server validates that `name`, `email`, and `message` are present and that the email address is well-formed.
2.  **Attempt Google Sheets save** — The backend tries to POST the lead to Google Sheets. This step is **non-blocking**: if it fails for any reason, execution continues and the failure is noted internally.
3.  **Always send notification email** — The Resend email fires regardless of whether Google Sheets succeeded. If Sheets failed, the email subject is prefixed with `⚠️ [SHEETS FAILED]` and a bold red alert banner is injected at the top of the email body, prompting the team to check the integration immediately.

This design guarantees that **no inbound lead is ever silently lost** due to a Sheets outage.

### Google Sheets Integration
Form data is sent to a Google Apps Script Webhook as a JSON POST request.
*   **Payload keys (all strings):** `name`, `email`, `phone`, `message`
*   **Requirement:** The Apps Script must be deployed with "Execute as: Me" and "Who has access: Anyone" — otherwise Vercel's server-to-server request will receive a 403.

### Email Notifications (Resend)
The [Resend Node.js SDK](https://resend.com/) sends a transactional notification email to the team after every valid submission.
*   **From Address:** `contact@mouldingstl.com` (domain verified in Resend)
*   **To Addresses:** `tim@inlandtide.com`, `ryan@inlandtide.com`
*   **Reply-To:** The visitor's submitted email address, so the team can reply directly from their inbox.

## 🔐 Environment Variables

The following environment variables must be configured in Vercel (or locally in a `.env.local` file) for the backend to function correctly:

| Variable Name | Description |
| :--- | :--- |
| `RESEND_API` | API key for the Resend account. Used to authenticate the Resend Node.js SDK. |
| `GOOGLE_SHEETS_WEBAPP_URL` | Full URL of the deployed Google Apps Script Webhook. |

## 🚀 Getting Started Locally

If you are an AI or developer picking up this project:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/inlandtide/inlandtidewebsite.git
    cd inlandtidewebsite
    ```
2.  **Install dependencies:**
    The project uses `pnpm`.
    ```bash
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the required variables listed above.
4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
5.  **View the site:** Open `http://localhost:3000` in your browser.

---
*Document prepared for future development context.*
