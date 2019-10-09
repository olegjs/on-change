const { exec } = require('child_process')
const assert = require('assert')
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
    assert(!error)

    options.forEach(option =>
      assert(stdout.includes(option), `Expect "${option}" in help`),
    )
  })

  exec(`${command} --version`, (error, stdout) => {
    assert(!error)
    assert(stdout.trim() === version)
  })

  const checksumFilePath = getChecksumFilePath(scriptPath)
  const payload = 'echo'

  unlink(checksumFilePath, () => {
    exec(`${command} --file ${scriptPath} ${payload}`, (error, stdout) => {
      assert(!error)
      assert(stdout.includes(payload))
      assert(stdout.includes(scriptPath))

      // Checksum match -- no action
      exec(`${command} -f ${scriptPath} ${payload}`, (error, stdout) => {
        assert(!error)
        assert(stdout === '')

        unlink(checksumFilePath, error => {
          assert(!error)

          // Colors
          exec(
            `${command} --color --file ${scriptPath} ${payload}`,
            (error, stdout) => {
              assert(!error)
              assert(stdout.includes(magenta(scriptPath)))
              assert(stdout.includes(yellow(payload)))
              unlink(checksumFilePath, error => assert(!error))
            },
          )
        })
      })
    })
  })
}
