// src/components/PersonalInfo.tsx

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PersonalInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, updateFormData, onNext }) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyContactName: '',
    isGuardian: false,
    guardianName: '',
    guardianPhoneNumber: '',
    guardianRelationship: '',
    guardianDateOfBirth: '',
    otherRelationship: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Initialize form data from props
    if (formData) {
      setPersonalInfo(prevInfo => ({
        ...prevInfo,
        fullName: formData.fullName || '',
        dateOfBirth: formData.dateOfBirth || '',
        gender: formData.gender || '',
        maritalStatus: formData.maritalStatus || '',
        phoneNumber: formData.phoneNumber || '',
        emergencyContact: formData.emergencyContact || '',
        emergencyContactName: formData.emergencyContactName || '',
        guardianName: formData.guardianName || '',
        guardianPhoneNumber: formData.guardianPhoneNumber || '',
        guardianRelationship: formData.guardianRelationship || '',
        guardianDateOfBirth: formData.guardianDateOfBirth || '',
        otherRelationship: formData.otherRelationship || '',
      }));
    }
  }, [formData]);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const isGuardianAgeValid = (birthDate: string) => {
    const age = calculateAge(birthDate);
    return age >= 18;
  };

  const validateForm = () => {
    const newErrors: any = {};
    const age = calculateAge(personalInfo.dateOfBirth);

    // Validate Full Name
    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(personalInfo.fullName)) {
      newErrors.fullName = 'Full name must contain only alphabetic characters';
    }

    // Validate Date of Birth
    if (!personalInfo.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Validate Gender
    if (!personalInfo.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Validate Marital Status
    if (!personalInfo.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required';
    }

    // Validate Phone Number
    if (!personalInfo.phoneNumber || personalInfo.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Valid phone number is required';
    }

    // Validate Emergency Contact (Now Mandatory for All)
    if (!personalInfo.emergencyContact || personalInfo.emergencyContact.replace(/\D/g, '').length < 10) {
      newErrors.emergencyContact = 'Valid emergency contact is required';
    }

    // Validate Emergency Contact Name
    if (!personalInfo.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(personalInfo.emergencyContactName)) {
      newErrors.emergencyContactName = 'Emergency contact name must contain only alphabetic characters';
    }

    if (age < 12) {
      // Validate Guardian Information
      if (!personalInfo.guardianName.trim()) {
        newErrors.guardianName = 'Guardian name is required for participants under 12';
      } else if (!/^[a-zA-Z\s]+$/.test(personalInfo.guardianName)) {
        newErrors.guardianName = 'Guardian name must contain only alphabetic characters';
      }

      if (!personalInfo.guardianPhoneNumber || personalInfo.guardianPhoneNumber.replace(/\D/g, '').length < 10) {
        newErrors.guardianPhoneNumber = 'Valid guardian phone number is required for participants under 12';
      }

      if (!personalInfo.guardianDateOfBirth) {
        newErrors.guardianDateOfBirth = 'Guardian date of birth is required';
      } else if (!isGuardianAgeValid(personalInfo.guardianDateOfBirth)) {
        newErrors.guardianDateOfBirth = 'Guardian must be at least 18 years old';
      }

      if (!personalInfo.guardianRelationship) {
        newErrors.guardianRelationship = 'Guardian relationship is required';
      }

      if (personalInfo.guardianRelationship === 'Other' && !personalInfo.otherRelationship.trim()) {
        newErrors.otherRelationship = 'Please specify the relationship';
      }

      // If any guardian-related errors exist, optionally set a general error
      const guardianErrors = [
        newErrors.guardianName,
        newErrors.guardianPhoneNumber,
        newErrors.guardianDateOfBirth,
        newErrors.guardianRelationship,
        newErrors.otherRelationship,
      ].filter(Boolean);

      if (guardianErrors.length > 0) {
        newErrors.guardianInfo = 'Please provide valid guardian information';
      }
    }

    setErrors(newErrors);

    // Determine if the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const age = calculateAge(personalInfo.dateOfBirth);
      updateFormData({
        ...formData,
        personalInfo: {
          ...personalInfo,
          age,
        },
      });
      onNext();
    }
  };

  const age = personalInfo.dateOfBirth ? calculateAge(personalInfo.dateOfBirth) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-amber-600">Personal Information</h2>
      
      {/* Main form fields in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="fullName" className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded"
            required
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={personalInfo.gender === 'Male'}
                onChange={handleChange}
                required
                className="mr-1"
              /> Male
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={personalInfo.gender === 'Female'}
                onChange={handleChange}
                required
                className="mr-1"
              /> Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label htmlFor="maritalStatus" className="block mb-1 font-medium">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={personalInfo.maritalStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block mb-1 font-medium">Phone Number</label>
          <PhoneInput
            country={'my'}
            value={personalInfo.phoneNumber}
            onChange={(phone) => setPersonalInfo(prev => ({ ...prev, phoneNumber: phone }))}
            inputProps={{
              required: true,
              className: 'w-full p-2 border rounded',
              placeholder: '+60 12-345 6789'
            }}
            containerClass={`phone-input ${errors.phoneNumber ? 'error' : ''}`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor="emergencyContact" className="block mb-1 font-medium">Emergency Contact</label>
          <PhoneInput
            country={'my'}
            value={personalInfo.emergencyContact}
            onChange={(phone) => setPersonalInfo(prev => ({ ...prev, emergencyContact: phone }))}
            inputProps={{
              required: true,
              className: 'w-full p-2 border rounded',
              placeholder: '+60 12-345 6789'
            }}
            containerClass={`phone-input ${errors.emergencyContact ? 'error' : ''}`}
          />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
        </div>

        <div>
          <label htmlFor="emergencyContactName" className="block mb-1 font-medium">Emergency Contact Name</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={personalInfo.emergencyContactName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
        </div>
      </div>

      {age !== null && age < 12 && (
        <div className="bg-amber-50 p-5 rounded-lg mt-8">
          <h3 className="font-semibold text-lg mb-3 text-amber-700">Guardian Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Required for participants under 12 years old
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block mb-1 font-medium">Guardian Full Name</label>
              <input
                type="text"
                name="guardianName"
                value={personalInfo.guardianName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {errors.guardianName && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianName}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Guardian Date of Birth</label>
              <input
                type="date"
                name="guardianDateOfBirth"
                value={personalInfo.guardianDateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border rounded"
                required
              />
              {errors.guardianDateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianDateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Guardian Phone Number</label>
              <PhoneInput
                country={'my'}
                value={personalInfo.guardianPhoneNumber}
                onChange={(phone) => setPersonalInfo(prev => ({
                  ...prev,
                  guardianPhoneNumber: phone,
                  isGuardian: true
                }))}
                inputProps={{
                  required: true,
                  className: 'w-full p-2 border rounded'
                }}
                containerClass={`phone-input ${errors.guardianPhoneNumber ? 'error' : ''}`}
              />
              {errors.guardianPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianPhoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Relationship to Participant</label>
              <select
                name="guardianRelationship"
                value={personalInfo.guardianRelationship}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select relationship...</option>
                <option value="Parent">Parent</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Other">Other</option>
              </select>
              {errors.guardianRelationship && (
                <p className="text-red-500 text-sm mt-1">{errors.guardianRelationship}</p>
              )}
            </div>

            {personalInfo.guardianRelationship === 'Other' && (
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Please Specify Relationship</label>
                <input
                  type="text"
                  name="otherRelationship"
                  value={personalInfo.otherRelationship}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                {errors.otherRelationship && (
                  <p className="text-red-500 text-sm mt-1">{errors.otherRelationship}</p>
                )}
              </div>
            )}

            {errors.guardianInfo && (
              <p className="text-red-500 text-sm col-span-2">{errors.guardianInfo}</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors"
        >
          Next
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
