import React from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  Users,
  IndianRupee,
  Wallet,
  Star,
  Activity,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DoctorDashboardPage: React.FC = () => {
  const { doctor, toggleDoctorOnline, requests, reviews, adminSettings, payPlatformDues } = useApp();

  const pendingRequestsList = requests.filter((r) => r.status === 'new' || r.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Top Welcome & Online Availability Header */}
      <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-brand-400 shadow-lg shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {doctor.name}
                </h1>
                <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Verified Doctor
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-brand-200 mt-1">
                {doctor.specialization} • {doctor.qualification}
              </p>
            </div>
          </div>

          {/* Status Switcher Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 w-full md:w-auto">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-200 block">
                Current Status Indicator
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    doctor.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span className="text-sm font-bold">
                  {doctor.isOnline ? 'Available for Instant Telehealth' : 'Offline / Off-Duty'}
                </span>
              </div>
            </div>
            <button
              onClick={toggleDoctorOnline}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-md ${
                doctor.isOnline
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {doctor.isOnline ? 'Set Offline' : 'Go Online'}
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard KPI Grid (7 Cards Required) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Consultation Requests"
          value={doctor.pendingRequestsCount + doctor.acceptedRequestsCount + 30}
          icon={<ClipboardList className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          trend={{ value: '+14%', isPositive: true, label: 'vs last month' }}
        />
        <StatCard
          title="Pending Requests"
          value={doctor.pendingRequestsCount}
          icon={<Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          subtitle="Action required"
        />
        <StatCard
          title="Accepted Consultations"
          value={doctor.acceptedRequestsCount}
          icon={<CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          trend={{ value: '+8%', isPositive: true }}
        />
        <StatCard
          title="Total Patients Consulted"
          value={doctor.totalPatientsConsulted}
          icon={<Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/60"
        />
        <StatCard
          title="Monthly Earnings (Direct)"
          value={`₹${doctor.monthlyEarnings.toLocaleString()}`}
          icon={<IndianRupee className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          trend={{ value: '+22%', isPositive: true }}
          subtitle="Fees collected in your hand"
        />

        {/* Platform Commission Dues Card (Doctor owes Platform up to ₹1000 Cap) */}
        <Card hoverable className="sm:col-span-2 border-amber-200/80 dark:border-amber-900/60">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Platform Dues Owed (Cap: ₹{adminSettings.walletCapLimit})
                  </p>
                  <Badge variant={doctor.walletBalance >= 1000 ? 'danger' : 'warning'} size="sm">
                    {doctor.walletBalance >= 1000 ? 'Limit Reached' : 'Payable Dues'}
                  </Badge>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                  ₹{doctor.walletBalance.toLocaleString()}{' '}
                  <span className="text-xs text-slate-400 font-normal">/ ₹{adminSettings.walletCapLimit} Limit</span>
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <ProgressBar
              value={doctor.walletBalance}
              max={adminSettings.walletCapLimit}
              showPercent
              colorScheme={doctor.walletBalance >= 1000 ? 'rose' : 'amber'}
              label={
                doctor.walletBalance >= 1000
                  ? 'Limit reached! Please pay outstanding platform dues to continue accepting requests.'
                  : `₹${adminSettings.walletCapLimit - doctor.walletBalance} buffer remaining before ₹1000 platform dues cap.`
              }
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">Consultation fee is in your hand</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={payPlatformDues}
                  disabled={doctor.walletBalance === 0}
                  leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                >
                  Pay Platform Dues (₹{doctor.walletBalance})
                </Button>
                <Link to="/doctor/earnings">
                  <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Rating Card */}
        <StatCard
          title="Average Rating"
          value={doctor.rating}
          badge={<StarRating rating={doctor.rating} size="sm" />}
          icon={<Star className="w-5 h-5 text-amber-500 fill-amber-400" />}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          subtitle={`Based on ${doctor.reviewCount} verified reviews`}
        />
      </div>

      {/* Recent Activity Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Patient Consultation Requests Panel */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>New Patient Requests</CardTitle>
            <Link to="/doctor/requests">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({requests.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {pendingRequestsList.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No pending requests right now.</div>
            ) : (
              pendingRequestsList.slice(0, 3).map((req) => (
                <div key={req.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={req.patientAvatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0 border border-brand-500" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{req.patientName}</h4>
                        <Badge variant="info" size="sm">{req.consultationType}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        Goal: <span className="text-slate-700 dark:text-slate-300 font-medium">{req.primaryGoal}</span>
                      </p>
                      <span className="text-[11px] text-slate-400">{req.age} yrs • {req.gender} • Fee: ₹500 (In your hand)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link to="/doctor/workspace">
                      <Button variant="primary" size="sm">
                        Review Workspace
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Patient Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Reviews</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={rev.patientAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.patientName}</span>
                  </div>
                  <StarRating rating={rev.overallRating} size="sm" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                  "{rev.comments}"
                </p>
                <span className="text-[10px] text-slate-400 block text-right">{rev.submittedAt}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
