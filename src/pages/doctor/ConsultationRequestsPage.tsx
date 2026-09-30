import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/EmptyState';
import { Search, CheckCircle, XCircle, Eye, Calendar, User, Video, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ConsultationRequestsPage: React.FC = () => {
  const { requests, updateRequestStatus } = useApp();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const counts = {
    all: requests.length,
    new: requests.filter((r) => r.status === 'new').length,
    pending: requests.filter((r) => r.status === 'pending').length,
    accepted: requests.filter((r) => r.status === 'accepted').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  };

  const filterTabs = [
    { id: 'all', label: 'All Requests', count: counts.all },
    { id: 'new', label: 'New', count: counts.new },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'accepted', label: 'Accepted', count: counts.accepted },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'all' || req.status === activeFilter;
    const matchesSearch =
      req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.primaryGoal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.consultationType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="purple" dot>New Request</Badge>;
      case 'pending':
        return <Badge variant="warning" dot>Pending Doctor Action</Badge>;
      case 'accepted':
        return <Badge variant="info" dot>Accepted / Scheduled</Badge>;
      case 'completed':
        return <Badge variant="success" dot>Completed</Badge>;
      case 'rejected':
        return <Badge variant="danger" dot>Declined</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Consultation Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage incoming telemedicine requests, review goals, accept or decline consultations.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <Tabs tabs={filterTabs} activeTab={activeFilter} onChange={setActiveFilter} />

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, goal, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />
        </div>
      </div>

      {/* Request Cards Grid */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No Consultation Requests Found"
          description="There are no patient requests matching your current filter criteria."
          actionLabel="Clear Search Filter"
          onAction={() => {
            setActiveFilter('all');
            setSearchTerm('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRequests.map((req) => (
            <Card key={req.id} hoverable className="flex flex-col justify-between">
              <CardContent className="p-5 space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.patientAvatar}
                      alt={req.patientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shrink-0"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {req.patientName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {req.age} yrs • {req.gender}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(req.status)}
                </div>

                {/* Primary Goal */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Primary Goal
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {req.primaryGoal}
                  </p>
                </div>

                {/* Consultation Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Video className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    <span className="truncate">{req.consultationType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{req.requestDate}</span>
                  </div>
                </div>
              </CardContent>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 rounded-b-xl flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/doctor/workspace')}
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                >
                  View Details
                </Button>

                <div className="flex items-center gap-2">
                  {(req.status === 'new' || req.status === 'pending') && (
                    <>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => updateRequestStatus(req.id, 'rejected')}
                        leftIcon={<XCircle className="w-3.5 h-3.5" />}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => updateRequestStatus(req.id, 'accepted')}
                        leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                      >
                        Accept
                      </Button>
                    </>
                  )}
                  {req.status === 'accepted' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/doctor/workspace')}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Open Workspace
                    </Button>
                  )}
                  {req.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/doctor/review')}
                    >
                      Review Patient
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
