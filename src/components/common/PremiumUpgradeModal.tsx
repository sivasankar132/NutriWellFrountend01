import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, Crown, Sparkles, Check, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({ isOpen, onClose }) => {
  const { tier, setTier, showToast } = useApp();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setTier('PREMIUM');
    onClose();
    showToast('Welcome to NutriWell Premium Intelligence! ✦');
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
          className="relative z-10 w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Unlock Deeper Health Intelligence</h2>
                  <Badge variant="gold">PREMIUM ✦</Badge>
                </div>
                <p className="text-xs text-slate-400">Long-term behavioral analytics, simulations & adaptive plans</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-emerald-900/40 hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
            <p className="text-sm text-slate-300 leading-relaxed">
              See your long-term patterns, run What-If scenarios, get adaptive plans and understand your progress in more detail.
            </p>

            {/* Free vs Premium comparison grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Free Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2.5">
                <div>
                  <Badge variant="mint">FREE TIER</Badge>
                  <h4 className="text-sm font-bold text-white mt-1">Good for getting started</h4>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Basic personalized diet</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Daily nutrition score</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Food logging & scanner</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Hydration tracker</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Basic mode experience</li>
                </ul>
              </div>

              {/* Premium Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-teal-950/80 border border-amber-500/40 space-y-2.5 shadow-lg">
                <div>
                  <Badge variant="gold">PREMIUM ✦</Badge>
                  <h4 className="text-sm font-bold text-amber-300 mt-1">Deeper personal intelligence</h4>
                </div>
                <ul className="space-y-1.5 text-slate-200">
                  <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Advanced Gap Analysis & Memory</li>
                  <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> What-If Impact Simulator</li>
                  <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Future You 30-Day Projections</li>
                  <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Digital Health Twin Model</li>
                  <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Adaptive Weekly Periodization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Not Now
            </Button>
            <Button
              variant="gold"
              size="sm"
              icon={<Crown className="w-3.5 h-3.5" />}
              onClick={handleUpgrade}
            >
              Upgrade to Premium
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
