'use client';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-2 sm:px-4 py-4 relative overflow-hidden">
      <Header />
      <section className="flex flex-col items-center justify-center w-full z-10 mt-32 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 mb-6 text-center drop-shadow-lg">
          About <span className="text-indigo-700 dark:text-pink-300">VibeCheck</span>
        </h1>
        <p
          className="text-2xl md:text-3xl font-bold mb-8 text-center leading-snug max-w-2xl drop-shadow"
          style={{
            color: '#111', // extra black
            textShadow: '0 2px 8px rgba(0,0,0,0.10), 0 1px 0 #fff',
          }}
        >
          Discover your vibe and see how the world is vibing—live, fun, and interactive.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl mb-2">⚡</span>
            <span className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">Real-time Results</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl mb-2">🎨</span>
            <span className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">Beautiful UI</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl mb-2">🔒</span>
            <span className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">Privacy First</span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 text-center mb-8 max-w-2xl">
          Built with <span className="font-bold text-pink-500">Next.js</span>, <span className="font-bold text-purple-500">Tailwind CSS</span>, <span className="font-bold text-blue-500">Framer Motion</span>, and <span className="font-bold text-indigo-500">Socket.IO</span> for a seamless, interactive experience.
        </p>
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
          &copy; {new Date().getFullYear()} Vivek Bhadauriya. All rights reserved.
        </div>
      </section>
      {/* Decorative gradient blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 opacity-20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 opacity-20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-400 opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </main>
  );
}