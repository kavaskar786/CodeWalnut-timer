export class TimerAudio {
  private static instance: TimerAudio;
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  private readonly soundDuration: number = 200;
  private readonly gapDuration: number = 200;

  private constructor() {}

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  async play(): Promise<TimerAudio> {
    if (this.isPlaying) {
      return this;
    }

    try {
      await this.initializeAudioContext();

      if (!this.audioContext) {
        throw new Error("AudioContext not initialized");
      }

      this.isPlaying = true;

      // Create the sound pattern interval
      this.intervalId = window.setInterval(() => {
        this.playOneBeep();
      }, this.soundDuration + this.gapDuration);

      // Play the first beep immediately
      this.playOneBeep();
    } catch (error) {
      console.error("Failed to play audio:", error);
    }

    return this;
  }

  private playOneBeep(): void {
    if (!this.audioContext) return;

    // Create and configure oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.oscillator.type = "sine";
    this.oscillator.frequency.setValueAtTime(
      880,
      this.audioContext.currentTime
    );

    // Configure gain for a single beep
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      0.5,
      this.audioContext.currentTime + 0.01
    );
    this.gainNode.gain.setValueAtTime(
      0.5,
      this.audioContext.currentTime + 0.01
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + this.soundDuration / 1000
    );

    // Connect nodes
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    // Start and stop the oscillator for this beep
    this.oscillator.start(this.audioContext.currentTime);
    this.oscillator.stop(
      this.audioContext.currentTime + this.soundDuration / 1000
    );

    // Cleanup after the beep
    this.oscillator.onended = () => {
      this.oscillator?.disconnect();
      this.gainNode?.disconnect();
      this.oscillator = null;
      this.gainNode = null;
    };
  }

  stop(): void {
    if (!this.isPlaying) {
      return;
    }

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.cleanup();
  }

  private cleanup(): void {
    this.isPlaying = false;

    if (this.oscillator) {
      try {
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch (error) {
        console.log(error);
      }
      this.oscillator = null;
    }

    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }
}
