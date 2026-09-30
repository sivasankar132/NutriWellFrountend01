import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Doctor,
  Patient,
  ConsultationRequest,
  PatientReview,
  WalletTransaction,
  AdminSettingsState,
  DoctorStatus,
  RequestStatus,
} from '../types/doctorAdminTypes';
import {
  CURRENT_DOCTOR,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  MOCK_REQUESTS,
  MOCK_REVIEWS,
  MOCK_TRANSACTIONS,
  DEFAULT_ADMIN_SETTINGS,
} from '../data/doctorAdminMockData';

interface ToastInfo {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  doctor: Doctor;
  toggleDoctorOnline: () => void;
  updateDoctorProfile: (updates: Partial<Doctor>) => void;
  doctors: Doctor[];
  updateDoctorStatus: (doctorId: string, newStatus: DoctorStatus) => void;
  patients: Patient[];
  removePatient: (patientId: string) => void;
  requests: ConsultationRequest[];
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  saveConsultationNotes: (requestId: string, notes: string, recommendations: string) => void;
  reviews: PatientReview[];
  addPatientReview: (review: Omit<PatientReview, 'id' | 'submittedAt'>) => void;
  transactions: WalletTransaction[];
  payPlatformDues: () => void;
  adminSettings: AdminSettingsState;
  updateAdminSettings: (newSettings: Partial<AdminSettingsState>) => void;
  toasts: ToastInfo[];
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('doctor');
  
  // Dark mode setup
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('nutriwell_theme') === 'dark' ||
      (!('nutriwell_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nutriwell_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nutriwell_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Toast System
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State entities
  const [doctor, setDoctor] = useState<Doctor>(CURRENT_DOCTOR);
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [requests, setRequests] = useState<ConsultationRequest[]>(MOCK_REQUESTS);
  const [reviews, setReviews] = useState<PatientReview[]>(MOCK_REVIEWS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_TRANSACTIONS);
  const [adminSettings, setAdminSettings] = useState<AdminSettingsState>(DEFAULT_ADMIN_SETTINGS);

  const toggleDoctorOnline = () => {
    setDoctor((prev) => {
      const nextOnline = !prev.isOnline;
      showToast(
        nextOnline ? 'Status: Online' : 'Status: Offline',
        nextOnline ? 'You are now visible to patients for instant consultations.' : 'You will not receive new instant requests.',
        nextOnline ? 'success' : 'info'
      );
      return { ...prev, isOnline: nextOnline };
    });
  };

  const updateDoctorProfile = (updates: Partial<Doctor>) => {
    setDoctor((prev) => ({ ...prev, ...updates }));
    setDoctors((prev) => prev.map((d) => (d.id === doctor.id ? { ...d, ...updates } : d)));
    showToast('Profile Updated', 'Your doctor details have been saved successfully.', 'success');
  };

  const updateDoctorStatus = (doctorId: string, newStatus: DoctorStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, status: newStatus } : d))
    );
    if (doctorId === doctor.id) {
      setDoctor((prev) => ({ ...prev, status: newStatus }));
    }
    showToast('Status Updated', `Doctor status changed to ${newStatus.toUpperCase()}`, 'info');
  };

  const removePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    showToast('Patient Removed', 'Patient record has been archived.', 'warning');
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status } : req))
    );

    if (status === 'accepted') {
      setDoctor((prev) => ({
        ...prev,
        pendingRequestsCount: Math.max(0, prev.pendingRequestsCount - 1),
        acceptedRequestsCount: prev.acceptedRequestsCount + 1,
      }));
      showToast('Request Accepted', 'The patient has been notified for consultation.', 'success');
    } else if (status === 'rejected') {
      setDoctor((prev) => ({
        ...prev,
        pendingRequestsCount: Math.max(0, prev.pendingRequestsCount - 1),
      }));
      showToast('Request Rejected', 'The consultation request was declined.', 'info');
    } else if (status === 'completed') {
      // Patient pays doctor directly (e.g. ₹500). Platform commission (10% = ₹50) is added to Doctor's dues payable to platform.
      const platformCommission = 50;
      setDoctor((prev) => {
        const newDues = Math.min(adminSettings.walletCapLimit, prev.walletBalance + platformCommission);
        return {
          ...prev,
          walletBalance: newDues, // Accumulated dues owed to platform
          totalConsultations: prev.totalConsultations + 1,
          monthlyEarnings: prev.monthlyEarnings + 500,
          totalEarnings: prev.totalEarnings + 500,
        };
      });

      const newTx: WalletTransaction = {
        id: `tx-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        patientName: requests.find((r) => r.id === requestId)?.patientName || 'Patient',
        consultationFee: 500, // Collected directly by Doctor
        platformFee: 50, // Owed to Platform
        amountReceived: 500,
        status: 'unsettled',
      };
      setTransactions((prev) => [newTx, ...prev]);

      showToast('Consultation Complete', 'Consultation fee (₹500) collected by doctor. ₹50 platform commission added to payable dues.', 'success');
    }
  };

  const saveConsultationNotes = (requestId: string, notes: string, recommendations: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, notes, recommendations } : req
      )
    );
    showToast('Notes Saved', 'Consultation notes updated successfully.', 'success');
  };

  const addPatientReview = (reviewData: Omit<PatientReview, 'id' | 'submittedAt'>) => {
    const newRev: PatientReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Submitted', 'Patient rating & feedback recorded.', 'success');
  };

  // Doctor pays platform commission dues (e.g. ₹850)
  const payPlatformDues = () => {
    if (doctor.walletBalance <= 0) {
      showToast('No Dues', 'You have no outstanding platform commission dues.', 'info');
      return;
    }
    const paidAmount = doctor.walletBalance;
    showToast('Platform Dues Settled!', `Successfully paid ₹${paidAmount} platform commission via UPI/Card. Your payable dues balance is now ₹0.`, 'success');
    setDoctor((prev) => ({ ...prev, walletBalance: 0 }));
    setTransactions((prev) =>
      prev.map((tx) => ({ ...tx, status: 'settled' }))
    );
  };

  const updateAdminSettings = (newSettings: Partial<AdminSettingsState>) => {
    setAdminSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings Saved', 'Platform configurations updated.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        isDarkMode,
        toggleDarkMode,
        doctor,
        toggleDoctorOnline,
        updateDoctorProfile,
        doctors,
        updateDoctorStatus,
        patients,
        removePatient,
        requests,
        updateRequestStatus,
        saveConsultationNotes,
        reviews,
        addPatientReview,
        transactions,
        payPlatformDues,
        adminSettings,
        updateAdminSettings,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const DoctorAdminProvider = AppProvider;

export const useDoctorAdmin = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useDoctorAdmin must be used within a DoctorAdminProvider');
  }
  return context;
};

export const useApp = useDoctorAdmin;

