import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PatientDetailModal } from '../../components/modals/PatientDetailModal';
import { Patient } from '../../types/doctorAdminTypes';
import { Users, Eye, AlertOctagon, Trash2 } from 'lucide-react';

export const PatientsMgmtPage: React.FC = () => {
  const { patients, removePatient, showToast } = useApp();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (pat: Patient) => {
    setSelectedPatient(pat);
    setIsDetailOpen(true);
  };

  const columns: Column<Patient>[] = [
    {
      header: 'Patient Name',
      accessorKey: 'name',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-brand-500 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
            <span className="text-xs text-slate-400">{item.age} yrs • {item.gender}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Email Address',
      accessorKey: 'email',
      cell: (item) => <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">{item.email}</span>,
    },
    {
      header: 'Join Date',
      accessorKey: 'joinDate',
      sortable: true,
      cell: (item) => <span className="text-xs font-medium">{item.joinDate}</span>,
    },
    {
      header: 'Active Consultations',
      accessorKey: 'activeConsultations',
      sortable: true,
      cell: (item) => (
        <Badge variant={item.activeConsultations > 0 ? 'info' : 'neutral'}>
          {item.activeConsultations} Active
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDetail(item)}
            leftIcon={<Eye className="w-3.5 h-3.5" />}
          >
            View EMR
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Patient Account Suspended', `Suspended access for ${item.name}`, 'warning')}
            leftIcon={<AlertOctagon className="w-3.5 h-3.5 text-amber-500" />}
          >
            Suspend
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => removePatient(item.id)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Patients Management Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Registered telehealth patients, health goal tracking, and medical record logs.
        </p>
      </div>

      <DataTable
        data={patients}
        columns={columns}
        searchPlaceholder="Search patient by name or email..."
        searchKey="name"
        pageSize={6}
      />

      {/* Patient Detail Modal Instance */}
      <PatientDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};
