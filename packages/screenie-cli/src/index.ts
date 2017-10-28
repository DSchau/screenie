#!/usr/bin/env node
import * as program from 'commander';
import chalk from 'chalk';
import { screenie } from '@screenie/screenie';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../package.json'));

program.version(version)
  .option('-u --url <url>', 'The URL to scrape for screenshots')
  .option('-f, --folder <folder>', 'The folder to save the resulting screenshots (does not have to exist, will be created)')
  .option('-d, --delay <delay>', 'A delay when taking each screenshot', parseInt)
  .option('-h, --height <height>', 'A height when taking each screenshot', parseInt)
  .option('-d, --width <width>', 'A width when taking each screenshot', parseInt)
  .parse(process.argv);

(async () => {
  const { url, folder, delay, height, width } = program;
  await screenie({
    url,
    folder,
    delay,
    viewport: {
      height,
      width
    }
  })
    .then(() => {
      console.log(chalk.green.bold(`Screenshots saved to ${folder}`));
    });
})();
