import * as path from 'path';

export async function screenieAdapterSpectacle({
  browser,
  page
}, options) {
  let screenshots = [];
  let html;
  let hash = '';
  let id = 0;
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
    const name = `${id}-${hash}.png`;
    const filePath = path.join(options.folder, name);
    await page.waitFor(options.delay);
    const updatedScreenshot = await page.screenshot({
      path: path.join(options.folder, name)
    });

    await page.keyboard.down(' ');

    screenshots.push(updatedScreenshot);
  }

  return screenshots;
}
