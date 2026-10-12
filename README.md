# NOVA ONE — Personal Edition 💗
> An imaginary smartphone surprise experience crafted exclusively for **Thangow**.

---

## 📱 Project Overview

**NOVA ONE — Personal Edition** is a modern, highly interactive birthday surprise web application built with **React, Vite, Tailwind CSS, and Framer Motion**. It simulates an imaginary smartphone OS with custom applications, personal memories, Tanglish conversation trees, an interactive birthday celebration with blowable cake candles, and a connected multi-stage mystery that culminates in two distinct endings.

---

## ✨ Features & Architecture

1. **Lock Screen**:
   - Digital clock with live time and date.
   - Dark romantic starry wallpaper (`/assets/images/lockscreen-wallpaper.jpg`).
   - Notification banner: *"Hey Thangow... 👀❤️" — "I made something special for you..."*.
   - Glowing *"Unlock Your Surprise 💗"* action with smooth transition into the phone OS.

2. **Phone Home Screen**:
   - Status Bar with live time, signal, Wi-Fi, battery, and dynamic island indicator.
   - Realistic wallpaper using the uploaded couple photo (`/assets/images/couple-wallpaper.jpg`) with responsive positioning.
   - Interactive app grid and bottom glassmorphic dock.
   - Home gesture indicator bar to seamlessly return to Home from any app.

3. **7 Connected Applications**:
   - 💌 **Messages**: Authentic Tanglish chat sequence with affectionate words *"chellow"* and *"thangow"*, guided by the *"Next chelloww 💌"* button.
   - 🖼️ **Gallery**: Exactly 3 vertical album cards (*Quiet Moments 💗*, *Little Wonders ✨*, *Funny Images 😄*) with exact descriptions, lightbox viewer, favorite reactions, and EXIF metadata clues.
   - 🎵 **Music**: Featured song *Vaa Senthaazhini* (*Adiyae* - Sid Sriram / Justin Prabhakaran), real Web Audio API acoustic lo-fi playback, live animated sound-wave visualizer, Harmonic Frequency Tuner (`432 Hz`), and link to the official lyric video on Studio Flicks.
   - 📝 **Notes**: Handwritten typewriter birthday letter to Thangow, plus an encrypted Sector 02 Vault keypad unlocked via PIN `1011`.
   - 💖 **Special Reasons**: Interactive appreciation cards with smooth flip animations, glowing borders, and the master passkey clue (`PROTOCOL_ORPHEUS`).
   - 🎂 **Birthday Cake & Celebration**:
     - Dedicated birthday welcome screen with exact heading: **Happy Birthday thangow💗🫂** and heartfelt wish.
     - Interactive animated birthday cake with clickable candles that blow out with smoke and celebration chimes.
     - **ONE LAST SECRET 💌** card revealing:
       - Line 1 (bright pink): `Love you so much 🫶🏻😘`
       - Line 2 (purple): `Miss you so much 🥹🫠`
   - 🔐 **Birthday.exe**:
     - Terminal console with real-time fragment verification HUD and command parser (`help`, `status`, `hint`, `unlock`, `override PROTOCOL_ORPHEUS`).
     - **Ending A (The Heart 💗)**: Full celebratory birthday scene, animated cake, and secret message card.
     - **Ending B (The Architect 🌌)**: Matrix digital rain into glowing starlight constellation with developer's personal confession.
     - Closes with: *“The surprise ends here... But the memories continue forever. ✨❤️”*.

---

## 🚀 How to Run Locally

### 1. Development Server
Run in PowerShell / Terminal:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 Personal Media & Configuration

All customizable text, messages, dates, clues, and albums are organized cleanly in [`src/data/config.js`](file:///d:/Thangoww/src/data/config.js).
Personal uploaded photos are stored in [`public/assets/images/`](file:///d:/Thangoww/public/assets/images/).
