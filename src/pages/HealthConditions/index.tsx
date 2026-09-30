import React, { useState } from 'react';
import { mockHealthConditions } from '../../data/mockConditions';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { HealthCondition } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  HeartPulse, CheckCircle2, XCircle, ArrowRight, Shield, 
  Plus, Sparkles, AlertCircle, Info, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HealthConditionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { customConditions, addCustomCondition, t, showToast } = useApp();
  
  // Combined list of mock and user custom conditions
  const allConditions = [...customConditions, ...mockHealthConditions];
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition>(allConditions[0]);
  const [newConditionInput, setNewConditionInput] = useState('');

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConditionInput.trim()) return;

    const added = addCustomCondition(newConditionInput.trim());
    setSelectedCondition(added);
    setNewConditionInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="mint" icon={<HeartPulse className="w-3.5 h-3.5" />}>Clinical Nutrition Knowledge Base</Badge>
          <h1 className="text-2xl font-bold text-white mt-1">{t('healthConditions')} & Dietary Guidance</h1>
          <p className="text-xs text-slate-400">
            Evidence-based dietary protocols, recommended whole-food swaps, and personalized guidance.
          </p>
        </div>
      </div>

      {/* MY CONDITIONS SECTION (if user added custom concerns) */}
      {customConditions.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-mint-accent" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('myConditions')}</h3>
            <Badge variant="mint">{customConditions.length} Added in Session</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {customConditions.map((cond) => (
              <button
                key={cond.id}
                onClick={() => setSelectedCondition(cond)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCondition.id === cond.id
                    ? 'bg-emerald-600 text-white emerald-glow-sm border border-emerald-400'
                    : 'bg-slate-950 border border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                <Sparkles className="w-3 h-3 text-mint-accent" />
                <span>{cond.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Condition Selector & Guidance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Condition Cards & Add Custom Condition */}
        <div className="lg:col-span-4 space-y-4">
          {/* Add My Condition Input Box */}
          <Card className="p-4 bg-slate-950 border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-mint-accent" />
                {t('addMyCondition')}
              </span>
              <span className="text-[10px] text-slate-400">Personal Health Concern</span>
            </div>

            <form onSubmit={handleAddCondition} className="space-y-2">
              <input
                type="text"
                placeholder={t('enterConditionPlaceholder')}
                value={newConditionInput}
                onChange={(e) => setNewConditionInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-emerald-900/40 text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-colors"
              />
              <Button type="submit" variant="primary" size="sm" className="w-full" icon={<Plus className="w-3.5 h-3.5" />}>
                Add Condition to Profile
              </Button>
            </form>
          </Card>

          {/* Condition List */}
          <div className="space-y-2.5">
            {allConditions.map((cond) => (
              <Card
                key={cond.id}
                onClick={() => setSelectedCondition(cond)}
                className={`p-3.5 transition-all cursor-pointer ${
                  selectedCondition.id === cond.id
                    ? 'border-emerald-400/60 bg-emerald-950/70 emerald-glow-sm'
                    : 'hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={cond.isUserAdded ? "gold" : "emerald"}>{cond.category}</Badge>
                  {cond.isUserAdded && <span className="text-[10px] text-amber-300 font-semibold">User Added</span>}
                </div>
                <h3 className="text-sm font-bold text-white mt-1.5">{cond.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{cond.shortDescription}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Guidance Panel */}
        <Card glow className="lg:col-span-8 space-y-6 p-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={selectedCondition.isUserAdded ? "gold" : "mint"}>{selectedCondition.category}</Badge>
              {selectedCondition.isUserAdded && (
                <span className="text-xs text-emerald-400 font-medium">Personal Profile Match</span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1.5">{selectedCondition.title}</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedCondition.fullGuidance}</p>
          </div>

          {/* Recommended vs Avoid Foods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-emerald-900/40">
            {/* Recommended Foods */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Recommended Foods & Staples
              </h4>
              <ul className="text-xs text-slate-200 space-y-1.5">
                {selectedCondition.recommendedFoods.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid Foods */}
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 space-y-2">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-400" />
                Foods & Additives to Limit
              </h4>
              <ul className="text-xs text-slate-200 space-y-1.5">
                {selectedCondition.avoidFoods.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lifestyle Guidelines */}
          {selectedCondition.lifestyleTips && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
              <span className="text-xs font-bold text-mint-accent uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Supportive Lifestyle & Timing Guidelines
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedCondition.lifestyleTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Educational Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-start gap-2.5 text-xs text-slate-300">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t('conditionSafetyNote')}
            </p>
          </div>

          {/* Consultation CTA */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">Consult a Verified Specialist for {selectedCondition.title}</p>
              <p className="text-[11px] text-slate-400">Specialist Focus: {selectedCondition.doctorSpecialtyToConsult}</p>
            </div>
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('/doctors')}>
              {t('consultDoctor')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
