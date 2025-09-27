import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

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
 const ct = req.headers.get('content-type') ?? '';
  if (ct.includes("application/json")) {
    const json = (await req.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(json)) out[k] = typeof v === "string" ? v : "";
    return out;
  } else {
    const fd = await req.formData();
    const out: Record<string, string> = {};
    for (const [k, v] of fd.entries()) out[k] = typeof v === "string" ? v : "";
    return out;
  }
}

export async function POST(req: Request) {
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
    const ip =
      (req.headers.get("x-forwarded-for") ?? "")
        .split(",")[0]
        ?.trim() || undefined;
    const ua = req.headers.get("user-agent") ?? undefined;

    // 3) Insert into Supabase
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contacts")
      .insert({ name, email, phone: phone ?? null, message, ip, user_agent: ua })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Supabase insert error", {
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

    return NextResponse.json({
      success: true,
      message: "Thanks! We received your message.",
      id: row.id, // ✅ guaranteed string UUID
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("API /contact crashed", {
        name: e.name,
        message: e.message,
        stack: e.stack,
      });
    } else {
      console.error("API /contact crashed with non-error", e);
    }
    return NextResponse.json(
      { success: false, error: "Unexpected server error." },
      { status: 200 }
    );
  }
}
