'use client';

const EXAMS = [
  { id: '1', title: 'Examen Semaine 3 – Récits du Vivant', weekNumber: 3, duration: 90, questions: 20, status: 'passed', score: 16 },
  { id: '2', title: 'Examen Semaine 6 – Data & Territoire', weekNumber: 6, duration: 120, questions: 25, status: 'passed', score: 14.5 },
  { id: '3', title: 'Examen Semaine 9 – Multimédia', weekNumber: 9, duration: 90, questions: 20, status: 'upcoming', score: null },
];

export default function ExamensPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Examens</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Suivi de vos épreuves hebdomadaires.</p>
      <div className="flex flex-col gap-4">
        {EXAMS.map(e => (
          <div key={e.id} className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-slate-400 mt-0.5">{e.duration} min · {e.questions} questions</p>
            </div>
            {e.status === 'passed' ? (
              <div className="text-right">
                <span className="text-lg font-bold text-emerald-600">{e.score} / 20</span>
                <p className="text-xs text-slate-400">Validé</p>
              </div>
            ) : (
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                Commencer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
