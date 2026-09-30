import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { rupeeSmartEngine } from '../../services/rupeeSmartEngine';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Coins, Plus, TrendingUp } from 'lucide-react';

export const RupeeSmartCard: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [maxBudget, setMaxBudget] = useState<number>(100);
  const [budgetMeals, setBudgetMeals] = useState<any[]>([]);

  React.useEffect(() => {
    let active = true;
    rupeeSmartEngine.getMealsByBudget(maxBudget).then((res) => {
      if (active) setBudgetMeals(res);
    });
    return () => { active = false; };
  }, [maxBudget]);

  return (
    <Card glow className="space-y-4 p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="gold" icon={<Coins className="w-3.5 h-3.5" />}>SIGNATURE ₹ ENGINE</Badge>
          <span className="text-xs font-bold text-white uppercase tracking-wider">₹ Smart Nutrition Optimizer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-bold">Max Budget:</span>
          <select
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="px-2.5 py-1 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs font-bold text-emerald-400 focus:outline-none"
          >
            <option value={60}>Under ₹60</option>
            <option value={100}>Under ₹100</option>
            <option value={150}>Under ₹150</option>
            <option value={200}>Under ₹200</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-slate-300">Ranked by maximum protein yield per rupee spent (g Protein / ₹):</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {budgetMeals.slice(0, 3).map((food) => (
          <div key={food.id} className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2.5">
              <img src={food.image} alt={food.name} className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{food.name}</h4>
                <p className="text-[10px] text-amber-400 font-bold">₹{food.costInr} • {food.protein}g protein</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-emerald-900/30 text-[11px]">
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-mint-accent" />
                {food.proteinPerRupee}g protein / ₹
              </span>
              <Button
                variant="secondary"
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => {
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
                }}
              >
                Log
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
