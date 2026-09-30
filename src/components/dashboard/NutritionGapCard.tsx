import React from 'react';
import { useApp } from '../../context/AppContext';
import { nutritionGapEngine } from '../../services/nutritionGapEngine';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Target, ArrowRight, Plus } from 'lucide-react';

interface NutritionGapCardProps {
  onFixNextMeal: () => void;
}

export const NutritionGapCard: React.FC<NutritionGapCardProps> = ({ onFixNextMeal }) => {
  const { user, meals, addMeal } = useApp();

  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);

  const gap = nutritionGapEngine.calculateBiggestGap(user, totalProtein, totalCalories);

  return (
    <Card glow className="space-y-3 p-5 border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-950 to-emerald-950/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="gold" icon={<Target className="w-3.5 h-3.5" />}>SIGNATURE GAP ENGINE</Badge>
          <span className="text-xs font-bold text-white uppercase tracking-wider">Your Biggest Opportunity Today</span>
        </div>
        <Badge variant="mint">{gap.missingAmount}{gap.unit} Short</Badge>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white">
          "You're missing something important today: {gap.gapNutrient}"
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{gap.whyItMatters}</p>
      </div>

      {/* Suggested Quick Add Swaps */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-500/20">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-400">Quick Fixes:</span>
          {gap.recommendedSwaps.slice(0, 2).map((food) => (
            <button
              key={food.id}
              onClick={() => {
                addMeal({
                  foodName: food.name,
                  mealType: 'Snacks',
                  calories: food.calories,
                  protein: food.protein,
                  carbs: food.carbs,
                  fat: food.fat,
                  fiber: food.fiber,
                  costInr: food.costInr,
                  image: food.image,
                });
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-emerald-800 text-[11px] font-medium text-emerald-300 hover:border-emerald-400 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              {food.name} (+{food.protein}g)
            </button>
          ))}
        </div>

        <Button variant="gold" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} onClick={onFixNextMeal}>
          {gap.quickActionTitle}
        </Button>
      </div>
    </Card>
  );
};
