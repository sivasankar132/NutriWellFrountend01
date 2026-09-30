import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ContextMode } from '../../types';
import { 
  X, GraduationCap, Briefcase, Building, Home, 
  MapPin, UtensilsCrossed, Dumbbell, Sparkles, Check, ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

const modeToSlugMap: Record<string, string> = {
  STUDENT: 'student',
  EMPLOYEE: 'employee',
  HOSTEL: 'hostel',
  HOME: 'home',
  TRAVEL: 'travel',
  EATING_OUT: 'eating-out',
  ACTIVE: 'active',
  WOMEN_WELLNESS: 'womens-wellness',
  OFFICE: 'employee',
  GROCERY: 'home',
};

interface ModeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModeSelectorModal: React.FC<ModeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { contextMode, setContextMode, t } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const modes: {
    id: ContextMode;
    title: string;
    targetTag: string;
    icon: any;
    color: string;
    bg: string;
    border: string;
    budget: string;
    prepTime: string;
    description: string;
    features: string[];
  }[] = [
    {
      id: 'STUDENT',
      title: 'Student Mode',
      targetTag: 'College & Study Routines',
      icon: GraduationCap,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/40',
      budget: '₹150 daily budget',
      prepTime: '20-min quick meals',
      description: 'Affordable meals, mess-friendly staples, study energy, and brain-supportive nutrition.',
      features: ['Hostel-friendly food swaps', 'High protein per rupee focus', 'Exam week hydration anchor']
    },
    {
      id: 'EMPLOYEE',
      title: 'Employee Mode',
      targetTag: 'Working Professionals & Office',
      icon: Briefcase,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-500/40',
      budget: '₹280 daily budget',
      prepTime: '15-min lunch options',
      description: 'Quick desk lunches, cafeteria navigation, short breaks, and workday energy stability.',
      features: ['15-minute lunch options', 'Office-friendly meals', 'Afternoon slump buster']
    },
    {
      id: 'HOSTEL',
      title: 'Hostel / Mess Mode',
      targetTag: 'Limited Kitchen Setup',
      icon: Building,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      budget: '₹130 daily budget',
      prepTime: 'No-cook / Kettle friendly',
      description: 'Practical substitutions for daily mess food, shelf-stable protein staples, and low-cost hacks.',
      features: ['Mess food enhancer hacks', 'Sattu & roasted chana staples', 'No-cook protein options']
    },
    {
      id: 'HOME',
      title: 'Home Mode',
      targetTag: 'Home Kitchen & Family Cooking',
      icon: Home,
      color: 'text-mint-accent',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      budget: 'Flexible budget',
      prepTime: 'Full kitchen prep',
      description: 'Balanced home-cooked recipes, family meal planning, fresh ingredients, and pantry optimization.',
      features: ['Fresh produce prioritization', 'Batch cooking suggestions', 'Family-friendly balanced plates']
    },
    {
      id: 'TRAVEL',
      title: 'Travel Mode',
      targetTag: 'On the Move & Transit',
      icon: MapPin,
      color: 'text-teal-400',
      bg: 'bg-teal-950/40',
      border: 'border-teal-500/40',
      budget: '₹350 daily budget',
      prepTime: 'Portable & packaged',
      description: 'Portable food choices, airport/train station healthy picks, hydration during transit, and regional matches.',
      features: ['Location-aware recommendations', 'Packable healthy snacks', 'Transit digestive support']
    },
    {
      id: 'EATING_OUT',
      title: 'Eating Out Mode',
      targetTag: 'Restaurants & Social Dining',
      icon: UtensilsCrossed,
      color: 'text-purple-400',
      bg: 'bg-purple-950/40',
      border: 'border-purple-500/40',
      budget: 'Menu-matched budget',
      prepTime: 'Order guidance',
      description: 'Smart restaurant menu choices, healthier swaps, hidden calorie awareness, and pre-meal buffers.',
      features: ['Smart menu swaps', 'High-protein dish identification', 'Calorie buffer strategies']
    },
    {
      id: 'ACTIVE',
      title: 'Active / Fitness Mode',
      targetTag: 'Gym, Athletics & High Energy',
      icon: Dumbbell,
      color: 'text-mint-accent',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      budget: 'High protein focus',
      prepTime: 'Pre/Post workout timing',
      description: 'High-protein targets (1.8-2.2g/kg), workout timing, electrolyte balance, and muscle synthesis support.',
      features: ['Pre/Post workout nutrition', 'Protein synthesis timing', 'Electrolyte & hydration booster']
    },
    {
      id: 'WOMEN_WELLNESS',
      title: "Women's Wellness Mode",
      targetTag: 'Iron, Vitality & Balanced Nutrition',
      icon: Sparkles,
      color: 'text-pink-400',
      bg: 'bg-pink-950/40',
      border: 'border-pink-500/40',
      budget: 'Custom budget',
      prepTime: 'Balanced natural meals',
      description: 'General nutrition awareness: iron-rich foods, folate support, hydration, and natural energy balance.',
      features: ['Iron-rich food highlights', 'Anti-inflammatory balanced meals', 'Natural hydration & micronutrients']
    }
  ];

  const handleSelectMode = (modeId: ContextMode) => {
    setContextMode(modeId);
    onClose();
    const slug = modeToSlugMap[modeId] || 'student';
    navigate(`/mode/${slug}`);
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
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Select Your Lifestyle Mode</h2>
                <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>Adaptive Intelligence</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                NutriWell automatically shapes recommendations, meal times, and budgets to your day
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Cards Grid */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = contextMode === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => handleSelectMode(m.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                      isActive
                        ? 'bg-emerald-950/70 border-emerald-400 shadow-lg emerald-glow-sm'
                        : 'bg-slate-950/80 border-emerald-900/40 hover:border-emerald-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl bg-slate-900 border border-emerald-900/40 ${m.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {m.title}
                            </h3>
                            <span className="text-[10px] text-slate-400 block">{m.targetTag}</span>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="p-1 rounded-full bg-emerald-500 text-slate-950">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-emerald-900/40 text-emerald-300 font-semibold">
                          {m.budget}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-emerald-900/40 text-slate-300">
                          {m.prepTime}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-900/30 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-emerald-300 transition-colors">
                      <span>{isActive ? 'Active Mode' : 'Set as Current Mode'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
