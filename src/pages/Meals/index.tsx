import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { mockFoodCatalog } from '../../data/mockMeals';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { FoodItem } from '../../types';
import { Sparkles, Utensils, Clock, DollarSign, Plus, Check, Search, RefreshCw } from 'lucide-react';
import { foodsApi, FoodItemDto } from '../../services/api';

export const MealsPage: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg' | 'Budget'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foods, setFoods] = useState<FoodItem[]>(mockFoodCatalog);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFoods = useCallback(async (query?: string) => {
    setLoading(true);
    try {
      let data: FoodItemDto[] = [];
      if (query && query.trim()) {
        data = await foodsApi.searchFoods(query.trim());
      } else {
        data = await foodsApi.getFoods({ limit: 50 });
      }

      if (Array.isArray(data) && data.length > 0) {
        const mapped: FoodItem[] = data.map((d, idx) => ({
          id: d.id,
          name: d.name,
          category: d.category || 'General',
          serving: `${d.serving_size_g || 100}${d.serving_unit || 'g'}`,
          calories: Math.round((d.calories_per_100g || 100) * ((d.serving_size_g || 100) / 100)),
          protein: Math.round((d.protein_per_100g || 10) * ((d.serving_size_g || 100) / 100)),
          carbs: Math.round((d.carbs_per_100g || 15) * ((d.serving_size_g || 100) / 100)),
          fat: Math.round((d.fat_per_100g || 5) * ((d.serving_size_g || 100) / 100)),
          fiber: Math.round((d.fiber_per_100g || 3) * ((d.serving_size_g || 100) / 100)),
          costInr: d.cost_inr || 60,
          prepTimeMinutes: 15,
          dietType: (d.diet_type as any) || 'Veg',
          isIndian: d.is_indian ?? true,
          image: d.image_url || mockFoodCatalog[idx % mockFoodCatalog.length]?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        }));
        setFoods(mapped);
      }
    } catch (e) {
      console.warn('Using default food catalog:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFoods(searchQuery);
  };

  const filteredFoods = foods.filter(food => {
    if (filter === 'Veg') return food.dietType === 'Veg' || food.dietType === 'Vegan';
    if (filter === 'Non-Veg') return food.dietType === 'Non-Veg';
    if (filter === 'Budget') return food.costInr <= 80;
    return true;
  });

  const handleLogMeal = (food: FoodItem) => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>Indian Food Intelligence</Badge>
          <h1 className="text-2xl font-bold text-white mt-1">AI Smart Meal Recommendations</h1>
          <p className="text-xs text-slate-400">Nutrient-dense Indian & global meal options synced with FastAPI foods database.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search foods (dal, paneer...)"
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </form>

          {(['All', 'Veg', 'Non-Veg', 'Budget'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-emerald-600 text-white shadow-md emerald-glow-sm'
                  : 'bg-slate-900 border border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
              }`}
            >
              {f === 'Budget' ? 'Under ₹80' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <Card key={food.id} hoverEffect className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="relative h-44 rounded-xl overflow-hidden border border-emerald-900/40">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <Badge variant={food.dietType === 'Non-Veg' ? 'danger' : 'emerald'}>{food.dietType}</Badge>
                  {food.isIndian && <Badge variant="gold">Indian Classic</Badge>}
                </div>
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-300 font-bold text-xs">
                  ₹{food.costInr}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{food.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{food.serving} • {food.prepTimeMinutes} mins prep</p>
              </div>

              {/* Macro Pills */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="p-1.5 rounded-lg bg-slate-950 border border-emerald-900/30">
                  <span className="text-[9px] text-slate-400 block">KCAL</span>
                  <span className="font-bold text-emerald-300">{food.calories}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950 border border-emerald-900/30">
                  <span className="text-[9px] text-slate-400 block">PROTEIN</span>
                  <span className="font-bold text-emerald-400">{food.protein}g</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950 border border-emerald-900/30">
                  <span className="text-[9px] text-slate-400 block">CARBS</span>
                  <span className="font-bold text-amber-300">{food.carbs}g</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950 border border-emerald-900/30">
                  <span className="text-[9px] text-slate-400 block">FIBER</span>
                  <span className="font-bold text-mint-accent">{food.fiber}g</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => showToast(`Recipe details for ${food.name} loaded.`)}>
                View Recipe
              </Button>
              <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => handleLogMeal(food)}>
                LOG MEAL
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
