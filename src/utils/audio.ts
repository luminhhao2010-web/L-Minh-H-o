/**
 * Web Audio API synthesizer for sound effects
 * Requires zero external audio files and works 100% offline.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isAudioMuted = muted;
}

export function isSoundMuted(): boolean {
  return isAudioMuted;
}

// Ting-ting sound for correct answer and coin collection
export function playTingTingSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First high chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1046.5, now); // C6
    osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12); // E6
    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second bell chime slightly delayed
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1567.98, now + 0.08); // G6
    osc2.frequency.exponentialRampToValueAtTime(2093.0, now + 0.22); // C7
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.35, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.55);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

// Soft hint sound for incorrect attempts
export function playHintSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(349.23, now + 0.25); // F4
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

// Celebration fanfare for lighthouse unlocked or station completed
export function playFanfareSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const startTime = now + index * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch (e) {
    console.warn('Audio fanfare error', e);
  }
}

// Button click feedback
export function playClickSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // silent
  }
}

// Helper to trigger a single firework explosion burst ("ĐÙNG... ĐOÀNG!")
function triggerFireworkBlast(ctx: AudioContext, time: number, pitchModifier = 1, volume = 0.5) {
  // 1. Deep concussive sub-bass boom ("Đùng")
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150 * pitchModifier, time);
  osc.frequency.exponentialRampToValueAtTime(36, time + 0.65);
  oscGain.gain.setValueAtTime(volume * 0.7, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.7);

  // 2. Air concussion explosion noise shockwave
  const bufferSize = Math.floor(ctx.sampleRate * 0.8);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(950 * pitchModifier, time);
  filter.frequency.exponentialRampToValueAtTime(80, time + 0.75);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.8, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(time);
  noise.stop(time + 0.8);

  // 3. Spark crackles & sizzles ("Đoàng" - lách tách pháo hoa bung nở)
  const crackleOffsets = [0.12, 0.22, 0.32, 0.44, 0.56];
  crackleOffsets.forEach((offset) => {
    const crackleTime = time + offset;
    const cSize = Math.floor(ctx.sampleRate * 0.06);
    const cBuf = ctx.createBuffer(1, cSize, ctx.sampleRate);
    const cData = cBuf.getChannelData(0);
    for (let i = 0; i < cSize; i++) {
      cData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
    }
    const cNode = ctx.createBufferSource();
    cNode.buffer = cBuf;

    const cFilter = ctx.createBiquadFilter();
    cFilter.type = 'bandpass';
    cFilter.frequency.setValueAtTime(2200 + Math.random() * 900, crackleTime);
    cFilter.Q.setValueAtTime(4, crackleTime);

    const cGain = ctx.createGain();
    cGain.gain.setValueAtTime(volume * 0.35, crackleTime);
    cGain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.06);

    cNode.connect(cFilter);
    cFilter.connect(cGain);
    cGain.connect(ctx.destination);
    cNode.start(crackleTime);
    cNode.stop(crackleTime + 0.06);
  });
}

// Grand celebratory fireworks barrage ("Tiếng nổ đùng đoàng")
export function playFireworksSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1st firework explosion: deep boom
    triggerFireworkBlast(ctx, now, 1.0, 0.55);

    // 2nd firework explosion: high bright crackle slightly delayed
    triggerFireworkBlast(ctx, now + 0.35, 1.25, 0.5);

    // 3rd firework explosion: grand finale boom
    triggerFireworkBlast(ctx, now + 0.75, 0.85, 0.65);

    // 4th sparkle burst
    triggerFireworkBlast(ctx, now + 1.15, 1.1, 0.45);

    // Accompanying victory fanfare notes
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    fanfareNotes.forEach((freq, idx) => {
      const noteTime = now + 0.2 + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.55);
    });
  } catch (e) {
    console.warn('Fireworks audio playback error', e);
  }
}
