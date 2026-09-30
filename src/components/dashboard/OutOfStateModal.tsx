import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { OutOfStateRecommendation } from '../../types';
import { 
  X, MapPin, Sparkles, Lock, Unlock, CheckCircle2, 
  ArrowRight, Compass, Utensils, DollarSign, Flame, Clock
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface OutOfStateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutOfStateModal: React.FC<OutOfStateModalProps> = ({ isOpen, onClose }) => {
  const { 
    user, 
    contextMode, 
    outOfStateDestination, 
    setOutOfStateDestination, 
    outOfStatePlan, 
    generateOutOfStatePlan, 
    toggleLockOutOfStatePlan,
    showToast
  } = useApp();

  const [destinationInput, setDestinationInput] = useState(outOfStateDestination || 'Bangalore');
  const [currentCity, setCurrentCity] = useState('Hyderabad');

  if (!isOpen) return null;

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (destinationInput.trim()) {
      generateOutOfStatePlan(destinationInput.trim());
    }
  };

  const getRecommendationsForCity = (city: string): OutOfStateRecommendation[] => {
    const c = city.toLowerCase();
    if (c.includes('bangalore') || c.includes('bengaluru')) {
      return [
        {
          id: 'rec-1',
          name: 'Ragi Dosa + Sambar + Fresh Curd',
          matchPct: 94,
          category: 'Breakfast / Snack',
          calories: 340,
          protein: 22,
          costInr: 45,
          reasonWhy: `Optimal match for your ${user.nutritionGoal} goal and ₹${user.dailyFoodBudgetInr} daily food target.`
        },
        {
          id: 'rec-2',
          name: 'South Karnataka Thali with Extra Dal & Sprouts',
          matchPct: 88,
          category: 'Lunch',
          calories: 520,
          protein: 28,
          costInr: 70,
          reasonWhy: 'High-fiber pulse combination providing slow-burning energy and high protein density.'
        },
        {
          id: 'rec-3',
          name: 'Steamed Idli + Sambar + 2 Boiled Eggs',
          matchPct: 84,
          category: 'Quick Meal',
          calories: 380,
          protein: 24,
          costInr: 50,
          reasonWhy: 'Clean, easily digestible protein staple available at local Darshini restaurants.'
        }
      ];
    } else if (c.includes('mumbai') || c.includes('pune')) {
      return [
        {
          id: 'rec-m1',
          name: 'Sprouted Usal Poha with Buttermilk',
          matchPct: 92,
          category: 'Breakfast',
          calories: 360,
          protein: 20,
          costInr: 40,
          reasonWhy: 'Traditional sprouted moth bean bowl rich in active enzymes and complex carbohydrates.'
        },
        {
          id: 'rec-m2',
          name: 'Jowar Bhakri + Pithla + Sprout Salad',
          matchPct: 89,
          category: 'Lunch / Dinner',
          calories: 480,
          protein: 25,
          costInr: 65,
          reasonWhy: 'Gluten-free millet base with high micronutrient content suited for desk & travel days.'
        }
      ];
    } else {
      return [
        {
          id: 'rec-gen-1',
          name: `${destinationInput} Regional Pulse & Paneer Thali`,
          matchPct: 91,
          category: 'Balanced Plate',
          calories: 490,
          protein: 26,
          costInr: 65,
          reasonWhy: `Adapted local option meeting your ${user.dietPreference} preference and protein baseline.`
        },
        {
          id: 'rec-gen-2',
          name: 'Local Sprouted Legume Chaat with Lemon',
          matchPct: 86,
          category: 'Quick Snack',
          calories: 280,
          protein: 18,
          costInr: 35,
          reasonWhy: 'Portable, affordable snack preserving your daily food budget.'
        }
      ];
    }
  };

  const recommendations = getRecommendationsForCity(outOfStatePlan.destination);

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
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Out of State Nutrition 📍</h2>
                  <Badge variant="mint">Location Intelligence</Badge>
                </div>
                <p className="text-xs text-slate-400">
                  Local cuisine recommendations matched to your diet, budget, and targets
                </p>
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
            {/* Location Switcher */}
            <form onSubmit={handleGenerate} className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">Current Location</label>
                  <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-emerald-900/30 text-white text-xs">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentCity}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">New Destination City</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Mumbai, Delhi, Chennai..."
                      value={destinationInput}
                      onChange={(e) => setDestinationInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-emerald-900/40 text-white text-xs outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex gap-1.5 overflow-x-auto text-[11px]">
                  {['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Goa', 'Kolkata'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setDestinationInput(city);
                        generateOutOfStatePlan(city);
                      }}
                      className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        destinationInput === city
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-emerald-900/30 hover:text-white'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                <Button type="submit" variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Match Local Foods
                </Button>
              </div>
            </form>

            {/* Local Recommendations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-mint-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  Top Local Matches in {outOfStatePlan.destination}
                </h3>
                <span className="text-[10px] text-slate-400">Tailored to {user.dietPreference} & ₹{user.dailyFoodBudgetInr} Budget</span>
              </div>

              <div className="space-y-2.5">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 hover:border-emerald-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="mint">{rec.matchPct}% Personal Match</Badge>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{rec.name}</h4>
                      </div>
                      <span className="text-xs font-bold text-amber-300">₹{rec.costInr}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{rec.calories} kcal</span>
                      <span>•</span>
                      <span className="text-mint-accent font-semibold">+{rec.protein}g protein</span>
                      <span>•</span>
                      <span>{rec.category}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-emerald-900/20">
                      💡 {rec.reasonWhy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 24-Hour Local Plan Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-950 to-teal-950/70 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    {outOfStatePlan.destination} 24-Hour Nutrition Plan
                  </span>
                  <span className="text-[10px] text-slate-400">Breakfast, Lunch, Snack & Dinner matched to regional cuisine</span>
                </div>

                {outOfStatePlan.isLocked ? (
                  <Badge variant="mint" icon={<Lock className="w-3 h-3" />}>Plan Locked for 24h ✓</Badge>
                ) : (
                  <Badge variant="teal">Unlocked Plan</Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">Breakfast ✓</span>
                  <p className="text-white font-medium mt-0.5">{outOfStatePlan.meals.breakfast}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] uppercase font-bold text-mint-accent block">Lunch ✓</span>
                  <p className="text-white font-medium mt-0.5">{outOfStatePlan.meals.lunch}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">Snack ✓</span>
                  <p className="text-white font-medium mt-0.5">{outOfStatePlan.meals.snack}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                  <span className="text-[10px] uppercase font-bold text-teal-300 block">Dinner ✓</span>
                  <p className="text-white font-medium mt-0.5">{outOfStatePlan.meals.dinner}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-emerald-900/30">
                <p className="text-[11px] text-slate-400">
                  {outOfStatePlan.isLocked 
                    ? `Your ${outOfStatePlan.destination} plan will stay active for 24 hours during your stay.` 
                    : 'Lock this plan to preserve your daily 24-hour targets while travelling.'}
                </p>

                <Button
                  variant={outOfStatePlan.isLocked ? 'outline' : 'primary'}
                  size="sm"
                  icon={outOfStatePlan.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  onClick={toggleLockOutOfStatePlan}
                >
                  {outOfStatePlan.isLocked ? 'Unlock Plan' : 'Lock My Plan (24h)'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
