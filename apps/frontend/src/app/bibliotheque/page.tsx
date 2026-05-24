'use client';
import { useState } from 'react';

const RESOURCES = [
  { id: '1', title: 'The Great Derangement – Amitav Ghosh', type: 'Livre', url: '#', tags: ['Anthropocène', 'Récit'] },
  { id: '2', title: 'Guide du data journalism – Reuters', type: 'PDF', url: '#', tags: ['Data', 'Journalisme'] },
  { id: '3', title: 'Écrire la nature – cours video', type: 'Vidéo', url: '#', tags: ['Écriture', 'Nature'] },
  { id: '4', title: 'Datasets climatiques – Our World in Data', type: 'Dataset', url: '#', tags: ['Data', 'Climat'] },
];

const typeIcon: Record<string, string> = { Livre: '📕', PDF: '📄', Vidéo: '🎬', Dataset: '📊' };

export default function BibliothequePage() {
  const [filter, setFilter] = useState('');
  const res = RESOURCES.filter(r =>
    !filter || r.type === filter || r.tags.includes(filter)
  );
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Bibliothèque</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-4">Ressources curatées pour votre master.</p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'Livre', 'PDF', 'Vidéo', 'Dataset'].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {t || 'Tout'}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {res.map(r => (
          <a key={r.id} href={r.url} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors group">
            <span className="text-2xl">{typeIcon[r.type]}</span>
            <div className="flex-1">
              <p className="font-medium group-hover:text-indigo-600 transition-colors">{r.title}</p>
              <div className="flex gap-1.5 mt-1">{r.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500">{tag}</span>
              ))}</div>
            </div>
            <span className="text-slate-300 group-hover:text-indigo-400 transition-colors">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
