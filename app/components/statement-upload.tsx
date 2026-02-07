'use client';

import { FormEvent, useState } from 'react';

type ApiResponse = {
  count?: number;
  note?: string;
  error?: string;
};

export function StatementUpload() {
  const [message, setMessage] = useState('Upload CSV statement for auto-analysis (PDF pipeline can be added).');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setMessage('Parsing statement...');

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: formData
    });

    const payload = (await response.json()) as ApiResponse;

    if (!response.ok) {
      setMessage(payload.error ?? 'Unable to parse statement.');
    } else {
      setMessage(`Imported ${payload.count ?? 0} rows. ${payload.note ?? ''}`);
      form.reset();
    }

    setLoading(false);
  }

  return (
    <article className="panel">
      <h3>Expense Upload</h3>
      <form onSubmit={onSubmit} className="upload-form">
        <input name="statement" type="file" accept=".csv" required />
        <button type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Upload statement'}</button>
      </form>
      <p className="muted">{message}</p>
    </article>
  );
}
