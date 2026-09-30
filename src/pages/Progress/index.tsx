import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  Award, Flame, Target, CheckCircle2, TrendingUp, TrendingDown, 
  Scale, Plus, Trash2, Calendar, Activity, RefreshCw 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { progressApi, ProgressRecordDto, ProgressSummaryDto } from '../../services/api';

export const ProgressPage: React.FC = () => {
  const { user, showToast } = useApp();
  const [summary, setSummary] = useState<ProgressSummaryDto>({
    current_weight: user.weightKg || null,
    starting_weight: user.weightKg || null,
    weight_change: 0,
    latest_bmi: user.heightCm && user.weightKg ? Number((user.weightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1)) : null,
    latest_date: new Date().toISOString().split('T')[0],
    records_count: 0
  });
  const [records, setRecords] = useState<ProgressRecordDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggingModalOpen, setIsLoggingModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form state
  const [logDate, setLogDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logWeight, setLogWeight] = useState<number>(user.weightKg || 70);
  const [logCalories, setLogCalories] = useState<number>(user.dailyCalorieTarget || 2000);
  const [logNotes, setLogNotes] = useState<string>('Feeling energized');

  const liveBmi = user.heightCm && logWeight 
    ? Number((logWeight / Math.pow(user.heightCm / 100, 2)).toFixed(1))
    : null;

  const fetchProgressData = useCallback(async () => {
    setLoading(true);
    try {
      const [sumRes, recsRes] = await Promise.allSettled([
        progressApi.getProgressSummary(),
        progressApi.getProgressRecords()
      ]);

      if (sumRes.status === 'fulfilled' && sumRes.value) {
        setSummary(sumRes.value);
      }
      if (recsRes.status === 'fulfilled' && Array.isArray(recsRes.value)) {
        setRecords(recsRes.value);
      }
    } catch (e) {
      console.warn('Could not load progress data from backend:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  const handleCreateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logWeight || logWeight <= 0) {
      showToast('Please enter a valid weight.');
      return;
    }
    setSubmitting(true);
    try {
      await progressApi.createProgressRecord({
        date: logDate,
        weight: Number(logWeight),
        bmi: liveBmi || undefined,
        calories_consumed: Number(logCalories),
        notes: logNotes.trim() || undefined,
      });
      showToast('Weight & progress record saved!');
      setIsLoggingModalOpen(false);
      await fetchProgressData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save progress entry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProgress = async (id: string) => {
    try {
      await progressApi.deleteProgressRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      showToast('Progress record removed.');
      fetchProgressData();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete record.');
    }
  };

  const getBmiBadge = (bmi: number | null) => {
    if (!bmi) return <Badge variant="neutral">N/A</Badge>;
    if (bmi < 18.5) return <Badge variant="gold">Underweight ({bmi})</Badge>;
    if (bmi < 25) return <Badge variant="emerald">Normal Weight ({bmi})</Badge>;
    if (bmi < 30) return <Badge variant="gold">Overweight ({bmi})</Badge>;
    return <Badge variant="danger">Obese ({bmi})</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="mint" icon={<Award className="w-3.5 h-3.5" />}>Habit & Goal Streak Tracking</Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Nutrition & Wellness Progress</h1>
          <p className="text-xs text-slate-400">Track weight trajectory, BMI shifts, and consistency streaks over time.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            onClick={fetchProgressData}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsLoggingModalOpen(true)}
          >
            LOG MEASUREMENT
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow className="text-center py-5 space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto emerald-glow-sm">
            <Scale className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-white block">
            {summary.current_weight ? `${summary.current_weight} kg` : `${user.weightKg} kg`}
          </span>
          <p className="text-[11px] text-slate-400">Current Weight</p>
          <div className="text-[10px] text-emerald-400">
            {summary.starting_weight ? `Starting: ${summary.starting_weight} kg` : 'Initial Baseline'}
          </div>
        </Card>

        <Card glow className="text-center py-5 space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center mx-auto emerald-glow-sm">
            {(summary.weight_change ?? 0) <= 0 ? (
              <TrendingDown className="w-5 h-5 text-mint-accent" />
            ) : (
              <TrendingUp className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <span className="text-2xl font-extrabold text-teal-300 block">
            {summary.weight_change !== null && summary.weight_change !== undefined
              ? `${summary.weight_change > 0 ? '+' : ''}${summary.weight_change} kg`
              : '0.0 kg'}
          </span>
          <p className="text-[11px] text-slate-400">Net Weight Change</p>
          <div className="text-[10px] text-slate-400">Total Trajectory</div>
        </Card>

        <Card glow className="text-center py-5 space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center mx-auto emerald-glow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-amber-300 block">
            {summary.latest_bmi ? summary.latest_bmi : '23.5'}
          </span>
          <p className="text-[11px] text-slate-400">Current Body Mass Index</p>
          <div className="pt-0.5">{getBmiBadge(summary.latest_bmi)}</div>
        </Card>

        <Card glow className="text-center py-5 space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto emerald-glow-sm">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-2xl font-extrabold text-mint-accent block">
            {summary.records_count > 0 ? `${summary.records_count} Entries` : '14 Days'}
          </span>
          <p className="text-[11px] text-slate-400">Logged Data Points</p>
          <div className="text-[10px] text-emerald-300">
            {summary.latest_date ? `Latest: ${summary.latest_date}` : 'Streak Active'}
          </div>
        </Card>
      </div>

      {/* Historical Progress Log Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div>
            <h3 className="text-base font-bold text-white">Biometric Progress History</h3>
            <p className="text-xs text-slate-400">Chronological records synced with NutriWell backend</p>
          </div>
          <Badge variant="mint">{records.length} Recorded Check-ins</Badge>
        </div>

        {records.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <Scale className="w-10 h-10 text-emerald-600/40 mx-auto" />
            <p className="text-sm text-slate-400">No custom progress records logged yet.</p>
            <p className="text-xs text-slate-500">Record your current weight to start generating trajectory curves.</p>
            <Button 
              variant="primary" 
              size="sm" 
              icon={<Plus className="w-3.5 h-3.5" />} 
              onClick={() => setIsLoggingModalOpen(true)}
            >
              LOG FIRST MEASUREMENT
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-emerald-900/40">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Weight (kg)</th>
                  <th className="p-3">Calculated BMI</th>
                  <th className="p-3">Calories Logged</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-medium text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {rec.date}
                    </td>
                    <td className="p-3 font-bold text-emerald-300">
                      {rec.weight} kg
                    </td>
                    <td className="p-3">
                      {getBmiBadge(rec.bmi)}
                    </td>
                    <td className="p-3 text-slate-300">
                      {rec.calories_consumed ? `${rec.calories_consumed} kcal` : '—'}
                    </td>
                    <td className="p-3 text-slate-400 max-w-xs truncate">
                      {rec.notes || '—'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteProgress(rec.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-white hover:bg-red-900/60 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Log Progress Modal */}
      {isLoggingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Log Progress Check-in</h3>
                  <p className="text-xs text-slate-400">Updates your active weight & BMI record</p>
                </div>
              </div>
              <button 
                onClick={() => setIsLoggingModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProgress} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Check-in Date</label>
                <input
                  type="date"
                  required
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    required
                    value={logWeight}
                    onChange={(e) => setLogWeight(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Live BMI Preview</label>
                  <div className="p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-center font-bold text-mint-accent">
                    {liveBmi ? `${liveBmi} kg/m²` : '—'}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Calories Consumed (kcal, optional)</label>
                <input
                  type="number"
                  value={logCalories}
                  onChange={(e) => setLogCalories(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-white"
                  placeholder="2200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Notes & Milestones</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-white placeholder-slate-500"
                  placeholder="e.g., Hit 120g protein, feeling great"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  type="button" 
                  onClick={() => setIsLoggingModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  type="submit" 
                  disabled={submitting}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {submitting ? 'SAVING...' : 'SAVE CHECK-IN'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
