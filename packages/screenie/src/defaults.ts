import * as path from 'path';
import * as yup from 'yup';

import { ScreenieOptions } from './interfaces';

const schemaBase = yup.object().shape({
  adapter: yup.string().default('adapter-default').required(),
  beforeScreenshot: yup.mixed().default(() => () => null),
  delay: yup.number().default(0).required(),
  height: yup.number().default(450).required(),
  width: yup.number().default(800).required(),
  isMobile: yup.boolean().default(true).required()
});

const schema = schemaBase.concat(yup.object().shape({
  deviceScaleFactor: yup.number(),
  folder: yup.string().required(),
  hasTouch: yup.boolean(),
  isLandscape: yup.boolean(),
  url: yup.string().required()
}));

const getConfigFile = (fileName = '.screenierc.js') => {
  try {
    return require(path.join(process.cwd(), fileName));
  } catch (e) {
    return {};
  }
};

export const defaults = async (...options: Partial<ScreenieOptions>[]): Promise<ScreenieOptions> => {
  const base = await schemaBase.validate() as ScreenieOptions;

  const merged = [].concat(options).concat(getConfigFile()).reduce((merged, opts) => ({
      ...merged,
      ...opts
    }), base);

  return await schema.validate(merged) as ScreenieOptions;
};
