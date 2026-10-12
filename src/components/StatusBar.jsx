import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Music } from 'lucide-react';

export default function StatusBar({ isPlayingMusic, currentAppName }) {
  const [timeStr, setTimeStr] = useState('10:11');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hStr = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
      const mStr = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
      setTimeStr(`${hStr}:${mStr}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-30 flex items-center justify-between px-5 pt-2 pb-1.5 text-xs font-medium select-none bg-black/60 backdrop-blur-sm shrink-0">
      {/* Time */}
      <div className="w-14 tracking-wide font-semibold text-[13px] text-[#FFF5F8]">{timeStr}</div>

      {/* Dynamic Island / Notch */}
      <div className="flex items-center justify-center px-3 py-0.5 rounded-full bg-[#1E0D18]/90 border border-[#FF5C93]/20 min-w-[90px] h-[20px] transition-all duration-300 shadow">
        {isPlayingMusic ? (
          <div className="flex items-center gap-1.5 text-[10px] text-[#FF5C93]">
            <Music className="w-2.5 h-2.5 animate-bounce" />
            <span className="font-mono text-[9px] truncate max-w-[62px] text-[#FF5C93]">Senthaazhini</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C93] shadow-[0_0_6px_#FF5C93] animate-pulse" />
            <span className="text-[9px] font-mono text-[#C8A0B0]">{currentAppName || 'NOVA ONE'}</span>
          </div>
        )}
      </div>

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 w-14 justify-end text-[#C8A0B0]">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] font-mono font-bold text-[#FFF5F8]">100</span>
          <Battery className="w-3.5 h-3.5 fill-[#FFF5F8] text-[#FFF5F8]" />
        </div>
      </div>
    </div>
  );
}
