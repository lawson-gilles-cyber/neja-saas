'use client';
import { useState } from 'react';

const MOCK_COURSES = [
  { id: '1', title: 'Écritures du vivant', domain: 'Journalisme environnemental', difficulty: 'BEGINNER', lessons: 8 },
  { id: '2', title: 'Données & Climat', domain: 'Data journalisme', difficulty: 'INTERMEDIATE', lessons: 12 },
  { id: '3', title: 'Récit multimédia', domain: 'Narration numérique', difficulty: 'ADVANCED', lessons: 10 },
];

const diffColor: Record<string, string> = {
  BEGINNER: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  INTERMEDIATE: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  ADVANCED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};
const diffLabel: Record<string, string> = { BEGINNER: 'Débutant', INTERMEDIATE: 'Intermédiaire', ADVANCED: 'Avancé' };

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_COURSES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Cours</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Explorez le catalogue de formations.</p>
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher un cours..."
        className="w-full max-w-sm mb-6 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => (
          <div key={c.id} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffColor[c.difficulty]}`}>{diffLabel[c.difficulty]}</span>
            <h2 className="mt-3 font-semibold text-lg">{c.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.domain}</p>
            <p className="mt-3 text-sm text-slate-400">{c.lessons} leçons</p>
            <button className="mt-4 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
              Commencer →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
