import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs-extra';

import { ScreenieOptions } from './interfaces';

const takeScreenshot = (page, file) => page.screenshot({ path: file }, { waitUntil: 'networkidle' });
const sleep = (duration = 1000) => new Promise(resolve => setTimeout(resolve, 1000));

const defaults = {
  viewport: {
    width: 1400,
    height: 800
  }
};

export async function screenie(options: ScreenieOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await fs.mkdirp(options.folder);

  await page.goto('https://dschau.github.io/css-in-js-presentation');
  await page.setViewport({
    ...defaults.viewport,
    ...(options.viewport || {})
  });

  let screenshot;
  let index = 0;
  while (true) {
    const newScreenshot = takeScreenshot(page, path.join(options.folder, `${index}.png`));
    if (screenshot === newScreenshot) {
      break;
    }

    await sleep(2500);
    await page.keyboard.down('ArrowRight');
    await sleep(2500);

    index += 1;
    screenshot = newScreenshot;
  }
  await browser.close();
}
