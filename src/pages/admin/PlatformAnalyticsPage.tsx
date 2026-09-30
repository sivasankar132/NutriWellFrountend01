import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { StarRating } from '../../components/ui/StarRating';
import { MOCK_PLATFORM_ANALYTICS } from '../../data/doctorAdminMockData';
import {
  BarChart3,
  TrendingUp,
  Activity,
  IndianRupee,
  Users,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const PlatformAnalyticsPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('monthly');

  const filterTabs = [
    { id: 'daily', label: 'Daily View' },
    { id: 'weekly', label: 'Weekly View' },
    { id: 'monthly', label: 'Monthly View' },
  ];

  return (
    <div className="space-y-8">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Platform Analytics & Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Deep dive into telehealth volume, financial metrics, doctor performance, and completion rates.
          </p>
        </div>

        <Tabs tabs={filterTabs} activeTab={timeFilter} onChange={setTimeFilter} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Consultation Completion Rate"
          value={`${MOCK_PLATFORM_ANALYTICS.completionRate}%`}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          trend={{ value: '+2.4%', isPositive: true }}
        />
        <StatCard
          title="Total Monthly Revenue"
          value="₹4,85,000"
          icon={<IndianRupee className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          trend={{ value: '+24%', isPositive: true }}
        />
        <StatCard
          title="Total Session Volume"
          value="920"
          icon={<Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          trend={{ value: '+15%', isPositive: true }}
        />
        <StatCard
          title="New Patient Registrations"
          value="430"
          icon={<Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/60"
          trend={{ value: '+30%', isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Daily / Period Consultations Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Daily Telehealth Consultation Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_PLATFORM_ANALYTICS.dailyConsultations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Sessions Conducted" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 2. Revenue Analytics Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Gross Revenue Analytics (₹)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PLATFORM_ANALYTICS.consultationsTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" name="Revenue (₹)" fill="#c084fc" fillOpacity={0.2} stroke="#9333ea" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctor Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Top Doctor Clinical Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_PLATFORM_ANALYTICS.doctorPerformance.map((doc, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-xs flex items-center justify-center text-slate-700 dark:text-slate-300">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{doc.doctorName}</h4>
                    <span className="text-xs text-slate-400">{doc.consultations} Sessions Completed</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right text-xs">
                  <div>
                    <StarRating rating={doc.rating} size="sm" showValue />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Revenue Generated</span>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{doc.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
