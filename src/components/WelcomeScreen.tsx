// src/components/WelcomeScreen.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-amber-600">Welcome to the Church Camp Registration Portal!</h1>
      <p className="mb-6">Get started with your registration process.</p>
      <button
        onClick={onStart}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        Start Registration
        <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  );
};

export default WelcomeScreen;
