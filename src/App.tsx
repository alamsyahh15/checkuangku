import { useState } from 'react';
import type { FinancialFormData, FormStep } from './types/financial';
import { emptyFormData, screenshotFormData, healthyFormData } from './utils/sampleData';
import { calculateFinancialHealth } from './utils/calculator';
import { Header } from './components/Header';
import { StepHeader } from './components/StepHeader';
import { Step1Aset } from './components/Step1Aset';
import { Step2Utang } from './components/Step2Utang';
import { Step3Pendapatan } from './components/Step3Pendapatan';
import { Step4Pengeluaran } from './components/Step4Pengeluaran';
import { ResultView } from './components/ResultView';
import './App.css';

export function App() {
  const [formData, setFormData] = useState<FinancialFormData>(emptyFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => (Math.min(prev + 1, 5) as FormStep));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (Math.max(prev - 1, 1) as FormStep));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculate = () => {
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData(emptyFormData);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadScreenshotPreset = () => {
    setFormData(screenshotFormData);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadHealthyPreset = () => {
    setFormData(healthyFormData);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculationResult = calculateFinancialHealth(formData);

  return (
    <div className="app-main-layout">
      <Header
        onLoadScreenshotPreset={handleLoadScreenshotPreset}
        onLoadHealthyPreset={handleLoadHealthyPreset}
        onReset={handleReset}
        currentStep={currentStep}
      />

      <main className="app-content-body">
        {currentStep <= 4 && (
          <div className="form-card-container">
            <StepHeader currentStep={currentStep} />

            <div className="form-step-wrapper">
              {currentStep === 1 && (
                <Step1Aset
                  data={formData.aset}
                  onChange={(aset) => setFormData({ ...formData, aset })}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 2 && (
                <Step2Utang
                  data={formData.utang}
                  onChange={(utang) => setFormData({ ...formData, utang })}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                />
              )}

              {currentStep === 3 && (
                <Step3Pendapatan
                  data={formData.pendapatan}
                  onChange={(pendapatan) => setFormData({ ...formData, pendapatan })}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                />
              )}

              {currentStep === 4 && (
                <Step4Pengeluaran
                  data={formData.pengeluaran}
                  onChange={(pengeluaran) => setFormData({ ...formData, pengeluaran })}
                  onCalculate={handleCalculate}
                  onBack={handlePrevStep}
                />
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <ResultView
            result={calculationResult}
            formData={formData}
            onEdit={() => setCurrentStep(1)}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer print-hide">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} CheckUangku - Financial Health Assessment Tool.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
