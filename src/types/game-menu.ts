export interface MenuOption {
  text: string;
  url: string;
}

export interface GameMenuType {
  selector?: string;
  activeClass?: string;
  enableMouseNavigation?: boolean;
  routes?: Record<string, string>;
}
