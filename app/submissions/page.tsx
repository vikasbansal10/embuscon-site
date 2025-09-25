// app/submissions/page.tsx
import React from 'react';

// Next 15: searchParams is a Promise you must await.
type SearchParamsPromise = Promise<Record<string, string | string[] | undefined>>;

export default async function SubmissionsPage(
  { searchParams }: { searchParams: SearchParamsPromise }
) {
  const sp = await searchParams; // <-- IMPORTANT
  const q = typeof sp.q === 'string' ? sp.q : '';

  // Example: fetch your list from the same app (server-side, safe to use server env)
  const base =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  const res = await fetch(`${base}/api/contact`, {
    cache: 'no-store',
    headers: { 'x-admin-token': process.env.CONTACT_ADMIN_TOKEN ?? '' },
  });

  const json = (await res.json()) as {
    success: boolean;
    items?: Array<{
      id: string; name: string; email: string; message: string; ts: string;
      ip?: string | null; ua?: string | null;
    }>;
    error?: string;
  };

  if (!res.ok || !json.success) {
    return <p className="p-6 text-red-600">Error: {json.error || `HTTP ${res.status}`}</p>;
  }

  const items = json.items ?? [];

  const filtered = q
    ? items.filter(i =>
        i.name.toLowerCase().includes(q.toLowerCase()) ||
        i.email.toLowerCase().includes(q.toLowerCase()) ||
        i.message.toLowerCase().includes(q.toLowerCase()))
    : items;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Submissions {q ? `(filtered by "${q}")` : ''} ({filtered.length})
      </h1>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No submissions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left border-b">When</th>
                <th className="px-3 py-2 text-left border-b">Name</th>
                <th className="px-3 py-2 text-left border-b">Email</th>
                <th className="px-3 py-2 text-left border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(it => (
                <tr key={it.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-3 py-2 border-b">{new Date(it.ts).toLocaleString()}</td>
                  <td className="px-3 py-2 border-b">{it.name}</td>
                  <td className="px-3 py-2 border-b">{it.email}</td>
                  <td className="px-3 py-2 border-b whitespace-pre-wrap">{it.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// If you define metadata, it must also await searchParams
export async function generateMetadata(
  { searchParams }: { searchParams: SearchParamsPromise }
) {
  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q : '';
  return { title: q ? `Submissions – ${q}` : 'Submissions' };
}
