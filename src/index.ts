import * as puppeteer from 'puppeteer';
import * as path from 'path';

import { screenie } from './screenie';

(async () => {
  await screenie({
    folder: path.join(process.cwd(), 'screenshots'),
    url: 'https://dschau.github.io/css-in-js-presentation'
  });
})();
