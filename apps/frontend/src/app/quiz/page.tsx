'use client';
import { useState } from 'react';

const QUIZ = {
  title: 'Quiz – Journalisme et Anthropocène',
  questions: [
    {
      id: 1,
      text: "Quel terme désigne l'ère géologique marquée par l'influence humaine sur la Terre ?",
      answers: ['Holocène', 'Anthropocène', 'Capitalocène', 'Pliocène'],
      correct: 1,
    },
    {
      id: 2,
      text: 'Quelle pratique journalistique consiste à visualiser des données environnementales ?',
      answers: ['Data journalism', 'Gonzo journalism', 'Slow journalism', 'Civic journalism'],
      correct: 0,
    },
  ],
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ.questions[step];

  function handleAnswer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore(s => s + 1);
  }
  function next() {
    if (step + 1 >= QUIZ.questions.length) { setDone(true); return; }
    setStep(s => s + 1); setSelected(null);
  }

  if (done) return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
      <p className="text-slate-500">Score : <span className="font-semibold text-indigo-600">{score} / {QUIZ.questions.length}</span></p>
      <button onClick={() => { setStep(0); setSelected(null); setScore(0); setDone(false); }}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Recommencer
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-xl mx-auto">
      <p className="text-sm text-slate-400 mb-2">Question {step + 1} / {QUIZ.questions.length}</p>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mb-6">
        <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${((step + 1) / QUIZ.questions.length) * 100}%` }} />
      </div>
      <h2 className="text-lg font-semibold mb-6">{q.text}</h2>
      <div className="grid gap-3">
        {q.answers.map((a, i) => {
          let cls = 'p-4 rounded-xl border text-sm font-medium cursor-pointer transition-all ';
          if (selected === null) cls += 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20';
          else if (i === q.correct) cls += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300';
          else if (i === selected) cls += 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600';
          else cls += 'border-slate-200 dark:border-slate-700 opacity-50';
          return <div key={i} className={cls} onClick={() => handleAnswer(i)}>{a}</div>;
        })}
      </div>
      {selected !== null && (
        <button onClick={next} className="mt-6 w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          {step + 1 >= QUIZ.questions.length ? 'Voir les résultats' : 'Question suivante →'}
        </button>
      )}
    </div>
  );
}
