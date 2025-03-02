// frontend/src/components/ReviewSubmit.tsx
import React, { useState } from 'react';
import { ArrowLeft, Check, Loader } from 'lucide-react';

interface ReviewSubmitProps {
  formData: any;
  onSubmit: () => void;
  onEdit: () => void;
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ formData, onSubmit, onEdit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    personalInfo,
    packageType,
    familyMembers,
    individualCategory,
    totalFee,
    originalFee,
    hasAllergies,
    allergiesDetails,
    hasMedicalConditions,
    medicalConditionsDetails,
    additionalDietaryRestrictions,
  } = formData;

  // Helper function to get category label from value
  const getCategoryLabel = (value: string) => {
    const categories = [
      { label: 'Aged 2 and below', value: 'aged_2_below' },
      { label: 'Aged 3-12', value: 'aged_3_12' },
      { label: 'Aged 12+ / Student / Homemaker / Ministry Worker', value: 'aged_12_plus' },
      { label: 'Working Adult', value: 'working_adult' },
    ];
    const category = categories.find(cat => cat.value === value);
    return category ? category.label : value;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">Review and Submit</h2>
      <h4 className="text-lg italic mb-4 text-green-800">Please take a screenshot of this information for your own convenience.</h4>

      {/* Personal Information */}
      <div className="bg-amber-50 p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-xl text-amber-700">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <p><strong>Full Name:</strong> {personalInfo.fullName}</p>
          <p><strong>Date of Birth:</strong> {personalInfo.dateOfBirth}</p>
          <p><strong>Gender:</strong> {personalInfo.gender}</p>
          <p><strong>Marital Status:</strong> {personalInfo.maritalStatus}</p>
          <p><strong>Phone Number:</strong> {personalInfo.phoneNumber}</p>
          {personalInfo.emergencyContact && (
            <p><strong>Emergency Contact:</strong> {personalInfo.emergencyContact}</p>
          )}
          {personalInfo.emergencyContactName && (
            <p><strong>Emergency Contact Name:</strong> {personalInfo.emergencyContactName}</p>
          )}
        </div>
      </div>

      {/* Update the guardian section check */}
      {(personalInfo?.guardianName || formData.guardianInfo?.guardianName) && (
        <div className="bg-amber-50 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-xl text-amber-700">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <p><strong>Guardian Name:</strong> {personalInfo?.guardianName || formData.guardianInfo?.guardianName}</p>
            <p><strong>Guardian Phone:</strong> {personalInfo?.guardianPhoneNumber || formData.guardianInfo?.guardianPhoneNumber}</p>
            <p><strong>Guardian Date of Birth:</strong> {personalInfo?.guardianDateOfBirth || formData.guardianInfo?.guardianDateOfBirth}</p>
            <p><strong>Relationship:</strong> {
              (personalInfo?.guardianRelationship || formData.guardianInfo?.guardianRelationship) === 'Other' 
                ? (personalInfo?.otherRelationship || formData.guardianInfo?.otherRelationship)
                : (personalInfo?.guardianRelationship || formData.guardianInfo?.guardianRelationship)
            }</p>
          </div>
        </div>
      )}

      {/* Dietary Information */}
      {(additionalDietaryRestrictions || hasAllergies || hasMedicalConditions) && (
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-xl text-green-700">Dietary and Health Information</h3>
          <div className="space-y-3">
            {additionalDietaryRestrictions && (
              <div className="p-3 bg-white rounded-md">
                <p><strong>Additional Dietary Restrictions:</strong> {additionalDietaryRestrictions}</p>
              </div>
            )}
            {hasAllergies && (
              <div className="p-3 bg-white rounded-md">
                <p><strong>Allergies:</strong> {allergiesDetails}</p>
              </div>
            )}
            {hasMedicalConditions && (
              <div className="p-3 bg-white rounded-md">
                <p><strong>Medical Conditions:</strong> {medicalConditionsDetails}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Package Information */}
      <div className="bg-amber-50 p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-xl text-amber-700">Package Information</h3>
        <p className="font-medium text-lg">{packageType === 'family' ? 'Family Package' : 'Individual Package'}</p>
        
        {packageType === 'family' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-4 rounded-lg">
              <p><strong>Registrant Category:</strong> {getCategoryLabel(individualCategory)}</p>
              <p><strong>Number of Family Members:</strong> {familyMembers.length}</p>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {familyMembers.map((member: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-3 pb-2 border-b text-amber-600">Family Member {index + 1}</h4>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {member.fullName}</p>
                    <p><strong>Date of Birth:</strong> {member.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {member.gender}</p>
                    <p><strong>Category:</strong> {getCategoryLabel(member.type)}</p>
                    <p><strong>Vegan Meals:</strong> {member.acceptsVeganMeal ? 'Accepted' : 'Not accepted'}</p>
                    
                    {member.additionalDietaryRestrictions && (
                      <div className="mt-2 p-2 bg-green-50 rounded-md">
                        <p><strong>Dietary Restrictions:</strong> {member.additionalDietaryRestrictions}</p>
                      </div>
                    )}
                    {member.hasAllergies && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                        <p><strong>Allergies:</strong> {member.allergiesDetails}</p>
                      </div>
                    )}
                    {member.hasMedicalConditions && (
                      <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                        <p><strong>Medical Conditions:</strong> {member.medicalConditionsDetails}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-4 bg-white p-4 rounded-lg">
            <p><strong>Participant Category:</strong> {getCategoryLabel(individualCategory)}</p>
          </div>
        )}
      </div>

      {/* Total Fee */}
      <div className="bg-amber-50 p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-xl text-amber-700">Total Fee</h3>
        {packageType === 'individual' ? (
          <p className="text-2xl font-bold"><span className="text-green-700">RM {totalFee.toFixed(2)}</span></p>
        ) : (
          <div className="space-y-2">
            <p className="text-xl"><strong>Original Fee:</strong> RM {originalFee.toFixed(2)}</p>
            {(() => {
              const headCount = familyMembers.length + 1; // +1 for the main registrant
              let discountPercentage = 0;
              if (headCount >= 5) discountPercentage = 20;
              else if (headCount === 4) discountPercentage = 15;
              else if (headCount === 3) discountPercentage = 10;
              
              return discountPercentage > 0 ? (
                <div className="p-4 bg-green-50 rounded-lg mt-2">
                  <p className="text-lg">Family discount: <strong>{discountPercentage}% off</strong></p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    Final price: <strong>RM {totalFee.toFixed(2)}</strong>
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold mt-2">
                  <strong>Total Fee:</strong> RM {totalFee.toFixed(2)}</p>
              );
            })()}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 mt-6 border-t border-gray-200">
        <button
          onClick={onEdit}
          disabled={isSubmitting}
          className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="mr-2" size={20} />
          Edit Information
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            <>
              Submit Registration
              <Check className="ml-2" size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
