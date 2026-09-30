import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Target, Info, ShieldCheck, CheckCircle2, 
  Dumbbell, Sparkles, Flame, HeartPulse
} from 'lucide-react';
import { DailyExercise } from '../../types';
import { getExerciseVideoInfo, ExerciseVideoInfo } from '../../data/exerciseVideos';
import { ExerciseVideoPlayer } from './ExerciseVideoPlayer';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ExerciseVideoModalProps {
  exercise: DailyExercise | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkComplete?: (exerciseId: string) => void;
}

export const ExerciseVideoModal: React.FC<ExerciseVideoModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onMarkComplete
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!exercise || !isOpen) return null;

  // Merge exercise props with video dataset
  const videoData: ExerciseVideoInfo = getExerciseVideoInfo(exercise.name);

  const displayTarget = exercise.target || videoData.target;
  const displayCategory = exercise.category || videoData.category || 'General';
  const displayDifficulty = exercise.difficulty || videoData.difficulty || 'Beginner';
  const displayEffort = exercise.effortCalories || videoData.effortCalories;
  const displayHelpsWith = exercise.helpsWith?.length ? exercise.helpsWith : videoData.helpsWith;
  const displayInstructions = exercise.instructions?.length ? exercise.instructions : videoData.instructions;
  const displayMuscles = exercise.muscles?.length ? exercise.muscles : videoData.muscles;
  const displaySafety = exercise.safetyTips || videoData.safetyTips;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Dimmed backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl shadow-emerald-950/50 z-10 overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-900/40 bg-slate-950/60 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                <Dumbbell className="w-4 h-4" />
              </div>
              <h3 
                id="video-modal-title"
                className="text-base sm:text-lg font-black text-white uppercase tracking-wider truncate"
              >
                {exercise.name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-colors ml-3 cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* 1. REAL HTML5 VIDEO PLAYER */}
            <ExerciseVideoPlayer exercise={videoData} autoPlay={false} />

            {/* 2. Target Routine & Badges Bar */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="mint">{displayCategory}</Badge>
                  <Badge variant="slate">{displayDifficulty}</Badge>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 pt-1">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Target: <span className="text-amber-300 font-bold">{displayTarget}</span>
                </p>
              </div>

              {displayEffort && (
                <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Est. {displayEffort}</span>
                </div>
              )}
            </div>

            {/* 3. HOW TO PERFORM */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                How to Perform
              </h4>
              <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800/90 leading-relaxed">
                {displayInstructions.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-white font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 4. WHAT IT HELPS WITH & MUSCLES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* What It Helps With */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  What It Helps With
                </h5>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {displayHelpsWith.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Muscles Involved */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
                  Target Muscles
                </h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {displayMuscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/70 text-[11px] font-semibold text-slate-200"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Safety & Form Guidance */}
            {displaySafety && (
              <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Form &amp; Safety Guidance</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-200/90">
                  {displaySafety} Designed for everyday general wellness and safe movement consistency.
                </p>
              </div>
            )}
          </div>

            {/* Modal Footer Actions */}
          <div className="p-4 sm:px-6 border-t border-emerald-900/40 bg-slate-950/60 flex items-center justify-between gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Close
            </Button>

            {onMarkComplete && (
              <Button
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => {
                  onMarkComplete(exercise.id);
                  onClose();
                }}
                className="text-xs"
              >
                MARK AS COMPLETE
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
