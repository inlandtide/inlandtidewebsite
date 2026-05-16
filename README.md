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

### 1. Lead Backup (Google Sheets)
To ensure no lead is ever lost due to email delivery failures, the backend first sends the form data to a Google Sheet via a Google Apps Script Webhook.
*   **Payload Structure:** A JSON object containing exactly four string keys: `name`, `email`, `phone`, `message`.
*   **Execution Rule:** The Google Sheets POST request *must* succeed before the system attempts to send the notification email.

### 2. Email Notifications (Resend)
Once the lead is safely stored in Google Sheets, the system uses the [Resend Node.js SDK](https://resend.com/) to dispatch a transactional email alert to the team.
*   **From Address:** `contact@mouldingstl.com` (Domain is verified in Resend).
*   **To Addresses:** `tim@inlandtide.com`, `ryan@inlandtide.com`
*   **Reply-To:** The visitor's submitted email address, allowing the team to reply directly from their inbox.
*   **Error Handling:** If the email fails to send but the Google Sheet save was successful, the API route still returns a `200 OK` to the client so the user is not confused, but logs the Resend error to the Vercel function logs.

## 🔐 Environment Variables

The following environment variables must be configured in Vercel (or locally in a `.env.local` file) for the backend to function correctly:

| Variable Name | Description |
| :--- | :--- |
| `RESEND_API` | The API key for the Resend account. Used to authenticate the Resend Node.js SDK. |
| `GOOGLE_SHEETS_WEBAPP_URL` | The full URL of the deployed Google Apps Script Webhook. Must be deployed to execute as the owner and accessible to "Anyone". |

## 🎨 Brand Guidelines

The site strictly adheres to the Moulding Saint Louis brand guidelines. When making UI changes, maintain these standards:

*   **Primary Background:** Deep Espresso (`#1A0A02`)
*   **Text & Accents:** Antique Gold (`#C9A84C`) and Aged Cream (`#F5ECD7`)
*   **Typography:** 
    *   Headings: *Playfair Display* (via Next.js Google Fonts)
    *   Body: *Lora* (via Next.js Google Fonts)
*   **Logos:** Located in the `/public` directory (`logo.png`, `favicon-logo.png`).

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
