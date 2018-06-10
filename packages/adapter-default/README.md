# @screenie/adapter-default

[![Build Status](https://travis-ci.org/DSchau/screenie.svg?branch=master)](https://travis-ci.org/DSchau/screenie)

An adapter for screenie to take a simple screenshot of a single webpage.

## Install

```bash
yarn add @screenie/screenie-cli @screenie/adapter-default
```

## Usage

Can be used globally, but I find it most useful to use in a package.json script, like so:

```json
{
  "scripts": "screenie -a adapter-default -u https://google.com -d 1000 -f screenshots"
}
```

Will take a screenshot of `https://google.com` using the default adapter, and save the resulting screenshot in the `screeneshots` folder.
