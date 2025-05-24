'use client';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // On mount, check for saved theme or system preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      setDark(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3
      bg-gradient-to-r from-white/70 via-purple-100/70 to-blue-100/70
      dark:from-[#18122B]/80 dark:via-[#393053]/80 dark:to-[#443C68]/80
      backdrop-blur border-b border-purple-100 dark:border-[#393053] shadow z-30 fixed top-0 left-0"
    >
      <div className="flex items-center gap-4">
        <button
          className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 focus:outline-none"
          onClick={() => router.push('/')}
        >
          VibeCheck
        </button>
        <nav className="hidden sm:flex gap-4 ml-6">
          <button
            className={`text-base font-medium transition-colors ${
              pathname === '/' ? 'text-indigo-600 dark:text-pink-300' : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400'
            }`}
            onClick={() => router.push('/')}
          >
            Home
          </button>
          <button
            className={`text-base font-medium transition-colors ${
              pathname === '/about' ? 'text-indigo-600 dark:text-pink-300' : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400'
            }`}
            onClick={() => router.push('/about')}
          >
            About
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        {mounted && (
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-[#393053]/70 shadow border border-purple-100 dark:border-[#443C68] transition"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-yellow-300" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-indigo-700" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        )}
        {/* Vibe Icon */}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 shadow-lg border-2 border-white dark:border-[#393053]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 2 14 12 14 11 22 22 10 12 10 13 2" fill="none"/>
          </svg>
        </div>
      </div>
    </header>
  );
}