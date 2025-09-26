// components/ContactForm.tsx
'use client';

import { useState, type FormEvent } from 'react';

interface ApiOk {
  success: true;
  message: string;
  id?: string;
}
interface ApiErr {
  success: false;
  error: string;
}
type ContactApi = ApiOk | ApiErr;

// ---- type guards to safely narrow unknown JSON ----
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const isApiOk = (v: unknown): v is ApiOk =>
  isRecord(v) &&
  v.success === true &&
  typeof v.message === 'string' &&
  (typeof v.id === 'string' || typeof v.id === 'undefined');

const isApiErr = (v: unknown): v is ApiErr =>
  isRecord(v) && v.success === false && typeof v.error === 'string';

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setMessage(null);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const json: unknown = await res.json();

      let data: ContactApi;
      if (isApiOk(json) || isApiErr(json)) {
        data = json;
      } else {
        throw new Error('Malformed server response');
      }

      if (data.success) {
        setMessage(data.message ?? 'Thanks! We received your message.');
        form.reset();
      } else {
        setMessage(data.error ?? 'Something went wrong');
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e); // discard the Promise for lint
      }}
      className="space-y-3"
      aria-busy={sending}
    >
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {sending ? 'Sending…' : 'Send'}
      </button>

      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
