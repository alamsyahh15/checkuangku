import React from 'react';
import type { AsetData } from '../types/financial';
import { FormInput } from './FormInput';

interface Step1AsetProps {
  data: AsetData;
  onChange: (data: AsetData) => void;
  onNext: () => void;
}

export const Step1Aset: React.FC<Step1AsetProps> = ({ data, onChange, onNext }) => {
  const updateField = (field: keyof AsetData, val: number) => {
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
        id="uangTunai"
        label="Uang Tunai"
        value={data.uangTunai}
        onChange={(v) => updateField('uangTunai', v)}
      />
      <FormInput
        id="tabungan"
        label="Tabungan"
        value={data.tabungan}
        onChange={(v) => updateField('tabungan', v)}
      />
      <FormInput
        id="deposito"
        label="Deposito"
        value={data.deposito}
        onChange={(v) => updateField('deposito', v)}
      />
      <FormInput
        id="nilaiTunaiAsuransi"
        label="Nilai Tunai Asuransi"
        value={data.nilaiTunaiAsuransi}
        onChange={(v) => updateField('nilaiTunaiAsuransi', v)}
      />
      <FormInput
        id="saham"
        label="Saham"
        value={data.saham}
        onChange={(v) => updateField('saham', v)}
      />
      <FormInput
        id="reksadana"
        label="Reksadana"
        value={data.reksadana}
        onChange={(v) => updateField('reksadana', v)}
      />
      <FormInput
        id="obligasi"
        label="Obligasi"
        value={data.obligasi}
        onChange={(v) => updateField('obligasi', v)}
      />
      <FormInput
        id="emas"
        label="Emas"
        value={data.emas}
        onChange={(v) => updateField('emas', v)}
      />
      <FormInput
        id="rumahTinggal"
        label="Rumah Tinggal"
        value={data.rumahTinggal}
        onChange={(v) => updateField('rumahTinggal', v)}
      />
      <FormInput
        id="perabotanRumahTangga"
        label="Perabotan Rumah Tangga"
        value={data.perabotanRumahTangga}
        onChange={(v) => updateField('perabotanRumahTangga', v)}
      />
      <FormInput
        id="kendaraan"
        label="Kendaraan"
        value={data.kendaraan}
        onChange={(v) => updateField('kendaraan', v)}
      />
      <FormInput
        id="lainLainAset"
        label="Lain-lain"
        value={data.lainLain}
        onChange={(v) => updateField('lainLain', v)}
      />

      <div className="btn-actions-container">
        <button type="submit" className="btn-primary-blue">
          Lanjutkan
        </button>
      </div>
    </form>
  );
};
