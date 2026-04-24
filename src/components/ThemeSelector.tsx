import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const THEMES = [
  { id: 'default', name: 'Tredence Default', color: '#f06422' },
  { id: 'ocean', name: 'Ocean Blue', color: '#0284c7' },
  { id: 'midnight', name: 'Midnight Violet', color: '#8b5cf6' },
  { id: 'forest', name: 'Forest Green', color: '#16a34a' },
  { id: 'sunset', name: 'Sunset Rose', color: '#e11d48' },
  { id: 'cyberpunk', name: 'Cyberpunk', color: '#facc15' },
];

export function ThemeSelector() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all"
        title="Change Theme"
      >
        <div className="w-3.5 h-3.5 rounded-full border border-black/10 transition-transform group-hover:scale-110" style={{ backgroundColor: activeTheme.color }}></div>
        <span>Theme</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 glass-strong rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in" style={{ color: 'var(--theme-text)' }}>
          <div className="p-1.5 flex flex-col gap-0.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setIsOpen(false); }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-black/5"
                style={{
                  backgroundColor: theme === t.id ? 'var(--theme-primary-light)' : 'transparent',
                  fontWeight: theme === t.id ? '600' : '500',
                }}
              >
                <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: t.color }}></div>
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
