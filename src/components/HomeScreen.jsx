import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircleHeart,
  Images,
  Music4,
  FileText,
  HeartHandshake,
  Cake,
  TerminalSquare,
  Sparkles,
  Lock
} from 'lucide-react';
import { CONFIG } from '../data/config';
import { soundSynth } from '../utils/audioSynth';

export default function HomeScreen({ onOpenApp, solvedFragments, birthdayUnlocked }) {
  const apps = [
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageCircleHeart,
      gradient: 'from-[#FF5C93] to-[#C8305E]',
      badge: '4',
      badgeColor: 'bg-[#FF5C93] text-white',
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: Images,
      gradient: 'from-[#351020] to-[#200A16]',
      badge: '3',
      badgeColor: 'bg-[#C8A0B0] text-[#100810]',
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music4,
      gradient: 'from-[#301222] to-[#1A0812]',
      badge: '♪',
      badgeColor: 'bg-[#FF5C93] text-white',
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: FileText,
      gradient: 'from-[#381822] to-[#220D16]',
      badge: '🔒',
      badgeColor: 'bg-[#C8A0B0] text-[#100810]',
    },
    {
      id: 'reasons',
      name: 'Reasons',
      icon: HeartHandshake,
      gradient: 'from-[#FF5C93] to-[#641C3A]',
      badge: '6',
      badgeColor: 'bg-[#FF5C93] text-white',
    },
    {
      id: 'cake',
      name: 'Celebrate',
      icon: Cake,
      gradient: 'from-[#451428] to-[#260B18]',
      badge: '🎂',
      badgeColor: 'bg-[#C8A0B0] text-[#100810]',
    },
    {
      id: 'birthday_exe',
      name: 'Secret',
      icon: TerminalSquare,
      gradient: birthdayUnlocked
        ? 'from-[#FF5C93] to-[#641C3A]'
        : 'from-[#200A16] to-[#14060E]',
      badge: birthdayUnlocked ? '✓' : `${solvedFragments.length}/3`,
      badgeColor: birthdayUnlocked
        ? 'bg-[#FF5C93] text-white animate-pulse'
        : 'bg-[#2C1422] text-[#C8A0B0] border border-[#FF5C93]/20',
      isGlitch: true,
    }
  ];

  const handleAppClick = (appId) => {
    soundSynth.playTap();
    onOpenApp(appId);
  };

  const row1Apps = apps.slice(0, 4);
  const row2Apps = apps.slice(4);

  const renderAppItem = (app, index) => {
    const Icon = app.icon;
    return (
      <motion.div
        key={app.id}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.04 + 0.08, duration: 0.35 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleAppClick(app.id)}
        className="home-app-item group cursor-pointer"
      >
        {/* Icon Container */}
        <div
          className={`home-app-icon-container bg-gradient-to-br ${app.gradient} border border-[#FF5C93]/25 shadow-md group-hover:shadow-[0_0_14px_rgba(255,92,147,0.45)] group-hover:border-[#FF5C93]/50 transition-all ${
            app.isGlitch && !birthdayUnlocked ? 'border-white/10' : ''
          }`}
        >
          <Icon className="home-app-icon text-[#FFF5F8] drop-shadow" />

          {/* Notification badge */}
          {app.badge && (
            <span className={`home-app-badge ${app.badgeColor}`}>
              {app.badge}
            </span>
          )}

          {/* Lock overlay on Birthday.exe when locked */}
          {app.isGlitch && !birthdayUnlocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] rounded-[10px] flex items-center justify-center border border-[#FF5C93]/15">
              <Lock className="text-[#C8A0B0]" style={{ width: 14, height: 14 }} />
            </div>
          )}
        </div>

        {/* App Label */}
        <span className="home-app-label drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] text-[#FFF5F8]">
          {app.name}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-[#100810]">
      {/* Home Screen Wallpaper Layer — exact couple photo with object-fit: contain */}
      <div id="homeWallpaperLayer">
        <img
          id="homeWallpaperImg"
          src={CONFIG.COUPLE_WALLPAPER}
          alt="Home Wallpaper"
        />
        <div className="home-protective-overlay" />
      </div>

      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {[
          { id: 1, left: '14%', delay: 0, duration: 9, size: 'text-xs' },
          { id: 2, left: '82%', delay: 2.2, duration: 8.5, size: 'text-sm' },
          { id: 3, left: '28%', delay: 4.5, duration: 10, size: 'text-xs' },
          { id: 4, left: '72%', delay: 1.2, duration: 8, size: 'text-sm' }
        ].map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '105vh', opacity: 0, scale: 0.6 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.45, 0.6, 0.45, 0],
              scale: [0.6, 1, 0.9, 1, 0.8],
              x: [0, 8, -8, 6, 0]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`absolute ${heart.size} text-[#FF5C93]/60 filter drop-shadow-[0_0_6px_rgba(255,92,147,0.4)]`}
            style={{ left: heart.left }}
          >
            💗
          </motion.div>
        ))}
      </div>

      {/* Upper Half Section — welcome card, compact grid (4 row 1, 3 row 2), and page dots */}
      <div className="home-upper-section z-10 px-3">
        {/* Top Greeting Pill */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="home-welcome-card flex items-center gap-1.5 rounded-full bg-[#1E0D18]/80 backdrop-blur-md border border-[#FF5C93]/20 shadow"
        >
          <span className="text-[#FF5C93] font-script text-xs font-bold">For My Thangow 💗</span>
          <Sparkles className="w-3 h-3 text-[#FF5C93] animate-pulse" />
        </motion.div>

        {/* Compact App Grid — 4 in row 1, 3 centered in row 2 */}
        <div className="home-apps-container">
          <div className="home-apps-row-1">
            {row1Apps.map((app, index) => renderAppItem(app, index))}
          </div>
          <div className="home-apps-row-2">
            {row2Apps.map((app, index) => renderAppItem(app, index + 4))}
          </div>
        </div>

        {/* Page Dot Indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          <span className="w-3.5 h-1 rounded-full bg-[#FF5C93]/90 shadow-[0_0_6px_#FF5C93]" />
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="w-1 h-1 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Bottom Glass Dock — compact at the bottom */}
      <div className="flex justify-center w-full z-10 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="home-dock-container dock-glass border border-[#FF5C93]/15"
        >
          {[
            { id: 'messages', icon: MessageCircleHeart, gradient: 'from-[#FF5C93] to-[#C8305E]' },
            { id: 'gallery', icon: Images, gradient: 'from-[#351020] to-[#200A16]' },
            { id: 'music', icon: Music4, gradient: 'from-[#301222] to-[#1A0812]' },
            { id: 'cake', icon: Cake, gradient: 'from-[#451428] to-[#260B18]' }
          ].map((dockApp) => {
            const DockIcon = dockApp.icon;
            return (
              <motion.button
                key={dockApp.id}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick(dockApp.id)}
                className={`home-dock-icon-btn bg-gradient-to-br ${dockApp.gradient} text-[#FFF5F8] shadow border border-[#FF5C93]/20 transition-all hover:shadow-[0_0_12px_rgba(255,92,147,0.35)] cursor-pointer`}
              >
                <DockIcon className="home-dock-icon" />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
