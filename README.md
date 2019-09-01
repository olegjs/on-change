# on-change

Run a command when a file changes since last time the command was executed.

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
