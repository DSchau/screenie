import * as fs from 'fs-extra';
import * as path from 'path';
import * as imageSize from 'image-size';
import { promisify } from 'util';

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

  const fileExists = await fs.pathExists(path.join(options.folder, '0.png'));

  expect(fileExists).toBe(true);
});

test('it only creates a single file if right arrow has no effect', async () => {
  await screenie(options);

  const files = await fs.readdir(options.folder);

  expect(files).toHaveLength(1);
});

test('it can customize the dimensions', async () => {
  const height = 500;
  const width = height;
  await screenie({
    ...options,
    viewport: {
      height,
      width
    }
  });

  const { height: fileHeight, width: fileWidth } = await promisify(imageSize)(path.join(options.folder, '0.png'));

  expect(height).toBe(fileHeight);
  expect(width).toBe(fileWidth);
});