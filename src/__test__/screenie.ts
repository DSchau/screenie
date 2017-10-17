import * as fs from 'fs-extra';
import * as path from 'path';

import { screenie } from '../screenie';

const options = {
  folder: path.join(__dirname, '__fixtures__'),
  url: 'https://example.com'
};

beforeEach(async () => {
  await fs.mkdirp(options.folder);
});

afterEach(async () => {
  await fs.remove(options.folder);
});

test('it can create a folder and save a screenshot', async () => {
  await screenie(options);

  const fileExists = await fs.ensureFile(path.join(options.folder, '0.png'));

  expect(fileExists).toBe(true);
});
