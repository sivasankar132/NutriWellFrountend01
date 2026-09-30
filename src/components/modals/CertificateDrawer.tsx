import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Doctor } from '../../types/doctorAdminTypes';
import { CheckCircle, XCircle, AlertOctagon, Award, Calendar, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/DoctorAdminContext';

interface CertificateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export const CertificateDrawer: React.FC<CertificateDrawerProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const { updateDoctorStatus } = useApp();

  if (!doctor) return null;

  const statusBadges = {
    verified: <Badge variant="success" dot>Verified Doctor</Badge>,
    pending: <Badge variant="warning" dot>Verification Pending</Badge>,
    rejected: <Badge variant="danger" dot>Verification Rejected</Badge>,
    suspended: <Badge variant="danger" dot>Account Suspended</Badge>,
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Doctor Verification & Credentials Review"
      subtitle={`Medical License Audit for ${doctor.name}`}
      width="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-slate-500">ID: {doctor.id}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateDoctorStatus(doctor.id, 'suspended');
                onClose();
              }}
              leftIcon={<AlertOctagon className="w-4 h-4 text-amber-500" />}
            >
              Suspend Doctor
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                updateDoctorStatus(doctor.id, 'rejected');
                onClose();
              }}
              leftIcon={<XCircle className="w-4 h-4" />}
            >
              Reject Verification
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                updateDoctorStatus(doctor.id, 'verified');
                onClose();
              }}
              leftIcon={<CheckCircle className="w-4 h-4" />}
            >
              Approve Credentials
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Doctor Summary Header Card */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-xs"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                {doctor.name}
              </h3>
              {statusBadges[doctor.status]}
            </div>
            <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mt-0.5">
              {doctor.specialization}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                {doctor.experienceYears} Years Exp
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Joined {doctor.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Qualifications */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            Qualification & Medical Licencing
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg">
            {doctor.qualification}
          </p>
        </div>

        {/* Doctorate Certificate Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              Uploaded Doctorate / Medical Certificate
            </h4>
            <a
              href={doctor.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Full Screen <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="relative group rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md bg-slate-950">
            <img
              src={doctor.certificateUrl}
              alt="Medical Degree Certificate Preview"
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-white text-xs space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Medical Council Registration Verified
                </p>
                <p className="opacity-80">Document Hash: 0x8F9A...C41E (Verified via MCI API)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Timeline */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
            Verification Audit Timeline
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Identity & Government ID Re-validated</p>
                <p className="text-slate-500">01 Sep 2026 by Admin Compliance</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Doctorate Degree Certificate Uploaded</p>
                <p className="text-slate-500">{doctor.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
