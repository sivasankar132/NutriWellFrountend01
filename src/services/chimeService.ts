// Synthesized Web Audio API Chime Service
// Provides a crystal-clear, elegant two-tone glass chime without external audio assets

class ChimeService {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Plays an animated, crisp two-tone glass chime (D5 -> A5 harmonic)
   */
  public playChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, now);
      masterGain.connect(ctx.destination);

      // Primary Tone (D5 - 587.33 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.8, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc1.connect(gain1);
      gain1.connect(masterGain);

      // Secondary High Harmonic Tone (A5 - 880.00 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.0, now + 0.15);

      gain2.gain.setValueAtTime(0, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.9, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.0008, now + 1.25);

      osc2.connect(gain2);
      gain2.connect(masterGain);

      // Soft Sub-Harmonic Body Tone (F#5 - 739.99 Hz) for depth
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(739.99, now + 0.16);

      gain3.gain.setValueAtTime(0, now + 0.16);
      gain3.gain.linearRampToValueAtTime(0.25, now + 0.19);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc3.connect(gain3);
      gain3.connect(masterGain);

      osc1.start(now);
      osc1.stop(now + 0.75);

      osc2.start(now + 0.15);
      osc2.stop(now + 1.3);

      osc3.start(now + 0.16);
      osc3.stop(now + 0.9);
    } catch (e) {
      console.warn('AudioContext chime could not play:', e);
    }
  }
}

export const chimeService = new ChimeService();
