import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Settings as SettingsIcon, Globe, Bell, Shield, Moon, Lock, UserCheck } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, privacyConsent, updatePrivacyConsent, userMode, setUserMode, tier, setTier, logout, showToast } = useApp();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Badge variant="mint" icon={<SettingsIcon className="w-3.5 h-3.5" />}>System & Privacy Configuration</Badge>
        <h1 className="text-2xl font-bold text-white mt-1">Settings & Privacy Control Center</h1>
        <p className="text-xs text-slate-400">Manage language, privacy permissions, healthcare consent, and membership tier.</p>
      </div>

      {/* Subscription Tier Management */}
      <Card glow className="space-y-4 p-6 border-amber-500/40">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="gold">CURRENT PLAN: {tier}</Badge>
            <h3 className="text-base font-bold text-white mt-1">Membership Intelligence Tier</h3>
            <p className="text-xs text-slate-300">Access commercial AI food scanner, budget engine, and doctor care bridge.</p>
          </div>
          <Button
            variant={tier === 'PREMIUM' ? 'gold' : 'primary'}
            size="sm"
            onClick={() => setTier(tier === 'PREMIUM' ? 'FREE' : 'PREMIUM')}
          >
            {tier === 'PREMIUM' ? 'Switch to Free' : 'Upgrade to Premium'}
          </Button>
        </div>
      </Card>

      {/* Privacy & Consent Dashboard */}
      <Card className="space-y-5 p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Patient Privacy & Healthcare Consent Dashboard
        </h3>

        <div className="space-y-4 text-xs text-slate-300">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
            <div>
              <p className="font-bold text-white">Share Nutrition Summary with Doctors</p>
              <p className="text-[11px] text-slate-400">Allows Dr. Ananya Sharma or Dr. Rajesh Varma to review meal logs before video consults.</p>
            </div>
            <button
              onClick={() => updatePrivacyConsent({ shareWithDoctors: !privacyConsent.shareWithDoctors })}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                privacyConsent.shareWithDoctors ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              {privacyConsent.shareWithDoctors ? 'Allowed' : 'Denied'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-emerald-900/40">
            <div>
              <p className="font-bold text-white">Teen Safety & Guardian Consent Mode</p>
              <p className="text-[11px] text-slate-400">Replaces calorie pressure with healthy habit education & activity balance.</p>
            </div>
            <button
              onClick={() => setUserMode(userMode === 'TEEN_SAFETY' ? 'ADULT' : 'TEEN_SAFETY')}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                userMode === 'TEEN_SAFETY' ? 'bg-teal-950 border-teal-400 text-teal-300' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              {userMode === 'TEEN_SAFETY' ? 'Active' : 'Disabled'}
            </button>
          </div>
        </div>
      </Card>

      <Card className="space-y-6 p-6">
        {/* Language Selection */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Interface Language
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Switch between English and Telugu (తెలుగు)</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={language === 'en' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
            <Button
              variant={language === 'te' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setLanguage('te')}
            >
              తెలుగు
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              AI Meal & Water Reminders
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Receive contextual prompts for missing protein targets</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => showToast("Notification preferences updated!")}>
            Enabled
          </Button>
        </div>

        {/* Account Session / Logout */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Account Session
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Sign out of your NutriWell account on this device</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-red-400 border-red-900/40 hover:bg-red-950/40 hover:border-red-500/50"
            onClick={async () => {
              await logout();
              window.location.hash = '#/login';
            }}
          >
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
