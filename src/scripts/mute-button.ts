class MuteButton {
  private muteButton: HTMLElement | null;
  private isMuted: boolean;
  private unmutedSVG: string;
  private mutedSVG: string;

  constructor() {
    this.muteButton = document.getElementById('mute');
    this.isMuted = localStorage.getItem('isMuted') === 'true';
    this.unmutedSVG = `<svg class="sound-icon" width="25" height="22" fill="none"><path stroke="var(--color-text)" d="M7.5 12.5V6m0 6.5v.5m0-.5h-3m0 0H4m.5 0v2m0 0v.5m0-.5h-2m-.5 0h.5m0 0v2m0 .5v-.5m0 0h2m.5 0h-.5m0 0v2m0 .5v-.5m0 0h3m.5 0h-.5m0 0v-2m0 0V16m0 .5h2m.5 0h-.5m0 0V6M17.5 12.5V6m0 6.5v.5m0-.5h-3m0 0H14m.5 0v2m0 0v.5m0-.5h-2m-.5 0h.5m0 0v2m0 .5v-.5m0 0h2m.5 0h-.5m0 0v2m0 .5v-.5m0 0h3m.5 0h-.5m0 0v-2m0 0V16m0 .5h2m.5 0h-.5m0 0V6M10 6.5h7M7.5 6V2h12m.5 0h-.5m0 0v4"/><path stroke="var(--color-text)" d="M8.5 16v-.5m0 0v-13h10m-10 13h-3m-2.5 0h2.5m0 0v-2m0-.5v.5m0 0h2m.5 0h-.5m0 0v1m0 .5v-.5m0 0h-1m-.5 0h.5m0 0v3m0 .5v-.5m0 0h-1m0 0H5m.5 0V16M19 2.5h-.5m0 0v13m0 .5v-.5m0 0h-2m-3.5 0h3.5m0 0v2m0 .5v-.5m0 0h-1m0 0H15m.5 0v-4m0 0V13m0 .5h2m.5 0h-.5m0 0v1m0 .5v-.5m0 0H16m-7-11h9m-9 1h9m-9 1h9"/></svg>`;
    this.mutedSVG = `<svg class="sound-icon" width="25" height="22" fill="none"><path stroke="var(--color-text)" d="M8.5 13.5V7m0 6.5v.5m0-.5h-3m0 0H5m.5 0v2m0 0v.5m0-.5h-2m-.5 0h.5m0 0v2m0 .5v-.5m0 0h2m.5 0h-.5m0 0v2m0 .5v-.5m0 0h3m.5 0h-.5m0 0v-2m0 0V17m0 .5h2m.5 0h-.5m0 0V7M18.5 13.5V7m0 6.5v.5m0-.5h-3m0 0H15m.5 0v2m0 0v.5m0-.5h-2m-.5 0h.5m0 0v2m0 .5v-.5m0 0h2m.5 0h-.5m0 0v2m0 .5v-.5m0 0h3m.5 0h-.5m0 0v-2m0 0V17m0 .5h2m.5 0h-.5m0 0V7M11 7.5h7M8.5 7V3h12m.5 0h-.5m0 0v4"/><path stroke="var(--color-text)" d="M9.5 17v-.5m0 0v-13h10m-10 13h-3m-2.5 0h2.5m0 0v-2m0-.5v.5m0 0h2m.5 0h-.5m0 0v1m0 .5v-.5m0 0h-1m-.5 0h.5m0 0v3m0 .5v-.5m0 0h-1m0 0H6m.5 0V17M20 3.5h-.5m0 0v13m0 .5v-.5m0 0h-2m-3.5 0h3.5m0 0v2m0 .5v-.5m0 0h-1m0 0H16m.5 0v-4m0 0V14m0 .5h2m.5 0h-.5m0 0v1m0 .5v-.5m0 0H17m-7-11h9m-9 1h9m-9 1h9M1 21 24 1"/></svg>`;
    this.init();
  }

  private init(): void {
    if (!this.muteButton) return;

    this.updateButtonState();

    this.muteButton.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      localStorage.setItem('isMuted', String(this.isMuted));
      this.updateButtonState();
    });
  }

  private updateButtonState(): void {
    if (!this.muteButton) return;

    this.muteButton.innerHTML = this.isMuted ? this.mutedSVG : this.unmutedSVG;
    this.muteButton.setAttribute('data-muted', String(this.isMuted));
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export default MuteButton;
