import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Grid, Sparkles, User, Target, HeartPulse, FlaskConical, 
  Brain, BarChart2, MapPin, X, Bell 
} from 'lucide-react';
import { ReminderHubModal } from '../dashboard/ReminderHubModal';
import { MyHealthModal } from '../dashboard/MyHealthModal';
import { MyPlanModal } from '../dashboard/MyPlanModal';
import { HealthTwinModal } from '../dashboard/HealthTwinModal';
import { WhatIfLabModal } from '../dashboard/WhatIfLabModal';
import { MyPatternsModal } from '../dashboard/MyPatternsModal';
import { OutOfStateModal } from '../dashboard/OutOfStateModal';
import { FutureYouModal } from '../dashboard/FutureYouModal';

export const QuickAction9Dot: React.FC = () => {
  const { isQuickActionsOpen, setIsQuickActionsOpen, t } = useApp();
  const navigate = useNavigate();

  // Command Center Modal States
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isTwinOpen, setIsTwinOpen] = useState(false);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [isPatternsOpen, setIsPatternsOpen] = useState(false);
  const [isOutOfStateOpen, setIsOutOfStateOpen] = useState(false);
  const [isFutureYouOpen, setIsFutureYouOpen] = useState(false);

  const intelligenceActions = [
    // 1: Health Reminders & Schedule
    {
      id: 'reminders',
      label: 'Reminders',
      subtitle: 'Schedule & Alerts',
      icon: Bell,
      color: 'text-mint-accent',
      bg: 'bg-emerald-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsRemindersOpen(true);
      }
    },
    // 2: My Health
    {
      id: 'my-health',
      label: 'My Health',
      subtitle: 'Profile & Memory',
      icon: User,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsHealthOpen(true);
      }
    },
    // 3: My Plan
    {
      id: 'my-plan',
      label: 'My Plan',
      subtitle: "Today's Priorities",
      icon: Target,
      color: 'text-teal-300',
      bg: 'bg-teal-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsPlanOpen(true);
      }
    },
    // 4: Health Twin
    {
      id: 'health-twin',
      label: 'Health Twin',
      subtitle: 'Digital Model',
      icon: HeartPulse,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsTwinOpen(true);
      }
    },
    // 5: What-If Lab
    {
      id: 'what-if-lab',
      label: 'What-If Lab',
      subtitle: 'Impact Simulator',
      icon: FlaskConical,
      color: 'text-amber-400',
      bg: 'bg-amber-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsWhatIfOpen(true);
      }
    },
    // 6: My Patterns
    {
      id: 'my-patterns',
      label: 'My Patterns',
      subtitle: 'Habit Diagnostics',
      icon: Brain,
      color: 'text-purple-400',
      bg: 'bg-purple-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsPatternsOpen(true);
      }
    },
    // 7: Analytics
    {
      id: 'analytics',
      label: 'Analytics',
      subtitle: '30-Day Trends',
      icon: BarChart2,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        navigate('/analytics');
      }
    },
    // 8: Out of State
    {
      id: 'out-of-state',
      label: 'Out of State 📍',
      subtitle: 'Location Nutrition',
      icon: MapPin,
      color: 'text-teal-400',
      bg: 'bg-teal-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsOutOfStateOpen(true);
      }
    },
    // 9: Future You
    {
      id: 'future-you',
      label: 'Future You 🔮',
      subtitle: '30-Day Trend',
      icon: Sparkles,
      color: 'text-purple-300',
      bg: 'bg-purple-950/70',
      action: () => {
        setIsQuickActionsOpen(false);
        setIsFutureYouOpen(true);
      }
    }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-6 z-40 md:bottom-8 md:right-8">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
            isQuickActionsOpen
              ? 'bg-red-600 text-white shadow-red-900/40 rotate-90'
              : 'bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-emerald-900/50 emerald-glow-lg border border-emerald-300/40'
          }`}
          aria-label="Toggle 9-Dot AI Command Center"
        >
          {isQuickActionsOpen ? <X className="w-6 h-6" /> : <Grid className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Expanded 9-Dot Action Grid Backdrop & Card */}
      <AnimatePresence>
        {isQuickActionsOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickActionsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative z-50 w-full max-w-md rounded-3xl bg-slate-900/95 border border-emerald-500/40 p-5 sm:p-6 shadow-2xl emerald-glow-lg backdrop-blur-2xl"
            >
              <div className="text-center mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI Health Command Center
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">NutriWell 9-Tool Intelligence</h3>
                <p className="text-xs text-slate-400">Context-aware tools tailored to your daily health goals</p>
              </div>

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {intelligenceActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <motion.button
                      key={act.id}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={act.action}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950/85 border border-emerald-900/40 hover:border-emerald-400/50 hover:bg-emerald-950/40 transition-all group cursor-pointer text-center"
                    >
                      <div className={`p-2.5 rounded-xl ${act.bg} group-hover:scale-110 transition-transform ${act.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 mt-2 line-clamp-1 group-hover:text-emerald-300">
                        {act.label}
                      </span>
                      <span className="text-[9px] text-slate-400 line-clamp-1">
                        {act.subtitle}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Modals */}
      <ReminderHubModal 
        isOpen={isRemindersOpen} 
        onClose={() => setIsRemindersOpen(false)} 
      />
      <MyHealthModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} />
      <MyPlanModal 
        isOpen={isPlanOpen} 
        onClose={() => setIsPlanOpen(false)} 
        onFixNextMeal={() => navigate('/nutrition')} 
      />
      <HealthTwinModal isOpen={isTwinOpen} onClose={() => setIsTwinOpen(false)} />
      <WhatIfLabModal isOpen={isWhatIfOpen} onClose={() => setIsWhatIfOpen(false)} />
      <MyPatternsModal isOpen={isPatternsOpen} onClose={() => setIsPatternsOpen(false)} />
      <OutOfStateModal isOpen={isOutOfStateOpen} onClose={() => setIsOutOfStateOpen(false)} />
      <FutureYouModal 
        isOpen={isFutureYouOpen} 
        onClose={() => setIsFutureYouOpen(false)} 
        onPlanNextMeal={() => navigate('/nutrition')} 
      />
    </>
  );
};
