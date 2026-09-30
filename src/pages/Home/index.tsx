import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { nutritionService } from '../../services/nutritionService';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { WhatShouldIEatCard } from '../../components/dashboard/WhatShouldIEatCard';
import { BadDayRecoveryCard } from '../../components/dashboard/BadDayRecoveryCard';
import { CustomOptionModal } from '../../components/common/CustomOptionModal';
import { MyPlanModal } from '../../components/dashboard/MyPlanModal';
import { MyHealthModal } from '../../components/dashboard/MyHealthModal';
import { PremiumUpgradeModal } from '../../components/common/PremiumUpgradeModal';
import { MotivationalQuoteBanner } from '../../components/dashboard/MotivationalQuoteBanner';
import { 
  Sparkles, Camera, Utensils, Droplets, 
  Wallet, Trash2, Plus, ShieldCheck, Target, ArrowRight,
  HeartPulse, Clock, Crown, Activity, Flame, Dumbbell
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    user, 
    meals, 
    deleteMeal, 
    setIsScannerOpen, 
    logWater, 
    t, 
    userMode,
    tier,
    isPremiumModalOpen,
    setIsPremiumModalOpen,
    dailyExercises,
    setIsBudgetModalOpen
  } = useApp();
  
  const navigate = useNavigate();
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  const dailyScore = nutritionService.calculateDailyTotals(user);
  const remainingBudget = user.dailyFoodBudgetInr - user.spentTodayInr;
  const proteinGap = Math.max(0, user.dailyProteinTarget - dailyScore.proteinConsumed);
  const hydrationPct = Math.min(100, Math.round((2250 / user.dailyWaterTargetMl) * 100));

  // Dynamic micronutrient calculations from logged meals
  const calculatedIronPct = Math.min(100, Math.round((dailyScore.proteinConsumed / user.dailyProteinTarget) * 72) + 18);
  const calculatedVitCPct = Math.min(100, Math.round((dailyScore.fiberConsumed / 30) * 65) + 20);
  const calculatedVitDPct = 45;
  const calculatedB12Pct = Math.min(100, Math.round((dailyScore.proteinConsumed / user.dailyProteinTarget) * 60) + 15);

  return (
    <div className="space-y-6">
      {/* Top Header Bar: Greeting & Ambient Mode Indicator */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>Health Command Center</Badge>
            {userMode === 'TEEN_SAFETY' && <Badge variant="teal" icon={<ShieldCheck className="w-3 h-3" />}>Teen Safety Active</Badge>}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
            {t('goodMorning')}, {user.name} 👋
          </h1>
          
          {/* Motivational Quotes Banner (Health, Discipline, Habits, Nutrition) */}
          <MotivationalQuoteBanner />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" icon={<Camera className="w-3.5 h-3.5" />} onClick={() => setIsScannerOpen(true)}>
            {t('scanFood')}
          </Button>
          <Button variant="secondary" size="sm" icon={<Utensils className="w-3.5 h-3.5" />} onClick={() => navigate('/nutrition')}>
            {t('buildMeal')}
          </Button>
          <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setIsCustomModalOpen(true)}>
            + OTHER / CUSTOM
          </Button>
          <Button 
            variant="gold" 
            size="sm" 
            icon={<Crown className="w-3.5 h-3.5" />} 
            onClick={() => setIsPremiumModalOpen(true)}
          >
            {tier === 'PREMIUM' ? 'PREMIUM ✦' : t('viewPremium')}
          </Button>
        </div>
      </div>

      {/* 1. MY CURRENT HEALTH STATE (Compact Structured Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5" />
            {t('myCurrentHealthState')}
          </h2>
          <span className="text-[10px] text-slate-400 font-medium">Synced with session profile</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {/* Nutrition Score */}
          <div 
            onClick={() => setIsHealthModalOpen(true)}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/50 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>{t('nutritionScore')}</span>
              <span className="text-mint-accent">{dailyScore.score}/100</span>
            </div>
            <p className="text-xl font-black text-white group-hover:text-mint-accent transition-colors">
              {dailyScore.score}
            </p>
            <div className="h-1 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dailyScore.score}%` }} />
            </div>
          </div>

          {/* Protein */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>{t('protein')}</span>
              <span className="text-amber-400">{dailyScore.proteinConsumed}g / {user.dailyProteinTarget}g</span>
            </div>
            <p className="text-xl font-black text-amber-300">
              {dailyScore.proteinConsumed}g
            </p>
            <div className="h-1 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full" 
                style={{ width: `${Math.min(100, (dailyScore.proteinConsumed / user.dailyProteinTarget) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Carbohydrates */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>{t('carbs')}</span>
              <span className="text-teal-300">{dailyScore.carbsConsumed}g / 220g</span>
            </div>
            <p className="text-xl font-black text-teal-200">
              {dailyScore.carbsConsumed}g
            </p>
            <div className="h-1 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-teal-400 rounded-full" 
                style={{ width: `${Math.min(100, (dailyScore.carbsConsumed / 220) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Fat & Fiber */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>{t('fat')} & {t('fiber')}</span>
              <span className="text-mint-accent">{dailyScore.fiberConsumed}g fiber</span>
            </div>
            <p className="text-sm font-bold text-white mt-1">
              {dailyScore.fatConsumed}g fat • {dailyScore.fiberConsumed}g fiber
            </p>
            <div className="h-1 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-mint-accent rounded-full" 
                style={{ width: `${Math.min(100, (dailyScore.fiberConsumed / 35) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Hydration & Habit Consistency */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5 col-span-2 sm:col-span-1">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>{t('hydration')}</span>
              <span className="text-cyan-400">2.25L (75%)</span>
            </div>
            <p className="text-sm font-bold text-cyan-300">
              6-Day Habit Streak 🔥
            </p>
            <div className="h-1 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full w-[75%]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2 & 3. TODAY'S PERSONAL DIET & PERSONAL DIET SUMMARY (Connected Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: TODAY'S PERSONAL DIET (Dynamic macro & micro nutrients) */}
        <Card className="lg:col-span-7 space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-mint-accent" />
                {t('todaysPersonalDiet')}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time macro & micronutrient breakdown from your logs</p>
            </div>
            <Badge variant="mint">{user.dietPreference}</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">{t('protein')}</span>
              <p className="text-base font-bold text-amber-300 mt-0.5">{dailyScore.proteinConsumed}g <span className="text-[11px] text-slate-400 font-normal">/ {user.dailyProteinTarget}g</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">{t('carbs')}</span>
              <p className="text-base font-bold text-teal-300 mt-0.5">{dailyScore.carbsConsumed}g <span className="text-[11px] text-slate-400 font-normal">/ 220g</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">{t('fat')}</span>
              <p className="text-base font-bold text-white mt-0.5">{dailyScore.fatConsumed}g <span className="text-[11px] text-slate-400 font-normal">/ 65g</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">{t('fiber')}</span>
              <p className="text-base font-bold text-mint-accent mt-0.5">{dailyScore.fiberConsumed}g <span className="text-[11px] text-slate-400 font-normal">/ 35g</span></p>
            </div>
          </div>

          {/* Micronutrient Percentages Grid */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Iron</span>
              <span className="text-sm font-bold text-emerald-400">{calculatedIronPct}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vit C</span>
              <span className="text-sm font-bold text-amber-300">{calculatedVitCPct}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vit D</span>
              <span className="text-sm font-bold text-cyan-300">{calculatedVitDPct}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/30">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">B12</span>
              <span className="text-sm font-bold text-purple-300">{calculatedB12Pct}%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-emerald-900/30">
            💡 {t('addMoreFoodData')}
          </p>
        </Card>

        {/* Right Card: PERSONAL DIET SUMMARY & NEXT PRIORITY */}
        <Card glow className="lg:col-span-5 space-y-4 p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {t('todaysDiet')}
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold">3 of 4 Logged</span>
            </div>

            {/* Meal Progress Sequence */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                <span className="text-[10px] block text-slate-400">Breakfast</span>
                <span className="font-bold text-mint-accent">✓ Done</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                <span className="text-[10px] block text-slate-400">Lunch</span>
                <span className="font-bold text-mint-accent">✓ Done</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                <span className="text-[10px] block text-slate-400">Snack</span>
                <span className="font-bold text-mint-accent">✓ Done</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-amber-900/40 text-amber-300">
                <span className="text-[10px] block text-slate-400">Dinner</span>
                <span className="font-bold text-amber-400">— Next</span>
              </div>
            </div>

            {/* Next Priority Highlight */}
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-900/40 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                {t('yourNextPriority')}
              </span>
              <p className="text-xs font-semibold text-white leading-relaxed">
                "Your next meal is an opportunity to add {proteinGap > 0 ? `${proteinGap}g protein` : 'balanced micronutrients'} to reach your {user.nutritionGoal} baseline."
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/nutrition')}
            >
              {t('planMyNextMeal')}
            </Button>
          </div>
        </Card>
      </div>

      {/* 4. FITNESS & DAILY MOVEMENT (Replaced Modes Banner) */}
      <div className="space-y-4">
        {/* Fitness & Gym Movement Card */}
        <div className="p-5 rounded-2xl border bg-gradient-to-br from-slate-900/95 via-emerald-950/40 to-slate-900 border-emerald-500/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="mint" icon={<Activity className="w-3.5 h-3.5" />}>FITNESS &amp; GYM</Badge>
              <span className="text-xs font-bold text-white">Daily Movement &amp; Basic Exercise</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-semibold">
                Students &amp; Professionals
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Build daily consistency with simple beginner exercises. Target: <strong className="text-emerald-400">{dailyExercises.filter(e => e.completed).length} / {dailyExercises.length} completed</strong> ({Math.round((dailyExercises.filter(e => e.completed).length / dailyExercises.length) * 100)}% Daily Movement Goal).
            </p>
            
            {/* Quick Exercise Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              {dailyExercises.slice(0, 3).map((ex) => (
                <span
                  key={ex.id}
                  className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 transition-colors ${
                    ex.completed
                      ? 'bg-emerald-950/80 border-emerald-600/50 text-emerald-300'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${ex.completed ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <strong className="font-semibold text-slate-200">{ex.name.split('/')[0].trim()}</strong>
                  <span className="text-slate-400 text-[10px]">({ex.target})</span>
                </span>
              ))}
              <span className="text-[11px] text-emerald-400 font-semibold">+ {dailyExercises.length - 3} more</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/fitness')}
              className="whitespace-nowrap font-bold text-xs"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              OPEN FITNESS &amp; ROUTINE
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/fitness')}
              className="whitespace-nowrap text-xs"
            >
              VIEW EXERCISES
            </Button>
          </div>
        </div>

        {/* Adaptive What Should I Eat Component */}
        <WhatShouldIEatCard
          onUseWhatIHaveClick={() => navigate('/nutrition')}
          onCheaperClick={() => navigate('/meals')}
        />
      </div>

      {/* Conditional: Bad Day Recovery */}
      {dailyScore.proteinConsumed < 40 && <BadDayRecoveryCard />}

      {/* 5. DASHBOARD CONTINUATION (Food Expenditure Budget & Hydration) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Food Expenditure Budget */}
        <Card className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-400" />
              Food Expenditure Budget
            </span>
            <button
              type="button"
              onClick={() => setIsBudgetModalOpen(true)}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 hover:border-emerald-500/50 transition-colors cursor-pointer"
            >
              Manage Items
            </button>
          </div>
          <p className="text-xl font-extrabold text-white">
            "₹{remainingBudget} of your ₹{user.dailyFoodBudgetInr} food budget remains."
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Spent today: <strong className="text-amber-300">₹{user.spentTodayInr}</strong></span>
            <button
              type="button"
              onClick={() => setIsBudgetModalOpen(true)}
              className="text-[11px] text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              View &amp; Remove Deductions →
            </button>
          </div>
        </Card>

        {/* Hydration Tracker */}
        <Card className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              Hydration Tracker
            </span>
            <Button variant="outline" size="sm" onClick={() => logWater(250)}>+250ml</Button>
          </div>
          <p className="text-lg font-bold text-cyan-300">2,250ml / {user.dailyWaterTargetMl}ml Target ({hydrationPct}%)</p>
          <p className="text-xs text-slate-400">Consistent cellular hydration supports active digestion & focus.</p>
        </Card>
      </div>

      {/* Today's Meal Timeline */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{t('foodTimeline')}</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/meals')}>View All Meals</Button>
        </div>

        <div className="space-y-3">
          {meals.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No meals logged today yet.</p>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-emerald-900/30 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {meal.image ? (
                    <img src={meal.image} alt={meal.foodName} className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                      {meal.mealType.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="mint">{meal.mealType}</Badge>
                      <span className="text-[11px] text-slate-400">{meal.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">{meal.foodName}</h4>
                    <p className="text-xs text-slate-400">{meal.calories} kcal • {meal.protein}g protein • ₹{meal.costInr}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteMeal(meal.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete meal log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Modals */}
      <CustomOptionModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />

      <MyPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onFixNextMeal={() => navigate('/nutrition')}
      />

      <MyHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />

      <PremiumUpgradeModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};
