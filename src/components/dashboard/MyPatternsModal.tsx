import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, Brain, Sparkles, TrendingUp, CheckCircle, 
  AlertCircle, ArrowRight, Zap, Droplets, Flame, DollarSign
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface MyPatternsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyPatternsModal: React.FC<MyPatternsModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [appliedAdjustments, setAppliedAdjustments] = useState<string[]>([]);

  if (!isOpen) return null;

  const patterns = [
    {
      id: 'pat-1',
      title: 'Weekday Mid-Day Protein Dip',
      category: 'Protein Timing',
      confidence: 94,
      icon: Flame,
      color: 'text-amber-400',
      observation: 'On heavy work/study days (Tue & Thu), protein intake drops to 65g vs your 120g target.',
      rootCause: 'Skipping the 4:00 PM mid-day snack and having a carb-heavy dinner on the go.',
      impact: 'Reduces overnight muscle protein synthesis and causes late-evening sweet cravings.',
      actionableStep: 'Anchor a quick 20g snack: Sprouted Moong Bowl or Sattu Shake at 4:30 PM.',
    },
    {
      id: 'pat-2',
      title: 'Post-4 PM Hydration Plateau',
      category: 'Hydration',
      confidence: 89,
      icon: Droplets,
      color: 'text-cyan-400',
      observation: '78% of your water intake occurs before 3:00 PM, followed by zero logs until next morning.',
      rootCause: 'Commuting or moving between locations without a portable water bottle.',
      impact: 'Mild evening dehydration causing fatigue and impaired recovery.',
      actionableStep: 'Set a 5:00 PM water anchor (+500ml) right before leaving campus/office.',
    },
    {
      id: 'pat-3',
      title: 'High Protein-per-Rupee Cost Efficiency',
      category: 'Expenditure',
      confidence: 96,
      icon: DollarSign,
      color: 'text-mint-accent',
      observation: 'When meals include local pulses, paneer, and eggs, food cost drops to ₹58 per 30g protein.',
      rootCause: 'Choosing whole-food protein sources over packaged snacks and fast-food takeout.',
      impact: 'Saves an estimated ₹1,850/month while hitting macro targets comfortably.',
      actionableStep: 'Continue prioritizing local kitchen staples in your weekly grocery baseline.',
    },
  ];

  const handleApplyAdjustment = (id: string, title: string) => {
    if (!appliedAdjustments.includes(id)) {
      setAppliedAdjustments([...appliedAdjustments, id]);
      showToast(`Applied micro-adjustment for: "${title}"! 🔥`);
    }
  };

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
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">AI Behavioral Pattern Detector</h2>
                  <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>3 Patterns Found</Badge>
                </div>
                <p className="text-xs text-slate-400">Recurring habits, root-cause diagnostics, and micro-adjustments</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {patterns.map((pat) => {
              const Icon = pat.icon;
              const isApplied = appliedAdjustments.includes(pat.id);

              return (
                <div
                  key={pat.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-3.5 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl bg-slate-900 border border-emerald-900/40 ${pat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{pat.title}</h4>
                        <span className="text-[10px] text-slate-400 uppercase">{pat.category}</span>
                      </div>
                    </div>
                    <Badge variant="teal">{pat.confidence}% Accuracy</Badge>
                  </div>

                  {/* 3-Part Diagnostic */}
                  <div className="space-y-2 text-xs bg-slate-900/60 p-3.5 rounded-xl border border-emerald-900/30">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Observation</span>
                      <p className="text-slate-200 mt-0.5">{pat.observation}</p>
                    </div>

                    <div className="pt-1 border-t border-emerald-900/20">
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">Root Cause</span>
                      <p className="text-slate-300 mt-0.5">{pat.rootCause}</p>
                    </div>

                    <div className="pt-1 border-t border-emerald-900/20">
                      <span className="text-[10px] uppercase font-bold text-mint-accent block">Recommended Action</span>
                      <p className="text-emerald-300 font-medium mt-0.5">{pat.actionableStep}</p>
                    </div>
                  </div>

                  {/* 1-Click Action Button */}
                  <div className="flex justify-end pt-1">
                    <Button
                      variant={isApplied ? 'outline' : 'primary'}
                      size="sm"
                      icon={isApplied ? <CheckCircle className="w-3.5 h-3.5 text-mint-accent" /> : <Zap className="w-3.5 h-3.5" />}
                      onClick={() => handleApplyAdjustment(pat.id, pat.title)}
                    >
                      {isApplied ? 'Adjustment Active in Plan' : 'Apply Micro-Adjustment'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
