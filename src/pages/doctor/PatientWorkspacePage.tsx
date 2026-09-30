import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { AISummaryModal } from '../../components/modals/AISummaryModal';
import {
  Sparkles,
  User,
  Activity,
  HeartPulse,
  Flame,
  Droplets,
  TrendingUp,
  Save,
  CheckCircle,
  FileText,
  Pill,
  AlertTriangle,
  Scale,
  Award,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const PatientWorkspacePage: React.FC = () => {
  const { patients, saveConsultationNotes, updateRequestStatus, showToast } = useApp();
  const navigate = useNavigate();

  // Selected Patient (Priya Sharma default)
  const patient = patients[0];

  // AI Modal toggle state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Doctor Notes State
  const [observations, setObservations] = useState(
    'Patient exhibits good dietary commitment (84% meal adherence). However, protein intake is sub-target (72g vs 85g requirement). Evening insulin resistance symptoms noted post-dinner.'
  );
  const [recommendations, setRecommendations] = useState(
    '1. Introduce 20g plant protein isolate post-workout.\n2. 15-minute brisk walk post dinner to manage glycemic spikes.\n3. Replace white rice with sprouted quinoa or millets.'
  );

  const handleSaveNotes = () => {
    saveConsultationNotes('req-101', observations, recommendations);
  };

  const handleSubmitRecommendation = () => {
    handleSaveNotes();
    updateRequestStatus('req-101', 'completed');
    showToast('Consultation Complete', 'Patient recommendations submitted successfully!', 'success');
    navigate('/doctor/review');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Prominent AI Button */}
      <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-teal-950 p-6 rounded-3xl border border-brand-800/40 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{patient.name}</h1>
              <Badge variant="purple" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                PCOS & Metabolic Care
              </Badge>
            </div>
            <p className="text-xs text-brand-200 mt-0.5">
              {patient.age} yrs • {patient.gender} • {patient.heightCm} cm • {patient.weightKg} kg (BMI {patient.bmi})
            </p>
          </div>
        </div>

        {/* PROMINENT AI BUTTON REQUIRED */}
        <Button
          onClick={() => setIsAIModalOpen(true)}
          className="bg-gradient-to-r from-brand-500 to-emerald-400 hover:from-brand-600 hover:to-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-brand-500/30 hover:scale-105 transition-all text-sm flex items-center gap-2 shrink-0 border border-white/20"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          Generate Patient Summary
        </Button>
      </div>

      {/* Main Split Layout: LEFT PANEL vs RIGHT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Patient Profile Summary & Health Metrics (8 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Bio & Vitals Card */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Patient Profile & Physical Vitals
              </CardTitle>
              <Badge variant="success">{patient.activityLevel}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Height</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{patient.heightCm} cm</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Weight</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{patient.weightKg} kg</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">BMI Gauge</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{patient.bmi}</span>
                    <span className="text-[10px] text-amber-500 font-bold">(Overweight)</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Target Goal</span>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block truncate mt-1">
                    {patient.targetGoal}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Medical History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500" />
                Medical History & Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 rounded-xl">
                  <span className="font-bold text-rose-900 dark:text-rose-300 block mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Diagnosed Diseases
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {patient.medicalHistory.diseases.map((d, i) => (
                      <Badge key={i} variant="danger" size="sm">{d}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1.5">Allergies & Sensitivities</span>
                  <div className="flex flex-wrap gap-1">
                    {patient.medicalHistory.allergies.map((a, i) => (
                      <Badge key={i} variant="warning" size="sm">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 rounded-xl text-xs">
                <span className="font-bold text-sky-900 dark:text-sky-300 block mb-1.5 flex items-center gap-1">
                  <Pill className="w-3.5 h-3.5 text-sky-500" /> Active Prescribed Medications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {patient.medicalHistory.medications.map((m, i) => (
                    <Badge key={i} variant="info" size="sm">{m}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Nutrition Summary */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                30-Day Nutrition Plan & Intake Averages
              </CardTitle>
              <Badge variant="success">{patient.nutritionSummary.mealAdherencePercent}% Adherence</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Plan: <span className="text-brand-600 dark:text-brand-400">{patient.nutritionSummary.planName}</span>
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Avg Daily Calories</span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {patient.nutritionSummary.avgDailyCalories} / {patient.nutritionSummary.targetDailyCalories} kcal
                  </span>
                  <ProgressBar value={patient.nutritionSummary.avgDailyCalories} max={patient.nutritionSummary.targetDailyCalories} size="sm" className="mt-2" />
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Protein Intake</span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {patient.nutritionSummary.proteinIntakeGrams} / {patient.nutritionSummary.targetProteinGrams} g
                  </span>
                  <ProgressBar value={patient.nutritionSummary.proteinIntakeGrams} max={patient.nutritionSummary.targetProteinGrams} colorScheme="amber" size="sm" className="mt-2" />
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Water Intake</span>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1 block">
                    {patient.nutritionSummary.waterIntakeLiters} / {patient.nutritionSummary.targetWaterLiters} L
                  </span>
                  <ProgressBar value={patient.nutritionSummary.waterIntakeLiters} max={patient.nutritionSummary.targetWaterLiters} colorScheme="sky" size="sm" className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Analytics Section (Charts Required) */}
          <div className="space-y-6">
            {/* Weight & BMI Trend Graph */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  Weight & BMI Progress Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.weightTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis domain={[60, 75]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="weight" name="Patient Weight (kg)" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} />
                      <Line type="monotone" dataKey="targetWeight" name="Target Goal (kg)" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Calorie Consumption Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  7-Day Calorie Consumption Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patient.calorieTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis domain={[1200, 2000]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calories" name="Consumed Calories (kcal)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="target" name="Daily Target (1,600 kcal)" fill="#22c55e" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT PANEL: Consultation Notes & Recommendation Submission (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <Card className="shadow-lg border-brand-200 dark:border-brand-900/60">
            <CardHeader className="bg-brand-50/50 dark:bg-brand-950/40">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                Doctor Consultation Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              {/* Doctor Observations */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Clinical Observations & Diagnostic Impression
                </label>
                <textarea
                  rows={4}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Record your patient observations..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed resize-none"
                />
              </div>

              {/* Patient Recommendations */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Dietary & Lifestyle Recommendations
                </label>
                <textarea
                  rows={5}
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Write meal adjustments, supplements, and exercise instructions..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleSaveNotes}
                  className="w-full"
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Draft Notes
                </Button>

                {/* BOTTOM SECTION: SUBMIT RECOMMENDATION BUTTON */}
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleSubmitRecommendation}
                  className="w-full font-bold shadow-lg py-3 text-base"
                  leftIcon={<CheckCircle className="w-5 h-5" />}
                >
                  Submit Recommendation & Finalize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Summary Modal Instance */}
      <AISummaryModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        patientName={patient.name}
      />
    </div>
  );
};
