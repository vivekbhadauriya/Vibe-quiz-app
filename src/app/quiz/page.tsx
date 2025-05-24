'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/progressbar';
import Header from '@/components/Header';

interface Option {
  text: string;
  vibe: string;
}

interface Question {
  _id: string;
  text: string;
  options: Option[];
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(10);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(setQuestions)
      .catch(err => console.error("Failed to load questions:", err));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleTimeout();
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, current]);

  const handleSelect = (vibe: string) => {
    const newAns = [...answers];
    newAns[current] = vibe;
    setAnswers(newAns);
    // REMOVE setTimer(10) from here
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimer(10); // <-- Reset timer only when moving to next question
    } else {
      submit();
    }
  };

  const submit = async () => {
    await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: questions.map((q, i) => ({
          questionId: q._id,
          selectedVibe: answers[i],
        })),
      }),
    });
    // Calculate user's result (most frequent vibe)
    const vibeCounts: Record<string, number> = {};
    answers.forEach(v => {
      if (v) vibeCounts[v] = (vibeCounts[v] || 0) + 1;
    });
    const topVibe = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown';
    router.push(`/result?vibe=${encodeURIComponent(topVibe)}`);
  };

  const handleTimeout = () => {
    // If not answered, set default vibe for this question
    if (!answers[current]) {
      const defaultVibe = "thinker"; // or "bore", "lazy", etc.
      handleSelect(defaultVibe);
    }
    // Move to next question or submit
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimer(10);
    } else {
      submit();
    }
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading questions...
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center justify-center">
      <Header />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 space-y-6">
        {/* Progress Bar */}
        <ProgressBar current={current + 1} total={questions.length} />

        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">{question.text}</h2>
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.text}
              className={`w-full px-4 py-2 md:py-3 rounded-lg font-medium text-base md:text-lg border transition-all duration-200 shadow-sm focus:outline-none
                ${
                  answers[current] === opt.vibe
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-gray-50 dark:bg-[#232042] hover:bg-indigo-50 dark:hover:bg-[#393053] border-gray-200 dark:border-[#393053] text-gray-800 dark:text-gray-100'
                }
              `}
              style={{
                boxShadow: answers[current] === opt.vibe
                  ? '0 2px 8px 0 rgba(99,102,241,0.10)'
                  : '0 1px 4px 0 rgba(0,0,0,0.03)'
              }}
              onClick={() => handleSelect(opt.vibe)}
            >
              {opt.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm font-bold text-indigo-700">
            Question {current + 1} of {questions.length}
          </span>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition-transform duration-200 hover:scale-105 border border-indigo-700"
            onClick={next}
          >
            {current < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>

        <div className="text-center text-base md:text-lg font-medium mt-4">
          <span className="text-red-600 font-semibold">Time left :</span>: <span className="text-indigo-600 font-bold">{timer}s</span>
        </div>
      </div>
      <footer className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs md:text-sm opacity-80 z-10">
        Made with <span className="text-pink-400">♥</span> by Vivek Bhadauriya
      </footer>
    </div>
  );
}
