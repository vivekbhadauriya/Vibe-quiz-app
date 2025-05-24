import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="relative w-full bg-gray-200 rounded-full h-5 shadow-inner">
        <motion.div
          className="h-5 rounded-full bg-gradient-to-r from-indigo-500 via-pink-400 to-blue-400 shadow"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        <motion.div
          className="absolute top-1/2 left-0"
          style={{ x: `calc(${pct}% - 32px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 shadow border border-purple-100 text-indigo-700 -translate-y-1/2">
            {current} / {total}
          </span>
        </motion.div>
      </div>
    </div>
  );
}