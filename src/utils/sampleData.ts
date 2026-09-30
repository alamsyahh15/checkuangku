import type { FinancialFormData } from '../types/financial';

export const emptyFormData: FinancialFormData = {
  aset: {
    uangTunai: 0,
    tabungan: 0,
    deposito: 0,
    nilaiTunaiAsuransi: 0,
    saham: 0,
    reksadana: 0,
    obligasi: 0,
    emas: 0,
    rumahTinggal: 0,
    perabotanRumahTangga: 0,
    kendaraan: 0,
    lainLain: 0,
  },
  utang: {
    kartuKredit: 0,
    kreditTanpaAgunan: 0,
    kreditKoperasi: 0,
    kreditRumah: 0,
    kreditKendaraan: 0,
    lainLain: 0,
  },
  pendapatan: {
    gaji: 0,
    hasilUsaha: 0,
    bunga: 0,
    hasilSewa: 0,
    lainLain: 0,
  },
  pengeluaran: {
    cicilanUtang: 0,
    premiAsuransi: 0,
    tabunganInvestasiRutin: 0,
    belanjaRumahTangga: 0,
    utilitas: 0,
    transportasi: 0,
    pengeluaranAnak: 0,
    asistenRumahTangga: 0,
    zakatSosialHadiah: 0,
    kesehatan: 0,
    hiburanKeluarga: 0,
    pengeluaranPribadi: 0,
    lainLain: 0,
  },
};

/**
 * Screenshot Preset: Reproduces exact numbers from prompt image #4
 * Total Aset: Rp587.872.418
 * Total Utang: Rp5.887.756.736
 * Kekayaan Bersih: -Rp5.299.884.318
 * Rasio Dana Darurat: 0.06X
 * Rasio Tabungan: 7.32%
 * Rasio Cicilan Utang: 0.01%
 */
export const screenshotFormData: FinancialFormData = {
  aset: {
    uangTunai: 5000000,
    tabungan: 10000000,
    deposito: 0,
    nilaiTunaiAsuransi: 15000000,
    saham: 50000000,
    reksadana: 25000000,
    obligasi: 0,
    emas: 32872418,
    rumahTinggal: 350000000,
    perabotanRumahTangga: 25000000,
    kendaraan: 75000000,
    lainLain: 0,
  },
  utang: {
    kartuKredit: 15000000,
    kreditTanpaAgunan: 50000000,
    kreditKoperasi: 0,
    kreditRumah: 4822756736,
    kreditKendaraan: 1000000000,
    lainLain: 0,
  },
  pendapatan: {
    gaji: 25000000,
    hasilUsaha: 5000000,
    bunga: 500000,
    hasilSewa: 0,
    lainLain: 0,
  },
  pengeluaran: {
    cicilanUtang: 3000, // 0.01% of 30,500,000 = ~3000
    premiAsuransi: 1500000,
    tabunganInvestasiRutin: 2232600, // 7.32% of 30.5M
    belanjaRumahTangga: 8000000,
    utilitas: 2500000,
    transportasi: 3000000,
    pengeluaranAnak: 4000000,
    asistenRumahTangga: 2000000,
    zakatSosialHadiah: 1000000,
    kesehatan: 1500000,
    hiburanKeluarga: 2000000,
    pengeluaranPribadi: 2500000,
    lainLain: 239474000, // Makes liquid 15M / total expense = 0.06X
  },
};

/**
 * Healthy Sample Preset
 */
export const healthyFormData: FinancialFormData = {
  aset: {
    uangTunai: 15000000,
    tabungan: 45000000,
    deposito: 30000000,
    nilaiTunaiAsuransi: 20000000,
    saham: 35000000,
    reksadana: 25000000,
    obligasi: 15000000,
    emas: 20000000,
    rumahTinggal: 650000000,
    perabotanRumahTangga: 45000000,
    kendaraan: 180000000,
    lainLain: 10000000,
  },
  utang: {
    kartuKredit: 3000000,
    kreditTanpaAgunan: 0,
    kreditKoperasi: 0,
    kreditRumah: 180000000,
    kreditKendaraan: 35000000,
    lainLain: 0,
  },
  pendapatan: {
    gaji: 20000000,
    hasilUsaha: 5000000,
    bunga: 1000000,
    hasilSewa: 2000000,
    lainLain: 0,
  },
  pengeluaran: {
    cicilanUtang: 4500000, // 16% of 28M
    premiAsuransi: 1500000,
    tabunganInvestasiRutin: 5600000, // 20% of 28M
    belanjaRumahTangga: 5000000,
    utilitas: 1200000,
    transportasi: 1500000,
    pengeluaranAnak: 2000000,
    asistenRumahTangga: 1500000,
    zakatSosialHadiah: 700000,
    kesehatan: 800000,
    hiburanKeluarga: 1500000,
    pengeluaranPribadi: 1200000,
    lainLain: 0,
  },
};
