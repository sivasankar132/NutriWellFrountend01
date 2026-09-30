import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { FoodItem, ContextMode } from '../../types';
import { mockFoodCatalog } from '../../data/mockMeals';
import { modeConfigs } from '../../data/modeConfig';
import { 
  Sparkles, Plus, Trash2, DollarSign, CheckCircle2, 
  Utensils, ArrowRight, Zap, RefreshCw, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ModePlateBuilderProps {
  mode: ContextMode;
  onMealSaved?: () => void;
}

export const ModePlateBuilder: React.FC<ModePlateBuilderProps> = ({ mode, onMealSaved }) => {
  const { user, addMeal, showToast, personalMemory, addCustomFoodItem } = useApp();
  const config = modeConfigs[mode] || modeConfigs['STUDENT'];

  const [selectedItems, setSelectedItems] = useState<FoodItem[]>(() => config.defaultPlateItems);
  const [customFoodName, setCustomFoodName] = useState('');
  const [customProtein, setCustomProtein] = useState('15');
  const [customCost, setCustomCost] = useState('30');
  const [showAddCustom, setShowAddCustom] = useState(false);

  // Sync default items when mode changes
  useEffect(() => {
    setSelectedItems(config.defaultPlateItems);
  }, [mode]);

  const totalCalories = selectedItems.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = selectedItems.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = selectedItems.reduce((acc, item) => acc + item.carbs, 0);
  const totalFat = selectedItems.reduce((acc, item) => acc + item.fat, 0);
  const totalFiber = selectedItems.reduce((acc, item) => acc + item.fiber, 0);
  const totalCost = selectedItems.reduce((acc, item) => acc + item.costInr, 0);

  const addItemToPlate = (item: FoodItem) => {
    setSelectedItems(prev => [...prev, item]);
    showToast(`Added ${item.name} to ${config.title} plate!`);
  };

  const removeItemFromPlate = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from plate.');
  };

  // 1. IMPROVE MY PLATE
  const handleImprovePlate = () => {
    const sproutItem = mockFoodCatalog.find(f => f.id === 'f5') || mockFoodCatalog[4];
    if (!selectedItems.some(i => i.id === sproutItem.id)) {
      setSelectedItems(prev => [...prev, sproutItem]);
      showToast(`AI added ${sproutItem.name} (+16g protein, +10g fiber) to optimize your plate!`);
    } else {
      showToast(`Your plate is already optimized for ${config.title}!`);
    }
  };

  // 2. MAKE IT CHEAPER
  const handleMakeCheaper = () => {
    setSelectedItems([mockFoodCatalog[1], mockFoodCatalog[4]]);
    showToast(`Swapped plate with high-protein budget alternative (Saved ₹65)!`);
  };

  // 3. ADD MORE PROTEIN
  const handleAddMoreProtein = () => {
    const paneer = mockFoodCatalog[0];
    setSelectedItems(prev => [...prev, paneer]);
    showToast(`Added +26g protein with ${paneer.name}!`);
  };

  // 4. USE WHAT I HAVE
  const handleUseWhatIHave = () => {
    setSelectedItems([mockFoodCatalog[3], mockFoodCatalog[1]]);
    showToast("Adjusted plate for simple household / hostel pantry items!");
  };

  // SAVE MEAL
  const handleSaveMealToLog = () => {
    if (selectedItems.length === 0) {
      showToast("Please add items to your plate first.");
      return;
    }
    const combinedName = selectedItems.map(i => i.name).join(' + ');
    addMeal({
      foodName: `${config.title} Plate: ${combinedName.slice(0, 45)}...`,
      mealType: 'Dinner',
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: totalFiber,
      costInr: totalCost,
      contextTag: mode,
    });
    if (onMealSaved) onMealSaved();
  };

  // Handle Add Custom Item
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFoodName.trim()) return;

    const newFood: Omit<FoodItem, 'id'> = {
      name: customFoodName.trim(),
      category: 'Protein',
      serving: '1 Serving',
      calories: 220,
      protein: Number(customProtein) || 15,
      carbs: 20,
      fat: 6,
      fiber: 4,
      costInr: Number(customCost) || 30,
      dietType: user.dietPreference,
      isIndian: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    };

    addCustomFoodItem(newFood);
    setSelectedItems(prev => [...prev, { ...newFood, id: `custom-${Date.now()}` }]);
    setCustomFoodName('');
    setShowAddCustom(false);
  };

  // Catalog items including session custom foods
  const availableCatalog = [...(personalMemory.customFoods || []), ...config.suggestedIngredients];

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>
              BUILD MY PLATE — {config.title.toUpperCase()}
            </Badge>
            <span className="text-xs font-semibold text-slate-400">Target Budget: ₹{config.dailyBudgetInr}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Personalized {config.title} Plate Optimizer
          </h3>
          <p className="text-xs text-slate-400">
            Plate suggestions adapt to {config.coreFocus.toLowerCase()} for your {user.nutritionGoal} goal.
          </p>
        </div>

        {/* AI Plate Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={handleImprovePlate}>
            IMPROVE MY PLATE
          </Button>
          <Button variant="secondary" size="sm" icon={<DollarSign className="w-3.5 h-3.5" />} onClick={handleMakeCheaper}>
            MAKE IT CHEAPER
          </Button>
          <Button variant="outline" size="sm" icon={<Zap className="w-3.5 h-3.5" />} onClick={handleAddMoreProtein}>
            ADD PROTEIN
          </Button>
          <Button variant="outline" size="sm" icon={<Layers className="w-3.5 h-3.5" />} onClick={handleUseWhatIHave}>
            USE WHAT I HAVE
          </Button>
          <Button variant="outline" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={handleSaveMealToLog}>
            SAVE MEAL
          </Button>
          <Button variant="gold" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={handleSaveMealToLog}>
            ADD TO TODAY
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Plate Quadrant Card */}
        <Card className="lg:col-span-7 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden emerald-glow-sm p-6">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-emerald-500/30 bg-slate-950/85 shadow-2xl flex items-center justify-center p-3">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-900/40 pointer-events-none" />

            {selectedItems.length === 0 ? (
              <div className="text-center p-4">
                <Utensils className="w-8 h-8 text-emerald-600/50 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-400">Plate is empty</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Select items below to build your {config.title} meal</p>
              </div>
            ) : (
              <div className="w-full h-full rounded-full grid grid-cols-2 gap-2 p-3">
                {selectedItems.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${idx}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative group rounded-2xl bg-emerald-950/70 border border-emerald-500/40 p-2.5 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-400/50 mb-1"
                    />
                    <span className="text-[10px] font-bold text-white line-clamp-1">{item.name}</span>
                    <span className="text-[9px] text-emerald-300">+{item.protein}g protein • ₹{item.costInr}</span>

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

          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <Badge variant="gold">Estimated Meal Cost: ₹{totalCost}</Badge>
            <Badge variant="mint">{selectedItems.length} Ingredients Selected</Badge>
            <span className="text-[10px] text-slate-400">Mode: {config.title}</span>
          </div>
        </Card>

        {/* Live Macro Summary & Mode Ingredient Selector */}
        <div className="lg:col-span-5 space-y-4">
          <Card glow className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
                Live Plate Nutrition Totals
              </h4>
              <span className="text-[10px] font-semibold text-mint-accent">{totalProtein}g Total Protein</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[9px] text-slate-400 block uppercase">Calories</span>
                <span className="text-xs font-extrabold text-emerald-300">{totalCalories}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[9px] text-slate-400 block uppercase">Protein</span>
                <span className="text-xs font-extrabold text-emerald-400">{totalProtein}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[9px] text-slate-400 block uppercase">Carbs</span>
                <span className="text-xs font-extrabold text-amber-300">{totalCarbs}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[9px] text-slate-400 block uppercase">Fat</span>
                <span className="text-xs font-extrabold text-teal-300">{totalFat}g</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[9px] text-slate-400 block uppercase">Fiber</span>
                <span className="text-xs font-extrabold text-mint-accent">{totalFiber}g</span>
              </div>
            </div>
          </Card>

          {/* Mode Ingredients Catalog */}
          <Card className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">{config.title} Suggested Staples</h4>
              <button
                onClick={() => setShowAddCustom(!showAddCustom)}
                className="text-[11px] text-mint-accent hover:underline font-semibold cursor-pointer px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/40"
              >
                {showAddCustom ? 'Cancel' : '+ ADD YOUR OWN'}
              </button>
            </div>

            {/* Inline Custom Add Form */}
            {showAddCustom && (
              <form onSubmit={handleAddCustom} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Food name (e.g. Sattu, Ragi Dosa, Curd)..."
                  value={customFoodName}
                  onChange={(e) => setCustomFoodName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-900/40 text-white outline-none focus:border-emerald-400"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-slate-400 block uppercase">Protein (g)</label>
                    <input
                      type="number"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-emerald-900/40 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 block uppercase">Est. Cost (₹)</label>
                    <input
                      type="number"
                      value={customCost}
                      onChange={(e) => setCustomCost(e.target.value)}
                      className="w-full px-2 py-1 rounded-lg bg-slate-900 border border-emerald-900/40 text-white outline-none"
                    />
                  </div>
                </div>
                <Button type="submit" variant="primary" size="sm" className="w-full" icon={<Plus className="w-3 h-3" />}>
                  Add to Plate & Library
                </Button>
              </form>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availableCatalog.map((food, idx) => (
                <div
                  key={`${food.id}-${idx}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-emerald-900/30 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <img src={food.image} alt={food.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <h5 className="text-[11px] font-semibold text-white line-clamp-1">{food.name}</h5>
                      <p className="text-[9px] text-slate-400">+{food.protein}g protein • ₹{food.costInr}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" icon={<Plus className="w-3 h-3" />} onClick={() => addItemToPlate(food)}>
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