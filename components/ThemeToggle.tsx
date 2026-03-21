'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false); // default light
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        setDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setDark(false);
        document.documentElement.classList.remove('dark');
      }
    } catch {
      /* noop */
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* noop */ }
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <button onClick={toggle} className="btn-outline btn-sm" aria-label="Toggle theme">
      {dark ? <Sun size={16}/> : <Moon size={16}/>}
      <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
