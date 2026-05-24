'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'assistant'; text: string; }

const SYSTEM = "Tu es un assistant pédagogique spécialisé en journalisme environnemental et récits de l'Anthropocène. Tu aides les étudiants du Master Nouvelles Écritures.";

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Bonjour ! Je suis votre assistant pédagogique. Comment puis-je vous aider dans votre Master ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, system: SYSTEM }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', text: data.reply || 'Désolé, une erreur est survenue.' }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Impossible de joindre le serveur. Vérifiez votre connexion.' }]);
    } finally { setLoading(false); }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assistant IA</h1>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
              ${m.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-bl-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm text-sm text-slate-400 animate-pulse">
              En train de réfléchir…
            </div>
          </div>
        )}
        <div ref={bottom} />
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Posez votre question…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={send} disabled={loading}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Envoyer
        </button>
      </div>
    </div>
  );
}
