import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Heart, Bell, ChevronUp } from 'lucide-react';
import { CONFIG } from '../data/config';
import { soundSynth } from '../utils/audioSynth';

export default function LockScreen({ onSwipeUp }) {
  const [timeStr, setTimeStr] = useState('10:11');
  const [dateStr, setDateStr] = useState('Saturday, October 11');
  const touchStartY = useRef(null);
  const mouseStartY = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hStr = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
      const mStr = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
      setTimeStr(`${hStr}:${mStr}`);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (deltaY > 35) { soundSynth.playTap(); onSwipeUp(); }
    touchStartY.current = null;
  };

  const handleMouseDown = (e) => { mouseStartY.current = e.clientY; };

  const handleMouseUp = (e) => {
    if (mouseStartY.current === null) return;
    const deltaY = mouseStartY.current - e.clientY;
    if (deltaY > 35) { soundSynth.playTap(); onSwipeUp(); }
    mouseStartY.current = null;
  };

  const handleTriggerPin = () => { soundSynth.playTap(); onSwipeUp(); };

  return (
    <motion.div
      id="lockScreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="screen-container lock-screen relative w-full h-full flex flex-col justify-between p-6 select-none overflow-hidden bg-[#100810]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(16,8,16,0.48), rgba(53,16,32,0.65), rgba(16,8,16,0.90)), url(${CONFIG.LOCK_WALLPAPER})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Subtle floating accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-6 text-[#FF5C93]/30 text-xl animate-pulse">💗</div>
        <div className="absolute top-1/3 right-8 text-white/20 text-lg animate-pulse" style={{ animationDelay: '1.2s' }}>✨</div>
        <div className="absolute bottom-1/3 left-10 text-[#FF5C93]/20 text-2xl animate-pulse" style={{ animationDelay: '2.5s' }}>💖</div>
        <div className="absolute top-2/3 right-6 text-white/15 text-base animate-pulse" style={{ animationDelay: '1.8s' }}>⭐</div>
      </div>

      {/* Lock icon + Clock */}
      <div className="flex flex-col items-center pt-8 z-10">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#FF5C93]/20 mb-3 shadow"
        >
          <Lock className="w-4 h-4 text-[#C8A0B0]" />
        </motion.div>

        {/* Big Clock */}
        <h1 className="lock-clock text-6xl font-light tracking-tight text-[#FFF5F8] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
          {timeStr}
        </h1>
        <p className="lock-date text-sm font-medium text-[#C8A0B0] tracking-wide mt-1 drop-shadow">
          {dateStr}
        </p>
      </div>

      {/* Notification Card */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.55 }}
        className="my-auto mx-auto w-full max-w-sm"
      >
        <div className="lock-notification-card rounded-2xl p-4 bg-[#1E0D18]/90 backdrop-blur-xl border border-[#FF5C93]/14 shadow-lg relative overflow-hidden">
          {/* Rose-pink accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF5C93]/60 to-transparent" />

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#FF5C93]/90 text-white shadow flex-shrink-0">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF5C93] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Special Delivery
                </span>
                <span className="text-[10px] text-[#C8A0B0]">Just now</span>
              </div>
              <h3 className="text-base font-bold text-[#FFF5F8] mt-1 font-script text-lg leading-snug">
                {CONFIG.LOCK_GREETING}
              </h3>
              <p className="text-xs text-[#C8A0B0] mt-0.5 leading-relaxed">
                {CONFIG.LOCK_SUBTITLE}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Unlock / Swipe Button */}
      <div className="flex flex-col items-center pb-6 z-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleTriggerPin}
          className="lock-unlock-btn relative group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all overflow-hidden btn-shimmer border border-white/20 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #FF5C93, #C8305E)' }}
        >
          <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
          <span className="tracking-wide">{CONFIG.LOCK_BUTTON}</span>
          <Sparkles className="w-4 h-4 text-white/80" />
        </motion.button>

        {/* Swipe Up Indicator */}
        <div
          onClick={handleTriggerPin}
          className="flex flex-col items-center mt-2.5 cursor-pointer select-none group"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-[#FF5C93] group-hover:text-[#FFB6CC] transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.div>
          <p className="text-[11px] text-[#C8A0B0]/80 group-hover:text-[#FFF5F8] transition-colors font-mono">
            Swipe up to enter PIN
          </p>
        </div>
      </div>
    </motion.div>
  );
}
