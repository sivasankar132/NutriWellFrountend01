import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { MagicNavigation } from '../components/navigation/MagicNavigation';
import { QuickAction9Dot } from '../components/navigation/QuickAction9Dot';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { FoodScannerModal } from '../components/scanner/FoodScannerModal';
import { Toast } from '../components/common/Toast';
import { ReminderPopupModal } from '../components/common/ReminderPopupModal';
import { BudgetDetailsModal } from '../components/common/BudgetDetailsModal';
import { useApp } from '../context/AppContext';

export const DashboardLayout: React.FC = () => {
  const { toast } = useApp();

  return (
    <div className="min-h-screen bg-deep-forest text-slate-100 flex flex-col font-sans pb-24 md:pb-28">
      {/* Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        <Outlet />
      </main>

      {/* Magic Navigation (Desktop floating lower-middle) */}
      <MagicNavigation />

      {/* 9-Dot Quick Action AI Command Center */}
      <QuickAction9Dot />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* AI Food Scanner Modal */}
      <FoodScannerModal />

      {/* Exact-Time Dual-Tier Reminder Popup Modal */}
      <ReminderPopupModal />

      {/* Real-Time Food Budget Details Modal */}
      <BudgetDetailsModal />

      {/* Toast Feedback Notification */}
      <Toast message={toast} />
    </div>
  );
};
