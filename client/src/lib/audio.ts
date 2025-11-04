// Audio utilities for mindfulness timer using Web Audio API

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export async function playChime(frequency: number = 528, duration: number = 0.8) {
  try {
    const ctx = getAudioContext();
    
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (error) {
    console.warn('Failed to play audio chime:', error);
  }
}

export async function playStartChime() {
  await playChime(528, 1.0);
  setTimeout(() => playChime(660, 0.8), 200);
}

export async function playIntervalChime() {
  await playChime(440, 0.6);
}

export async function playEndChime() {
  await playChime(528, 1.0);
  setTimeout(() => playChime(660, 0.8), 200);
  setTimeout(() => playChime(792, 1.0), 400);
}

export function parseDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+)\s*minut/i);
  if (match) {
    return parseInt(match[1], 10) * 60;
  }
  return 0;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
