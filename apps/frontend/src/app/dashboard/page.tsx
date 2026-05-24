'use client';

const STATS = [
  { label: 'Cours suivis', value: '6 / 18', pct: 33, color: 'bg-indigo-500' },
  { label: 'Quiz complétés', value: '12 / 24', pct: 50, color: 'bg-violet-500' },
  { label: 'Score moyen', value: '15.4 / 20', pct: 77, color: 'bg-emerald-500' },
  { label: 'Avancement mémoire', value: '30%', pct: 30, color: 'bg-amber-500' },
];

const ACTIVITY = [
  { action: 'Quiz terminé', detail: 'Anthropocène – semaine 6', time: 'Il y a 2h', icon: '✏️' },
  { action: 'Cours consulté', detail: 'Données & Climat – leçon 4', time: 'Hier', icon: '📖' },
  { action: 'Examen validé', detail: 'Semaine 6 · 14.5/20', time: '3 mai', icon: '📋' },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Bienvenue, Amara — voici votre progression.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5 mb-3">{s.label}</p>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full">
              <div className={`${s.color} h-full rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-semibold mb-3">Activité récente</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <span className="text-xl">{a.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{a.action}</p>
              <p className="text-xs text-slate-500">{a.detail}</p>
            </div>
            <span className="text-xs text-slate-400">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
