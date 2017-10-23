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

  await page.goto(options.url);
  await page.setViewport({
    ...defaults.viewport,
    ...(options.viewport || {})
  });

  let screenshots = [];
  let screenshot;
  let index = 0;
  while (true) {
    const filePath = path.join(options.folder, `${index}.png`);
    const newScreenshot = await takeScreenshot(page, path.join(options.folder, `${index}.png`));
    if (screenshot && screenshot.equals(newScreenshot)) {
      await fs.remove(path.join(options.folder, `${index}.png`));
      break;
    } else {
      screenshots.push(filePath);
    }

    await sleep(options.delay);
    await page.keyboard.down(' ');
    await sleep(options.delay);

    index += 1;
    screenshot = newScreenshot;
  }
  await browser.close();
  return screenshots;
}
