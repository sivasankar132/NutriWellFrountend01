import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CertificateDrawer } from '../../components/modals/CertificateDrawer';
import { Doctor } from '../../types/doctorAdminTypes';
import { ShieldCheck, Eye, CheckCircle, XCircle, AlertOctagon, ExternalLink } from 'lucide-react';

export const VerificationMgmtPage: React.FC = () => {
  const { doctors, updateDoctorStatus } = useApp();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setIsDrawerOpen(true);
  };

  const columns: Column<Doctor>[] = [
    {
      header: 'Doctor Name',
      accessorKey: 'name',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-brand-500 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
            <span className="text-xs text-slate-400">{item.specialization}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Qualification',
      accessorKey: 'qualification',
      cell: (item) => <span className="text-xs font-mono max-w-xs truncate block">{item.qualification}</span>,
    },
    {
      header: 'Experience',
      accessorKey: 'experienceYears',
      sortable: true,
      cell: (item) => <span className="font-semibold">{item.experienceYears} Yrs</span>,
    },
    {
      header: 'Certificate Preview',
      cell: (item) => (
        <button
          onClick={() => handleOpenDrawer(item)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
        >
          <img src={item.certificateUrl} alt="" className="w-5 h-4 object-cover rounded shrink-0" />
          View Certificate
        </button>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (item) => {
        const variants = {
          verified: 'success' as const,
          pending: 'warning' as const,
          rejected: 'danger' as const,
          suspended: 'danger' as const,
        };
        return (
          <Badge variant={variants[item.status]} dot>
            {item.status.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDrawer(item)}
            leftIcon={<Eye className="w-3.5 h-3.5" />}
          >
            Audit
          </Button>

          {item.status !== 'verified' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => updateDoctorStatus(item.id, 'verified')}
              leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
            >
              Approve
            </Button>
          )}

          {item.status !== 'rejected' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => updateDoctorStatus(item.id, 'rejected')}
              leftIcon={<XCircle className="w-3.5 h-3.5" />}
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Doctor Verification Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Inspect uploaded doctorate certificates, verify medical council credentials, approve or reject applications.
        </p>
      </div>

      <DataTable
        data={doctors}
        columns={columns}
        searchPlaceholder="Search doctor by name, qualification, or specialization..."
        searchKey="name"
        pageSize={6}
      />

      {/* Verification Detail Drawer Instance */}
      <CertificateDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};
