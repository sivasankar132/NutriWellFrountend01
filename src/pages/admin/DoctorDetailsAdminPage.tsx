import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StarRating } from '../../components/ui/StarRating';
import { StatCard } from '../../components/ui/StatCard';
import {
  Stethoscope,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertOctagon,
  Award,
  Calendar,
  ExternalLink,
  Users,
  IndianRupee,
  Star,
  ArrowLeft,
  Activity,
  FileText,
} from 'lucide-react';

export const DoctorDetailsAdminPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId?: string }>();
  const navigate = useNavigate();
  const { doctors, updateDoctorStatus } = useApp();

  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/doctors')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Doctors Directory
      </button>

      {/* Header Profile Summary */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {doctor.name}
              </h1>
              <Badge
                variant={doctor.status === 'verified' ? 'success' : doctor.status === 'pending' ? 'warning' : 'danger'}
                dot
              >
                {doctor.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1">
              {doctor.specialization}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-slate-400" />
                {doctor.experienceYears} Years Exp
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                Joined {doctor.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Action Buttons Required */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {doctor.status !== 'verified' && (
            <Button
              variant="success"
              size="md"
              onClick={() => updateDoctorStatus(doctor.id, 'verified')}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Verify Doctor
            </Button>
          )}

          {doctor.status !== 'rejected' && (
            <Button
              variant="danger"
              size="md"
              onClick={() => updateDoctorStatus(doctor.id, 'rejected')}
              leftIcon={<XCircle className="w-4 h-4" />}
            >
              Reject Verification
            </Button>
          )}

          {doctor.status !== 'suspended' && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => updateDoctorStatus(doctor.id, 'suspended')}
              leftIcon={<AlertOctagon className="w-4 h-4 text-amber-500" />}
            >
              Suspend Doctor
            </Button>
          )}
        </div>
      </div>

      {/* Consultation Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Sessions"
          value={doctor.totalConsultations}
          icon={<Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
        />
        <StatCard
          title="Patients Consulted"
          value={doctor.totalPatientsConsulted}
          icon={<Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/60"
        />
        <StatCard
          title="Gross Generated Revenue"
          value={`₹${doctor.totalEarnings.toLocaleString()}`}
          icon={<IndianRupee className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
        />
      </div>

      {/* Detailed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Doctorate Certificate View */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Uploaded Doctorate Certificate & Medical Licencing
              </CardTitle>
              <a
                href={doctor.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                External View <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Qualifications</span>
                <p className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {doctor.qualification}
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
                <img
                  src={doctor.certificateUrl}
                  alt="Doctorate Degree Certificate"
                  className="w-full h-64 object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Verification Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                Verification Audit Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Degree Certificate Re-validated</h4>
                  <p className="text-slate-500">Medical Council Database Hash Verification: Clean Match</p>
                  <span className="text-[10px] text-slate-400 block mt-1">01 Sep 2026 by Admin Compliance</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Account Creation & Document Upload</h4>
                  <span className="text-[10px] text-slate-400 block mt-1">{doctor.joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ratings & Patient Reviews */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                Ratings & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-amber-50/60 dark:bg-amber-950/40 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100 block">
                  {doctor.rating} / 5.0
                </span>
                <div className="flex justify-center mt-1">
                  <StarRating rating={doctor.rating} size="md" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                  {doctor.reviewCount} Verified Ratings
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
