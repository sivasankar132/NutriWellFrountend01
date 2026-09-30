import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContextMode } from '../../types';
import { modeConfigs, ModePlanItem, ModeQuickMeal } from '../../data/modeConfig';
import { ModePlateBuilder } from './ModePlateBuilder';
import { ModeSelectorModal } from '../dashboard/ModeSelectorModal';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  Sparkles, Clock, DollarSign, Zap, ChevronRight, 
  CheckCircle2, Plus, ArrowLeft, RefreshCw, 
  ShieldAlert, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ModeShellProps {
  mode: ContextMode;
}

export const ModeShell: React.FC<ModeShellProps> = ({ mode }) => {
  const { addMeal, showToast, t } = useApp();
  const navigate = useNavigate();
  const config = modeConfigs[mode] || modeConfigs['STUDENT'];

  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | '< 10 min' | '< 20 min' | '< 30 min'>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'plate' | 'meals' | 'specialized' | 'analytics'>('overview');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filteredQuickMeals = selectedTimeFilter === 'all'
    ? config.quickMeals
    : config.quickMeals.filter(m => m.timeCategory === selectedTimeFilter);

  const handleLogPlanItem = (plan: ModePlanItem) => {
    addMeal({
      foodName: `[${config.title}] ${plan.name}`,
      mealType: plan.mealType === 'Snack' ? 'Snacks' : plan.mealType,
      calories: plan.calories,
      protein: plan.protein,
      carbs: Math.round(plan.calories * 0.5 / 4),
      fat: Math.round(plan.calories * 0.25 / 9),
      fiber: 6,
      costInr: plan.costInr,
      contextTag: mode,
    });
    showToast(`Logged "${plan.name}" to your daily nutrition log!`);
  };

  const handleLogQuickMeal = (meal: ModeQuickMeal) => {
    addMeal({
      foodName: `[Quick Meal] ${meal.title}`,
      mealType: 'Lunch',
      calories: meal.calories,
      protein: meal.protein,
      carbs: Math.round(meal.calories * 0.45 / 4),
      fat: Math.round(meal.calories * 0.25 / 9),
      fiber: 5,
      costInr: meal.costInr,
      contextTag: mode,
    });
    showToast(`Logged "${meal.title}" to your log!`);
  };

  const handleAskModeAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAiLoading(false);
      if (mode === 'STUDENT') {
        setAiResponse(`For students on ₹${config.dailyBudgetInr}/day: Combine 2 boiled eggs (₹14, 12g protein) with roasted chana (₹10, 8g protein) and curd rice. Total ₹34, 25g protein! Drink water before exam sessions for sustained cognitive alertness.`);
      } else if (mode === 'EMPLOYEE') {
        setAiResponse(`For desk energy: Opt for high-fiber complex carbs (multigrain roti + dal) and a handful of roasted almonds at 3:30 PM. Keep hydration to 250ml per hour to prevent desk fatigue.`);
      } else if (mode === 'HOSTEL') {
        setAiResponse(`Mess Hack: Always request extra dal/chana soup. Add 2 tbsp of sattu or milk powder to your room drinks, or keep boiled eggs in your room for an instant 12g protein boost without cooking.`);
      } else if (mode === 'HOME') {
        setAiResponse(`Pantry Balancing: Use sprouted moong with seasonal sabzi. Reduce tadka oil by half and supplement with flaxseed powder to boost Omega-3s across whole-family meals.`);
      } else if (mode === 'TRAVEL') {
        setAiResponse(`Transit Safe Nutrition: Choose sealed bottled mineral water, roasted nuts, whole bananas, and freshly cooked hot vegetarian meals (dal khichdi or hot idli) at verified transit stops.`);
      } else if (mode === 'EATING_OUT') {
        setAiResponse(`Restaurant Smart Swap: Ask for gravy on the side, choose tandoori or steamed over deep-fried items, and start with a fresh cucumber-tomato salad to buffer glucose absorption.`);
      } else if (mode === 'ACTIVE') {
        setAiResponse(`Performance Window: Consume 25–30g fast-acting protein with 40g complex carbs within 45 mins post-workout. Keep daily target at 1.8g/kg body weight evenly spaced across 4 meals.`);
      } else {
        setAiResponse(`Vitality Recommendation: Prioritize dietary iron sources (spinach, beetroot, ragi) paired with Vitamin C (lemon/amla) for 3x bio-availability. Stay gently hydrated throughout the day.`);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </Button>
          <span className="text-border">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mode Experience</span>
          <span className="text-border">/</span>
          <span className="text-xs font-bold text-foreground">{config.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModeSelectorOpen(true)}
            className="text-xs border-primary/30 hover:border-primary text-primary hover:bg-primary/10 gap-1.5 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t('changeMode')}
          </Button>
        </div>
      </div>

      {/* Mode Header Banner */}
      <div className={`relative overflow-hidden rounded-2xl border ${config.borderAccent} ${config.accentBg} p-6 sm:p-8 backdrop-blur-md shadow-lg`}>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="mint" size="sm">
              {config.targetTag}
            </Badge>
            <Badge variant="slate" size="sm">
              {config.badge}
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {config.title}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              {config.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-foreground/90">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-border/40">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-muted-foreground">Target Daily Budget:</span>
              <span className="font-bold text-foreground">₹{config.dailyBudgetInr}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-border/40">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-muted-foreground">Core Strategy:</span>
              <span className="font-bold text-foreground">{config.coreFocus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/40 scrollbar-none">
        {[
          { id: 'overview', label: "Today's Plan", count: config.todayPlan.length },
          { id: 'plate', label: `Build ${config.title} Plate`, badge: 'Interactive' },
          { id: 'specialized', label: config.specializedData.sectionTitle, badge: 'Intelligence' },
          { id: 'meals', label: 'Quick Meals (<10-30m)', count: config.quickMeals.length },
          { id: 'analytics', label: 'Mode Analytics', count: config.analyticsMetrics.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card/40 text-muted-foreground hover:text-foreground hover:bg-card/80 border border-border/40'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${activeTab === tab.id ? 'bg-white text-emerald-900' : 'bg-primary/20 text-primary'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & TODAY'S PLAN */}
      {(activeTab === 'overview') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Today's Curated {config.title} Schedule
              </h2>
              <p className="text-xs text-muted-foreground">
                Calorie & budget-aligned meals designed specifically for your routine.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('plate')}
              className="text-xs text-primary border-primary/40 hover:bg-primary/10 gap-1"
            >
              Build Custom Plate <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.todayPlan.map((plan, idx) => (
              <Card key={idx} className="p-5 border border-border/60 bg-card/60 hover:border-primary/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" size="sm">
                      {plan.mealType}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <DollarSign className="w-3.5 h-3.5 inline" />₹{plan.costInr}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 inline" />{plan.prepTimeMinutes} mins
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium mt-1">
                      💡 {plan.whyThisFits}
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3 border border-border/40">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Ingredients & Breakdown:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.items.map((item, i) => (
                        <span key={i} className="text-xs bg-muted/60 text-foreground px-2 py-0.5 rounded border border-border/40">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-foreground font-semibold">🔥 {plan.calories} kcal</span>
                    <span className="text-primary font-bold">💪 {plan.protein}g protein</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLogPlanItem(plan)}
                    className="text-xs text-primary hover:bg-primary/10 gap-1 h-8"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log Meal
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Direct Plate Builder Hook */}
          <div className="pt-4">
            <ModePlateBuilder mode={mode} />
          </div>
        </div>
      )}

      {/* TAB 2: PLATE BUILDER */}
      {activeTab === 'plate' && (
        <div className="space-y-4">
          <ModePlateBuilder mode={mode} />
        </div>
      )}

      {/* TAB 3: SPECIALIZED INTELLIGENCE */}
      {activeTab === 'specialized' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              {config.specializedData.sectionTitle}
            </h2>
            <p className="text-xs text-muted-foreground">
              {config.specializedData.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.specializedData.cards.map((card, idx) => (
              <Card key={idx} className="p-5 border border-border/60 bg-card/60 hover:border-primary/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">
                    {card.title}
                  </h3>
                  <Badge variant="teal" size="sm">
                    {card.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
                {card.details && (
                  <div className="space-y-1 pt-2">
                    {card.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-foreground/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
                {card.actionLabel && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast(`Activated: ${card.title}`)}
                      className="text-xs border-primary/30 text-primary hover:bg-primary/10 w-full"
                    >
                      {card.actionLabel}
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUICK MEALS */}
      {activeTab === 'meals' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Quick Meals for {config.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                High-speed nutrition tailored to your time budget.
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-card p-1 rounded-xl border border-border/60">
              {(['all', '< 10 min', '< 20 min', '< 30 min'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedTimeFilter(filter)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedTimeFilter === filter
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter === 'all' ? 'All Times' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuickMeals.map((meal) => (
              <Card key={meal.id} className="p-4 border border-border/60 bg-card/60 hover:border-primary/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="mint" size="sm">
                      {meal.timeCategory}
                    </Badge>
                    <span className="text-xs font-bold text-emerald-400">
                      ₹{meal.costInr}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground">
                    {meal.title}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {meal.ingredients.map((ing, i) => (
                      <span key={i} className="text-[11px] bg-muted/50 text-foreground px-1.5 py-0.5 rounded border border-border/30">
                        {ing}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {meal.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-muted-foreground font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-semibold text-foreground">{meal.calories} kcal</span> • <span className="font-bold text-primary">{meal.protein}g P</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLogQuickMeal(meal)}
                    className="text-xs text-primary hover:bg-primary/10 gap-1 h-7 px-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MODE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              {config.title} Target Analytics
            </h2>
            <p className="text-xs text-muted-foreground">
              Real-time telemetry measuring alignment with your lifestyle constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.analyticsMetrics.map((metric, idx) => (
              <Card key={idx} className="p-5 border border-border/60 bg-card/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">{metric.label}</span>
                  <Badge 
                    variant={metric.status === 'good' ? 'emerald' : metric.status === 'attention' ? 'danger' : 'slate'}
                    size="sm"
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Interactive AI Assistant Bar for this Mode */}
      <Card className="p-6 border border-primary/30 bg-primary/5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Ask NutriWell AI about {config.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                Instant nutritional guidance adapted to your specific daily constraints.
              </p>
            </div>
          </div>
          <Badge variant="mint" size="sm">AI Powered</Badge>
        </div>

        <form onSubmit={handleAskModeAI} className="flex gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder={`e.g. What is the cheapest high-protein snack for ${config.title}?`}
            className="flex-1 bg-card border border-border/60 rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <Button
            type="submit"
            disabled={isAiLoading || !aiQuestion.trim()}
            className="px-4 text-xs font-semibold"
          >
            {isAiLoading ? 'Thinking...' : 'Ask AI'}
          </Button>
        </form>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-card border border-border/60 text-xs text-foreground/90 leading-relaxed"
          >
            <span className="font-bold text-primary block mb-1">🤖 NutriWell AI Response:</span>
            {aiResponse}
          </motion.div>
        )}
      </Card>

      {/* Mode Selector Modal */}
      <ModeSelectorModal
        isOpen={isModeSelectorOpen}
        onClose={() => setIsModeSelectorOpen(false)}
      />
    </div>
  );
};