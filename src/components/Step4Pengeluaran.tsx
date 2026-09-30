import React from 'react';
import type { PengeluaranData } from '../types/financial';
import { FormInput } from './FormInput';

interface Step4PengeluaranProps {
  data: PengeluaranData;
  onChange: (data: PengeluaranData) => void;
  onCalculate: () => void;
  onBack: () => void;
}

export const Step4Pengeluaran: React.FC<Step4PengeluaranProps> = ({
  data,
  onChange,
  onCalculate,
  onBack,
}) => {
  const updateField = (field: keyof PengeluaranData, val: number) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <FormInput
        id="cicilanUtang"
        label="Cicilan Utang"
        value={data.cicilanUtang}
        onChange={(v) => updateField('cicilanUtang', v)}
      />
      <FormInput
        id="premiAsuransi"
        label="Premi Asuransi"
        value={data.premiAsuransi}
        onChange={(v) => updateField('premiAsuransi', v)}
      />
      <FormInput
        id="tabunganInvestasiRutin"
        label="Tabungan/Investasi Rutin"
        value={data.tabunganInvestasiRutin}
        onChange={(v) => updateField('tabunganInvestasiRutin', v)}
      />
      <FormInput
        id="belanjaRumahTangga"
        label="Belanja Rumah Tangga"
        value={data.belanjaRumahTangga}
        onChange={(v) => updateField('belanjaRumahTangga', v)}
      />
      <FormInput
        id="utilitas"
        label="Utilitas (Listrik, Pulsa, Internet, dll)"
        value={data.utilitas}
        onChange={(v) => updateField('utilitas', v)}
      />
      <FormInput
        id="transportasi"
        label="Transportasi"
        value={data.transportasi}
        onChange={(v) => updateField('transportasi', v)}
      />
      <FormInput
        id="pengeluaranAnak"
        label="Pengeluaran Anak"
        value={data.pengeluaranAnak}
        onChange={(v) => updateField('pengeluaranAnak', v)}
      />
      <FormInput
        id="asistenRumahTangga"
        label="Asisten Rumah Tangga"
        value={data.asistenRumahTangga}
        onChange={(v) => updateField('asistenRumahTangga', v)}
      />
      <FormInput
        id="zakatSosialHadiah"
        label="Zakat/Sosial/Hadiah"
        value={data.zakatSosialHadiah}
        onChange={(v) => updateField('zakatSosialHadiah', v)}
      />
      <FormInput
        id="kesehatan"
        label="Kesehatan"
        value={data.kesehatan}
        onChange={(v) => updateField('kesehatan', v)}
      />
      <FormInput
        id="hiburanKeluarga"
        label="Hiburan Keluarga"
        value={data.hiburanKeluarga}
        onChange={(v) => updateField('hiburanKeluarga', v)}
      />
      <FormInput
        id="pengeluaranPribadi"
        label="Pengeluaran Pribadi"
        value={data.pengeluaranPribadi}
        onChange={(v) => updateField('pengeluaranPribadi', v)}
      />
      <FormInput
        id="lainLainPengeluaran"
        label="Lain-lain"
        value={data.lainLain}
        onChange={(v) => updateField('lainLain', v)}
      />

      <div className="btn-actions-container">
        <button type="submit" className="btn-primary-blue">
          Hitung
        </button>
        <button type="button" className="btn-secondary-outline" onClick={onBack}>
          Kembali
        </button>
      </div>
    </form>
  );
};
