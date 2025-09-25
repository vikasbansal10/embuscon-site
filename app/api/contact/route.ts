// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { appendSubmission, readAll } from '@/lib/contactStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const ct = req.headers.get('content-type') || '';
    let name = '', email = '', message = '';

    if (ct.includes('application/json')) {
      const b = await req.json();
      name = b.name ?? ''; email = b.email ?? ''; message = b.message ?? '';
    } else if (ct.includes('multipart/form-data') || ct.includes('application/x-www-form-urlencoded')) {
      const fd = await req.formData();
      name = String(fd.get('name') || '');
      email = String(fd.get('email') || '');
      message = String(fd.get('message') || '');
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported Content-Type' }, { status: 415 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const row = await appendSubmission({
      name, email, message,
      ip: req.headers.get('x-forwarded-for'),
      ua: req.headers.get('user-agent'),
    });

    return NextResponse.json({ success: true, message: 'Saved', id: row.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const required = process.env.CONTACT_ADMIN_TOKEN;
  if (required && req.headers.get('x-admin-token') !== required) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const items = await readAll();
    return NextResponse.json({ success: true, items }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || 'Read error' }, { status: 500 });
  }
}
