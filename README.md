# Embuscon Website Starter

A production‑ready Next.js (App Router) starter wired with:

* **Contact form → Supabase (DB) + Email (SMTP)**
* **Strict TypeScript + Zod validation**
* **ESLint Flat Config (Next.js‑aware) + Prettier‑friendly**
* **Vercel‑ready** (Node runtime, envs, logs)

> 🙏 **Thanks**: This starter was made available by **Embuscon**. If you’re using this template, please keep a short credit — e.g., “Thanks to Embuscon / the GitHub repo owner.”

---

## Quick Start (fresh site in ~5 minutes)

1. **Use this template** → Create your new repo.
2. **Clone & install**

   ```bash
   git clone <your-repo-url>
   cd <repo>
   npm i
   ```
3. **Copy envs**

   ```bash
   cp .env.example .env.local
   ```
4. **Create Supabase project** → copy **Project URL** and **Service Role key**.
5. **Create DB table** (run SQL below in Supabase SQL editor):

   ```sql
   create extension if not exists pgcrypto;
   create table if not exists public.contacts (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     phone text,
     message text not null,
     ip text,
     user_agent text,
     created_at timestamptz default now()
   );
   ```

   > RLS: keep disabled for this table or restrict to service role only (the API in this repo uses the **service role** server‑side only).
6. **Configure email** (pick one):

   * **SMTP (Zoho/Google/M365/etc.)** → add SMTP_* envs
   * **OR Resend** → add `RESEND_API_KEY` and switch the handler (see notes)
7. **Dev**

   ```bash
   npm run dev
   # visit http://localhost:3000 and test the contact form
   ```

---

## Tech Stack

* **Next.js** (App Router) — API route at `/app/api/contact/route.ts`
* **TypeScript** + **Zod** validation
* **Supabase** (server‑side service client for inserts)
* **Email** via **SMTP** (Nodemailer). Resend alternative included in comments.
* **ESLint Flat Config** with Next rules, TypeScript (type‑aware), React Hooks

---

## Environment Variables

Create `.env.local` for local dev and set the same keys in your hosting provider (e.g., Vercel).

### Core

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE=...
```

> **Never** expose the service role to the browser. Do **not** prefix with `NEXT_PUBLIC_`.

### SMTP Option (recommended when you own the mailbox)

```
SMTP_HOST=smtp.zoho.in         # or smtp.zoho.com / smtp.gmail.com / smtp.office365.com ...
SMTP_PORT=587                  # 465 for SMTPS
SMTP_SECURE=                   # empty for 587, "true" for 465
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=<app-password-or-mailbox-password>
CONTACT_FROM=noreply@yourdomain.com
CONTACT_ADMIN_TO=you@yourdomain.com
```

### Resend Option (instead of SMTP)

```
RESEND_API_KEY=...
CONTACT_ADMIN_TO=you@yourdomain.com
```

> If you use Resend, verify your sending domain and switch the mail block in the API route to the Resend code path.

---

## API — Contact form

**File:** `app/api/contact/route.ts`

Flow:

1. Parse body (JSON or multipart/form-data) → 2) Zod validate → 3) Insert into `public.contacts` → 4) Send admin email (+ optional auto‑reply) → 5) Return `{ success, message, id }`.

**Returns 200 on logical errors** (with `{ success:false, error:"..." }`) to simplify client handling. Change to 4xx/5xx if you prefer.

**Node runtime enforced** (`export const runtime = "nodejs"`) so Nodemailer runs on Vercel.

---

## DNS (deliverability)

For your domain in GoDaddy/Cloudflare/etc.:

* **MX** → point to your email provider (e.g., Zoho `mx.zoho.in/.com`)
* **SPF** (TXT) → include your sender (e.g., `include:zoho.in` or `include:_spf.google.com`)
* **DKIM** (CNAME) → from your provider
* **DMARC** (TXT, optional) → recommended

> You **don’t** add an “SMTP record”. SMTP settings live in env variables only.

---

## Scripts

```bash
npm run dev        # start local dev server
npm run build      # production build
npm run start      # run production build locally
npm run lint       # run eslint (flat config)
npm run typecheck  # run ts - no emit
```

---

## Project Structure (excerpt)

```
app/
  api/
    contact/route.ts      # POST handler (DB insert + email)
components/
lib/
  supabaseAdmin.ts        # server-side Supabase client
public/
eslint.config.mjs         # flat config (Next + TS)
```

---

## Deployment (Vercel)

1. Push your repo → **Import** on Vercel.
2. Set the **Environment Variables** from above.
3. **Node version**: set project to **20.x** (recommended) and match `"engines": { "node": "20.x" }` in `package.json`.
4. Deploy. Check **Functions → Logs** if mail or DB fail.

---

## Troubleshooting

* **`535 Authentication Failed`**: wrong SMTP user/pass, wrong data center host, or SMTP disabled for the mailbox. If 2FA is on, use an **app password**. Zoho India vs Global hosts differ: `.zoho.in` vs `.zoho.com`.
* **Email not arriving**: verify **SPF/DKIM**, check spam, confirm `CONTACT_FROM` mailbox exists and is allowed to send.
* **DB insert failed**: confirm table name `public.contacts`, and that your server has correct `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE`.
* **Edge runtime errors**: ensure `export const runtime = "nodejs"` in the API route.

---

## Contributing

PRs are welcome! Please run `npm run lint && npm run typecheck` before submitting.

---

## License

MIT — feel free to use, modify, and distribute.

---

## Acknowledgements

Big thanks to **Embuscon** and the **GitHub repo owner** for making this starter available. If you ship with it, a small credit line in your README/footer is appreciated! 🙌
