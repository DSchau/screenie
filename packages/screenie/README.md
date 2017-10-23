# screenie

[![Build Status](https://travis-ci.org/DSchau/screenie.svg?branch=master)](https://travis-ci.org/DSchau/screenie)

A simple tool to leverage puppeteer to take screenshots of web pages; is particularly tailored to take screenshots of individual slides in a presentation (e.g. within Spectacle)

## Install

__Not yet released on NPM__

## Usage

```javascript
const { screenie } = require('screenie');
const path = require('path');

(async () => {
  const screenshots = await screenie({
    folder: path.join(process.cwd(), 'screenshots'),
    url: 'https://example.com'
  });
})();
```
