export type UserRole = 'doctor' | 'admin';

export type DoctorStatus = 'verified' | 'pending' | 'rejected' | 'suspended';

export type ConsultationType = 'Video Consultation' | 'Chat Session' | 'In-Person Visit';

export type RequestStatus = 'new' | 'pending' | 'accepted' | 'completed' | 'rejected';

export type TransactionStatus = 'settled' | 'unsettled' | 'pending';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialization: string;
  experienceYears: number;
  qualification: string;
  certificateUrl: string;
  status: DoctorStatus;
  isOnline: boolean;
  rating: number;
  reviewCount: number;
  totalConsultations: number;
  totalPatientsConsulted: number;
  pendingRequestsCount: number;
  acceptedRequestsCount: number;
  walletBalance: number; // Represents accumulated Platform Dues owed BY doctor TO platform (Cap is ₹1000)
  monthlyEarnings: number; // Total fee collected directly by doctor
  totalEarnings: number; // Lifetime fee collected by doctor
  pendingPayouts: number; // Dues pending settlement
  joinedDate: string;
}

export interface PatientMedicalHistory {
  diseases: string[];
  allergies: string[];
  previousConditions: string[];
  medications: string[];
}

export interface NutritionSummary {
  planName: string;
  avgDailyCalories: number;
  targetDailyCalories: number;
  proteinIntakeGrams: number;
  targetProteinGrams: number;
  waterIntakeLiters: number;
  targetWaterLiters: number;
  mealAdherencePercent: number;
}

export interface WeightTrendPoint {
  date: string;
  weight: number;
  targetWeight: number;
}

export interface BMITrendPoint {
  date: string;
  bmi: number;
}

export interface CalorieTrendPoint {
  date: string;
  calories: number;
  target: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  bmi: number;
  targetGoal: string;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  joinDate: string;
  activeConsultations: number;
  medicalHistory: PatientMedicalHistory;
  nutritionSummary: NutritionSummary;
  weightTrend: WeightTrendPoint[];
  bmiTrend: BMITrendPoint[];
  calorieTrend: CalorieTrendPoint[];
}

export interface ConsultationRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  age: number;
  gender: string;
  primaryGoal: string;
  consultationType: ConsultationType;
  requestDate: string;
  requestTime: string;
  status: RequestStatus;
  notes?: string;
  recommendations?: string;
  fee: number;
}

export interface PatientReview {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  consultationId: string;
  consultationDate: string;
  cooperationRating: number;
  dietAdherenceRating: number;
  communicationRating: number;
  overallRating: number;
  comments: string;
  submittedAt: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  patientName: string;
  consultationFee: number; // Collected directly by Doctor (e.g. ₹500)
  platformFee: number; // Owed to Platform (e.g. ₹50)
  amountReceived: number;
  status: TransactionStatus;
}

export interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  transactionRef: string;
  status: 'Settled' | 'Pending';
}

export interface AISummaryData {
  healthOverview: string;
  medicalHistorySummary: string;
  nutritionComplianceSummary: string;
  keyRiskFactors: string[];
  suggestedDiscussionPoints: string[];
}

export interface PlatformAnalyticsData {
  doctorsGrowth: { month: string; doctors: number; verified: number }[];
  patientsGrowth: { month: string; patients: number }[];
  consultationsTrend: { period: string; count: number; revenue: number }[];
  dailyConsultations: { day: string; count: number }[];
  doctorPerformance: { doctorName: string; consultations: number; rating: number; revenue: number }[];
  completionRate: number;
}

export interface AdminSettingsState {
  platformName: string;
  supportEmail: string;
  currencySymbol: string;
  baseConsultationFee: number;
  platformFeePercent: number;
  walletCapLimit: number; // Default ₹1000 (Doctor Dues Payable Limit)
  autoPayoutThreshold: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  verificationAlerts: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'consultation' | 'request' | 'review' | 'verification';
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
}
