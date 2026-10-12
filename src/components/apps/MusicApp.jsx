import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  ExternalLink,
  Radio,
  Sparkles,
  Heart,
  Music,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

const OFFICIAL_STUDIO_FLICKS_URL = 'https://www.studioflicks.com/video/vaa-senthaazhini-lyric-video-adiyae/';
const YT_VIDEO_ID = 'KzTulvayphg'; // Official lyric video ID embedded on Studio Flicks

export default function MusicApp({ onBack, isPlaying, setIsPlaying, onUnlockFragment }) {
  const [tunerFreq, setTunerFreq] = useState(400);
  const [fragmentUnlocked, setFragmentUnlocked] = useState(false);

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaybackActive, setIsPlaybackActive] = useState(false);
  const [embedBlocked, setEmbedBlocked] = useState(false);
  const playerRef = useRef(null);
  const containerIdRef = useRef(`yt-player-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    if (tunerFreq === 432 && !fragmentUnlocked) {
      soundSynth.playFanfare();
      setFragmentUnlocked(true);
      if (onUnlockFragment) onUnlockFragment(2);
    }
  }, [tunerFreq, fragmentUnlocked, onUnlockFragment]);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;
      const container = document.getElementById(containerIdRef.current);
      if (!container) return;

      try {
        playerRef.current = new window.YT.Player(containerIdRef.current, {
          videoId: YT_VIDEO_ID,
          width: '100%',
          height: '100%',
          playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0, playsinline: 1, enablejsapi: 1, origin: window.location.origin },
          events: {
            onReady: () => { if (isMounted) setIsPlayerReady(true); },
            onStateChange: (event) => {
              if (!isMounted) return;
              if (event.data === 1) { setIsPlaybackActive(true); setIsPlaying(true); }
              else { setIsPlaybackActive(false); setIsPlaying(false); }
            },
            onError: (err) => {
              console.warn('YouTube embed error:', err);
              if (isMounted) { setEmbedBlocked(true); setIsPlaybackActive(false); setIsPlaying(false); }
            }
          }
        });
      } catch (err) {
        console.warn('Failed to initialize player:', err);
        if (isMounted) setEmbedBlocked(true);
      }
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript?.parentNode) firstScript.parentNode.insertBefore(tag, firstScript);
        else document.head.appendChild(tag);
      }

      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevOnReady) prevOnReady();
        if (isMounted) initPlayer();
      };

      const pollInterval = setInterval(() => {
        if (window.YT && window.YT.Player) { clearInterval(pollInterval); if (isMounted) initPlayer(); }
      }, 250);
      const timeout = setTimeout(() => clearInterval(pollInterval), 6000);

      return () => { isMounted = false; clearInterval(pollInterval); clearTimeout(timeout); };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      if (playerRef.current?.destroy) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
      setIsPlaying(false);
    };
  }, [setIsPlaying]);

  const handleTogglePlay = () => {
    soundSynth.playTap();
    if (embedBlocked || !playerRef.current || !isPlayerReady) {
      window.open(OFFICIAL_STUDIO_FLICKS_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      if (isPlaybackActive) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    } catch {
      window.open(OFFICIAL_STUDIO_FLICKS_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setTunerFreq(val);
    soundSynth.startTunerTone(val);
  };

  const handleSliderEnd = () => soundSynth.stopTunerTone();

  const visualizerBars = [35, 65, 45, 90, 55, 80, 40, 95, 70, 50, 85, 45, 75, 35];

  return (
    <div className="screen-container music-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
      {/* App Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundSynth.playTap();
              soundSynth.stopTunerTone();
              if (playerRef.current && isPlaybackActive) {
                try { playerRef.current.pauseVideo(); } catch (e) {}
              }
              setIsPlaying(false);
              onBack();
            }}
            className="app-back-btn p-1.5 rounded-full hover:bg-[#FF5C93]/10 active:scale-90 transition text-[#C8A0B0]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8] flex items-center gap-1.5">
              Music Corner 🎵
            </h2>
            <p className="app-header-subtitle text-[10px] text-[#FF5C93] font-mono">Vaa Senthaazhini • Adiyae</p>
          </div>
        </div>

        <div className="app-badge flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2C1422] border border-[#FF5C93]/12 text-[10px] text-[#C8A0B0] font-mono shadow">
          <Sparkles className="w-3 h-3 text-[#FF5C93]" />
          <span>Justin Prabhakaran</span>
        </div>
      </div>

      {/* Main Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3.5 bg-[#100810]">
        {/* Main Player Card */}
        <div className="music-player-card relative rounded-3xl p-4 bg-[#1E0D18] border border-[#FF5C93]/10 shadow-lg flex flex-col items-center">
          {/* Vinyl Disc */}
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center p-2 shadow border border-[#FF5C93]/15 bg-[#180914]">
            <motion.div
              animate={{ rotate: isPlaybackActive ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              className="w-full h-full rounded-full border-4 border-dashed border-[#FF5C93]/20 flex items-center justify-center overflow-hidden"
            >
              <img
                src={CONFIG.COUPLE_WALLPAPER}
                alt="Vaa Senthaazhini Artwork"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/30 shadow-inner"
              />
            </motion.div>
            {/* Spindle */}
            <div className="absolute w-5 h-5 rounded-full bg-[#100810] border border-[#FF5C93]/50 flex items-center justify-center shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C93]" />
            </div>
            {isPlaybackActive && (
              <div className="absolute inset-0 rounded-full border-2 border-[#FF5C93]/50 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Song Metadata */}
          <div className="text-center mt-3 w-full">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF5C93]/15 border border-[#FF5C93]/30 text-[10px] text-[#FF5C93] font-semibold mb-1">
              <Heart className="w-2.5 h-2.5 fill-[#FF5C93] text-[#FF5C93]" />
              <span>Movie: Adiyae</span>
            </div>

            <h3 className="text-base font-extrabold text-[#FFF5F8] tracking-wide mt-0.5 drop-shadow">
              Vaa Senthaazhini
            </h3>

            <div className="mt-1 flex flex-col items-center gap-0.5 text-xs text-[#C8A0B0] font-medium">
              <p>Singer: <span className="text-[#FFF5F8] font-bold">Sid Sriram</span></p>
              <p className="text-[11px]">Composer: <span className="text-[#FF5C93] font-semibold">Justin Prabhakaran</span></p>
            </div>
          </div>

          {/* Visualizer */}
          <div className="w-full mt-3 flex flex-col items-center gap-1">
            <div className="w-full flex items-center justify-center gap-1.5 h-8 px-4 py-1.5 rounded-2xl bg-black/40 border border-[#FF5C93]/10">
              {visualizerBars.map((baseHeight, i) => (
                <motion.div
                  key={i}
                  animate={
                    isPlaybackActive
                      ? { height: [`${baseHeight * 0.4}%`, `${baseHeight}%`, `${baseHeight * 0.3}%`], backgroundColor: '#FF5C93', opacity: 1 }
                      : { height: '14%', backgroundColor: 'rgba(200,160,176,0.20)', opacity: 0.5 }
                  }
                  transition={
                    isPlaybackActive
                      ? { repeat: Infinity, duration: 0.4 + (i % 3) * 0.15, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                  className="w-1.5 rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#C8A0B0]/70 flex items-center gap-1">
              {isPlaybackActive ? (
                <>
                  <Music className="w-3 h-3 text-[#FF5C93] animate-spin" />
                  <span className="text-[#FF5C93] font-semibold">Playback Active 🎵</span>
                </>
              ) : (
                <span>Playback paused • Visualizer idle</span>
              )}
            </span>
          </div>

          {/* Play / Pause button */}
          <div className="mt-2.5">
            <button
              onClick={handleTogglePlay}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FF5C93] hover:bg-[#ff7aa8] active:scale-95 text-white shadow-[0_0_20px_rgba(255,92,147,0.45)] transition border border-white/20"
              aria-label={isPlaybackActive ? 'Pause' : 'Play'}
            >
              {isPlaybackActive ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 ml-0.5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="p-4 rounded-3xl bg-[#1E0D18] border border-[#FF5C93]/10 shadow space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#FF5C93]" />
              <h4 className="text-xs font-bold text-[#FFF5F8] tracking-wide font-mono">Official Music Video</h4>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#2C1422] text-[#C8A0B0] font-mono border border-[#FF5C93]/10">
              Studio Flicks
            </span>
          </div>

          {embedBlocked ? (
            <div className="p-4 rounded-2xl bg-black/40 border border-[#FF5C93]/25 flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FF5C93]/15 flex items-center justify-center">
                <Music className="w-5 h-5 text-[#FF5C93]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#FFF5F8]">Direct Embedding Restricted</p>
                <p className="text-[11px] text-[#C8A0B0] mt-1 max-w-xs">The video host restricts iframe embedding. Tap below to enjoy the official release.</p>
              </div>
              <a
                href={OFFICIAL_STUDIO_FLICKS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundSynth.playTap()}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FF5C93] hover:bg-[#ff7aa8] active:scale-95 text-white font-bold text-sm shadow-[0_0_20px_rgba(255,92,147,0.4)] transition btn-shimmer border border-white/20"
              >
                <span>Play Vaa Senthaazhini 💗</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#FF5C93]/10">
                <div id={containerIdRef.current} className="w-full h-full" />
              </div>

              <a
                href={OFFICIAL_STUDIO_FLICKS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundSynth.playTap()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF5C93] hover:bg-[#ff7aa8] active:scale-95 text-white font-semibold text-xs shadow-[0_0_18px_rgba(255,92,147,0.35)] transition btn-shimmer border border-white/20"
              >
                <span>Play Vaa Senthaazhini 💗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-center text-[#C8A0B0]/60 font-mono">Source: Studio Flicks Authorized Lyric Video</p>
            </div>
          )}
        </div>

        {/* Harmonic Frequency Tuner */}
        <div className="p-4 rounded-3xl bg-[#1E0D18] border border-[#FF5C93]/10 shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8A0B0] font-mono">
              <Radio className="w-4 h-4 text-[#FF5C93]" />
              <span>Harmonic Frequency Tuner 🔐</span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                tunerFreq === 432
                  ? 'bg-[#FF5C93]/20 text-[#FF5C93] border border-[#FF5C93]/50 shadow-[0_0_8px_rgba(255,92,147,0.4)]'
                  : 'bg-[#2C1422] text-[#C8A0B0]'
              }`}
            >
              {tunerFreq} Hz
            </span>
          </div>

          <p className="text-[11px] text-[#C8A0B0]/90 mb-3 font-sans">
            Slide and calibrate frequency to intercept encrypted audio signal (Clue from Little Wonders album: 432 Hz).
          </p>

          <input
            type="range"
            min="380"
            max="460"
            step="1"
            value={tunerFreq}
            onChange={handleSliderChange}
            onMouseUp={handleSliderEnd}
            onTouchEnd={handleSliderEnd}
            className="w-full accent-[#FF5C93] h-2 bg-[#2C1422] rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-[#C8A0B0]/50 mt-1">
            <span>380 Hz</span>
            <span className="text-[#FF5C93]">432 Hz (Harmonic)</span>
            <span>460 Hz</span>
          </div>

          {fragmentUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-2.5 rounded-xl bg-[#2C1422] border border-[#FF5C93]/40 text-[#FF5C93] text-[11px] flex items-center gap-2 shadow font-mono"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FF5C93] shrink-0" />
              <div>
                <span className="font-bold">Encrypted Signal Intercepted!</span>
                <p className="text-[10px] text-[#C8A0B0] font-mono">
                  Dev Passkey: NOVA-1011 (Memory Fragment #2 Unlocked)
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
