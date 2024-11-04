// src/components/PackageSelection.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PackageSelectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface FamilyMember {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  type: string;
  hasFoodAllergies: boolean;
  foodAllergiesDetails: string;
  hasHealthConcerns: boolean;
  healthConcernsDetails: string;
  acceptsVeganMeal: boolean;
  additionalDietaryRestrictions: string;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  // State variables
  const [packageType, setPackageType] = useState(formData.packageType || '');
  const [individualCategory, setIndividualCategory] = useState(
    formData.individualCategory || ''
  );
  const [numFamilyMembers, setNumFamilyMembers] = useState(
    formData.familyMembers?.length || 0
  );
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(
    formData.familyMembers || []
  );
  const [totalFee, setTotalFee] = useState(formData.totalFee || 0);
  const [originalFee, setOriginalFee] = useState(formData.originalFee || 0);
  const [error, setError] = useState('');

  // New state variables for individual package
  const [hasFoodAllergies, setHasFoodAllergies] = useState(
    formData.hasFoodAllergies || false
  );
  const [foodAllergiesDetails, setFoodAllergiesDetails] = useState(
    formData.foodAllergiesDetails || ''
  );
  const [hasHealthConcerns, setHasHealthConcerns] = useState(
    formData.hasHealthConcerns || false
  );
  const [healthConcernsDetails, setHealthConcernsDetails] = useState(
    formData.healthConcernsDetails || ''
  );

  // Add new state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    foodAllergies: '',
    healthConcerns: '',
  });

  // Add new state variables for vegan meal confirmation
  const [acceptsVeganMeal, setAcceptsVeganMeal] = useState(
    formData.acceptsVeganMeal || false
  );
  const [additionalDietaryRestrictions, setAdditionalDietaryRestrictions] = useState(
    formData.additionalDietaryRestrictions || ''
  );

  // Check if guardian exists in personal info
  const hasGuardian = formData.personalInfo?.guardianName && 
                     formData.personalInfo?.guardianPhoneNumber;

  // Define category options
  const individualCategories = [
    { label: 'Aged 3-12', value: 'aged_3_12', fee: 110 },
    {
      label: 'Aged 12+ / Student / Homemaker / Ministry Worker',
      value: 'aged_12_plus',
      fee: 150,
    },
    { label: 'Working Adult', value: 'working_adult', fee: 190 },
  ];

  const familyRegistrantCategories = [
    {
      label: 'Aged 12+ / Student / Homemaker / Ministry Worker',
      value: 'aged_12_plus',
      fee: 150,
    },
    { label: 'Working Adult', value: 'working_adult', fee: 190 },
  ];

  const familyMemberCategories = [
    { label: 'Aged 2 and below', value: 'aged_2_below', fee: 0 },
    { label: 'Aged 3-12', value: 'aged_3_12', fee: 110 },
    {
      label: 'Aged 12+ / Student / Homemaker / Ministry Worker',
      value: 'aged_12_plus',
      fee: 150,
    },
    { label: 'Working Adult', value: 'working_adult', fee: 190 },
  ];

  useEffect(() => {
    calculateTotalFee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageType, individualCategory, familyMembers]);

  useEffect(() => {
    // If guardian exists, force individual package and age 3-12 category
    if (hasGuardian) {
      setPackageType('individual');
      setIndividualCategory('aged_3_12');
      calculateTotalFee();
    }
  }, [hasGuardian]);

  // Add this function to calculate the family discount
  const calculateFamilyDiscount = (headCount: number): number => {
    if (headCount >= 5) return 0.20; // 20% discount
    if (headCount === 4) return 0.15; // 15% discount
    if (headCount === 3) return 0.10; // 10% discount
    return 0; // no discount
  };

  // Calculate total fee based on selected package and categories
  const calculateTotalFee = () => {
    let fee = 0;
    let original = 0;

    if (packageType === 'individual') {
      const selectedCategory = individualCategories.find(
        (cat) => cat.value === individualCategory
      );
      if (selectedCategory) {
        fee = selectedCategory.fee;
        original = fee;
      }
    } else if (packageType === 'family') {
      const registrantCategory = familyRegistrantCategories.find(
        (cat) => cat.value === individualCategory
      );
      if (registrantCategory) {
        fee += registrantCategory.fee;
        original += registrantCategory.fee;
      }

      familyMembers.forEach((member) => {
        const memberCategory = familyMemberCategories.find(
          (cat) => cat.value === member.type
        );
        if (memberCategory) {
          fee += memberCategory.fee;
          original += memberCategory.fee;
        }
      });

      // Apply new discount logic
      const headCount = familyMembers.length + 1; // +1 for main registrant
      const discount = calculateFamilyDiscount(headCount);
      fee = original * (1 - discount);
    }

    setTotalFee(fee);
    setOriginalFee(original);
  };

  // Handle package type selection
  const handlePackageTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedPackage = e.target.value;
    setPackageType(selectedPackage);
    setIndividualCategory('');
    setNumFamilyMembers(0);
    setFamilyMembers([]);
    setTotalFee(0);
    setOriginalFee(0);
    setError('');
  };

  // Handle individual/family registrant category selection
  const handleIndividualCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIndividualCategory(e.target.value);
  };

  // Handle number of family members input
  const handleNumFamilyMembersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNum = Math.max(0, parseInt(e.target.value) || 0);
    setNumFamilyMembers(newNum);
    const newMembers = [...familyMembers];

    if (packageType === 'family') {
      if (newNum < 2) {
        setError('Family package requires at least 2 family members.');
      } else {
        setError('');
      }
    }

    if (newNum > familyMembers.length) {
      for (let i = familyMembers.length; i < newNum; i++) {
        newMembers.push({
          fullName: '',
          dateOfBirth: '',
          gender: '',
          type: '',
          hasFoodAllergies: false,
          foodAllergiesDetails: '',
          hasHealthConcerns: false,
          healthConcernsDetails: '',
          acceptsVeganMeal: false,
          additionalDietaryRestrictions: '',
        });
      }
    } else if (newNum < familyMembers.length) {
      newMembers.splice(newNum);
    }

    setFamilyMembers(newMembers);
  };

  // Handle family member details change
  const handleFamilyMemberChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedMembers = [...familyMembers];
    if (field === 'dateOfBirth') {
      // Ensure the date is not in the future
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate > today) {
        value = today.toISOString().split('T')[0];
      }
    }
    if (field === 'acceptsVeganMeal') {
      updatedMembers[index] = {
        ...updatedMembers[index],
        acceptsVeganMeal: value,
      };
    } else {
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    }
    setFamilyMembers(updatedMembers);
  };

  // Add validation function
  const hasValidationErrors = () => {
    const errors = {
      foodAllergies: '',
      healthConcerns: '',
    };

    if (hasFoodAllergies && !foodAllergiesDetails.trim()) {
      errors.foodAllergies = 'Please specify your food allergies';
    }

    if (hasHealthConcerns && !healthConcernsDetails.trim()) {
      errors.healthConcerns = 'Please specify your health concerns';
    }

    setValidationErrors(errors);

    return errors.foodAllergies || errors.healthConcerns;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasValidationErrors()) {
      return;
    }

    // Validation
    if (packageType === 'family') {
      if (numFamilyMembers < 2) {
        setError('Family package requires at least 2 family members.');
        return;
      }
      // Ensure all family members have selected a category
      for (let member of familyMembers) {
        if (!member.type) {
          setError('Please select a category for all family members.');
          return;
        }
      }
    }

    if (
      (packageType === 'individual' || packageType === 'family') &&
      !individualCategory
    ) {
      setError('Please select a participant category.');
      return;
    }

    updateFormData({
      packageType,
      individualCategory,
      hasFoodAllergies,
      foodAllergiesDetails,
      hasHealthConcerns,
      healthConcernsDetails,
      acceptsVeganMeal,
      additionalDietaryRestrictions,
      familyMembers,
      totalFee,
      originalFee,
    });
    onNext();
  };

  // Modify package type selection rendering
  const renderPackageTypeSelection = () => {
    if (hasGuardian) {
      return (
        <div>
          <label className="block mb-2 font-semibold">Package Type</label>
          <div className="space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="packageType"
                value="individual"
                checked={true}
                disabled
                className="form-radio h-5 w-5 text-amber-600"
              />
              <span className="ml-2">Individual</span>
            </label>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Package type is set to Individual as guardian information is provided
          </p>
        </div>
      );
    }

    return (
      <div>
        <label className="block mb-2 font-semibold">Package Type</label>
        <div className="space-x-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="packageType"
              value="individual"
              checked={packageType === 'individual'}
              onChange={handlePackageTypeChange}
              required
              className="form-radio h-5 w-5 text-amber-600"
            />
            <span className="ml-2">Individual</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="packageType"
              value="family"
              checked={packageType === 'family'}
              onChange={handlePackageTypeChange}
              required
              className="form-radio h-5 w-5 text-amber-600"
            />
            <span className="ml-2">Family</span>
          </label>
        </div>
      </div>
    );
  };

  // Modify category selection rendering
  const renderCategorySelection = () => {
    if (hasGuardian) {
      return (
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <div className="space-y-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="individualCategory"
                value="aged_3_12"
                checked={true}
                disabled
                className="form-radio h-5 w-5 text-amber-600"
              />
              <span className="ml-2">
                Aged 3-12 (RM 110)
              </span>
            </label>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Category is automatically set as guardian information is provided
          </p>
        </div>
      );
    }

    return (
      <div>
        <label className="block mb-2 font-semibold">
          What is your Category?
        </label>
        <div className="space-y-4">
          {individualCategories.map((category) => (
            <label
              key={category.value}
              className="inline-flex items-center"
            >
              <input
                type="radio"
                name="individualCategory"
                value={category.value}
                checked={individualCategory === category.value}
                onChange={handleIndividualCategoryChange}
                required
                className="form-radio h-5 w-5 text-amber-600"
              />
              <span className="ml-2">
                {category.label} (RM {category.fee})
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Modify the health-related checkboxes section in the render
  const renderHealthSection = () => (
    <>
      {/* Food Allergies Checkbox */}
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={hasFoodAllergies}
            onChange={(e) => {
              setHasFoodAllergies(e.target.checked);
              if (!e.target.checked) {
                setFoodAllergiesDetails('');
                setValidationErrors(prev => ({ ...prev, foodAllergies: '' }));
              }
            }}
            className="form-checkbox h-5 w-5 text-amber-600"
          />
          <span className="ml-2">I have food allergies</span>
        </label>
        {hasFoodAllergies && (
          <div className="mt-2">
            <label className="block mb-1 font-medium">
              Please specify your food allergies
            </label>
            <textarea
              value={foodAllergiesDetails}
              onChange={(e) => {
                setFoodAllergiesDetails(e.target.value);
                if (e.target.value.trim()) {
                  setValidationErrors(prev => ({ ...prev, foodAllergies: '' }));
                }
              }}
              className={`w-full p-2 border rounded-lg ${
                validationErrors.foodAllergies ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {validationErrors.foodAllergies && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.foodAllergies}</p>
            )}
          </div>
        )}
      </div>

      {/* Health Concerns Checkbox */}
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={hasHealthConcerns}
            onChange={(e) => {
              setHasHealthConcerns(e.target.checked);
              if (!e.target.checked) {
                setHealthConcernsDetails('');
                setValidationErrors(prev => ({ ...prev, healthConcerns: '' }));
              }
            }}
            className="form-checkbox h-5 w-5 text-amber-600"
          />
          <span className="ml-2">I have health concerns</span>
        </label>
        {hasHealthConcerns && (
          <div className="mt-2">
            <label className="block mb-1 font-medium">
              Please specify your health concerns
            </label>
            <textarea
              value={healthConcernsDetails}
              onChange={(e) => {
                setHealthConcernsDetails(e.target.value);
                if (e.target.value.trim()) {
                  setValidationErrors(prev => ({ ...prev, healthConcerns: '' }));
                }
              }}
              className={`w-full p-2 border rounded-lg ${
                validationErrors.healthConcerns ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {validationErrors.healthConcerns && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.healthConcerns}</p>
            )}
          </div>
        )}
      </div>
    </>
  );

  // Add a new render function for vegan meal confirmation
  const renderVeganMealConfirmation = () => (
    <div className="bg-green-50 p-4 rounded-lg mt-6">
      <h4 className="font-semibold text-lg mb-2">Meal Information</h4>
      <p className="text-sm text-gray-600 mb-4">
        All meals provided will be vegan-friendly to ensure inclusivity for all participants.
      </p>
      
      <div className="space-y-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={acceptsVeganMeal}
            onChange={(e) => setAcceptsVeganMeal(e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
            required
          />
          <span className="ml-2">
            I understand and accept that all meals will be vegan-friendly
          </span>
        </label>

        <div>
          <label className="block mb-1 font-medium">
            Additional Dietary Restrictions or Concerns (Optional)
          </label>
          <textarea
            value={additionalDietaryRestrictions}
            onChange={(e) => setAdditionalDietaryRestrictions(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={2}
            placeholder="Please specify any additional dietary restrictions or concerns"
          />
        </div>
      </div>
    </div>
  );

  // Modify the navigation buttons section
  const isNextButtonDisabled = () => {
    if (packageType === 'family' && numFamilyMembers < 2) return true;
    if (hasFoodAllergies && !foodAllergiesDetails.trim()) return true;
    if (hasHealthConcerns && !healthConcernsDetails.trim()) return true;
    if (!acceptsVeganMeal) return true;
    return false;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">
        Package Selection
      </h2>

      {renderPackageTypeSelection()}

      {/* Individual Package Selection */}
      {packageType === 'individual' && (
        <div>
          {renderCategorySelection()}
          {renderVeganMealConfirmation()}
          {renderHealthSection()}
        </div>
      )}

      {/* Family Package Selection */}
      {!hasGuardian && packageType === 'family' && (
        <>
          {/* Registrant Category Selection */}
          <div>
            <label className="block mb-2 font-semibold">
              What is your Category?
            </label>
            <div className="space-y-4">
              {familyRegistrantCategories.map((category) => (
                <label
                  key={category.value}
                  className="inline-flex items-center"
                >
                  <input
                    type="radio"
                    name="individualCategory"
                    value={category.value}
                    checked={individualCategory === category.value}
                    onChange={handleIndividualCategoryChange}
                    required
                    className="form-radio h-5 w-5 text-amber-600"
                  />
                  <span className="ml-2">
                    {category.label} (RM {category.fee})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Number of Family Members */}
          <div>
            <label
              htmlFor="numFamilyMembers"
              className="block mb-2 font-semibold"
            >
              Number of Family Members (Excluding You)
            </label>
            <input
              type="number"
              id="numFamilyMembers"
              value={numFamilyMembers}
              onChange={handleNumFamilyMembersChange}
              min="0"
              className="w-full p-3 border rounded-lg"
              required={packageType === 'family'}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {/* Family Members Details */}
          {packageType === 'family' && numFamilyMembers > 0 && (
            <div className="space-y-6">
              {familyMembers.map((member: FamilyMember, index: number) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <h3 className="text-lg font-semibold mb-3">
                    Family Member {index + 1}
                  </h3>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={member.fullName}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            'fullName',
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={member.dateOfBirth}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            'dateOfBirth',
                            e.target.value
                          )
                        }
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Gender
                      </label>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="Male"
                            checked={member.gender === 'Male'}
                            onChange={(e) =>
                              handleFamilyMemberChange(
                                index,
                                'gender',
                                e.target.value
                              )
                            }
                            className="form-radio h-5 w-5 text-amber-600"
                            required
                          />
                          <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="Female"
                            checked={member.gender === 'Female'}
                            onChange={(e) =>
                              handleFamilyMemberChange(
                                index,
                                'gender',
                                e.target.value
                              )
                            }
                            className="form-radio h-5 w-5 text-amber-600"
                            required
                          />
                          <span className="ml-2">Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Participant Category */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Participant Category
                      </label>
                      <select
                        value={member.type}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            'type',
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        <option value="">Select Category</option>
                        {familyMemberCategories.map((category) => (
                          <option
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}{' '}
                            {category.fee > 0
                              ? `(RM ${category.fee})`
                              : '(FREE)'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Food Allergies Checkbox */}
                    <div className="mt-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={member.hasFoodAllergies || false}
                          onChange={(e) =>
                            handleFamilyMemberChange(
                              index,
                              'hasFoodAllergies',
                              e.target.checked
                            )
                          }
                          className="form-checkbox h-5 w-5 text-amber-600"
                        />
                        <span className="ml-2">Has food allergies</span>
                      </label>
                      {member.hasFoodAllergies && (
                        <div className="mt-2">
                          <label className="block mb-1 font-medium">
                            Please specify food allergies
                          </label>
                          <textarea
                            value={member.foodAllergiesDetails || ''}
                            onChange={(e) =>
                              handleFamilyMemberChange(
                                index,
                                'foodAllergiesDetails',
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>

                    {/* Health Concerns Checkbox */}
                    <div className="mt-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={member.hasHealthConcerns || false}
                          onChange={(e) =>
                            handleFamilyMemberChange(
                              index,
                              'hasHealthConcerns',
                              e.target.checked
                            )
                          }
                          className="form-checkbox h-5 w-5 text-amber-600"
                        />
                        <span className="ml-2">Has health concerns</span>
                      </label>
                      {member.hasHealthConcerns && (
                        <div className="mt-2">
                          <label className="block mb-1 font-medium">
                            Please specify health concerns
                          </label>
                          <textarea
                            value={member.healthConcernsDetails || ''}
                            onChange={(e) =>
                              handleFamilyMemberChange(
                                index,
                                'healthConcernsDetails',
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>

                    {/* Add vegan meal confirmation for family member */}
                    <div className="mt-4 bg-green-50 p-4 rounded-lg">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={member.acceptsVeganMeal || false}
                          onChange={(e) =>
                            handleFamilyMemberChange(
                              index,
                              'acceptsVeganMeal',
                              e.target.checked
                            )
                          }
                          className="form-checkbox h-5 w-5 text-green-600"
                          required
                        />
                        <span className="ml-2">
                          Accepts vegan-friendly meals
                        </span>
                      </label>
                      
                      <div className="mt-2">
                        <label className="block mb-1 font-medium">
                          Additional Dietary Restrictions (Optional)
                        </label>
                        <textarea
                          value={member.additionalDietaryRestrictions || ''}
                          onChange={(e) =>
                            handleFamilyMemberChange(
                              index,
                              'additionalDietaryRestrictions',
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded-lg"
                          rows={2}
                          placeholder="Please specify any additional dietary restrictions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Total Fee Display */}
      <div className="bg-amber-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Total Fee</h3>
        {packageType === 'individual' && (
          <p className="text-2xl">RM {totalFee.toFixed(2)}</p>
        )}
        {packageType === 'family' && (
          <>
            <p className="text-xl">
              Original Fee: RM {originalFee.toFixed(2)}
            </p>
            <p className="text-2xl font-bold text-green-600">
              Discounted Fee: RM {totalFee.toFixed(2)}
            </p>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <ArrowLeft className="mr-2" size={20} />
          Previous
        </button>
        <button
          type="submit"
          className={`flex items-center ${
            isNextButtonDisabled()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600'
          } text-white font-bold py-2 px-4 rounded`}
          disabled={isNextButtonDisabled()}
        >
          Next
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </form>
  );
};

export default PackageSelection;
