// frontend/src/App.tsx
import React, { useState } from 'react';
import ProgressIndicator from './components/ProgressIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import PersonalInfo from './components/PersonalInfo';
import PackageSelection from './components/PackageSelection';
import ReviewSubmit from './components/ReviewSubmit';
import Confirmation from './components/Confirmation';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({});

  const updateFormData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('There was an error submitting your registration. Please try again.');
    }
  };

  const handleEdit = () => {
    setCurrentStep(2); // Navigate back to the Personal Info step
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={5}
          goToStep={goToStep}
        />
        {currentStep === 1 && <WelcomeScreen onStart={() => setCurrentStep(2)} />}
        {currentStep === 2 && (
          <PersonalInfo
            formData={formData.personalInfo || {}}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(3)}
          />
        )}
        {currentStep === 3 && (
          <PackageSelection
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 4 && (
          <ReviewSubmit
            formData={formData}
            onSubmit={handleSubmit}
            onEdit={handleEdit} // Pass handleEdit here
          />
        )}
        {currentStep === 5 && <Confirmation formData={formData} />}
      </div>
    </div>
  );
};

export default App;
