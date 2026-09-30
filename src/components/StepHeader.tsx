import React from 'react';
import type { FormStep } from '../types/financial';

interface StepHeaderProps {
  currentStep: FormStep;
}

const STEP_INFO: Record<number, { title: string; next: string }> = {
  1: { title: 'Nilai Aset', next: 'Nilai Utang' },
  2: { title: 'Nilai Utang', next: 'Pendapatan Bulanan' },
  3: { title: 'Pendapatan Bulanan', next: 'Pengeluaran Bulanan' },
  4: { title: 'Pengeluaran Bulanan', next: 'Hasil Perhitungan' },
};

export const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
  if (currentStep > 4) return null;

  const info = STEP_INFO[currentStep] || STEP_INFO[1];
  const percentage = (currentStep / 4) * 100;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="step-header-container">
      <div className="step-circle-wrapper">
        <svg className="step-circle-svg" viewBox="0 0 90 90">
          {/* Background Track */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            className="step-circle-bg"
            strokeWidth="6"
          />
          {/* Active Progress Track */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            className="step-circle-progress"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 45 45)"
          />
        </svg>
        <div className="step-circle-text">
          <span className="step-current">{currentStep}</span>
          <span className="step-divider">/</span>
          <span className="step-total">4</span>
        </div>
      </div>

      <div className="step-titles">
        <h2 className="step-main-title">{info.title}</h2>
        <p className="step-sub-title">Berikutnya: {info.next}</p>
      </div>
    </div>
  );
};
