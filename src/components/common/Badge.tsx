import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'mint' | 'gold' | 'teal' | 'danger' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'sm',
  icon,
}) => {
  const variantMap = {
    emerald: 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30',
    mint: 'bg-emerald-900/40 text-mint-accent border border-emerald-400/40',
    gold: 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
    teal: 'bg-teal-950/80 text-teal-300 border border-teal-500/30',
    danger: 'bg-red-950/80 text-red-400 border border-red-500/30',
    slate: 'bg-slate-900/80 text-slate-300 border border-slate-700/50',
  };

  const sizeMap = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variantMap[variant]} ${sizeMap[size]}`}>
      {icon}
      {children}
    </span>
  );
};
