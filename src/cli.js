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
  .option('verbose', {
    describe: 'Notify when no file chage detected and commad skipped',
    type: 'boolean',
  })
  .option('silent', {
    alias: 'quiet',
    describe: 'No notification',
    type: 'boolean',
  })
  .option('dry-run', {
    alias: 'd',
    describe: 'Skip running commmand',
    type: 'boolean',
  })
  .demandCommand(1).argv

const getPastChecksum = (path) =>
  existsSync(path)
    ? hashFromFileContent(readFileSync(path, defaults.encoding))
    : null

const checksum = getChecksum(readFileSync(argv.file, defaults.encoding))
const checksumFilePath = getChecksumFilePath(argv.file)
const pastChecksum = getPastChecksum(checksumFilePath)
const command = argv._.join(' ')

if (checksum !== pastChecksum) {
  if (!argv.silent) {
    console.log(
      `File "${magenta(argv.file)}" has changed.`,
      `Running "${yellow(command)}"...`,
    )
  }

  if (!argv['dry-run']) {
    const [commandName, ...args] = argv._

    spawnSync(commandName, args, {
      encoding: defaults.encoding,
      stdio: 'inherit',
    })

    writeFileSync(checksumFilePath, `${checksum}  ${argv.file}`)
  } else {
    console.log(
      `Would run ${yellow(command)}.`,
      `Would store ${argv.file} checksum in ${checksumFilePath}`,
    )
  }
} else if (argv.verbose) {
  console.log(
    `File "${magenta(argv.file)}" did not change.`,
    `Skip "${yellow(command)}".`,
  )
}
