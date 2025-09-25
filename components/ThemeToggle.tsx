'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true); // default dark
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') {
        setDark(false);
        document.documentElement.classList.remove('dark');
      } else {
        setDark(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      /* noop */
      setDark(true);
      document.documentElement.classList.add('dark');
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
