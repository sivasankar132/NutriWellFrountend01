import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, Sparkles, Activity, Droplets, Flame, Moon, 
  TrendingUp, ShieldCheck, Zap, HeartPulse, RefreshCw
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface HealthTwinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthTwinModal: React.FC<HealthTwinModalProps> = ({ isOpen, onClose }) => {
  const { user, showToast } = useApp();

  if (!isOpen) return null;

  const pillars = [
    { label: 'Nutrition & Macros', score: 86, icon: Flame, color: 'text-amber-400', barColor: 'bg-amber-400' },
    { label: 'Cellular Hydration', score: 75, icon: Droplets, color: 'text-cyan-400', barColor: 'bg-cyan-400' },
    { label: 'Metabolic Consistency', score: 88, icon: Activity, color: 'text-mint-accent', barColor: 'bg-mint-accent' },
    { label: 'Recovery & Rest', score: 80, icon: Moon, color: 'text-teal-400', barColor: 'bg-teal-400' },
  ];

  const overallScore = Math.round(pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length);

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
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/50 text-emerald-400">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Digital Health Twin</h2>
                  <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>Active Simulation</Badge>
                </div>
                <p className="text-xs text-slate-400">Holistic biological state model & 30-day projected trajectory</p>
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
            {/* Core Health Twin Index Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-teal-950/80 border border-emerald-400/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Radial Score Circle */}
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-slate-950 border-4 border-emerald-500/40 shadow-inner">
                  <div className="text-center">
                    <span className="text-2xl font-black text-mint-accent">{overallScore}</span>
                    <span className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest">/100</span>
                  </div>
                </div>

                <div>
                  <Badge variant="mint" icon={<Zap className="w-3 h-3" />}>HIGH BIOLOGICAL VITALITY</Badge>
                  <h3 className="text-base font-bold text-white mt-1">Holistic Wellness Score</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Modeled for {user.name} ({user.age}y, {user.weightKg}kg, {user.activityLevel})
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-emerald-900/50 sm:pl-6 w-full sm:w-auto">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Current Habit Streak</span>
                <p className="text-xl font-extrabold text-white mt-0.5">6 Consecutive Days 🔥</p>
                <span className="text-xs text-emerald-400 font-medium">+14% vs last week</span>
              </div>
            </div>

            {/* 4 Health Pillars Progress */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Multi-Pillar Biological Balance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${pillar.color}`} />
                          <span className="text-xs font-bold text-white">{pillar.label}</span>
                        </div>
                        <span className={`text-xs font-bold ${pillar.color}`}>{pillar.score}%</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-emerald-900/40">
                        <div
                          className={`h-full rounded-full ${pillar.barColor}`}
                          style={{ width: `${pillar.score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 30-Day Simulated Trajectory */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-mint-accent" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    30-Day Biological Projection Model
                  </h4>
                </div>
                <Badge variant="teal">94% Confidence</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Projected Lean Retention</span>
                  <p className="text-sm font-bold text-mint-accent mt-0.5">+1.8 kg muscle</p>
                  <span className="text-[10px] text-slate-500">at 120g daily protein</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Estimated Body Fat</span>
                  <p className="text-sm font-bold text-teal-300 mt-0.5">15.8% → 14.4%</p>
                  <span className="text-[10px] text-slate-500">gradual healthy recomp</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Daily Energy Index</span>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">+22% sustained</p>
                  <span className="text-[10px] text-slate-500">hydration & balanced GI</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                *Non-diagnostic predictive simulation based on registered intake trends, metabolic basal estimation, and behavioral adherence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
