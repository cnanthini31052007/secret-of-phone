import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Heart,
  Star,
  Send,
  RotateCcw
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';
import BirthdayCakeApp from './BirthdayCakeApp';

export default function BirthdayExeApp({
  onBack,
  solvedFragments,
  onUnlockFragment,
  onResetAll
}) {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    'NOVA ONE KERNEL v4.12-ROMANTIC // SECURE_HEART_BOOT',
    'DETECTED RECIPIENT: THANGOW 💗 // PERSONAL_EDITION',
    'STATUS: 3 Memory Fragments required to unlock Birthday.exe.',
    'Type "help" for commands, or "hint" if you need clues.'
  ]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [selectedEnding, setSelectedEnding] = useState(null); // 'A' | 'B' | null
  const [matrixLines, setMatrixLines] = useState([]);
  const logsEndRef = useRef(null);

  const hasAllFragments =
    solvedFragments.includes(1) &&
    solvedFragments.includes(2) &&
    solvedFragments.includes(3);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Matrix code rain generator for Ending B (rose-gold & blush heart characters)
  useEffect(() => {
    if (selectedEnding === 'B') {
      const chars = 'THANGOW01011432NOVAONEHEARTLOVE✨💗💖💌';
      const lines = [];
      for (let i = 0; i < 24; i++) {
        let str = '';
        for (let j = 0; j < 16; j++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        lines.push(str);
      }
      setMatrixLines(lines);

      const interval = setInterval(() => {
        setMatrixLines((prev) =>
          prev.map(() => {
            let str = '';
            for (let j = 0; j < 16; j++) {
              str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
          })
        );
      }, 120);

      soundSynth.playFanfare();
      confetti({
        particleCount: 110,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#FF5C93', '#FFB6CC', '#E8B4A0', '#FFF5F8']
      });

      return () => clearInterval(interval);
    }
  }, [selectedEnding]);

  const handleCommandSubmit = (e) => {
    e?.preventDefault();
    if (!terminalInput.trim()) return;

    soundSynth.playTap();
    const cmd = terminalInput.trim();
    const cmdLower = cmd.toLowerCase();
    const newLogs = [...terminalLogs, `> ${cmd}`];

    if (cmdLower === 'help') {
      newLogs.push('Available Commands:');
      newLogs.push('  status             - Show fragment collection state');
      newLogs.push('  hint               - Show clues for all 3 fragments');
      newLogs.push('  unlock <1|2|3>     - Unlock specific fragment directly');
      newLogs.push('  override <key>     - Master root override');
      newLogs.push('  birthday           - Launch celebration if unlocked');
      newLogs.push('  clear              - Clear terminal display');
    } else if (cmdLower === 'status') {
      newLogs.push(`Fragments Solved: [${solvedFragments.join(', ')}] / [1, 2, 3]`);
      newLogs.push(hasAllFragments ? '>>> CORE ROMANTIC VERIFICATION COMPLETE! 💗' : '>>> INCOMPLETE FRAGMENTS');
    } else if (cmdLower === 'hint') {
      newLogs.push('CLUES:');
      newLogs.push('  Fragment 1: Notes Vault PIN (Date in Gallery EXIF = 1011)');
      newLogs.push('  Fragment 2: Music Tuner (Calibrate to 432 Hz)');
      newLogs.push('  Fragment 3: Master Override (PROTOCOL_ORPHEUS in Special Reasons #6)');
    } else if (cmdLower === 'unlock 1' || cmdLower === '1011') {
      onUnlockFragment(1);
      newLogs.push('[OK] Memory Fragment 1 Unlocked (Notes Vault verified 💌).');
    } else if (cmdLower === 'unlock 2' || cmdLower === '432' || cmdLower === 'nova-1011') {
      onUnlockFragment(2);
      newLogs.push('[OK] Memory Fragment 2 Unlocked (Music Frequency verified 🎵).');
    } else if (
      cmdLower === 'unlock 3' ||
      cmdLower === 'override protocol_orpheus' ||
      cmdLower === 'protocol_orpheus'
    ) {
      onUnlockFragment(1);
      onUnlockFragment(2);
      onUnlockFragment(3);
      soundSynth.playFanfare();
      newLogs.push('[SUCCESS] MASTER OVERRIDE ACCEPTED! ALL 3 FRAGMENTS RESTORED! 💖');
    } else if (cmdLower === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmdLower === 'birthday') {
      if (hasAllFragments) {
        setSelectedEnding('A');
      } else {
        newLogs.push('[ERROR] Cannot launch Birthday.exe. Missing fragments.');
      }
    } else {
      newLogs.push(`Unknown command: "${cmd}". Type "help" for options.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="screen-container terminal-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-mono">
      {/* Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow font-sans">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundSynth.playTap();
              if (selectedEnding) {
                setSelectedEnding(null);
              } else {
                onBack();
              }
            }}
            className="app-back-btn p-1.5 rounded-full hover:bg-[#FF5C93]/10 active:scale-90 transition text-[#C8A0B0]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8] flex items-center gap-1.5 font-mono">
              <Terminal className="w-4 h-4 text-[#FF5C93]" />
              <span>Birthday.exe</span>
            </h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0] font-sans">
              {hasAllFragments ? 'Status: Unlocked 🔐💗' : 'Status: Encrypted (3 Keys Needed)'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundSynth.playTap();
            setShowHintModal(true);
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2C1422] border border-[#FF5C93]/15 text-xs text-[#C8A0B0] hover:text-[#FFF5F8] hover:bg-[#351020] font-sans shadow transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#FF5C93]" />
          <span>Hints</span>
        </button>
      </div>

      {/* Main Screen Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-[#100810]">
        {!selectedEnding ? (
          <>
            {/* Fragments HUD */}
            <div className="p-3.5 rounded-2xl bg-[#1E0D18]/90 border border-[#FF5C93]/15 font-sans shadow mb-3 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#C8A0B0]">
                  Memory Fragments Progress
                </span>
                <span className="text-xs font-mono font-bold text-[#FF5C93]">
                  {solvedFragments.length} / 3
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 1, name: 'Notes Vault', clue: 'PIN: 1011' },
                  { id: 2, name: 'Music Tuner', clue: '432 Hz' },
                  { id: 3, name: 'Passkey', clue: 'ORPHEUS' }
                ].map((frag) => {
                  const isDone = solvedFragments.includes(frag.id);
                  return (
                    <div
                      key={frag.id}
                      onClick={() => {
                        if (!isDone) {
                          onUnlockFragment(frag.id);
                          soundSynth.playFanfare();
                        }
                      }}
                      className={`p-2 rounded-xl text-center cursor-pointer transition border ${
                        isDone
                          ? 'bg-[#351020] border-[#FF5C93]/60 text-[#FF5C93] shadow-[0_0_12px_rgba(255,92,147,0.25)]'
                          : 'bg-[#180A14] border-white/8 text-[#C8A0B0]/40 hover:border-[#FF5C93]/30'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {isDone ? (
                          <ShieldCheck className="w-4 h-4 text-[#FF5C93]" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-[#C8A0B0]" />
                        )}
                      </div>
                      <div className="text-[10px] font-bold truncate">{frag.name}</div>
                      <div className="text-[9px] font-mono opacity-70">{frag.clue}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terminal Console View with Subtle Scanlines */}
            <div className="flex-1 p-3.5 rounded-2xl bg-[#0B040B] border border-[#FF5C93]/15 font-mono text-xs overflow-y-auto space-y-1 shadow-inner max-h-[42vh] scanlines">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.startsWith('>')
                      ? 'text-[#FF5C93] font-bold'
                      : log.includes('ERROR')
                      ? 'text-red-400'
                      : log.includes('SUCCESS') || log.includes('OK')
                      ? 'text-emerald-400 font-bold'
                      : 'text-[#C8A0B0]'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Command Input Box */}
            <form onSubmit={handleCommandSubmit} className="flex gap-2 mt-3">
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command (e.g. override protocol_orpheus)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1E0D18] border border-[#FF5C93]/20 text-xs font-mono text-[#FFF5F8] placeholder-[#C8A0B0]/30 focus:outline-none focus:border-[#FF5C93]/70"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] text-white text-xs font-bold active:scale-95 transition flex items-center justify-center shadow-[0_0_14px_rgba(255,92,147,0.40)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Double Ending Choices (Available when all 3 fragments are collected) */}
            {hasAllFragments ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl bg-[#1E0D18]/90 border border-[#FF5C93]/35 shadow font-sans backdrop-blur-md"
              >
                <div className="text-center mb-3">
                  <h3 className="text-sm font-bold text-[#FFF5F8] flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF5C93]" />
                    <span>All 3 Fragments Restored! Choose Your Path:</span>
                  </h3>
                  <p className="text-[11px] text-[#C8A0B0]">
                    Your choice reveals two distinct climactic endings.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Ending A */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { soundSynth.playTap(); setSelectedEnding('A'); }}
                    className="p-3 rounded-xl bg-[#2C1422] text-[#FFF5F8] shadow text-left flex flex-col justify-between border border-[#FF5C93]/40 hover:shadow-[0_0_16px_rgba(255,92,147,0.3)] transition cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FF5C93]">ENDING A</span>
                      <h4 className="text-sm font-bold mt-0.5 text-[#FFF5F8]">The Heart 💗</h4>
                    </div>
                    <p className="text-[10px] text-[#C8A0B0] mt-1 font-sans">Warm Birthday Celebration</p>
                  </motion.button>

                  {/* Ending B */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { soundSynth.playTap(); setSelectedEnding('B'); }}
                    className="p-3 rounded-xl bg-[#351020] text-[#FFF5F8] shadow text-left flex flex-col justify-between border border-[#FFB6CC]/35 hover:shadow-[0_0_16px_rgba(255,182,204,0.25)] transition cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#E8B4A0]">ENDING B</span>
                      <h4 className="text-sm font-bold mt-0.5 text-[#FFF5F8]">The Architect 🌌</h4>
                    </div>
                    <p className="text-[10px] text-[#C8A0B0] mt-1 font-sans">Starlight Confession</p>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Shortcut to restore all */
              <div className="text-center mt-3 font-sans">
                <button
                  onClick={() => {
                    onUnlockFragment(1);
                    onUnlockFragment(2);
                    onUnlockFragment(3);
                    soundSynth.playFanfare();
                  }}
                  className="text-[11px] text-[#C8A0B0]/70 hover:text-[#FF5C93] transition underline font-mono"
                >
                  (Testing shortcut: Restore All 3 Keys ⚡)
                </button>
              </div>
            )}

            {/* Replay / Reset all */}
            {onResetAll && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => {
                    soundSynth.playTap();
                    onResetAll();
                  }}
                  className="flex items-center gap-1 text-[10px] text-[#C8A0B0]/60 hover:text-red-400 font-mono transition"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset Game State
                </button>
              </div>
            )}
          </>
        ) : selectedEnding === 'A' ? (
          /* Ending A: Celebrate inside BirthdayCakeApp directly */
          <div className="w-full h-full flex flex-col">
            <BirthdayCakeApp onBack={() => setSelectedEnding(null)} />
          </div>
        ) : (
          /* Ending B: The Architect Starlight Confession */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col justify-between items-center text-center p-4 my-auto font-sans relative overflow-hidden"
          >
            {/* Pink Matrix Rain */}
            <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden font-mono text-[10px] text-[#FF5C93] select-none flex justify-around">
              {matrixLines.map((line, i) => (
                <div key={i} className="flex flex-col text-[#FF5C93]">
                  {line}
                </div>
              ))}
            </div>

            <div className="relative z-10 w-full max-w-sm rounded-3xl p-6 border border-[#FF5C93]/40 shadow-[0_0_30px_rgba(255,92,147,0.3)] my-auto bg-[#1E0D18]/95 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#FF5C93]/15 text-xs font-mono text-[#C8A0B0]">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#FF5C93]" />
                  <span>The Architect's Awakening</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2C1422] text-[#FF5C93] border border-[#FF5C93]/20 font-bold">
                  Ending B
                </span>
              </div>

              {/* Glowing Heart */}
              <div className="my-5 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF5C93] to-[#C8305E] flex items-center justify-center shadow-[0_0_26px_rgba(255,92,147,0.6)] animate-pulse">
                  <Heart className="w-10 h-10 fill-white text-white drop-shadow" />
                </div>
                <h3 className="text-xl font-bold font-script text-[#FFF5F8] mt-3 drop-shadow">
                  A Whisper Across The Stars 🌌
                </h3>
              </div>

              {/* Creator's Confession */}
              <p className="text-xs sm:text-sm text-[#C8A0B0] leading-relaxed font-sans px-1">
                "Thangow, this entire phone wasn't just code or pixels. It was crafted with every thought, every laugh, and every quiet moment we've ever shared. You turned ordinary days into unforgettable memories. Whatever the future holds, having you in my life is the greatest adventure. You will always be my most cherished person."
              </p>

              {/* Closing Quote */}
              <div className="mt-6 pt-4 border-t border-[#FF5C93]/15 text-xs text-[#FF5C93] font-mono italic">
                {CONFIG.FINAL_CLOSING}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => { soundSynth.playTap(); setSelectedEnding('A'); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] text-white text-xs font-bold shadow-[0_0_14px_rgba(255,92,147,0.4)] transition cursor-pointer"
                >
                  View Ending A 🎂
                </button>
                <button
                  onClick={() => { soundSynth.playTap(); setSelectedEnding(null); }}
                  className="px-4 py-2.5 rounded-xl bg-[#2C1422] hover:bg-[#351020] text-[#C8A0B0] hover:text-[#FFF5F8] text-xs font-semibold border border-[#FF5C93]/15 shadow transition cursor-pointer"
                >
                  Back to Terminal 🔐
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Contextual Hint Modal */}
      <AnimatePresence>
        {showHintModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHintModal(false)}
            className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-sans"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-5 w-full max-w-sm border border-[#FF5C93]/20 bg-[#1E0D18] text-[#FFF5F8] shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#FF5C93]/15">
                <h3 className="text-sm font-bold flex items-center gap-2 text-[#FF5C93]">
                  <HelpCircle className="w-4 h-4" /> Mystery Game Clues
                </h3>
                <button
                  onClick={() => setShowHintModal(false)}
                  className="text-xs text-[#C8A0B0] hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 mt-3 text-xs leading-relaxed">
                <div className="p-2.5 rounded-xl bg-[#2C1422] border border-[#FF5C93]/15">
                  <span className="font-bold text-[#FF5C93]">1. Notes Vault PIN:</span>
                  <p className="text-[#C8A0B0] mt-0.5">
                    Open Gallery → Tap photo in "Quiet Moments" → Tap "EXIF Clue". The date is 1011!
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#2C1422] border border-[#FF5C93]/15">
                  <span className="font-bold text-[#FFF5F8]">2. Harmonic Audio Tuner:</span>
                  <p className="text-[#C8A0B0] mt-0.5">
                    Open Music → Slide frequency to 432 Hz to intercept passkey NOVA-1011.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#2C1422] border border-[#FF5C93]/15">
                  <span className="font-bold text-[#FFF5F8]">3. Master Passkey:</span>
                  <p className="text-[#C8A0B0] mt-0.5">
                    Check Reason 06 in Special Reasons app or type "override PROTOCOL_ORPHEUS" in the terminal!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHintModal(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5C93] to-[#C8305E] hover:from-[#ff75a4] hover:to-[#db3a6e] font-bold text-xs text-white shadow-[0_0_14px_rgba(255,92,147,0.4)] cursor-pointer"
              >
                Got It! 💗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
