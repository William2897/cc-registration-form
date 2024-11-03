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
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);

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
      }));

      // Set emergency contact visibility based on age
      if (formData.dateOfBirth) {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        setShowEmergencyContact(age < 18);
      }
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors: any = {};
    if (!/^[a-zA-Z\s]+$/.test(personalInfo.fullName)) {
      newErrors.fullName = 'Full name must contain only alphabetic characters';
    }
    if (!personalInfo.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(personalInfo.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 12) {
        newErrors.dateOfBirth = 'Users under 12 Years need a parent/ guardiant to must register.';
      }
    }
    if (!personalInfo.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!personalInfo.maritalStatus) {
      newErrors.maritalStatus = 'Marital status is required';
    }
    if (!personalInfo.phoneNumber || personalInfo.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Valid phone number is required';
    }
    if (showEmergencyContact && (!personalInfo.emergencyContact || personalInfo.emergencyContact.length < 10)) {
      newErrors.emergencyContact = 'Valid emergency contact is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setShowEmergencyContact(age < 18);
      if (age >= 18) {
        setPersonalInfo(prevInfo => ({ ...prevInfo, emergencyContact: '' }));
      }
    }
    setPersonalInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateFormData({ personalInfo });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">Personal Information</h2>
      
      <div>
        <label htmlFor="fullName" className="block mb-1">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth</label>
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
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className="block mb-1">Gender</label>
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={personalInfo.gender === 'Male'}
              onChange={handleChange}
              required
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={personalInfo.gender === 'Female'}
              onChange={handleChange}
              required
            /> Female
          </label>
        </div>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>

      <div>
        <label htmlFor="maritalStatus" className="block mb-1">Marital Status</label>
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
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
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
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>

      {showEmergencyContact && (
        <div>
          <label htmlFor="emergencyContact" className="block mb-1">Emergency Contact</label>
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
          {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
        </div>
      )}

      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        Next
        <ArrowRight className="ml-2" size={20} />
      </button>
    </form>
  );
};

export default PersonalInfo;
