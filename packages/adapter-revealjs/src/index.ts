import * as path from 'path';

const zeroPad = (num: Number) => {
  const str = num.toString();
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
};

const removeChrome = () => {
  [
    document.querySelector('.controls'),
    document.querySelector('.progress')
  ]
    .forEach((el: HTMLElement) => el.remove());
};

export async function screenieAdapterRevealjs({
  browser,
  page
}, options) {
  let screenshots = [];
  let html;
  let hash = '';
  let id = 0;
  await page.evaluate(removeChrome);
  while (true) {
    const updatedHash = await page.evaluate(() => location.href.split('/').pop() || 0);
    const updatedHtml = await page.evaluate(() => document.body.innerHTML);
    if (hash === updatedHash && html === updatedHtml) {
      break;
    } else {
      if (hash !== updatedHash) {
        id += 1;
      }
      hash = updatedHash;
      html = updatedHtml;
    }
    const name = `${zeroPad(id)}-${hash}.png`;
    const filePath = path.join(options.folder, name);
    await page.waitFor(options.delay);
    await Promise.resolve(options.beforeScreenshot(page));
    const updatedScreenshot = await page.screenshot({
      path: path.join(options.folder, name)
    });

    await page.keyboard.down(' ');

    screenshots.push(updatedScreenshot);
  }

  return screenshots;
}
