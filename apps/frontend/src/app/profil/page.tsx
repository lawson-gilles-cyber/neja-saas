'use client';
import { useState } from 'react';

export default function ProfilPage() {
  const [user] = useState({ firstName: 'Amara', lastName: 'Diallo', email: 'a.diallo@neja.fr', role: 'USER', mfaEnabled: false });
  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full">{user.role}</span>
          </div>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-medium">Authentification à deux facteurs (MFA)</span>
            <span className={`text-xs px-2 py-1 rounded-full ${user.mfaEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
              {user.mfaEnabled ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
