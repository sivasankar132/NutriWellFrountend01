import { Gender } from '../types';

export interface BmiCategoryInfo {
  label: string;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  isHealthy: boolean;
  statusText: string;
  colorHex: string;
  badgeBgClass: string;
  textColorClass: string;
  borderColorClass: string;
  glowClass: string;
  recommendation: string;
}

export const calculateBmi = (weightKg: number, heightCm: number): number => {
  if (!heightCm || heightCm <= 0 || !weightKg || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  return Number(rawBmi.toFixed(1));
};

export const getBmiCategory = (bmi: number): BmiCategoryInfo => {
  if (bmi <= 0) {
    return {
      label: 'Awaiting Inputs',
      category: 'normal',
      isHealthy: true,
      statusText: 'Enter Height & Weight',
      colorHex: '#10b981',
      badgeBgClass: 'bg-slate-800/80 text-slate-300',
      textColorClass: 'text-slate-400',
      borderColorClass: 'border-slate-700',
      glowClass: '',
      recommendation: 'Enter your biometric details above to calculate your BMI and metabolic baseline.',
    };
  }

  if (bmi < 18.5) {
    return {
      label: 'Underweight',
      category: 'underweight',
      isHealthy: false,
      statusText: 'Below Healthy Range',
      colorHex: '#38bdf8',
      badgeBgClass: 'bg-sky-500/15 text-sky-300',
      textColorClass: 'text-sky-400',
      borderColorClass: 'border-sky-500/40',
      glowClass: 'shadow-[0_0_15px_rgba(56,189,248,0.25)]',
      recommendation: 'Your BMI is below the healthy threshold. NutriWell will formulate calorie-dense, nutritious meal plans to help build lean mass safely.',
    };
  }

  if (bmi <= 24.9) {
    return {
      label: 'Healthy Weight',
      category: 'normal',
      isHealthy: true,
      statusText: 'Healthy BMI Range',
      colorHex: '#10b981',
      badgeBgClass: 'bg-emerald-500/20 text-emerald-300',
      textColorClass: 'text-emerald-400',
      borderColorClass: 'border-emerald-500/50',
      glowClass: 'emerald-glow-sm',
      recommendation: 'Great job! Your BMI is in the optimal healthy range. NutriWell will tailor maintenance nutrition to protect cardiovascular and metabolic health.',
    };
  }

  if (bmi <= 29.9) {
    return {
      label: 'Overweight',
      category: 'overweight',
      isHealthy: false,
      statusText: 'Above Healthy Range',
      colorHex: '#f59e0b',
      badgeBgClass: 'bg-amber-500/15 text-amber-300',
      textColorClass: 'text-amber-400',
      borderColorClass: 'border-amber-500/40',
      glowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
      recommendation: 'Your BMI is slightly above the standard healthy zone. A gentle caloric deficit paired with high-protein foods will guide you to your ideal range.',
    };
  }

  return {
    label: 'Obesity Range',
    category: 'obese',
    isHealthy: false,
    statusText: 'High BMI (Obese Range)',
    colorHex: '#f43f5e',
    badgeBgClass: 'bg-rose-500/15 text-rose-300',
    textColorClass: 'text-rose-400',
    borderColorClass: 'border-rose-500/40',
    glowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    recommendation: 'Your BMI falls into the obesity category. NutriWell will help prioritize fiber, clean proteins, and structured hydration for safe, steady wellness progression.',
  };
};

export const getHealthyWeightRange = (heightCm: number): { minKg: number; maxKg: number } => {
  if (!heightCm || heightCm <= 0) return { minKg: 50, maxKg: 70 };
  const heightM = heightCm / 100;
  const minKg = Number((18.5 * heightM * heightM).toFixed(1));
  const maxKg = Number((24.9 * heightM * heightM).toFixed(1));
  return { minKg, maxKg };
};

export const calculateBmr = (
  gender: Gender,
  weightKg: number,
  heightCm: number,
  age: number
): number => {
  if (!weightKg || !heightCm || !age) return 0;
  // Mifflin-St Jeor Equation
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'Male') {
    return Math.round(base + 5);
  } else if (gender === 'Female') {
    return Math.round(base - 161);
  } else {
    return Math.round(base - 78);
  }
};

/**
 * Maps BMI smoothly across the 4 equal-width segments (25% each):
 * 0% - 25%   : Underweight (BMI < 18.5, baseline 14)
 * 25% - 50%  : Normal / Healthy (18.5 to 24.9)
 * 50% - 75%  : Overweight (25.0 to 29.9)
 * 75% - 100% : Obese (>= 30, ceiling 38)
 */
export const getBmiPositionPercent = (bmi: number): number => {
  if (bmi <= 0) return 37.5; // default center of healthy range
  if (bmi <= 14) return 3;
  if (bmi < 18.5) {
    const ratio = (bmi - 14) / (18.5 - 14);
    return Math.max(3, ratio * 25);
  }
  if (bmi < 25.0) {
    const ratio = (bmi - 18.5) / (25.0 - 18.5);
    return 25 + ratio * 25;
  }
  if (bmi < 30.0) {
    const ratio = (bmi - 25.0) / (30.0 - 25.0);
    return 50 + ratio * 25;
  }
  const ratio = Math.min(1, (bmi - 30.0) / (38.0 - 30.0));
  return Math.min(97, 75 + ratio * 25);
};
