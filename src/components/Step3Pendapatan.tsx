import React from 'react';
import type { PendapatanData } from '../types/financial';
import { FormInput } from './FormInput';

interface Step3PendapatanProps {
  data: PendapatanData;
  onChange: (data: PendapatanData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Pendapatan: React.FC<Step3PendapatanProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const updateField = (field: keyof PendapatanData, val: number) => {
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
        id="gaji"
        label="Gaji"
        value={data.gaji}
        onChange={(v) => updateField('gaji', v)}
      />
      <FormInput
        id="hasilUsaha"
        label="Hasil Usaha"
        value={data.hasilUsaha}
        onChange={(v) => updateField('hasilUsaha', v)}
      />
      <FormInput
        id="bunga"
        label="Bunga (Deposito, Obligasi, dll)"
        value={data.bunga}
        onChange={(v) => updateField('bunga', v)}
      />
      <FormInput
        id="hasilSewa"
        label="Hasil Sewa (Kos, Kendaraan, Dll)"
        value={data.hasilSewa}
        onChange={(v) => updateField('hasilSewa', v)}
      />
      <FormInput
        id="lainLainPendapatan"
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
