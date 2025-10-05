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
