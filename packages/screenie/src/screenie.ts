import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs-extra';

import { ScreenieOptions } from './interfaces';

const takeScreenshot = (page, file) => page.screenshot({ path: file });

const defaults = {
  viewport: {
    width: 800,
    height: 450
  }
};

export async function screenie(options: ScreenieOptions) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await fs.mkdirp(options.folder);

  await page.goto(options.url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
  await page.setViewport({
    ...defaults.viewport,
    ...(options.viewport || {})
  });

  let screenshots = [];
  let screenshot;
  let index = 0;
  while (true) {
    const filePath = path.join(options.folder, `${index}.png`);
    await page.waitFor(options.delay);
    const newScreenshot = await takeScreenshot(page, path.join(options.folder, `${index}.png`));
    if (screenshot && screenshot.equals(newScreenshot)) {
      await fs.remove(path.join(options.folder, `${index}.png`));
      break;
    } else {
      screenshots.push(filePath);
    }

    await page.waitFor(options.delay);
    await page.keyboard.down(' ');
    await page.waitFor(options.delay);

    index += 1;
    screenshot = newScreenshot;
  }
  await browser.close();
  return screenshots;
}
