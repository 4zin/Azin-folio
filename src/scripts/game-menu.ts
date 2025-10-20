import type { GameMenuType } from '@/types/game-menu';
import { AudioManager } from '@/utils/AudioManager';
import { navigate } from 'astro:transitions/client';

class RetroMenu extends HTMLElement {
  private options!: NodeListOf<Element>;
  private currentIndex: number;
  private config: Required<GameMenuType>;
  private isInitialized: boolean = false;
  private audioManager: AudioManager;
  private keydownHandler: (event: KeyboardEvent) => void;

  static get observedAttributes() {
    return ['selector', 'active-class', 'enable-mouse-navigation'];
  }

  constructor() {
    super();
    this.audioManager = new AudioManager({ volume: 0.3 });

    this.config = {
      selector: '.options',
      activeClass: 'active',
      enableMouseNavigation: true,
      routes: {},
    };

    this.currentIndex = 0;

    this.keydownHandler = (event: KeyboardEvent) => this.handleKeyPress(event);
  }

  connectedCallback() {
    this.processAttributes();

    this.extractRoutesFromNavElements();

    this.options = this.querySelectorAll<HTMLElement>(this.config.selector);

    this.setUpAudio();
    this.init();
  }

  disconnectedCallback() {
    this.destroy();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.processAttributes();
      if (this.isInitialized) {
        this.reinitialize();
      }
    }
  }

  private processAttributes(): void {
    const selector = this.getAttribute('selector');
    if (selector) {
      this.config.selector = selector;
    }

    const activeClass = this.getAttribute('active-class');
    if (activeClass) {
      this.config.activeClass = activeClass;
    }

    const enableMouse = this.getAttribute('enable-mouse-navigation');
    if (enableMouse !== null) {
      this.config.enableMouseNavigation = enableMouse !== 'false';
    }
  }

  private extractRoutesFromNavElements(): void {
    const optionElements = this.querySelectorAll<HTMLElement>(
      this.config.selector
    );
    const routes: Record<string, string> = {};

    optionElements.forEach((option) => {
      const link = option.querySelector('a');
      if (link) {
        const text = link.textContent?.trim();
        const href = link.getAttribute('href');
        if (text && href) {
          routes[text] = href;
        }
      }
    });

    this.config.routes = routes;
  }

  private reinitialize(): void {
    this.destroy();
    this.extractRoutesFromNavElements();
    this.options = this.querySelectorAll<HTMLElement>(this.config.selector);
    this.currentIndex = 0;
    this.init();
  }

  private async setUpAudio(): Promise<void> {
    await this.audioManager.loadSounds({
      navigation: '../assets/sounds/option.mp3',
      select: '../assets/sounds/selected-option.mp3',
    });
  }

  private playNavigationSound(): void {
    this.audioManager.play('navigation');
  }

  private playSelectSound(): void {
    this.audioManager.play('select');
  }

  private init(): void {
    if (this.options.length === 0) return;

    this.updateActiveOption();
    this.attachEventListeners();
    this.isInitialized = true;
  }

  private attachEventListeners(): void {
    document.addEventListener('keydown', this.keydownHandler);

    if (this.config.enableMouseNavigation) {
      this.options.forEach((option, index) => {
        option.addEventListener('mouseenter', () => {
          this.setCurrentIndex(index, false);
        });

        option.addEventListener('click', (event) => {
          event.preventDefault();
          this.setCurrentIndex(index, false);
          this.selectOption();
        });
      });
    }
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (!this.isInitialized) return;

    const key: string = event.key.toLowerCase();

    switch (key) {
      case 'arrowdown':
      case 's':
        event.preventDefault();
        this.moveDown();
        break;
      case 'arrowup':
      case 'w':
        event.preventDefault();
        this.moveUp();
        break;

      case 'enter':
        event.preventDefault();
        this.selectOption();
        break;

      default:
        break;
    }
  }

  private moveDown(): void {
    this.currentIndex = (this.currentIndex + 1) % this.options.length;
    this.updateActiveOption();
    this.playNavigationSound();
  }

  private moveUp(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.options.length) % this.options.length;
    this.updateActiveOption();
    this.playNavigationSound();
  }

  private setCurrentIndex(index: number, playSound: boolean = true): void {
    if (index >= 0 && index < this.options.length) {
      this.currentIndex = index;
      this.updateActiveOption();

      if (playSound) {
        this.playNavigationSound();
      }
    }
  }

  private updateActiveOption(): void {
    this.options.forEach((option) => {
      option.classList.remove(this.config.activeClass);
    });

    const currentOption = this.options[this.currentIndex];
    if (currentOption) {
      currentOption.classList.add(this.config.activeClass);
    }

    this.dispatchEvent(
      new CustomEvent('active-changed', {
        detail: {
          index: this.currentIndex,
          element: currentOption,
        },
        bubbles: true,
      })
    );
  }

  private selectOption(): void {
    const selectedOption = this.options[this.currentIndex] as HTMLElement;
    if (!selectedOption) return;

    const link = selectedOption.querySelector('a');
    const optionText: string = link?.textContent?.trim() || '';

    if (!link || !optionText) return;

    selectedOption.classList.add('selected');

    this.playSelectSound();

    const route = this.config.routes[optionText];
    if (route) {
      this.playSoundAndNavigate(route);
    }

    this.dispatchEvent(
      new CustomEvent('option-selected', {
        detail: {
          index: this.currentIndex,
          text: optionText,
          element: selectedOption,
          route: route,
        },
        bubbles: true,
      })
    );
  }

  private playSoundAndNavigate(route: string): void {
    this.audioManager.playWithCallback(
      'select',
      () => {
        this.navigateTo(route);
      },
      850
    );
  }

  private navigateTo(route: string): void {
    if (typeof window !== 'undefined') {
      navigate(route);
    }
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getCurrentOption(): HTMLElement | null {
    return (this.options[this.currentIndex] as HTMLElement) || null;
  }

  public setActiveByIndex(index: number): void {
    this.setCurrentIndex(index, false);
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.keydownHandler);

    this.options.forEach((option) => {
      option.classList.remove(this.config.activeClass);
      option.classList.remove('selected');
    });

    this.audioManager.destroy();

    this.isInitialized = false;
  }
}

customElements.define('retro-menu', RetroMenu);

export default RetroMenu;
