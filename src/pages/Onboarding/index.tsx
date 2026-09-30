import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';
import { DietPreference, ActivityLevel, NutritionGoal, Gender } from '../../types';
import { Sparkles, ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BmiVisualizer } from '../../components/common/BmiVisualizer';
import { JourneyMap } from './JourneyMap';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, showToast } = useApp();
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState({
    gender: user.gender || ('Male' as Gender),
    age: user.age || 28,
    heightCm: user.heightCm || 175,
    weightKg: user.weightKg || 72,
    dietPreference: user.dietPreference || ('Veg' as DietPreference),
    cuisinePreference: user.cuisinePreference || 'South & North Indian Healthy Fusion',
    nutritionGoal: user.nutritionGoal || ('Muscle Gain' as NutritionGoal),
    activityLevel: user.activityLevel || ('Moderately Active' as ActivityLevel),
    dailyFoodBudgetInr: user.dailyFoodBudgetInr || 400,
  });

  const nextStep = () => {
    if (step < 5) {
      setStep(s => s + 1);
    } else if (step === 5) {
      updateUserProfile({
        ...form,
        hasCompletedOnboarding: true,
      });
      showToast("Personalization Complete!");
      setStep(6);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  if (step === 6) {
    return (
      <JourneyMap 
        onContinue={() => setStep(7)} 
        onBack={() => setStep(5)} 
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-slate-950/90 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl emerald-glow-lg space-y-6 backdrop-blur-2xl">
      {/* Header Progress */}
      {step <= 5 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Personalizing NutriWell
            </Badge>
            <span className="text-emerald-400 font-bold">Step {step} of 5</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-emerald-900/40">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Body Metrics */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">Let's start with your biometric stats</h2>
              <p className="text-xs text-slate-400">Used to calculate BMR, BMI health index, and daily caloric baseline.</p>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Biological Sex / Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Male', 'Female', 'Other'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, gender: g })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      form.gender === g
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                        : 'bg-slate-900 border-emerald-900/40 text-slate-400 hover:text-slate-200 hover:border-emerald-500/30'
                    }`}
                  >
                    {g === 'Male' && <span>♂ Male</span>}
                    {g === 'Female' && <span>♀ Female</span>}
                    {g === 'Other' && <span>⚧ Other</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Biometric inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">Age</label>
                <input
                  type="number"
                  value={form.age}
                  min={10}
                  max={120}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-white text-sm text-center font-bold focus:border-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">Height (cm)</label>
                <input
                  type="number"
                  value={form.heightCm}
                  min={50}
                  max={250}
                  onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-white text-sm text-center font-bold focus:border-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  value={form.weightKg}
                  min={20}
                  max={300}
                  onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-900 border border-emerald-900/50 rounded-xl text-white text-sm text-center font-bold focus:border-emerald-400 outline-none"
                />
              </div>
            </div>

            {/* Live BMI Bar & Health Evaluation Below Inputs */}
            <BmiVisualizer
              gender={form.gender}
              age={form.age}
              heightCm={form.heightCm}
              weightKg={form.weightKg}
            />
          </motion.div>
        )}

        {/* Step 2: Dietary Preferences */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-xl font-bold text-white">Select your dietary preference</h2>
            <p className="text-xs text-slate-400">Tailors meal suggestions to your lifestyle.</p>

            <div className="grid grid-cols-2 gap-3">
              {(['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'] as DietPreference[]).map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setForm({ ...form, dietPreference: pref })}
                  className={`p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    form.dietPreference === pref
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                      : 'bg-slate-900 border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Nutrition Goal */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-xl font-bold text-white">What is your primary nutrition goal?</h2>

            <div className="space-y-2">
              {(['Muscle Gain', 'Weight Loss', 'Diabetes Management', 'Heart Health', 'General Wellness'] as NutritionGoal[]).map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setForm({ ...form, nutritionGoal: goal })}
                  className={`w-full p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    form.nutritionGoal === goal
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-300 emerald-glow-sm'
                      : 'bg-slate-900 border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
                  }`}
                >
                  <span>{goal}</span>
                  {form.nutritionGoal === goal && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Food Budget Preference */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-xl font-bold text-white">Set your daily food budget preference</h2>
            <p className="text-xs text-slate-400">NutriWell AI recommends high-protein meals within your budget.</p>

            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-900/40 text-center space-y-3">
              <span className="text-3xl font-extrabold text-emerald-400">₹{form.dailyFoodBudgetInr} / Day</span>
              <input
                type="range"
                min={150}
                max={1500}
                step={50}
                value={form.dailyFoodBudgetInr}
                onChange={(e) => setForm({ ...form, dailyFoodBudgetInr: Number(e.target.value) })}
                className="w-full accent-emerald-400"
              />
            </div>
          </motion.div>
        )}

        {/* Step 5: Final Consent */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h2 className="text-xl font-bold text-white">Consent & Privacy</h2>
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-slate-300 space-y-2">
              <p className="flex items-center gap-2 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Data Protection & Medical Disclaimer
              </p>
              <p>NutriWell provides evidence-based nutrition intelligence and healthcare connections. It does not replace emergency room medical treatment.</p>
            </div>
          </motion.div>
        )}

        {/* Final Completion View */}
        {step === 7 && (
          <motion.div key="step7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto emerald-glow-lg">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="text-2xl font-bold text-white">"Your NutriWell experience is ready."</h2>
            <p className="text-xs text-slate-300">Your personalized health command center has been configured.</p>

            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/home')}>
              ENTER MY NUTRIWELL
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      {step <= 5 && (
        <div className="flex items-center justify-between pt-4 border-t border-emerald-900/40">
          {step > 1 ? (
            <Button variant="ghost" size="sm" icon={<ChevronLeft className="w-4 h-4" />} onClick={prevStep}>
              Back
            </Button>
          ) : <div />}

          <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />} onClick={nextStep}>
            {step === 5 ? 'COMPLETE SETUP' : 'NEXT STEP'}
          </Button>
        </div>
      )}
    </div>
  );
};
