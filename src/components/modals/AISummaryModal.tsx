import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MOCK_AI_SUMMARY } from '../../data/doctorAdminMockData';
import { Sparkles, Activity, AlertTriangle, CheckCircle2, Copy, Download } from 'lucide-react';
import { useApp } from '../../context/DoctorAdminContext';

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({
  isOpen,
  onClose,
  patientName,
}) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `AI HEALTH SUMMARY - ${patientName.toUpperCase()}\n\n` +
      `Overview: ${MOCK_AI_SUMMARY.healthOverview}\n\n` +
      `Medical History: ${MOCK_AI_SUMMARY.medicalHistorySummary}\n\n` +
      `Nutrition Compliance: ${MOCK_AI_SUMMARY.nutritionComplianceSummary}\n\n` +
      `Risk Factors:\n- ${MOCK_AI_SUMMARY.keyRiskFactors.join('\n- ')}\n\n` +
      `Discussion Points:\n- ${MOCK_AI_SUMMARY.suggestedDiscussionPoints.join('\n- ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Copied to Clipboard', 'AI Summary copied for your records.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-brand-500 to-emerald-400 text-white rounded-xl shadow-xs">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span>AI Health & Nutrition Clinical Summary</span>
        </div>
      }
      subtitle={`Generated deep intelligence report for ${patientName}`}
      footer={
        <div className="flex items-center justify-between w-full">
          <Badge variant="purple" className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            NutriAI Clinical v2.4 (Grounded in EMR & Lab Data)
          </Badge>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} leftIcon={<Copy className="w-4 h-4" />}>
              {copied ? 'Copied!' : 'Copy Summary'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                showToast('Downloaded PDF', 'AI Summary exported as clinical PDF.', 'success');
                onClose();
              }}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export PDF Report
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Section 1: Health Overview */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Health Overview</h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {MOCK_AI_SUMMARY.healthOverview}
          </p>
        </div>

        {/* Section 2 & 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              2. Medical History Summary
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {MOCK_AI_SUMMARY.medicalHistorySummary}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              3. Nutrition Compliance Summary
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {MOCK_AI_SUMMARY.nutritionComplianceSummary}
            </p>
          </div>
        </div>

        {/* Section 4: Key Risk Factors */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            4. Key Risk Factors & Warnings
          </h4>
          <div className="space-y-2">
            {MOCK_AI_SUMMARY.keyRiskFactors.map((risk, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 rounded-lg flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Suggested Discussion Points */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            5. Suggested Consultation Discussion Points
          </h4>
          <div className="space-y-2">
            {MOCK_AI_SUMMARY.suggestedDiscussionPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3 bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50 rounded-lg flex items-start gap-2 text-xs text-brand-950 dark:text-brand-200"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
