import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useWhatIHaveEngine, GeneratedRecipe } from '../../services/useWhatIHaveEngine';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Utensils, Plus, Sparkles } from 'lucide-react';

export const UseWhatIHaveCard: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [ingredientsText, setIngredientsText] = useState<string>('Eggs, Rice, Tomato, Onion, Curd');
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const splitInput = ingredientsText.split(',').map(s => s.trim()).filter(Boolean);
      const gen = await useWhatIHaveEngine.generateFromIngredients(splitInput);
      setRecipes(gen);
      showToast(`Generated ${gen.length} high-protein recipe via AI!`);
    } catch (err: any) {
      showToast(err?.message || 'AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <Card glow className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="mint" icon={<Utensils className="w-3.5 h-3.5" />}>SIGNATURE INGREDIENT ENGINE</Badge>
          <span className="text-xs font-bold text-white uppercase tracking-wider">Use What I Have</span>
        </div>
      </div>

      <p className="text-xs text-slate-300">Enter ingredients currently available in your hostel room or kitchen:</p>

      <div className="flex gap-2">
        <input
          type="text"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          placeholder="e.g. Eggs, Moong Dal, Tomato, Onion, Curd"
          className="flex-1 px-3.5 py-2 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
        />
        <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={handleGenerate}>
          GENERATE RECIPES
        </Button>
      </div>

      {/* Generated Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {recipes.map((rec, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">{rec.title}</h4>
              <span className="text-xs font-bold text-emerald-400">₹{rec.costInr}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Uses: <span className="text-emerald-300">{rec.matchedIngredients.join(', ')}</span>
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
              <span>{rec.protein}g protein • {rec.calories} kcal</span>
              <Button
                variant="secondary"
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => {
                  addMeal({
                    foodName: rec.title,
                    mealType: 'Lunch',
                    calories: rec.calories,
                    protein: rec.protein,
                    carbs: 30,
                    fat: 8,
                    fiber: 6,
                    costInr: rec.costInr,
                  });
                }}
              >
                Log Meal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
