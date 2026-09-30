import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Clock, Droplets, Utensils, Apple, 
  Dumbbell, Moon, BellRing, Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReminderCategory } from '../../types';

export const ReminderPopupModal: React.FC = () => {
  const { activeAlert, dismissActiveAlert, snoozeActiveAlert, showToast } = useApp();

  if (!activeAlert) return null;

  const getCategoryConfig = (cat: ReminderCategory) => {
    switch (cat) {
      case 'Hydration':
        return {
          icon: Droplets,
          border: 'border-sky-500/60',
          glow: 'shadow-[0_0_40px_rgba(14,165,233,0.35)]',
          badgeBg: 'bg-sky-950/90 text-sky-300 border-sky-500/40',
          gradientBg: 'from-sky-950/95 via-slate-900/95 to-slate-950/95',
          accentText: 'text-sky-400',
          ringColor: 'border-sky-400/40',
        };
      case 'Meals':
        return {
          icon: Utensils,
          border: 'border-emerald-500/60',
          glow: 'emerald-glow-lg',
          badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
          gradientBg: 'from-emerald-950/95 via-slate-900/95 to-slate-950/95',
          accentText: 'text-emerald-400',
          ringColor: 'border-emerald-400/40',
        };
      case 'Snacks':
        return {
          icon: Apple,
          border: 'border-amber-500/60',
          glow: 'shadow-[0_0_40px_rgba(245,158,11,0.35)]',
          badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-500/40',
          gradientBg: 'from-amber-950/95 via-slate-900/95 to-slate-950/95',
          accentText: 'text-amber-400',
          ringColor: 'border-amber-400/40',
        };
      case 'Workouts':
        return {
          icon: Dumbbell,
          border: 'border-indigo-500/60',
          glow: 'shadow-[0_0_40px_rgba(99,102,241,0.35)]',
          badgeBg: 'bg-indigo-950/90 text-indigo-300 border-indigo-500/40',
          gradientBg: 'from-indigo-950/95 via-slate-900/95 to-slate-950/95',
          accentText: 'text-indigo-400',
          ringColor: 'border-indigo-400/40',
        };
      case 'Sleep':
        return {
          icon: Moon,
          border: 'border-purple-500/60',
          glow: 'shadow-[0_0_40px_rgba(168,85,247,0.35)]',
          badgeBg: 'bg-purple-950/90 text-purple-300 border-purple-500/40',
          gradientBg: 'from-purple-950/95 via-slate-900/95 to-slate-950/95',
          accentText: 'text-purple-400',
          ringColor: 'border-purple-400/40',
        };
    }
  };

  const config = getCategoryConfig(activeAlert.category);
  const CategoryIcon = config.icon;

  const handleMarkDone = () => {
    dismissActiveAlert();
    showToast(`Great job! Completed: ${activeAlert.title} 🎉`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark blurred overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismissActiveAlert}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-b ${config.gradientBg} border-2 ${config.border} p-6 shadow-2xl ${config.glow} backdrop-blur-2xl space-y-5`}
        >
          {/* Top Bar with Pulsing Chime Badge & Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${config.badgeBg} flex items-center gap-1.5`}>
                <BellRing className="w-3 h-3 animate-bounce" />
                Exact-Time Alert • {activeAlert.time}
              </span>
            </div>

            <button
              onClick={dismissActiveAlert}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss Reminder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual & Content */}
          <div className="flex items-start gap-4 pt-1">
            {/* Pulsing Icon Bubble */}
            <div className="relative shrink-0">
              <div className={`w-14 h-14 rounded-2xl bg-slate-900/90 border-2 ${config.border} flex items-center justify-center ${config.accentText} shadow-lg`}>
                <CategoryIcon className="w-7 h-7" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-950 border border-emerald-500 text-emerald-400">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>

            {/* Title & Notes */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  {activeAlert.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeAlert.time}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white leading-tight">
                {activeAlert.title}
              </h3>
              {activeAlert.notes && (
                <p className="text-xs text-slate-300 leading-relaxed pt-0.5 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  {activeAlert.notes}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => snoozeActiveAlert(10)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              Snooze 10m
            </button>

            <button
              onClick={handleMarkDone}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-lg emerald-glow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Mark Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
