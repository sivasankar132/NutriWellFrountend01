import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { StarRating } from '../../components/ui/StarRating';
import { Doctor } from '../../types/doctorAdminTypes';
import { Stethoscope, Eye, AlertOctagon, Trash2, Edit, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorsMgmtPage: React.FC = () => {
  const { doctors, updateDoctorStatus } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Doctors', count: doctors.length },
    { id: 'verified', label: 'Verified', count: doctors.filter((d) => d.status === 'verified').length },
    { id: 'pending', label: 'Pending Verification', count: doctors.filter((d) => d.status === 'pending').length },
    { id: 'suspended', label: 'Suspended', count: doctors.filter((d) => d.status === 'suspended').length },
  ];

  const filteredDoctors = doctors.filter((d) => {
    if (activeTab === 'all') return true;
    return d.status === activeTab;
  });

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
            <span className="text-xs text-slate-400">{item.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      sortable: true,
      cell: (item) => <StarRating rating={item.rating} size="sm" showValue reviewCount={item.reviewCount} />,
    },
    {
      header: 'Verification Status',
      accessorKey: 'status',
      cell: (item) => {
        const variants = {
          verified: 'success' as const,
          pending: 'warning' as const,
          rejected: 'danger' as const,
          suspended: 'danger' as const,
        };
        return <Badge variant={variants[item.status]} dot>{item.status.toUpperCase()}</Badge>;
      },
    },
    {
      header: 'Online Status',
      accessorKey: 'isOnline',
      cell: (item) => (
        <Badge variant={item.isOnline ? 'success' : 'neutral'} dot>
          {item.isOnline ? 'ONLINE' : 'OFFLINE'}
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
            onClick={() => navigate(`/admin/doctors/${item.id}`)}
            leftIcon={<Eye className="w-3.5 h-3.5" />}
          >
            View Details
          </Button>

          {item.status === 'suspended' ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => updateDoctorStatus(item.id, 'verified')}
              leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
            >
              Re-activate
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => updateDoctorStatus(item.id, 'suspended')}
              leftIcon={<AlertOctagon className="w-3.5 h-3.5" />}
            >
              Disable
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
          Doctors Management Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Full administration roster of onboarded clinical dietitians and medical doctors.
        </p>
      </div>

      <DataTable
        data={filteredDoctors}
        columns={columns}
        filters={<Tabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />}
        searchPlaceholder="Search doctor by name or email..."
        searchKey="name"
        pageSize={6}
      />
    </div>
  );
};
