// app/api/env-check/route.ts
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ ok: true });
}
