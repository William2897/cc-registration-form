// src/components/WelcomeScreen.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import CC640X360 from '../assets/CC640X360.png';
import CC1280x720 from '../assets/CC1280x720.png';
import CC1920x1080 from '../assets/CC1920x1080.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <img
        src={CC640X360}
        srcSet={`${CC640X360} 640w, ${CC1280x720} 1280w, ${CC1920x1080} 1920w`}
        sizes="(max-width: 640px) 640w, (max-width: 1280px) 1280w, 1920w"
        alt="Welcome"
        className="mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-amber-600">
        Welcome to the Church Camp Registration Portal!
      </h1>
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