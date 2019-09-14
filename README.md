# on-change

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/olegjs/on-change)
![David](https://img.shields.io/david/olegjs/on-change)
![GitHub last commit](https://img.shields.io/github/last-commit/olegjs/on-change)
![NPM](https://img.shields.io/npm/l/@olegjs/on-change)

CLI tool to run a command if file has changed since the last time that command
was run.

This CLI tool stores a file checksum in a hidden `sha` file every time it run a
given command. Made to automate running `npm ci` after pulling modified
`package-lock.json`.

## Install

```sh
npm install --save-dev @olegjs/on-change
```

## Example

```sh
npx on-change --file package-lock.json npm ci
```
