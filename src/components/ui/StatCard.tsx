import React from 'react';
import { Card, CardContent } from './Card';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  subtitle?: string;
  className?: string;
  iconBgColor?: string;
  badge?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
  iconBgColor = 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400',
  badge,
}) => {
  return (
    <Card hoverable className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {value}
              </h3>
              {badge}
            </div>
          </div>
          <div className={clsx('p-2.5 rounded-xl shrink-0 border border-slate-100 dark:border-slate-800', iconBgColor)}>
            {icon}
          </div>
        </div>

        {(trend || subtitle) && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            {trend && (
              <div className="flex items-center gap-1">
                {trend.isPositive ? (
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    {trend.value}
                  </span>
                ) : (
                  <span className="flex items-center text-rose-600 dark:text-rose-400 font-semibold">
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                    {trend.value}
                  </span>
                )}
                {trend.label && (
                  <span className="text-slate-400 dark:text-slate-500 ml-1">{trend.label}</span>
                )}
              </div>
            )}
            {subtitle && (
              <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
