import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';
import { Plus, Utensils } from 'lucide-react';

interface CustomOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomOptionModal: React.FC<CustomOptionModalProps> = ({ isOpen, onClose }) => {
  const { addCustomFoodItem, addCustomCuisinePreference } = useApp();
  const [activeTab, setActiveTab] = useState<'food' | 'cuisine'>('food');

  // Custom Food Form
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState(300);
  const [protein, setProtein] = useState(20);
  const [costInr, setCostInr] = useState(60);

  // Custom Cuisine Form
  const [customCuisine, setCustomCuisine] = useState('');

  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;
    addCustomFoodItem({
      name: foodName,
      category: 'Custom',
      serving: '1 Portion',
      calories: Number(calories),
      protein: Number(protein),
      carbs: 30,
      fat: 8,
      fiber: 6,
      costInr: Number(costInr),
      dietType: 'Veg',
      isIndian: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    });
    setFoodName('');
    onClose();
  };

  const handleSaveCuisine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCuisine.trim()) return;
    addCustomCuisinePreference(customCuisine);
    setCustomCuisine('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Custom Option (Other / Your Own)" maxWidth="md">
      <div className="space-y-4">
        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 rounded-xl bg-slate-950 border border-emerald-900/40">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'food' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Custom Dish / Food
          </button>
          <button
            onClick={() => setActiveTab('cuisine')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cuisine' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Custom Cuisine / Diet
          </button>
        </div>

        {activeTab === 'food' ? (
          <form onSubmit={handleSaveFood} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Dish Name (e.g. Millet Dosa, Mess Egg Curry)</label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Millet Dosa with Chutney"
                className="w-full p-2.5 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Calories (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Cost (₹)</label>
                <input
                  type="number"
                  value={costInr}
                  onChange={(e) => setCostInr(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full" icon={<Plus className="w-4 h-4" />}>
              SAVE TO MY CUSTOM FOODS
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSaveCuisine} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Custom Cuisine or Diet Preference</label>
              <input
                type="text"
                required
                value={customCuisine}
                onChange={(e) => setCustomCuisine(e.target.value)}
                placeholder="e.g. Maharashtrian Sattvic, High-Protein Keto, Andhra Spicy"
                className="w-full p-2.5 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs text-white"
              />
            </div>

            <Button variant="primary" size="md" className="w-full" icon={<Plus className="w-4 h-4" />}>
              SAVE CUSTOM CUISINE
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
