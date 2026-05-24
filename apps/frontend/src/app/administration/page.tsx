'use client';

const STATS = [
  { label: 'Utilisateurs', value: '142', icon: '👥' },
  { label: 'Cours actifs', value: '18', icon: '📖' },
  { label: 'Examens passés', value: '523', icon: '📋' },
  { label: 'Score moyen', value: '14.8/20', icon: '⭐' },
];

const USERS = [
  { name: 'Amara Diallo', email: 'a.diallo@neja.fr', role: 'USER', score: 15.4 },
  { name: 'Léa Moreau', email: 'l.moreau@neja.fr', role: 'USER', score: 16.1 },
  { name: 'Admin Neja', email: 'admin@neja.fr', role: 'ADMIN', score: null },
];

export default function AdministrationPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Administration</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Vue d'ensemble de la plateforme.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold mt-2">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold">Utilisateurs récents</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/40">
            <tr>{['Nom', 'Email', 'Rôle', 'Score moyen'].map(h => (
              <th key={h} className="text-left px-5 py-3 font-medium text-slate-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.email} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/20">
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3 text-slate-500">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3">{u.score ? `${u.score} / 20` : '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
