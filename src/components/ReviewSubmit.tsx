// frontend/src/components/ReviewSubmit.tsx
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface ReviewSubmitProps {
  formData: any;
  onSubmit: () => void;
  onEdit: () => void;
}

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ formData, onSubmit, onEdit }) => {
  const {
    personalInfo,
    packageType,
    familyMembers,
    individualCategory,
    totalFee,
    originalFee,
    hasFoodAllergies,
    foodAllergiesDetails,
    hasHealthConcerns,
    healthConcernsDetails,
    acceptsVeganMeal,
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
        <h3 className="font-bold mb-4 text-xl">Personal Information</h3>
        <p><strong>Full Name:</strong> {personalInfo.fullName}</p>
        <p><strong>Date of Birth:</strong> {personalInfo.dateOfBirth}</p>
        <p><strong>Gender:</strong> {personalInfo.gender}</p>
        <p><strong>Marital Status:</strong> {personalInfo.maritalStatus}</p>
        <p><strong>Phone Number:</strong> {personalInfo.phoneNumber}</p>
        {personalInfo.emergencyContact && (
          <p><strong>Emergency Contact:</strong> {personalInfo.emergencyContact}</p>
        )}
      </div>

      {/* Update the guardian section check */}
      {(personalInfo?.guardianName || formData.guardianInfo?.guardianName) && (
        <div className="bg-amber-50 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-xl">Guardian Information</h3>
          <p><strong>Guardian Name:</strong> {personalInfo?.guardianName || formData.guardianInfo?.guardianName}</p>
          <p><strong>Guardian Phone:</strong> {personalInfo?.guardianPhoneNumber || formData.guardianInfo?.guardianPhoneNumber}</p>
          <p><strong>Guardian Date of Birth:</strong> {personalInfo?.guardianDateOfBirth || formData.guardianInfo?.guardianDateOfBirth}</p>
          <p><strong>Relationship:</strong> {
            (personalInfo?.guardianRelationship || formData.guardianInfo?.guardianRelationship) === 'Other' 
              ? (personalInfo?.otherRelationship || formData.guardianInfo?.otherRelationship)
              : (personalInfo?.guardianRelationship || formData.guardianInfo?.guardianRelationship)
          }</p>
        </div>
      )}

      {/* Dietary Information */}
      {(additionalDietaryRestrictions || hasFoodAllergies || hasHealthConcerns) && (
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="font-bold mb-4 text-xl">Dietary Information</h3>
          <div className="space-y-2">
        {additionalDietaryRestrictions && (
          <p><strong>Additional Dietary Restrictions:</strong> {additionalDietaryRestrictions}</p>
        )}
        {hasFoodAllergies && (
          <p><strong>Food Allergies:</strong> {foodAllergiesDetails}</p>
        )}
        {hasHealthConcerns && (
          <p><strong>Health Concerns:</strong> {healthConcernsDetails}</p>
        )}
          </div>
        </div>
      )}

      {/* Package Information */}
      <div className="bg-amber-50 p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-xl">Package Information</h3>
        <p><strong>Package Type:</strong> {packageType === 'family' ? 'Family Package' : 'Individual Package'}</p>
        
        {packageType === 'family' ? (
          <>
            <p className="mt-4"><strong>Registrant Category:</strong> {getCategoryLabel(individualCategory)}</p>
            <p className="mt-2"><strong>Number of Family Members:</strong> {familyMembers.length}</p>
            <div className="mt-4 space-y-4">
              {familyMembers.map((member: any, index: number) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Family Member {index + 1}</h4>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {member.fullName}</p>
                    <p><strong>Date of Birth:</strong> {member.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {member.gender}</p>
                    <p><strong>Participant Category:</strong> {getCategoryLabel(member.type)}</p>
                    <p><strong>Accepts Vegan Meals:</strong> {member.acceptsVeganMeal ? 'Yes' : 'No'}</p>
                    {member.additionalDietaryRestrictions && (
                      <p><strong>Additional Dietary Restrictions:</strong> {member.additionalDietaryRestrictions}</p>
                    )}
                    {member.hasFoodAllergies && (
                      <p><strong>Food Allergies:</strong> {member.foodAllergiesDetails}</p>
                    )}
                    {member.hasHealthConcerns && (
                      <p><strong>Health Concerns:</strong> {member.healthConcernsDetails}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4"><strong>Participant Category:</strong> {getCategoryLabel(individualCategory)}</p>
        )}
      </div>

      {/* Total Fee */}
      <div className="bg-amber-50 p-6 rounded-lg shadow">
        <h3 className="font-bold mb-4 text-xl">Total Fee</h3>
        {packageType === 'individual' ? (
          <p className="text-2xl"><strong>RM {totalFee.toFixed(2)}</strong></p>
        ) : (
          <>
            <p className="text-xl"><strong>Original Fee:</strong> RM {originalFee.toFixed(2)}</p>
            {(() => {
              const headCount = familyMembers.length + 1; // +1 for the main registrant
              let discountPercentage = 0;
              if (headCount >= 5) discountPercentage = 20;
              else if (headCount === 4) discountPercentage = 15;
              else if (headCount === 3) discountPercentage = 10;
              
              return discountPercentage > 0 ? (
                <p className="text-2xl font-bold text-green-600 mt-2">
                  <strong>Discounted Fee ({discountPercentage}% off):</strong> RM {totalFee.toFixed(2)}
                </p>
              ) : (
                <p className="text-2xl font-bold mt-2">
                  <strong>Total Fee:</strong> RM {totalFee.toFixed(2)}</p>
              );
            })()}
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onEdit} // Correctly use onEdit
          className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <ArrowLeft className="mr-2" size={20} />
          Edit Information
        </button>
        <button
          onClick={onSubmit}
          className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Registration
          <Check className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
