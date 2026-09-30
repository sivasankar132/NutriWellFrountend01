import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { AIMotivationItem } from '../../types';
import { 
  X, Sparkles, RefreshCw, Flame, Droplets, Target, 
  Zap, Trophy, Heart, ArrowRight, ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface AIMotivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanNextMeal?: () => void;
}

export const AIMotivationModal: React.FC<AIMotivationModalProps> = ({ isOpen, onClose, onPlanNextMeal }) => {
  const { user, contextMode, t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const motivations: AIMotivationItem[] = [
    {
      id: 'mot-1',
      category: 'Progress',
      headline: 'Rhythm is Building 🔥',
      quote: 'Your protein consistency is improving. Keep the same rhythm with your lunch today.',
      actionableTip: `Adding one protein anchor (e.g. 1 bowl of Sprouts or Paneer) will comfortably lock in your ${user.nutritionGoal} goal.`
    },
    {
      id: 'mot-2',
      category: 'Consistency',
      headline: 'Hydration Momentum 💧',
      quote: "You're getting more consistent with hydration. One more refill before 4 PM keeps the habit moving.",
      actionableTip: 'Keep a water bottle on your desk or study table so you never have to think twice.'
    },
    {
      id: 'mot-3',
      category: 'Goal',
      headline: 'Small Daily Micro-Wins 🎯',
      quote: `Small protein choices repeated every day matter more than one perfect meal.`,
      actionableTip: `For ${user.nutritionGoal}, prioritize 25-30g protein at your main meals rather than rushing late at night.`
    },
    {
      id: 'mot-4',
      category: 'Small Win',
      headline: 'Context-Smart Choices 🧠',
      quote: contextMode === 'STUDENT'
        ? 'A busy study day doesn’t mean you have to skip nutrition. Pick one quick protein-rich option.'
        : contextMode === 'EMPLOYEE'
        ? 'Your workday is busy. Make your next meal the easy win.'
        : 'Smart eating is about practical, realistic choices within your daily routine.',
      actionableTip: 'Budget-friendly staples like eggs, dal, and roasted chana deliver maximum nutrition in under 15 minutes.'
    },
    {
      id: 'mot-5',
      category: 'Recovery',
      headline: 'One Meal at a Time 🌱',
      quote: 'One off-track meal doesn’t erase your progress. Start fresh with your next plate.',
      actionableTip: 'Drink a glass of water, choose a clean fiber-rich meal, and keep your regular schedule.'
    },
    {
      id: 'mot-6',
      category: 'Future',
      headline: 'Compound Health Effect 📈',
      quote: 'The energy you feel tomorrow is being shaped by the wholesome choices you make today.',
      actionableTip: 'Prioritize whole grains, leafy greens, and balanced hydration for sustained afternoon vitality.'
    }
  ];

  const current = motivations[currentIndex % motivations.length];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % motivations.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/50 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">AI Health Motivation</h2>
                  <Badge variant="mint">{current.category}</Badge>
                </div>
                <p className="text-xs text-slate-400">Personalized for {user.name} • {contextMode.replace('_', ' ')} MODE</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Motivation Content Body */}
          <div className="py-6 space-y-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-teal-950/80 border border-emerald-500/40 space-y-3">
              <span className="text-xs font-bold text-mint-accent uppercase tracking-wider block">
                {current.headline}
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                "{current.quote}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                Actionable Daily Step
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.actionableTip}
              </p>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={handleNext}
            >
              Next Motivation
            </Button>

            {onPlanNextMeal && (
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => {
                  onClose();
                  onPlanNextMeal();
                }}
              >
                Plan Next Meal
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
