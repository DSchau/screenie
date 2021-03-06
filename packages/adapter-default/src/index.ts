import * as path from 'path';

const getName = (url, fallbackName = 'screenshot') => {
  const expr = /(?:http|https)(?::\/\/)(.*)/;
  const match = url.match(expr);
  let name = fallbackName;
  if (expr) {
    name = match.pop().split('.').slice(0, -1).join('.');
  }
  return `${name}.png`;
};

export async function adapterDefault({
  browser,
  page
}, options) {
  const screenshotPath = path.join(options.folder, getName(options.url));
  await page.waitFor(options.delay);
  await Promise.resolve(options.beforeScreenshot(page));
  await page.screenshot({
    path: screenshotPath
  });

  return [screenshotPath];
}
