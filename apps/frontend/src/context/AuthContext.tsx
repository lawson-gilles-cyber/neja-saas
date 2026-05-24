'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { id: string; email: string; firstName: string; lastName: string; role: string; }
interface AuthCtx { user: User | null; token: string | null; login: (email: string, password: string) => Promise<void>; logout: () => void; }

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = document.cookie.match(/neja_token=([^;]+)/)?.[1];
    const u = localStorage.getItem('neja_user');
    if (t && u) { setToken(t); setUser(JSON.parse(u)); }
  }, []);

  async function login(email: string, password: string) {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const res = await fetch(`${api}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Identifiants invalides');
    const data = await res.json();
    document.cookie = `neja_token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
    localStorage.setItem('neja_user', JSON.stringify(data.user));
    setToken(data.token); setUser(data.user);
  }

  function logout() {
    document.cookie = 'neja_token=; path=/; max-age=0';
    localStorage.removeItem('neja_user');
    setToken(null); setUser(null);
    window.location.href = '/login';
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
