// app/submissions/page.tsx
import {prisma} from "@/lib/prisma";

export const revalidate = 0;       // always fresh
export const dynamic = "force-dynamic";

type Search = { [k: string]: string | string[] | undefined };

export default async function SubmissionsPage({ searchParams }: { searchParams: Search }) {
  const adminKey = process.env.ADMIN_KEY;
  const key = (searchParams?.key ?? "") as string;

  if (!adminKey) {
    return (
      <div className="max-w-4xl mx-auto container-px py-12">
        <h1 className="text-2xl font-bold">Submissions</h1>
        <p className="mt-2">Set <code>ADMIN_KEY</code> in your <code>.env</code> to enable this page.</p>
      </div>
    );
  }
  if (key !== adminKey) {
    return (
      <div className="max-w-4xl mx-auto container-px py-12">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-2">Append <code>?key=YOUR_ADMIN_KEY</code> to the URL.</p>
      </div>
    );
  }

  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="max-w-6xl mx-auto container-px py-12">
      <h1 className="text-3xl font-bold mb-6">Submissions</h1>

      {rows.length === 0 ? (
        <p className="opacity-80">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto border border-brand-border rounded-2xl">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-muted">
              <tr className="text-left">
                <th className="p-3">When</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Message</th>
                <th className="p-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-brand-border align-top">
                  <td className="p-3 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phone ?? "—"}</td>
                  <td className="p-3">
                    <div className="max-w-[40ch] whitespace-pre-wrap break-words">
                      {r.message}
                    </div>
                  </td>
                  <td className="p-3 text-xs opacity-70">{r.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
