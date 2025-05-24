'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Typewriter } from 'react-simple-typewriter';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-2 sm:px-4 py-4 relative overflow-hidden">
      <Header />
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 opacity-30 rounded-full blur-2xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Live indicator */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-green-700 font-semibold tracking-wide text-sm">Live</span>
      </div>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center w-full z-10 mt-24">
        {/* Animated Title */}
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 mb-6 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Vibe Check Quiz
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-2xl min-h-[2.5rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
                    <span className="text-purple-600 font-semibold">Join thousands of users checking their vibes live!</span>
                    <br />

          <span className="font-semibold text-purple-600">
            <Typewriter
              words={[
                '#DiscoverYourVibe',
                '#LiveVibes',
                'Ready to vibe?'
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </span>
        </motion.p>

        {/* Animated Start Button */}
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 0 8px rgba(236, 72, 153, 0.15)" }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-full shadow-xl text-lg transition-all focus:outline-none focus:ring-4 focus:ring-pink-300"
          onClick={() => router.push('/quiz')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Start Quiz
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm opacity-80">
        Made with <span className="text-pink-400">♥</span> by Vivek Bhadauriya 
      </footer>
    </main>
  );
}