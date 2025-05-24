'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ResultPieBar from '@/components/resultpiebar';
import Header from '@/components/Header';

interface VibeCount {
  [vibe: string]: number;
}

let socket: ReturnType<typeof io> | null = null;

export default function ResultPage() {
  const params = useSearchParams();
  const vibe = params.get('vibe');
  const router = useRouter();

  const [vibes, setVibes] = useState<VibeCount>({});
  const [total, setTotal] = useState(0);

  const fetchResults = async () => {
    const res = await fetch('/api/results');
    const data = await res.json();
    setVibes(data.vibes);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchResults();
    if (!socket) {
      socket = io();
    }
    socket.on('newSubmission', fetchResults);
    return () => {
      if (socket) {
        socket.off('newSubmission', fetchResults);
      }
    };
  }, []);

  const colors = [
    'from-indigo-500 to-blue-400',
    'from-green-400 to-teal-400',
    'from-yellow-400 to-orange-400',
    'from-pink-400 to-fuchsia-500',
    'from-purple-400 to-indigo-400',
    'from-red-400 to-pink-400',
    'from-blue-400 to-cyan-400',
    'from-gray-400 to-gray-600',
  ];

  const vibeKeys = Object.keys(vibes);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-2 sm:px-4 py-4 relative overflow-hidden">
      <Header />
      {/* Animated background blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 md:w-96 md:h-96 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-purple-300 opacity-20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl p-4 sm:p-6 md:p-10 space-y-8 z-10 border border-purple-100 backdrop-blur mt-24">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-blue-600 drop-shadow mb-2">
          Your Vibe Result
        </h1>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg animate-bounce">
            {vibe ? vibe.charAt(0).toUpperCase() + vibe.slice(1) : 'Unknown'}
          </span>
          <span className="text-base sm:text-lg text-gray-700">
            You mostly vibe with <span className="font-bold text-purple-600">{vibe}</span>!
          </span>
        </div>
        <div className="mt-4 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-700 mb-4">Live Vibe Stats</h2>
          {total === 0 ? (
            <div className="text-center text-gray-400 text-lg md:text-xl py-8">No submissions yet.</div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {vibeKeys.map((v, i) => (
                <div key={v} className="flex items-center gap-2 md:gap-4">
                  <span className={`capitalize font-semibold w-20 md:w-28 text-base md:text-lg ${v === vibe ? 'text-purple-700' : 'text-gray-700'}`}>
                    {v}
                  </span>
                  <div className="flex-1 mx-1 md:mx-2 h-5 md:h-7 rounded-full bg-gray-200 relative overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-5 md:h-7 rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                      style={{ width: `${(vibes[v] / total) * 100}%` }}
                    />
                    <span className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-gray-700">
                      {((vibes[v] / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <span className={`w-6 md:w-10 text-right font-mono ${v === vibe ? 'text-purple-700' : 'text-indigo-700'}`}>{vibes[v]}</span>
                </div>
              ))}
            </div>
          )}
          <div className="text-center text-gray-700 mt-4 md:mt-6 text-base md:text-lg">
            <span className="font-bold text-indigo-600">{total}</span> total submissions
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <ResultPieBar vibes={vibes} highlightVibe={vibe ?? undefined} />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mt-8">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition"
            onClick={() => router.push('/dashboard')}
          >
            See Live Dashboard
          </button>
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:bg-pink-600 transition"
            onClick={() => router.push('/quiz')}
          >
            Retake Quiz
          </button>
        </div>
      </div>
      <footer className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs md:text-sm opacity-80 z-10">
        Made with <span className="text-pink-400">♥</span> by Vivek Bhadauriya
      </footer>
    </div>
  );
}