// lib/contactStore.ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE!;

if (!url || !key) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE');
}

const supabase = createClient(url, key);

// lib/contactStore.ts (keep your imports/env checks)
export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  ip: string | null;
  ua: string | null;
}
export interface NewSubmission {
  name: string;
  email: string;
  message: string;
  ip: string | null;
  ua: string | null;
}

function hasStringId(x: unknown): x is { id: string } {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.id === 'string';
}

export async function appendSubmission(input: NewSubmission): Promise<string> {
  const res = await supabase.from('contact_submissions').insert([input]).select('id').single();
  if (res.error) throw new Error(res.error.message);
  const row = res.data;
  if (!hasStringId(row)) throw new Error('Insert did not return id');
  return row.id;
}

function toSubmission(x: unknown): Submission | null {
  if (typeof x !== 'object' || x === null) return null;
  const o = x as Record<string, unknown>;
  if (
    typeof o.id !== 'string' ||
    typeof o.name !== 'string' ||
    typeof o.email !== 'string' ||
    typeof o.message !== 'string' ||
    typeof o.created_at !== 'string'
  ) return null;

  type AnyRecord = Record<string, unknown>;

  function toRecord(v: unknown): AnyRecord {
  return typeof v === 'object' && v !== null ? (v as AnyRecord) : {};
  }

  function strOrNull(v: unknown): string | null {
    return typeof v === 'string' ? v : null;
  }

  // wherever you had `o` (likely from a parsed payload)
  const obj = toRecord(o);

  const ip = strOrNull(obj.ip);
  const ua = strOrNull(obj.ua);

  return { id: o.id, name: o.name, email: o.email, message: o.message, created_at: o.created_at, ip, ua };
}

export async function listSubmissions(): Promise<Submission[]> {
  const res = await supabase
    .from('contact_submissions')
    .select('id,name,email,message,created_at,ip,ua')
    .order('created_at', { ascending: false });

  if (res.error) throw new Error(res.error.message);
  const unknownRows: unknown = res.data;
  if (!Array.isArray(unknownRows)) return [];
  return unknownRows.map(toSubmission).filter((x): x is Submission => x !== null);
}
