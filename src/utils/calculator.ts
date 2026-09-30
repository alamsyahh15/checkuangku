import type { FinancialFormData, CalculationResult, HealthStatusType } from '../types/financial';
import { formatRatioTimes, formatRatioPercentage } from './formatter';

export function calculateFinancialHealth(data: FinancialFormData): CalculationResult {
  const { aset, utang, pendapatan, pengeluaran } = data;

  // 1. Total Aset & Aset Likuid
  const totalAset = Object.values(aset).reduce((sum, val) => sum + (val || 0), 0);
  const asetLikuid = (aset.uangTunai || 0) + (aset.tabungan || 0) + (aset.deposito || 0);

  // 2. Total Utang
  const totalUtang = Object.values(utang).reduce((sum, val) => sum + (val || 0), 0);

  // 3. Kekayaan Bersih
  const kekayaanBersih = totalAset - totalUtang;

  // 4. Total Pendapatan Bulanan
  const totalPendapatan = Object.values(pendapatan).reduce((sum, val) => sum + (val || 0), 0);

  // 5. Total Pengeluaran Bulanan
  const totalPengeluaran = Object.values(pengeluaran).reduce((sum, val) => sum + (val || 0), 0);

  // 6. Ratios Calculation
  // Dana Darurat = Aset Likuid / Total Pengeluaran Bulanan
  const rasioDanaDaruratVal = totalPengeluaran > 0 ? asetLikuid / totalPengeluaran : 0;
  
  // Tabungan = (Tabungan / Investasi Rutin) / Total Pendapatan Bulanan * 100%
  const rasioTabunganVal = totalPendapatan > 0 ? ((pengeluaran.tabunganInvestasiRutin || 0) / totalPendapatan) * 100 : 0;

  // Cicilan Utang = Cicilan Utang / Total Pendapatan Bulanan * 100%
  const rasioCicilanUtangVal = totalPendapatan > 0 ? ((pengeluaran.cicilanUtang || 0) / totalPendapatan) * 100 : 0;

  // Ratios Safety Evaluation
  const isDanaDaruratSafe = rasioDanaDaruratVal >= 3;
  const isTabunganSafe = rasioTabunganVal >= 10;
  const isCicilanUtangSafe = rasioCicilanUtangVal <= 30;

  // Overall Status Determination
  let healthStatus: HealthStatusType = 'Sehat';
  let score = 100;

  const failedCount = [isDanaDaruratSafe, isTabunganSafe, isCicilanUtangSafe].filter(s => !s).length;

  if (kekayaanBersih < 0 || failedCount >= 2 || rasioCicilanUtangVal > 50 || rasioDanaDaruratVal < 0.5) {
    healthStatus = 'Bahaya';
  } else if (failedCount === 1 || rasioDanaDaruratVal < 3 || rasioTabunganVal < 10) {
    healthStatus = 'Waspada';
  } else if (isDanaDaruratSafe && isTabunganSafe && isCicilanUtangSafe && rasioDanaDaruratVal >= 6 && rasioTabunganVal >= 20 && rasioCicilanUtangVal <= 15) {
    healthStatus = 'Sangat Sehat';
  } else {
    healthStatus = 'Sehat';
  }

  // Calculate Score (0 - 100)
  let baseScore = 50;
  
  // Dana darurat contribution (max +25)
  const ddScore = Math.min(25, (rasioDanaDaruratVal / 6) * 25);
  // Savings ratio contribution (max +25)
  const savScore = Math.min(25, (rasioTabunganVal / 20) * 25);
  // Debt ratio contribution (max +25, lower is better)
  const debtScore = rasioCicilanUtangVal <= 30 ? 25 : Math.max(0, 25 - ((rasioCicilanUtangVal - 30) / 20) * 25);
  // Net worth positivity (max +25)
  const nwScore = kekayaanBersih > 0 ? 25 : Math.max(0, 25 - (Math.abs(kekayaanBersih) / (totalAset || 1)) * 25);

  score = Math.round(Math.max(5, Math.min(100, baseScore - 25 + ddScore + savScore + debtScore + nwScore)));

  // Generating Actionable Recommendations
  const recommendations: string[] = [];

  if (kekayaanBersih < 0) {
    recommendations.push(
      '⚠️ **Kekayaan bersih bernilai negatif**: Total utang Anda melebihi total aset. Prioritaskan pelunasan utang berbunga tinggi dan rem pengeluaran non-esensial.'
    );
  }

  if (rasioDanaDaruratVal < 3) {
    const minTarget = totalPengeluaran * 3;
    const lacking = minTarget - asetLikuid;
    recommendations.push(
      `🛡️ **Dana darurat minim (${formatRatioTimes(rasioDanaDaruratVal)})**: Idealnya memiliki 3-6 kali pengeluaran bulanan. Tambahkan dana likuid sekitar **Rp ${new Intl.NumberFormat('id-ID').format(Math.max(0, lacking))}** ke tabungan atau deposito.`
    );
  } else if (rasioDanaDaruratVal >= 3 && rasioDanaDaruratVal <= 6) {
    recommendations.push(
      '✅ **Dana darurat ideal**: Kapasitas dana darurat Anda berada di zona aman (3-6 bulan pengeluaran).'
    );
  }

  if (rasioTabunganVal < 10) {
    recommendations.push(
      `📈 **Alokasi tabungan rendah (${formatRatioPercentage(rasioTabunganVal)})**: Disarankan mengalokasikan minimal **10% dari pendapatan bulanan** untuk investasi & tabungan masa depan.`
    );
  } else {
    recommendations.push(
      '✅ **Rasio tabungan sehat**: Anda berhasil menyisihkan >10% pendapatan untuk masa depan.'
    );
  }

  if (rasioCicilanUtangVal > 30) {
    recommendations.push(
      `🚨 **Beban cicilan utang tinggi (${formatRatioPercentage(rasioCicilanUtangVal)})**: Batas aman cicilan utang adalah **maksimal 30%** dari pendapatan bulanan. Hindari mengambil pinjaman baru.`
    );
  } else {
    recommendations.push(
      '✅ **Beban utang terkendali**: Rasio cicilan utang berada di bawah ambang batas aman 30%.'
    );
  }

  return {
    totalAset,
    totalUtang,
    kekayaanBersih,
    totalPendapatan,
    totalPengeluaran,
    asetLikuid,
    rasioDanaDarurat: rasioDanaDaruratVal,
    rasioTabungan: rasioTabunganVal,
    rasioCicilanUtang: rasioCicilanUtangVal,
    healthStatus,
    score,
    ratios: {
      danaDarurat: {
        name: 'Rasio Dana Darurat',
        value: rasioDanaDaruratVal,
        formattedValue: formatRatioTimes(rasioDanaDaruratVal),
        standard: '(3 - 6 kali)',
        isSafe: isDanaDaruratSafe,
        statusText: isDanaDaruratSafe ? 'Aman' : 'Kurang',
      },
      tabungan: {
        name: 'Rasio Tabungan',
        value: rasioTabunganVal,
        formattedValue: formatRatioPercentage(rasioTabunganVal),
        standard: '(Min 10%)',
        isSafe: isTabunganSafe,
        statusText: isTabunganSafe ? 'Aman' : 'Kurang',
      },
      cicilanUtang: {
        name: 'Rasio Cicilan Utang',
        value: rasioCicilanUtangVal,
        formattedValue: formatRatioPercentage(rasioCicilanUtangVal),
        standard: '(Max 30%)',
        isSafe: isCicilanUtangSafe,
        statusText: isCicilanUtangSafe ? 'Aman' : 'Berisiko',
      },
    },
    recommendations,
  };
}
