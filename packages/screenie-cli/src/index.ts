#!/usr/bin/env node
import * as program from 'commander';
import chalk from 'chalk';
import { screenie } from 'screenie';
import * as path from 'path';

const { version } = require(path.join(__dirname, '../package.json'));

program.version(version)
  .option('-u, --url', 'The URL to scrape for screenshots')
  .option('-f, --folder', 'The folder to save the resulting screenshots (does not have to exist, will be created)')
  .option('-d, --delay', 'A delay when taking each screenshot', parseInt)
  .parse(process.argv);

(async () => {
  const { url, folder, delay } = program;
  await screenie({
    url,
    folder,
    delay
  })
    .then(() => {
      console.log(chalk.green.bold(`Screenshots saved to ${folder}`));
    });
})();
