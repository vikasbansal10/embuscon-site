// lib/contactStore.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE');
}

// Server-side client with service role key (DO NOT expose to browser)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

export type InsertInput = {
  name: string;
  email: string;
  message: string;
  ip?: string | null;
  ua?: string | null;
};

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  ts: string;           // timestamptz ISO
  ip: string | null;
  ua: string | null;
};

export async function appendSubmission(input: InsertInput): Promise<ContactRow> {
  const toInsert = {
    name: input.name,
    email: input.email,
    message: input.message,
    ip: input.ip ?? null,
    ua: input.ua ?? null,
  };

  const { data, error } = await supabase
    .from('contacts')
    .insert([toInsert])
    .select('*')        // ← return full row
    .single();          // ← exactly one

  if (error) {
    // surface clear error up to the route
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
  if (!data) {
    throw new Error('Supabase insert returned no data');
  }
  return data as ContactRow;
}

export async function readAll(): Promise<ContactRow[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('ts', { ascending: false });

  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  return (data ?? []) as ContactRow[];
}
