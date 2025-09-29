// /app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import * as nodemailer from "nodemailer";

export const runtime = "nodejs";

const SMTPS_PORT = 465 as const;
const STARTTLS_PORT = 587 as const;

/** Zod schema for incoming contact payload */
const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine((v) => !v || v.length >= 6, {
      message: "If provided, phone should be at least 6 characters.",
    }),
  message: z.string().trim().min(10, "Message should be at least 10 characters."),
});

/** Zod schema for inserted row */
const InsertedRow = z.object({
  id: z.string().uuid(),
});

/** Convert body (JSON or FormData) into a plain object of strings */
async function parseBody(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const json = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(json)) out[k] = typeof v === "string" ? v : "";
    return out;
  }
  const fd = await req.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) out[k] = typeof v === "string" ? v : "";
  return out;
}

/** Escape minimal HTML for safe email rendering */
function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** Strict env reader (avoids non-null assertions, yields clear logs) */
function requireEnv(key: string, fallback?: string): string {
  const v = (process.env[key] ?? fallback ?? "").trim();
  if (!v) throw new Error(`Missing required env: ${key}`);
  return v;
}

function parsePort(raw: string | undefined, dflt = 587): number {
  const p = Number(raw);
  return Number.isFinite(p) && p > 0 ? p : dflt;
}

/** Minimal server-side logger without console.* (avoids no-console) */
function logError(event: string, data: Record<string, unknown>) {
  const line = JSON.stringify({ level: "error", event, ...data }) + "\n";
  process.stderr.write(line);
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // 1) Parse & validate payload
    const raw = await parseBody(req);
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message);
      return NextResponse.json(
        { success: false, error: issues[0] ?? "Invalid data." },
        { status: 200 }
      );
    }
    const { name, email, phone, message } = parsed.data;

    // 2) Collect meta
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ?? undefined;
    const ua = req.headers.get("user-agent") ?? undefined;

    // 3) Insert into Supabase
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contacts")
      .insert({ name, email, phone: phone ?? null, message, ip, user_agent: ua })
      .select("id")
      .single();

    if (error ?? !data) {
      logError("supabase_insert_error", {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      });
      return NextResponse.json(
        { success: false, error: "Database insert failed." },
        { status: 200 }
      );
    }

    // 4) Validate returned row shape
    const row = InsertedRow.parse(data);

    // 5) Send emails via SMTP (admin notification + user ack)
    try {
      const host = requireEnv("SMTP_HOST");
      const user = requireEnv("SMTP_USER");
      const pass = requireEnv("SMTP_PASS");
      const from = requireEnv("CONTACT_FROM", "noreply@embuscon.com");
      const adminTo = requireEnv("CONTACT_ADMIN_TO", "vikas.bansal@embuscon.com");

      const smtpPort = parsePort(process.env.SMTP_PORT, STARTTLS_PORT);
      const smtpSecure =
        (process.env.SMTP_SECURE ?? "").toLowerCase() === "true" || smtpPort === SMTPS_PORT;

      // Build SMTP URL (avoids union-overload typing issues entirely)
      const protocol = smtpSecure ? "smtps" : "smtp";
      const authUser = encodeURIComponent(user);
      const authPass = encodeURIComponent(pass);
      const smtpUrl = `${protocol}://${authUser}:${authPass}@${host}:${smtpPort}`;

      const transporter = nodemailer.createTransport(smtpUrl);

      const htmlAdmin = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
          <hr />
          <p style="color:#666">Submission ID: ${row.id}</p>
          ${ip ? `<p style="color:#666">IP: ${escapeHtml(ip)}</p>` : ""}
          ${ua ? `<p style="color:#666">UA: ${escapeHtml(ua)}</p>` : ""}
        </div>
      `.trim();

      const htmlUser = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for contacting <strong>Embuscon</strong>. We’ve received your message and will get back to you shortly.</p>
          <hr />
          <p><em>Your message:</em></p>
          <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
          <p>Best regards,<br/>Team Embuscon</p>
        </div>
      `.trim();

      // Admin notification
      await transporter.sendMail({
        from,
        to: adminTo,
        subject: `New contact form submission — ${name}`,
        html: htmlAdmin,
        text: `New contact message
Name: ${name}
Email: ${email}
Phone: ${phone ?? "-"}
Message:
${message}

Submission ID: ${row.id}
${ip ? `IP: ${ip}\n` : ""}${ua ? `UA: ${ua}\n` : ""}`,
        replyTo: email,
        headers: { "X-Embuscon-Contact": "v1" },
      });

      // User acknowledgement (best-effort)
      await transporter.sendMail({
        from,
        to: email,
        subject: "We’ve received your message",
        html: htmlUser,
        text: `Hi ${name},

Thanks for contacting Embuscon. We’ve received your message and will get back to you shortly.

---
${message}

Best,
Team Embuscon`,
        headers: { "X-Embuscon-Contact-Ack": "v1" },
      });
    } catch (mailErr: unknown) {
      const err = mailErr instanceof Error ? mailErr : new Error(String(mailErr));
      logError("smtp_send_error", { name: err.name, message: err.message });
      // keep your 200 convention but flag mail failure
      return NextResponse.json({ success: false, error: "Mail send failed." }, { status: 200 });
    }

    // 6) Success response
    return NextResponse.json({
      success: true,
      message: "Thanks! We received your message.",
      id: row.id,
    });
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(String(e));
    logError("api_contact_crashed", { name: err.name, message: err.message, stack: err.stack });
    return NextResponse.json(
      { success: false, error: "Unexpected server error." },
      { status: 200 }
    );
  }
}
