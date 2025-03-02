// src/components/WelcomeScreen.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import CC640x360 from '../assets/CC640x360.png';
import CC1280x720 from '../assets/CC1280x720.png';
import CC1920x1080 from '../assets/CC1920x1080.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <img
        src={CC640x360}
        srcSet={`${CC640x360} 640w, ${CC1280x720} 1280w, ${CC1920x1080} 1920w`}
        sizes="(max-width: 640px) 640w, (max-width: 1280px) 1280w, 1920w"
        alt="Welcome"
        className="mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-amber-600">
        Welcome to the Church Camp Registration Portal!
      </h1>

      <div className="text-left mb-8 space-y-6">
        <section className="bg-amber-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-amber-700">Important Information</h2>
          <p className="text-gray-700 mb-4">
            Please read through the registration details carefully before proceeding.
          </p>
          
          <div className="space-y-2 text-gray-600">
            <p>🗓️ Camp Dates: 30 March - 1 April, 2025</p>
            <p>📍 Venue: Methodist Centre, Cameron Highlands</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-amber-200">
          <h2 className="text-xl font-semibold mb-3 text-amber-700">Registration Categories & Pricing</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-amber-600">Individual Packages</h3>
              <ul className="list-disc list-inside space-y-2 mt-2 text-gray-600">
                <li>Working Adult: RM 190</li>
                <li>Children (3-12 years): RM 110</li>
                <li>Ministy Workers | Homemakers | Students: RM 150</li>
                <li>Toddlers (3 years and below): Free</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-amber-600">Family Package Discounts</h3>
              <ul className="list-disc list-inside space-y-2 mt-2 text-gray-600">
                <li>Family of 3: 10% off total</li>
                <li>Family of 4: 15% off total</li>
                <li>Family of 5+: 20%+ off total</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-amber-700">Important Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Emergency contact information is mandatory for all participants</li>
            <li>All participants must provide valid contact information</li>
            <li>Please indicate any dietary restrictions or health concerns during registration</li>
            <li>Children under 12 without a parent must register with a guardian who is 18 years or older</li>
          </ul>
        </section>
      </div>

      <button
        onClick={onStart}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center text-lg"
      >
        Start Registration
        <ArrowRight className="ml-2" size={24} />
      </button>
    </div>
  );
};

export default WelcomeScreen;