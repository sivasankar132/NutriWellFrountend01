import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ContextMode } from '../../types';
import { ModeShell } from '../../components/modes/ModeShell';

const slugToModeMap: Record<string, ContextMode> = {
  student: 'STUDENT',
  employee: 'EMPLOYEE',
  hostel: 'HOSTEL',
  home: 'HOME',
  travel: 'TRAVEL',
  'eating-out': 'EATING_OUT',
  active: 'ACTIVE',
  'womens-wellness': 'WOMEN_WELLNESS',
};

export const ModePage: React.FC = () => {
  const { modeSlug } = useParams<{ modeSlug?: string }>();
  const { contextMode, setContextMode } = useApp();

  const resolvedMode: ContextMode = (modeSlug && slugToModeMap[modeSlug.toLowerCase()]) 
    ? slugToModeMap[modeSlug.toLowerCase()] 
    : contextMode;

  useEffect(() => {
    if (modeSlug && slugToModeMap[modeSlug.toLowerCase()]) {
      const mapped = slugToModeMap[modeSlug.toLowerCase()];
      if (mapped !== contextMode) {
        setContextMode(mapped);
      }
    }
  }, [modeSlug, contextMode, setContextMode]);

  return (
    <div className="min-h-screen py-6 px-4 max-w-7xl mx-auto">
      <ModeShell mode={resolvedMode} />
    </div>
  );
};

export default ModePage;

