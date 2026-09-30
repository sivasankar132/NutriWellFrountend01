import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Stethoscope, AlertTriangle, Utensils, HeartPulse, Bot } from 'lucide-react';

interface MagicNavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  isSpecial?: boolean;
}

export const MagicNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: MagicNavItem[] = [
    { id: 'home', label: 'Home', path: '/home', icon: Home },
    { id: 'doctors', label: 'Doctor', path: '/doctors', icon: Stethoscope },
    { id: 'emergency', label: 'Emergency', path: '/emergency', icon: AlertTriangle, isSpecial: true },
    { id: 'plate', label: 'Plate', path: '/nutrition', icon: Utensils },
    { id: 'health', label: 'Conditions', path: '/health-conditions', icon: HeartPulse },
    { id: 'ai', label: 'AI Assist', path: '/ai-assistant', icon: Bot, isSpecial: true },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <nav className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950/90 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl emerald-glow-md">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-300 group cursor-pointer ${
                isActive ? 'text-emerald-300 font-semibold' : 'text-slate-400 hover:text-emerald-200'
              }`}
            >
              {/* Animated Spring Indicator Background */}
              {isActive && (
                <motion.div
                  layoutId="magic-nav-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/40 to-teal-500/40 border border-emerald-400/50 emerald-glow-sm"
                />
              )}

              {/* Icon Container */}
              <motion.div
                animate={isActive ? { y: -4, scale: 1.15 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className={`relative z-10 p-1.5 rounded-full ${
                  item.isSpecial && item.id === 'emergency'
                    ? 'text-amber-400'
                    : item.isSpecial && item.id === 'ai'
                    ? 'text-mint-accent'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>

              {/* Label */}
              <span className="relative z-10 text-[11px] tracking-tight mt-0.5 whitespace-nowrap">
                {item.label}
              </span>

              {/* Top Glow Dot for Active Item */}
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
