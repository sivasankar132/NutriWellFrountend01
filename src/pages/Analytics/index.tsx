import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockAnalyticsData } from '../../data/mockAnalytics';
import { useApp } from '../../context/AppContext';
import { 
  BarChart2, TrendingUp, Sparkles, Download, ArrowRight, 
  ShieldCheck, Zap, AlertCircle, CheckCircle2, Calendar, Crown
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { showToast, tier, setTier } = useApp();
  const [period, setPeriod] = useState<'Today' | '7 Days' | '30 Days' | '3 Months'>('7 Days');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>Deep Health & Behavioral Analytics</Badge>
            {tier === 'PREMIUM' && <Badge variant="gold" icon={<Crown className="w-3 h-3" />}>Premium 30-Day Intelligence</Badge>}
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Nutrition & Expenditure Trends</h1>
          <p className="text-xs text-slate-400">Track macro intake, weight trajectory, and food spending compliance over time.</p>
        </div>

        {/* Timeframe selector & Export buttons */}
        <div className="flex items-center gap-2">
          {(['Today', '7 Days', '30 Days', '3 Months'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                period === p
                  ? 'bg-emerald-600 text-white emerald-glow-sm'
                  : 'bg-slate-900 border border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
              }`}
            >
              {p}
            </button>
          ))}
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => showToast("Health Brief PDF exported!")}>
            EXPORT BRIEF
          </Button>
        </div>
      </div>

      {/* Progressive Disclosure: Top Primary Insight */}
      <Card glow className="space-y-4 p-6 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-teal-950/80 border-emerald-400/50">
        <div className="flex items-center gap-2">
          <Badge variant="mint" icon={<Zap className="w-3.5 h-3.5" />}>KEY ANALYTICS DIAGNOSTIC</Badge>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">What Changed This Week?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">1. What Changed?</span>
            <p className="text-xs font-bold text-white">Protein intake increased +14% (Average 104g/day)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">2. Why Did It Change?</span>
            <p className="text-xs font-bold text-emerald-300">Added Sprouted Moong & Paneer Tikka to lunch</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-900/40 space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">3. What Should I Do Next?</span>
            <p className="text-xs font-bold text-mint-accent">Maintain 3.0L hydration to optimize muscle protein synthesis</p>
          </div>
        </div>
      </Card>

      {/* SIGNATURE 30-DAY PERSONAL HEALTH JOURNEY MODULE */}
      <Card className="space-y-5 p-5 sm:p-6 border-emerald-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/40">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-mint-accent" />
              <h3 className="text-base font-bold text-white">30-Day Personal Health Journey & Strategy</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Comprehensive behavioral review, adherence milestones, and forward trajectory</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTier(tier === 'PREMIUM' ? 'FREE' : 'PREMIUM')}
              className="text-xs text-mint-accent hover:underline font-semibold cursor-pointer"
            >
              {tier === 'PREMIUM' ? 'Showing Premium Intelligence ✦' : 'Simulate Premium 30-Day Unlock'}
            </button>
          </div>
        </div>

        {/* 3 Diagnostic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: What Improved? */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">What Improved?</h4>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-emerald-300">Protein Compliance:</strong> +18% consistency over previous 30 days.</li>
              <li><strong className="text-emerald-300">Budget Discipline:</strong> Saved ₹1,420 by prioritizing local dal & paneer.</li>
              <li><strong className="text-emerald-300">Streak:</strong> Achieved current 6-day micro-habit adherence.</li>
            </ul>
          </div>

          {/* Card 2: What Needs Attention? */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/40">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">What Needs Attention?</h4>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-amber-300">Weekend Fiber Dip:</strong> Dietary fiber drops 35% on Sat/Sun dining out.</li>
              <li><strong className="text-amber-300">Evening Hydration:</strong> Zero water logged between 4 PM and bedtime.</li>
              <li><strong className="text-amber-300">Sodium Spikes:</strong> Packaged snack logs during late study sessions.</li>
            </ul>
          </div>

          {/* Card 3: Your Next 7 Days */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Your Next 7 Days</h4>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-cyan-300">Strategic Anchor:</strong> Lock in 25g protein at breakfast (egg/paneer/sprouts).</li>
              <li><strong className="text-cyan-300">5:00 PM Refill:</strong> Keep 500ml water bottle during afternoon commute.</li>
              <li><strong className="text-cyan-300">Weekend Buffer:</strong> Pre-load 1 bowl of salad before eating out.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Context Insights List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAnalyticsData.insights.map((insight, idx) => (
          <Card key={idx} className="flex items-start gap-3 p-4">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">{insight}</p>
          </Card>
        ))}
      </div>

      {/* Analytics Visual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calorie Compliance Chart */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
            Calorie Target vs Actual (kcal)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-emerald-900/40">
            {mockAnalyticsData.weeklyCalories.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-emerald-500/80 rounded-t-lg group-hover:bg-emerald-400 transition-all relative"
                  style={{ height: `${(d.calories / 2500) * 100}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500/40 whitespace-nowrap">
                    {d.calories}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Protein Intake History */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-mint-accent">
            Protein Intake (Grams)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-emerald-900/40">
            {mockAnalyticsData.weeklyProtein.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-mint-accent/80 rounded-t-lg group-hover:bg-mint-accent transition-all relative"
                  style={{ height: `${(d.protein / 140) * 100}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500/40 whitespace-nowrap">
                    {d.protein}g
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Food Budget Spending */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
            Daily Food Spending (₹ INR)
          </h3>
          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-emerald-900/40">
            {mockAnalyticsData.weeklySpendingInr.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className={`w-full rounded-t-lg transition-all relative ${
                    d.spent > d.budget ? 'bg-amber-500/80' : 'bg-teal-500/80'
                  }`}
                  style={{ height: `${(d.spent / 500) * 100}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500/40 whitespace-nowrap">
                    ₹{d.spent}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weight Trajectory Trend */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-teal-300">
            Weight Trajectory (kg)
          </h3>
          <div className="h-48 flex items-end justify-between gap-4 pt-4 px-4 border-b border-emerald-900/40">
            {mockAnalyticsData.weightTrendKg.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-gradient-to-t from-teal-800 to-emerald-400 rounded-t-lg h-32 relative flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{d.weight}kg</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
