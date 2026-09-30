import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { aiApi } from '../../services/api/aiApi';
import { WhatShouldIEatOption } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Sparkles, Utensils, Clock, DollarSign, Plus, RefreshCw, AlertTriangle } from 'lucide-react';

interface WhatShouldIEatCardProps {
  onUseWhatIHaveClick?: () => void;
  onCheaperClick?: () => void;
}

export const WhatShouldIEatCard: React.FC<WhatShouldIEatCardProps> = ({
  onUseWhatIHaveClick,
  onCheaperClick,
}) => {
  const { user, meals, contextMode, addMeal, showToast } = useApp();
  const [options, setOptions] = useState<WhatShouldIEatOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const currentGap = Math.max(0, user.dailyProteinTarget - totalProtein);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiApi.whatShouldIEat(contextMode);
      if (res && Array.isArray(res.options)) {
        setOptions(res.options);
      } else if (Array.isArray(res)) {
        setOptions(res);
      } else {
        throw new Error('AI generation failed. Please try again.');
      }
    } catch (err: any) {
      const errMsg = err?.message || 'AI generation failed. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [contextMode]);

  return (
    <Card glow className="space-y-4 p-5 border-emerald-400/50 bg-gradient-to-br from-emerald-950/80 via-slate-950 to-teal-950/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>SIGNATURE AI FEATURE</Badge>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Best Move Right Now</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />} onClick={fetchRecommendations}>
            REFRESH AI
          </Button>
          <Button variant="ghost" size="sm" icon={<DollarSign className="w-3.5 h-3.5" />} onClick={onCheaperClick}>
            MAKE IT CHEAPER
          </Button>
          <Button variant="outline" size="sm" icon={<Utensils className="w-3.5 h-3.5" />} onClick={onUseWhatIHaveClick}>
            USE WHAT I HAVE
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-white">What Should I Eat Now?</h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Based on your {currentGap}g protein gap, {contextMode.toLowerCase()} context, and ₹{user.dailyFoodBudgetInr} budget:
        </p>
      </div>

      {loading && (
        <div className="py-8 text-center space-y-2">
          <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-xs text-emerald-300 animate-pulse font-medium">Generating personalized meal suggestions via Gemini AI...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/40 text-center space-y-2">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-xs font-bold text-red-300">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchRecommendations}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {options.map((opt, idx) => (
            <div
              key={opt.id || `opt-${idx}`}
              className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-900/40 hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald">{opt.category || 'High Protein'}</Badge>
                  <span className="text-xs font-extrabold text-amber-400">₹{opt.costInr || 60}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{opt.title}</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed italic bg-emerald-950/40 p-2 rounded-xl border border-emerald-900/30">
                  "{opt.reasonWhy}"
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{opt.protein}g protein</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {opt.prepTimeMinutes || 15}m prep</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => {
                  addMeal({
                    foodName: opt.title,
                    mealType: 'Lunch',
                    calories: opt.calories || 350,
                    protein: opt.protein || 20,
                    carbs: 35,
                    fat: 10,
                    fiber: 8,
                    costInr: opt.costInr || 60,
                  });
                  showToast(`Logged ${opt.title} to your timeline!`);
                }}
              >
                EAT THIS MEAL
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
