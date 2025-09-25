'use client';
import { useEffect, useState } from 'react';

type Item = {
  id: string;
  name: string;
  email: string;
  message: string;
  ts: string;
  ip?: string | null;
  ua?: string | null;
};

export default function SubmissionsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/contact', { cache: 'no-store' });
        const json = await res.json();
        if (!res.ok || json.success === false) throw new Error(json.error || `HTTP ${res.status}`);
        setItems(json.items || []);
      } catch (e: any) {
        setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact Submissions</h1>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">Error: {err}</p>}
      {!loading && !err && items.length === 0 && <p>No records yet.</p>}
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <strong>{it.name}</strong>
              <span className="text-xs text-gray-500">{new Date(it.ts).toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-600">{it.email}</div>
            <p className="mt-2 whitespace-pre-wrap">{it.message}</p>
            <div className="mt-2 text-xs text-gray-500">
              {it.ip ? `IP: ${it.ip}` : ''} {it.ua ? ` | UA: ${it.ua}` : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
