'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const nav = [
  { href: '/dashboard',    label: 'Tableau de bord', icon: '⊞' },
  { href: '/courses',      label: 'Cours',            icon: '📖' },
  { href: '/quiz',         label: 'Quiz',             icon: '✏️' },
  { href: '/examens',      label: 'Examens',          icon: '📋' },
  { href: '/bibliotheque', label: 'Bibliothèque',     icon: '📚' },
  { href: '/assistant',    label: 'Assistant IA',     icon: '🤖' },
  { href: '/memoire',      label: 'Mémoire',          icon: '🔬' },
  { href: '/profil',       label: 'Profil',           icon: '👤' },
];

export default function Sidebar() {
  const path = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col p-4">
      <div className="mb-6 px-2">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Neja</span>
        <p className="text-xs text-slate-400 mt-0.5">Plateforme Pédagogique</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(({ href, label, icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${path === href
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
            <span>{icon}</span>{label}
          </Link>
        ))}
        {user?.role === 'ADMIN' && (
          <Link href="/administration"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-2
              ${path === '/administration'
                ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}>
            <span>⚙️</span>Administration
          </Link>
        )}
      </nav>

      {user && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
          <p className="text-sm font-medium px-2 truncate">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-slate-400 px-2 truncate mb-2">{user.email}</p>
          <button onClick={logout}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            Se déconnecter
          </button>
        </div>
      )}
    </aside>
  );
}
