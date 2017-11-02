# screenie-cli

[![Build Status](https://travis-ci.org/DSchau/screenie.svg?branch=master)](https://travis-ci.org/DSchau/screenie)

The CLI (command line interface) to use screenie.

## Install

```bash
yarn global add @screenie/screenie-cli
```

or with NPM if that's more your jam

```bash
npm install -g @screenie/screenie-cli
```

## Usage

```bash
screenie -u <url> -f <folder> -d [delay] -h [height] -w [width]
```

For a complete example, consider:

```bash
screenie -u http://localhost:3000 -f screenshots
```

The above command will visit http://localhost:3000 and scrape screenshots in the presentation, placing any screenshots it finds in the `screenshots` directory.
