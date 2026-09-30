import React from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Stethoscope,
  ShieldCheck,
  ShieldAlert,
  Users,
  Activity,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { MOCK_PLATFORM_ANALYTICS } from '../../data/doctorAdminMockData';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { doctors, patients, requests } = useApp();

  const totalDoctors = doctors.length + 105;
  const verifiedDoctors = doctors.filter((d) => d.status === 'verified').length + 94;
  const pendingVerifications = doctors.filter((d) => d.status === 'pending').length;
  const totalPatients = patients.length + 1675;
  const activeConsultations = requests.filter((r) => r.status === 'accepted' || r.status === 'pending').length + 42;
  const platformRevenue = 485000;

  return (
    <div className="space-y-8">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-purple-800/40">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Platform Governance Dashboard
            </h1>
            <Badge variant="purple" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              Admin Operations
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Real-time telemetry, doctor credentials verification, and platform growth metrics.
          </p>
        </div>

        {pendingVerifications > 0 && (
          <Link to="/admin/verifications">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
            >
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              {pendingVerifications} Doctor Verifications Pending
            </Button>
          </Link>
        )}
      </div>

      {/* 6 KPI Cards Required */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Doctors"
          value={totalDoctors}
          icon={<Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          trend={{ value: '+18%', isPositive: true, label: 'MoM' }}
        />
        <StatCard
          title="Verified Doctors"
          value={verifiedDoctors}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          trend={{ value: '94% rate', isPositive: true }}
        />
        <StatCard
          title="Pending Verifications"
          value={pendingVerifications}
          icon={<ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          subtitle="Action required"
        />
        <StatCard
          title="Total Patients"
          value={totalPatients.toLocaleString()}
          icon={<Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/60"
          trend={{ value: '+35%', isPositive: true, label: 'this quarter' }}
        />
        <StatCard
          title="Active Consultations"
          value={activeConsultations}
          icon={<Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          iconBgColor="bg-brand-50 dark:bg-brand-950/60"
        />
        <StatCard
          title="Platform Revenue (Net)"
          value={`₹${platformRevenue.toLocaleString()}`}
          icon={<IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          trend={{ value: '+24%', isPositive: true }}
        />
      </div>

      {/* 3 Charts Required: Doctors Growth, Patients Growth, Consultations Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Doctors Growth */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Doctors Onboarding Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_PLATFORM_ANALYTICS.doctorsGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="doctors" name="Total Onboarded" stroke="#8b5cf6" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="verified" name="Verified" stroke="#16a34a" strokeWidth={2} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Patients Growth */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Patients Acquisition Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PLATFORM_ANALYTICS.patientsGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="patients" name="Registered Patients" fill="#38bdf8" fillOpacity={0.2} stroke="#0284c7" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 3: Consultations Trend */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Weekly Consultations Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_PLATFORM_ANALYTICS.consultationsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Completed Sessions" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
