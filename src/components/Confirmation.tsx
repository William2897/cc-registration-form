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
      <div className="mt-4 text-sm text-gray-600 text-left bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-2">Payment Instructions</h3>
        <p className="mb-2">You have two options to complete your payment:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Wait for our registration team to contact you regarding payment processing.</li>
          <li>
            Pay directly through <a href="https://adventistgiving.org.my/" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">AdventistGiving.org.my</a>:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Select "Damansara Adventist Hope Centre"</li>
              <li>Navigate to the Church Camp option under the local church section</li>
              <li>Enter your payment amount of RM {formData.totalFee.toFixed(2)}</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Confirmation;
