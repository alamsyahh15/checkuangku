import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { CalculationResult, FinancialFormData } from '../types/financial';
import { formatRupiah } from '../utils/formatter';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Edit3, 
  Printer, 
  PieChart as PieChartIcon,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface ResultViewProps {
  result: CalculationResult;
  formData?: FinancialFormData;
  onEdit: () => void;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onEdit,
  onReset,
}) => {
  const {
    totalAset,
    totalUtang,
    kekayaanBersih,
    totalPendapatan,
    totalPengeluaran,
    healthStatus,
    score,
    ratios,
    recommendations,
  } = result;

  useEffect(() => {
    if (healthStatus === 'Sehat' || healthStatus === 'Sangat Sehat') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [healthStatus]);

  const handlePrint = () => {
    window.print();
  };

  // Determine Badge Icon and Colors based on status
  const getStatusBadge = () => {
    switch (healthStatus) {
      case 'Bahaya':
        return (
          <div className="status-badge status-badge-danger" title="Kondisi Bahaya">
            <XCircle className="badge-icon" />
          </div>
        );
      case 'Waspada':
        return (
          <div className="status-badge status-badge-warning" title="Kondisi Waspada">
            <AlertTriangle className="badge-icon" />
          </div>
        );
      case 'Sehat':
        return (
          <div className="status-badge status-badge-success" title="Kondisi Sehat">
            <CheckCircle2 className="badge-icon" />
          </div>
        );
      case 'Sangat Sehat':
        return (
          <div className="status-badge status-badge-super" title="Kondisi Sangat Sehat">
            <Sparkles className="badge-icon" />
          </div>
        );
    }
  };

  return (
    <div className="result-view-wrapper">
      {/* Top Banner Header matching screenshot */}
      <div className="result-top-banner">
        <h1 className="result-banner-title">Kesehatan Keuangan</h1>
      </div>

      <div className="result-content-container">
        {/* Card 1: Kondisi Kesehatan Keuangan */}
        <div className="result-card health-status-card">
          <div className="health-card-header">
            <div className="health-card-left">
              <span className="health-sublabel">Kondisi Kesehatan Keuangan</span>
              <div className="status-title-row">
                <h2 className={`health-status-title status-text-${healthStatus.toLowerCase().replace(' ', '-')}`}>
                  {healthStatus}
                </h2>
                <span className="health-score-pill">
                  Skor: <strong>{score}</strong>/100
                </span>
              </div>
            </div>
            <div className="health-card-right">
              {getStatusBadge()}
            </div>
          </div>

          <div className="card-divider" />

          {/* Ratios Table / List */}
          <div className="ratios-table">
            <div className="ratio-row">
              <span className="ratio-name">{ratios.danaDarurat.name}</span>
              <span className={`ratio-value ${ratios.danaDarurat.isSafe ? 'text-safe' : 'text-danger'}`}>
                {ratios.danaDarurat.formattedValue}
              </span>
              <span className="ratio-standard">{ratios.danaDarurat.standard}</span>
            </div>

            <div className="ratio-row">
              <span className="ratio-name">{ratios.tabungan.name}</span>
              <span className={`ratio-value ${ratios.tabungan.isSafe ? 'text-safe' : 'text-danger'}`}>
                {ratios.tabungan.formattedValue}
              </span>
              <span className="ratio-standard">{ratios.tabungan.standard}</span>
            </div>

            <div className="ratio-row">
              <span className="ratio-name">{ratios.cicilanUtang.name}</span>
              <span className={`ratio-value ${ratios.cicilanUtang.isSafe ? 'text-safe' : 'text-danger'}`}>
                {ratios.cicilanUtang.formattedValue}
              </span>
              <span className="ratio-standard">{ratios.cicilanUtang.standard}</span>
            </div>
          </div>

          <p className="ratio-disclaimer">
            *Disclaimer: Hasil perhitungan ini hanya merupakan rekomendasi rasio ideal berdasarkan standar ilmu perencanaan keuangan
          </p>
        </div>

        {/* Card 2: Neraca Keuangan */}
        <div className="result-card neraca-card">
          <div className="neraca-header-bar">
            <h3>Neraca Keuangan</h3>
          </div>

          <div className="neraca-card-body">
            <div className="net-worth-section">
              <span className="net-worth-label">Kekayaan Bersih</span>
              <h2 className={`net-worth-value ${kekayaanBersih < 0 ? 'text-danger-bold' : 'text-primary-bold'}`}>
                {formatRupiah(kekayaanBersih)}
              </h2>
            </div>

            <div className="balance-sheet-divider" />

            <div className="assets-liabilities-row">
              <div className="balance-col asset-col">
                <span className="balance-col-label">Total Aset</span>
                <span className="balance-col-value text-green-value">
                  {formatRupiah(totalAset)}
                </span>
              </div>

              <div className="vertical-divider" />

              <div className="balance-col debt-col">
                <span className="balance-col-label">Total Utang</span>
                <span className="balance-col-value text-red-value">
                  {formatRupiah(totalUtang)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Card 3: Arus Kas & Analisis Pendapatan vs Pengeluaran */}
        <div className="result-card cashflow-card print-hide">
          <div className="card-section-title-wrapper">
            <PieChartIcon className="section-icon" />
            <h3>Arus Kas Bulanan (Cash Flow)</h3>
          </div>

          <div className="cashflow-grid">
            <div className="cashflow-item income-item">
              <div className="cashflow-header">
                <ArrowUpRight className="cf-icon income-icon" />
                <span>Total Pendapatan</span>
              </div>
              <span className="cashflow-amount text-success">
                {formatRupiah(totalPendapatan)}
              </span>
            </div>

            <div className="cashflow-item expense-item">
              <div className="cashflow-header">
                <ArrowDownRight className="cf-icon expense-icon" />
                <span>Total Pengeluaran</span>
              </div>
              <span className="cashflow-amount text-danger">
                {formatRupiah(totalPengeluaran)}
              </span>
            </div>

            <div className="cashflow-item surplus-item">
              <div className="cashflow-header">
                <ShieldAlert className="cf-icon surplus-icon" />
                <span>Surplus / Defisit Bulanan</span>
              </div>
              <span className={`cashflow-amount ${totalPendapatan - totalPengeluaran >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatRupiah(totalPendapatan - totalPengeluaran)}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Card 4: Rekomendasi Perencanaan Keuangan */}
        <div className="result-card recommendations-card print-hide">
          <div className="card-section-title-wrapper">
            <Sparkles className="section-icon text-amber" />
            <h3>Rekomendasi Perencana Keuangan</h3>
          </div>

          <ul className="recommendation-list">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="recommendation-item">
                <div className="rec-text" dangerouslySetInnerHTML={{ __html: rec.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Actions Button Bar */}
        <div className="result-actions-bar print-hide">
          <button type="button" className="btn-action btn-action-edit" onClick={onEdit}>
            <Edit3 className="btn-icon" />
            Edit Data Form
          </button>
          
          <button type="button" className="btn-action btn-action-reset" onClick={onReset}>
            <RotateCcw className="btn-icon" />
            Hitung Ulang (Reset)
          </button>

          <button type="button" className="btn-action btn-action-print" onClick={handlePrint}>
            <Printer className="btn-icon" />
            Cetak Laporan (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
