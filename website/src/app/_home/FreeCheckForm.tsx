'use client';

import { useState } from 'react';
import { formEndpoint, waLink } from '@/config';
import s from './home.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELDS = [
  { key: 'name',     label: 'Name',                    type: 'text', ph: 'Your name',                    half: true,  auto: 'name' },
  { key: 'phone',    label: 'WhatsApp number',         type: 'tel',  ph: 'With country code',            half: true,  auto: 'tel' },
  { key: 'website',  label: 'Website',                 type: 'text', ph: 'yourfirm.com',                 half: false, auto: 'url' },
  { key: 'business', label: 'What your business does', type: 'text', ph: 'Accounting firm for startups', half: false, auto: 'organization' },
] as const;

type FieldKey = (typeof FIELDS)[number]['key'];

export default function FreeCheckForm() {
  const [form, setForm] = useState<Record<FieldKey, string>>({ name:'', phone:'', website:'', business:'' });
  const [status, setStatus] = useState<Status>('idle');
  const endpoint = formEndpoint();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) return;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `New Rankflow free check — ${form.business || form.name || 'unnamed'}`,
        }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('sent');
    } catch (err) {
      console.error('Free check form submission failed:', err);
      setStatus('error');
    }
  }

  /* No form backend configured: offer WhatsApp rather than a form that can't send. */
  if (!endpoint) {
    return (
      <div className={s.formPanel}>
        <p className={s.formTitle}>Message us directly</p>
        <p className={s.formNote}>WhatsApp is the quickest way to reach us.</p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnYellow}`}>Open WhatsApp</a>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className={s.formPanel} role="status">
        <p className={s.formTitle}>Got it — thank you!</p>
        <p className={s.formNote}>
          Your free check will reach you on WhatsApp within two working days.
          If it is urgent, <a href={waLink()} target="_blank" rel="noopener noreferrer">message us now</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={s.formPanel}>
      <p className={s.formTitle}>Free check request</p>
      <div className={s.formGrid}>
        {FIELDS.map(f => (
          <div key={f.key} className={f.half ? s.fieldHalf : s.fieldFull}>
            <label htmlFor={`fc-${f.key}`} className={s.label}>{f.label}</label>
            <input id={`fc-${f.key}`} name={f.key} type={f.type} required placeholder={f.ph}
              autoComplete={f.auto} inputMode={f.key === 'website' ? 'url' : undefined}
              value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              className={s.input} />
          </div>
        ))}
      </div>

      {status === 'error' && (
        <p className={s.formError} role="alert">
          That didn&apos;t send.{' '}
          <a href={waLink()} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>{' '}
          and we&apos;ll pick it up straight away.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className={`${s.btn} ${s.btnYellow} ${s.btnBig}`}>
        {status === 'sending' ? 'Sending…' : 'Get my free check!'}
      </button>
      <p className={s.formNote}>We reply once. No lists, no spam.</p>
    </form>
  );
}
