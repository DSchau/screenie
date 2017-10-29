import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs-extra';

import { defaults } from './defaults';

import { ScreenieOptions } from './interfaces';

const takeScreenshot = (page, file) => page.screenshot({ path: file });
const getAdapter = (adapter): Function => {
  try {
    let fn = require(adapter)
    if (fn.default) {
      return fn.default;
    } else if (fn[adapter]) {
      return fn[adapter];
    } else {
      return fn;
    }
  } catch (e) {
    console.warn(e);
    return () => [];
  }
}

export async function screenie(opts: ScreenieOptions) {
  const options = defaults(opts);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await fs.mkdirp(options.folder);

  await page.goto(options.url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
  await page.setViewport({
    ...options.viewport,
    ...(options.viewport || {})
  });

  const adapter = getAdapter(options.adapter);

  const screenshots = await adapter({
    browser,
    page
  }, options);

  await browser.close();

  return screenshots;
}
