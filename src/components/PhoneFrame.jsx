import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBar from './StatusBar';
import LockScreen from './LockScreen';
import HeartPinScreen from './HeartPinScreen';
import HomeScreen from './HomeScreen';
import MessagesApp from './apps/MessagesApp';
import GalleryApp from './apps/GalleryApp';
import MusicApp from './apps/MusicApp';
import NotesApp from './apps/NotesApp';
import SpecialReasonsApp from './apps/SpecialReasonsApp';
import BirthdayCakeApp from './apps/BirthdayCakeApp';
import BirthdayExeApp from './apps/BirthdayExeApp';
import { soundSynth } from '../utils/audioSynth';

export default function PhoneFrame() {
  const [isLocked, setIsLocked] = useState(true);
  const [showPinScreen, setShowPinScreen] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [solvedFragments, setSolvedFragments] = useState([1]);
  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedFragments = localStorage.getItem('nova_fragments');
      if (savedFragments) {
        setSolvedFragments(JSON.parse(savedFragments));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleUnlockFragment = (fragId) => {
    setSolvedFragments((prev) => {
      if (!prev.includes(fragId)) {
        const next = [...prev, fragId];
        try {
          localStorage.setItem('nova_fragments', JSON.stringify(next));
        } catch {
          // Ignore
        }
        if (next.length >= 3) {
          setBirthdayUnlocked(true);
        }
        return next;
      }
      return prev;
    });
  };

  const handleResetAll = () => {
    try {
      localStorage.removeItem('nova_fragments');
    } catch {
      // Ignore
    }
    setSolvedFragments([1]);
    setBirthdayUnlocked(false);
    setCurrentApp(null);
    setIsLocked(true);
    setShowPinScreen(false);
  };

  const appNames = {
    messages: 'Messages',
    gallery: 'Gallery',
    music: 'Music',
    notes: 'Notes',
    reasons: 'Reasons',
    cake: 'Celebration',
    birthday_exe: 'Birthday.exe'
  };

  return (
    // Unified smartphone container — maintains authentic mobile dimensions on all lockscreens & apps
    <div className="relative w-full max-w-[430px] h-full sm:h-[100dvh] mx-auto flex flex-col overflow-hidden bg-[#100810] shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,92,147,0.18)] sm:border-x sm:border-[#FF5C93]/15">
      {/* Status Bar */}
      <StatusBar
        isPlayingMusic={isPlayingMusic}
        currentAppName={currentApp ? appNames[currentApp] : isLocked ? (showPinScreen ? 'Security' : 'Locked') : 'Home'}
      />

      {/* Main Screen Area */}
      <div className="relative flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {isLocked ? (
            showPinScreen ? (
              <HeartPinScreen
                key="heart-pin"
                onBack={() => setShowPinScreen(false)}
                onUnlockSuccess={() => {
                  setIsLocked(false);
                  setShowPinScreen(false);
                }}
              />
            ) : (
              <LockScreen
                key="lock"
                onSwipeUp={() => setShowPinScreen(true)}
              />
            )
          ) : currentApp === 'messages' ? (
            <MessagesApp
              key="messages"
              onBack={() => setCurrentApp(null)}
              onClueFound={() => handleUnlockFragment(1)}
            />
          ) : currentApp === 'gallery' ? (
            <GalleryApp
              key="gallery"
              onBack={() => setCurrentApp(null)}
              onUnlockFragment={handleUnlockFragment}
            />
          ) : currentApp === 'music' ? (
            <MusicApp
              key="music"
              onBack={() => setCurrentApp(null)}
              isPlaying={isPlayingMusic}
              setIsPlaying={setIsPlayingMusic}
              onUnlockFragment={handleUnlockFragment}
            />
          ) : currentApp === 'notes' ? (
            <NotesApp
              key="notes"
              onBack={() => setCurrentApp(null)}
              onUnlockFragment={handleUnlockFragment}
            />
          ) : currentApp === 'reasons' ? (
            <SpecialReasonsApp
              key="reasons"
              onBack={() => setCurrentApp(null)}
              onUnlockFragment={handleUnlockFragment}
            />
          ) : currentApp === 'cake' ? (
            <BirthdayCakeApp key="cake" onBack={() => setCurrentApp(null)} />
          ) : currentApp === 'birthday_exe' ? (
            <BirthdayExeApp
              key="birthday_exe"
              onBack={() => setCurrentApp(null)}
              solvedFragments={solvedFragments}
              onUnlockFragment={handleUnlockFragment}
              onResetAll={handleResetAll}
            />
          ) : (
            <HomeScreen
              key="home"
              onOpenApp={(appId) => setCurrentApp(appId)}
              solvedFragments={solvedFragments}
              birthdayUnlocked={birthdayUnlocked || solvedFragments.length >= 3}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Home Gesture Bar */}
      {!isLocked && (
        <div
          onClick={() => {
            if (currentApp) {
              soundSynth.playTap();
              setCurrentApp(null);
            }
          }}
          className="relative z-30 flex items-center justify-center py-2 bg-black/70 backdrop-blur-md cursor-pointer hover:bg-black/85 transition select-none shrink-0"
          title="Tap to return to Home"
        >
          <div className="w-28 h-1 rounded-full bg-white/30 hover:bg-[#FF5C93]/70 hover:w-32 transition-all duration-200" />
        </div>
      )}
    </div>
  );
}
