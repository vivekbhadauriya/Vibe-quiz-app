'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ResultPieBar from '@/components/resultpiebar';
import Header from '@/components/Header';

interface VibeCount {
  [vibe: string]: number;
}

let socket: ReturnType<typeof io> | null = null;

export default function Dashboard() {
  const [vibes, setVibes] = useState<VibeCount>({});
  const [total, setTotal] = useState(0);

  // Fetch results from API
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
      <div className="absolute top-10 left-10 w-40 h-40 md:w-72 md:h-72 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-52 h-52 md:w-96 md:h-96 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-80 md:h-80 bg-purple-300 opacity-20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />

      <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl p-4 sm:p-6 md:p-10 space-y-8 z-10 border border-purple-100 backdrop-blur mt-24">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-blue-600 drop-shadow mb-2">
          Live Vibe Dashboard
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600 mb-4">
          See how everyone is vibing in real time!
        </p>
        {total === 0 ? (
          <div className="text-center text-gray-400 text-lg md:text-xl py-8">No submissions yet.</div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {vibeKeys.map((vibe, i) => (
              <div key={vibe} className="flex items-center gap-2 md:gap-4">
                <span className="capitalize font-semibold w-20 md:w-28 text-base md:text-lg text-gray-700">{vibe}</span>
                <div className="flex-1 mx-1 md:mx-2 h-6 md:h-8 rounded-full bg-gray-200 relative overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-6 md:h-8 rounded-full bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700`}
                    style={{ width: `${(vibes[vibe] / total) * 100}%` }}
                  />
                  <span className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-gray-700">
                    {((vibes[vibe] / total) * 100).toFixed(1)}%
                  </span>
                </div>
                <span className="w-6 md:w-10 text-right font-mono text-indigo-700">{vibes[vibe]}</span>
              </div>
            ))}
          </div>
        )}
        <div className="text-center text-gray-700 mt-4 md:mt-8 text-base md:text-lg">
          <span className="font-bold text-indigo-600">{total}</span> total submissions
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ResultPieBar vibes={vibes} />
          </div>
        </div>
      </div>
      <footer className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs md:text-sm opacity-80 z-10">
        Made with <span className="text-pink-400">♥</span> by Vivek Bhadauriya
      </footer>
    </div>
  );
}