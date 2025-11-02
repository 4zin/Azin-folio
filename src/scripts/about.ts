import { AudioManager } from '@/utils/AudioManager';

class ProfileComponent extends HTMLElement {
  private avatar!: HTMLImageElement;
  private profile!: HTMLImageElement;

  constructor() {
    super();
  }

  connectedCallback() {
    const avatar = this.querySelector('.avatar');
    const profile = this.querySelector('.profile');

    this.avatar = avatar as HTMLImageElement;
    this.profile = profile as HTMLImageElement;
    this.init();
  }

  init() {
    this.addEventListener('mouseenter', () => {
      this.avatar.classList.add('invisible');
      this.profile.classList.remove('invisible');
    });

    this.addEventListener('mouseleave', () => {
      this.avatar.classList.remove('invisible');
      this.profile.classList.add('invisible');
    });
  }
}

customElements.define('profile-image', ProfileComponent);

class AboutComponent extends HTMLElement {
  private currentOptionIndex: number = 0;
  private options!: NodeListOf<HTMLLIElement>;
  private optionsList!: HTMLUListElement;
  private leftButton!: HTMLButtonElement;
  private rightButton!: HTMLButtonElement;
  private audioManager: AudioManager;

  constructor() {
    super();
    this.audioManager = new AudioManager({ volume: 0.3 });
  }

  async connectedCallback() {
    await this.setupAudio();
    this.optionsNav();
    this.getButtons();
    this.handleChangeOption();
  }

  async setupAudio() {
    await this.audioManager.loadSounds({
      navigation: '/sounds/option.mp3',
    });
  }

  getButtons() {
    this.leftButton = this.querySelector('.leftNav') as HTMLButtonElement;
    this.rightButton = this.querySelector('.rightNav') as HTMLButtonElement;
  }

  optionsNav() {
    const optionList = this.querySelector('.about-options');
    if (!optionList) return;

    this.optionsList = optionList as HTMLUListElement;
    this.options = optionList.querySelectorAll('li');

    this.updateIndicator();

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      if (key === 'q') {
        event.preventDefault();
        this.navigateLeft();
      }

      if (key === 'e') {
        event.preventDefault();
        this.navigateRight();
      }
    });
  }

  handleChangeOption() {
    this.options.forEach((option) => {
      option.addEventListener('click', () => {
        if (option.classList.contains('selected-option')) return;
        this.options[this.currentOptionIndex].classList.remove(
          'selected-option'
        );
        this.currentOptionIndex = Array.from(this.options).indexOf(option);
        this.options[this.currentOptionIndex].classList.add('selected-option');
        this.updateIndicator();
        this.audioManager.play('navigation');
        this.updateContent();
      });
    });
  }

  updateIndicator() {
    this.optionsList.setAttribute(
      'data-selected',
      this.currentOptionIndex.toString()
    );
  }

  navigateLeft() {
    if (this.currentOptionIndex === 0) {
      this.leftButton.classList.add('limited');
      setTimeout(() => {
        this.leftButton.classList.remove('limited');
      }, 400);
      return;
    }

    this.options[this.currentOptionIndex].classList.remove('selected-option');
    this.currentOptionIndex--;
    this.options[this.currentOptionIndex].classList.add('selected-option');
    this.updateIndicator();
    this.audioManager.play('navigation');
    this.updateContent();
  }

  navigateRight() {
    if (this.currentOptionIndex === this.options.length - 1) {
      this.rightButton.classList.add('limited');
      setTimeout(() => {
        this.rightButton.classList.remove('limited');
      }, 400);
      return;
    }

    this.options[this.currentOptionIndex].classList.remove('selected-option');
    this.currentOptionIndex++;
    this.options[this.currentOptionIndex].classList.add('selected-option');
    this.updateIndicator();
    this.audioManager.play('navigation');
    this.updateContent();
  }

  updateContent() {
    const contentSections =
      this.querySelectorAll<HTMLElement>('[data-content]');

    contentSections.forEach((section) => {
      const contentIndex = parseInt(
        section.getAttribute('data-content') || '0'
      );

      if (contentIndex === this.currentOptionIndex) {
        section.classList.add('selected-content');
        section.classList.remove('hidden');
      } else {
        section.classList.remove('selected-content');
        section.classList.add('hidden');
      }
    });
  }

  disconnectedCallback() {
    this.audioManager.destroy();
  }
}

customElements.define('about-component', AboutComponent);
