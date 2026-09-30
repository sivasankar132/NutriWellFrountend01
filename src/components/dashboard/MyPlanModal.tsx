import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, Calendar, Target, CheckCircle2, Circle, Flame, Droplets, 
  Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Crown
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface MyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFixNextMeal?: () => void;
}

export const MyPlanModal: React.FC<MyPlanModalProps> = ({ isOpen, onClose, onFixNextMeal }) => {
  const { user, tier, setTier, showToast } = useApp();
  const [completedItems, setCompletedItems] = useState<string[]>(['act-2']);

  if (!isOpen) return null;

  const todayPriorities = [
    {
      id: 'act-1',
      title: 'Close 32g Protein Gap at Lunch / Dinner',
      description: 'Add Sprouted Moong Salad or Paneer Tikka (approx. 24-28g protein) to stay in muscle synthesis range.',
      category: 'Protein',
      icon: Flame,
      color: 'text-amber-400',
    },
    {
      id: 'act-2',
      title: 'Hit 2,250ml Hydration Milestone',
      description: 'Drink 2 glasses of water before afternoon study or desk block.',
      category: 'Hydration',
      icon: Droplets,
      color: 'text-cyan-400',
    },
    {
      id: 'act-3',
      title: 'Budget Discipline: Target under ₹180 for Dinner',
      description: 'Optimize cost-per-gram protein using local staples (dal, eggs, tofu/paneer).',
      category: 'Budget',
      icon: Target,
      color: 'text-emerald-400',
    },
    {
      id: 'act-4',
      title: '15-Minute Post-Meal Digestion Walk',
      description: 'Smooths glucose response and boosts evening metabolic rate.',
      category: 'Habit',
      icon: Zap,
      color: 'text-mint-accent',
    },
  ];

  const weeklyMilestones = [
    { day: 'Mon', focus: 'Protein Anchor Setup', target: '105g achieved' },
    { day: 'Tue', focus: 'Hydration Consistency', target: '3.0L achieved' },
    { day: 'Wed', focus: 'Budget Optimization (₹220 avg)', target: 'On Track' },
    { day: 'Thu (Today)', focus: 'Mid-Day Protein Timing', target: 'In Progress' },
    { day: 'Fri', focus: 'Pre-Weekend Micronutrient Load', target: 'Upcoming' },
    { day: 'Sat-Sun', focus: 'Social Eating Calorie Buffer', target: 'Planned' },
  ];

  const toggleItem = (id: string) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(i => i !== id));
      showToast('Action item unmarked.');
    } else {
      setCompletedItems([...completedItems, id]);
      showToast('Great job! Action item completed. 🔥');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/50 text-emerald-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">My Personalized Health Plan</h2>
                  {tier === 'PREMIUM' ? (
                    <Badge variant="gold" icon={<Crown className="w-3 h-3" />}>Premium Intelligence</Badge>
                  ) : (
                    <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>Active Plan</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400">Tactical daily execution items and 7-day nutritional trajectory</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
            {/* Today's 4 Priority Action Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Today's 4 Tactical Priorities
                </h3>
                <span className="text-[11px] text-slate-400">
                  {completedItems.length} of {todayPriorities.length} Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {todayPriorities.map((item) => {
                  const isDone = completedItems.includes(item.id);
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/40 opacity-80'
                          : 'bg-slate-950 border-emerald-900/40 hover:border-emerald-500/50'
                      }`}
                    >
                      <button className="mt-0.5 text-emerald-400 hover:scale-110 transition-transform">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-mint-accent fill-emerald-950" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {item.title}
                          </h4>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-emerald-900/40 text-slate-300">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {onFixNextMeal && (
                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    onClick={() => {
                      onClose();
                      onFixNextMeal();
                    }}
                  >
                    Fix My Next Meal According to Plan
                  </Button>
                </div>
              )}
            </div>

            {/* This Week's Focus Roadmap */}
            <div className="space-y-3 pt-2 border-t border-emerald-900/30">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-mint-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  This Week's Nutritional Focus: Protein & Hydration Anchor
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {weeklyMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-emerald-900/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{m.day}</span>
                      <span className={`text-[10px] font-semibold ${
                        m.target.includes('achieved') ? 'text-mint-accent' : m.target === 'In Progress' ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {m.target}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{m.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium vs Free Intelligence Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="gold" icon={<Crown className="w-3.5 h-3.5" />}>
                    {tier === 'PREMIUM' ? 'PREMIUM INTELLIGENCE ACTIVE' : 'UPGRADE TO DEEP NUTRITIONAL INTELLIGENCE'}
                  </Badge>
                </div>
                <button
                  onClick={() => setTier(tier === 'PREMIUM' ? 'FREE' : 'PREMIUM')}
                  className="text-xs text-mint-accent hover:underline font-semibold cursor-pointer"
                >
                  {tier === 'PREMIUM' ? 'Switch to Free Tier Demo' : 'Simulate Premium ✦'}
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tier === 'PREMIUM'
                  ? 'Your active plan includes continuous adaptive macro recalculation, grocery batch optimization, and doctor-ready export files.'
                  : 'Free tier includes full daily priorities and weekly milestones. Premium unlocks 4-week periodized cycles, biometric sync, and micronutrient tracking.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
