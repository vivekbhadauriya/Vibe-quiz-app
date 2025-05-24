import React from 'react';
import { motion } from 'framer-motion';

interface Option { text: string; vibe: string; }
interface Props { question: any; onSelect: (vibe: string) => void; selected?: string; }

export default function QuestionCard({ question, onSelect, selected }: Props) {
  return (
    <motion.div
      className="p-4 sm:p-6 bg-white/90 dark:bg-[#18122B]/90 rounded-xl shadow-xl border border-purple-100 dark:border-[#393053] backdrop-blur max-w-lg w-full mx-auto"
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: -90, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((opt: Option) => {
          const isSelected = selected === opt.vibe;
          return (
            <motion.button
              key={opt.text}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 border focus:outline-none
                ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-700 text-indigo-800 dark:text-white'
                    : 'border-gray-200 dark:border-[#393053] bg-gray-50 dark:bg-[#232042] hover:bg-indigo-100 dark:hover:bg-[#393053] text-gray-700 dark:text-gray-200'
                }
              `}
              style={{
                boxShadow: isSelected
                  ? '0 2px 8px 0 rgba(99,102,241,0.10)'
                  : '0 1px 4px 0 rgba(0,0,0,0.03)'
              }}
              onClick={() => onSelect(opt.vibe)}
            >
              <span
                className={`inline-block w-1.5 h-6 mr-3 rounded-full transition-all duration-200
                  ${isSelected ? 'bg-indigo-400 dark:bg-white/80' : 'bg-transparent'}
                `}
              />
              <span className="font-medium font-sans text-sm md:text-base tracking-wide">
                {opt.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}