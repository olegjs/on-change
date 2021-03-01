# on-change

[![npm](https://img.shields.io/npm/dw/@olegjs/on-change)](https://www.npmjs.com/package/@olegjs/on-change)
[![install size](https://packagephobia.now.sh/badge?p=@olegjs/on-change)](https://packagephobia.now.sh/result?p=@olegjs/on-change)
![Node.js CI](https://github.com/olegjs/on-change/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/olegjs/on-change/badge.svg?branch=master)](https://coveralls.io/github/olegjs/on-change?branch=master)
![GitHub last commit](https://img.shields.io/github/last-commit/olegjs/on-change)

CLI tool to run a command if file has changed since the last time that command
was run.

Forgetting to run `npm i` or `npm ci` every time after `git pull` or switching
between branches and getting `Error: Cannot find module...`? Add the following
to `package.json` to automate this chore.

```json
{
  "scripts": {
    "prestart": "npx @olegjs/on-change --file package-lock.json npm ci"
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

# Usage: on-change --file [file] [command]
#
# Options:
#   --help      Show help                                                [boolean]
#   --version   Show version number                                      [boolean]
#   --file, -f  Path to file to check for changes              [string] [required]
#   --color     Force color or disable with --no-color                   [boolean]
#
# Examples:
#   on-change --file package-lock.json npm    Reinstall dependencies on changed
#   ci                                        package-lock.json
```
