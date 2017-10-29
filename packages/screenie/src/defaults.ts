import { ScreenieOptions } from './interfaces';

export const defaults = (...options: ScreenieOptions[]) => {
  const base = {
    adapter: 'screenie-adapter-default',
    delay: 0,
    height: 450,
    width: 800,
    isMobile: true
  } as ScreenieOptions;

  return options.reduce((merged, opts) => ({
      ...merged,
      ...opts
    }), base);
};
