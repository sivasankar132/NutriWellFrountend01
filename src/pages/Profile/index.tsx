import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { User, Mail, Shield, Save, Coins, Flame, LogOut } from 'lucide-react';
import { Gender } from '../../types';
import { BmiVisualizer } from '../../components/common/BmiVisualizer';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout, isAuthenticated, showToast } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState<Gender>(user.gender || 'Male');
  const [age, setAge] = useState(user.age || 28);
  const [heightCm, setHeightCm] = useState(user.heightCm || 175);
  const [weightKg, setWeightKg] = useState(user.weightKg || 72);
  const [dailyBudget, setDailyBudget] = useState(user.dailyFoodBudgetInr);
  const [calorieTarget, setCalorieTarget] = useState(user.dailyCalorieTarget);
  const [proteinTarget, setProteinTarget] = useState(user.dailyProteinTarget);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    if (user.gender) setGender(user.gender);
    if (user.age) setAge(user.age);
    if (user.heightCm) setHeightCm(user.heightCm);
    if (user.weightKg) setWeightKg(user.weightKg);
    if (user.dailyFoodBudgetInr) setDailyBudget(user.dailyFoodBudgetInr);
    if (user.dailyCalorieTarget) setCalorieTarget(user.dailyCalorieTarget);
    if (user.dailyProteinTarget) setProteinTarget(user.dailyProteinTarget);
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      updateUserProfile({
        name,
        email,
        gender,
        age: Number(age),
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        dailyFoodBudgetInr: Number(dailyBudget),
        dailyCalorieTarget: Number(calorieTarget),
        dailyProteinTarget: Number(proteinTarget),
      });
      showToast("Profile & Nutrition goals synced to backend!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Badge variant="mint" icon={<User className="w-3.5 h-3.5" />}>Account & Preferences</Badge>
        <h1 className="text-2xl font-bold text-white mt-1">User Health Profile</h1>
        <p className="text-xs text-slate-400">Manage biometric targets, daily food budget in ₹ INR, and dietary goals.</p>
      </div>

      <Card glow className="p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-emerald-900/40">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-emerald-300">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{name}</h3>
              <p className="text-xs text-emerald-400">{user.nutritionGoal} • {user.dietPreference}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Daily Food Budget (₹ INR)</label>
              <input
                type="number"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Daily Calorie Target (kcal)</label>
              <input
                type="number"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Daily Protein Target (grams)</label>
              <input
                type="number"
                value={proteinTarget}
                onChange={(e) => setProteinTarget(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Biological Sex / Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Male', 'Female', 'Other'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      gender === g
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                        : 'bg-slate-900 border-emerald-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g === 'Male' && <span>♂ Male</span>}
                    {g === 'Female' && <span>♀ Female</span>}
                    {g === 'Other' && <span>⚧ Other</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Biometrics row */}
          <div className="pt-2 border-t border-emerald-900/40">
            <h4 className="text-xs font-bold text-slate-300 uppercase mb-3">Biometrics & Body Composition</h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
            </div>
          </div>

          {/* BMI Visualizer */}
          <BmiVisualizer
            gender={gender}
            age={Number(age)}
            heightCm={Number(heightCm)}
            weightKg={Number(weightKg)}
          />

          <div className="pt-4 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
            <Button variant="primary" size="lg" icon={<Save className="w-4 h-4" />}>
              SAVE PROFILE CHANGES
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="text-red-400 border-red-900/40 hover:bg-red-950/40 hover:border-red-500/50"
              icon={<LogOut className="w-4 h-4 text-red-400" />}
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              SIGN OUT
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
