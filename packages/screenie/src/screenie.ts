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
  let html;
  let hash = '';
  let id = 1;
  while (true) {
    const updatedHash = await page.evaluate(() => location.href.split('/').pop() || 0);
    const updatedHtml = await page.evaluate(() => document.body.innerHTML);
    if (hash === updatedHash && html === updatedHtml) {
      break;
    } else {
      hash = updatedHash;
      html = updatedHtml;
      id += 1;
    }
    const name = `${(opts.prependNumber ? `${id}-` : '') + hash}.png`;
    const filePath = path.join(opts.folder, name);
    await page.waitFor(opts.delay);
    const updatedScreenshot = await takeScreenshot(page, path.join(opts.folder, name));

    await page.keyboard.down(' ');

    screenshots.push(updatedScreenshot);
  }
  await browser.close();
  return screenshots;
}
