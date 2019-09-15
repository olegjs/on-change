# on-change

![Travis (.org)](https://img.shields.io/travis/olegjs/on-change)
[![Coverage Status](https://coveralls.io/repos/github/olegjs/on-change/badge.svg?branch=master)](https://coveralls.io/github/olegjs/on-change?branch=master)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/olegjs/on-change)
[![install size](https://packagephobia.now.sh/badge?p=@olegjs/on-change)](https://packagephobia.now.sh/result?p=@olegjs/on-change)
![David](https://img.shields.io/david/olegjs/on-change)
![GitHub last commit](https://img.shields.io/github/last-commit/olegjs/on-change)
![NPM](https://img.shields.io/npm/l/@olegjs/on-change)

CLI tool to run a command if file has changed since the last time that command
was run.

Forgetting to run `npm i` every time after `git pull` and getting
`Error: Cannot find module...`? Add the following to `package.json` to automate
this chore.

```json
{
  "scripts": {
    "prestart": "on-change --file package-lock.json npm ci"
  }
}
```

This CLI tool stores a file checksum in a hidden `sha` file every time it run a
given command. Made to automate running `npm ci` after pulling modified
`package-lock.json`.

## Install

```sh
npm install --save-dev @olegjs/on-change
```

## Usage

```sh
npx @olegjs/on-change --help
# Usage: on-file-change --file [file] [command]
#
# Options:
#   --help      Show help                                                [boolean]
#   --version   Show version number                                      [boolean]
#   --file, -f  Path to file to check for changes              [string] [required]
#
# Examples:
#   on-file-change --file package-lock.json   Reinstall dependencies on changed
#   npm ci                                    package-lock.json
```
