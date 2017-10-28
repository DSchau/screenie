export interface ScreenieOptions {
  delay?: number;
  folder: string;
  url: string;
  prependNumber?: boolean;
  viewport?: {
    width?: number;
    height?: number;
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
    isLandscape?: boolean;
  }
}
