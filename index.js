#!/usr/bin/env node

const { yellow, magenta } = require('chalk')
const { spawnSync } = require('child_process')
const { createHash } = require('crypto')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { basename, dirname, join } = require('path')

const argv = require('yargs')
  .scriptName('on-file-change')
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
  .demandCommand(1).argv

const UTF = 'utf8'

const getCheckSum = (s, algorithm = 'sha1', format = 'hex') =>
  createHash(algorithm)
    .update(s)
    .digest(format)

const getPastCheckSum = path =>
  existsSync(path)
    ? readFileSync(path, UTF)
        .trim()
        .split(/\s+/)[0]
    : null

const checkSum = getCheckSum(readFileSync(argv.file, UTF))
const checkSumFileName = `.${basename(argv.file)}.sha`
const pastCheckSum = getPastCheckSum(join(dirname(argv.file), checkSumFileName))
const isSumChecksOut = checkSum === pastCheckSum

if (!isSumChecksOut) {
  console.log(
    `File "${magenta(argv.file)}" has changed.`,
    `Running "${yellow(argv._.join(' '))}"...`,
  )

  const [command, ...args] = argv._

  spawnSync(command, args, { encoding: UTF, stdio: 'inherit' })
  writeFileSync(checkSumFileName, `${checkSum}  ${argv.file}`)
}
