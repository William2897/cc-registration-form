import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, goToStep }) => {
  const steps = ['Welcome', 'Personal Info', 'Package', 'Review', 'Confirmation'];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.slice(0, totalSteps).map((stepLabel, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => index + 1 < currentStep && goToStep(index + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep
                  ? 'bg-amber-500 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={index + 1 > currentStep}
              aria-label={`Step ${index + 1}: ${stepLabel}`}
              title={stepLabel}
            >
              {index + 1}
            </button>
            <span className="text-xs text-center mt-2">{stepLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
