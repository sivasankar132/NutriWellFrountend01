import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, Sparkles, TrendingUp, Activity, Flame, Droplets, 
  Target, Zap, ShieldCheck, ArrowRight, Clock, Award
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface FutureYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanNextMeal?: () => void;
}

export const FutureYouModal: React.FC<FutureYouModalProps> = ({ isOpen, onClose, onPlanNextMeal }) => {
  const { user, contextMode, t } = useApp();

  if (!isOpen) return null;

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
          exit={{ opacity: 0, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-800/50 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Future You 🔮</h2>
                  <Badge variant="mint">30-Day Trend Intelligence</Badge>
                </div>
                <p className="text-xs text-slate-400">Behavioral trajectory and habit-based progression model</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
            {/* Section 1: Your 30-Day Trend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-mint-accent uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Your 30-Day Behavioral Trend
                </h3>
                <span className="text-[10px] text-slate-400">Based on recent logged choices</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Nutrition Consistency</span>
                  <p className="text-xl font-extrabold text-mint-accent">↑ 14%</p>
                  <p className="text-[11px] text-slate-300">Macro targets reached more consistently on weekdays.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-900/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Hydration Consistency</span>
                  <p className="text-xl font-extrabold text-cyan-300">↑ 9%</p>
                  <p className="text-[11px] text-slate-300">Daily average reached 2.4L across study & work blocks.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Protein Stability</span>
                  <p className="text-base font-extrabold text-amber-300 mt-1">Becoming Stable</p>
                  <p className="text-[11px] text-slate-300">Morning and mid-day protein anchors becoming routine.</p>
                </div>
              </div>
            </div>

            {/* Section 2: If You Continue This Pattern */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-950 to-teal-950/70 border border-emerald-500/40 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  If You Continue This Pattern (Next 30–60 Days)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 space-y-1">
                  <span className="text-emerald-400 font-bold block">✓ Nutrition Consistency ↑</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Higher satiety and balanced glucose curves reduce afternoon cravings and post-lunch lethargy.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 space-y-1">
                  <span className="text-cyan-300 font-bold block">✓ Hydration Consistency ↑</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Improved cellular fluid balance supports sustained mental alertness and smoother digestion.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 space-y-1">
                  <span className="text-amber-300 font-bold block">✓ Meal Consistency ↑</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Regular meal timings reinforce circadian metabolic rhythm without requiring restrictive diets.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 space-y-1">
                  <span className="text-mint-accent font-bold block">✓ {user.nutritionGoal} Adherence ↑</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Daily protein target of {user.dailyProteinTarget}g becomes an effortless second-nature habit.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Your Next Best Move */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
              <span className="text-[10px] uppercase font-bold text-mint-accent block tracking-wider">
                Your Next Best Move
              </span>
              <p className="text-sm font-bold text-white leading-relaxed">
                "Keep your current hydration routine and add one consistent protein-rich snack (e.g. Sprouted Moong or Paneer) around 4:30 PM each day."
              </p>
            </div>

            {/* Non-Diagnostic Disclaimer */}
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              *Estimated trend based on your recent activity and behavioral consistency. Non-diagnostic wellness projection.
            </p>
          </div>

          {/* Footer CTA */}
          <div className="pt-3 border-t border-emerald-900/40 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
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
                Plan My Next Meal
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
