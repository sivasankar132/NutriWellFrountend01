import React from 'react';
import { PlateBuilder } from '../../components/nutrition/PlateBuilder';
import { UseWhatIHaveCard } from '../../components/nutrition/UseWhatIHaveCard';
import { RupeeSmartCard } from '../../components/nutrition/RupeeSmartCard';

export const NutritionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PlateBuilder />
      <UseWhatIHaveCard />
      <RupeeSmartCard />
    </div>
  );
};
