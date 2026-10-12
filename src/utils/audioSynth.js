/**
 * Web Audio API Synthesizer for NOVA ONE
 * Generates rich haptic feedback, acoustic music box melodies, frequency tuning, and celebration chimes.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.oscTuner = null;
    this.gainTuner = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft haptic tap
  playTap() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Phone unlock chime
  playUnlock() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
    });
  }

  // Candle extinguish woosh
  playBlow() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  // Celebration chime / fanfare
  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 880, 1046.5]; // C5, E5, G5, A5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.12);
      osc.stop(this.ctx.currentTime + i * 0.12 + 0.6);
    });
  }

  // Harmonic Tuner Real-Time Tone (changes pitch with slider)
  startTunerTone(freq) {
    this.init();
    if (!this.ctx) return;
    if (!this.oscTuner) {
      this.oscTuner = this.ctx.createOscillator();
      this.gainTuner = this.ctx.createGain();
      this.oscTuner.type = 'sine';
      this.gainTuner.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.oscTuner.connect(this.gainTuner);
      this.gainTuner.connect(this.ctx.destination);
      this.oscTuner.start();
    }
    this.oscTuner.frequency.setValueAtTime(freq, this.ctx.currentTime);
  }

  stopTunerTone() {
    if (this.oscTuner) {
      try {
        this.gainTuner.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          if (this.oscTuner) {
            this.oscTuner.stop();
            this.oscTuner.disconnect();
            this.oscTuner = null;
            this.gainTuner = null;
          }
        }, 120);
      } catch {
        this.oscTuner = null;
        this.gainTuner = null;
      }
    }
  }

  // Romantic acoustic music box loop (synthesized lo-fi birthday melody)
  startRomanticMelody(onTick) {
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;

    // Melody notes for "Happy Birthday" / Romantic Theme
    // G4, G4, A4, G4, C5, B4, G4, G4, A4, G4, D5, C5...
    const melody = [
      { f: 392.00, d: 350 }, { f: 392.00, d: 250 }, { f: 440.00, d: 500 }, { f: 392.00, d: 500 },
      { f: 523.25, d: 500 }, { f: 493.88, d: 900 },
      { f: 392.00, d: 350 }, { f: 392.00, d: 250 }, { f: 440.00, d: 500 }, { f: 392.00, d: 500 },
      { f: 587.33, d: 500 }, { f: 523.25, d: 900 },
      { f: 392.00, d: 350 }, { f: 392.00, d: 250 }, { f: 783.99, d: 500 }, { f: 659.25, d: 500 },
      { f: 523.25, d: 500 }, { f: 493.88, d: 500 }, { f: 440.00, d: 700 },
      { f: 698.46, d: 350 }, { f: 698.46, d: 250 }, { f: 659.25, d: 500 }, { f: 523.25, d: 500 },
      { f: 587.33, d: 500 }, { f: 523.25, d: 1100 }
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const note = melody[noteIdx];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (note.d / 1000) * 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + note.d / 1000);

      if (onTick) onTick(note.f, noteIdx, melody.length);

      noteIdx = (noteIdx + 1) % melody.length;
      this.musicTimer = setTimeout(playNext, note.d);
    };

    playNext();
  }

  stopRomanticMelody() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const soundSynth = new SoundSynthesizer();
