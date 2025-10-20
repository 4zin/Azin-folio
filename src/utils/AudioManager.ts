import type { AudioConfig } from '@/types/audioTypes';

export class AudioManager {
  private audioFiles: Map<string, HTMLAudioElement> = new Map();
  private defaultConfig: Required<AudioConfig> = {
    volume: 0.3,
    preload: 'auto',
    checkMuted: true,
  };

  constructor(config?: AudioConfig) {
    if (config) {
      this.defaultConfig = { ...this.defaultConfig, ...config };
    }
  }

  async loadSounds(sounds: Record<string, string>): Promise<void> {
    const loadPromises = Object.entries(sounds).map(([key, path]) => {
      this.loadSound(key, path);
    });
  }

  async loadSound(key: string, path: string): Promise<void> {
    try {
      const audioModule = await import(path);
      const audio = new Audio(audioModule.default);
      audio.volume = this.defaultConfig.volume;
      audio.preload = this.defaultConfig.preload;

      this.audioFiles.set(key, audio);
    } catch (error) {
      console.error(`Error loading audio file for '${key}':`, error);
    }
  }

  play(soundKey: string): void {
    try {
      if (this.defaultConfig.checkMuted && this.isMuted()) {
        return;
      }

      const audio = this.audioFiles.get(soundKey);

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.error(`Error playing audio '${soundKey}':`, error);
        });
      } else {
        console.warn(`Audio '${soundKey}' not found`);
      }
    } catch (error) {
      console.error(`Error playing sound '${soundKey}':`, error);
    }
  }

  playWithCallback(
    soundKey: string,
    callback: () => void,
    timeout: number = 850
  ): void {
    const audio = this.audioFiles.get(soundKey);

    if (!audio) {
      callback();
      return;
    }

    audio.currentTime = 0;

    const onEnded = () => {
      audio.removeEventListener('ended', onEnded);
      callback();
    };

    audio.addEventListener('ended', onEnded);

    audio.play().catch((error) => {
      console.error(`Error playing audio '${soundKey}':`, error);
      callback();
    });

    setTimeout(() => {
      audio.removeEventListener('ended', onEnded);
      callback();
    }, timeout);
  }

  pause(soundKey: string): void {
    const audio = this.audioFiles.get(soundKey);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  pauseAll(): void {
    this.audioFiles.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  private isMuted(): boolean {
    try {
      return localStorage.getItem('isMuted') === 'true';
    } catch {
      return false;
    }
  }

  destroy(): void {
    this.pauseAll();
    this.audioFiles.clear();
  }
}

export const globalAudioManager = new AudioManager();
