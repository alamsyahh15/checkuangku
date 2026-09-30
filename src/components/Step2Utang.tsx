import React from 'react';
import type { UtangData } from '../types/financial';
import { FormInput } from './FormInput';

interface Step2UtangProps {
  data: UtangData;
  onChange: (data: UtangData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Utang: React.FC<Step2UtangProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const updateField = (field: keyof UtangData, val: number) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <FormInput
        id="kartuKredit"
        label="Kartu Kredit"
        value={data.kartuKredit}
        onChange={(v) => updateField('kartuKredit', v)}
      />
      <FormInput
        id="kreditTanpaAgunan"
        label="Kredit Tanpa Agunan"
        value={data.kreditTanpaAgunan}
        onChange={(v) => updateField('kreditTanpaAgunan', v)}
      />
      <FormInput
        id="kreditKoperasi"
        label="Kredit Koperasi"
        value={data.kreditKoperasi}
        onChange={(v) => updateField('kreditKoperasi', v)}
      />
      <FormInput
        id="kreditRumah"
        label="Kredit Rumah"
        value={data.kreditRumah}
        onChange={(v) => updateField('kreditRumah', v)}
      />
      <FormInput
        id="kreditKendaraan"
        label="Kredit Kendaraan"
        value={data.kreditKendaraan}
        onChange={(v) => updateField('kreditKendaraan', v)}
      />
      <FormInput
        id="lainLainUtang"
        label="Lain-lain"
        value={data.lainLain}
        onChange={(v) => updateField('lainLain', v)}
      />

      <div className="btn-actions-container">
        <button type="submit" className="btn-primary-blue">
          Lanjutkan
        </button>
        <button type="button" className="btn-secondary-outline" onClick={onBack}>
          Kembali
        </button>
      </div>
    </form>
  );
};
