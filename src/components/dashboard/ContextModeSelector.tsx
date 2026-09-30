import React from 'react';
import { useApp } from '../../context/AppContext';
import { ContextMode, UserMode } from '../../types';
import { Home, GraduationCap, Building2, Plane, UtensilsCrossed, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ContextModeSelector: React.FC = () => {
  const { contextMode, setContextMode, userMode, setUserMode } = useApp();

  const modes: { id: ContextMode; label: string; icon: React.ElementType; tag: string }[] = [
    { id: 'HOME', label: 'Home Mode', icon: Home, tag: 'Standard' },
    { id: 'STUDENT', label: 'Student Mode', icon: GraduationCap, tag: '₹120 & 20m prep' },
    { id: 'HOSTEL', label: 'Hostel / Mess', icon: UtensilsCrossed, tag: 'No-stove friendly' },
    { id: 'OFFICE', label: 'Office Mode', icon: Building2, tag: '15m lunch break' },
    { id: 'TRAVEL', label: 'Travel Mode', icon: Plane, tag: 'On-the-go snacks' },
    { id: 'EATING_OUT', label: 'Eating Out', icon: UtensilsCrossed, tag: 'Menu analyzer' },
    { id: 'GROCERY', label: 'Grocery Mode', icon: ShoppingBag, tag: 'Smart basket' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Your Real-Life Context</span>
        
        {/* Teen Safety Mode Toggle */}
        <button
          onClick={() => setUserMode(userMode === 'ADULT' ? 'TEEN_SAFETY' : 'ADULT')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
            userMode === 'TEEN_SAFETY'
              ? 'bg-teal-950 border-teal-400 text-teal-300 shadow-md'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {userMode === 'TEEN_SAFETY' ? 'Teen Safety Mode Active' : 'Enable Teen Safety Mode'}
        </button>
      </div>

      {/* Context Mode Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = contextMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setContextMode(m.id)}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                  : 'bg-slate-900 border-emerald-900/40 text-slate-400 hover:border-emerald-500/40 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-emerald-400" />
              <span>{m.label}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-emerald-900/50">
                {m.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
