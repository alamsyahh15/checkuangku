export interface AsetData {
  uangTunai: number;
  tabungan: number;
  deposito: number;
  nilaiTunaiAsuransi: number;
  saham: number;
  reksadana: number;
  obligasi: number;
  emas: number;
  rumahTinggal: number;
  perabotanRumahTangga: number;
  kendaraan: number;
  lainLain: number;
}

export interface UtangData {
  kartuKredit: number;
  kreditTanpaAgunan: number;
  kreditKoperasi: number;
  kreditRumah: number;
  kreditKendaraan: number;
  lainLain: number;
}

export interface PendapatanData {
  gaji: number;
  hasilUsaha: number;
  bunga: number;
  hasilSewa: number;
  lainLain: number;
}

export interface PengeluaranData {
  cicilanUtang: number;
  premiAsuransi: number;
  tabunganInvestasiRutin: number;
  belanjaRumahTangga: number;
  utilitas: number;
  transportasi: number;
  pengeluaranAnak: number;
  asistenRumahTangga: number;
  zakatSosialHadiah: number;
  kesehatan: number;
  hiburanKeluarga: number;
  pengeluaranPribadi: number;
  lainLain: number;
}

export interface FinancialFormData {
  aset: AsetData;
  utang: UtangData;
  pendapatan: PendapatanData;
  pengeluaran: PengeluaranData;
}

export type HealthStatusType = 'Bahaya' | 'Waspada' | 'Sehat' | 'Sangat Sehat';

export interface RatioResult {
  name: string;
  value: number;
  formattedValue: string;
  standard: string;
  isSafe: boolean;
  statusText: string;
}

export interface CalculationResult {
  totalAset: number;
  totalUtang: number;
  kekayaanBersih: number;
  totalPendapatan: number;
  totalPengeluaran: number;
  asetLikuid: number;
  
  rasioDanaDarurat: number; // Liquid assets / monthly expense (times)
  rasioTabungan: number; // Savings / monthly income (%)
  rasioCicilanUtang: number; // Debt payment / monthly income (%)
  
  healthStatus: HealthStatusType;
  score: number; // 0 - 100
  
  ratios: {
    danaDarurat: RatioResult;
    tabungan: RatioResult;
    cicilanUtang: RatioResult;
  };
  
  recommendations: string[];
}

export type FormStep = 1 | 2 | 3 | 4 | 5; // 5 is result view
