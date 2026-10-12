import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Key
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

export default function SpecialReasonsApp({ onBack, onUnlockFragment }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState({});

  const currentReason = CONFIG.SPECIAL_REASONS[currentIndex];

  const handleNext = () => {
    soundSynth.playTap();
    setCurrentIndex((prev) => (prev < CONFIG.SPECIAL_REASONS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    soundSynth.playTap();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : CONFIG.SPECIAL_REASONS.length - 1));
  };

  const handleFlipCard = (id) => {
    soundSynth.playTap();
    setFlipped((prev) => {
      const nextState = { ...prev, [id]: !prev[id] };
      if (id === 6 && onUnlockFragment) onUnlockFragment(3);
      return nextState;
    });
  };

  return (
    <div className="screen-container reasons-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
      {/* App Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundSynth.playTap(); onBack(); }}
            className="app-back-btn p-1.5 rounded-full hover:bg-[#FF5C93]/10 active:scale-90 transition text-[#C8A0B0]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8]">Special Reasons 💖</h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0]">Why You Mean The World</p>
          </div>
        </div>

        <div className="app-badge px-2.5 py-1 rounded-full bg-[#2C1422] border border-[#FF5C93]/12 text-[10px] text-[#C8A0B0] font-mono">
          {currentIndex + 1} / {CONFIG.SPECIAL_REASONS.length}
        </div>
      </div>

      {/* Main Card Viewport */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 bg-[#100810] overflow-y-auto">
        <div className="w-full flex-1 flex items-center justify-center py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={() => handleFlipCard(currentReason.id)}
              className="reasons-card relative w-full max-w-[310px] min-h-[340px] rounded-3xl p-5 flex flex-col justify-between cursor-pointer border border-[#FF5C93]/10 bg-[#1E0D18] shadow-lg hover:border-[#FF5C93]/40 hover:shadow-[0_0_24px_rgba(255,92,147,0.18)] transition-all group"
            >
              {/* Rose-pink top accent stripe */}
              <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#FF5C93]/60 to-transparent" />

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="reasons-tag px-3 py-1 rounded-full bg-[#FF5C93]/15 border border-[#FF5C93]/30 text-xs font-mono text-[#FF5C93]">
                  {currentReason.tag}
                </span>
                <Heart className="w-5 h-5 text-[#FF5C93] fill-[#FF5C93] group-hover:scale-125 transition-transform" />
              </div>

              {/* Center Content */}
              <div className="flex flex-col items-center text-center my-auto px-1 py-3">
                <div className="text-4xl mb-2.5 drop-shadow">{currentReason.emoji}</div>
                <h3 className="text-lg font-bold text-[#FFF5F8] group-hover:text-[#FF5C93] transition-colors drop-shadow">
                  {currentReason.title}
                </h3>
                <p className="text-xs text-[#C8A0B0] mt-2.5 leading-relaxed">
                  {currentReason.desc}
                </p>

                {currentReason.id === 6 && (
                  <div className="mt-3 p-2 rounded-xl bg-[#2C1422] border border-[#FF5C93]/30 text-[10px] font-mono text-[#FF5C93] flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <span>Passkey: PROTOCOL_ORPHEUS</span>
                  </div>
                )}
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between text-[10px] text-[#C8A0B0]/60 pt-2.5 border-t border-[#FF5C93]/10 font-mono">
                <span>Made for Thangow</span>
                <span className="flex items-center gap-1 text-[#FF5C93]/70 font-semibold">
                  Tap to glow ✨
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 py-2 shrink-0">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-[#1E0D18] hover:bg-[#2C1422] active:scale-90 text-[#FFF5F8] transition border border-[#FF5C93]/10 shadow"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {CONFIG.SPECIAL_REASONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { soundSynth.playTap(); setCurrentIndex(idx); }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-5 bg-[#FF5C93] shadow-[0_0_8px_rgba(255,92,147,0.5)]'
                    : 'w-2 bg-white/20 hover:bg-white/35'
                }`}
                aria-label={`Reason ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-[#1E0D18] hover:bg-[#2C1422] active:scale-90 text-[#FFF5F8] transition border border-[#FF5C93]/10 shadow"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
