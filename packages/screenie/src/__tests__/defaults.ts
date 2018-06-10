import { defaults } from '../defaults';

test('it is a function', () => {
  expect(defaults).toEqual(expect.any(Function));
});

test('it returns defaults', async () => {
  expect(await defaults({ folder: 'screenshots', url: 'https://google.com' })).toMatchSnapshot();
});

test('it allows for customization', async () => {
  expect(await defaults({ delay: 10000, folder: 'screenshots', url: 'https://google.com' })).toMatchSnapshot();
});
