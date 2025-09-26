// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { appendSubmission, listSubmissions } from '@/lib/contactStore';

interface ApiOk { success: true; message: string; id?: string }
interface ApiErr { success: false; error: string }

function getField(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === 'string' ? v : '';
}
function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unexpected error';
}

function getClientIp (req: NextRequest): string | null {
  // 1) Standard proxy header — may contain a list: "client, proxy1, proxy2"
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }

  // 2) Nginx / some proxies
  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp;

  // 3) Vercel/Next sometimes exposes req.ip at runtime but types lag
  //    We guard with a runtime check to keep TS happy.
  const maybeIp = (req as unknown as { ip?: unknown }).ip;
  if (typeof maybeIp === 'string' && maybeIp.length > 0) return maybeIp;

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get('content-type') ?? '';
    if (!/multipart\/form-data|application\/x-www-form-urlencoded/i.test(ct)) {
      return NextResponse.json<ApiErr>(
        { success: false, error: 'Unsupported Content-Type' },
        { status: 415 },
      );
    }

    const fd = await req.formData();
    const name = getField(fd, 'name');
    const email = getField(fd, 'email');
    const message = getField(fd, 'message');

    if (!name || !email || !message) {
      return NextResponse.json<ApiErr>(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const ip = getClientIp(req);
    const ua = req.headers.get('user-agent') ?? null;

    const id = await appendSubmission({ name, email, message, ip, ua });
    return NextResponse.json<ApiOk>({ success: true, message: 'Saved', id }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json<ApiErr>(
      { success: false, error: errorMessage(err) },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (req.headers.get('x-admin-token') !== process.env.ADMIN_TOKEN) {
      return NextResponse.json<ApiErr>({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const items = await listSubmissions();
    return NextResponse.json({ success: true, items } as const, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json<ApiErr>(
      { success: false, error: errorMessage(err) },
      { status: 500 },
    );
  }
}
