import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { AlertTriangle, PhoneCall, MapPin, Info, ShieldAlert, HeartPulse } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyPage: React.FC = () => {
  const { showToast } = useApp();

  const handleCall108 = () => {
    showToast("Dialing National Medical Emergency Services (108)...");
    window.location.href = "tel:108";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Emergency Header Banner */}
      <div className="p-6 rounded-3xl bg-red-950/80 border-2 border-red-500/50 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
          <span>Priority Emergency Triage Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Need Immediate Medical Help?</h1>
        <p className="text-sm text-red-200 leading-relaxed font-medium">
          "For severe medical emergencies, chest pain, acute dyspnea, or anaphylaxis, seek immediate professional medical care."
        </p>
        <p className="text-xs text-red-300/80">
          ⚠️ Emergency support is 100% FREE and accessible to all users without payment or subscription requirements.
        </p>
      </div>

      {/* Emergency Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="border-red-500/40 text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-900/60 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Emergency Services</h3>
            <p className="text-xs text-slate-400 mt-1">Directly call National Medical Response (108)</p>
          </div>
          <Button variant="danger" size="lg" className="w-full" onClick={handleCall108}>
            CALL 108 NOW
          </Button>
        </Card>

        <Card glow className="border-amber-500/40 text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-900/60 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Find Nearby Care</h3>
            <p className="text-xs text-slate-400 mt-1">Locate 24/7 ICUs & Hospitals near you</p>
          </div>
          <Button variant="gold" size="lg" className="w-full" onClick={() => showToast("Searching nearby 24/7 hospitals on map...")}>
            FIND NEARBY HOSPITALS
          </Button>
        </Card>

        <Card className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-teal-900/60 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/40">
            <Info className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Emergency Advice</h3>
            <p className="text-xs text-slate-400 mt-1">First-aid protocols for acute reactions</p>
          </div>
          <Button variant="outline" size="lg" className="w-full" onClick={() => showToast("Opening First-Aid guidance handbook...")}>
            VIEW GUIDELINES
          </Button>
        </Card>
      </div>
    </div>
  );
};
