#!/usr/bin/env node
import * as program from 'commander';
import chalk from 'chalk';
import { screenie } from '@screenie/screenie';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../package.json'));

program.version(version)
  .option('-u, --url <url>', 'The URL to scrape for screenshots')
  .option('-a, --adapter <adapter>', 'The adapter to run for screenshots')
  .option('-f, --folder <folder>', 'The folder to save the resulting screenshots (does not have to exist, will be created)')
  .option('-f, --folder <folder>', 'The folder to save the resulting screenshots (does not have to exist, will be created)')
  .option('-p, --prepend [prepend]', 'Prepend each screenshot with a unique number', parseInt)
  .option('-d, --delay [delay]', 'A delay when taking each screenshot', parseInt)
  .option('-h, --height [height]', 'A height when taking each screenshot', parseInt)
  .option('-w, --width [width]', 'A width when taking each screenshot', parseInt)
  .parse(process.argv);

(async () => {
  const { url, folder, delay, prepend, height, width } = program;
  await screenie({
    url,
    folder,
    prependNumber: prepend || false,
    ...(delay ? { delay } : {}),
    ...(height & width ? {
      viewport: {
        height,
        width
      }
    } : {})
  })
    .then(screenshots => {
      const len = screenshots.length;
      console.log(chalk.green.bold(`(${len}) Screenshot${len === 1 ? '' : 's'} saved to ${folder}`));
    });
})();
