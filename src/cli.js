#!/usr/bin/env node

const { yellow, magenta } = require('chalk')
const { spawnSync } = require('child_process')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const defaults = require('./defaults')

const {
  getChecksum,
  getChecksumFilePath,
  hashFromFileContent,
} = require('./checksum')

const argv = require('yargs')
  .scriptName('on-change')
  .usage('Usage: $0 --file [file] [command]')
  .example(
    '$0 --file package-lock.json npm ci',
    'Reinstall dependencies on changed package-lock.json',
  )
  .option('file', {
    alias: 'f',
    demandOption: true,
    describe: 'Path to file to check for changes',
    type: 'string',
  })
  .option('color', {
    describe: 'Force color or disable with --no-color',
    type: 'boolean',
  })
  .demandCommand(1).argv

const getPastChecksum = path =>
  existsSync(path)
    ? hashFromFileContent(readFileSync(path, defaults.encoding))
    : null

const checksum = getChecksum(readFileSync(argv.file, defaults.encoding))
const checksumFilePath = getChecksumFilePath(argv.file)
const pastChecksum = getPastChecksum(checksumFilePath)

if (checksum !== pastChecksum) {
  console.log(
    `File "${magenta(argv.file)}" has changed.`,
    `Running "${yellow(argv._.join(' '))}"...`,
  )

  const [command, ...args] = argv._
  spawnSync(command, args, { encoding: defaults.encoding, stdio: 'inherit' })
  writeFileSync(checksumFilePath, `${checksum}  ${argv.file}`)
}
