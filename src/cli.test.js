const { exec } = require('child_process')
const { ok, ifError, strictEqual: equal } = require('assert')
const { join } = require('path')
const { unlink } = require('fs')
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

  exec(`${command} --help`, (error, stdout) => {
    ifError(error)

    options.forEach(option =>
      ok(stdout.includes(option), `Expect "${option}" in help`),
    )
  })

  exec(`${command} --version`, (error, stdout) => {
    ifError(error)
    equal(stdout.trim(), version)
  })

  const checksumFilePath = getChecksumFilePath(scriptPath)
  const payload = 'echo'

  unlink(checksumFilePath, () => {
    exec(`${command} --file ${scriptPath} ${payload}`, (error, stdout) => {
      ifError(error)
      ok(stdout.includes(payload))
      ok(stdout.includes(scriptPath))

      // Checksum match -- no action
      exec(`${command} -f ${scriptPath} ${payload}`, (error, stdout) => {
        ifError(error)
        equal(stdout, '')

        unlink(checksumFilePath, error => {
          ifError(error)

          // Colors
          exec(
            `${command} --color --file ${scriptPath} ${payload}`,
            (error, stdout) => {
              ifError(error)
              ok(stdout.includes(magenta(scriptPath)))
              ok(stdout.includes(yellow(payload)))
              unlink(checksumFilePath, error => ifError(error))
            },
          )
        })
      })
    })
  })
}
