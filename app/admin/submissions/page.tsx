'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';

interface Item {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  ip?: string | null;
  ua?: string | null;
}

const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  created_at: z.string(),
  ip: z.string().nullable().optional(),
  ua: z.string().nullable().optional(),
});

const ListRespSchema = z.union([
  z.object({ success: z.literal(true), items: z.array(ItemSchema) }),
  z.object({ success: z.literal(false), error: z.string() }),
]);

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

 useEffect(() => {
  const load = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_CONTACT_ADMIN_TOKEN ?? 'dev-secret-123';
      const res = await fetch('/api/contact', {
        headers: { 'x-admin-token': token },
        cache: 'no-store',
      });

      const raw: unknown = await res.json();
      const parsed = ListRespSchema.safeParse(raw);

      // 1) Schema didn’t match at all
      if (!parsed.success) {
        setErr('Invalid server response');
        return;
      }

      const data = parsed.data;

      // 2) Schema matched the error branch
      if (data.success === false) {
        setErr(data.error ?? 'Unknown error');
        return;
      }

      // 3) Success branch
      setItems(data.items ?? []);
    } catch (e: unknown) {
      // Type-safe catch
      setErr(e instanceof Error ? e.message : 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  // Avoid no-floating-promises
  void load();
}, []);


  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Submissions ({items.length})</h1>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="rounded border p-4">
            <div className="font-medium">{it.name} &lt;{it.email}&gt;</div>
            <div className="opacity-80 whitespace-pre-wrap">{it.message}</div>
            <div className="text-xs opacity-60 mt-2">
              {new Date(it.created_at).toLocaleString()} · IP {it.ip ?? '—'} · UA {it.ua ?? '—'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
