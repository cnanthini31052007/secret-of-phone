import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Info,
  Sparkles,
  Camera
} from 'lucide-react';
import { CONFIG } from '../../data/config';
import { soundSynth } from '../../utils/audioSynth';

export default function GalleryApp({ onBack, onUnlockFragment }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [showExif, setShowExif] = useState(false);

  const handleToggleFavorite = (photoId) => {
    soundSynth.playTap();
    setFavorites((prev) => ({ ...prev, [photoId]: !prev[photoId] }));
  };

  const handleOpenPhoto = (index) => {
    soundSynth.playTap();
    setActivePhotoIndex(index);
    setShowExif(false);
  };

  const currentPhotos = selectedAlbum ? selectedAlbum.photos : [];
  const currentPhoto = activePhotoIndex !== null ? currentPhotos[activePhotoIndex] : null;

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    soundSynth.playTap();
    if (activePhotoIndex !== null && activePhotoIndex < currentPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
      setShowExif(false);
    }
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    soundSynth.playTap();
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
      setShowExif(false);
    }
  };

  const handleInspectExif = (e) => {
    e?.stopPropagation();
    soundSynth.playTap();
    setShowExif((prev) => !prev);
    if (onUnlockFragment) {
      onUnlockFragment(1);
    }
  };

  return (
    <div className="screen-container gallery-screen relative w-full h-full flex flex-col bg-[#100810] text-[#FFF5F8] select-none overflow-hidden font-sans">
      {/* App Header */}
      <div className="app-header flex items-center justify-between px-4 py-3 bg-[#1E0D18]/95 backdrop-blur-md border-b border-[#FF5C93]/12 z-10 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundSynth.playTap();
              if (activePhotoIndex !== null) {
                setActivePhotoIndex(null);
              } else if (selectedAlbum) {
                setSelectedAlbum(null);
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
            <h2 className="app-header-title text-sm font-bold text-[#FFF5F8]">
              {selectedAlbum ? selectedAlbum.title : 'Memories & Albums 🖼️'}
            </h2>
            <p className="app-header-subtitle text-[10px] text-[#C8A0B0]">
              {selectedAlbum ? `${selectedAlbum.photos.length} Photos` : '3 Special Collections'}
            </p>
          </div>
        </div>

        <div className="app-badge flex items-center gap-1 px-2 py-1 rounded-full bg-[#2C1422] border border-[#FF5C93]/12 text-[10px] text-[#C8A0B0] font-mono">
          <Sparkles className="w-3 h-3 text-[#FF5C93]" />
          <span>For Thangow</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#100810]">
        {!selectedAlbum ? (
          /* Album List — vertical cards */
          <div className="flex flex-col gap-4">
            {CONFIG.ALBUMS.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => { soundSynth.playTap(); setSelectedAlbum(album); }}
                className="gallery-album-card flex items-center p-3.5 rounded-2xl bg-[#1E0D18] border border-[#FF5C93]/10 shadow hover:border-[#FF5C93]/40 hover:shadow-[0_0_16px_rgba(255,92,147,0.18)] transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#FF5C93]/10">
                  <img
                    src={album.thumbnail}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded-full bg-black/70 text-[9px] font-mono text-[#C8A0B0]">
                    {album.photos.length}
                  </span>
                </div>

                {/* Text */}
                <div className="ml-3.5 flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#FFF5F8] group-hover:text-[#FF5C93] transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-xs text-[#C8A0B0] mt-1 line-clamp-2 leading-relaxed">
                    {album.description}
                  </p>
                  <span className="inline-block mt-2 text-[10px] text-[#FF5C93]/70 font-semibold tracking-wider uppercase font-mono group-hover:text-[#FF5C93] transition-colors">
                    Tap to view →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Album Photos Grid */
          <div>
            <div className="mb-3.5 p-3 rounded-xl bg-[#1E0D18] border border-[#FF5C93]/10 text-xs text-[#C8A0B0] leading-relaxed">
              <p className="font-medium text-[#FFF5F8]">{selectedAlbum.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedAlbum.photos.map((photo, pIdx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: pIdx * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenPhoto(pIdx)}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#FF5C93]/10 shadow cursor-pointer group bg-[#1E0D18]"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  {favorites[photo.id] && (
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-[#FF5C93]">
                      <Heart className="w-3 h-3 fill-white text-white" />
                    </div>
                  )}
                  <p className="absolute bottom-2 left-2 right-2 text-[10px] text-[#FFF5F8]/90 line-clamp-1 font-medium">
                    {photo.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-screen Lightbox */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIndex(null)}
            className="absolute inset-0 z-50 bg-black/96 backdrop-blur-xl flex flex-col justify-between p-4"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-[#FFF5F8] z-10">
              <button
                onClick={(e) => { e.stopPropagation(); soundSynth.playTap(); setActivePhotoIndex(null); }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/15 active:scale-90 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-[#C8A0B0]">
                {activePhotoIndex + 1} / {currentPhotos.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleInspectExif}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition ${
                    showExif
                      ? 'bg-[#FF5C93] text-white font-bold shadow-[0_0_12px_rgba(255,92,147,0.6)]'
                      : 'bg-white/10 text-[#C8A0B0] hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>EXIF Clue</span>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleFavorite(currentPhoto.id); }}
                  className={`p-2 rounded-full transition ${
                    favorites[currentPhoto.id]
                      ? 'bg-[#FF5C93] text-white shadow-[0_0_12px_rgba(255,92,147,0.5)]'
                      : 'bg-white/10 text-white/70 hover:bg-white/15'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites[currentPhoto.id] ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Photo */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto flex items-center justify-center max-h-[65vh] w-full"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="max-h-[65vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
              {activePhotoIndex > 0 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 active:scale-90 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {activePhotoIndex < currentPhotos.length - 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 active:scale-90 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Caption & EXIF */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl p-3.5 mx-auto w-full max-w-md z-10 bg-black/60 backdrop-blur-md border border-white/10"
            >
              <p className="text-xs text-[#FFF5F8] text-center font-medium leading-relaxed">
                {currentPhoto.caption}
              </p>

              {showExif && currentPhoto.exif && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2.5 pt-2.5 border-t border-white/10 text-[11px] font-mono text-[#C8A0B0] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3 h-3 text-[#FF5C93]" /> Timestamp:
                    </span>
                    <span>{currentPhoto.exif.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span>{currentPhoto.exif.location}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#2C1422] border border-[#FF5C93]/40 text-center text-[#FF5C93] font-bold mt-1">
                    🔐 {currentPhoto.exif.clue}
                    <p className="text-[10px] font-normal text-[#C8A0B0] mt-0.5">{currentPhoto.exif.note}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
