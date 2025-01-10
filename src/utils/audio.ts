import audioFile from "../asset/audio/audio1.mp3";
export class TimerAudio {
  private static instance: TimerAudio;
  private audioElements: Map<
    string,
    {
      audio: HTMLAudioElement;
      intervalId: number | null;
      isPlaying: boolean;
    }
  > = new Map();

  private readonly soundDuration: number = 9000; // Adjust based on your audio file length
  private readonly gapDuration: number = 200;

  private constructor() {}

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private initializeAudioElement(timerId: string): void {
    if (!this.audioElements.has(timerId)) {
      const audio = new Audio(audioFile); // Make sure this path matches your audio file location
      audio.load();

      this.audioElements.set(timerId, {
        audio,
        intervalId: null,
        isPlaying: false,
      });
    }
  }

  async play(timerId: string): Promise<TimerAudio> {
    if (this.audioElements.get(timerId)?.isPlaying) {
      return this;
    }

    try {
      // Initialize audio element if it doesn't exist
      this.initializeAudioElement(timerId);
      const timerData = this.audioElements.get(timerId)!;
      timerData.isPlaying = true;

      // Create the sound pattern interval
      timerData.intervalId = window.setInterval(() => {
        this.playOneBeep(timerId);
      }, this.soundDuration + this.gapDuration);

      // Play the first beep immediately
      this.playOneBeep(timerId);
    } catch (error) {
      console.error("Failed to play audio:", error);
    }

    return this;
  }

  private playOneBeep(timerId: string): void {
    const timerData = this.audioElements.get(timerId);
    if (!timerData || !timerData.audio) return;

    // Reset audio to start and play
    timerData.audio.currentTime = 0;
    timerData.audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }

  stop(timerId: string): void {
    const timerData = this.audioElements.get(timerId);
    if (!timerData?.isPlaying) {
      return;
    }

    if (timerData.intervalId !== null) {
      window.clearInterval(timerData.intervalId);
      timerData.intervalId = null;
    }

    this.cleanup(timerId);
  }

  private cleanup(timerId: string): void {
    const timerData = this.audioElements.get(timerId);
    if (!timerData) return;

    timerData.isPlaying = false;

    if (timerData.audio) {
      timerData.audio.pause();
      timerData.audio.currentTime = 0;
    }
  }
}
