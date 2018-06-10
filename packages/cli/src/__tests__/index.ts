jest.mock('commander', () => ({
  version: jest.fn(),
  option: jest.fn(),
  parse: jest.fn()
}));

import * as program from 'commander';

interface Commander {
  version: jest.Mock<any>;
  option: jest.Mock<any>;
  parse: jest.Mock<any>;
}
let commander: Commander = program as any;

let args = process.argv;
beforeAll(() => {
  process.argv = args.reduce((args, arg) => args.concat(arg), []);
});

test('it sets version to package.json version', () => {
  commander.version.mockReturnValueOnce(commander);
  commander.option
    .mockReturnValue(commander)
    .mockReturnValue(commander)
    .mockReturnValue(commander);

  require('../');

  const { version } = require('../../package.json');

  expect(commander.version).toHaveBeenCalledWith(version);
});

test('it calls parse with process.argv', () => {
  commander.version.mockReturnValueOnce(commander);
  commander.option
    .mockReturnValue(commander)
    .mockReturnValue(commander)
    .mockReturnValue(commander);

  require('../');

  expect(commander.parse).toHaveBeenCalledWith(process.argv);
});
