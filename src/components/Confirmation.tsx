// src/components/Confirmation.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationProps {
  formData: any;
}

const Confirmation: React.FC<ConfirmationProps> = ({ formData }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="mb-8">
        <CheckCircle className="text-amber-500 mx-auto mb-4" size={80} />
        <h2 className="text-3xl font-bold mb-4 text-amber-600">Thank you for registering!</h2>
        <p className="text-lg mb-4">Your Church Camp registration has been successfully submitted.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl mb-4 text-amber-700 text-left">Registration Summary</h3>
          <div className="text-left space-y-2">
            <p><strong>Name:</strong> {formData.personalInfo.fullName}</p>
            <p><strong>Package Type:</strong> {formData.packageType === 'family' ? 'Family Package' : 'Individual Package'}</p>
            {formData.packageType === 'family' && (
              <p><strong>Family Size:</strong> {formData.familyMembers.length + 1} members</p>
            )}
            <p className="text-lg font-semibold text-green-700 pt-2 border-t mt-2">
              <strong>Total Fee:</strong> RM {formData.totalFee.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl mb-4 text-blue-700 text-left">What's Next?</h3>
          <div className="text-left">
            <p className="mb-3">Please complete your payment to confirm your spot.</p>
            <p className="mb-3">A confirmation email will be sent to you shortly with these details.</p>
            <p>For any inquiries, please contact the registration team at:</p>
            <p className="font-medium mt-1">
              <a href="tel:+60 11-1988 7239" className="text-blue-600 hover:underline">+60 11-1988 7239</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-xl mb-4 text-gray-800 text-left">Payment Instructions</h3>
        <div className="text-left">
          <p className="mb-4">You have two options to complete your payment:</p>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 flex items-center">
                <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                Direct Contact
              </h4>
              <p>Wait for our registration team to contact you regarding payment processing.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 flex items-center">
                <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                Online Payment
              </h4>
              <p className="mb-2">
                Pay directly through <a href="https://adventistgiving.org.my/" className="text-amber-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">AdventistGiving.org.my</a>
              </p>
              <ul className="list-disc list-inside ml-1 space-y-1 text-gray-700">
                <li>Select "Damansara Adventist Hope Centre"</li>
                <li>Navigate to the Church Camp option under the local church section</li>
                <li>Enter your payment amount of <span className="font-medium">RM {formData.totalFee.toFixed(2)}</span></li>
                <li>Send your proof of payment to Kimberly (<a href="tel:+60 11-1988 7239" className="text-amber-600 hover:underline">+60 11-1988 7239</a>)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-gray-600">
        <p>We're excited to see you at the Church Camp!</p>
        <p className="mt-1">30 March - 1 April, 2025 at Methodist Centre, Cameron Highlands</p>
      </div>
    </div>
  );
};

export default Confirmation;
