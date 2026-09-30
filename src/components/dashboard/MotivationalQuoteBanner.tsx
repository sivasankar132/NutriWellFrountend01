import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Shield, Repeat, Heart } from 'lucide-react';
import { getRandomQuote, MotivationalQuote } from '../../data/motivationalQuotes';

export const MotivationalQuoteBanner: React.FC = () => {
  // Select a new random quote from the 50 quotes every time the page refreshes
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote>(() => getRandomQuote());
  const [isRotating, setIsRotating] = useState(false);

  const rollNextQuote = () => {
    setIsRotating(true);
    let next = getRandomQuote();
    // Ensure we don't pick the identical quote back-to-back if possible
    if (next.id === currentQuote.id) {
      next = getRandomQuote();
    }
    setCurrentQuote(next);
    setTimeout(() => setIsRotating(false), 400);
  };

  const getCategoryMeta = (cat: MotivationalQuote['category']) => {
    switch (cat) {
      case 'Health':
        return {
          icon: Heart,
          color: 'text-emerald-400',
          badgeBg: 'bg-emerald-950/80 border-emerald-800/60 text-emerald-300',
        };
      case 'Discipline':
        return {
          icon: Shield,
          color: 'text-amber-400',
          badgeBg: 'bg-amber-950/80 border-amber-800/60 text-amber-300',
        };
      case 'Habits':
        return {
          icon: Repeat,
          color: 'text-cyan-400',
          badgeBg: 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300',
        };
      case 'Nutrition':
        return {
          icon: Sparkles,
          color: 'text-mint-accent',
          badgeBg: 'bg-teal-950/80 border-teal-800/60 text-teal-300',
        };
    }
  };

  const meta = getCategoryMeta(currentQuote.category);
  const CategoryIcon = meta.icon;

  return (
    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
      {/* Category Tag */}
      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.badgeBg}`}>
        <CategoryIcon className="w-2.5 h-2.5" />
        {currentQuote.category}
      </span>

      {/* Quote text & Author with smooth animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote.id}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap items-center gap-1.5 text-slate-300"
        >
          <span className="italic font-medium text-slate-200">
            "{currentQuote.quote}"
          </span>
          <span className="text-emerald-400/90 font-semibold text-[11px] whitespace-nowrap">
            — {currentQuote.author}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Manual reroll button */}
      <button
        type="button"
        onClick={rollNextQuote}
        className="p-1 rounded-md text-slate-500 hover:text-emerald-300 hover:bg-slate-800/60 transition-all cursor-pointer ml-1"
        title="Show another quote"
        aria-label="Show another quote"
      >
        <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin text-emerald-400' : ''}`} />
      </button>
    </div>
  );
};
