import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, CheckCheck } from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

export default function MessagesApp({ onBack, onClueFound }) {
  const [revealedCount, setRevealedCount] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (revealedCount === CONFIG.MESSAGES.length && onClueFound) {
      onClueFound('messages_read');
    }
  }, [revealedCount, onClueFound]);

  const handleNextMessage = () => {
    if (revealedCount < CONFIG.MESSAGES.length) {
      soundSynth.playTap();
      setRevealedCount((prev) => prev + 1);
    }
  };

  const isCompleted = revealedCount >= CONFIG.MESSAGES.length;

  return (
    <div className="screen-container messages-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
      {/* App Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundSynth.playTap(); onBack(); }}
            className="app-back-btn p-1.5 rounded-full hover:bg-[#FF5C93]/10 active:scale-90 transition text-[#C8A0B0]"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar & Contact */}
          <div className="relative">
            <img
              src={CONFIG.COUPLE_WALLPAPER}
              alt="Chelloww"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#FF5C93]/60 shadow"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1E0D18] animate-pulse" />
          </div>

          <div>
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8] flex items-center gap-1">
              Chelloww 💗
            </h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0] flex items-center gap-1">
              <span>Online • Typing love...</span>
              <span className="text-[#FF5C93]">✨</span>
            </p>
          </div>
        </div>

        <div className="app-badge px-2 py-1 rounded-full bg-[#2C1422] border border-[#FF5C93]/12 text-[10px] text-[#C8A0B0] font-mono">
          {revealedCount}/{CONFIG.MESSAGES.length}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#100810]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16,8,16,0.92), rgba(30,13,24,0.85))`,
        }}
      >
        {/* Date separator */}
        <div className="flex justify-center my-2">
          <span className="px-3 py-1 rounded-full bg-[#2C1422]/80 border border-[#FF5C93]/10 text-[10px] text-[#C8A0B0] font-mono shadow">
            Today • October 11 ✨
          </span>
        </div>

        {/* Revealed Messages */}
        <AnimatePresence>
          {CONFIG.MESSAGES.slice(0, revealedCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-start max-w-[88%]"
            >
              <div className="messages-bubble relative px-4 py-3 rounded-2xl rounded-tl-sm bg-[#2C1422] border border-[#FF5C93]/10 text-[#FFF5F8] shadow text-xs sm:text-sm leading-relaxed">
                {/* Rose-pink left accent */}
                <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#FF5C93]/60" />
                <p className="tracking-wide pl-1">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-[#C8A0B0] font-mono">
                  <span>{msg.time}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#FF5C93]" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Completion Announcement */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-2xl bg-[#2C1422] border border-[#FF5C93]/30 text-center my-3 shadow"
          >
            <div className="flex items-center justify-center gap-1.5 text-[#FF5C93] font-bold text-xs font-mono">
              <Sparkles className="w-4 h-4" />
              <span>All Messages Unlocked!</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-[#C8A0B0] mt-1 font-sans">
              "First clue: Check the photos in Gallery app to find the secret date code!"
            </p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Action */}
      <div className="p-3.5 bg-[#1E0D18]/95 backdrop-blur-md border-t border-[#FF5C93]/10 flex items-center gap-2">
        <button
          onClick={handleNextMessage}
          disabled={isCompleted}
          className={`messages-send-btn flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold shadow transition-all ${
            isCompleted
              ? 'bg-[#2C1422] text-[#C8A0B0]/40 border border-[#FF5C93]/8 cursor-default'
              : 'bg-[#FF5C93] hover:bg-[#ff7aa8] active:scale-98 text-white shadow-[0_0_20px_rgba(255,92,147,0.40)] btn-shimmer border border-white/20'
          }`}
        >
          <span>{CONFIG.MESSAGES_BUTTON_LABEL}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
