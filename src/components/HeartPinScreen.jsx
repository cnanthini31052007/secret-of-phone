import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Delete, Check, Lock, Unlock } from 'lucide-react';
import { soundSynth } from '../utils/audioSynth';

const CORRECT_PIN = '1210';

export default function HeartPinScreen({ onBack, onUnlockSuccess }) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const validateCode = (codeToTest) => {
    if (codeToTest === CORRECT_PIN) {
      setIsSuccess(true);
      setErrorMsg(null);
      soundSynth.playUnlock();
      setTimeout(() => { onUnlockSuccess(); }, 650);
    } else {
      setIsShaking(true);
      setErrorMsg('Oops, wrong code chellow 💗 Try again!');
      setTimeout(() => { setPin(''); setIsShaking(false); }, 700);
    }
  };

  const handleDigit = (digit) => {
    if (isSuccess) return;
    setErrorMsg(null);
    soundSynth.playTap();
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + digit;
      if (next.length === 4) { setTimeout(() => validateCode(next), 60); }
      return next;
    });
  };

  const handleBackspace = () => {
    if (isSuccess || pin.length === 0) return;
    soundSynth.playTap();
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleSubmit = () => {
    if (isSuccess) return;
    if (pin.length === 4) { validateCode(pin); }
    else { setErrorMsg('Enter all 4 digits, chellow 💌'); }
  };

  const keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['backspace', '0', 'submit'],
  ];

  return (
    <motion.div
      id="heartPinScreen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="screen-container relative w-full h-full flex flex-col justify-between p-5 select-none overflow-hidden font-sans"
      style={{ background: 'linear-gradient(160deg, #100810 0%, #1E0D18 50%, #100810 100%)' }}
    >
      {/* Ambient hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-6 text-[#FF5C93]/15 text-2xl animate-pulse">💗</div>
        <div className="absolute top-1/2 right-6 text-white/10 text-xl animate-pulse" style={{ animationDelay: '1.4s' }}>✨</div>
        <div className="absolute bottom-1/4 left-8 text-[#FF5C93]/15 text-lg animate-pulse" style={{ animationDelay: '2.2s' }}>💖</div>
        {/* Subtle rose glow orbs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#FF5C93]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#641C3A]/20 blur-2xl pointer-events-none" />
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between w-full pt-2">
        <button
          onClick={() => { soundSynth.playTap(); onBack(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1422]/80 hover:bg-[#2C1422] active:scale-95 transition text-[#C8A0B0] hover:text-[#FFF5F8] border border-[#FF5C93]/12 text-xs cursor-pointer"
          aria-label="Back to Lock Screen"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Lock</span>
        </button>

        <div className="flex items-center gap-1 text-[11px] font-mono text-[#C8A0B0]">
          <Lock className="w-3 h-3 text-[#FF5C93]" />
          <span>SECURITY</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-xs mx-auto">
        {/* Animated Icon Avatar */}
        <motion.div
          animate={isSuccess ? { scale: [1, 1.25, 1.1], rotate: [0, -10, 10, 0] } : { y: [0, -3, 0] }}
          transition={{ repeat: isSuccess ? 0 : Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-[#2C1422] border border-[#FF5C93]/20 flex items-center justify-center shadow-[0_0_24px_rgba(255,92,147,0.15)] mb-3"
        >
          {isSuccess ? (
            <Unlock className="w-6 h-6 text-[#FF5C93]" />
          ) : (
            <Heart className="w-6 h-6 text-[#FF5C93] fill-[#FF5C93]/30" />
          )}
        </motion.div>

        <h2 className="text-xl font-bold text-[#FFF5F8] tracking-tight text-center">
          A Little Secret ❤️
        </h2>

        <p className="text-xs text-[#C8A0B0] mt-1 text-center font-medium">
          Enter the secret code, chellow 💌
        </p>

        {/* PIN Heart Indicators */}
        <motion.div
          animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3.5 mt-5 mb-2"
        >
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;
            return (
              <motion.div
                key={index}
                animate={isFilled ? { scale: [1, 1.22, 1] } : { scale: 1 }}
                transition={{ duration: 0.18 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isFilled
                    ? 'bg-[#FF5C93]/20 border border-[#FF5C93]/60 shadow-[0_0_14px_rgba(255,92,147,0.45)]'
                    : 'bg-[#2C1422] border border-[#FF5C93]/12 shadow-inner'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFilled
                      ? 'fill-[#FF5C93] text-[#FF5C93] drop-shadow-[0_0_6px_#FF5C93]'
                      : 'text-white/20 stroke-[1.5]'
                  }`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Status / Error */}
        <div className="h-6 flex items-center justify-center mt-1">
          <AnimatePresence mode="wait">
            {errorMsg ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-xs font-medium text-[#FF5C93] text-center"
              >
                {errorMsg}
              </motion.p>
            ) : isSuccess ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-semibold text-[#FF5C93] flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Welcome home, chellow! 💗
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Romantic Numeric Keypad */}
      <div className="relative z-10 w-full max-w-[270px] mx-auto pb-4">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {keypadRows.map((row) =>
            row.map((item) => {
              if (item === 'backspace') {
                return (
                  <motion.button
                    key="backspace"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBackspace}
                    disabled={isSuccess}
                    className="w-16 h-14 rounded-2xl bg-[#2C1422]/80 hover:bg-[#2C1422] border border-[#FF5C93]/10 flex items-center justify-center text-[#C8A0B0] hover:text-[#FFF5F8] transition shadow cursor-pointer"
                    aria-label="Delete last digit"
                  >
                    <Delete className="w-5 h-5" />
                  </motion.button>
                );
              }

              if (item === 'submit') {
                return (
                  <motion.button
                    key="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSubmit}
                    disabled={isSuccess}
                    className="w-16 h-14 rounded-2xl bg-[#2C1422]/80 hover:bg-[#2C1422] border border-[#FF5C93]/20 flex items-center justify-center text-[#FF5C93] transition shadow cursor-pointer"
                    aria-label="Submit PIN"
                  >
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </motion.button>
                );
              }

              return (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,92,147,0.35)' }}
                  whileTap={{ scale: 0.92, backgroundColor: 'rgba(255,92,147,0.18)' }}
                  onClick={() => handleDigit(item)}
                  disabled={isSuccess}
                  className="w-16 h-14 rounded-2xl bg-[#2C1422] border border-[#FF5C93]/10 hover:border-[#FF5C93]/30 flex flex-col items-center justify-center text-[#FFF5F8] transition shadow cursor-pointer select-none"
                  aria-label={`Digit ${item}`}
                >
                  <span className="text-xl font-semibold font-mono leading-none">{item}</span>
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}
