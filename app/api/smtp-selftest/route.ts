export const runtime = "nodejs";        // needed for Nodemailer
export const dynamic = "force-dynamic"; // avoid caching for diagnostics

import nodemailer from "nodemailer";

interface SafeConfig {
  host: string | undefined;
  port: number;
  secure: boolean;
  user: string | undefined;
  pass_len: number;
  starts_or_ends_quote: boolean;
};

interface OkPayload {
  ok: true;
  config: SafeConfig;
  note: string;
};

interface ErrPayload {
  ok: false;
  config: SafeConfig;
  error: string;
  code?: number;
  smtp?: string;
};

function envBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

function envInt(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function buildTransportOptions(req: Request) {
  const url = new URL(req.url);
  const debugParam = url.searchParams.get("debug"); // /api/smtp-selftest?debug=1
  const debug = debugParam === "1" || envBool(process.env.SMTP_DEBUG, false);

  const secure = envBool(process.env.SMTP_SECURE, true);
  const port = envInt(process.env.SMTP_PORT, secure ? 465 : 587);

  return {
    host: process.env.SMTP_HOST, // e.g., "smtppro.zoho.in"
    port,
    secure,                      // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,           // full mailbox (e.g., no-reply@domain.com)
      pass: process.env.SMTP_PASS,           // App Password (no quotes)
    },
    logger: debug, // prints SMTP dialog to Vercel function logs
    debug,         // same as above
  };
}

function safeSnapshotFromEnv(): SafeConfig {
  const pass = process.env.SMTP_PASS;
  const passLen = typeof pass === "string" ? pass.length : 0;
  const startsOrEndsQuote =
    typeof pass === "string" && (pass.startsWith('"') || pass.startsWith("'") || pass.endsWith('"') || pass.endsWith("'"));

  const secure = envBool(process.env.SMTP_SECURE, true);
  const port = envInt(process.env.SMTP_PORT, secure ? 465 : 587);

  return {
    host: process.env.SMTP_HOST,
    port,
    secure,
    user: process.env.SMTP_USER,
    pass_len: passLen,
    starts_or_ends_quote: startsOrEndsQuote,
  };
}

function extractSmtpError(e: unknown): { message: string; code?: number; smtp?: string } {
  let message = "SMTP verify failed";
  let code: number | undefined;
  let smtp: string | undefined;

  if (e && typeof e === "object") {
    const r = e as Record<string, unknown>;
    if (typeof r.message === "string") message = r.message;
    if (typeof r.responseCode === "number") code = r.responseCode;
    if (typeof r.response === "string") smtp = r.response;
  }
  return { message, code, smtp };
}

export async function GET(req: Request): Promise<Response> {
  const transportOptions = buildTransportOptions(req);
  const transporter = nodemailer.createTransport(transportOptions);

  const safeConfig = safeSnapshotFromEnv();

  try {
    await transporter.verify(); // attempts AUTH with your env vars
    const payload: OkPayload = { ok: true, config: safeConfig, note: "SMTP verify OK" };
    return new Response(JSON.stringify(payload), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e: unknown) {
    const { message, code, smtp } = extractSmtpError(e);
    const payload: ErrPayload = { ok: false, config: safeConfig, error: message, code, smtp };
    return new Response(JSON.stringify(payload), { status: 500, headers: { "content-type": "application/json" } });
  }
}
