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
  let hash = -1;
  while (true) {
    const filePath = path.join(opts.folder, `${hash}.png`);
    const updatedHash = await page.evaluate(() => location.href.split('/').pop() || 0);
    if (hash === updatedHash) {
      break;
    }
    await page.waitFor(opts.delay);
    const screenshot = await takeScreenshot(page, path.join(opts.folder, `${hash}.png`));

    await page.keyboard.down(' ');

    screenshots.push(screenshot);
  }
  await browser.close();
  return screenshots;
}
