import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StarRating } from '../../components/ui/StarRating';
import { Star, CheckCircle, User, Calendar, MessageSquare, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PatientReviewPage: React.FC = () => {
  const { patients, addPatientReview, showToast } = useApp();
  const navigate = useNavigate();

  const patient = patients[0];

  const [cooperationRating, setCooperationRating] = useState(5);
  const [dietAdherenceRating, setDietAdherenceRating] = useState(4);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [comments, setComments] = useState(
    'Patient is highly receptive to dietary feedback, maintains clear logging of daily water and protein, and follows instructions meticulously.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const overall = Math.round((cooperationRating + dietAdherenceRating + communicationRating) / 3);

    addPatientReview({
      patientId: patient.id,
      patientName: patient.name,
      patientAvatar: patient.avatar,
      consultationId: 'req-101',
      consultationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      cooperationRating,
      dietAdherenceRating,
      communicationRating,
      overallRating: overall,
      comments,
    });

    navigate('/doctor/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Post-Consultation Patient Review
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Rate patient engagement, dietary adherence, and communication quality.
        </p>
      </div>

      {/* Patient & Consultation Info Summary */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-brand-500 shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {patient.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {patient.age} yrs • {patient.gender} • Goal: {patient.targetGoal}
            </p>
            <span className="text-[11px] text-slate-400 block mt-1">
              Consultation ID: req-101 • Video Consultation
            </span>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs text-slate-400">Date</span>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Today</p>
        </div>
      </div>

      {/* Review Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            Patient Assessment Ratings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Fields */}
            <div className="space-y-4">
              {/* 1. Cooperation */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Cooperation & Engagement</h4>
                  <p className="text-xs text-slate-500">Patient punctuality and openness during consultation</p>
                </div>
                <StarRating
                  rating={cooperationRating}
                  interactive
                  onRatingChange={setCooperationRating}
                  size="lg"
                  showValue
                />
              </div>

              {/* 2. Diet Adherence */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">2. Diet Adherence & Meal Compliance</h4>
                  <p className="text-xs text-slate-500">How consistently patient follows prescribed macros & calories</p>
                </div>
                <StarRating
                  rating={dietAdherenceRating}
                  interactive
                  onRatingChange={setDietAdherenceRating}
                  size="lg"
                  showValue
                />
              </div>

              {/* 3. Communication */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Communication Quality</h4>
                  <p className="text-xs text-slate-500">Clarity of health reports and response time</p>
                </div>
                <StarRating
                  rating={communicationRating}
                  interactive
                  onRatingChange={setCommunicationRating}
                  size="lg"
                  showValue
                />
              </div>
            </div>

            {/* Comments Box */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Clinical Comments & Behavioural Feedback
              </label>
              <textarea
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add confidential notes or commendation for the patient..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 outline-none leading-relaxed resize-none"
                required
              />
            </div>

            {/* Submit Review Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold py-3 text-base shadow-lg"
                leftIcon={<CheckCircle className="w-5 h-5" />}
              >
                Submit Patient Review & Return to Dashboard
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
