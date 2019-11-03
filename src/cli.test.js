const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const { ok, ifError, strictEqual: equal } = require('assert')
const { join } = require('path')
const { existsSync, unlinkSync } = require('fs')
const unlink = promisify(require('fs').unlink)
const { getChecksumFilePath } = require('./checksum')
const { version } = require('../package.json')
const { magenta, yellow } = require('chalk')

module.exports = () => {
  const scriptPath = join(__dirname, 'cli.js')
  const command = `node ${scriptPath}`

  const options = [
    '--file',
    '-f',
    '--color',
    '--no-color',
    '--version',
    '--help',
  ]

  exec(`${command} --help`)
    .then(({ stdout }) => {
      options.forEach(option =>
        ok(stdout.includes(option), `Expect "${option}" in help`),
      )
    })
    .catch(ifError)

  exec(`${command} --version`)
    .then(({ stdout }) => equal(stdout.trim(), version))
    .catch(ifError)

  const checksumFilePath = getChecksumFilePath(scriptPath)
  const payload = 'echo'

  if (existsSync(checksumFilePath)) unlinkSync(checksumFilePath)

  exec(`${command} --file ${scriptPath} ${payload}`)
    .then(({ stdout }) => {
      ok(stdout.includes(payload))
      ok(stdout.includes(scriptPath))
      return exec(`${command} -f ${scriptPath} ${payload}`)
    })
    .then(({ stdout }) => {
      equal(stdout, '')
      return unlink(checksumFilePath)
    })
    .then(() => exec(`${command} --color --file ${scriptPath} ${payload}`))
    .then(({ stdout }) => {
      ok(stdout.includes(magenta(scriptPath)))
      ok(stdout.includes(yellow(payload)))
      return unlink(checksumFilePath)
    })
    .catch(ifError)
}
