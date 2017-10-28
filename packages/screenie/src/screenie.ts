import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs-extra';

import { defaults } from './defaults';

import { ScreenieOptions } from './interfaces';

const takeScreenshot = (page, file) => page.screenshot({ path: file });

export async function screenie(options: ScreenieOptions) {
  const opts = defaults(options);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await fs.mkdirp(opts.folder);

  await page.goto(opts.url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
  await page.setViewport({
    ...opts.viewport,
    ...(opts.viewport || {})
  });

  let screenshots = [];
  let screenshot;
  let index = 0;
  while (true) {
    const filePath = path.join(opts.folder, `${index}.png`);
    await page.waitFor(opts.delay);
    const newScreenshot = await takeScreenshot(page, path.join(opts.folder, `${index}.png`));
    if (screenshot && screenshot.equals(newScreenshot)) {
      await fs.remove(path.join(opts.folder, `${index}.png`));
      break;
    } else {
      screenshots.push(filePath);
    }

    await page.keyboard.down(' ');

    index += 1;
    screenshot = newScreenshot;
  }
  await browser.close();
  return screenshots;
}
