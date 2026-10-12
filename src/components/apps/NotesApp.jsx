import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  RotateCcw,
  CheckCircle,
  Heart
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

export default function NotesApp({ onBack, onUnlockFragment }) {
  const [activeTab, setActiveTab] = useState('letter');
  const [typewriterText, setTypewriterText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  const fullLetter = CONFIG.LETTER.body;
  const typingTimerRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'letter') {
      let index = 0;
      setTypewriterText('');
      setIsTypingDone(false);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);

      typingTimerRef.current = setInterval(() => {
        index += 2;
        if (index <= fullLetter.length) {
          setTypewriterText(fullLetter.slice(0, index));
        } else {
          setTypewriterText(fullLetter);
          setIsTypingDone(true);
          clearInterval(typingTimerRef.current);
        }
      }, 18);

      return () => { if (typingTimerRef.current) clearInterval(typingTimerRef.current); };
    }
  }, [activeTab, fullLetter]);

  const handlePinDigit = (digit) => {
    soundSynth.playTap();
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      setPinError(false);

      if (nextPin.length === 4) {
        if (nextPin === CONFIG.NOTES_PIN) {
          soundSynth.playUnlock();
          setVaultUnlocked(true);
          if (onUnlockFragment) onUnlockFragment(1);
        } else {
          setPinError(true);
          setTimeout(() => { setPinInput(''); setPinError(false); }, 800);
        }
      }
    }
  };

  const handleClearPin = () => { soundSynth.playTap(); setPinInput(''); setPinError(false); };

  return (
    <div className="screen-container notes-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
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
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8]">Personal Notes 📝</h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0]">Private Thoughts & Secrets</p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#2C1422] border border-[#FF5C93]/12">
          <button
            onClick={() => { soundSynth.playTap(); setActiveTab('letter'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition ${
              activeTab === 'letter'
                ? 'bg-[#FF5C93] text-white shadow'
                : 'text-[#C8A0B0] hover:text-white'
            }`}
          >
            Letter 💌
          </button>
          <button
            onClick={() => { soundSynth.playTap(); setActiveTab('vault'); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition ${
              activeTab === 'vault'
                ? 'bg-[#FF5C93] text-white shadow'
                : 'text-[#C8A0B0] hover:text-white'
            }`}
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Vault</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#100810]">
        {activeTab === 'letter' ? (
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-6 rounded-3xl bg-[#1E0D18] border border-[#FF5C93]/10 shadow-lg overflow-hidden"
            >
              {/* Subtle pink glow corners */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C93]/6 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF5C93]/4 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-[#FF5C93]/10 mb-4">
                <h3 className="text-xl font-bold font-script text-[#FF5C93] flex items-center gap-2 drop-shadow">
                  <Sparkles className="w-4 h-4 text-[#FF5C93]" />
                  {CONFIG.LETTER.title}
                </h3>
                <span className="text-[10px] font-mono text-[#C8A0B0]">Confidential</span>
              </div>

              <div className="font-script text-lg text-[#FFF5F8] leading-relaxed whitespace-pre-line tracking-wide drop-shadow">
                {typewriterText}
                {!isTypingDone && (
                  <span className="inline-block w-2 h-4 ml-1 bg-[#FF5C93] animate-pulse align-middle" />
                )}
              </div>

              {isTypingDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-between mt-6 pt-3 border-t border-[#FF5C93]/10 text-xs text-[#C8A0B0] font-mono"
                >
                  <span className="flex items-center gap-1 text-[#FF5C93]">
                    <Heart className="w-3.5 h-3.5 fill-[#FF5C93] text-[#FF5C93]" />
                    Forever & Always
                  </span>
                  <button
                    onClick={() => { soundSynth.playTap(); setIsTypingDone(false); setActiveTab('letter'); }}
                    className="flex items-center gap-1 text-[11px] text-[#C8A0B0] hover:text-[#FF5C93] transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Replay
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Vault PIN Pad */
          <div className="max-w-xs mx-auto flex flex-col items-center justify-center py-4">
            {!vaultUnlocked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="vault-card w-full bg-[#1E0D18] rounded-3xl p-5 border border-[#FF5C93]/10 text-center shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2C1422] border border-[#FF5C93]/12 flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-6 h-6 text-[#FF5C93]" />
                </div>

                <h3 className="text-sm font-bold text-[#FFF5F8] font-mono">Encrypted Sector 02</h3>
                <p className="text-[11px] text-[#C8A0B0] mt-1 mb-4">
                  Enter 4-digit PIN (Clue: Check Gallery EXIF timestamp date).
                </p>

                {/* PIN Dots */}
                <div className={`flex justify-center gap-3 mb-6 transition-all ${pinError ? 'animate-shake' : ''}`}>
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`vault-pin-dot w-3.5 h-3.5 rounded-full border transition-all ${
                        pinInput.length > idx
                          ? 'filled bg-[#FF5C93] border-[#FF5C93] shadow-[0_0_8px_rgba(255,92,147,0.5)]'
                          : 'border-white/20 bg-white/5'
                      } ${pinError ? 'bg-red-500 border-red-500' : ''}`}
                    />
                  ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePinDigit(num.toString())}
                      className="vault-keypad-btn h-12 rounded-2xl bg-[#2C1422] hover:bg-[#3A1A2E] active:scale-90 border border-[#FF5C93]/10 text-base font-bold text-[#FFF5F8] transition flex items-center justify-center"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClearPin}
                    className="vault-keypad-clear h-12 rounded-2xl bg-[#FF5C93]/15 hover:bg-[#FF5C93]/25 active:scale-90 border border-[#FF5C93]/30 text-xs font-semibold text-[#FF5C93] transition flex items-center justify-center"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => handlePinDigit('0')}
                    className="vault-keypad-btn h-12 rounded-2xl bg-[#2C1422] hover:bg-[#3A1A2E] active:scale-90 border border-[#FF5C93]/10 text-base font-bold text-[#FFF5F8] transition flex items-center justify-center"
                  >
                    0
                  </button>
                  <div className="h-12 flex items-center justify-center text-[10px] text-[#C8A0B0] font-mono">#1011</div>
                </div>
              </motion.div>
            ) : (
              /* Vault Decrypted */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-[#1E0D18] rounded-3xl p-5 border border-[#FF5C93]/30 text-center shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2C1422] border border-[#FF5C93]/30 flex items-center justify-center mx-auto mb-3">
                  <Unlock className="w-6 h-6 text-[#FF5C93]" />
                </div>

                <h3 className="text-sm font-bold text-[#FF5C93] flex items-center justify-center gap-1.5 font-mono">
                  <CheckCircle className="w-4 h-4" />
                  Sector 02 Decrypted!
                </h3>

                <p className="text-xs text-[#FFF5F8] mt-3 leading-relaxed bg-[#2C1422] p-3 rounded-xl border border-[#FF5C93]/10">
                  "Next Step: Open the Music app and tune the Harmonic Frequency slider to exactly{' '}
                  <span className="font-bold text-[#FF5C93]">432 Hz</span> to unlock Memory Fragment #2."
                </p>

                <div className="mt-4 p-2 rounded-lg bg-[#2C1422] text-[10px] font-mono text-[#FF5C93] border border-[#FF5C93]/25">
                  Memory Fragment #1 Verified • PIN: 1011
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
