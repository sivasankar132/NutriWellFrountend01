import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, Zap, ShieldCheck, Stethoscope, Building2 } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { showToast } = useApp();

  const plans = [
    {
      name: 'FREE',
      price: '₹0',
      period: 'forever',
      description: 'Essential daily macro and hydration tracking.',
      features: [
        'Manual meal and water logging',
        'Basic calorie & protein target counters',
        'Standard food catalog access',
        'Health Journal diary'
      ],
      cta: 'Current Tier',
      variant: 'outline' as const,
      popular: false,
    },
    {
      name: 'PREMIUM',
      price: '₹499',
      period: 'per month',
      description: 'Full AI computer vision scanner & budget optimizer.',
      features: [
        'Unlimited AI Vision Food Camera Scans',
        'Interactive Fill the Plate Macro Builder',
        'Indian Food Budget Optimization engine',
        'Deep Health Analytics & PDF Export',
        'Conversational AI Health Assistant'
      ],
      cta: 'UPGRADE TO PREMIUM',
      variant: 'primary' as const,
      popular: true,
    },
    {
      name: 'PROFESSIONAL',
      price: '₹1,499',
      period: 'per month',
      description: 'Complete healthcare coverage with direct doctor care.',
      features: [
        'Everything in Premium Tier',
        '2 Free Doctor Tele-Consultations per month',
        'Personalized Clinical Dietitian protocol',
        'Direct messaging with Care Team',
        'Priority HD Video slots'
      ],
      cta: 'GET PROFESSIONAL CARE',
      variant: 'gold' as const,
      popular: false,
    },
    {
      name: 'BUSINESS',
      price: '₹4,999',
      period: 'per month',
      description: 'Corporate wellness & clinical partnership programs.',
      features: [
        'Up to 50 Employee Team licenses',
        'Corporate wellness leaderboard',
        'Custom clinic integration dashboard',
        'Dedicated account manager & SLA'
      ],
      cta: 'CONTACT SALES',
      variant: 'secondary' as const,
      popular: false,
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="mint" icon={<Sparkles className="w-3.5 h-3.5" />}>Commercial Health Tech Membership</Badge>
        <h1 className="text-3xl font-extrabold text-white">Value-First Healthcare & AI Pricing</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">Unlock commercial-grade AI food intelligence and clinical care teams at accessible Indian market prices.</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            glow={plan.popular}
            className={`flex flex-col justify-between space-y-6 relative ${
              plan.popular ? 'border-2 border-emerald-400 emerald-glow-lg bg-emerald-950/40' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="mint" icon={<Sparkles className="w-3 h-3" />}>MOST POPULAR</Badge>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{plan.description}</p>
              </div>

              <div className="pt-4 border-t border-emerald-900/40 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Included Features</span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              variant={plan.variant}
              size="md"
              className="w-full"
              onClick={() => showToast(`Selected ${plan.name} Plan checkout!`)}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
