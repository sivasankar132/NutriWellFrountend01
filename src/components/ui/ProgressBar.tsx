import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number; // Current value
  max?: number; // Max value, e.g. 1000 for Wallet Cap
  label?: string;
  showPercent?: boolean;
  showValues?: boolean;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'brand' | 'emerald' | 'amber' | 'rose' | 'sky';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  showValues = false,
  unit = '',
  size = 'md',
  colorScheme = 'brand',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const fillColors = {
    brand: 'bg-gradient-to-r from-brand-500 to-emerald-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    sky: 'bg-sky-500',
  };

  return (
    <div className={clsx('w-full space-y-1.5', className)}>
      {(label || showPercent || showValues) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
          <span>{label}</span>
          <div className="flex items-center gap-2">
            {showValues && (
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {unit}
                {value.toLocaleString()} / {unit}
                {max.toLocaleString()}
              </span>
            )}
            {showPercent && <span className="text-slate-500 dark:text-slate-400">{percentage}%</span>}
          </div>
        </div>
      )}
      <div
        className={clsx(
          'w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50',
          sizeClasses[size]
        )}
      >
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', fillColors[colorScheme])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
