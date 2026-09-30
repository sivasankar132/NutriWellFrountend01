import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Home, Utensils, Camera, BarChart2, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsScannerOpen } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', path: '/home', icon: Home },
    { id: 'nutrition', label: 'Nutrition', path: '/nutrition', icon: Utensils },
    { id: 'scanner', label: 'Scan', path: '/scanner', icon: Camera, isScannerBtn: true },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: BarChart2 },
    { id: 'profile', label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/95 border-t border-emerald-900/40 backdrop-blur-2xl px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isScannerBtn) {
            return (
              <button
                key={item.id}
                onClick={() => setIsScannerOpen(true)}
                className="relative -top-4 min-w-[48px] min-h-[48px] p-3 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-xl shadow-emerald-900/60 emerald-glow-lg border-2 border-slate-950 flex flex-col items-center justify-center cursor-pointer"
                aria-label="Open AI Food Scanner"
              >
                <Camera className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
              {isActive && <motion.div layoutId="mobile-dot" className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
