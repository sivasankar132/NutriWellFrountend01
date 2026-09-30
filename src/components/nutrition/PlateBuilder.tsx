import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { FoodItem } from '../../types';
import { mockFoodCatalog } from '../../data/mockMeals';
import { Sparkles, Plus, Trash2, ShieldCheck, DollarSign, CheckCircle2, RefreshCw, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { foodsApi } from '../../services/api';

export const PlateBuilder: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [availableFoods, setAvailableFoods] = useState<FoodItem[]>(mockFoodCatalog);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([
    mockFoodCatalog[0], // Paneer Tikka
    mockFoodCatalog[3], // Palak Moong Dal
  ]);

  useEffect(() => {
    foodsApi.getFoods({ limit: 30 }).then(data => {
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
        setAvailableFoods(mapped);
      }
    }).catch(console.warn);
  }, []);

  const totalCalories = selectedItems.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = selectedItems.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = selectedItems.reduce((acc, item) => acc + item.carbs, 0);
  const totalFat = selectedItems.reduce((acc, item) => acc + item.fat, 0);
  const totalFiber = selectedItems.reduce((acc, item) => acc + item.fiber, 0);
  const totalCost = selectedItems.reduce((acc, item) => acc + item.costInr, 0);

  const addItemToPlate = (item: FoodItem) => {
    setSelectedItems(prev => [...prev, item]);
    showToast(`Added ${item.name} to your plate!`);
  };

  const removeItemFromPlate = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    showToast('Removed item from plate.');
  };

  const handleImprovePlate = () => {
    if (!selectedItems.some(i => i.id === 'f5')) {
      setSelectedItems(prev => [...prev, mockFoodCatalog[4]]);
      showToast("AI optimized your plate! Added Sprouted Moong (+16g protein, +10g fiber).");
    } else {
      showToast("Your plate is already optimized for peak metabolic balance!");
    }
  };

  const handleCheaperAlternative = () => {
    setSelectedItems([mockFoodCatalog[1], mockFoodCatalog[4]]);
    showToast("Replaced items with budget high-protein alternative (Saved ₹95!).");
  };

  const handleSaveMealToLog = () => {
    if (selectedItems.length === 0) {
      showToast("Please add items to your plate first.");
      return;
    }
    const combinedName = selectedItems.map(i => i.name).join(' + ');
    addMeal({
      foodName: `Custom Plate: ${combinedName.slice(0, 45)}...`,
      mealType: 'Dinner',
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: totalFiber,
      costInr: totalCost,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>Flagship Interactive Tool</Badge>
          <h2 className="text-2xl font-bold text-white mt-1">Fill The Plate — Macro Visualizer</h2>
          <p className="text-xs text-slate-400">Assemble your meal in real-time. Smart AI optimizes your macro balance and budget.</p>
        </div>

        {/* AI Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={handleImprovePlate}>
            IMPROVE MY PLATE
          </Button>
          <Button variant="secondary" size="sm" icon={<DollarSign className="w-3.5 h-3.5" />} onClick={handleCheaperAlternative}>
            CHEAPER ALTERNATIVE
          </Button>
          <Button variant="outline" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={handleSaveMealToLog}>
            ADD TO TODAY'S LOG
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Visual Plate Area */}
        <Card className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden emerald-glow-sm">
          {/* Subtle Plate Circle Background */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-emerald-500/30 bg-slate-950/80 shadow-2xl flex items-center justify-center p-4">
            {/* Visual Plate Quadrants */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-900/40 pointer-events-none" />
            
            {/* Displaying Items inside Plate */}
            {selectedItems.length === 0 ? (
              <div className="text-center p-6">
                <Utensils className="w-10 h-10 text-emerald-600/50 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-400">Your plate is currently empty</p>
                <p className="text-xs text-slate-500 mt-1">Select ingredients below to build your meal</p>
              </div>
            ) : (
              <div className="w-full h-full rounded-full grid grid-cols-2 gap-2 p-4">
                {selectedItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${idx}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative group rounded-2xl bg-emerald-950/70 border border-emerald-500/40 p-3 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-emerald-400/50 mb-1"
                    />
                    <span className="text-[11px] font-bold text-white line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-emerald-300">{item.protein}g Protein • ₹{item.costInr}</span>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeItemFromPlate(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-950 text-red-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Live Total Cost Badge */}
          <div className="mt-4 flex items-center gap-3">
            <Badge variant="gold">Estimated Cost: ₹{totalCost}</Badge>
            <Badge variant="mint">{selectedItems.length} Ingredients Selected</Badge>
          </div>
        </Card>

        {/* Live Macro Summary & Ingredient Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <Card glow className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">Live Plate Nutrition Totals</h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block">Calories</span>
                <span className="text-sm font-extrabold text-emerald-300">{totalCalories}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block">Protein</span>
                <span className="text-sm font-extrabold text-emerald-400">{totalProtein}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block">Carbs</span>
                <span className="text-sm font-extrabold text-amber-300">{totalCarbs}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block">Fat</span>
                <span className="text-sm font-extrabold text-teal-300">{totalFat}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block">Fiber</span>
                <span className="text-sm font-extrabold text-mint-accent">{totalFiber}g</span>
              </div>
            </div>
          </Card>

          {/* Quick Add Food Items */}
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-white">Add Ingredients to Plate</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {availableFoods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-emerald-900/30 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={food.image} alt={food.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{food.name}</h4>
                      <p className="text-[10px] text-slate-400">{food.protein}g protein • ₹{food.costInr}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => addItemToPlate(food)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
