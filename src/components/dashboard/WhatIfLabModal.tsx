import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, FlaskConical, Sparkles, Sliders, TrendingUp, 
  DollarSign, Activity, Flame, Droplets, RefreshCw
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface WhatIfLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatIfLabModal: React.FC<WhatIfLabModalProps> = ({ isOpen, onClose }) => {
  const { user } = useApp();

  // Interactive slider parameters
  const [proteinDelta, setProteinDelta] = useState<number>(20); // +20g
  const [waterDelta, setWaterDelta] = useState<number>(500); // +500ml
  const [takeoutReduced, setTakeoutReduced] = useState<number>(2); // -2 meals/week

  if (!isOpen) return null;

  // Real-time calculated projections
  const monthlySavingsInr = takeoutReduced * 250 * 4; // ₹250 saved per meal replaced with home prep
  const projectedMuscleGainsKg = ((proteinDelta * 0.05) + 0.6).toFixed(2);
  const metabolicBoostPct = Math.min(30, Math.round((proteinDelta * 0.4) + (waterDelta * 0.015)));
  const dailyCalorieShift = Math.round((proteinDelta * 4) - (takeoutReduced * 50));

  const applyPreset = (preset: 'muscle' | 'budget' | 'energy') => {
    if (preset === 'muscle') {
      setProteinDelta(30);
      setWaterDelta(750);
      setTakeoutReduced(1);
    } else if (preset === 'budget') {
      setProteinDelta(15);
      setWaterDelta(500);
      setTakeoutReduced(4);
    } else if (preset === 'energy') {
      setProteinDelta(20);
      setWaterDelta(1000);
      setTakeoutReduced(2);
    }
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
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/50 text-emerald-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">What-If Behavioral Lab</h2>
                  <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>Interactive Simulator</Badge>
                </div>
                <p className="text-xs text-slate-400">Simulate nutritional shifts and observe projected 30-day outcomes</p>
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
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase mr-1">Quick Presets:</span>
              <button
                onClick={() => applyPreset('muscle')}
                className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 cursor-pointer transition-colors"
              >
                ⚡ High-Protein Lean Recomp
              </button>
              <button
                onClick={() => applyPreset('budget')}
                className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-800/40 text-xs font-semibold text-amber-300 hover:bg-amber-900/50 cursor-pointer transition-colors"
              >
                💰 Student Budget Hack
              </button>
              <button
                onClick={() => applyPreset('energy')}
                className="px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/50 cursor-pointer transition-colors"
              >
                🌊 Afternoon Fatigue Buster
              </button>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4 p-4 rounded-2xl bg-slate-950 border border-emerald-900/40">
              {/* Slider 1: Protein */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Adjust Daily Protein Intake
                  </span>
                  <span className="text-amber-400 font-bold">
                    {proteinDelta > 0 ? `+${proteinDelta}g` : `${proteinDelta}g`} ({user.dailyProteinTarget + proteinDelta}g Total)
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="50"
                  step="5"
                  value={proteinDelta}
                  onChange={(e) => setProteinDelta(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Water */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    Adjust Daily Hydration
                  </span>
                  <span className="text-cyan-400 font-bold">
                    +{waterDelta}ml ({user.dailyWaterTargetMl + waterDelta}ml Total)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="250"
                  value={waterDelta}
                  onChange={(e) => setWaterDelta(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: Dining Out Swaps */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-mint-accent" />
                    Swap Takeout for Smart Home-Prep
                  </span>
                  <span className="text-mint-accent font-bold">
                    {takeoutReduced} meals / week swapped
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="7"
                  step="1"
                  value={takeoutReduced}
                  onChange={(e) => setTakeoutReduced(Number(e.target.value))}
                  className="w-full accent-mint-accent cursor-pointer"
                />
              </div>
            </div>

            {/* Live Projected Outcomes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Live 30-Day Simulation Results
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-950 border border-emerald-500/40 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Lean Mass Support</span>
                  <p className="text-lg font-extrabold text-mint-accent">+{projectedMuscleGainsKg} kg</p>
                  <p className="text-[11px] text-slate-300">Enhanced muscle retention & post-workout recovery</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/70 to-slate-950 border border-amber-500/40 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Monthly Savings</span>
                  <p className="text-lg font-extrabold text-amber-300">₹{monthlySavingsInr.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-slate-300">Saved by smart grocery swaps vs restaurant delivery</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/70 to-slate-950 border border-cyan-500/40 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Metabolic Energy Index</span>
                  <p className="text-lg font-extrabold text-cyan-300">+{metabolicBoostPct}% Vitality</p>
                  <p className="text-[11px] text-slate-300">Reduced afternoon energy dips & improved focus</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed text-center">
              Simulation updates dynamically using session memory parameters and macro-nutrient metabolic cost models.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
