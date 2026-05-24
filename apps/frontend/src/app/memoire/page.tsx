'use client';
import { useState } from 'react';

interface Topic { id: string; title: string; hypothesis: string; methodology: string; createdAt: string; }

export default function MemoirePage() {
  const [topics, setTopics] = useState<Topic[]>([
    { id: '1', title: 'Journalisme de solutions face à la crise climatique', hypothesis: 'Le journalisme de solutions influence positivement l\'engagement citoyen sur les questions environnementales.', methodology: 'Analyse de corpus + entretiens semi-directifs', createdAt: '2026-03-15' }
  ]);
  const [form, setForm] = useState({ title: '', hypothesis: '', methodology: '' });
  const [open, setOpen] = useState(false);

  function add() {
    if (!form.title) return;
    setTopics(t => [...t, { ...form, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] }]);
    setForm({ title: '', hypothesis: '', methodology: '' });
    setOpen(false);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mémoire de recherche</h1>
          <p className="text-slate-500 dark:text-slate-400">Gérez vos sujets et hypothèses.</p>
        </div>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          + Nouveau sujet
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="font-bold text-lg mb-4">Nouveau sujet de recherche</h2>
            {(['title', 'hypothesis', 'methodology'] as const).map(k => (
              <div key={k} className="mb-3">
                <label className="block text-sm font-medium mb-1 capitalize">{k === 'title' ? 'Titre' : k === 'hypothesis' ? 'Hypothèse' : 'Méthodologie'}</label>
                <textarea value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} rows={k === 'title' ? 1 : 3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <button onClick={add} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Ajouter</button>
              <button onClick={() => setOpen(false)} className="flex-1 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {topics.map(t => (
          <div key={t.id} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="font-semibold text-lg">{t.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1"><span className="font-medium text-slate-700 dark:text-slate-300">Hypothèse :</span> {t.hypothesis}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1"><span className="font-medium text-slate-700 dark:text-slate-300">Méthode :</span> {t.methodology}</p>
            <p className="text-xs text-slate-400 mt-3">Créé le {t.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
