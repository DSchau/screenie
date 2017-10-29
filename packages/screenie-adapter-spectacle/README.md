# screenie-adapter-spectacle

[![Build Status](https://travis-ci.org/DSchau/screenie.svg?branch=master)](https://travis-ci.org/DSchau/screenie)

An adapter for [screenie][screenie] for use with spectacle presentations

## Install

```bash
yarn add @screenie/screenie @screenie/screenie-adapter-spectacle --dev
```

## Usage

```javascript
const { screenie } = require('@screenie/screenie');
const path = require('path');

(async () => {
  const screenshots = await screenie({
    adapter: 'screenie-adapter-spectacle',
    folder: path.join(process.cwd(), 'screenshots'),
    url: 'http://localhost:3000'
  });
})();
```

[screenie]: https://github.com/DSchau/screenie/tree/master/packages/screenie
