import React, { useState, useEffect } from 'react';
import { FoodItem } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { aiApi } from '../../services/api/aiApi';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface IfIEatThisModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IfIEatThisModal: React.FC<IfIEatThisModalProps> = ({ food, isOpen, onClose }) => {
  const { user, meals, addMeal, showToast } = useApp();
  const [impact, setImpact] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && food) {
      simulateImpact();
    }
  }, [isOpen, food]);

  const simulateImpact = async () => {
    if (!food) return;
    setLoading(true);
    setError(null);
    try {
      const result = await aiApi.ifIEatThis({
        food_name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
        cost_inr: food.costInr,
      });
      setImpact(result);
    } catch (err: any) {
      const msg = err?.message || 'AI generation failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!food) return null;

  const currentCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const currentProtein = meals.reduce((acc, m) => acc + m.protein, 0);

  const fallbackCalPct = Math.round(((currentCalories + food.calories) / user.dailyCalorieTarget) * 100);
  const fallbackProtPct = Math.round(((currentProtein + food.protein) / user.dailyProteinTarget) * 100);

  const calPct = impact?.projectedCaloriePct ?? fallbackCalPct;
  const protPct = impact?.projectedProteinPct ?? fallbackProtPct;

  const handleConfirmLog = () => {
    addMeal({
      foodName: food.name,
      mealType: 'Lunch',
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      costInr: food.costInr,
      image: food.image,
    });
    showToast(`Logged ${food.name}!`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="If I Eat This? — AI Pre-Log Impact Simulator" maxWidth="md">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
          {food.image && <img src={food.image} alt={food.name} className="w-14 h-14 rounded-xl object-cover" />}
          <div>
            <h4 className="text-base font-bold text-white">{food.name}</h4>
            <p className="text-xs text-slate-400">{food.serving || '1 serving'} • ₹{food.costInr}</p>
          </div>
        </div>

        {loading && (
          <div className="py-6 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <p className="text-xs text-emerald-300 font-medium animate-pulse">Simulating macro impact via Gemini AI...</p>
          </div>
        )}

        {!loading && error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/40 text-center space-y-2">
            <AlertTriangle className="w-5 h-5 text-red-400 mx-auto" />
            <p className="text-xs font-bold text-red-300">{error}</p>
            <Button variant="outline" size="sm" onClick={simulateImpact}>
              Retry Simulation
            </Button>
          </div>
        )}

        {!loading && (
          <>
            {/* Projected Impact Meters */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-emerald-900/40">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Projected Daily Calories</span>
                  <span className="text-emerald-400 font-bold">{calPct}% of Daily Target</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, calPct)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Projected Daily Protein</span>
                  <span className="text-mint-accent font-bold">{protPct}% of Daily Target</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-mint-accent rounded-full" style={{ width: `${Math.min(100, protPct)}%` }} />
                </div>
              </div>
            </div>

            {/* AI Advice */}
            {impact?.aiAdvice && (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>{impact.aiAdvice}</p>
              </div>
            )}

            {/* Better Swap Suggestion */}
            {impact?.betterSwap && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                <Badge variant="gold" icon={<Sparkles className="w-3 h-3" />}>BETTER SWAP SUGGESTION</Badge>
                <p className="text-xs text-amber-200 font-medium">
                  Consider swapping to <strong>{impact.betterSwap.name || impact.betterSwap.title}</strong> for a better macronutrient ratio!
                </p>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" icon={<CheckCircle2 className="w-4 h-4" />} onClick={handleConfirmLog}>
            CONFIRM & LOG FOOD
          </Button>
        </div>
      </div>
    </Modal>
  );
};
