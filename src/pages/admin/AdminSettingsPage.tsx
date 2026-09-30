import React, { useState } from 'react';
import { useApp } from '../../context/DoctorAdminContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Settings, IndianRupee, Wallet, Bell, Save } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { adminSettings, updateAdminSettings } = useApp();

  const [formData, setFormData] = useState({
    platformName: adminSettings.platformName,
    supportEmail: adminSettings.supportEmail,
    currencySymbol: adminSettings.currencySymbol,
    baseConsultationFee: adminSettings.baseConsultationFee,
    platformFeePercent: adminSettings.platformFeePercent,
    walletCapLimit: adminSettings.walletCapLimit, // ₹1000
    autoPayoutThreshold: adminSettings.autoPayoutThreshold,
    emailNotifications: adminSettings.emailNotifications,
    smsNotifications: adminSettings.smsNotifications,
    verificationAlerts: adminSettings.verificationAlerts,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(formData);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Admin Platform Configurations & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure financial rules, platform consultation commission fees, doctor dues payable limits, and notification policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Platform Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              1. Platform Branding & System Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={formData.platformName}
                onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Consultation Fee Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              2. Consultation Fee & Commission Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Standard Consultation Fee (₹) [Collected in Doctor's Hand]
              </label>
              <input
                type="number"
                value={formData.baseConsultationFee}
                onChange={(e) =>
                  setFormData({ ...formData, baseConsultationFee: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Platform Commission Fee (%) [Owed by Doctor to Platform]
              </label>
              <input
                type="number"
                value={formData.platformFeePercent}
                onChange={(e) =>
                  setFormData({ ...formData, platformFeePercent: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Wallet Limit Settings (₹1000 Doctor Dues Payable Cap) */}
        <Card className="border-amber-300/80 dark:border-amber-900/60">
          <CardHeader className="bg-amber-50/50 dark:bg-amber-950/30">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              3. Doctor Payable Dues Limit Settings (Cap: ₹1000)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm p-6">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">
                    Active Doctor Payable Dues Cap: ₹{formData.walletCapLimit}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Consultations are paid directly to doctors. Doctors owe 10% commission. When unpaid dues reach ₹{formData.walletCapLimit}, doctors must settle payment to continue accepting patients.
                  </p>
                </div>
                <Badge variant="warning" size="sm">Cap Policy Rule</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Doctor Commission Dues Cap Limit (₹)
                </label>
                <input
                  type="number"
                  value={formData.walletCapLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, walletCapLimit: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Settlement Warning Threshold (₹)
                </label>
                <input
                  type="number"
                  value={formData.autoPayoutThreshold}
                  onChange={(e) =>
                    setFormData({ ...formData, autoPayoutThreshold: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              4. System Notification Triggers & Dues Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                  Email Dues Reminders & Notifications
                </span>
                <span className="text-xs text-slate-500">Send reminder emails when doctor platform dues approach ₹1000</span>
              </div>
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                  SMS & WhatsApp Telehealth Notifications
                </span>
                <span className="text-xs text-slate-500">Instant SMS alerts for patient requests</span>
              </div>
              <input
                type="checkbox"
                checked={formData.smsNotifications}
                onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
            </label>
          </CardContent>
        </Card>

        {/* Save Settings Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold shadow-lg py-3 text-base"
            leftIcon={<Save className="w-5 h-5" />}
          >
            Save Admin Configurations
          </Button>
        </div>
      </form>
    </div>
  );
};
