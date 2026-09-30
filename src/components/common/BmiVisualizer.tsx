import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Scale, Flame, Activity } from 'lucide-react';
import { 
  calculateBmi, 
  getBmiCategory, 
  getHealthyWeightRange, 
  calculateBmr, 
  getBmiPositionPercent 
} from '../../services/bmiService';
import { Gender } from '../../types';

interface BmiVisualizerProps {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  compact?: boolean;
}

export const BmiVisualizer: React.FC<BmiVisualizerProps> = ({
  gender,
  age,
  heightCm,
  weightKg,
  compact = false,
}) => {
  const bmi = calculateBmi(weightKg, heightCm);
  const info = getBmiCategory(bmi);
  const healthyRange = getHealthyWeightRange(heightCm);
  const bmr = calculateBmr(gender, weightKg, heightCm, age);
  const positionPct = getBmiPositionPercent(bmi);

  let weightDiff: { type: 'healthy' | 'above' | 'below'; amount: number } | null = null;
  if (weightKg > 0 && bmi > 0) {
    if (weightKg > healthyRange.maxKg) {
      weightDiff = {
        type: 'above',
        amount: Number((weightKg - healthyRange.maxKg).toFixed(1)),
      };
    } else if (weightKg < healthyRange.minKg) {
      weightDiff = {
        type: 'below',
        amount: Number((healthyRange.minKg - weightKg).toFixed(1)),
      };
    } else {
      weightDiff = { type: 'healthy', amount: 0 };
    }
  }

  return (
    <div className="w-full rounded-2xl bg-slate-950/70 border border-emerald-900/40 p-4 sm:p-5 space-y-4 backdrop-blur-md shadow-xl transition-all">
      {/* Header: Title + Dynamic BMI score badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/30 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              Live BMI & Body Metric Analysis
              <span className="text-[10px] font-normal text-emerald-400/80 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/40">
                WHO Standard
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Calculated dynamically from your height ({heightCm || '--'} cm) and weight ({weightKg || '--'} kg)
            </p>
          </div>
        </div>

        {/* BMI Score Pill */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                {bmi > 0 ? bmi : '--'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">BMI (kg/m²)</span>
            </div>
            <span
              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${info.badgeBgClass} ${info.borderColorClass}`}
            >
              {info.label}
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Healthy vs Not-Healthy Status Banner */}
      <motion.div
        key={`${info.category}-${info.isHealthy}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
          info.isHealthy
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200 emerald-glow-sm'
            : info.category === 'underweight'
            ? 'bg-sky-950/60 border-sky-500/40 text-sky-200'
            : info.category === 'overweight'
            ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
            : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
        }`}
      >
        {info.isHealthy ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 font-bold mb-0.5">
            <span>{info.statusText}</span>
            {info.isHealthy ? (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-500/30">
                Healthy Target Met ✓
              </span>
            ) : (
              <span className="text-[10px] bg-white/10 text-white px-2 py-0.2 rounded-full border border-white/20">
                Target: 18.5 – 24.9
              </span>
            )}
          </div>
          <p className="text-[11px] opacity-90">{info.recommendation}</p>
        </div>
      </motion.div>

      {/* The Visual Multi-Zone BMI Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>BMI Spectrum & Calibration</span>
          <span className="text-emerald-400 font-semibold">Green = Healthy Range</span>
        </div>

        {/* Bar Container */}
        <div className="relative pt-6 pb-2">
          {/* Animated Needle Indicator */}
          <motion.div
            className="absolute top-0 -bottom-1 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
            initial={false}
            animate={{ left: `${positionPct}%` }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Value Tooltip Above Pin */}
            <div
              className={`px-2 py-0.5 rounded-md text-[11px] font-black text-white shadow-xl flex items-center gap-1 border whitespace-nowrap ${
                info.isHealthy
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900 border-white/40 text-white'
              }`}
            >
              <span>{bmi > 0 ? bmi : '--'}</span>
              <span className="text-[9px] font-normal opacity-80">BMI</span>
            </div>
            {/* Needle Shaft */}
            <div
              className={`w-1 h-5 mt-0.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
                info.isHealthy ? 'bg-emerald-300' : 'bg-white'
              }`}
            />
            {/* Downward triangle pointer */}
            <div
              className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] ${
                info.isHealthy ? 'border-t-emerald-300' : 'border-t-white'
              }`}
            />
          </motion.div>

          {/* Color Segments Track */}
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-900 border border-slate-800 shadow-inner">
            {/* Underweight: < 18.5 */}
            <div
              className="h-full bg-gradient-to-r from-sky-600 to-sky-400 relative group"
              style={{ width: '25%' }}
              title="Underweight (< 18.5)"
            />
            {/* Normal / Healthy: 18.5 - 24.9 */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 relative shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              style={{ width: '25%' }}
              title="Healthy / Normal (18.5 - 24.9)"
            />
            {/* Overweight: 25 - 29.9 */}
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 relative"
              style={{ width: '25%' }}
              title="Overweight (25 - 29.9)"
            />
            {/* Obese: >= 30 */}
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-rose-600 relative"
              style={{ width: '25%' }}
              title="Obesity Range (≥ 30)"
            />
          </div>
        </div>

        {/* 4 Scale Segment Labels */}
        <div className="grid grid-cols-4 text-center text-[10px] gap-1 pt-0.5">
          <div className="flex flex-col items-center">
            <span className="text-sky-400 font-bold">&lt; 18.5</span>
            <span className="text-slate-400 text-[9px] sm:text-[10px]">Underweight</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 font-bold">18.5 – 24.9</span>
            <span className="text-emerald-300 font-semibold text-[9px] sm:text-[10px] flex items-center gap-0.5">
              Healthy ✨
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold">25.0 – 29.9</span>
            <span className="text-slate-400 text-[9px] sm:text-[10px]">Overweight</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-rose-400 font-bold">≥ 30.0</span>
            <span className="text-slate-400 text-[9px] sm:text-[10px]">Obese</span>
          </div>
        </div>
      </div>

      {/* Target Healthy Weight Range & BMR Guidance Grid */}
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-emerald-900/30 text-xs">
          {/* Healthy Weight Card */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800/40 text-emerald-400 shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">
                Healthy Target Weight
              </span>
              <p className="text-xs font-bold text-white mt-0.5">
                {healthyRange.minKg} kg – {healthyRange.maxKg} kg
              </p>
              {weightDiff && weightDiff.type === 'healthy' && (
                <span className="text-[10px] text-emerald-400 font-semibold">
                  You are inside your optimal weight!
                </span>
              )}
              {weightDiff && weightDiff.type === 'above' && (
                <span className="text-[10px] text-amber-400 font-semibold">
                  {weightDiff.amount} kg above healthy ceiling
                </span>
              )}
              {weightDiff && weightDiff.type === 'below' && (
                <span className="text-[10px] text-sky-400 font-semibold">
                  {weightDiff.amount} kg below healthy threshold
                </span>
              )}
            </div>
          </div>

          {/* BMR Card */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">
                Basal Metabolic Rate ({gender})
              </span>
              <p className="text-xs font-bold text-white mt-0.5">
                {bmr > 0 ? `${bmr.toLocaleString()} kcal/day` : '--'}
              </p>
              <span className="text-[10px] text-slate-400">
                Baseline energy burned at rest
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
