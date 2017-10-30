import * as path from 'path';

const zeroPad = (num: Number) => {
  const str = num.toString();
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
};

const removeProgress = () => {
  const root = document.querySelector('[data-reactroot]');
  Array.from(root.children)
    .forEach((child: HTMLElement) => {
     if (child.style.height === '10px') {
      child.remove();
     }
  });
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
      hash = updatedHash;
      html = updatedHtml;
      if (hash !== updatedHash) {
        id += 1;
      }
    }
    const name = `${zeroPad(id)}-${hash}.png`;
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
