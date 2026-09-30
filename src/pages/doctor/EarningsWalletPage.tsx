import React from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable, Column } from '../../components/ui/DataTable';
import { WalletTransaction } from '../../types/doctorAdminTypes';
import { Wallet, IndianRupee, ArrowUpRight, Clock, CheckCircle2, AlertTriangle, CreditCard, Download, ShieldAlert } from 'lucide-react';

export const EarningsWalletPage: React.FC = () => {
  const { doctor, transactions, payPlatformDues, adminSettings } = useApp();

  const walletCap = adminSettings.walletCapLimit; // ₹1000 Cap
  const isCapReached = doctor.walletBalance >= walletCap;

  const transactionColumns: Column<WalletTransaction>[] = [
    {
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
      cell: (item) => <span className="font-medium text-slate-900 dark:text-slate-100">{item.date}</span>,
    },
    {
      header: 'Patient',
      accessorKey: 'patientName',
      sortable: true,
      cell: (item) => <span className="font-bold text-slate-900 dark:text-slate-100">{item.patientName}</span>,
    },
    {
      header: 'Fee Collected by Doctor',
      cell: (item) => (
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
          +₹{item.consultationFee} (In Hand)
        </span>
      ),
    },
    {
      header: 'Platform Commission (10%)',
      cell: (item) => <span className="text-amber-600 dark:text-amber-400 font-bold">₹{item.platformFee} (Owed)</span>,
    },
    {
      header: 'Dues Status',
      accessorKey: 'status',
      cell: (item) => (
        <Badge variant={item.status === 'settled' ? 'success' : 'warning'} dot>
          {item.status === 'settled' ? 'SETTLED' : 'UNPAID DUES'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Doctor Earnings & Platform Dues Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Consultation fees are collected directly by you. Track accumulated 10% platform commission dues owed to NutriWell.
          </p>
        </div>
      </div>

      {/* 4 Dashboard Cards Required */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Platform Dues Owed Card */}
        <Card hoverable className="border-amber-300/80 dark:border-amber-900/60 shadow-md">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Unpaid Platform Dues
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">
              ₹{doctor.walletBalance}
            </h3>
            <p className="text-xs text-slate-400">Cap Limit: ₹{walletCap}</p>
          </CardContent>
        </Card>

        <StatCard
          title="Direct Fees Collected"
          value={`₹${doctor.totalEarnings.toLocaleString()}`}
          icon={<IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          trend={{ value: '+18%', isPositive: true, label: 'lifetime' }}
          subtitle="In your bank / cash"
        />

        <StatCard
          title="This Month Revenue"
          value={`₹${doctor.monthlyEarnings.toLocaleString()}`}
          icon={<ArrowUpRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          trend={{ value: '+12%', isPositive: true, label: 'vs last mo' }}
        />

        <StatCard
          title="Settled Commission Paid"
          value="₹3,400"
          icon={<CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
          iconBgColor="bg-brand-50 dark:bg-brand-950/60"
          subtitle="Past settlements"
        />
      </div>

      {/* WALLET RULES & PROGRESS BAR SECTION (₹1000 Cap) */}
      <Card className="border-amber-300 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/40 via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Platform Commission Dues Policy (Cap Limit: ₹{walletCap})
                </h3>
                {isCapReached ? (
                  <Badge variant="danger" dot>Settlement Required Now</Badge>
                ) : (
                  <Badge variant="warning">Payable Dues</Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                You collect 100% of consultation fees directly from patients. NutriWell charges a 10% platform commission. Unpaid dues accumulate in your wallet. When dues reach the <strong>₹{walletCap} limit</strong>, you must pay the platform to maintain active consultation status.
              </p>
            </div>

            <Button
              variant={isCapReached ? 'danger' : 'primary'}
              size="lg"
              disabled={doctor.walletBalance === 0}
              onClick={payPlatformDues}
              className="shrink-0 font-bold px-6 shadow-md"
              leftIcon={<CreditCard className="w-5 h-5" />}
            >
              Pay Platform Dues (₹{doctor.walletBalance})
            </Button>
          </div>

          <div className="pt-2">
            <ProgressBar
              value={doctor.walletBalance}
              max={walletCap}
              showPercent
              showValues
              unit="₹"
              size="lg"
              colorScheme={isCapReached ? 'rose' : 'amber'}
              label="Accumulated Unpaid Platform Dues Progress Bar"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Patient Consultations & Commission Breakdown
          </h2>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export Dues Report (CSV)
          </Button>
        </div>

        <DataTable
          data={transactions}
          columns={transactionColumns}
          searchPlaceholder="Search patient or fee..."
          searchKey="patientName"
          pageSize={5}
        />
      </div>
    </div>
  );
};
