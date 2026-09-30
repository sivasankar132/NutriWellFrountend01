import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, User, Activity, Heart, Shield, Edit3, Check, Plus, 
  Trash2, Scale, Droplets, Flame, DollarSign, Sparkles
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Gender } from '../../types';
import { getBmiCategory } from '../../services/bmiService';

interface MyHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyHealthModal: React.FC<MyHealthModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserProfile, personalMemory, toggleFavoriteFood, addCustomCuisinePreference, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'personal' | 'nutrition' | 'lifestyle' | 'body' | 'health'>('personal');
  
  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender || ('Male' as Gender),
    age: user.age,
    heightCm: user.heightCm,
    weightKg: user.weightKg,
    activityLevel: user.activityLevel,
    dietPreference: user.dietPreference,
    dailyCalorieTarget: user.dailyCalorieTarget,
    dailyProteinTarget: user.dailyProteinTarget,
    dailyWaterTargetMl: user.dailyWaterTargetMl,
    dailyFoodBudgetInr: user.dailyFoodBudgetInr,
  });

  const [newCuisine, setNewCuisine] = useState('');
  const [newFavorite, setNewFavorite] = useState('');

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    updateUserProfile({
      name: formData.name,
      gender: formData.gender as Gender,
      age: Number(formData.age),
      heightCm: Number(formData.heightCm),
      weightKg: Number(formData.weightKg),
      activityLevel: formData.activityLevel as any,
      dietPreference: formData.dietPreference as any,
      dailyCalorieTarget: Number(formData.dailyCalorieTarget),
      dailyProteinTarget: Number(formData.dailyProteinTarget),
      dailyWaterTargetMl: Number(formData.dailyWaterTargetMl),
      dailyFoodBudgetInr: Number(formData.dailyFoodBudgetInr),
    });
    setIsEditing(false);
    showToast('Health Profile updated successfully!');
  };

  const handleAddCuisine = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCuisine.trim()) {
      addCustomCuisinePreference(newCuisine.trim());
      setNewCuisine('');
    }
  };

  const handleAddFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFavorite.trim()) {
      toggleFavoriteFood(newFavorite.trim());
      setNewFavorite('');
    }
  };

  // BMI Calculation
  const heightM = user.heightCm / 100;
  const bmi = (user.weightKg / (heightM * heightM)).toFixed(1);

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
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">My Health Profile & Memory</h2>
                  <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>Active Baseline</Badge>
                </div>
                <p className="text-xs text-slate-400">Complete personal parameters, dietary preferences, and targets</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  isEditing 
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' 
                    : 'bg-slate-950 text-slate-300 border-emerald-900/40 hover:border-emerald-500/40'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 overflow-x-auto py-3 border-b border-emerald-900/30 no-scrollbar text-xs">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'nutrition', label: 'Nutrition Targets', icon: Flame },
              { id: 'lifestyle', label: 'Lifestyle & Routine', icon: Activity },
              { id: 'body', label: 'Body & Progress', icon: Scale },
              { id: 'health', label: 'Diet & Preferences', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white emerald-glow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-emerald-900/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {activeTab === 'personal' && (
              <div className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Age (years)</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Height (cm)</label>
                      <input
                        type="number"
                        value={formData.heightCm}
                        onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Weight (kg)</label>
                      <input
                        type="number"
                        value={formData.weightKg}
                        onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Activity Level</label>
                      <select
                        value={formData.activityLevel}
                        onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      >
                        <option value="Sedentary">Sedentary (Desk Job / Minimal Movement)</option>
                        <option value="Lightly Active">Lightly Active (1-3 days/week)</option>
                        <option value="Moderately Active">Moderately Active (3-5 days/week)</option>
                        <option value="Very Active">Very Active (6-7 days/week intense)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                      <span className="text-[10px] text-slate-400 block uppercase">Name</span>
                      <p className="text-sm font-bold text-white mt-0.5">{user.name}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                      <span className="text-[10px] text-slate-400 block uppercase">Gender & Age</span>
                      <p className="text-sm font-bold text-white mt-0.5">{user.gender || 'Male'} • {user.age} yrs</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                      <span className="text-[10px] text-slate-400 block uppercase">Height & Weight</span>
                      <p className="text-sm font-bold text-white mt-0.5">{user.heightCm} cm • {user.weightKg} kg</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                      <span className="text-[10px] text-slate-400 block uppercase">Activity Baseline</span>
                      <p className="text-sm font-bold text-emerald-300 mt-0.5">{user.activityLevel}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 sm:col-span-2">
                      <span className="text-[10px] text-slate-400 block uppercase">Calculated BMI</span>
                      {(() => {
                        const cat = getBmiCategory(Number(bmi));
                        return (
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className={`text-sm font-bold ${cat.textColorClass}`}>
                              {bmi} ({cat.label})
                            </p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cat.badgeBgClass} ${cat.borderColorClass}`}>
                              {cat.isHealthy ? 'Healthy Zone ✓' : 'Outside Healthy Target'}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Daily Calorie Target (kcal)</label>
                      <input
                        type="number"
                        value={formData.dailyCalorieTarget}
                        onChange={(e) => setFormData({ ...formData, dailyCalorieTarget: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Daily Protein Target (grams)</label>
                      <input
                        type="number"
                        value={formData.dailyProteinTarget}
                        onChange={(e) => setFormData({ ...formData, dailyProteinTarget: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Daily Hydration Target (ml)</label>
                      <input
                        type="number"
                        value={formData.dailyWaterTargetMl}
                        onChange={(e) => setFormData({ ...formData, dailyWaterTargetMl: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase">Daily Food Budget (₹ INR)</label>
                      <input
                        type="number"
                        value={formData.dailyFoodBudgetInr}
                        onChange={(e) => setFormData({ ...formData, dailyFoodBudgetInr: Number(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/40 text-white text-sm focus:border-emerald-400 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/30 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Calorie Target</span>
                        <p className="text-base font-bold text-white">{user.dailyCalorieTarget} kcal/day</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/30 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Protein Target</span>
                        <p className="text-base font-bold text-mint-accent">{user.dailyProteinTarget}g/day (1.8g/kg)</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/30 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Hydration Goal</span>
                        <p className="text-base font-bold text-cyan-300">{user.dailyWaterTargetMl} ml/day</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/30 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Food Budget</span>
                        <p className="text-base font-bold text-amber-300">₹{user.dailyFoodBudgetInr} / day</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lifestyle' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Primary Schedule</span>
                    <p className="text-xs font-bold text-white mt-0.5">Student / Desk Work (9:00 AM – 5:30 PM)</p>
                  </div>
                  <Badge variant="teal">Academic Routine</Badge>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Average Sleep Duration</span>
                    <p className="text-xs font-bold text-white mt-0.5">7.5 Hours (11:30 PM – 7:00 AM)</p>
                  </div>
                  <Badge variant="mint">Restorative</Badge>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Cooking Environment</span>
                    <p className="text-xs font-bold text-white mt-0.5">Home kitchen + Occasional Mess / Canteen</p>
                  </div>
                  <Badge variant="gold">Semi-Independent</Badge>
                </div>
              </div>
            )}

            {activeTab === 'body' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-900/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Current Weight</span>
                    <p className="text-base font-bold text-white mt-0.5">{user.weightKg} kg</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-900/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Target Weight</span>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">70.0 kg</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-900/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Body Fat (Est.)</span>
                    <p className="text-base font-bold text-teal-300 mt-0.5">15.8%</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-900/30">
                    <span className="text-[10px] text-slate-400 block uppercase">Streak</span>
                    <p className="text-base font-bold text-mint-accent mt-0.5">6 Days 🔥</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Lean Muscle Trajectory</span>
                    <span className="text-emerald-400 font-bold">84% On Track</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-emerald-900/40">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[84%]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-4">
                {/* Diet Preference */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30">
                  <span className="text-[10px] text-slate-400 block uppercase">Dietary Pattern</span>
                  <p className="text-xs font-bold text-emerald-300 mt-0.5">{user.dietPreference} • High Protein Lean Focus</p>
                </div>

                {/* Favorite Foods in Memory */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Favorite Staples (Session Memory)</span>
                    <span className="text-[10px] text-emerald-400">{personalMemory.favoriteFoods.length} saved</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {personalMemory.favoriteFoods.map((fav) => (
                      <span
                        key={fav}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-xs text-emerald-200"
                      >
                        {fav}
                        <button
                          onClick={() => toggleFavoriteFood(fav)}
                          className="hover:text-red-400 transition-colors ml-0.5"
                          title="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Favorite Input */}
                  <form onSubmit={handleAddFavorite} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add staple (e.g. Sattu Drink, Curd Rice)..."
                      value={newFavorite}
                      onChange={(e) => setNewFavorite(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-emerald-900/40 text-white placeholder-slate-500 outline-none focus:border-emerald-400"
                    />
                    <Button type="submit" variant="outline" size="sm" icon={<Plus className="w-3 h-3" />}>
                      Add
                    </Button>
                  </form>
                </div>

                {/* Custom Cuisines in Memory */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Custom Cuisines & Flavors</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {personalMemory.customCuisines.map((c) => (
                      <span key={c} className="px-2.5 py-1 rounded-xl bg-teal-950/80 border border-teal-800/40 text-xs text-teal-200">
                        {c}
                      </span>
                    ))}
                  </div>

                  <form onSubmit={handleAddCuisine} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add custom cuisine preference..."
                      value={newCuisine}
                      onChange={(e) => setNewCuisine(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-emerald-900/40 text-white placeholder-slate-500 outline-none focus:border-emerald-400"
                    />
                    <Button type="submit" variant="secondary" size="sm" icon={<Plus className="w-3 h-3" />}>
                      Save
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save Button when editing */}
          {isEditing && (
            <div className="pt-3 border-t border-emerald-900/40 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" icon={<Check className="w-3.5 h-3.5" />} onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
