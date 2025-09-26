// app/submissions/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  ip?: string | null;
  ua?: string | null;
}

type ApiList =
  | { success: true; items: Item[] }
  | { success: false; error: string };

// --- type guards ---
function isItem(u: unknown): u is Item {
  if (typeof u !== 'object' || u === null) return false;
  const o = u as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.email === 'string' &&
    typeof o.message === 'string' &&
    typeof o.created_at === 'string'
  );
}

function isApiList(u: unknown): u is ApiList {
  if (typeof u !== 'object' || u === null) return false;
  const o = u as Record<string, unknown>;

  if (o.success === true && Array.isArray(o.items)) {
    return (o.items as unknown[]).every(isItem);
  }
  if (o.success === false && typeof o.error === 'string') {
    return true;
  }
  return false;
}

export default function SubmissionsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/contact?limit=100', { cache: 'no-store' });

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const raw: unknown = await res.json(); // keep as unknown for safety
        if (cancelled) return;

        if (!isApiList(raw)) {
          throw new Error('Invalid response shape');
        }

        const data: ApiList = raw;
        if (data.success) {
          setItems(data.items);
          setError(null);
        } else {
          setError(data.error);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load submissions');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // satisfy @typescript-eslint/no-floating-promises
    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Submissions</h1>

      {loading ? (
        <p className="text-sm opacity-70">Loading…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-sm opacity-70">No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.id} className="rounded-xl border p-5">
              <div className="font-semibold">
                {i.name} &lt;{i.email}&gt;
              </div>
              <div className="text-sm opacity-80">{new Date(i.created_at).toLocaleString()}</div>
              <p className="mt-2">{i.message}</p>
              {(i.ip ?? i.ua) && (
                <div className="mt-2 text-xs opacity-60">
                  {i.ip ? `IP: ${i.ip}` : null}
                  {i.ip && i.ua ? ' · ' : null}
                  {i.ua ? `UA: ${i.ua}` : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
