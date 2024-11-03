// src/components/Confirmation.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationProps {
  formData: any;
}

const Confirmation: React.FC<ConfirmationProps> = ({ formData }) => {
  return (
    <div className="text-center">
      <CheckCircle className="text-amber-500 mx-auto mb-4" size={64} />
      <h2 className="text-2xl font-bold mb-4 text-amber-600">Thank you for registering!</h2>
      <p className="mb-4">Your Church Camp registration has been successfully submitted.</p>
      <div className="bg-amber-50 p-4 rounded text-left">
        <h3 className="font-bold mb-2">Registration Summary</h3>
        <p>Name: {formData.personalInfo.fullName}</p>
        <p>Package Type: {formData.packageType === 'family' ? 'Family Package' : 'Individual Package'}</p>
        <p>Total Fee: RM {formData.totalFee.toFixed(2)}</p>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        We will contact you for payment processing.
      </p>
    </div>
  );
};

export default Confirmation;
