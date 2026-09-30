import React from 'react';
import { Wallet, Sparkles, RefreshCw, FileText, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  onLoadScreenshotPreset: () => void;
  onLoadHealthyPreset: () => void;
  onLoadWarningPreset: () => void;
  onReset: () => void;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadScreenshotPreset,
  onLoadHealthyPreset,
  onLoadWarningPreset,
  onReset,
  currentStep,
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand" onClick={onReset} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <Wallet className="logo-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">CheckUangku</span>
            <span className="brand-tagline">Kalkulator Kesehatan Keuangan</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="presets-dropdown">
            <button type="button" className="btn-preset btn-preset-screenshot" onClick={onLoadScreenshotPreset} title="Muat data contoh seperti screenshot">
              <FileText className="preset-icon" />
              Bahaya
            </button>
            <button type="button" className="btn-preset btn-preset-warning" onClick={onLoadWarningPreset} title="Muat data simulasi status waspada">
              <AlertTriangle className="preset-icon" />
              Waspada
            </button>
            <button type="button" className="btn-preset btn-preset-healthy" onClick={onLoadHealthyPreset} title="Muat data simulasi keuangan sehat">
              <Sparkles className="preset-icon" />
              Sehat
            </button>
          </div>

          {currentStep > 1 && (
            <button type="button" className="btn-header-reset" onClick={onReset} title="Mulai Dari Awal">
              <RefreshCw className="reset-icon" />
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
