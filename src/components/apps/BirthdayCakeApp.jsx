import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  RotateCcw,
  Gift
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

export default function BirthdayCakeApp({ onBack }) {
  // Screens: 1: Welcome | 2: Interactive Cake & Candles | 3: One Last Secret Reveal
  const [stage, setStage] = useState(1);

  // 5 interactive candles
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [loveRevealed, setLoveRevealed] = useState(false);
  const [missRevealed, setMissRevealed] = useState(false);

  const allCandlesBlown = candles.every((c) => !c);

  const fireCelestialConfetti = () => {
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5C93', '#FFB6CC', '#E8B4A0', '#FFF5F8']
    });
  };

  const handleCandleClick = (idx) => {
    if (!candles[idx]) return;
    soundSynth.playBlow();
    const nextCandles = [...candles];
    nextCandles[idx] = false;
    setCandles(nextCandles);

    if (nextCandles.every((c) => !c)) {
      setTimeout(() => {
        soundSynth.playFanfare();
        fireCelestialConfetti();
      }, 300);
    }
  };

  const handleBlowAllCandles = () => {
    soundSynth.playBlow();
    setCandles([false, false, false, false, false]);
    setTimeout(() => {
      soundSynth.playFanfare();
      fireCelestialConfetti();
    }, 400);
  };

  const handleRevealSecret = () => {
    soundSynth.playTap();
    setSecretRevealed(true);
    setTimeout(() => {
      setLoveRevealed(true);
      soundSynth.playTap();
      setTimeout(() => {
        setMissRevealed(true);
        soundSynth.playFanfare();
        fireCelestialConfetti();
      }, 1200);
    }, 400);
  };

  const handleReset = () => {
    soundSynth.playTap();
    setStage(1);
    setCandles([true, true, true, true, true]);
    setSecretRevealed(false);
    setLoveRevealed(false);
    setMissRevealed(false);
  };

  return (
    <div className="screen-container cake-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
      {/* Ambient romantic glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-6 text-[#FF5C93]/20 text-2xl animate-pulse">💗</div>
        <div className="absolute top-1/2 right-6 text-white/10 text-xl animate-pulse" style={{ animationDelay: '1.2s' }}>✨</div>
        <div className="absolute bottom-1/4 left-10 text-[#FF5C93]/15 text-lg animate-pulse" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#FF5C93]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#641C3A]/20 blur-3xl" />
      </div>

      {/* App Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundSynth.playTap();
              onBack();
            }}
            className="app-back-btn p-1.5 rounded-full hover:bg-[#FF5C93]/10 active:scale-90 transition text-[#C8A0B0]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8] flex items-center gap-1.5">
              Birthday Celebration 🎂
            </h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0]">
              {stage === 1 ? 'Welcome' : stage === 2 ? 'Make a Wish' : 'One Last Secret'}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] text-[#C8A0B0] hover:text-[#FFF5F8] font-mono px-2 py-1 rounded-xl bg-[#2C1422] border border-[#FF5C93]/15 shadow transition hover:bg-[#351020]"
        >
          <RotateCcw className="w-3 h-3" /> Replay
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center items-center bg-[#100810] relative z-10">
        {/* ============================================================
            STAGE 1: BIRTHDAY WELCOME EXPERIENCE
            ============================================================ */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm flex flex-col items-center text-center my-auto p-4"
          >
            {/* Animated Emoji Crown */}
            <div className="flex items-center gap-2 text-2xl mb-2 animate-bounce">
              <span>👑</span>
              <span>✨</span>
              <span>💗</span>
              <span>🎉</span>
              <span>🎂</span>
            </div>

            {/* Title with Romantic Pink Accent */}
            <h1 className="text-4xl sm:text-5xl font-script font-bold text-[#FFF5F8] drop-shadow-[0_2px_18px_rgba(255,92,147,0.45)] leading-tight py-2">
              <span className="text-[#FF5C93]">{CONFIG.BIRTHDAY_WELCOME.heading}</span>
            </h1>

            {/* Exact Birthday Wish */}
            <p className="text-sm sm:text-base text-[#FFF5F8]/90 mt-4 leading-relaxed font-sans px-2 drop-shadow">
              “{CONFIG.BIRTHDAY_WELCOME.wish}”
            </p>

            {/* Floating Pill */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C1422] border border-[#FF5C93]/15 text-xs text-[#C8A0B0] font-medium mt-6 shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5C93]" />
              <span>It's Your Most Special Day</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF5C93]" />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundSynth.playTap();
                setStage(2);
                fireCelestialConfetti();
              }}
              className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] text-white font-bold text-sm shadow-[0_0_24px_rgba(255,92,147,0.50)] flex items-center gap-2 btn-shimmer border border-white/20"
            >
              <span>{CONFIG.BIRTHDAY_WELCOME.buttonText}</span>
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </motion.button>
          </motion.div>
        )}

        {/* ============================================================
            STAGE 2: INTERACTIVE BIRTHDAY SURPRISE (CAKE & CANDLES)
            ============================================================ */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm flex flex-col items-center text-center my-auto"
          >
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-script font-bold text-[#FFF5F8] drop-shadow">
              <span className="text-[#FF5C93]">{CONFIG.BIRTHDAY_SURPRISE.heading}</span>
            </h2>

            <p className="text-xs text-[#C8A0B0] mt-1 mb-5 font-sans">
              {!allCandlesBlown
                ? CONFIG.BIRTHDAY_SURPRISE.cakeHint
                : CONFIG.BIRTHDAY_SURPRISE.cakeBlown}
            </p>

            {/* Interactive Animated Cake Component */}
            <div
              onClick={!allCandlesBlown ? handleBlowAllCandles : undefined}
              className="relative flex flex-col items-center justify-center p-4 cursor-pointer group"
              title="Tap candles or cake to blow them out!"
            >
              {/* Candles Row */}
              <div className="flex items-center gap-4 mb-1 z-10">
                {candles.map((isLit, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCandleClick(idx);
                    }}
                    className="flex flex-col items-center cursor-pointer p-1"
                  >
                    {/* Flame */}
                    <div className="h-6 flex items-center justify-center">
                      {isLit ? (
                        <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#FF5C93] via-[#FFB6CC] to-[#FFF5F8] flame-active shadow-[0_0_14px_#FF5C93]" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#641C3A] flame-smoke" />
                      )}
                    </div>
                    {/* Candle Body */}
                    <div className="w-3 h-8 rounded-t bg-gradient-to-b from-[#E8B4A0] via-[#FF5C93] to-[#351020] border border-white/20 shadow-sm" />
                  </div>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="w-36 h-12 rounded-t-2xl bg-gradient-to-r from-[#351020] via-[#48152B] to-[#351020] border-2 border-[#FF5C93]/35 shadow-[0_0_18px_rgba(255,92,147,0.25)] relative overflow-hidden flex items-center justify-center">
                {/* Frosting drips */}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#FFB6CC]/25 rounded-b-xl" />
                <span className="text-xs text-[#FF5C93] font-bold font-script tracking-wider z-10 drop-shadow">
                  Thangow 💗
                </span>
              </div>

              {/* Cake Middle Tier */}
              <div className="w-48 h-14 bg-gradient-to-r from-[#240B16] via-[#351020] to-[#240B16] border-x-2 border-b-2 border-[#FF5C93]/30 shadow-lg relative flex items-center justify-center">
                <span className="text-sm text-[#FFF5F8] font-script font-bold drop-shadow">
                  ★ Happy Birthday ★
                </span>
              </div>

              {/* Cake Bottom Tier */}
              <div className="w-60 h-16 rounded-b-2xl bg-gradient-to-r from-[#16060E] via-[#240B16] to-[#16060E] border-x-2 border-b-2 border-[#FF5C93]/25 shadow-xl relative flex items-center justify-center">
                <span className="text-xs text-[#E8B4A0] font-mono tracking-widest uppercase">
                  Forever Special 💗
                </span>
              </div>

              {/* Cake Plate */}
              <div className="w-72 h-3.5 rounded-full bg-gradient-to-r from-[#351020] via-[#E8B4A0]/40 to-[#351020] shadow-[0_4px_16px_rgba(0,0,0,0.6)] mt-0.5 border border-[#FF5C93]/25" />
            </div>

            {/* Blow All Button */}
            {!allCandlesBlown && (
              <button
                onClick={handleBlowAllCandles}
                className="mt-3 text-xs text-[#FF5C93] hover:underline font-mono"
              >
                (Tap here to blow out all candles at once 💨)
              </button>
            )}

            {/* Continuation to Secret Message Card */}
            {allCandlesBlown && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    soundSynth.playTap();
                    setStage(3);
                  }}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] text-white font-bold text-xs shadow-[0_0_24px_rgba(255,92,147,0.50)] flex items-center gap-2 btn-shimmer border border-white/20"
                >
                  <Gift className="w-4 h-4 text-white" />
                  <span>Continue to Secret Message 💌</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ============================================================
            STAGE 3: SECRET REVEAL (ROMANTIC DARK CHERRY CARD)
            ============================================================ */}
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm flex flex-col items-center text-center my-auto"
          >
            {/* The Secret Card */}
            <div className="relative w-full rounded-3xl p-6 bg-[#1E0D18]/95 border border-[#FF5C93]/40 shadow-[0_0_35px_rgba(255,92,147,0.25)] backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#FF5C93]/15 text-xs font-mono text-[#C8A0B0]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5C93]" />
                  <span>A Whisper From My Heart</span>
                </span>
                <Heart className="w-4 h-4 fill-[#FF5C93] text-[#FF5C93] animate-pulse" />
              </div>

              {/* Reveal Button if not revealed yet */}
              {!secretRevealed ? (
                <div className="py-10 flex flex-col items-center justify-center">
                  <p className="text-xs text-[#C8A0B0] mb-5 max-w-[220px] font-sans">
                    A deeply personal message was saved exclusively for this moment.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRevealSecret}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] text-white font-bold text-sm shadow-[0_0_24px_rgba(255,92,147,0.55)] flex items-center gap-2 btn-shimmer border border-white/20"
                  >
                    <span>{CONFIG.BIRTHDAY_SURPRISE.secretBtnText}</span>
                  </motion.button>
                </div>
              ) : (
                /* The Revealed Secret Messages */
                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                  {/* Line 1: Pink Accent */}
                  {loveRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl sm:text-3xl font-script font-bold text-[#FF5C93] drop-shadow-[0_0_18px_rgba(255,92,147,0.6)] tracking-wide"
                    >
                      {CONFIG.SECRET_MESSAGES.line1}
                    </motion.div>
                  )}

                  {/* Divider */}
                  {loveRevealed && (
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FF5C93]/60 to-transparent" />
                  )}

                  {/* Line 2: Soft White */}
                  {missRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl sm:text-3xl font-script font-bold text-[#FFF5F8] drop-shadow-[0_0_18px_rgba(255,245,248,0.5)] tracking-wide"
                    >
                      {CONFIG.SECRET_MESSAGES.line2}
                    </motion.div>
                  )}

                  {/* Closing Quote */}
                  {missRevealed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-6 pt-4 border-t border-[#FF5C93]/15 text-xs text-[#C8A0B0] font-mono italic"
                    >
                      {CONFIG.FINAL_CLOSING}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
