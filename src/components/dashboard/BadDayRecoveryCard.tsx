import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { aiApi } from '../../services/api/aiApi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Heart, Plus, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';

export const BadDayRecoveryCard: React.FC = () => {
  const { addMeal, showToast } = useApp();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiApi.badDayRecovery();
      setPlan(res);
    } catch (err: any) {
      const msg = err?.message || 'AI generation failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <Card glow className="space-y-3 p-5 border-teal-500/40 bg-gradient-to-r from-teal-950/40 via-slate-950 to-emerald-950/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="teal" icon={<Heart className="w-3.5 h-3.5" />}>SIGNATURE RECOVERY</Badge>
          <span className="text-xs font-bold text-white uppercase tracking-wider">No-Shame Strategy</span>
        </div>
        <Button variant="ghost" size="sm" icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />} onClick={fetchPlan}>
          REFRESH AI
        </Button>
      </div>

      {loading && (
        <div className="py-6 text-center space-y-2">
          <Sparkles className="w-6 h-6 text-teal-400 animate-spin mx-auto" />
          <p className="text-xs text-teal-300 font-medium animate-pulse">Generating personalized recovery plan via Gemini AI...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/40 text-center space-y-2">
          <AlertTriangle className="w-5 h-5 text-red-400 mx-auto" />
          <p className="text-xs font-bold text-red-300">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchPlan}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && plan && (
        <>
          <div>
            <h3 className="text-base font-bold text-white">"{plan.empatheticHeadline || "Today didn't go as planned. That's totally okay."}"</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{plan.adviceMessage}</p>
          </div>

          {plan.recommendedRecoveryMeal && (
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  🍲
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{plan.recommendedRecoveryMeal.name || plan.recommendedRecoveryMeal.title || 'Recovery Meal'}</h4>
                  <p className="text-[10px] text-emerald-300">
                    {plan.recommendedRecoveryMeal.protein || 18}g protein • ₹{plan.recommendedRecoveryMeal.costInr || 50}
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-3 h-3" />}
                onClick={() => {
                  const m = plan.recommendedRecoveryMeal;
                  addMeal({
                    foodName: m.name || m.title || 'Recovery Meal',
                    mealType: 'Dinner',
                    calories: m.calories || 300,
                    protein: m.protein || 18,
                    carbs: m.carbs || 30,
                    fat: m.fat || 8,
                    fiber: m.fiber || 6,
                    costInr: m.costInr || 50,
                  });
                  showToast("Added recovery meal to your log!");
                }}
              >
                RECOVER NOW
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
