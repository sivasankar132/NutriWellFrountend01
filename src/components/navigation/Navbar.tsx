import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, Globe, User, Bell, Shield, Coins, Camera } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';

export const Navbar: React.FC = () => {
  const { user, language, setLanguage, setIsBudgetModalOpen, setIsScannerOpen, t } = useApp();
  const navigate = useNavigate();

  const userName = user?.name || 'Siva Sankar';
  const budget = user?.dailyFoodBudgetInr || 150;
  const spent = user?.spentTodayInr || 0;
  const remaining = budget - spent;
  const goal = user?.nutritionGoal || 'Muscle Gain';
  const currentLang = (language || 'en').toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-emerald-900/30 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg emerald-glow-sm group-hover:emerald-glow-md transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              NUTRI<span className="text-emerald-400">WELL</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">AI</span>
            </span>
            <p className="text-[10px] text-emerald-500/70 font-medium tracking-wide">HEALTH INTELLIGENCE</p>
          </div>
        </Link>

        {/* Center Quick Stats */}
        <div className="hidden md:flex items-center gap-4 bg-emerald-950/40 border border-emerald-800/30 rounded-full px-4 py-1.5 text-xs">
          <button
            type="button"
            onClick={() => setIsBudgetModalOpen(true)}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-white hover:bg-emerald-900/60 px-2.5 py-0.5 rounded-full transition-all cursor-pointer group"
            title="Click to view & manage selected budget items"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Budget: <strong className="text-white">₹{remaining}</strong> / ₹{budget}</span>
          </button>
          <span className="text-emerald-800">|</span>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal: <strong className="text-white">{goal}</strong></span>
          </div>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Scan Food AI Vision Button */}
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md transition-all cursor-pointer emerald-glow-sm"
            title="Scan Food with AI Vision"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Scan Food</span>
          </button>

          {/* Role Switcher (Patient / Doctor / Admin) */}
          <RoleSwitcher />

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-900/50 text-slate-300 text-xs hover:border-emerald-500/40 transition-colors"
            title="Switch Language (English / Telugu)"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-emerald-300">{currentLang}</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigate('/journal')}
            className="p-2 rounded-lg bg-slate-900 border border-emerald-900/50 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 hover:border-emerald-400/50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              {userName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-slate-200 hidden sm:inline">{userName}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
