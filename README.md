# screenie

A simple tool to leverage puppeteer to take screenshots of web pages; is particularly tailored to take screenshots of individual slides in a presentation (e.g. within Spectacle)

## Install

__Not yet released on NPM__

## Usage

```javascript
const { screenie } = require('screenie');
const path = require('path');

(async () => {
  await screenie({
    folder: path.join(process.cwd(), 'screenshots'),
    url: 'https://example.com'
  });
})();
```
