import React from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import PhoneFrame from './components/PhoneFrame';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#100810] flex items-center justify-center">
      {/* Subtle ambient starfield background */}
      <ParticlesBackground />

      {/* Phone UI Container */}
      <PhoneFrame />
    </div>
  );
}
