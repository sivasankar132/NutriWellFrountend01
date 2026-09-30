import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Patient } from '../../types/doctorAdminTypes';
import { User, Activity, Flame, Droplets, HeartPulse, Pill, AlertTriangle } from 'lucide-react';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  if (!patient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={
        <div className="flex items-center gap-3">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-10 h-10 rounded-full object-cover border border-brand-500"
          />
          <div>
            <span>{patient.name}</span>
            <span className="text-xs text-slate-500 font-normal ml-2">
              (ID: {patient.id})
            </span>
          </div>
        </div>
      }
      subtitle={`Comprehensive Patient EMR & Nutrition Overview`}
    >
      <div className="space-y-6">
        {/* Vitals Summary Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">Age & Gender</span>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {patient.age} yrs • {patient.gender}
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">Height & Weight</span>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {patient.heightCm}cm • {patient.weightKg}kg
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">BMI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                {patient.bmi}
              </p>
              <Badge variant={patient.bmi > 25 ? 'warning' : 'success'} size="sm">
                {patient.bmi > 25 ? 'Overweight' : 'Normal'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">Activity Level</span>
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">
              {patient.activityLevel}
            </p>
          </div>
        </div>

        {/* Primary Goal */}
        <div className="p-4 bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 rounded-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300">
            Primary Target Goal
          </h4>
          <p className="text-sm font-semibold text-brand-950 dark:text-brand-100 mt-1">
            {patient.targetGoal}
          </p>
        </div>

        {/* Medical History */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            Medical History & Diagnosis
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Diseases & Conditions</span>
              <div className="flex flex-wrap gap-1">
                {patient.medicalHistory.diseases.map((d, i) => (
                  <Badge key={i} variant="danger" size="sm">{d}</Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Known Allergies</span>
              <div className="flex flex-wrap gap-1">
                {patient.medicalHistory.allergies.map((a, i) => (
                  <Badge key={i} variant="warning" size="sm">{a}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1">
              <Pill className="w-3.5 h-3.5 text-sky-500" /> Active Medications
            </span>
            <div className="flex flex-wrap gap-1.5">
              {patient.medicalHistory.medications.map((m, i) => (
                <Badge key={i} variant="info" size="sm">{m}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition History */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            Active Nutrition Plan & Daily Averages
          </h4>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {patient.nutritionSummary.planName}
              </span>
              <Badge variant="success">{patient.nutritionSummary.mealAdherencePercent}% Adherence</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Avg Calories</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {patient.nutritionSummary.avgDailyCalories} / {patient.nutritionSummary.targetDailyCalories} kcal
                </span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Protein Intake</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {patient.nutritionSummary.proteinIntakeGrams} / {patient.nutritionSummary.targetProteinGrams} g
                </span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Water Intake</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {patient.nutritionSummary.waterIntakeLiters} / {patient.nutritionSummary.targetWaterLiters} L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
