'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(''); setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${api}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message || 'Erreur'); }
      router.push('/login?registered=1');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally { setLoading(false); }
  }

  const fields = [
    { key: 'firstName', label: 'Prénom', type: 'text' },
    { key: 'lastName', label: 'Nom', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'password', label: 'Mot de passe', type: 'password' },
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Neja</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Créer votre compte</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          {error && <p className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>}
          {fields.map(f => (
            <div key={f.key} className="mb-4">
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <button onClick={handleSubmit} disabled={loading}
            className="mt-2 w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
          <p className="mt-4 text-center text-sm text-slate-500">
            Déjà inscrit ? <Link href="/login" className="text-indigo-600 hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
