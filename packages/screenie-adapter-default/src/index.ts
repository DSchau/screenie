import * as path from 'path';

const getName = (url, fallbackName = 'screenshot') => {
  const expr = /(?:http|https)(?::\/\/)(.*)/;
  const match = url.match(expr);
  if (expr) {
    return match.pop().split('.').slice(0, -1).join('.');
  }
  return fallbackName;
};

export async function screenieAdapterDefault({
  browser,
  page
}, options) {
  const screenshotPath = path.join(options.folder, getName(options.url));
  await page.screenshot(page, screenshotPath);

  return [screenshotPath];
}
