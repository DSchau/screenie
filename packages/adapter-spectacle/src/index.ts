import * as path from 'path';

const zeroPad = (num: Number) => {
  const str = num.toString();
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
};

const removeProgress = () => {
  const deck = document.querySelector('.spectacle-deck');
  const progress = Array.from(deck.children).reverse().find(el => {
    const style = getComputedStyle(el);
    return style.height === '10px' && style.position === 'absolute';
  });

  if (progress) {
    progress.remove();
  }
};

export async function screenieAdapterSpectacle({
  browser,
  page
}, options) {
  let screenshots = [];
  let html;
  let hash = '';
  let id = 0;
  await page.evaluate(removeProgress);
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
